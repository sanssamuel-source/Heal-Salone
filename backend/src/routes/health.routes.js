const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');
const { authenticate } = require('../middlewares/authMiddleware');
const { upload } = require('../utils/cloudinary'); // Import the configured multer instance

router.use(authenticate);

// Add upload.single('image') to the post route
router.post('/', upload.single('image'), healthController.createReport);
router.get('/', healthController.getReports);
router.get('/:id', healthController.getReportById);

module.exports = router;
