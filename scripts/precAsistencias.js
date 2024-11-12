document.addEventListener('DOMContentLoaded', () => {
    let students = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const monthSelect = document.getElementById('monthSelect');
    const bulkActions = document.getElementById('bulkActions');
    const bulkAbsent = document.getElementById('bulkAbsent');
    const dateRow = document.getElementById('dateRow');
    const studentsBody = document.getElementById('studentsBody');
    const modal = document.getElementById('attendanceModal');
    const modalStudentName = document.getElementById('modalStudentName');
    const modalDate = document.getElementById('modalDate');
    const presentBtn = document.getElementById('presentBtn');
    const lateBtn = document.getElementById('lateBtn');
    const absentBtn = document.getElementById('absentBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    let selectedStudent = null;
    let selectedDate = null;

    // Inicializar selector de mes
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = new Date(currentYear, i, 1).toLocaleString('es-ES', { month: 'long' });
        monthSelect.appendChild(option);
    }
    monthSelect.value = currentMonth;

    // Cargar datos de estudiantes
    fetch('../jsons/cursos.json')
        .then(response => response.json())
        .then(data => {
            students = data["5to 2da"].listado.map((name, index) => ({
                id: index + 1,
                name: name,
                attendance: {}
            }));
            renderAttendanceTable();
        })
        .catch(error => console.error('Error al cargar los datos de estudiantes:', error));

    // Event Listeners
    monthSelect.addEventListener('change', (e) => {
        currentMonth = parseInt(e.target.value);
        renderAttendanceTable();
    });

    presentBtn.addEventListener('click', () => updateAttendance('P'));
    lateBtn.addEventListener('click', () => updateAttendance('T'));
    absentBtn.addEventListener('click', () => updateAttendance('A'));
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');

    function renderAttendanceTable() {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    
        // Generar cabecera de fechas con una columna por cada día del mes
        bulkActions.innerHTML = '<th style="text-align: left; padding-left: 20px;">Todos Presentes</th>';
        bulkAbsent.innerHTML = '<th style="text-align: left; padding-left: 20px;">Todos Ausentes</th>';
        dateRow.innerHTML = '<th style="text-align: left; padding-left: 20px;">Fecha</th>';
    
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    
            // Habilitar celdas solo si es el mes actual
            const isEditable = isCurrentMonth;
    
            // Cabecera para cada día
            bulkActions.innerHTML += `<th>${isWeekend ? '' : `<input type="checkbox" class="bulk-checkbox present" data-date="${dateString}" ${isEditable ? '' : 'disabled'}>`}</th>`;
            bulkAbsent.innerHTML += `<th>${isWeekend ? '' : `<input type="checkbox" class="bulk-checkbox absent" data-date="${dateString}" ${isEditable ? '' : 'disabled'}>`}</th>`;
            dateRow.innerHTML += `<th>${i}</th>`;
        }
    
        // Generar filas para cada estudiante
        studentsBody.innerHTML = students.map(student => {
            let row = `<tr><td>${student.name}</td>`;
    
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(currentYear, currentMonth, i);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
                let attendance = student.attendance[dateString] || '';
    
                const isEditable = isCurrentMonth;  // Solo editable en el mes actual
                if (currentMonth < today.getMonth() || (isCurrentMonth && date <= today)) {
                    attendance = attendance || getRandomAttendance(0.8, 0.1);
                    student.attendance[dateString] = attendance;
                }
    
                const attendanceClass = attendance === 'P' ? 'present' : attendance === 'T' ? 'late' : attendance === 'A' ? 'absent' : '';
    
                row += `<td class="${isWeekend ? 'weekend' : ''} attendance-cell ${attendanceClass} ${isEditable ? '' : 'disabled'}"
                            data-student="${student.id}"
                            data-date="${dateString}"
                            ${isWeekend || !isEditable ? 'aria-disabled="true"' : ''}>
                            ${isWeekend ? '' : attendance}
                        </td>`;
            }
            row += '</tr>';
            return row;
        }).join('');
    
        // Event listeners para celdas y checkboxes de acciones masivas
        document.querySelectorAll('.attendance-cell:not(.weekend):not(.disabled)').forEach(cell => {
            cell.addEventListener('click', openAttendanceModal);
        });
    
        document.querySelectorAll('.bulk-checkbox:not(:disabled)').forEach(checkbox => {
            checkbox.addEventListener('change', handleBulkAction);
        });
    }
    
    function getRandomAttendance(presentProbability = 0.7, lateProbability = 0.1) {
        const rand = Math.random();
        if (rand < presentProbability) return 'P';
        if (rand < presentProbability + lateProbability) return 'T';
        return 'A';
    }

    function openAttendanceModal(e) {
        const studentId = e.target.dataset.student;
        const date = e.target.dataset.date;
        selectedStudent = students.find(s => s.id.toString() === studentId);
        selectedDate = date;

        modalStudentName.textContent = selectedStudent.name;
        modalDate.textContent = new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        modal.style.display = 'block';
    }

    function updateAttendance(status) {
        if (selectedStudent && selectedDate) {
            selectedStudent.attendance[selectedDate] = status;
            renderAttendanceTable();
            modal.style.display = 'none';
        }
    }

    function handleBulkAction(e) {
        const checkbox = e.target;
        const type = checkbox.classList.contains('present') ? 'P' : 'A'; // Verifica si es "present" o "absent"
        
        // Actualizar la asistencia de todos los estudiantes para esa fecha
        const date = checkbox.dataset.date;
    
        students.forEach(student => {
            if (checkbox.checked) {
                student.attendance[date] = type;  // Si el checkbox está marcado, asignar el tipo correspondiente
            } else {
                delete student.attendance[date];  // Si no está marcado, eliminar la asistencia para la fecha
            }
        });
    
        // Volver a renderizar la tabla para reflejar los cambios
        renderAttendanceTable();
    }
});