const Model = require('./model')

async function agregarPais( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerPais( filtro ) {
    let mi_filtro = {}

    if (filtro.Pais != null) {
        mi_filtro = { Pais: filtro.Pais }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


async function actualizarPais(dato) {
    const nuevo_objeto = await Model.findOne( { Pais: dato.Pais } )

    nuevo_objeto.nombre = dato.nombre
    nuevo_objeto.apellido = dato.apellido
    
    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarPais(dato) {
    const resultado = await Model.deleteOne( {Pais: dato.Pais} )
    return resultado
}

module.exports = {
    agregar:agregarPais,
    obtener:obtenerPais,
    actualizar:actualizarPais,
    eliminar:eliminarPais
}