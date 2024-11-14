// pagina inicial arriba
window.addEventListener('load', () => window.scrollTo(0, 0));
// accedo al perfil del profe o del usuario dependiendo del contenido del input
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    //const pages = { u: 'userMenu', p: 'profMenu', c: 'preceptorMenu', d: 'directorMenu' };
    const pages = { u: 'userMenu', p: 'profMenu'};
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
const carpetas = [
    "torneoVoley2024",
    "muestraInstitucional2022",
    "egresados2019",
    "muestraInstitucional2019",
    "egresados2017"
];

const imagenRandom = document.getElementById('imagenRandom');
const txtPortalGaleria = document.getElementById('txtPortalGaleria');

let ultimaImagen = null;
let imagenesMostradas = [];
let imagenesPrecargadas = [];

function cargarImagenAleatoria() {
    const carpetaAleatoria = carpetas[Math.floor(Math.random() * carpetas.length)];
    const numeroImagenAleatoria = Math.floor(Math.random() * 20) + 1;
    const nuevaImagen = `img/galeria/albuns/${carpetaAleatoria}/f${numeroImagenAleatoria}.webp`;

    if (nuevaImagen === ultimaImagen || imagenesMostradas.includes(nuevaImagen)) {
        return cargarImagenAleatoria();
    }

    imagenesMostradas.push(nuevaImagen);
    ultimaImagen = nuevaImagen;

    if (!imagenesPrecargadas.includes(nuevaImagen)) {
        precargarImagen(nuevaImagen);
    }

    imagenRandom.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    imagenRandom.style.transform = 'scale(0.5)';
    imagenRandom.style.opacity = '0';

    setTimeout(() => {
        imagenRandom.src = nuevaImagen;
    }, 200);

    setTimeout(() => {
        imagenRandom.style.transform = 'scale(1)';
        imagenRandom.style.opacity = '1';
    }, 400);

    // torneoVoley24 + concursoArte24 + muestraInst.22 + egresados19 + muestraInst.19 + egresados17
    txtPortalGaleria.innerText = `Encuentra más de ${45 + 83 + 36 + 51 + 38 + 57} fotos.`;

    precargarImagenSiguiente();
}

function precargarImagen(imagen) {
    const imgPreload = new Image();
    imgPreload.src = imagen;
    imgPreload.onload = () => {
        imagenesPrecargadas.push(imagen);
    };
}

function precargarImagenSiguiente() {
    const carpetaAleatoria = carpetas[Math.floor(Math.random() * carpetas.length)];
    const numeroImagenAleatoria = Math.floor(Math.random() * 20) + 1;
    const imagenSiguiente = `img/galeria/albuns/${carpetaAleatoria}/f${numeroImagenAleatoria}.webp`;

    if (!imagenesPrecargadas.includes(imagenSiguiente)) {
        precargarImagen(imagenSiguiente);
    }
}

cargarImagenAleatoria();

setTimeout(() => {
    setInterval(cargarImagenAleatoria, 4000);
}, 10);