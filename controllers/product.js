const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(200).json({
                message: 'Fetched products successfully.',
                products: products,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => {
            if (!product) {
                const error = new Error('Could not find product.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'product fetched.', product: product });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.files['image1Url'][0]) {
        const error = new Error('No image1 provided.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const nameDe = req.body.nameDe;
    const nameFr = req.body.nameFr;
    const price = req.body.price;
    const link = req.body.link;
    const content = req.body.content;
    const contentDe = req.body.contentDe;
    const contentFr = req.body.contentFr;
    const image1Url = req.files['image1Url'][0].path;
    const image2Url = req.files['image2Url'][0].path;
    const image3Url = req.files['image3Url'][0].path;
    const product = new Product({
        name: name,
        nameDe: nameDe,
        nameFr: nameFr,
        price: price,
        link: link,
        content: content,
        contentDe: contentDe,
        contentFr: contentFr,
        image1Url: image1Url,
        image2Url: image2Url,
        image3Url: image3Url,

    });
    product.save()
        .then(() => {
            res.status(201).json({
                status: 201,
                message: 'product created successfully!',
                product: product,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const nameDe = req.body.nameDe;
    const nameFr = req.body.nameFr;
    const price = req.body.price;
    const link = req.body.link;
    const content = req.body.content;
    const contentDe = req.body.contentDe;
    const contentFr = req.body.contentFr;
    let image1Url = req.body.image;
    let image2Url = req.body.image2;
    let image3Url = req.body.image3;
    if (req.file[0]) {
        image1Url = req.file.path;
    }
    if (!image1Url) {
        const error = new Error('No file picked.1');
        error.statusCode = 422;
        throw error;
    }
    if (req.file[1]) {
        image1Url = req.file.path;
    }
    if (!image2Url) {
        const error = new Error('No file picked.2');
        error.statusCode = 422;
        throw error;
    }
    if (req.file[2]) {
        image1Url = req.file.path;
    }
    if (!image3Url) {
        const error = new Error('No file picked.3');
        error.statusCode = 422;
        throw error;
    }
    Product.findById(productId)
        .then((product) => {
            if (!product) {
                const error = new Error('Could not find product.');
                error.statusCode = 404;
                throw error;
            }

            if (image1Url !== product.image1Url) {
                clearImage(product.image1Url);
            }
            if (image2Url !== product.image2Url) {
                clearImage(product.image2Url);
            }
            if (image3Url !== product.image3Url) {
                clearImage(product.image3Url);
            }
            product.name = name;
            product.nameDe = nameDe;
            product.nameFr = nameFr;
            product.price = price;
            product.content = content;
            product.contentDe = contentDe;
            product.contentFr = contentFr;
            product.link = link;
            product.image1Url = image1Url;
            product.image2Url = image2Url;
            product.image3Url = image3Url;
            return product.save();
        })
        .then((result) => {
            res.status(200).json({ message: 'product updated!', product: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => {
            if (!product) {
                const error = new Error('Could not find product.');
                error.statusCode = 404;
                throw error;
            }
            // Check logged in user
            clearImage(product.image1Url);
            if(product.image2Url){
                clearImage(product.image2Url);
            }
            if(product.image3Url){
                clearImage(product.image3Url);
            }
            return Product.findByIdAndRemove(productId);
        })
        .then(() => {
            res.status(200).json({ message: 'Product Deleted' });
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
    fs.unlink(filePath, (err) => console.log('clearImage : ' + err));
};
