const { detailProdukServices } = require("../services/produk.js");

const produkId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const produk = await detailProdukServices(id);

    if (!produk) {
      return res.json({ status: "Faild", massage: "Product not found" });
    }
    req.produk = produk;
    next();
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
};


module.exports = {produkId}