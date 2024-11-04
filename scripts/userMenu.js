document.addEventListener('DOMContentLoaded', () => {
    let notificationsData = [];
    fetch('../jsons/notifications.json')
        .then(response => response.json())
        .then(data => {
            notificationsData = data;
            renderNotifications(data);
            updateNameFilterOptions();
        })
        .catch(error => console.error('Error al cargar las notificaciones:', error));

    const roleFilter = document.getElementById('roleFilter');
    const nameFilter = document.getElementById('nameFilter');

    roleFilter.addEventListener('change', () => {
        updateNameFilterOptions();
        nameFilter.value = "Todos";
        filterNotifications();
    });

    nameFilter.addEventListener('change', () => {
        filterNotifications();
        updateRoleFilter();
    });

    function filterNotifications() {
        const selectedRole = roleFilter.value;
        const selectedName = nameFilter.value;
        let filteredNotifications = notificationsData;

        if (selectedRole !== 'Todos') {
            filteredNotifications = filteredNotifications.filter(notification => notification.role === selectedRole);
        }

        if (selectedName !== 'Todos') {
            filteredNotifications = filteredNotifications.filter(notification => notification.name === selectedName);
        }

        renderNotifications(filteredNotifications);
    }

    function updateNameFilterOptions() {
        const selectedRole = roleFilter.value;
        let filteredNames = notificationsData
            .filter(notification => selectedRole === 'Todos' || notification.role === selectedRole)
            .map(notification => ({ name: notification.name, role: notification.role }))
            .filter((value, index, self) => self.findIndex(v => v.name === value.name) === index)
            .sort((a, b) => a.name.localeCompare(b.name));

        nameFilter.innerHTML = '<option value="Todos">Todos</option>';

        filteredNames.filter(item => item.role === 'Preceptor').forEach(({ name }) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = `Precp. ${name}`;
            nameFilter.appendChild(option);
        });

        filteredNames.filter(item => item.role === 'Profesor').forEach(({ name }) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = `Prof. ${name}`;
            nameFilter.appendChild(option);
        });

        if (selectedRole !== 'Todos' && filteredNames.length > 0) {
            nameFilter.value = filteredNames[0].name;
        }
    }

    function updateRoleFilter() {
        const selectedName = nameFilter.value;
        if (selectedName !== 'Todos') {
            const selectedPerson = notificationsData.find(notification => notification.name === selectedName);
            if (selectedPerson) {
                roleFilter.value = selectedPerson.role;
                updateNameFilterOptions();
            }
        }
    }

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
                        <button class="mark-as-read ${notification.read ? 'oculto' : ''}">
                            <img src="../img/utilidades/notificacion.png" alt="vistoIMG" class="iconsNotificacion"> 
                            Marcar como leído
                        </button>
                        <p class="read-status ${notification.read ? '' : 'oculto'}">
                            <img src="../img/utilidades/visto.png" alt="vistoIMG" class="iconsNotificacion iconsNotificacionVisto"> 
                            Leído
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
