const db = require('../config/firebase');

exports.toggleActuator = async (req, res) => {
  try {
    const { id } = req.params;
    const actuatorRef = db.collection('actuators').doc(id);
    const doc = await actuatorRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Actionneur non trouvé' });
    }

    const newStatus = !doc.data().status;
    await actuatorRef.update({ status: newStatus });

    // Enregistrer dans les logs
    await db.collection('actuatorLogs').add({
      actuatorId: id,
      action: newStatus ? 'ACTIVATED' : 'DEACTIVATED',
      timestamp: new Date(),
      user: req.user?.uid || 'system'
    });

    res.json({ id, status: newStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActuatorLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('actuatorLogs')
      .where('actuatorId', '==', id)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
    
    const logs = snapshot.docs.map(doc => doc.data());
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};