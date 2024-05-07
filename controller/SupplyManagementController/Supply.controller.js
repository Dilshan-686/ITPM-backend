const Supply = require('../../models/Supply.model');

// Create Supply function
const createSupply = async (req, res) => {
    try {
        const { supplierId, supplierName, contactDetails, supplyDetails, orderQuantity, orderDetails, orderStatus } =
            req.body;

        // Validate input data
        if (
            !supplierId ||
            !supplierName ||
            !contactDetails ||
            !supplyDetails ||
            !orderQuantity ||
            !orderDetails ||
            !orderStatus
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const supply = new Supply({
            supplierId,
            supplierName,
            contactDetails,
            supplyDetails,
            orderQuantity,
            orderDetails,
            orderStatus,
        });

        // Save supply to the database
        await supply.save();

        // Respond with success message
        res.status(201).json({ message: 'Supply registered successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error creating supply:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSupplyById = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.id);
        if (!supply) {
            return res.status(404).json({ error: 'Supply not found' });
        }
        res.json(supply);
    } catch (error) {
        console.error('Error fetching supply by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get all Event records
const getSupply = async (req, res) => {
    try {
        const supply = await Supply.find();
        res.json(supply);
    } catch (supply) {
        res.status(500).send('Server Error : ' + supply);
    }
};

const updateSupply = async (req, res) => {
    try {
        const existingSupply = await Supply.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!existingSupply) {
            return res.status(404).json({ error: 'Supply not found' });
        }

        res.json(existingSupply);
    } catch (error) {
        console.error('Error updating supply:', error);
        res.status(400).json({ error: error.message });
    }
};

const deleteSupply = async (req, res) => {
    try {
        const deletedSupply = await Supply.findByIdAndDelete(req.params.id);

        if (!deletedSupply) {
            return res.status(404).json({ error: 'supply not found' });
        }

        res.json({ message: 'Supply has been deleted successfully' });
    } catch (error) {
        console.error('Error deleting supply:', error);
        res.status(400).json({ error: error.message });
    }
};

//export created functions
module.exports = {
    createSupply,
    getSupplyById,
    deleteSupply,
    getSupply,
    updateSupply,
};
