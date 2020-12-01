const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    content2: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Food', foodSchema);
