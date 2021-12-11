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

    // Seleccionar formulario
    const formulario = document.querySelector('#cotizar-seguro');
    
    // Cotizar al detectar submit del formulario
    formulario.addEventListener('submit', cotizarSeguro);
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

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    // Verificar si existe un mensaje en el HTML
    const mensajeHTML = document.querySelector('.mensaje');

    // Si no existe un mensaje en el HTML
    if( !mensajeHTML ) {
        // Crear mensaje
        const div = document.createElement('div');

        // Agregar clase dependiendo del 'tipo' de mensaje
        if (tipo === 'error') {
            div.classList.add('error');
        } else {
            div.classList.add('correcto');
        }
        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;
    
        // Insertar el en HTML
        const formulario = document.querySelector('#cotizar-seguro');
        
        // Insertar el en HTML, antes del div#resultado
        formulario.insertBefore(div, document.querySelector('#resultado'));
    
        // Remover mensaje al pasar 3 segundos
        setTimeout(() => {
            div.remove();
        }, 3000);
    } 
}

/* =========================================
                Funciones
========================================= */
function cotizarSeguro(e) {
    // Evitar que se recargue la pagina
    e.preventDefault();

    // Leer la informacion seleccionada en los campos
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // Si algun campo esta vacio
    if(marca === '' || year === '' || tipo === '') {
        // Mostrar mensaje de eror
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        // Detener el codigo
        return;
    }

    // Mostrar mensaje de exito
    ui.mostrarMensaje('Cotizando...', 'exito');
}