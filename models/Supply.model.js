const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplySchema = new Schema({
    supplierId: { type: String, required: false },
    supplierName: { type: String, required: false },
    contactDetails: { type: String, required: false },
    supplyDetails: { type: String, required: false },
    orderQuantity: { type: String, required: false },
    orderDetails: { type: String, required: false },
    orderStatus: { type: String, required: false }
}, {
    timestamps: true,
})

module.exports = Supply = mongoose.model("Supply", supplySchema);