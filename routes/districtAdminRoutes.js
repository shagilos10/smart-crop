const express = require('express');
const router = express.Router();
const { loginDistrictAdmin, addSoilData, createFarmer, getFarmersByDistrict, updateFarmer, deleteFarmer, getSingleFarmer } = require('../controllers/districtAdminCtrl');
const { verifyToken, verifyDistrictAdmin } = require('../Middlewares/authMiddleware');

// Admin Login Route
router.post('/login', loginDistrictAdmin);

// Add Soil Data Route
router.post('/soil/add', verifyToken, verifyDistrictAdmin, addSoilData);

// tested
router.post('/create-Farmer', /*verifyToken, verifyDistrictAdmin,*/ createFarmer);

//tested
router.get('/district/:districtId', /*verifyToken, verifyDistrictAdmin, */getFarmersByDistrict);

// tested
router.get('/farmer/:id', /*verifyToken,*/ getSingleFarmer);

// Update a farmer
router.put('/:id', verifyToken, verifyDistrictAdmin, updateFarmer);

//tested
router.delete('/farmer/:id', /*verifyToken, verifyDistrictAdmin, */deleteFarmer);

module.exports = router;
