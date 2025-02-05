const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" scheme

  try {
    // Verify the token
    const decoded = jwt.verify(token, "daniel");

    // Attach the decoded payload to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error.message);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to ensure the user is a district admin
exports.verifyDistrictAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin || admin.role !== 'District') {
      return res.status(403).json({ message: 'Access denied. Not a district admin.' });
    }

    next();
  } catch (error) {
    console.error('Error verifying district admin:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Middleware to ensure the user is a city admin
exports.verifyCityAdmin = async (req, res, next) => {
  try {
    console.log(req.user)
    if (!req.user || !req.user.adminId) {
      return res.status(403).json({ message: 'Access denied. No user found in token.' });
    }

    const admin = await Admin.findById(req.user.adminId);

    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Admin not found.' });
    }

    if (admin.role !== 'City') {
      return res.status(403).json({ message: 'Access denied. Not a city admin.' });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error('Error verifying city admin:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
