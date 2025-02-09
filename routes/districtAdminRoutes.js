const express = require('express');
const router = express.Router();
const { loginDistrictAdmin, addSoilData, createFarmer, getFarmersByDistrict, updateFarmer, deleteFarmer, getSingleFarmer, approveCropRecommendation } = require('../controllers/districtAdminCtrl');
const { verifyToken, verifyDistrictAdmin } = require('../Middlewares/authMiddleware');

// tested
router.post('/login', loginDistrictAdmin);

// tested
router.post('/soil/add', verifyToken, verifyDistrictAdmin, addSoilData);

// tested
router.post('/create-Farmer', verifyToken, verifyDistrictAdmin, createFarmer);

//tested
router.get('/district/:districtId', /*verifyToken, verifyDistrictAdmin, */getFarmersByDistrict);

// tested
router.get('/farmer/:id', /*verifyToken,*/ getSingleFarmer);

// tested
router.put('/farmer/:id', /*verifyToken, verifyDistrictAdmin, */updateFarmer);

// tested
router.delete('/farmer/:id', /*verifyToken, verifyDistrictAdmin, */deleteFarmer);

// tested
router.post('/approve', /*verifyToken, verifyDistrictAdmin, */approveCropRecommendation)

module.exports = router;
