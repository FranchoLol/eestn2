// abrir y cerrar cambios de cursos y materias
document.getElementById("expandirSubHeader").addEventListener("click", function() {
    const seccionCursoMateria = document.querySelector(".seccionCursoMateria");
    const iconSubHeader = document.querySelector(".iconSubHeader");

    if (seccionCursoMateria.style.transform === "translateX(0px)") {
        seccionCursoMateria.style.transform = "translateX(calc(100% - 58px))";
        iconSubHeader.classList.remove("rotado");
    } else {
        seccionCursoMateria.style.transform = "translateX(0)";
        iconSubHeader.classList.add("rotado");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    seleccionarCurso.value = "5to 2da";
    actualizarMaterias();
    seleccionarMateria.value = "Modelos y Sistemas";
});

const seleccionarCurso = document.getElementById("seleccionCurso");
const seleccionarMateria = document.getElementById("seleccionMateria");

function actualizarMaterias() {
    const curso = seleccionarCurso.value;
    let materias = [];

    switch (curso) {
        case "5to 2da":
            materias = ["Modelos y Sistemas", "Lab. Base de datos"];
            break;
        case "6to 2da":
            materias = ["Sistemas de Gestión y Autogestión", "Seguridad Informática"];
            break;;
        default:
            materias = [];
            break;
    }

    seleccionarMateria.innerHTML = `<option value="" selected disabled>Selecciona una materia</option>`;
    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia;
        option.textContent = materia;
        seleccionarMateria.appendChild(option);
    });

    seleccionarMateria.disabled = materias.length === 0;
}

seleccionarCurso.addEventListener("change", () => {
    actualizarMaterias();
});
///////////////////////////////////////////////////////////////////////////////////////////////////








document.addEventListener('DOMContentLoaded', () => {
    let notificationsData = [];
    fetch('../jsons/notifications.json')
        .then(response => response.json())
        .then(data => {
            notificationsData = data.filter(notification => notification.name === "Matias Ferrando");
            renderNotifications(notificationsData);
        })
        .catch(error => console.error('Error al cargar las notificaciones:', error));

    function renderNotifications(data) {
        const container = document.getElementById('contendorNotificaciones');
        container.innerHTML = data.map(notification => `
            <div class="tarjetaNotificacion">
                <div class="notificacionPart1">
                    <img src="${notification.img}" alt="Perfil" class="notification-image">
                    <div class="notification-info">
                        <h3 class="notification-name">${notification.name}</h3>
                        <p class="notification-role">${notification.role}</p>
                    </div>
                    <div class="notification-timestamp">
                        <p class="notification-timestamp-time">${notification.time}</p>
                        <p class="notification-timestamp-day">${notification.day}</p>
                    </div>
                </div>
                <div class="notificacionPart2">
                    <p class="notification-message">${notification.message}</p>
                </div>
                <div class="notificacionPart3">
                    <div class="notification-confirmation">
                        <p class="read-status">
                            <img src="../img/utilidades/visto.png" alt="vistoIMG" class="iconsNotificacion iconsNotificacionVisto"> 
                            Vistos: ${Math.floor(Math.random() * 36)}/35
                        </p>
                    </div>
                    <div class="notification-expanded">
                        <button class="toggle-read-status oculto">Ver más</button>
                        <button class="toggle-view oculto">Ver menos</button>
                    </div>
                </div>
            </div>
        `).join('');

        addEventListenersToCards();
    }

    function addEventListenersToCards() {
        const maxHeight = '5.76em';
        document.querySelectorAll('.tarjetaNotificacion').forEach(card => {
            const markAsRead = card.querySelector('.mark-as-read');
            const readStatus = card.querySelector('.read-status');
            const toggleReadStatus = card.querySelector('.toggle-read-status');
            const toggleView = card.querySelector('.toggle-view');
            const notiMessage = card.querySelector('.notification-message');

            if (notiMessage.scrollHeight > notiMessage.clientHeight) {
                toggleReadStatus.classList.remove('oculto');
            }

            markAsRead?.addEventListener('click', () => {
                markAsRead.classList.add('oculto');
                readStatus.classList.remove('oculto');
            });

            toggleReadStatus?.addEventListener('click', () => {
                toggleReadStatus.classList.add('oculto');
                toggleView.classList.remove('oculto');
                Object.assign(notiMessage.style, {
                    maxHeight: 'none',
                    webkitLineClamp: 'unset'
                });
            });

            toggleView?.addEventListener('click', () => {
                toggleReadStatus.classList.remove('oculto');
                toggleView.classList.add('oculto');
                Object.assign(notiMessage.style, {
                    maxHeight,
                    webkitLineClamp: '4'
                });
            });
        });

        window.addEventListener('resize', () => {
            document.querySelectorAll('.tarjetaNotificacion').forEach(card => {
                const notiMessage = card.querySelector('.notification-message');
                const toggleReadStatus = card.querySelector('.toggle-read-status');

                if (notiMessage.scrollHeight > notiMessage.clientHeight) {
                    toggleReadStatus.classList.remove('oculto');
                } else {
                    toggleReadStatus.classList.add('oculto');
                }
            });
        });
    }
});