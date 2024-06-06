const express = require('express');
const router = express.Router();
const tiketController = require('../controllers/TiketController');
const authenticateToken = require('../middleware/verifyToken');

router.post('/tiket', tiketController.createTiket);

router.get('/tiket',tiketController.getAllTikets)

router.get('/tiket/:id', tiketController.getTiketById);

router.put('/tiket/:id',authenticateToken, tiketController.updateTiket);

router.delete('/tiket',authenticateToken, tiketController.deleteTiket);
router.delete('/tiket/:id',authenticateToken, tiketController.deleteTiketById);
module.exports = router