// Existing calendar data
const feriados = ["2024-08-15", "2024-10-11", "2024-10-14", "2024-12-25"];
const diasParo = ["2024-05-01", "2024-06-20", "2024-09-10", "2024-09-11", "2024-10-30"];
const mesesExcluidos = [0, 1, 10, 11];
const categorias = ["TP", "Examen", "Oral", "Exposición", "Act."];

// Initialize notas object for "Modelos y Sistemas"
let notas = {
  "2024-09-06": [{categoria: "TP", materia: "Modelo y sistemas", descripcion: "Prototipos no operacionales"}],
  "2024-11-15": [
    {categoria: "TP", materia: "Modelo y sistemas", descripcion: "TP final"},
    {categoria: "TP", materia: "Modelo y sistemas", descripcion: "Investigación UML"}
  ],
};

let fechaActual = new Date();
let fechaSeleccionada = null;

function renderizarCalendario() {
  const calendario = document.getElementById("calendarioPart3");
  const indicadorMes = document.getElementById("mesIndicador");
  calendario.innerHTML = "";
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();
  const primerDia = new Date(año, mes, 0);
  const ultimoDiaMes = new Date(año, mes + 1, 0).getDate();
  const ultimoDiaMesAnterior = new Date(año, mes, 0).getDate();
  
  indicadorMes.textContent = `${fechaActual.toLocaleString("es-ES", { month: "long" })} ${año}`;
  
  for (let i = primerDia.getDay(); i > 0; i--) {
    calendario.innerHTML += `<div class="calendarioDias semana"><span class="numeroDia">${ultimoDiaMesAnterior - i + 1}</span></div>`;
  }
  
  for (let dia = 1; dia <= ultimoDiaMes; dia++) {
    const fecha = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const notasDia = notas[fecha] || [];
    const fechaObjeto = new Date(año, mes, dia);
    const esFinDeSemana = fechaObjeto.getDay() === 0 || fechaObjeto.getDay() === 6;
    const esFeriadoOParo = feriados.includes(fecha) || diasParo.includes(fecha);
    const diaFeriadoDiaParo = esFeriadoOParo ? "feriado" : "";
    const categoriasNotas = notasDia.length ? notasDia.map(n => n.categoria).join(", ") : "";
    
    calendario.innerHTML += `
      <div class="calendarioDias ${esFinDeSemana ? "semana" : ""}" data-fecha="${fecha}">
        <span class="numeroDia ${diaFeriadoDiaParo}">${dia}</span>
        <span class="notaDia">${categoriasNotas}</span>
      </div>
    `;
  }
}

function cambiarMes(offset) {
  fechaActual.setMonth(fechaActual.getMonth() + offset);
  renderizarCalendario();
}

document.getElementById("mesAnterior").addEventListener("click", () => {
  if (fechaActual.getFullYear() > 2024 || fechaActual.getMonth() > 0) cambiarMes(-1);
});

document.getElementById("mesSiguinte").addEventListener("click", () => {
  if (fechaActual.getFullYear() < 2024 || fechaActual.getMonth() < 11) cambiarMes(1);
});

const calendario = document.getElementById("calendarioPart3");
const modal = document.getElementById("modalEventosCalendarioProfesor");
const cerrarModal = document.querySelector(".modal .cerrarModals");
const listaNotas = document.getElementById("modalPart2EventosCalendarioProfesor");
const formEvento = document.getElementById("formEvento");
const categoriaSelect = document.getElementById("categoriaEvento");
const otraCategoriaInput = document.getElementById("otraCategoria");
const descripcionInput = document.getElementById("descripcionEvento");
const guardarEventoBtn = document.getElementById("guardarEvento");
const fechaSeleccionadaSpan = document.getElementById("fechaSeleccionada");
const modalPart3 = document.getElementById("modalPart3");

function actualizarNotas(fecha) {
  const notasSeleccionadas = notas[fecha] || [];
  const fechaObj = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const puedeEditarEliminar = fechaObj >= hoy;

  listaNotas.innerHTML = notasSeleccionadas
    .map((nota, index) => `
      <div class="note-item">
        <button class="eliminarNota" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
        <button class="editarNota" data-index="${index}"><i class="fas fa-edit"></i></button>
        <strong>${nota.categoria}:</strong> ${nota.descripcion}
        ${puedeEditarEliminar ? `
        ` : ''}
      </div>
    `).join("");

  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.editarNota').forEach(btn => {
    btn.addEventListener('click', (e) => editarNota(fecha, parseInt(e.target.dataset.index)));
  });
  document.querySelectorAll('.eliminarNota').forEach(btn => {
    btn.addEventListener('click', (e) => eliminarNota(fecha, parseInt(e.target.dataset.index)));
  });
}

function abrirModal(fecha) {
  fechaSeleccionada = fecha;
  fechaSeleccionadaSpan.textContent = fecha;
  actualizarNotas(fecha);
  modal.classList.remove("oculto");
  modal.style.display = "block";

  const fechaObj = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  if (fechaObj >= hoy) {
    modalPart3.style.display = "block";
  } else {
    modalPart3.style.display = "none";
  }
}

function cerrarModalFn() {
  modal.classList.add("oculto");
  modal.style.display = "none";
  formEvento.reset();
  otraCategoriaInput.style.display = "none";
}

function editarNota(fecha, index) {
  const nota = notas[fecha][index];
  categoriaSelect.value = categorias.includes(nota.categoria) ? nota.categoria : "otro";
  if (categoriaSelect.value === "otro") {
    otraCategoriaInput.style.display = "block";
    otraCategoriaInput.value = nota.categoria;
  }
  descripcionInput.value = nota.descripcion;
  guardarEventoBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar';
  guardarEventoBtn.dataset.editIndex = index;
}

function eliminarNota(fecha, index) {
  if (confirm("¿Está seguro de que desea eliminar esta nota?")) {
    notas[fecha].splice(index, 1);
    if (notas[fecha].length === 0) {
      delete notas[fecha];
    }
    actualizarNotas(fecha);
    renderizarCalendario();
  }
}

cerrarModal.addEventListener("click", cerrarModalFn);

window.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModalFn();
});

calendario.addEventListener("click", (e) => {
  if (e.target.classList.contains("calendarioDias")) {
    abrirModal(e.target.getAttribute("data-fecha"));
  }
});

categoriaSelect.addEventListener("change", () => {
  if (categoriaSelect.value === "otro") {
    otraCategoriaInput.style.display = "block";
  } else {
    otraCategoriaInput.style.display = "none";
  }
});

formEvento.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoria = categoriaSelect.value === "otro" ? otraCategoriaInput.value.trim() : categoriaSelect.value;
  const descripcion = descripcionInput.value.trim();
  const editIndex = guardarEventoBtn.dataset.editIndex;

  // Verificar si "Otro" está vacío
  if (categoriaSelect.value === "otro" && categoria === "") {
    alert("Por favor, especifica una categoría en el campo de 'Otro'.");
    otraCategoriaInput.focus();
    return; // Termina el evento sin guardar
  }

  // Verificar si la descripción está vacía
  if (!descripcion) {
    alert("Por favor, proporciona una descripción para el evento.");
    descripcionInput.focus();
    return; // Termina el evento sin guardar
  }

  if (!fechaSeleccionada) return;

  if (!notas[fechaSeleccionada]) {
    notas[fechaSeleccionada] = [];
  }

  const nuevoEvento = {
    categoria: categoria,
    materia: "Modelo y sistemas",
    descripcion: descripcion
  };

  if (editIndex !== undefined) {
    notas[fechaSeleccionada][editIndex] = nuevoEvento;
    delete guardarEventoBtn.dataset.editIndex;
    guardarEventoBtn.innerHTML = '<i class="fas fa-save"></i> Guardar';
  } else {
    notas[fechaSeleccionada].push(nuevoEvento);
  }

  actualizarNotas(fechaSeleccionada);
  renderizarCalendario();
  formEvento.reset();
  otraCategoriaInput.style.display = "none";
});


// Initialize the calendar
renderizarCalendario();

// Responsive section handling (unchanged from the original code)
document.addEventListener("DOMContentLoaded", () => {
  const secciones = {
    notificaciones: document.querySelector(".seccionNotificaciones"),
    calendario: document.querySelector(".seccionCalendario"),
  };
  
  const actualizarVisibilidad = () => {
    const anchoPantalla = window.innerWidth;
    if (anchoPantalla >= 840) {
      Object.values(secciones).forEach(elem => elem.style.display = "block");
    } else {
      const visible = Object.keys(secciones).find(key => secciones[key].style.display === "block");
      Object.entries(secciones).forEach(([key, elem]) => elem.style.display = key === visible ? "block" : "none");
    }
  };
  
  const alternarSeccion = seccion => {
    if (window.innerWidth < 840) {
      Object.entries(secciones).forEach(([key, elem]) => elem.style.display = key === seccion ? "block" : "none");
    }
  };
  
  document.getElementById("seccionNotificacionesCel").addEventListener("click", () => {
    alternarSeccion(secciones.notificaciones.style.display === "block" ? "" : "notificaciones");
  });
  
  document.getElementById("seccionCalendarioCel").addEventListener("click", () => {
    alternarSeccion(secciones.calendario.style.display === "block" ? "" : "calendario");
  });
  
  document.getElementById("cerrarNotificaciones").addEventListener("click", () => {
    secciones.notificaciones.style.display = "none";
  });
  
  document.getElementById("cerrarCalendario").addEventListener("click", () => {
    secciones.calendario.style.display = "none";
  });
  
  actualizarVisibilidad();
  window.addEventListener("resize", actualizarVisibilidad);
  secciones.notificaciones.style.display = "block";
});