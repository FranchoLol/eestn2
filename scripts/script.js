// pagina inicial arriba
window.addEventListener('load', () => window.scrollTo(0, 0));
// accedo al perfil del profe o del usuario dependiendo del contenido del input
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const pages = { u: 'userMenu', p: 'profMenu', c: 'preceptorMenu', d: 'directorMenu' };
    window.location.href = `pages/${pages[username] || 'userMenu'}.html`;
});
// portales
document.querySelectorAll('.btn-portal').forEach(btn => {
    btn.addEventListener('click', () => {
        const destino = btn.textContent.includes('Estudiantes') ? 'pages/userMenu.html' : btn.textContent.includes('Profesores') ? 'pages/profMenu.html' : null;
        if (destino) window.location.href = destino;
    });
});
// ocultar y desocultar la contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    this.classList.toggle('show-password');
});
// modal de tienda
const modal = document.getElementById("kioscoModal");
document.getElementById("btnShop").onclick = () => modal.style.display = "flex";
document.querySelectorAll(".btnClose").forEach(btn => {
    btn.onclick = () => modal.style.display = "none";
});
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};
// header menu
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menuRapido > i');
    const opcRapidas = document.querySelector('.opcRapidas');
    const accRapidisimo = document.querySelector('.accRapidisimo'); 
    
    const toggleMenu = () => {
        const isVisible = opcRapidas.style.display === 'flex';
        opcRapidas.style.display = isVisible ? 'none' : 'flex';
        menuIcon.classList.toggle('fa-times', !isVisible);
        menuIcon.classList.toggle('fa-bars', isVisible);
    };

    menuIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (event) => {
        if (!opcRapidas.contains(event.target) && !menuIcon.contains(event.target)) {
            opcRapidas.style.display = 'none';
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    window.addEventListener('scroll', () => {
        opcRapidas.style.display = 'none';
        menuIcon.classList.replace('fa-times', 'fa-bars');
    });
});
