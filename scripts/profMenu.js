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
//