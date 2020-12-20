const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/product/:productId', productController.getProduct);
// GET /product/products
router.get('/products', productController.getProducts);
// POST /product/product
router.post('/product', productController.createProduct);

router.put('/product/:productId', productController.updateProduct);

router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;
