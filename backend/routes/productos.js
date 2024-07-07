const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.ObtenerTodosLosProductos);
router.get('/:id', productController.ObtenerProductoPorId);


module.exports = router;