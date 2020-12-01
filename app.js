/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const eventRoutes = require('./routes/event');
const foodRoutes = require('./routes/food');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // eslint-disable-next-line no-undef
        cb(null, __dirname + '/images');
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().slice(0, 10);
        cb(null, date + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json()); // application/json

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/home/termjzsq/webSite/images/', express.static(path.join(__dirname, 'images')));

app.use(express.static(path.join(__dirname, '/Front-end/dist/termeh')));

app.use('/event', eventRoutes);
app.use('/food', foodRoutes);
app.get('/*', (req, res) => res.sendFile(__dirname + '/Front-end/dist/termeh/index.html'));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect('mongodb+srv://AriyanGeek:19970622++@termeh-restaurant-ncyo7.azure.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true,
    })
    .then((result) => {
        console.log(result);
        app.listen();
    })
    .catch((err) => console.log(err));
