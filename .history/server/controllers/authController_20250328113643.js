const admin = require('firebase-admin');
const db = require('../config/firebase');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    // Vérification du mot de passe serait normalement gérée par Firebase Auth côté client
    res.json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });
    
    await db.collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};