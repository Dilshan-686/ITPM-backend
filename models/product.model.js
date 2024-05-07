
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productID: { type: String, required: true, unique: true },
    imgUrl: { type: String },
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    price: { type: String },
    quantity: { type: String },
    description: { type: String },
}, {
    timestamps: true,
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
