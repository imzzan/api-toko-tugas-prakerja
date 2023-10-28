const express = require('express');
const userRoutes = require('./src/routes/user.js');
const produkRoutes = require('./src/routes/produk.js')
const cookiePerser = require('cookie-parser')

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookiePerser());

app.use('/auth', userRoutes);
app.use('/produk', produkRoutes)

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})