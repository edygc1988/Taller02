"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("empresa");
  var formElement = document.getElementById("registration-form");
  var socket = io(); // Connect to the server    

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "empresa");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (Array.isArray(response.body)) {
        var empresas = response.body;
        empresas.forEach(function (empresa) {
          var option = document.createElement("option");
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
  formElement.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    guardar().then(function (newRecord) {
      // Receive the newRecord from guardar() and emit it
      socket.io.emit('nuevo_registro', newRecord);
    })["catch"](function (error) {
      alert(error);
    });
  });

  // Listen for the 'nuevo_registro' event
  socket.io.on('nuevo_registro', function (newRecord) {
    alert('Nuevo registro creado, emitido por socket.io: ' + JSON.stringify(newRecord));
  });
});
function guardar() {
  var ruc_ = document.getElementById('ruc').value;
  var cedula_ = document.getElementById('cedula').value;
  var nombre_ = document.getElementById('nombre').value;
  var apellido_ = document.getElementById('apellido').value;
  var email_ = document.getElementById('email').value;
  var domicilio_ = document.getElementById('domicilio').value;
  var telefono_ = document.getElementById('telefono').value;
  var empresa_ = document.getElementById('empresa').value;
  var data = {
    ruc: ruc_,
    cedula: cedula_,
    nombre: nombre_,
    apellido: apellido_,
    email: email_,
    domicilio: domicilio_,
    telefono: telefono_,
    empresa: empresa_
  };
  return new Promise(function (resolve, reject) {
    var request_options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicar que se envían datos JSON
      },

      body: JSON.stringify(data) // Convertir los datos a JSON
    };

    fetch('/representante', request_options).then(function (response) {
      return response.json();
    }).then(function (newRecord) {
      resolve(newRecord); // Resolve the promise with the newRecord
    })["catch"](function (error) {
      return reject("[error]: ".concat(error));
    });
  });
}