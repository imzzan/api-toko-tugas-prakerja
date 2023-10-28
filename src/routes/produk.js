const express = require('express');
const { createProduk, getProduks, detailProduk, updateProduk, deleteProduk } = require('../contreollers/produk.js');
const {verifyUser, onlyAdmin} = require('../middleware/verifyUser.js');
const { produkId } = require('../middleware/produk.js');

const router = express.Router();

router.post('/', verifyUser, onlyAdmin, createProduk);
router.get('/', verifyUser, getProduks);
router.get('/:id', verifyUser, produkId, detailProduk);
router.put('/:id', verifyUser, produkId, onlyAdmin, updateProduk)
router.delete('/:id', verifyUser, produkId, onlyAdmin, deleteProduk)

module.exports = router;