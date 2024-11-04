document.addEventListener("DOMContentLoaded", function() {
    function actualizarNombresMeses() {
        const meses = document.querySelectorAll(".tablaAsistencias .mes");
        
        if (window.innerWidth < 994) {
            meses.forEach(mes => {
                switch (mes.textContent.trim()) {
                    case "Marzo":
                        mes.textContent = "Mar";
                        break;
                    case "Abril":
                        mes.textContent = "Abr";
                        break;
                    case "Mayo":
                        mes.textContent = "May";
                        break;
                    case "Junio":
                        mes.textContent = "Jun";
                        break;
                    case "Julio":
                        mes.textContent = "Jul";
                        break;
                    case "Agosto":
                        mes.textContent = "Ago";
                        break;
                    case "Septiembre":
                        mes.textContent = "Sep";
                        break;
                    case "Octubre":
                        mes.textContent = "Oct";
                        break;
                    case "Noviembre":
                        mes.textContent = "Nov";
                        break;
                    case "Diciembre":
                        mes.textContent = "Dic";
                        break;
                }
            });
        } else {
            meses.forEach(mes => {
                switch (mes.textContent.trim()) {
                    case "Mar":
                        mes.textContent = "Marzo";
                        break;
                    case "Abr":
                        mes.textContent = "Abril";
                        break;
                    case "May":
                        mes.textContent = "Mayo";
                        break;
                    case "Jun":
                        mes.textContent = "Junio";
                        break;
                    case "Jul":
                        mes.textContent = "Julio";
                        break;
                    case "Ago":
                        mes.textContent = "Agosto";
                        break;
                    case "Sep":
                        mes.textContent = "Septiembre";
                        break;
                    case "Oct":
                        mes.textContent = "Octubre";
                        break;
                    case "Nov":
                        mes.textContent = "Noviembre";
                        break;
                    case "Dic":
                        mes.textContent = "Diciembre";
                        break;
                }
            });
        }
    }
    actualizarNombresMeses();
    window.addEventListener("resize", actualizarNombresMeses);
});

document.addEventListener("DOMContentLoaded", function() {
    function actualizarNombresMeses() {
        const meses = document.querySelectorAll(".tablaAsistencias .mes");
        
        if (window.innerWidth < 650) {
            meses.forEach(mes => {
                switch (mes.textContent.trim()) {
                    case "Mar":
                        mes.textContent = "M";
                        break;
                    case "Abr":
                        mes.textContent = "A";
                        break;
                    case "May":
                        mes.textContent = "M";
                        break;
                    case "Jun":
                        mes.textContent = "J";
                        break;
                    case "Jul":
                        mes.textContent = "J";
                        break;
                    case "Ago":
                        mes.textContent = "A";
                        break;
                    case "Sep":
                        mes.textContent = "S";
                        break;
                    case "Oct":
                        mes.textContent = "O";
                        break;
                    case "Nov":
                        mes.textContent = "N";
                        break;
                    case "Dic":
                        mes.textContent = "D";
                        break;
                }
            });
        } else {
            meses.forEach(mes => {
                switch (mes.textContent.trim()) {
                    case "M":
                        mes.textContent = "Mar";
                        break;
                    case "A":
                        mes.textContent = "Abr";
                        break;
                    case "M":
                        mes.textContent = "May";
                        break;
                    case "J":
                        mes.textContent = "Jun";
                        break;
                    case "J":
                        mes.textContent = "Jul";
                        break;
                    case "A":
                        mes.textContent = "Ago";
                        break;
                    case "S":
                        mes.textContent = "Sep";
                        break;
                    case "O":
                        mes.textContent = "Oct";
                        break;
                    case "N":
                        mes.textContent = "Nov";
                        break;
                    case "D":
                        mes.textContent = "Dic";
                        break;
                }
            });
        }
    }
    actualizarNombresMeses();
    window.addEventListener("resize", actualizarNombresMeses);
});

function updateDates() {
    const rows = document.querySelectorAll('.tablaDesglose tbody tr');
    rows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        if (dateCell) {
            let dateText = dateCell.textContent;
            if (window.innerWidth <= 414) {
                dateText = dateText.replace(/\/2024/g, '/24');
            } else {
                dateText = dateText.replace(/\/24/g, '/2024');
            }
            dateCell.textContent = dateText;
        }
    });
}

updateDates();
window.addEventListener('resize', updateDates);


