const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true }, // District name
  location: { type: String, required: true }, // Location or address
  districtAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to District Admin
  farmers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'farmer' }], // Array of farmers in the district
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('District', districtSchema);
