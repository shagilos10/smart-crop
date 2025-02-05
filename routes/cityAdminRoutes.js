const express = require('express');
const router = express.Router();
const { registerDistrictAdmin, createDistrict, getAllDistrictAdmins, registerCityAdmin,  loginCityAdmin } = require('../controllers/cityAdminCtrl');
const { verifyToken, verifyCityAdmin } = require('../Middlewares/authMiddleware');

// Register District Admin (only City Admins can perform this action)
router.post('/register-district-admin', /*verifyToken, verifyCityAdmin,**/ registerDistrictAdmin);

router.post('/create-District', /*verifyToken, verifyCityAdmin, */createDistrict);

router.get('/all', /*verifyToken, verifyCityAdmin,*/ getAllDistrictAdmins);

//tested
router.post('/register', /*verifyToken, verifyCityAdmin,*/ registerCityAdmin)

//tested
router.post('/login', /*verifyToken, verifyCityAdmin,*/ loginCityAdmin)

module.exports = router;
