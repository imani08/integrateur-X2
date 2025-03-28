const express = require('express');
const router = express.Router();
const db = require('../config/firebase');

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('sensorData').orderBy('timestamp', 'desc').limit(1).get();
    const data = snapshot.docs[0].data();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const snapshot = await db.collection('sensors').get();
    const sensors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;