// pagina inicial arriba
window.addEventListener('load', () => window.scrollTo(0, 0));
// accedo al perfil del profe o del usuario dependiendo del contenido del input
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const pages = { u: 'userMenu', p: 'profMenu', c: 'preceptorMenu', d: 'directorMenu' };
    window.location.href = `pages/${pages[username] || 'userMenu'}.html`;
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
// galeria de fotos
const imagenes = [];
const cantidadDeFotos = 6;
const imagenRandom = document.getElementById('imagenRandom');
const txtPortalGaleria = document.getElementById('txtPortalGaleria');

for (let i = 1; i <= cantidadDeFotos; i++) {
    imagenes.push(`img/galeria/f${i}.jpg`);
}

let imagenesMostradas = [];
let ultimaImagen = null;

function cambiarImagen() {
    if (imagenesMostradas.length === imagenes.length) {
        imagenesMostradas = [];
    }
    let nuevaImagen;
    do {
        nuevaImagen = imagenes[Math.floor(Math.random() * imagenes.length)];
    } while (nuevaImagen === ultimaImagen || imagenesMostradas.includes(nuevaImagen));

    imagenesMostradas.push(nuevaImagen);
    ultimaImagen = nuevaImagen;

    imagenRandom.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    imagenRandom.style.transform = 'scale(0.5)';
    imagenRandom.style.opacity = '0';

    setTimeout(() => {
        imagenRandom.src = nuevaImagen;
        setTimeout(() => {
            imagenRandom.style.transform = 'scale(1)';
            imagenRandom.style.opacity = '1';
        }, 50);
        txtPortalGaleria.innerText = `Encuentra más de ${cantidadDeFotos} fotos.`;
    }, 400);
}

imagenRandom.src = imagenes[0];
ultimaImagen = imagenRandom.src;
setInterval(cambiarImagen, 4000);
