const express = require('express');
const router = express.Router();

// Import controllers for handling Supply-related operations
const {
    createSupply,
    getSupplyById,
    deleteSupply,
    getSupply,
    updateSupply,
} = require('../controller/SupplyManagementController/Supply.controller');

// Routes for managing Supply

// Route for creating a new Supply
router.post('/add', createSupply);

// Route for getting a Supply by its ID
router.get('/:id', getSupplyById);

// Route for deleting a Supply by its ID
router.delete('/:id', deleteSupply);

// Route for getting all Supply
router.get('/', getSupply);

// Route for updating a Supply by its ID
router.put('/:id', updateSupply);

module.exports = router;
