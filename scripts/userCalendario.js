//////////////////////////////////////////////////
//calendario
const notas = {
    "2024-08-28": [{categoria: "Examen", materia: "Matemática", descripcion: "Funciones logaritmicas"}],
    "2024-08-30": [{categoria: "Act.", materia: "", descripcion: "Entrega de bolsones"}],
    "2024-09-02": [{categoria: "TP", materia: "Geografía", descripcion: "Vaca muerta"}],
    "2024-09-06": [{categoria: "TP", materia: "Modelo y sistemas", descripcion: "Prototipos no operacionales"}],
    "2024-09-03": [{categoria: "Examen", materia: "Sistemas digitales", descripcion: "Complemento A1 y A2"}],
    "2024-09-20": [{categoria: "Act.", materia: "Torneo", descripcion: "Torneo interno de voley"}],
    "2024-09-30": [{categoria: "Examen", materia: "Matemática", descripcion: "Limites, discontinuidad"},
                   {categoria: "TP", materia: "Geografía", descripcion: "TP Integrador, 1er cuatrimestre"}
                  ],
    "2024-10-14": [{categoria: "Act.", materia: "Lab. DDBB", descripcion: "Trabajo Diagnostico"}],
    "2024-10-23": [{categoria: "Examen", materia: "Ingles", descripcion: "Reported Speech Test"}],
    "2024-11-04": [{categoria: "Oral", materia: "Lab. diseño web", descripcion: "Expresion web y etiquetas HTML"}],
    "2024-11-15": [{categoria: "TP", materia: "Modelo y sistemas", descripcion: "TP final"},
                   {categoria: "TP", materia: "Modelo y sistemas", descripcion: "Investigación UML"}
                  ],
  }; 
const asistencia = {
    "2024-03-07": "T", "2024-03-12": "P;A",
    "2024-04-24": "A;A", "2024-04-25": "A",
    "2024-05-06": "P;T", "2024-05-15": "P;T", "2024-05-17": "A", "2024-05-30": "A",
    "2024-06-04": "A;P", "2024-06-06": "A",
    
};
const mesesExcluidos = [0, 1, 10, 11];
const categorias = ["TP", "Examen", "Oral", "Exposición", "Act."];
const feriados = ["2024-08-15", "2024-10-11", "2024-10-14", "2024-12-25"];
const diasParo = ["2024-05-01", "2024-06-20", "2024-09-10", "2024-09-11", "2024-10-30"];
let fechaActual = new Date();
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
    let marcaAsistencia = asistencia[fecha] || "";
    const fechaObjeto = new Date(año, mes, dia);
    const esFinDeSemana = fechaObjeto.getDay() === 0 || fechaObjeto.getDay() === 6;
    const esFeriadoOParo = feriados.includes(fecha) || diasParo.includes(fecha);
    const esDiaConDobleAsistencia = [1, 2, 3].includes(fechaObjeto.getDay());
    if (!esFeriadoOParo && !esFinDeSemana && !mesesExcluidos.includes(mes)) {
      marcaAsistencia = esDiaConDobleAsistencia && !marcaAsistencia ? "P;P" : (marcaAsistencia || "P");
    }
    const asistenciaElemento = marcaAsistencia.includes(";")
      ? `<span class="asistencia"><span class="asistenciaTaller ${marcaAsistencia.split(";")[0]}"><sup>${marcaAsistencia.split(";")[0]}</sup></span><span class="barra">/</span><span class="asistenciaTeorico ${marcaAsistencia.split(";")[1]}"><sub>${marcaAsistencia.split(";")[1]}</sub></span></span>`
      : marcaAsistencia ? `<span class="asistencia ${marcaAsistencia}">${marcaAsistencia}</span>` : "";
    const categoriasNotas = notasDia.length ? notasDia.map(n => n.categoria).join(", ") : "";
    const diaFeriadoDiaParo = esFeriadoOParo ? "feriado" : "";
    calendario.innerHTML += `
      <div class="calendarioDias ${esFinDeSemana ? "semana" : ""}" data-fecha="${fecha}">
        <span class="numeroDia ${diaFeriadoDiaParo}">${dia}</span>
        <span class="notaDia">${categoriasNotas}</span>
        ${asistenciaElemento}
      </div>
    `;
  }
}
function esFeriadoOParo(fecha) {
  return feriados.includes(fecha) || diasParo.includes(fecha);
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
const mostrarNota = (e, mostrarCompleto) => {
  if (e.target.classList.contains("calendarioDias")) {
    const fecha = e.target.getAttribute("data-fecha");
    const notaElemento = e.target.querySelector(".notaDia");
    if (notas[fecha] && notaElemento) {
      const contenido = mostrarCompleto 
        ? notas[fecha].map(n => `${n.categoria} - ${n.materia}`).join(", ") 
        : notas[fecha].map(n => n.categoria).join(", ");
      notaElemento.innerHTML = contenido;
    }
  }
};
calendario.addEventListener("mouseover", e => {
  e.target.classList.add("expandirNotaDia");
  mostrarNota(e, window.innerWidth >= 750);
});
calendario.addEventListener("mouseout", e => {
  e.target.classList.remove("expandirNotaDia");
  mostrarNota(e, false);
});
renderizarCalendario();
//////////////////////////////////////////////////
//visualizar las eventos del calendario
const modal = document.getElementById("modalEventosCalendarioUser");
const cerrarModal = document.querySelector(".modal .cerrarModals");
const listaNotas = document.getElementById("modalPart2EventosCalendarioUser");
function actualizarNotas(notasSeleccionadas) {
  listaNotas.innerHTML = notasSeleccionadas
    .map(
      (nota) => `<div class="note-item"><strong>${nota.categoria}:</strong> ${nota.materia ? nota.materia + " - " : ""} ${nota.descripcion}</div>`
    ).join("");
}
function abrirModal(fecha) {
  const notasSeleccionadas = notas[fecha] || [];
  if (notasSeleccionadas.length > 0) {
    actualizarNotas(notasSeleccionadas);
    modal.classList.remove("oculto");
    modal.style.display = "block";
  }
}
function cerrarModalFn() {
  modal.classList.add("oculto");
  modal.style.display = "none";
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
//////////////////////////////////////////////////
//manejo de secciones en responsil
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