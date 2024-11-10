const carpetas = [
    "concursoArte2024", "torneoVoley2024", "muestraInstitucional2022",
    "egresados2019", "muestraInstitucional2019", "egresados2017"
];

const albunesImg = document.getElementById("albunesImg");
const contenedorAlbunImg = document.getElementById("contenedorAlbunImg");
const albunImgs = document.getElementById("albunImgs");
const contenedorAlbunImgSelect = document.getElementById("contenedorAlbunImgSelect");
const imagenGrande = document.getElementById("imagenGrande");
const tituloAlbum = contenedorAlbunImg.querySelector("h3");

let albumActual = null, imagenActual = null;

carpetas.forEach(carpeta => {
    const button = document.createElement("button");
    button.className = "btnContenedorAlbunes";

    const nombre = carpeta.replace(/\d+$/, '');
    const año = carpeta.match(/\d+$/)[0];

    button.innerHTML = `
        <img src="../../img/galeria/albuns/${carpeta}/f1.webp" alt="${carpeta}">
        <p>${nombre.replace(/([A-Z])/g, ' $1').trim()} ${año}</p>
    `;
    button.onclick = () => mostrarAlbum(carpeta);
    albunesImg.appendChild(button);
});


function mostrarAlbum(carpeta) {
    if (albumActual === carpeta) {
        contenedorAlbunImg.style.display = "none";
        contenedorAlbunImgSelect.style.display = "none";
        albumActual = imagenActual = null;
        return;
    }

    albumActual = carpeta;
    contenedorAlbunImg.style.display = "flex";
    contenedorAlbunImgSelect.style.display = "none";
    imagenActual = null;
    albunImgs.innerHTML = "";

    let totalImages = 0;
    for (let i = 1; i <= 100; i++) {
        const imgPath = `../../img/galeria/albuns/${carpeta}/f${i}.webp`;
        const img = document.createElement("img");
        img.src = imgPath;
        img.alt = `Imagen ${i}`;
        img.onerror = () => img.remove();
        img.onload = () => {
            img.onclick = () => mostrarImagenGrande(imgPath);
            albunImgs.appendChild(img);
            tituloAlbum.textContent = `Fotos del álbum (${++totalImages})`;
        };
    }
}

function mostrarImagenGrande(imgPath) {
    contenedorAlbunImgSelect.style.display = (imagenActual === imgPath) ? "none" : "flex";
    imagenGrande.src = (imagenActual === imgPath) ? "" : imgPath;
    imagenActual = (imagenActual === imgPath) ? null : imgPath;
}

contenedorAlbunImgSelect.onclick = () => {
    contenedorAlbunImgSelect.style.display = "none";
    imagenActual = null;
};
