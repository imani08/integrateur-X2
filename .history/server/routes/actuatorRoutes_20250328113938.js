const express = require('express');
const router = express.Router();
const actuatorController = require('../controllers/actuatorController');

router.get('/', actuatorController.getActuators);
router.post('/:id/toggle', actuatorController.toggleActuator);
router.get('/:id/logs', actuatorController.getActuatorLogs);

module.exports = router;