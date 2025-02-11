const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const District = require('../models/district');
const City = require('../models/city');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const News = require('../models/news')

exports.registerDistrictAdmin = async (req, res) => {
  const { username, email, password, districtId } = req.body;

  try {
    // Check if the district exists
    const existingDistrict = await District.findById(districtId);
    if (!existingDistrict) {
      return res.status(404).json({ message: 'District not found.' });
    }

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new district admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: 'District',
      district: districtId, // Associate the admin with the district
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      message: 'District admin registered successfully.',
      admin: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        district: savedAdmin.district,
      },
    });
  } catch (error) {
    console.error('Error registering district admin:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.createDistrict = async (req, res) => {
  const { name, location } = req.body;

  const cityAdmin = req.user
  const city = cityAdmin.city

  try {
    const newDistrict = new District({
      name,
      location,
      city,
    });

    const savedDistrict = await newDistrict.save();
    res.status(201).json(savedDistrict);
  } catch (error) {
    console.error('Error creating district:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

 
exports.getAllDistrictAdmins = async (req, res) => {
  try {
    const { city } = req.user; // ✅ Extract city from logged-in admin

    if (!mongoose.Types.ObjectId.isValid(city)) {
      return res.status(400).json({ message: 'Invalid city ID format.' });
    }

    // ✅ Fetch all districts in the admin's city & populate the districtAdmin field
    const districts = await District.find({ city })
      .populate({
        path: 'districtAdmin',
        select: 'username email' // Only fetch username & email, exclude password
      });

    if (!districts.length) {
      return res.status(404).json({ message: 'No districts found in this city.' });
    }

    // ✅ Structure response mapping each district to its admin
    const result = districts.map(district => ({
      districtId: district._id,
      name: district.name,
      location: district.location,
      admin: district.districtAdmin ? {
        adminId: district.districtAdmin._id,
        username: district.districtAdmin.username,
        email: district.districtAdmin.email
      } : null
    }));

    res.status(200).json({
      message: 'Districts and their admins retrieved successfully.',
      districts: result
    });

  } catch (error) {
    console.error('Error fetching district admins:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

exports.registerCityAdmin = async (req, res) => {
    try {
      const { username, email, password, cityName, state, country } = req.body;
  
      // Check if admin email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }
  
      // Check if city exists, if not create a new one
      let city = await City.findOne({ name: cityName, state, country });
      if (!city) {
        city = new City({ name: cityName, state, country });
        await city.save();
      }
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create City Admin
      const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
        role: 'City',
        city: city._id, // Associate admin with the city
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: 'City Admin registered successfully', admin: newAdmin });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

exports.loginCityAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (admin.role !== 'City') {
        return res.status(403).json({ message: 'Unauthorized: Not a City Admin' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { adminId: admin._id, role: admin.role, city: admin.city },
        "daniel",
        { expiresIn: '7d' } // Token valid for 7 days
      );
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  exports.createNews = async (req, res) => {
    const { title, content } = req.body;
    const cityId = req.admin?.city || req.user.city;
    const userId = req.admin?.adminId || req.user.adminId;
    console.log(cityId, userId);
    
    try {
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(400).json({ message: 'Invalid city ID.' });
      }
  
      // ✅ Check if the city exists
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ message: 'City not found.' });
      }
  
      // ✅ Create the news entry
      const newNews = new News({
        title,
        content,
        city: cityId,
        createdBy: userId, // ✅ Ensure it's linked to the City Admin
      });
  
      // ✅ Save news to the database
      const savedNews = await newNews.save();
  
      res.status(201).json({
        message: 'News added successfully.',
        news: savedNews,
      });
    } catch (error) {
      console.error('Error adding news:', error.message);
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  };