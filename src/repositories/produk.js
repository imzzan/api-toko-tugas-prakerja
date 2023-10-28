const {Produk} = require('../models')

const create = (requestBody) => {
    return Produk.create(requestBody)
}

const getProduks = () => {
    return Produk.findAll()
}

const getProdukId = (id) => {
    return Produk.findByPk(id);
}

const updateProduk = (requestBody, id) => {
    return Produk.update(requestBody, {
        where : {
            id : id,
        },
        returning: true
    })
}

const deleteProduk = (id) => {
    return Produk.destroy({
        where : {
            id : id,
        }
    })
}


module.exports = {create, getProduks, getProdukId, updateProduk, deleteProduk}