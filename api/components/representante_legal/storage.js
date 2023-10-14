const model = require('./model')

function get_representante( filtrorepresentante ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtrorepresentante) {
            filtro = { nombre: filtrorepresentante }
        }
        model.find( filtro )
            .populate('empresa')
            .exec( (error, data) => {
                lista = []
                for (elemento of data) {
                    lista.push( {id:elemento._id, representante:elemento.nombre, empresa:elemento.empresa.nombre} )
                }
                if (error)
                    reject(error)
                else 
                    resolve(lista)
            })
    })
}

function add_representante( representante ) {
    const objeto = new model( representante )
    objeto.save()
}

async function update_representante( representante ) {
    const objeto = await model.findOne( {_id: representante.id} )

    if ( objeto ) {
        objeto.nombre = representante.nombre
        objeto.apellido = representante.apellido
        objeto.direccion = representante.direccion
        objeto.telefono = representante.telefono
        objeto.email = representante.email
    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function delete_representante( representante ) {
    return await model.deleteOne({_id: representante.id})
}

module.exports = {
    add: add_representante,
    get: get_representante,
    update: update_representante,
    delete: delete_representante,
}