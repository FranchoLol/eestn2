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
            attachmentUrl: '../pdf/Archivo-adjuntado-4.pdf',
            attachmentPreview: '../img/previstaPDF/archivoAdjuntado4.png',
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
                    <h3 id="tituloActividad">${material.title}</h3>
                    <button id="profBibliotecaClose"><i class="fas fa-times"></i></button>
                </div>
                <div class="profBibliotecaFrag2">
                    <p>Fecha y hora de publicación: ${material.publishDate} ${material.publishTime}</p>
                    ${material.dueDate ? `<p>Fecha y hora de entrega: ${material.dueDate} ${material.dueTime}</p>` : ''}
                </div>
                <div class="profBibliotecaFrag3">
                    <p>${material.description}</p>
                    <a href="${material.attachmentUrl}" target="_blank">
                        <img src="${material.attachmentPreview}" alt="PDF Preview">
                        <span>Archivo adjunto <br> <span>PDF</span></span>
                    </a>
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
                        ${student} - <a href="#" onclick="simulateFileDownload('${student}'); return false;">Ver archivo</a>
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
                    <label for="dueDate">Fecha de entrega:</label>
                    <input type="date" id="dueDate" value="${material.dueDate}" ${material.dueDate ? 'required' : ''}>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="dueTime">Hora de entrega:</label>
                    <input type="time" id="dueTime" value="${material.dueTime}" ${material.dueTime ? 'required' : ''}>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="description">Descripción:</label>
                    <textarea id="description" required>${material.description}</textarea>
                </div>
                <div class="profBibliotecaFormGroup">
                    <label for="fileUpload">Actualizar archivo adjunto:</label>
                    <div class="profBibliotecaFileUpload" id="fileUpload">
                        Arrastra un archivo aquí o haz clic para seleccionar
                        <input type="file" style="display: none;">
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
                dueDate: document.getElementById('dueDate').value,
                dueTime: document.getElementById('dueTime').value,
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
                        <label for="publishDate">Fecha de publicación:</label>
                        <input type="date" id="publishDate" required>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="publishTime">Hora de publicación:</label>
                        <input type="time" id="publishTime" required>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="dueDate">Fecha de entrega (opcional):</label>
                        <input type="date" id="dueDate">
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="dueTime">Hora de entrega (opcional):</label>
                        <input type="time" id="dueTime">
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="description">Descripción:</label>
                        <textarea id="description" required></textarea>
                    </div>
                    <div class="profBibliotecaFormGroup">
                        <label for="fileUpload">Archivo adjunto:</label>
                        <div class="profBibliotecaFileUpload" id="fileUpload">
                            Arrastra un archivo aquí o haz clic para seleccionar
                            <input type="file" style="display: none;">
                        </div>
                    </div>
                    <button type="submit" class="profBibliotecaSubmitBtn">Publicar</button>
                </form>
            `;

            const form = document.getElementById('profBibliotecaNewMaterialForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const now = new Date();
                const publishDate = new Date(document.getElementById('publishDate').value + 'T' + document.getElementById('publishTime').value);
                const dueDate = document.getElementById('dueDate').value ? new Date(document.getElementById('dueDate').value + 'T' + (document.getElementById('dueTime').value || '23:59')) : null;

                if (publishDate < now) {
                    alert('La fecha y hora de publicación no puede ser en el pasado.');
                    return;
                }

                if (dueDate && dueDate < publishDate) {
                    alert('La fecha y hora de entrega debe ser posterior a la fecha y hora de publicación.');
                    return;
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