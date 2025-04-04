const db = require("../config/db.config");

// src/controllers/user.controller.js
module.exports = {
    getAllUsers: (req, res) => {
        res.json({ message: "Liste des utilisateurs" });
    },
    register: (req, res) => {
        res.json({ message: "Inscription réussie" });
    },
    login: (req, res) => {
        res.json({ message: "Connexion réussie" });
    }
};


// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Récupérer un utilisateur par ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Users WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(results[0]);
    });
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    db.query(
        "UPDATE Users SET username = ?, email = ? WHERE id = ?",
        [username, email, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Utilisateur mis à jour avec succès" });
        }
    );
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Users WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Utilisateur supprimé avec succès" });
    });
};
