/* =========================================
                Contructores
========================================= */
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year  = year;
    this.tipo  = tipo;
}

function UI() {}

// Instanciar UI
const ui = new UI;


/* =========================================
              EventListeners
========================================= */
eventListeners();

function eventListeners() {
    // Al cargar el documento
    document.addEventListener('DOMContentLoaded', () => {
        // Llena el select con los años
        ui.llenarOpciones(); 
    })
}


/* =========================================
                Prototypes
========================================= */
UI.prototype.llenarOpciones = () => {
    /* Obtener los ultimos 20 años tomando 
    como referencia el año actual */
    const max = new Date().getFullYear(),
          min = max - 20;

    // Seleccionar <select> de Año:
    const selectYear = document.querySelector('#year');

    // Crear los <option> con los años
    for( let i = max; i > min; i-- ) {
        // Crear <option>
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        // Agregar <option> en el <select>
        selectYear.appendChild(option);
    }
}