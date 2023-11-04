const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.post('/admin', adminController.createAdmin);
router.get('/admin',adminController.getAllAdmins)

router.get('/admin/:id', adminController.getAdminById);

router.put('/admin/:id', adminController.updateAdmin);

router.delete('/admin/:id', adminController.deleteAdmin);
module.exports = router