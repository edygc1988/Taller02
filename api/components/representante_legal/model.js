const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true,
}

const empresa_schema = new Schema({
    ruc: req_string,
    nombre: req_string,
    domicilio: String,
    telefono: String
}, {
    timestamps: true,
})

const representante_schema = new Schema({
    ruc: req_string,
    cedula: req_string,
    nombre: req_string,
    apellido: String,
    email: String,
    domicilio: String,
    telefono: String,
    empresa: String/*,
    empresa: [empresa_schema]*/
})

const model = mongoose.model('representante', representante_schema)
module.exports = model
