// models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Veuillez ajouter un nom de produit'],
        },
        // ... (autres champs comme image, price, countInStock)
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;