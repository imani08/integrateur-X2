const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/', sensorController.getSensorData);
router.get('/list', sensorController.getSensorList);
router.get('/:id/history', sensorController.getSensorHistory);

module.exports = router;