const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { authenticate } = require('../middleware/auth');

// Route pour l'ESP32
router.post('/', sensorController.addSensorData);

// Route pour l'application web
router.get('/', authenticate, sensorController.getLatestData);

module.exports = router;