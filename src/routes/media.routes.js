const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);
router.post('/', mediaController.createMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
