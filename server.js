const app = require('./app'); // Import de l'application configurée
const dotenv = require('dotenv');
dotenv.config(); // Charge les variables d'environnement
const PORT = process.env.PORT || 5000;

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
