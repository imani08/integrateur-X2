const db = require('../config/firebase');

exports.getSensorData = async (req, res) => {
  try {
    const snapshot = await db.collection('sensorData').orderBy('timestamp', 'desc').limit(1).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: 'Aucune donnée trouvée' });
    }
    res.json(snapshot.docs[0].data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSensorHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('sensorHistory')
      .where('sensorId', '==', id)
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();
    
    const history = snapshot.docs.map(doc => doc.data());
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};