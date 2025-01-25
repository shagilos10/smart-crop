const express = require('express');
const router = express.Router();
const { loginDistrictAdmin, addSoilData, createFarmer, getFarmersByDistrict, updateFarmer, deleteFarmer, getSingleFarmer } = require('../controllers/districtAdminCtrl');
const { verifyToken, verifyDistrictAdmin } = require('../Middlewares/authMiddleware');

// Admin Login Route
router.post('/login', loginDistrictAdmin);

// Add Soil Data Route
router.post('/soil/add', verifyToken, verifyDistrictAdmin, addSoilData);

// Create a new farmer
router.post('/', verifyToken, verifyDistrictAdmin, createFarmer);


router.get('/district/:districtId', verifyToken, verifyDistrictAdmin, getFarmersByDistrict);


router.get('/farmer/:id', verifyToken, getSingleFarmer);

// Update a farmer
router.put('/:id', verifyToken, verifyDistrictAdmin, updateFarmer);

// Delete a farmer
router.delete('/:id', verifyToken, verifyDistrictAdmin, deleteFarmer);

module.exports = router;
