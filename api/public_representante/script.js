document.addEventListener("DOMContentLoaded", function() {
    const selectElement = document.getElementById("empresa");
    const formElement = document.getElementById("registration-form");

    const socket = io(); // Connect to the server    

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "empresa");
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (Array.isArray(response.body)) {
                const empresas = response.body;
                empresas.forEach(function(empresa) {
                    const option = document.createElement("option");
                    option.value = empresa._id;
                    option.text = empresa.nombre;
                    selectElement.appendChild(option);
                });
            } else {
                console.error("Los datos no son un array.");
            }
        } else {
            console.error("Error al cargar datos del servicio web.");
        }
    };
    xhr.send();

    formElement.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        guardar()
        .then((newRecord) => { // Receive the newRecord from guardar() and emit it
            socket.io.emit('nuevo_registro, mensaje enviado por socket', newRecord);
        })
        .catch((error) => {
            alert(error);
        });
    });

    // Listen for the 'nuevo_registro' event
    socket.io.on('nuevo_registro', (newRecord) => {
        alert('Nuevo registro creado: ' + JSON.stringify(newRecord));
    });
});

function guardar() {
    let ruc_ = document.getElementById('ruc').value;
    let cedula_ = document.getElementById('cedula').value;
    let nombre_ = document.getElementById('nombre').value;
    let apellido_ = document.getElementById('apellido').value;
    let email_ = document.getElementById('email').value;
    let domicilio_ = document.getElementById('domicilio').value;
    let telefono_ = document.getElementById('telefono').value;
    let empresa_ = document.getElementById('empresa').value;

    let data = { ruc: ruc_, cedula: cedula_, nombre: nombre_, apellido: apellido_, email: email_, domicilio: domicilio_, telefono: telefono_, empresa: empresa_ };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/representante', request_options)
            .then((response) => response.json())
            .then((newRecord) => {
                resolve(newRecord); // Resolve the promise with the newRecord
            })
            .catch((error) => reject(`[error]: ${error}`));
    });
}
