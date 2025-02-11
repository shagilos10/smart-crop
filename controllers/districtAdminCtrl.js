const Admin = require('../models/admin'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Soil = require('../models/soil');
const Farmer = require('../models/farmer');
const District = require('../models/district');
const mongoose = require('mongoose');
const City = require('../models/city');
const News = require('../models/news');

// Create a new farmer
exports.createFarmer = async (req, res) => {
  try {
    console.log("Admin Data:", req.admin); // Debugging: Ensure admin data is present

    const { username, email, password, farmArea } = req.body;
    const districtId = req.admin?.districtId; // Get districtId from middleware

    if (!districtId || !mongoose.Types.ObjectId.isValid(districtId)) {
      console.log("Invalid District ID:", districtId);
      return res.status(400).json({ message: "Invalid district ID format or missing district ID." });
    }

    const existingDistrict = await District.findById(districtId);
    if (!existingDistrict) {
      return res.status(404).json({ message: "District not found." });
    }

    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: "Email is already in use. Please use a different email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ Assign unique `farmFieldId` starting from 1
    const formattedFarmArea = farmArea.map((area, index) => ({
      farmFieldId: index + 1, // Ensures unique `farmFieldId` per farmer
      areaSize: area.areaSize,
    }));

    const newFarmer = new Farmer({
      username,
      email,
      password: hashedPassword,
      districtId: new mongoose.Types.ObjectId(districtId),
      farmArea: formattedFarmArea, // ✅ Includes unique farmFieldId
    });

    const savedFarmer = await newFarmer.save();

    // ✅ Ensure `farmers` array exists before pushing
    if (!existingDistrict.farmers) {
      existingDistrict.farmers = [];
    }
    existingDistrict.farmers.push(savedFarmer._id);
    await existingDistrict.save();

    res.status(201).json({
      message: "Farmer created successfully.",
      farmer: savedFarmer,
    });
  } catch (error) {
    console.error("Error creating farmer:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all farmers or a specific farmer
exports.getSingleFarmer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the farmer by ID and populate the district details (use districtId for populating)
    const farmer = await Farmer.findById(id).populate('districtId');

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
  let updates = { ...req.body }; // Copy request body

  try {
    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid farmer ID format.' });
    }

    // ✅ Prevent empty updates
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No update data provided.' });
    }

    // ✅ Hash password if included in update request
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // ✅ Prevent updating certain fields (security)
    delete updates._id;
    delete updates.email; // Avoid changing email (optional)
    delete updates.createdAt;

    // ✅ Perform update with validation
    const updatedFarmer = await Farmer.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // Ensures validation rules are applied
    }).populate('districtId');

    if (!updatedFarmer) {
      return res.status(404).json({ message: 'Farmer not found.' });
    }

    res.status(200).json({
      message: 'Farmer updated successfully.',
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error('Error updating farmer:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
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
      "daniel",
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
  const { farmFieldId, humidity, nitrogen, phosphorous, potassium, ph } = req.body;
  const { farmerId } = req.params;

  try {
    // ✅ Validate the input
    if (!humidity || !nitrogen || !phosphorous || !potassium || !ph) {
      return res.status(400).json({ message: "All soil data fields are required." });
    }

  
    // ✅ Create and save new soil data entry
    const newSoilData = new Soil({
      humidity,
      nutrientLevel: { nitrogen, phosphorous, potassium },
      ph,
    });

    const savedSoilData = await newSoilData.save();


    // ✅ Find the farmer by ID
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    // ✅ Find the correct farm area using `farmFieldId`
    let farmAreaFound = false;
    farmer.farmArea = farmer.farmArea.map(area => {
      if (area.farmFieldId === farmFieldId) {
        farmAreaFound = true;
        return { ...area, soil: savedSoilData._id }; // ✅ Add soil reference
      }
      return area;
    });

    if (!farmAreaFound) {
      return res.status(404).json({ message: `Farm field with ID ${farmFieldId} not found.` });
    }

    // ✅ Save the updated farmer document
    const updatedFarmer = await farmer.save();

    res.status(201).json({
      message: "Soil data added successfully to the farm field.",
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error("Error adding soil data to farm field:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all farmers in a specific district
exports.getFarmersByDistrict = async (req, res) => {
  try {
    const districtId = req.admin.districtId; // Get districtId from req.admin

    // Fetch all farmers in the specified district
    const farmers = await Farmer.find({ districtId: districtId }).populate('districtId');

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

exports.approveCropRecommendation = async (req, res) => {
  const { farmerId } = req.params;
  const { cropName } = req.body;

  try {
    console.log(farmerId)
    // ✅ Validate `farmerId`
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ message: "Invalid farmer ID format." });
    }

    // ✅ Check if the farmer exists before updating
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    // ✅ Add the crop recommendation
    farmer.crop.push({ cropName, recommendedDate: new Date() });

    // ✅ Save the updated farmer document
    const updatedFarmer = await farmer.save();

    res.status(200).json({
      message: "Crop recommendation approved and added to farmer.",
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error("Error approving crop recommendation:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

exports.getCropRecommendationsByYear = async (req, res) => {
  const { farmerId } = req.params;

  try {
    // ✅ Validate the farmer ID
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ message: "Invalid farmer ID format." });
    }

    // ✅ Find the farmer
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    // ✅ Ensure the farmer has crops
    if (!farmer.crop || farmer.crop.length === 0) {
      return res.status(200).json({ message: "No crop recommendations found.", data: [] });
    }

    // ✅ Aggregate crop recommendations by year
    const cropsByYear = farmer.crop.reduce((acc, crop) => {
      const year = new Date(crop.recommendedDate).getFullYear();
      if (!acc[year]) {
        acc[year] = {};
      }
      acc[year][crop.cropName] = (acc[year][crop.cropName] || 0) + 1;
      return acc;
    }, {});

    // ✅ Format the data for response
    const responseData = Object.entries(cropsByYear).map(([year, crops]) => ({
      year: parseInt(year),
      crops: Object.entries(crops).map(([cropName, count]) => ({ cropName, count })),
    }));

    res.status(200).json({
      message: "Crop recommendations retrieved successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching crop recommendations by year:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

exports.getWeatherData = async (req, res) => {
  try {
    // ✅ Ensure the district admin is authenticated & has a district
    if (!req.admin || !req.admin.districtId) {
      return res.status(400).json({ message: "Admin is not assigned to any district." });
    }

    // ✅ Find the district & populate the city
    const district = await District.findById(req.admin.districtId).populate("city");

    if (!district || !district.city) {
      return res.status(404).json({ message: "City not found for this district." });
    }

    const cityName = district.city.name; // Extract the city name

    // ✅ Call external weather API
    const API_KEY = process.env.WEATHER_API_KEY; // Store API key in .env file
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(weatherApiUrl);

    // ✅ Extract relevant weather data
    const { temp } = response.data.main; // Temperature in °C
    const rainfall = response.data.rain ? response.data.rain["1h"] || 0 : 0; // Rainfall in mm (if available)

    // ✅ Return the data
    res.status(200).json({
      message: `Weather data for ${cityName} retrieved successfully.`,
      city: cityName,
      temperature: temp,
      rainfall,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);

    res.status(500).json({
      message: "Internal server error.",
      error: error.response?.data || error.message,
    });
  }
};


exports.getNewsForDistrictAdmin = async (req, res) => {
  try {
    console.log('Decoded Token Data:', req.user); // ✅ Debugging: See token data

    const {  role, city } = req.user; // ✅ Extract directly from `req.user`

    // ✅ Ensure only District Admins can access this
    if (role !== 'District') {
      return res.status(403).json({ message: 'Access denied. Not a district admin.' });
    }

    // ✅ Fetch news related to the district admin's city
    const news = await News.find({ city }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'News fetched successfully.',
      news,
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};