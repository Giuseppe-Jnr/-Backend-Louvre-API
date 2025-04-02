// Import des modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const db = require('./src/config/db.config');

// Initialisation de l'application
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion réussie à la base de données MySQL');
});

// Import des routes
const eventRoutes = require('./src/routes/events.routes');
const mediaRoutes = require('./src/routes/media.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use('/api/events', eventRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/auth', authRoutes);

module.exports = app; // Export de l'application
