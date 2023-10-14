const empleado = require('../components/empleado/interface')
const pais = require('../components/pais/interface')
const ciudad = require('../components/ciudad/interface')
const cliente = require('../components/cliente/interface')
const producto = require('../components/producto/interface')
const factura = require('../components/factura/interface')
const empresa = require('../components/empresa/interface')
const representante = require('../components/representante_legal/interface')

const routes = function(server) {
    server.use('/empleado', empleado)
    server.use('/pais', pais)
    server.use('/ciudad', ciudad)
    server.use('/cliente', cliente)
    server.use('/producto', producto)
    server.use('/factura', factura)
    server.use('/empresa', empresa)
    server.use('/representante', representante)
}

module.exports = routes