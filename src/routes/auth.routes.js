const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Vérifie que ce fichier existe

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;  // ✅ Vérifie que c'est bien "router" qui est exporté
