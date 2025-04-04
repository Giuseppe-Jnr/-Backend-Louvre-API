const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Assure-toi que ce fichier existe !

// Routes utilisateurs
router.get('/', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router; // ✅ Assure-toi que c'est bien "router" qui est exporté
