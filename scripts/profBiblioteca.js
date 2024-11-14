document.addEventListener('DOMContentLoaded', () => {
    const materialsList = document.getElementById('profBibliotecaMaterialsList');
    const addMaterialBtn = document.getElementById('addMaterialBtn');
    const materialContent = document.getElementById('profBibliotecaMaterialContent');

    let materials = [
        {
            id: 1,
            title: 'Trabajo práctico UML',
            publishDate: '18/10/2024',
            publishTime: '08:00',
            dueDate: '15/11/2024',
            dueTime: '23:59',
            description: 'Realizar el trabajo practico en grupos de 4 estudiantes (excluyente).<br>Realizar una investigación detallada sobre UML (Lenguaje Unificado de Modelado), en la cual debe incluir sus orígenes, principales tipos de diagramas (como diagramas de clases, de secuencia, de casos de uso, etc.), su importancia en el desarrollo de software, y ejemplos prácticos de su aplicación en proyectos reales. El trabajo debe abordar cómo UML facilita la comunicación entre los diferentes actores de un proyecto y cómo contribuye a la documentación y análisis de sistemas. Se debe incluir al menos tres fuentes bibliográficas.',
            attachmentUrl: '../pdf/Archivo-adjuntado-3.pdf',
            attachmentPreview: '../img/previstaPDF/archivoAdjuntado3.png',
            students: []
        },
        {
            id: 2,
            title: 'TP Prototipos',
            publishDate: '01/11/2024',
            publishTime: '10:00',
            dueDate: '30/11/2024',
            dueTime: '23:59',
            description: 'Desarrollar prototipos de interfaz de usuario para una aplicación móvil de gestión de tareas. El trabajo debe incluir wireframes de baja fidelidad y al menos un prototipo de alta fidelidad. Justificar las decisiones de diseño basándose en principios de UX/UI.',
            attachmentUrl: '../pdf/Archivo-adjuntado-3.pdf',
            attachmentPreview: '../img/previstaPDF/archivoAdjuntado3.png',
            students: []
        }
    ];

    function renderMaterials() {
        materialsList.innerHTML = materials.map(material => `
            <button class="profBibliotecaBtn" data-material-id="${material.id}">
                ${material.title}
            </button>
        `).join('');

        materialsList.querySelectorAll('.profBibliotecaBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const materialId = parseInt(btn.dataset.materialId);
                const selectedMaterial = materials.find(m => m.id === materialId);
                renderMaterialDetails(selectedMaterial);
            });
        });
    }

    function renderMaterialDetails(material) {
        materialContent.innerHTML = `
            <div class="profBibliotecaContenedorActividades">
                <div class="profBibliotecaFrag1">
                    <h2 id="tituloActividad">${material.title}</h2>
                    <button id="profBibliotecaClose"><i class="fas fa-times"></i></button>
                </div>
                <div class="profBibliotecaFrag2">
                    <p>Publicado: ${material.publishDate} ${material.publishTime}</p>
                    ${material.dueDate ? `<p>Entrega: ${material.dueDate} ${material.dueTime || ''}</p>` : ''}
                </div>
                <div class="profBibliotecaFrag3">
                    <p>${material.description}</p>
                    ${material.attachmentUrl ? `
                        <a href="${material.attachmentUrl}" target="_blank">
                            <img src="../img/previstaPDF/archivoAdjuntado3.png" alt="PDF Preview">
                            <span>Archivo adjunto <br> <span>PDF</span></span>
                        </a>
                    ` : ''}
                </div>
                <div class="profBibliotecaFrag4">
                    <h4>Estudiantes que entregaron:</h4>
                    <div id="profBibliotecaStudentList"></div>
                </div>
                <button id="profBibliotecaConfigBtn" class="profBibliotecaConfigBtn">Configurar tarea</button>
            </div>
        `;

        const studentList = document.getElementById('profBibliotecaStudentList');
        fetch('../jsons/cursos.json')
            .then(response => response.json())
            .then(data => {
                const students = data["5to 2da"].listado;
                const randomStudents = getRandomStudents(students, 5);
                studentList.innerHTML = randomStudents.map(student => `
                    <div class="profBibliotecaStudentItem">
                        ${student}
                        <br>
                        <a href="#" onclick="simulateFileDownload('${student}'); return false;"><img src="../img/previstaPDF/archivoAdjuntado3.png" alt="PDF Preview"><span>Tp de ${student}</a>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error loading students:', error));

        document.getElementById('profBibliotecaClose').addEventListener('click', () => {
            materialContent.innerHTML = '';
        });

        document.getElementById('profBibliotecaConfigBtn').addEventListener('click', () => {
            renderConfigForm(material);
        });
    }

    function renderConfigForm(material) {
        materialContent.innerHTML = `
            <form id="profBibliotecaConfigForm">
                <div class="profBibliotecaFormGroup">
                    <label for="title">Título:</label>
                    <input type="text" id="title" value="${material.title}" required>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="dueDate">Fecha y hora de entrega (opcional):</label>
                    <div class="dateTimeContainer">
                        <input type="date" id="dueDate" value="${material.dueDate ? formatDateForInput(material.dueDate) : ''}">
                        <input type="time" id="dueTime" value="${material.dueTime || ''}">
                    </div>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="description">Descripción:</label>
                    <textarea id="description" required>${material.description}</textarea>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="fileUpload">Actualizar archivo adjunto:</label>
                    <div class="profBibliotecaFileUpload" id="fileUpload">
                        Arrastra un archivo aquí o haz clic para seleccionar
                        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.bin" style="display: none;">
                    </div>
                </div>
                <button type="submit" class="profBibliotecaSubmitBtn">Guardar cambios</button>
                <button type="button" class="profBibliotecaCancelBtn">Cancelar</button>
            </form>
        `;
    
        const form = document.getElementById('profBibliotecaConfigForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedMaterial = {
                ...material,
                title: document.getElementById('title').value,
                dueDate: document.getElementById('dueDate').value ? formatDateFromInput(document.getElementById('dueDate').value) : null,
                dueTime: document.getElementById('dueTime').value || null,
                description: document.getElementById('description').value,
            };
    
            const index = materials.findIndex(m => m.id === material.id);
            if (index !== -1) {
                materials[index] = updatedMaterial;
            }
    
            renderMaterials();
            renderMaterialDetails(updatedMaterial);
        });
    
        document.querySelector('.profBibliotecaCancelBtn').addEventListener('click', () => {
            renderMaterialDetails(material);
        });
    
        // Simulación de arrastrado de archivos
        const fileUpload = document.getElementById('fileUpload');
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });
    
        fileUpload.addEventListener('dragleave', () => {
            fileUpload.classList.remove('dragover');
        });
    
        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            // Aquí se simularía la carga del archivo
            alert('Archivo adjuntado (simulación)');
        });
    
        fileUpload.addEventListener('click', () => {
            fileUpload.querySelector('input[type="file"]').click();
        });
    
        fileUpload.querySelector('input[type="file"]').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                alert(`Archivo "${e.target.files[0].name}" adjuntado (simulación)`);
            }
        });
    }
    
    // Función auxiliar para formatear la fecha para el input de tipo date
    function formatDateForInput(dateString) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    // Función auxiliar para formatear la fecha desde el input de tipo date
    function formatDateFromInput(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    function getRandomStudents(students, count) {
        const shuffled = students.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    window.simulateFileDownload = (studentName) => {
        alert(`Simulando descarga del archivo de ${studentName}`);
    };

    if (addMaterialBtn) {
        addMaterialBtn.addEventListener('click', () => {
            materialContent.innerHTML = `
                <form id="profBibliotecaNewMaterialForm">
                    <div class="profBibliotecaFormGroup">
                        <label for="title">Título:</label>
                        <input type="text" id="title" required>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="publishDate">Fecha y hora de publicación (dejar en blanco para publicar ahora):</label>
                        <div class="dateTimeContainer">
                            <input type="date" id="publishDate">
                            <input type="time" id="publishTime">
                        </div>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="dueDate">Fecha y hora de entrega (opcional):</label>
                        <div class="dateTimeContainer">
                            <input type="date" id="dueDate">
                            <input type="time" id="dueTime">
                        </div>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="description">Descripción:</label>
                        <textarea id="description" required></textarea>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="fileUpload">Archivo adjunto:</label>
                        <div class="profBibliotecaFileUpload" id="fileUpload">
                            Arrastra un archivo aquí o haz clic para seleccionar
                            <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.bin" style="display: none;">
                        </div>
                    </div>
                    <button type="submit" class="profBibliotecaSubmitBtn">Publicar</button>
                </form>
            `;
    
            const form = document.getElementById('profBibliotecaNewMaterialForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const now = new Date();
                const publishDateInput = document.getElementById('publishDate').value;
                const publishTimeInput = document.getElementById('publishTime').value;
                let publishDate;
    
                if (publishDateInput && publishTimeInput) {
                    publishDate = new Date(publishDateInput + 'T' + publishTimeInput);
                    if (publishDate < now) {
                        alert('La fecha y hora de publicación no puede ser en el pasado.');
                        return;
                    }
                } else {
                    publishDate = now;
                }
    
                const dueDateInput = document.getElementById('dueDate').value;
                const dueTimeInput = document.getElementById('dueTime').value;
                let dueDate = null;
    
                if (dueDateInput && dueTimeInput) {
                    dueDate = new Date(dueDateInput + 'T' + dueTimeInput);
                    if (dueDate < publishDate) {
                        alert('La fecha y hora de entrega debe ser posterior a la fecha y hora de publicación.');
                        return;
                    }
                }
    
                const newMaterial = {
                    id: Date.now(),
                    title: document.getElementById('title').value,
                    publishDate: formatDate(publishDate),
                    publishTime: formatTime(publishDate),
                    dueDate: dueDate ? formatDate(dueDate) : null,
                    dueTime: dueDate ? formatTime(dueDate) : null,
                    description: document.getElementById('description').value,
                    attachmentUrl: '#',
                    attachmentPreview: '../img/previstaPDF/default.png',
                    students: []
                };
    
                materials.unshift(newMaterial);
                renderMaterials();
                renderMaterialDetails(newMaterial);
            });
    
            // Simulación de arrastrado de archivos
            const fileUpload = document.getElementById('fileUpload');
            fileUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUpload.classList.add('dragover');
            });
    
            fileUpload.addEventListener('dragleave', () => {
                fileUpload.classList.remove('dragover');
            });
    
            fileUpload.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUpload.classList.remove('dragover');
                alert('Archivo adjuntado (simulación)');
            });
    
            fileUpload.addEventListener('click', () => {
                fileUpload.querySelector('input[type="file"]').click();
            });
    
            fileUpload.querySelector('input[type="file"]').addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    alert(`Archivo "${e.target.files[0].name}" adjuntado (simulación)`);
                }
            });
        });
    } else {
        console.error('El botón de agregar material no se encontró en el DOM');
    }
    
    function formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    
    function formatTime(date) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    renderMaterials();
});