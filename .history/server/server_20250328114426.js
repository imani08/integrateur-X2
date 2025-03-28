const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase-admin.json');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sensors', require('./routes/sensorRoutes'));
app.use('/api/actuators', require('./routes/actuatorRoutes'));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});