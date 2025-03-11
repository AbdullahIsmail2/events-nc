const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  deleteEvent,
  addAttendee,
  getEventById
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.post('/attendees/:eventId', addAttendee);
router.get('/:id', getEventById);

module.exports = router;
