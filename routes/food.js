const express = require('express');

const foodController = require('../controllers/food');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/food/:foodId', foodController.getFood);
// GET /food/foods
router.get('/food', foodController.getFoods);
// POST /food/food
router.post('/food', foodController.createFood);

router.put('/food/:foodId', foodController.updateFood);

router.delete('/food/:foodId', foodController.deleteFood);

module.exports = router;
