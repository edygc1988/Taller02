const storage = require('./storage')

function get_representante( filtro_representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_representante ) )
    })
}

function add_representante( representante ) {
    return new Promise((resolve, reject) => {
        if (!representante.nombre) {
            return reject('No existen datos.')
        }
        storage.add( representante )
        resolve( representante )  
    })
}

function update_representante( representante ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( representante )
        if (resultado) {
            return resolve( representante )
        } else {
            return reject('No existe el representante.')
        }
    })
}

function delete_representante( representante ) {
    return new Promise((resolve, reject) => {
        storage.delete( representante )
        resolve( representante )
    })
}

module.exports = {
    get_representante,
    add_representante,
    update_representante,
    delete_representante,
}