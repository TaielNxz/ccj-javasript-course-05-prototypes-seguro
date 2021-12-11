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

Seguro.prototype.cotizarSeguro = function() {
    /*
       * Realiza la cotizacion con los datos
       * 1 = Americano 1.15
       * 2 = Asiatico  1.05
       * 3 = Europero  1.35
    */

    // Variable para almacenar el precio 'Total'
    let cantidad;
    // Precio base del seguro de auto
    const base = 2000;
   
    // Calcular precio segun la marca
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    /* Calcular la diferencia entre el 'año actual' 
       y el 'año' que fue seleccionado en el formulario */
    const diferencia = new Date().getFullYear() - this.year;

    /* Con cada año de diferencia,
       el costo del seguro va a reducirse un 3% */
    cantidad -= cantidad * ( ( diferencia * 3 ) / 100 )

    /* Si el seguro es básico se multiplica por un 30% mas
       Si el seguro es completo se multiplica por un 50% mas */
    if( this.tipo === 'basico' ) {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    // Retornar cantidad y Redondear
    return Math.round( cantidad );
}

UI.prototype.mostrarResultado = (total, seguro) => {

    const { marca, year, tipo } = seguro;

    // Crear variable que contenga la marca del auto en texto
    switch (marca) {
        case '1':
            textoMarca = "Americano";
            break;
        case '2':
            textoMarca = "Asiatico";
            break;
        case '3':
            textoMarca = "Europeo";
            break;
        default:
            break;
    }

    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span></p>
    `;

    // Seleccionar el contenedor del resultado
    const resultadoDiv = document.querySelector('#resultado');

    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    // Eliminar el spinner y Mostrar el resultado luego de 3 segundos
    setTimeout(() => {
        // Borrar el spinner
        spinner.style.display = 'none'
        // agregar resultado en su contenedor
        resultadoDiv.appendChild(div);
    }, 3000);
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
    
    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div.mt-10');
    if(resultados != null) {
        resultados.remove();
    };

    // Intanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total  = seguro.cotizarSeguro();

    // Mostrar cotizacion en el html
    ui.mostrarResultado(total, seguro);
}