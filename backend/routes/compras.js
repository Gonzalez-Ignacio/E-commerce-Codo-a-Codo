//Se manejara las compras hechas desde el carrito.

const express = require("express");
const router = express.Router();
const comprasController = require("../controller/comprasController");

router.post('/', comprasController.realizarCompra);


module.exports = router