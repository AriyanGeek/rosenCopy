const express = require('express');

const eventController = require('../controllers/event');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/event/:eventId', eventController.getEvent);
// GET /event/posts
router.get('/event', eventController.getEvents);
// POST /event/post
router.post('/event', eventController.createEvent);

router.put('/event/:eventId', eventController.updateEvent);

router.delete('/event/:eventId', eventController.deleteEvent);

module.exports = router;
