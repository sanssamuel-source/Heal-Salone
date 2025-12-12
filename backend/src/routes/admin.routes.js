const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

router.use(authenticate);
router.use(authorize(['ADMIN']));

router.get('/users', adminController.getAllUsers);
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
