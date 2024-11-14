document.addEventListener('DOMContentLoaded', () => {
    let students = [];
    let currentStudent = null;
    let currentFilter = 'all';

    function randomGrade(min, max) {
        return Math.round((Math.random() * (max - min) + min) * 2) / 2;
    }

    fetch('../jsons/cursos.json')
        .then(response => response.json())
        .then(data => {
            students = data["5to 2da"].listado.map((name, index) => ({
                id: index + 1,
                name: name,
                attendance: Array(5).fill().map(() => ({ value: randomGrade(6.5, 10) })),
                grades: [
                    { date: '22/03/2024', type: 'Exposicion grupal', value: Math.floor(randomGrade(5, 10)), description: 'Metodos de estudio'}, 
                    { date: '10/08/2024', type: 'Oral', value: randomGrade(7, 9), description: 'Defensa del TP8' },
                    { date: '08/11/2024', type: 'Carpeta', value: randomGrade(5, 9), description: '' }
                ],
                behavior: Array(5).fill().map(() => ({ value: randomGrade(6.5, 10) })),
                reportCard: {
                    firstQuarter: index % 2 === 0 ? 'TEP' : 'TEA',
                    secondQuarter: null,
                    finalGrade: null
                }
            }));
            renderStudentList();
        })
        .catch(error => console.error('Error al cargar los datos de estudiantes:', error));

    function renderStudentList() {
        const studentList = document.getElementById('students');
        const filteredStudents = filterStudents(currentFilter);
        studentList.innerHTML = filteredStudents.map(student => 
            `<button class="student-button" data-id="${student.id}">${student.name}</button>`
        ).join('');

        studentList.addEventListener('click', (e) => {
            if (e.target.classList.contains('student-button')) {
                document.querySelectorAll('.student-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                currentStudent = students.find(s => s.id.toString() === e.target.dataset.id);
                renderStudentDetails();
            }
        });
    }

    function filterStudents(filter) {
        switch(filter) {
            case 'firstQuarter':
                return students.filter(s => s.reportCard.firstQuarter === 'TED' || s.reportCard.firstQuarter === 'TEP');
            case 'secondQuarter':
                return students.filter(s => s.reportCard.secondQuarter === 'TED');
            case 'bothQuarters':
                return students.filter(s => 
                    (s.reportCard.firstQuarter === 'TED' || s.reportCard.firstQuarter === 'TEP') && 
                    s.reportCard.secondQuarter === 'TED'
                );
            default:
                return students;
        }
    }

    function renderStudentDetails() {
        if (!currentStudent) return;

        document.getElementById('studentName').innerHTML = `${currentStudent.name}`;
        const attendanceAvg = calculateAverage(currentStudent.attendance);
        const gradeAvg = calculateAverage(currentStudent.grades);
        const behaviorAvg = calculateAverage(currentStudent.behavior);
        const generalAvg = ((attendanceAvg + gradeAvg + behaviorAvg) / 3).toFixed(2);

        document.getElementById('generalAvg').textContent = generalAvg;
        document.getElementById('attendanceAvg').textContent = attendanceAvg.toFixed(2);
        document.getElementById('gradeAvg').textContent = gradeAvg.toFixed(2);
        document.getElementById('behaviorAvg').textContent = behaviorAvg.toFixed(2);

        renderReportCard();
        renderGrades();

        document.getElementById('studentDetails').style.display = 'block';
    }

    function renderReportCard() {
        const firstQuarter = document.getElementById('firstQuarter');
        const secondQuarter = document.getElementById('secondQuarter');
        const finalGrade = document.getElementById('finalGrade');

        firstQuarter.innerHTML = `<b>1<sup>er</sup> Cuatrimestre:</b> ${currentStudent.reportCard.firstQuarter}`;
        if (currentStudent.reportCard.firstQuarter === 'TEP' || currentStudent.reportCard.firstQuarter === 'TED') {
            firstQuarter.innerHTML += ' <button class="compensationBtn" data-quarter="1">Compensación</button>';
        }

        secondQuarter.innerHTML = `<b>2<sup>do</sup> Cuatrimestre:</b> ${currentStudent.reportCard.secondQuarter || 'No establecido'}`;
        if (currentStudent.reportCard.secondQuarter === 'TEP' || currentStudent.reportCard.secondQuarter === 'TED') {
            secondQuarter.innerHTML += ' <button class="compensationBtn" data-quarter="2">Compensación</button>';
        }

        if (currentStudent.reportCard.firstQuarter && currentStudent.reportCard.secondQuarter) {
            if (currentStudent.reportCard.finalGrade) {
                finalGrade.innerHTML = `<b>Nota Final:</b> ${currentStudent.reportCard.finalGrade}`;
            } else {
                finalGrade.innerHTML = `<b>Nota Final:</b> No establecida <button id="setFinalGradeBtn">Establecer</button>`;
            }
        } else {
            finalGrade.textContent = '';
        }

        const addReportCardGradeBtn = document.getElementById('addReportCardGrade');
        addReportCardGradeBtn.disabled = (currentStudent.reportCard.firstQuarter && currentStudent.reportCard.secondQuarter);
    }

    function renderGrades() {
        const gradesList = document.getElementById('grades');
        gradesList.innerHTML = currentStudent.grades.map(grade => 
            `<li>${grade.date} - ${grade.type}: ${grade.value} - ${grade.description || 'Sin descripción'}</li>`
        ).join('');
    }
    

    function calculateAverage(array) {
        return array.reduce((sum, item) => sum + item.value, 0) / array.length;
    }

    document.getElementById('addStudent').addEventListener('click', () => {
        const name = prompt('Nombre del nuevo estudiante:');
        if (name) {
            const newStudent = {
                id: students.length + 1,
                name: name,
                attendance: Array(5).fill().map(() => ({ value: randomGrade(6.5, 10) })),
                grades: [],
                behavior: Array(5).fill().map(() => ({ value: randomGrade(6.5, 10) })),
                reportCard: { firstQuarter: 'TEP', secondQuarter: null, finalGrade: null }
            };
            students.push(newStudent);
            renderStudentList();
        }
    });

    document.getElementById('studentDetails').addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
            document.getElementById('studentDetails').style.display = 'none';
            document.querySelectorAll('.student-button').forEach(btn => btn.classList.remove('active'));
        } else if (e.target.classList.contains('compensationBtn')) {
            const quarter = e.target.dataset.quarter;
            if (quarter === '1') {
                currentStudent.reportCard.firstQuarter = 'TEP - Compensado(TEA)';
            } else {
                currentStudent.reportCard.secondQuarter = 'TEP - Compensado(TEA)';
            }
            renderReportCard();
        } else if (e.target.id === 'setFinalGradeBtn') {
            document.getElementById('finalGradeModal').style.display = 'block';
        }
    });

    document.getElementById('addGrade').addEventListener('click', () => {
        document.getElementById('gradeModal').style.display = 'block';
    });

    document.getElementById('addReportCardGrade').addEventListener('click', () => {
        const modal = document.getElementById('reportCardModal');
        const quarterSelect = document.getElementById('quarter');
        quarterSelect.innerHTML = '';
        if (!currentStudent.reportCard.firstQuarter) {
            quarterSelect.innerHTML += '<option value="1">1er Cuatrimestre</option>';
        }
        if (!currentStudent.reportCard.secondQuarter) {
            quarterSelect.innerHTML += '<option value="2">2do Cuatrimestre</option>';
        }
        if (quarterSelect.innerHTML === '') {
            alert('Ambos cuatrimestres ya tienen notas asignadas.');
            return;
        }
        modal.style.display = 'block';
    });

    document.getElementById('changeBehavior').addEventListener('click', () => {
        document.getElementById('behaviorModal').style.display = 'block';
        document.getElementById('behaviorValue').value = calculateAverage(currentStudent.behavior).toFixed(2);
    });

    document.getElementById('gradeType').addEventListener('change', (e) => {
        document.getElementById('otherGradeType').style.display = 
            e.target.value === 'otro' ? 'block' : 'none';
    });

    document.getElementById('submitGrade').addEventListener('click', () => {
        const type = document.getElementById('gradeType').value;
        const value = parseFloat(document.getElementById('gradeValue').value);
        const description = document.getElementById('gradeDescription').value.trim();

        if (!description) {
            alert('La descripción es obligatoria. Por favor, ingrese una descripción válida.');
            return; 
        }

        if (type && value && value >= 1 && value <= 10) {
            currentStudent.grades.push({
                date: new Date().toLocaleDateString('es-AR'),
                type: type === 'otro' ? document.getElementById('otherGradeType').value : type,
                value: Math.round(value * 2) / 2,
                description: description
            });
            renderGrades();
            renderStudentDetails();
            closeModal('gradeModal');
        } else {
            alert('Por favor, ingrese una nota válida entre 1 y 10.');
        }
    });

    document.getElementById('submitReportCardGrade').addEventListener('click', () => {
        const quarter = document.getElementById('quarter').value;
        const grade = document.getElementById('reportCardGrade').value;
        if (quarter && grade) {
            if (quarter === '1') {
                currentStudent.reportCard.firstQuarter = grade;
            } else {
                currentStudent.reportCard.secondQuarter = grade;
            }
            renderReportCard();
            closeModal('reportCardModal');
        }
    });

    document.getElementById('submitFinalGrade').addEventListener('click', () => {
        const finalGrade = parseFloat(document.getElementById('finalGradeValue').value);
        if (finalGrade && finalGrade >= 1 && finalGrade <= 10) {
            currentStudent.reportCard.finalGrade = Math.round(finalGrade * 2) / 2;
            renderReportCard();
            closeModal('finalGradeModal');
        } else {
            alert('Por favor, ingrese una nota válida entre 1 y 10.');
        }
    });

    document.getElementById('submitBehavior').addEventListener('click', () => {
        const behaviorValue = parseFloat(document.getElementById('behaviorValue').value);
        if (behaviorValue && behaviorValue >= 1 && behaviorValue <= 10) {
            currentStudent.behavior = [{ value: Math.round(behaviorValue * 2) / 2 }];
            renderStudentDetails();
            closeModal('behaviorModal');
        } else {
            alert('Por favor, ingrese un valor válido entre 1 y 10.');
        }
    });

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        modal.querySelectorAll('input').forEach(input => input.value = '');
        modal.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
    }
    
    
    ['gradeModal', 'reportCardModal', 'finalGradeModal', 'behaviorModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
    
        // Selecciona todos los elementos con la clase cerrarModals dentro del modal
        const closeButtons = modal.querySelectorAll('.cerrarModals');
        
        // Agrega el evento click a cada elemento con la clase cerrarModals
        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(modalId));
        });
    });
    

    document.getElementById('students').addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('student-button')) {
            currentStudent = students.find(s => s.id.toString() === e.target.dataset.id);
            document.getElementById('deleteConfirmationModal').style.display = 'block';
        }
    });

    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (currentStudent) {
            students = students.filter(s => s.id !== currentStudent.id);
            renderStudentList();
            document.getElementById('studentDetails').style.display = 'none';
            document.getElementById('deleteConfirmationModal').style.display = 'none';
            currentStudent = null;
        }
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        document.getElementById('deleteConfirmationModal').style.display = 'none';
    });

    ['filterAll', 'filterFirstQuarter', 'filterSecondQuarter', 'filterBothQuarters'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('click', () => {
            currentFilter = filterId.replace('filter', '').toLowerCase();
            renderStudentList();
        });
    });
});