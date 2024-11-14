document.addEventListener('DOMContentLoaded', () => {
    let students = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentStudentIndex = 0;

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

    const quickAttendanceBtn = document.getElementById('quickAttendanceBtn');
    const quickAttendanceModal = document.getElementById('quickAttendanceModal');
    const quickModalStudentName = document.getElementById('quickModalStudentName');
    const quickModalDate = document.getElementById('quickModalDate');
    const quickPresentBtn = document.getElementById('quickPresentBtn');
    const quickAbsentBtn = document.getElementById('quickAbsentBtn');

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
        const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear(); // Permite edición solo en el mes actual

    
        // Verifica si el mes actual es enero (0) o febrero (1)
        const isBlockedMonth = currentMonth === 0 || currentMonth === 1;
    
        // Generar cabecera de fechas con una columna por cada día del mes
        bulkActions.innerHTML = '<th colspan="2" style="text-align: left; padding-left: 20px;">Todos Presentes</th>';
        bulkAbsent.innerHTML = '<th colspan="2" style="text-align: left; padding-left: 20px;">Todos Ausentes</th>';
        dateRow.innerHTML = '<th colspan="2" style="text-align: left; padding-left: 20px;">Fecha</th>';
    
        const dayInitials = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isFriday = date.getDay() === 5;
            const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    
            const isEditable = !isBlockedMonth && isCurrentMonth && isFriday;
    
            // Cabecera para cada día
            bulkActions.innerHTML += `<th>${isFriday && !isBlockedMonth ? `<input type="checkbox" class="bulk-checkbox present" data-date="${dateString}" ${isEditable ? '' : 'disabled'}>` : ''}</th>`;
            bulkAbsent.innerHTML += `<th>${isFriday && !isBlockedMonth ? `<input type="checkbox" class="bulk-checkbox absent" data-date="${dateString}" ${isEditable ? '' : 'disabled'}>` : ''}</th>`;
            dateRow.innerHTML += `
                <th>
                    <div>${dayInitials[date.getDay()]}</div>
                    <div>${i}</div>
                </th>`;
        }
    
        // Generar filas para cada estudiante
        studentsBody.innerHTML = students.map((student, index) => {
            let row = `<tr>
                <td style="width: 30px; text-align: right; padding-right: 10px;">${index + 1}.</td>
                <td style="text-align: left; padding-left: 10px;">${student.name}</td>`;
    
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(currentYear, currentMonth, i);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isFriday = date.getDay() === 5;
                const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
                let attendance = student.attendance[dateString] || '';
    
                const isEditable = !isBlockedMonth && isCurrentMonth && isFriday;
                if (currentMonth < today.getMonth() || (isCurrentMonth && date <= today)) {
                    attendance = attendance || getRandomAttendance(0.8, 0.1);
                    student.attendance[dateString] = attendance;
                }
    
                const attendanceClass = attendance === 'P' ? 'present' : attendance === 'T' ? 'late' : attendance === 'A' ? 'absent' : '';
    
                row += `<td class="${isWeekend ? 'weekend' : ''} attendance-cell ${attendanceClass} ${isEditable ? '' : 'disabled'}"
                            data-student="${student.id}"
                            data-date="${dateString}"
                            ${isWeekend || !isEditable ? 'aria-disabled="true"' : ''}>
                            ${isFriday && !isBlockedMonth ? attendance : ''}</td>`;
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
        const type = checkbox.classList.contains('present') ? 'P' : 'A';
        
        const date = checkbox.dataset.date;
    
        students.forEach(student => {
            if (checkbox.checked) {
                student.attendance[date] = type;
            } else {
                delete student.attendance[date];
            }
        });
    
        renderAttendanceTable();
    }

    quickAttendanceBtn.addEventListener('click', openQuickAttendanceModal);

    // Función para abrir el primer modal de selección de fecha
function openQuickAttendanceModal() {
    const availableDates = [];
    const daysInMonth = new Date(currentYear, currentMonth + 2, 0).getDate();

    // Encuentra todos los viernes del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        if (date.getDay() === 5) { // 5 representa el viernes
            const dateString = date.toISOString().split('T')[0];

            // Verifica si todos los estudiantes han registrado su asistencia para esta fecha
            const allAttendanceTaken = students.every(student => student.attendance[dateString]);

            // Si no todos los estudiantes han registrado su asistencia, agregamos la fecha
            if (!allAttendanceTaken) {
                availableDates.push(dateString);
            }
        }
    }

    // Genera los botones de fecha disponibles
    const dateButtons = availableDates.map(dateString => {
        const date = new Date(dateString);
        const day = date.getDate();
        return `<button class="date-select-btn" data-date="${dateString}">${day + 1} de ${date.toLocaleString('es-ES', { month: 'long' })}</button>`;
    }).join('');

    const dateSelector = document.getElementById('dateSelector');
    dateSelector.innerHTML = dateButtons;

    // Abre el modal de selección de fecha
    const dateSelectorModal = document.getElementById('dateSelectorModal');
    dateSelectorModal.style.display = 'block';

    // Agrega eventos a los botones de fecha para iniciar la asistencia
    document.querySelectorAll('.date-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedDate = e.target.dataset.date;
            dateSelectorModal.style.display = 'none'; // Cierra el modal de selección de fecha
            startQuickAttendance(); // Inicia el proceso de asistencia rápida
        });
    });
}

   // Función para iniciar el proceso de asistencia rápida
function startQuickAttendance() {
    currentStudentIndex = 0;
    updateQuickAttendanceModalContent();
    quickAttendanceModal.style.display = 'block'; // Abre el modal de asistencia rápida
}
    
    function showNextStudent() {
        if (currentStudentIndex < students.length) {
            const student = students[currentStudentIndex];
            quickModalStudentName.textContent = `${currentStudentIndex + 1}. ${student.name}`;
            quickModalDate.textContent = new Date(selectedDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        } else {
            quickAttendanceModal.style.display = 'none';
            renderAttendanceTable();
        }
    }
    
    function quickUpdateAttendance(status) {
        if (currentStudentIndex < students.length) {
            const student = students[currentStudentIndex];
            student.attendance[selectedDate] = status;
            currentStudentIndex++;
            updateQuickAttendanceModalContent(); // Muestra el siguiente estudiante
        }
    }

    function updateQuickAttendanceModalContent() {
        const student = students[currentStudentIndex];
        if (student) {
            // Actualiza el contenido del modal de asistencia rápida con el nombre del estudiante y la fecha
            document.getElementById('quickModalStudentName').textContent = `${currentStudentIndex + 1}. ${student.name}`;
            document.getElementById('quickModalDate').textContent = new Date(selectedDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // Asegura que los botones tengan sus eventos actualizados
            document.getElementById('quickPresentBtn').onclick = () => quickUpdateAttendance('P');
            document.getElementById('quickAbsentBtn').onclick = () => quickUpdateAttendance('A');
        } else {
            quickAttendanceModal.style.display = 'none'; // Cierra el modal si no hay más estudiantes
            renderAttendanceTable();
        }
    }



    
    const closeButtons = document.querySelectorAll('.cerrarModals');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none'; // Oculta el modal
        if (modal === dateSelectorModal && selectedDate) {
            // Asegúrate de que la fecha seleccionada no se pierda si se cierra el modal
            console.log('Fecha seleccionada:', selectedDate); // La fecha seleccionada se mantiene
        }
    });
});

    
    
    
});