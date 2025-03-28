const { db } = require('../config/firebase');

class User {
  static async findByEmail(email) {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  static async create(userData) {
    const docRef = await db.collection('users').add(userData);
    return { id: docRef.id, ...userData };
  }
}

module.exports = User;