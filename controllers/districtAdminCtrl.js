const Admin = require('../models/admin'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Soil = require('../models/soil');
const Farmer = require('../models/farmer');
const District = require('../models/district');
const mongoose = require('mongoose');

// Create a new farmer

exports.createFarmer = async (req, res) => {
  const { username, email, password, districtId, farmArea } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(districtId)) {
      console.log(typeof districtId)
      return res.status(400).json({ message: 'Invalid district ID format.' });
    }

    const existingDistrict = await District.findById(districtId);
    if (!existingDistrict) {
      return res.status(404).json({ message: 'District not found.' });
    }

    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Email is already in use. Please use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const formattedFarmArea = farmArea.map((area) => ({
      areaSize: area.areaSize,
    }));

    const newFarmer = new Farmer({
      username,
      email,
      password: hashedPassword,
      districtId: new mongoose.Types.ObjectId(districtId), // ✅ Correct
      farmArea: formattedFarmArea,
    });

    const savedFarmer = await newFarmer.save();
    existingDistrict.farmers.push(savedFarmer._id);
    await existingDistrict.save();

    res.status(201).json({
      message: 'Farmer created successfully.',
      farmer: savedFarmer,
    });
  } catch (error) {
    console.error('Error creating farmer:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all farmers or a specific farmer
exports.getSingleFarmer = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the farmer by ID and populate the district details
      const farmer = await Farmer.findById(id).populate('district');
  
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found.' });
      }
  
      res.status(200).json(farmer);
    } catch (error) {
      console.error('Error fetching farmer:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

// Update a farmer
exports.updateFarmer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedFarmer = await Farmer.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate('district');

    if (!updatedFarmer) {
      return res.status(404).json({ message: 'Farmer not found.' });
    }

    res.status(200).json({
      message: 'Farmer updated successfully.',
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error('Error updating farmer:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete a farmer
exports.deleteFarmer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the farmer first to get its district
    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found.' });
    }

    // Remove the farmer from the district's farmers array
    const district = await District.findById(farmer.district);
    if (district) {
      district.farmers = district.farmers.filter(
        (farmerId) => farmerId.toString() !== id
      );
      await district.save();
    }

    // Now delete the farmer after handling the district update
    await Farmer.findByIdAndDelete(id);

    res.status(200).json({ message: 'Farmer deleted successfully.' });
  } catch (error) {
    console.error('Error deleting farmer:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.loginDistrictAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, role: 'District' });
    if (!admin) {
      return res.status(404).json({ message: 'District admin not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.addSoilData = async (req, res) => {
    try {
      const { soilType, humidity, nutrientLevel, ph } = req.body;
  
      // Validate the input
      if (!soilType || !humidity || !nutrientLevel || !ph) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Create a new soil data entry
      const newSoilData = new Soil({
        soilType,
        humidity,
        nutrientLevel,
        ph,
      });
  
      // Save the data to the database
      const savedSoilData = await newSoilData.save();
  
      res.status(201).json({
        message: 'Soil data added successfully.',
        soilData: savedSoilData,
      });
    } catch (error) {
      console.error('Error adding soil data:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

// Get all farmers in a specific district
exports.getFarmersByDistrict = async (req, res) => {
    const { districtId } = req.params;
  
    try {
      // Fetch all farmers in the specified district
      const farmers = await Farmer.find({ district: districtId }).populate('district');
  
      if (!farmers.length) {
        return res.status(404).json({ message: 'No farmers found in this district.' });
      }
  
      res.status(200).json({
        message: `Farmers in district ${districtId} fetched successfully.`,
        farmers,
      });
    } catch (error) {
      console.error('Error fetching farmers by district:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };