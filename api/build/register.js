"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var formElement = document.getElementById("registroForm");
  formElement.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    guardar().then(function (newRecord) {
      // Receive the newRecord from guardar() and emit it
      alert('Save');
    })["catch"](function (error) {
      alert(error);
    });
  });
});
function guardar() {
  var usuario_ = document.getElementById('usuario').value;
  var password_ = document.getElementById('password').value;
  var nombre_ = document.getElementById('nombre').value;
  var apellido_ = document.getElementById('apellido').value;
  var email_ = document.getElementById('email').value;
  var data = {
    usuario: usuario_,
    passwor: password_,
    nombre: nombre_,
    apellido: apellido_,
    email: email_
  };
  return new Promise(function (resolve, reject) {
    var request_options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicar que se envían datos JSON
      },

      body: JSON.stringify(data) // Convertir los datos a JSON
    };

    fetch('/registrarse', request_options).then(function (response) {
      return response.json();
    }).then(function (newRecord) {
      resolve(newRecord); // Resolve the promise with the newRecord
    })["catch"](function (error) {
      return reject("[error]: ".concat(error));
    });
  });
}