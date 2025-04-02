const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Inscription
exports.register = (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
};

// Connexion
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({ token });
    });
};
