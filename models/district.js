const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  location: { type: String, required: true }, 
  districtAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null }, 
  farmers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('District', districtSchema);
