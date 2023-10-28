const { create, getProduks, getProdukId, updateProduk, deleteProduk } = require("../repositories/produk.js");
const ApplicationError = require('../../error/ApplicationError.js');

const craeteProdukServices = async (requestBody, userId) => {
    try {
        const {name, harga, deskripsi, category} = requestBody;
        const newProduk = await create({name, harga, deskripsi, category, createdBy : userId});
        return newProduk
    } catch (error) {
        throw new ApplicationError(error.message, 500)
    }
}

const getProduksServices = async () => {
    try {
        const produks = await getProduks();
        return produks
    } catch (error) {
        throw new ApplicationError(error.message, 500)
    }
}

const detailProdukServices = async (id) => {
    try {
        const produk = await getProdukId(id);
        return produk
    } catch (error) {
        throw new ApplicationError(error.message, 500)
    }
}

const updateProdukServices = async (requestBody, id, userId) => {
    try {
        const {name, harga, deskripsi, category} = requestBody;
        const produk = await updateProduk({name, harga, deskripsi, category, updatedBy : userId}, id);
        return produk
    } catch (error) {
        throw new ApplicationError(error.message, 500)
    }
}


const deleteProdukServices = async (id) => {
    try {
        const produk = await deleteProduk(id);
        return produk
    } catch (error) {
        throw new ApplicationError(error.message, 500)
    }
}

module.exports = {craeteProdukServices, getProduksServices, detailProdukServices, updateProdukServices, deleteProdukServices}