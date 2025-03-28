const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sensors', require('./routes/sensorRoutes'));
app.use('/api/actuators', require('./routes/actuatorRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});