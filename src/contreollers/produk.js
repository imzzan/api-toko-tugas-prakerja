const { craeteProdukServices, getProduksServices, updateProdukServices, deleteProdukServices,  } = require("../services/produk.js");

const createProduk = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId
        const response = await craeteProdukServices(body, userId);
        res.json({ status: "OK", message: "Success", data: response })
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
}


const getProduks = async (req, res) => {
    try {
        const response = await getProduksServices();
        res.json({ status: "OK", message: "Success", data: response })
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
}


const detailProduk = async (req, res) => {
    try {
        const response = req.produk;
        res.json({status : "OK", message : "Success", data : response})
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
}

const updateProduk = async (req, res) => {
    try {
        const body = req.body
        const id = req.produk.id;
        console.log(id);
        const userId = req.userId
        const [_ ,response] = await updateProdukServices(body, id, userId);
        res.json({status : "OK", message : "Success", data : response})
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
}

const deleteProduk = async (req, res) => {
    try {
        const id = req.produk.id;
        await deleteProdukServices(id)
        res.json({status : "Ok", message : "Produk deleted successfully"})
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
}

module.exports = { createProduk , getProduks, detailProduk, updateProduk, deleteProduk}