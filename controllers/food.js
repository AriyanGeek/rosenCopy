const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Food = require('../models/food');

exports.getFoods = (req, res, next) => {
    Food.find()
        .then((foods) => {
            res.status(200).json({
                message: 'Fetched foods successfully.',
                foods: foods,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getFood = (req, res, next) => {
    const foodId = req.params.foodId;
    Food.findById(foodId)
        .then((food) => {
            if (!food) {
                const error = new Error('Could not find food.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'food fetched.', food: food });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createFood = (req, res, next) => {
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
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.file.path;
    const content = req.body.content;
    const content2 = req.body.content2;
    const type = req.body.type;
    const food = new Food({
        name: name,
        price: price,
        imageUrl: imageUrl,
        content: content,
        content2: content2,
        type: type,
    });
    food.save()
        .then(() => {
            res.status(201).json({
                status: 201,
                message: 'Food created successfully!',
                food: food,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateFood = (req, res, next) => {
    const foodId = req.params.foodId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const price = req.body.price;
    const content = req.body.content;
    const content2 = req.body.content2;
    const type = req.body.type;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Food.findById(foodId)
        .then((food) => {
            if (!food) {
                const error = new Error('Could not find food.');
                error.statusCode = 404;
                throw error;
            }

            if (imageUrl !== food.imageUrl) {
                clearImage(food.imageUrl);
            }
            food.name = name;
            food.price = price;
            food.imageUrl = imageUrl;
            food.content = content;
            food.content2 = content2;
            food.type = type;
            return food.save();
        })
        .then((result) => {
            res.status(200).json({ message: 'Food updated!', food: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteFood = (req, res, next) => {
    const foodId = req.params.foodId;
    Food.findById(foodId)
        .then((food) => {
            if (!food) {
                const error = new Error('Could not find food.');
                error.statusCode = 404;
                throw error;
            }
            // Check logged in user
            clearImage(food.imageUrl);
            return Food.findByIdAndRemove(foodId);
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
