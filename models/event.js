const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        title2: {
            type: String,
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
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
