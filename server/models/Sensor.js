const { db } = require('../config/firebase');

class Sensor {
  static async create(sensorData) {
    const docRef = await db.collection('sensors').add({
      ...sensorData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...sensorData };
  }

  static async update(id, sensorData) {
    await db.collection('sensors').doc(id).update({
      ...sensorData,
      updatedAt: new Date()
    });
    return { id, ...sensorData };
  }

  static async findAll() {
    const snapshot = await db.collection('sensors').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = Sensor;