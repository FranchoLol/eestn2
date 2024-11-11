document.addEventListener('DOMContentLoaded', () => {
    let notificationsData = [];

    fetch('../jsons/notifications.json')
        .then(response => response.json())
        .then(data => {
            notificationsData = data.filter(notification => notification.name === "Matias Ferrando");
            renderNotifications(notificationsData);
            setupNotificationForm();
        })
        .catch(error => console.error('Error al cargar las notificaciones:', error));

    function renderNotifications(data) {
        const container = document.getElementById('contendorNotificaciones');
        container.innerHTML = data.map(notification => `
            <div class="tarjetaNotificacion" data-id="${notification.id}">
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
                    <p class="notification-message">${notification.message.replace(/\n/g, '<br>')}</p>
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
                <div class="notification-part4">
                    <button class="notification-action-btn">
                        <img src="../img/utilidades/engranaje.png" alt="Conf." class="btnCOnfiguracionDeMensaje">
                    </button>
                </div>
            </div>
        `).join('');

        addEventListenersToCards();
    }

    function addEventListenersToCards() {
        const maxHeight = '5.76em';
        document.querySelectorAll('.tarjetaNotificacion').forEach(card => {
            const toggleReadStatus = card.querySelector('.toggle-read-status');
            const toggleView = card.querySelector('.toggle-view');
            const notiMessage = card.querySelector('.notification-message');
            const configButton = card.querySelector('.notification-action-btn');

            function checkMessageHeight() {
                if (notiMessage.scrollHeight > notiMessage.clientHeight) {
                    toggleReadStatus.classList.remove('oculto');
                } else {
                    toggleReadStatus.classList.add('oculto');
                }
            }

            checkMessageHeight();

            toggleReadStatus?.addEventListener('click', () => {
                toggleReadStatus.classList.add('oculto');
                toggleView.classList.remove('oculto');
                notiMessage.style.maxHeight = 'none';
                notiMessage.style.webkitLineClamp = 'unset';
            });

            toggleView?.addEventListener('click', () => {
                toggleReadStatus.classList.remove('oculto');
                toggleView.classList.add('oculto');
                notiMessage.style.maxHeight = maxHeight;
                notiMessage.style.webkitLineClamp = '4';
                checkMessageHeight();
            });

            configButton?.addEventListener('click', () => {
                const notificationId = card.dataset.id;
                const notification = notificationsData.find(n => n.id.toString() === notificationId);
                if (notification) {
                    document.getElementById('notificationMessage').value = notification.message;
                    document.getElementById('notificationForm').dataset.editId = notificationId;
                    document.getElementById('submitNotification').textContent = 'Actualizar Notificación';
                    document.getElementById('deleteNotification').style.display = 'inline-block';
                }
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

    function setupNotificationForm() {
        const form = document.getElementById('notificationForm');
        const deleteButton = document.getElementById('deleteNotification');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('notificationMessage').value;
            const editId = form.dataset.editId;

            if (editId) {
                // Editing existing notification
                const notificationIndex = notificationsData.findIndex(n => n.id.toString() === editId);
                if (notificationIndex !== -1) {
                    notificationsData[notificationIndex].message = message;
                }
            } else {
                // Adding new notification
                const newNotification = {
                    id: Date.now(),
                    name: "Matias Ferrando",
                    role: "Profesor",
                    img: "../img/perfiles/FerrandoMatias.jpg",
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    day: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
                    message: message
                };
                notificationsData.unshift(newNotification);
            }

            renderNotifications(notificationsData);
            resetForm();
        });

        deleteButton.addEventListener('click', () => {
            const editId = form.dataset.editId;
            if (editId) {
                if (confirm('¿Está seguro de que desea eliminar esta notificación?')) {
                    notificationsData = notificationsData.filter(n => n.id.toString() !== editId);
                    renderNotifications(notificationsData);
                    resetForm();
                }
            }
        });
    }

    function resetForm() {
        const form = document.getElementById('notificationForm');
        form.reset();
        form.dataset.editId = '';
        document.getElementById('submitNotification').textContent = 'Agregar Notificación';
        document.getElementById('deleteNotification').style.display = 'none';
    }
});