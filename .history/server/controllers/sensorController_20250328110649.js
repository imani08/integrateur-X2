const admin = require('firebase-admin');
const db = admin.firestore();

exports.addSensorData = async (req, res) => {
  try {
    const { temperature, humidity, soilMoisture, co2, light, waterLevel } = req.body;
    
    const newData = {
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      soilMoisture: parseFloat(soilMoisture),
      co2: parseFloat(co2),
      light: parseFloat(light),
      waterLevel: parseFloat(waterLevel),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    // Enregistrement dans Firestore
    const docRef = await db.collection('sensors').add(newData);
    
    // Vérification des seuils d'alerte
    await checkThresholds(newData);
    
    res.status(201).json({ id: docRef.id, ...newData });
  } catch (error) {
    console.error("Error adding sensor data:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

async function checkThresholds(data) {
  const thresholds = await db.collection('settings').doc('thresholds').get();
  const { temperature, soilMoisture, co2 } = thresholds.data();
  
  if (data.temperature > temperature.max) {
    await db.collection('alerts').add({
      type: 'temperature',
      message: `Température trop élevée: ${data.temperature}°C`,
      severity: 'high',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  }
  
  if (data.soilMoisture < soilMoisture.min) {
    await db.collection('alerts').add({
      type: 'soilMoisture',
      message: `Humidité du sol trop basse: ${data.soilMoisture}%`,
      severity: 'high',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}