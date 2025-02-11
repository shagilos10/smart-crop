const express = require('express');
const router = express.Router();
const { registerDistrictAdmin, createDistrict, getAllDistrictAdmins, registerCityAdmin,  loginCityAdmin, createNews } = require('../controllers/cityAdminCtrl');
const { verifyToken, verifyCityAdmin } = require('../Middlewares/authMiddleware');

// tested
router.post('/register-district-admin', verifyToken, verifyCityAdmin, registerDistrictAdmin);

//tested
router.post('/create-District', verifyToken, verifyCityAdmin, createDistrict);


router.get('/all', verifyToken, verifyCityAdmin, getAllDistrictAdmins);

//tested
router.post('/register', registerCityAdmin)

//tested
router.post('/login', loginCityAdmin)

//tested
router.post('/add', verifyToken, verifyCityAdmin, createNews);

module.exports = router;
