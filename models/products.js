const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    nameDe: {
        type: String,
        required: true,
    },
    nameFr: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contentDe: {
        type: String,
        required: true,
    },
    contentFr: {
        type: String,
        required: true,
    },
    image1Url: {
        type: String,
        required: true,
    },
    image2Url: {
        type: String,
        required: false,
    },
    image3Url: {
        type: String,
        required: false,
    },
    
});

module.exports = mongoose.model('Product', productSchema);
