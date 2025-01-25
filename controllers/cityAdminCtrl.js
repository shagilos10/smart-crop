const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const District = require('../models/district');

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