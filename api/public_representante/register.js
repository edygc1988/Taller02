document.addEventListener("DOMContentLoaded", function() {
    const formElement = document.getElementById("registroForm");

    formElement.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        guardar()
        .then((newRecord) => { // Receive the newRecord from guardar() and emit it
            alert('Save');
        })
        .catch((error) => {
            alert(error);
        });
    });

});

function guardar() {
    let usuario_ = document.getElementById('usuario').value;
    let password_ = document.getElementById('password').value;
    let nombre_ = document.getElementById('nombre').value;
    let apellido_ = document.getElementById('apellido').value;
    let email_ = document.getElementById('email').value;
    
    let data = { usuario: usuario_, passwor: password_, nombre: nombre_, apellido: apellido_, email: email_ };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/registrarse', request_options)
            .then((response) => response.json())
            .then((newRecord) => {
                resolve(newRecord); // Resolve the promise with the newRecord
            })
            .catch((error) => reject(`[error]: ${error}`));
    });
}
