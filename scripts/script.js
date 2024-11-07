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
const carpetas = [
    "torneoVoley2024",
    "muestraInstitucional2022",
    "egresados2019",
    "muestraInstitucional2019",
    "egresados2017"
];

const imagenRandom = document.getElementById('imagenRandom');
const txtPortalGaleria = document.getElementById('txtPortalGaleria');

const imagenesPorCarpeta = carpetas.reduce((acc, carpeta) => {
    const imagenesAlbum = [];
    let i = 1;
    while (i <= 30) {
        const imgPath = `img/galeria/albuns/${carpeta}/f${i}.jpg`;
        const img = new Image();
        img.src = imgPath;
        img.onerror = () => {
            if (i === 1) acc[carpeta] = [];
            return true;
        };
        img.onload = () => {
            imagenesAlbum.push(imgPath);
        };
        i++;
    }
    acc[carpeta] = imagenesAlbum;
    return acc;
}, {});

let imagenesMostradas = [];
let ultimaImagen = null;
let totalFotos = 0;

carpetas.forEach(carpeta => {
    totalFotos += imagenesPorCarpeta[carpeta].length;
});

function cambiarImagen() {
    const carpetaAleatoria = carpetas[Math.floor(Math.random() * carpetas.length)];
    const imagenesDeCarpeta = imagenesPorCarpeta[carpetaAleatoria];
    
    let nuevaImagen;
    do {
        nuevaImagen = imagenesDeCarpeta[Math.floor(Math.random() * imagenesDeCarpeta.length)];
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

        txtPortalGaleria.innerText = `Encuentra más de ${45 + 83 + 36 + 51 + 38 + 57} fotos.`;
    }, 400);
}

const primeraImagen = imagenesPorCarpeta[carpetas[0]][0];
imagenRandom.src = primeraImagen;
ultimaImagen = primeraImagen;

let intervalo = setInterval(() => {
    cambiarImagen();

    clearInterval(intervalo);
    setInterval(cambiarImagen, 4000);
}, 1000);
