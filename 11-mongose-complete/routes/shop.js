// import & set express router
const express = require('express');
const router = express.Router();

// import shop controller
const shopController = require('../controllers/shop');

// GET => /
router.get('/', shopController.getIndex);

// GET => /products
router.get('/products', shopController.getProducts);

// GET => /products/id
router.get('/products/:productId', shopController.getProduct);

// GET => /cart
router.get('/cart', shopController.getCart);
// POST => /cart , insert cart item
router.post('/cart', shopController.postCart);
// POST => /cart , delete item in cart
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// POST => /create-order , 
router.post('/create-order', shopController.postOrder);

// GET => /orders
router.get('/orders', shopController.getOrders);

module.exports = router;
