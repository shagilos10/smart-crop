const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const District = require('../models/district');
const City = require('../models/city');
const jwt = require('jsonwebtoken')

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
  
    try {
      // Ensure the user making the request is a city admin
    //   const cityAdmin = await Admin.findById(req.user.id);
    //   if (!cityAdmin || cityAdmin.role !== 'City') {
    //     return res.status(403).json({ message: 'Access denied. Only city admins can create districts.' });
    //   }
  
      // Check if a district with the same name already exists
      const existingDistrict = await District.findOne({ name });
      if (existingDistrict) {
        return res.status(400).json({ message: 'District with this name already exists.' });
      }
  
      // Create the new district
      const newDistrict = new District({
        name,
        location,
        // cityAdmin: cityAdmin._id,
      });
  
      // Save the district to the database
      const savedDistrict = await newDistrict.save();
  
      res.status(201).json({
        message: 'District created successfully.',
        district: savedDistrict,
      });
    } catch (error) {
      console.error('Error creating district:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

exports.getAllDistrictAdmins = async (req, res) => {
    const { cityId } = req.user; 
  
    try {
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(400).json({ message: 'Invalid city ID format.' });
      }
  
      const districts = await District.find({ city: cityId }).populate('districtAdmin', 'username email');
  
      const districtAdminIds = districts.map(d => d.districtAdmin?._id).filter(id => id);
  
      const districtAdmins = await Admin.find({ _id: { $in: districtAdminIds }, role: 'District' }).select('-password');
  
      const result = districtAdmins.map(admin => {
        const assignedDistrict = districts.find(d => d.districtAdmin?._id.toString() === admin._id.toString());
        return {
          adminId: admin._id,
          username: admin.username,
          email: admin.email,
          district: assignedDistrict
            ? {
                districtId: assignedDistrict._id,
                name: assignedDistrict.name,
                location: assignedDistrict.location
              }
            : null
        };
      });
  
      res.status(200).json({
        message: 'District Admins retrieved successfully.',
        districtAdmins: result,
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