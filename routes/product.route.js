const router = require('express').Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controller/ProductManagementController/Product.controller');

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/add', addProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
