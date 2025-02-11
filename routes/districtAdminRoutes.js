const express = require('express');
const router = express.Router();
const { loginDistrictAdmin, addSoilData, createFarmer, getFarmersByDistrict, updateFarmer, deleteFarmer, getSingleFarmer, approveCropRecommendation, getCropRecommendationsByYear, getWeatherData, getNewsForDistrictAdmin } = require('../controllers/districtAdminCtrl');
const { verifyToken, verifyDistrictAdmin } = require('../Middlewares/authMiddleware');

// tested
router.post('/login', loginDistrictAdmin);

// tested
router.post('/soil/add/:farmerId', verifyToken, verifyDistrictAdmin, addSoilData);

// tested
router.post('/create-Farmer', verifyToken, verifyDistrictAdmin, createFarmer);

//tested
router.get('/district', verifyToken, verifyDistrictAdmin, getFarmersByDistrict);

// tested
router.get('/farmer/:id', verifyToken, verifyDistrictAdmin, getSingleFarmer);

// tested
router.put('/farmer/:id', verifyToken, verifyDistrictAdmin, updateFarmer);

// tested
router.delete('/farmer/:id', verifyToken, verifyDistrictAdmin, deleteFarmer);

// tested
router.post('/approve/:farmerId', verifyToken, verifyDistrictAdmin, approveCropRecommendation)

//tested
router.get('/getCropsAnalytics/:farmerId', verifyToken, verifyDistrictAdmin, getCropRecommendationsByYear)


router.get('/weather', verifyToken, verifyDistrictAdmin, getWeatherData)

//tested
router.get('/news', verifyToken, verifyDistrictAdmin, getNewsForDistrictAdmin)


module.exports = router;
