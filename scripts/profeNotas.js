document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enterBtn');
    const initialSection = document.querySelector('.initial-section');
    const contentSection = document.querySelector('.main-content');
    const courseSelect = document.getElementById('courseSelect');

    courseSelect.addEventListener('change', () => {
        enterButton.disabled = !courseSelect.value;
    });

    enterButton.addEventListener('click', () => {
        initialSection.classList.add('hidden');
        contentSection.classList.remove('hidden');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const addStudentButton = document.getElementById('addStudent');
    const removeStudentButton = document.getElementById('removeStudent');
    const studentList = document.getElementById('studentList');
    const studentModal = document.getElementById('studentModal');
    const studentNameInput = document.getElementById('studentNameInput');
    const confirmAddStudentButton = document.getElementById('confirmAddStudent');
    const closeStudentModalButton = studentModal.querySelector('.close');

    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const closeConfirmDeleteModalButton = document.getElementById('closeConfirmDeleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteBtn');
    const cancelDeleteButton = document.getElementById('cancelDeleteBtn');

    let selectedStudentButton = null;

    // Función para mostrar el modal
    function showModal(modal) {
        modal.style.display = 'block';
    }

    // Función para ocultar el modal
    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // Agregar nuevo alumno
    function addStudent() {
        const studentName = studentNameInput.value.trim();
        if (studentName) {
            const newStudentButton = document.createElement('button');
            newStudentButton.className = 'student-btn';
            newStudentButton.textContent = studentName;
            studentList.appendChild(newStudentButton);
            hideModal(studentModal);
        } else {
            alert('Por favor, ingrese el nombre del alumno.');
        }
    }

    // Manejar clic en el botón "Nuevo alum."
    addStudentButton.addEventListener('click', () => {
        showModal(studentModal);
    });

    // Manejar clic en el botón de confirmar del modal
    confirmAddStudentButton.addEventListener('click', () => {
        addStudent();
    });

    // Manejar clic en el botón de cerrar del modal
    closeStudentModalButton.addEventListener('click', () => {
        hideModal(studentModal);
    });

    // Manejar clic en el botón "Quitar alum."
    removeStudentButton.addEventListener('click', () => {
        if (selectedStudentButton) {
            showModal(confirmDeleteModal);
        } else {
            alert('Por favor, seleccione un alumno para eliminar.');
        }
    });

    // Confirmar eliminación del alumno
    confirmDeleteButton.addEventListener('click', () => {
        if (selectedStudentButton) {
            studentList.removeChild(selectedStudentButton);
            selectedStudentButton = null;
            hideModal(confirmDeleteModal);
        }
    });

    // Cancelar eliminación del alumno
    cancelDeleteButton.addEventListener('click', () => {
        hideModal(confirmDeleteModal);
    });

    // Manejar clic en un botón de alumno para seleccionar
    studentList.addEventListener('click', (event) => {
        if (event.target.classList.contains('student-btn')) {
            if (selectedStudentButton) {
                selectedStudentButton.classList.remove('selected');
            }
            selectedStudentButton = event.target;
            selectedStudentButton.classList.add('selected');
        }
    });

    // Manejar clic en el botón de cerrar del modal de confirmación
    closeConfirmDeleteModalButton.addEventListener('click', () => {
        hideModal(confirmDeleteModal);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const studentList = document.getElementById('studentList');
    const notesContainer = document.getElementById('notesContainer');
    const studentNameTitle = document.getElementById('studentNameTitle');
    const selectedOption = document.getElementById('selectedOption');
    const selectedGrade = document.getElementById('selectedGrade');
    const uploadBtn = document.getElementById('uploadBtn'); // Botón "Subir"
    
    let selectedStudentButton = null;

    // Manejar clic en un botón de alumno para seleccionar o deseleccionar
    studentList.addEventListener('click', (event) => {
        if (event.target.classList.contains('student-btn')) {
            // Si se clickea el mismo alumno, deseleccionar
            if (selectedStudentButton === event.target) {
                selectedStudentButton.classList.remove('selected');
                selectedStudentButton = null;
                notesContainer.classList.remove('visible');
                studentNameTitle.textContent = 'NombreAlumnSelect';
                selectedOption.textContent = '';
                selectedGrade.textContent = '';
            } else {
                // Deseleccionar el alumno previamente seleccionado
                if (selectedStudentButton) {
                    selectedStudentButton.classList.remove('selected');
                }
                
                // Seleccionar el nuevo alumno
                selectedStudentButton = event.target;
                selectedStudentButton.classList.add('selected');
                
                // Actualizar el título del contenedor de notas
                studentNameTitle.textContent = selectedStudentButton.textContent;

                // Mostrar el contenedor de notas con opacidad
                notesContainer.classList.add('visible');

                // Limpiar los campos de opción y nota
                selectedOption.textContent = '';
                selectedGrade.textContent = '';
            }
        }
    });

    // Manejar clic fuera del contenedor de notas
    document.addEventListener('click', (event) => {
        const isClickInsideNotes = notesContainer.contains(event.target);
        const isClickInsideStudentList = studentList.contains(event.target);
        const isClickInsideSelectedButton = selectedStudentButton && selectedStudentButton.contains(event.target);

        if (!isClickInsideNotes && !isClickInsideStudentList && !isClickInsideSelectedButton) {
            if (selectedStudentButton) {
                selectedStudentButton.classList.remove('selected');
                selectedStudentButton = null;
                notesContainer.classList.remove('visible');
                studentNameTitle.textContent = 'NombreAlumnSelect';
                selectedOption.textContent = '';
                selectedGrade.textContent = '';
            }
        }
    });

    // Manejar clic en el botón "Subir"
    uploadBtn.addEventListener('click', () => {
        // Cerrar el contenedor de notas
        notesContainer.classList.remove('visible');
        // Limpiar los campos de opción y nota
        selectedOption.textContent = '';
        selectedGrade.textContent = '';
        // Deseleccionar el botón del estudiante
        if (selectedStudentButton) {
            selectedStudentButton.classList.remove('selected');
            selectedStudentButton = null;
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Variables para el modal de opciones
    const optionsBtn = document.getElementById('optionsBtn');
    const optionsModal = document.getElementById('optionsModal');
    const closeOptionsModal = document.querySelector('.close-options-modal');
    const otherOptionContainer = document.querySelector('.other-option-container');
    const otherOptionInput = document.getElementById('otherOptionInput');
    const regresarOptionsBtn = document.getElementById('regresarOptionsBtn');
    const aceptarOptionsBtn = document.getElementById('aceptarOptionsBtn');
    const selectedOption = document.getElementById('selectedOption');

    // Abrir el modal de opciones
    optionsBtn.addEventListener('click', () => {
        optionsModal.style.display = 'block';
    });

    // Cerrar el modal de opciones
    closeOptionsModal.addEventListener('click', () => {
        optionsModal.style.display = 'none';
        otherOptionContainer.classList.add('hidden');
        otherOptionInput.value = ''; // Limpiar el input
    });

    // Manejar clic en los botones de opción
    optionsModal.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-btn')) {
            const text = event.target.textContent;
            if (text === 'Otro') {
                otherOptionContainer.classList.remove('hidden');
            } else {
                selectedOption.textContent = text;
                optionsModal.style.display = 'none';
                otherOptionContainer.classList.add('hidden');
            }
        }
        // Evitar que el clic en el botón cierre el modal
        event.stopPropagation();
    });

    // Aceptar el texto personalizado
    aceptarOptionsBtn.addEventListener('click', () => {
        selectedOption.textContent = otherOptionInput.value;
        optionsModal.style.display = 'none';
        otherOptionContainer.classList.add('hidden');
        otherOptionInput.value = ''; // Limpiar el input
    });

    // Regresar sin aceptar el texto personalizado
    regresarOptionsBtn.addEventListener('click', () => {
        optionsModal.style.display = 'none';
        otherOptionContainer.classList.add('hidden');
        otherOptionInput.value = ''; // Limpiar el input
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === optionsModal) {
            optionsModal.style.display = 'none';
            otherOptionContainer.classList.add('hidden');
            otherOptionInput.value = ''; // Limpiar el input
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const gradeBtn = document.getElementById('gradeBtn');
    const gradeModal = document.getElementById('gradeModal');
    const closeGradeModal = document.getElementById('closeGradeModal');
    const numericGradeInput = document.getElementById('numericGradeInput');
    const regresarGradeBtn = document.getElementById('regresarGradeBtn');
    const aceptarGradeBtn = document.getElementById('aceptarGradeBtn');
    const selectedGrade = document.getElementById('selectedGrade');
    const gradeButtons = document.querySelectorAll('.grade-btn');

    // Abrir el modal de notas
    gradeBtn.addEventListener('click', () => {
        gradeModal.style.display = 'block';
    });

    // Cerrar el modal de notas
    closeGradeModal.addEventListener('click', () => {
        gradeModal.style.display = 'none';
        resetGradeModal();
    });

    // Manejar clic en los botones de nota conceptual
    gradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedGrade.textContent = button.dataset.grade;
            gradeModal.style.display = 'none';
        });
    });

    // Aceptar el texto de nota numérica
    aceptarGradeBtn.addEventListener('click', () => {
        const numericGrade = numericGradeInput.value.trim();
        if (numericGrade) {
            selectedGrade.textContent = numericGrade;
            gradeModal.style.display = 'none';
        } else {
            alert('Por favor, ingrese una nota numérica.');
        }
        resetGradeModal();
    });

    // Regresar sin aceptar la nota numérica
    regresarGradeBtn.addEventListener('click', () => {
        gradeModal.style.display = 'none';
        resetGradeModal();
    });

    // Manejar clic dentro del modal
    gradeModal.addEventListener('click', (event) => {
        // Evitar que el clic en el contenido del modal cierre el modal
        event.stopPropagation();
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === gradeModal) {
            gradeModal.style.display = 'none';
            resetGradeModal();
        }
    });

    // Función para resetear el modal
    function resetGradeModal() {
        numericGradeInput.value = ''; // Limpiar el input numérico
        // Ocultar la sección del input numérico al abrir el modal de notas conceptuales
        document.querySelectorAll('.grade-section').forEach(section => section.style.display = 'block');
    }
});


