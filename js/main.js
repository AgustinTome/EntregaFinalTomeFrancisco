// 01. Crear arrays de Primer y Segundo Cuatrimestre
let pCuatri = [];
let sCuatri = [];
let contadorMateriasPCuatri = 0;
let contadorMateriasSCuatri = 0;

// 02.00 Agregar Materias a un Cuatrimestre
function agregarMateria(cuatrimestre, descripcionInput, notaInput) {
    // 02.01 Verificar si la materia ya existe en el cuatrimestre
    const materiaExistente = cuatrimestre.find(materia => materia.descripcion === descripcionInput);
    
    if (materiaExistente) {
        Swal.fire({
            title: "Materia Duplicada",
            text: "La materia ya ha sido agregada al cuatrimestre.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }
    
    if (descripcionInput === '' || isNaN(notaInput) || notaInput < 0 || notaInput > 10) {
        Swal.fire({
            title: "Oopps",
            text: "Ingresa una nota válida entre 0 y 10",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }
    cuatrimestre.push({ descripcion: descripcionInput, monto: notaInput });
    if (cuatrimestre === pCuatri) {
        contadorMateriasPCuatri = cuatrimestre.length;
    } else if (cuatrimestre === sCuatri) {
        contadorMateriasSCuatri = cuatrimestre.length;
    }

    // 02.02 Actualizar el promedio del cuatrimestre
    actualizarPromedio(cuatrimestre, cuatrimestre === pCuatri ? 'promedioPCuatri' : 'promedioSCuatri');
    // 02.03 Mostrar las materias del cuatrimestre
    mostrarMaterias(cuatrimestre, cuatrimestre === pCuatri ? 'listaMaterias01' : 'listaMaterias02');
}

// 03.00 Actualizar Promedio de un Cuatrimestre
function actualizarPromedio(cuatrimestre, promedioElementId) {
    if (cuatrimestre.length === 0) {
        document.getElementById(promedioElementId).textContent = "0.00";
    } else {
        let total = cuatrimestre.reduce((sum, materia) => sum + materia.monto, 0);
        let promedio = total / cuatrimestre.length;
        document.getElementById(promedioElementId).textContent = promedio.toFixed(2);
    }
}

// 04.00 Mostrar Materias de un Cuatrimestre
function mostrarMaterias(cuatrimestre, listaElementId) {
    const listaElement = document.getElementById(listaElementId);
    const cuatrimestreHtml = cuatrimestre.map(item => `<li class="lista">${item.descripcion}: ${item.monto.toFixed(2)}</li>`).join('');
    listaElement.innerHTML = cuatrimestreHtml;
}

// 05.00 Evento de botón para agregar Materias al Primer Cuatrimestre
let btnMaterias01 = document.getElementById('btnMaterias01');
btnMaterias01.addEventListener('click', function (event) {
    event.preventDefault();
    // 05.01 Obtener el valor seleccionado del selector de materias
    let descripcion = selectMateria01.value;
    let monto = parseFloat(document.getElementById('notaMateria01').value);
    agregarMateria(pCuatri, descripcion, monto);
    // 05.02 Mostrar las materias del primer cuatrimestre
    mostrarMaterias(pCuatri, 'listaMaterias01');
});

// 06.00 Evento de botón para agregar Materias al Segundo Cuatrimestre
let btnMateria02 = document.getElementById('btnMateria02');
btnMateria02.addEventListener('click', function (event) {
    event.preventDefault();
    // 06.01 Obtener el valor seleccionado del selector de materias
    let descripcion = selectMateria02.value;
    let monto = parseFloat(document.getElementById('notaMateria02').value);
    agregarMateria(sCuatri, descripcion, monto);
    // 06.02 Mostrar las materias del segundo cuatrimestre
    mostrarMaterias(sCuatri, 'listaMaterias02');
});

// 07.00 Boton para guardar datos en el Local Storage
let botonGuardar = document.getElementById('guardarDatos');
botonGuardar.addEventListener("click", function () {
    localStorage.setItem('pCuatri', JSON.stringify(pCuatri));
    localStorage.setItem('sCuatri', JSON.stringify(sCuatri));
    Swal.fire({
        title: "Guardado",
        text: "Acabas de guardar los datos",
        icon: "success",
        confirmButtonText: "OK"
    });
});

// 08.00 Tomar el evento del boton para Cargar datos
let botonCargar = document.getElementById('cargarDatos');
botonCargar.addEventListener('click', function () {
    cargarDatosDesdeLocalStorage();
    Swal.fire({
        title: "Cargado",
        text: "Acabas de cargar los datos anteriormente guardados",
        icon: "success",
        confirmButtonText: "OK"
    });
});

// 09.00 Esta funcion trae los datos guardados al Dom
function cargarDatosDesdeLocalStorage() {
    const pCuatriGuardado = JSON.parse(localStorage.getItem('pCuatri'));
    const sCuatriGuardado = JSON.parse(localStorage.getItem('sCuatri'));

    if (pCuatriGuardado) {
        pCuatri = pCuatriGuardado;
        contadorMateriasPCuatri = pCuatri.length;
        actualizarPromedio(pCuatri, 'promedioPCuatri');
        mostrarMaterias(pCuatri, 'listaMaterias01');
    }

    if (sCuatriGuardado) {
        sCuatri = sCuatriGuardado;
        contadorMateriasSCuatri = sCuatri.length;
        actualizarPromedio(sCuatri, 'promedioSCuatri');
        mostrarMaterias(sCuatri, 'listaMaterias02');
    }
}

// 10.00 Boton para borrar los datos tanto del local Storage como del DOM
let botonBorrarDatos = document.getElementById('borrarDatos');
botonBorrarDatos.addEventListener('click', function () {
    Swal.fire({
        title: '¿Quieres Reiniciar?',
        text: "Este paso es Irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Borrado!',
                'Acabas de reiniciar todos los datos',
                'success'
            )
            localStorage.removeItem('pCuatri');
            localStorage.removeItem('sCuatri');
            pCuatri = [];
            sCuatri = [];
            contadorMateriasPCuatri = 0;
            contadorMateriasSCuatri = 0;
            actualizarPromedio(pCuatri, 'promedioPCuatri');
            actualizarPromedio(sCuatri, 'promedioSCuatri');
            mostrarMaterias(pCuatri, 'listaMaterias01');
            mostrarMaterias(sCuatri, 'listaMaterias02');
        }
    })
});

// 11.00 Evento de botón para calcular el promedio anual
let btnCalcularPromedioAnual = document.getElementById('calcularPromedioAnual');
btnCalcularPromedioAnual.addEventListener('click', function () {
    // 11.01 Verificar si se han agregado todas las materias en ambos cuatrimestres
    if (contadorMateriasPCuatri < 5 || contadorMateriasSCuatri < 5) {
        Swal.fire({
            title: "Aun te faltan materias",
            text: "Debes agregar todas las materias en ambos cuatrimestres para calcular el promedio anual.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    // 11.02 Calcular el promedio anual
    let promedioAnual = (parseFloat(document.getElementById('promedioPCuatri').textContent) + parseFloat(document.getElementById('promedioSCuatri').textContent)) / 2;

    // 11.03 Mostrar el mensaje de vacaciones o no vacaciones
    let mensaje = "";
    if (promedioAnual >= 7) {
        mensaje = "¡Aprobaste el año, felices vacaciones!";
    } else {
        mensaje = "No aprobaste, nos vemos en Diciembre!";
    }

    Swal.fire({
        title: "Resultado del Promedio Anual",
        text: mensaje,
        icon: "info",
        confirmButtonText: "OK"
    });
});

// Función para guardar datos en el archivo JSON
function guardarDatosEnJSON() {
    const data = {
        primerCuatrimestre: pCuatri,
        segundoCuatrimestre: sCuatri,
    };

    // Convertir los datos a formato JSON
    const jsonData = JSON.stringify(data);

    // Utilizar una función de servidor o técnica para guardar los datos en el archivo JSON
    // Esto puede variar según el entorno de tu aplicación

    // Ejemplo de cómo guardar los datos utilizando Fetch
    fetch('guardarDatos.php', {
        method: 'POST',
        body: jsonData,
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            Swal.fire({
                title: "Guardado",
                text: "Los datos se han guardado correctamente en el archivo JSON.",
                icon: "success",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudieron guardar los datos en el archivo JSON.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    })
    .catch(error => {
        console.error('Error al guardar los datos en el archivo JSON:', error);
    });
}

// Llamar a la función para guardar los datos en el archivo JSON
guardarDatosEnJSON();

// 12.00 Cargar datos desde archivo JSON utilizando Fetch
function cargarDatosDesdeJSON() {
    fetch('js/data.json')
        .then(response => response.json())
        .then(data => {
            // Limpiar las listas de materias y promedios
            pCuatri = [];
            sCuatri = [];
            contadorMateriasPCuatri = 0;
            contadorMateriasSCuatri = 0;
            actualizarPromedio(pCuatri, 'promedioPCuatri');
            actualizarPromedio(sCuatri, 'promedioSCuatri');
            mostrarMaterias(pCuatri, 'listaMaterias01');
            mostrarMaterias(sCuatri, 'listaMaterias02');

            // Procesar los datos y agregarlos a los cuatrimestres si existen
            if (data.primerCuatrimestre && data.segundoCuatrimestre) {
                pCuatri = data.primerCuatrimestre;
                contadorMateriasPCuatri = pCuatri.length;
                actualizarPromedio(pCuatri, 'promedioPCuatri');
                mostrarMaterias(pCuatri, 'listaMaterias01');

                sCuatri = data.segundoCuatrimestre;
                contadorMateriasSCuatri = sCuatri.length;
                actualizarPromedio(sCuatri, 'promedioSCuatri');
                mostrarMaterias(sCuatri, 'listaMaterias02');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}
