document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalBibliotecaUser');
    const modalTitle = document.getElementById('modalTituloBibliotecaUser');
    const closeButton = document.querySelector('.cerrarModals');

    // Función para mostrar el modal con el título correcto
    function abrirModal(titulo) {
        modalTitle.textContent = titulo; // Actualiza el título del modal
        modal.classList.remove('oculto');
        modal.style.display = 'block'; // Asegúrate de que el modal esté visible
    }

    // Asignación de eventos para los enlaces de la biblioteca
    document.querySelectorAll('.accesoBilioteca').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            // Extrae el texto del enlace (que es el tipo de material) y el título (que es la materia)
            const material = link.textContent.trim();
            const materia = link.dataset.title;
            const titulo = `${materia} - ${material}`;
            abrirModal(titulo); // Abre el modal con el título adecuado
        });
    });

    // Función para cerrar el modal
    function cerrarModalFn() {
        modal.classList.add('oculto');
        modal.style.display = 'none'; // Oculta el modal
    }

    // Cierre del modal con el botón de cerrar
    closeButton.onclick = cerrarModalFn;

    // Cierre del modal si se hace clic fuera del contenido del modal
    window.onclick = e => {
        if (e.target === modal) {
            cerrarModalFn();
        }
    };
});




document.querySelectorAll('.tablaBiblioteca tbody tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, i) => {
        cell.addEventListener('mouseover', () => {
            cells[Math.floor(i / 2) * 2].style.backgroundColor = 'var(--Tcolor)';
            cells[Math.floor(i / 2) * 2 + 1].style.backgroundColor = 'var(--Tcolor)';
        });
        cell.addEventListener('mouseout', () => {
            cells[Math.floor(i / 2) * 2].style.backgroundColor = '';
            cells[Math.floor(i / 2) * 2 + 1].style.backgroundColor = '';
        });
    });
});
