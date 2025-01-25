const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  districtId: { type: String, unique: true, required: true }, // Auto-generated unique district ID
  name: { type: String, required: true }, // District name
  location: { type: String, required: true }, // Location or address
  districtAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null }, // Optional
  farmers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'farmer' }], // Array of farmers in the district
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('District', districtSchema);
