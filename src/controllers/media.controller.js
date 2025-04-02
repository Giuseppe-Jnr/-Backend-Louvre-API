const db = require('../config/db.config');

exports.getAllMedia = (req, res) => {
    db.query('SELECT * FROM Media', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getMediaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Media WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Média non trouvé' });
        res.json(results[0]);
    });
};

exports.createMedia = (req, res) => {
    const { title, description, type, url } = req.body;
    const query = `INSERT INTO Media (title, description, type, url) VALUES (?, ?, ?, ?)`;
    db.query(query, [title, description, type, url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Média ajouté avec succès', id: result.insertId });
    });
};

exports.deleteMedia = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Media WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Média non trouvé' });
        res.json({ message: 'Média supprimé avec succès' });
    });
};
