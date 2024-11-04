//////////////////////////////////////////////////
//manejo de accesos
document.addEventListener('DOMContentLoaded', () => {
    const filtroMateria = document.getElementById('filtroMateria');
    const todosTbody = document.querySelectorAll('.tablaMaterias tbody');
    const secciones = {
        materias: document.querySelector('.seccionMaterias'),
        boletin: document.querySelector('.seccionBoletin')
    };
    filtroMateria.addEventListener('change', (event) => {
        const valorSeleccionado = event.target.value;
        todosTbody.forEach(tbody => {
            tbody.style.display = valorSeleccionado === 'todos' || tbody.id === `materia-${valorSeleccionado}` ? '' : 'none';
        });
    });
    const alternarSeccion = (seccion) => {
        Object.entries(secciones).forEach(([clave, elem]) => {
            elem.style.display = clave === seccion ? 'block' : 'none';
            if (clave === seccion && clave === 'materias') {
                resetearSeleccion();
                mostrarTodasLasMaterias();
            }
        });
    };
    const resetearSeleccion = () => {
        const selectElement = document.querySelector('#filtroMateria');
        if (selectElement) selectElement.value = 'todos';
    };
    const mostrarTodasLasMaterias = () => {
        todosTbody.forEach(tbody => tbody.style.display = '');
    };
    document.getElementById('seccionBoletinCel').addEventListener('click', () => {
        alternarSeccion(secciones.boletin.style.display === 'block' ? '' : 'boletin');
    });
    document.getElementById('seccionMateriasCel').addEventListener('click', () => {
        alternarSeccion(secciones.materias.style.display === 'block' ? '' : 'materias');
    });
    document.querySelectorAll('.cerrarModals').forEach(cerrar => {
        cerrar.addEventListener('click', () => {
            Object.values(secciones).forEach(elem => elem.style.display = 'none');
        });
    });
    secciones.materias.style.display = 'block';
    secciones.boletin.style.display = 'none';
});
//////////////////////////////////////////////////
// btn para cerrar seccion
document.addEventListener("DOMContentLoaded", () => {
    const secciones = {
      materias: document.querySelector(".seccionMaterias"),
      boletin: document.querySelector(".seccionBoletin"),
    };
  
    document.getElementById("cerrarMaerias").addEventListener("click", () => {
        secciones.materias.style.display = "none";
    });
    
    document.getElementById("cerrarBoletin").addEventListener("click", () => {
        secciones.boletin.style.display = "none";
    });
});
//////////////////////////////////////////////////
//responsil texto boletin
function actualizarTextoCuatrimestresYFinal() {
    const cuatriSpans = document.querySelectorAll('.boletinCuatri');
    const finalSpan = document.querySelector('.boletinFinal');
    const anchoPantalla = window.innerWidth;
    cuatriSpans.forEach(span => {
        if (anchoPantalla <= 562) span.textContent = 'C.';
        else if (anchoPantalla <= 675) span.textContent = 'Cuatr.';
        else span.textContent = 'Cuatrimestre';
    });
    if (finalSpan) {
        finalSpan.textContent = anchoPantalla <= 562 ? 'F.' : anchoPantalla <= 675 ? 'Fin.' : 'Final';
    }
}
window.addEventListener('DOMContentLoaded', actualizarTextoCuatrimestresYFinal);
window.addEventListener('resize', actualizarTextoCuatrimestresYFinal);
//////////////////////////////////////////////////
//hover en materias
document.querySelectorAll('.tablaMaterias tbody').forEach(tbody => {
    let nombreMateria = null;
    tbody.addEventListener('mouseover', e => {
        const target = e.target.closest('.notasExtras');
        if (target) {
            const nombreMateriaElement = target.closest('tbody').querySelector('.nombreMateria');
            if (nombreMateriaElement) {
                nombreMateriaElement.classList.add('highlightNombreMateria');
                target.classList.add('highlight');
            }
        }
    });
    tbody.addEventListener('mouseout', e => {
        const target = e.target.closest('.notasExtras');
        if (target) {
            const nombreMateriaElement = target.closest('tbody').querySelector('.nombreMateria');
            if (nombreMateriaElement) {
                nombreMateriaElement.classList.remove('highlightNombreMateria');
                target.classList.remove('highlight');
            }
        }
    });
    tbody.addEventListener('mouseover', e => {
        const target = e.target.closest('.nombreMateria');
        if (target) {
            const notasExtras = tbody.querySelectorAll('.notasExtras');
            notasExtras.forEach(nota => {
                nota.classList.add('highlight');
            });
            nombreMateria = target;
        }
    });
    tbody.addEventListener('mouseout', e => {
        const target = e.target.closest('.nombreMateria');
        if (target) {
            if (nombreMateria) {
                nombreMateria.classList.remove('highlightNombreMateria');
                const notasExtras = tbody.querySelectorAll('.notasExtras');
                notasExtras.forEach(nota => {
                    nota.classList.remove('highlight');
                });
            }
        }
    });
});
//////////////////////////////////////////////////
//abreviar fechas y notas
function abreviarFechasYNotas() {
    const esPequena = window.innerWidth <= 516;
    document.querySelectorAll('.tablaMaterias th, .tablaMaterias td').forEach(e => {
        e.textContent = e.textContent.trim() === (esPequena ? 'Nota' : 'N.') ? (esPequena ? 'N.' : 'Nota') : e.textContent;
    });
    document.querySelectorAll('.tablaMaterias td').forEach(td => {
        td.textContent = esPequena ? td.textContent.replace('/2024', '/24') : td.textContent.replace('/24', '/2024');
    });
}
window.addEventListener('load', abreviarFechasYNotas);
window.addEventListener('resize', abreviarFechasYNotas);
//////////////////////////////////////////////////
//ajustar tabla
function ajustarTabla() {
    const esPequena = window.innerWidth <= 476;
    document.querySelectorAll('.tablaMaterias td').forEach(td => {
        td.textContent = esPequena ? td.textContent.replace('/24', '') : /^\d{2}\/\d{2}$/.test(td.textContent) ? td.textContent + '/24' : td.textContent;
    });
}
window.addEventListener('load', ajustarTabla);
window.addEventListener('resize', ajustarTabla);
