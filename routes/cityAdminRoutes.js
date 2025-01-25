const express = require('express');
const router = express.Router();
const { registerDistrictAdmin, createDistrict } = require('../controllers/cityAdminCtrl');
const { verifyToken, verifyCityAdmin } = require('../Middlewares/authMiddleware');

// Register District Admin (only City Admins can perform this action)
router.post('/register-district-admin', /*verifyToken, verifyCityAdmin,**/ registerDistrictAdmin);

router.post('/create-District', /*verifyToken, verifyCityAdmin, */createDistrict);


module.exports = router;
