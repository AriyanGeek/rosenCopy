const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Event = require('../models/event');

exports.getEvents = (req, res, next) => {
    Event.find()
        .then((events) => {
            res.status(200).json({
                message: 'Fetched events successfully.',
                events: events,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    console.log('in');
    Event.findById(eventId)
        .then((event) => {
            if (!event) {
                const error = new Error('Could not find event.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'event fetched.', event: event });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createEvent = (req, res, next) => {
    console.log('in ce');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const title2 = req.body.title2;
    const content = req.body.content;
    const content2 = req.body.content2;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const event = new Event({
        title: title,
        title2: title2,
        content: content,
        content2: content2,
        imageUrl: imageUrl,
        startTime: startTime,
        endTime: endTime,
    });
    event
        .save()
        .then(() => {
            res.status(201).json({
                status: 201,
                message: 'Event created successfully!',
                event: event,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const title2 = req.body.title2;
    const content2 = req.body.content2;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Event.findById(eventId)
        .then((event) => {
            if (!event) {
                const error = new Error('Could not find event.');
                error.statusCode = 404;
                throw error;
            }

            if (imageUrl !== event.imageUrl) {
                clearImage(event.imageUrl);
            }
            event.title = title;
            event.content = content;
            event.title2 = title2;
            event.content2 = content2;
            event.startTime = startTime;
            event.endTime = endTime;
            event.imageUrl = imageUrl;
            return event.save();
        })
        .then((result) => {
            res.status(200).json({ message: 'Event updated!', event: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findById(eventId)
        .then((event) => {
            if (!event) {
                const error = new Error('Could not find event.');
                error.statusCode = 404;
                throw error;
            }
            // Check logged in user
            clearImage(event.imageUrl);
            return Event.findByIdAndRemove(eventId);
        })
        .then(() => {
            res.status(200).json({ message: 'Deleted post.' });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const clearImage = (filePath) => {
    // eslint-disable-next-line no-undef
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
