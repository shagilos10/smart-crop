const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  // soilType: { type: String, required: true }, // e.g., Loam, Sandy
  humidity: { type: Number, required: true }, // in percentage
  nutrientLevel: {
    nitrogen: { type: Number, required: true }, // in ppm (parts per million)
    phosphorous: { type: Number, required: true }, // in ppm
    potassium: { type: Number, required: true }, // in ppm
  },
  ph: { type: Number, required: true }, // Soil pH level (e.g., 6.5)
  addedDate: { type: Date, default: Date.now } // When the crop was recommended
});

module.exports = mongoose.model('Soil', soilSchema);
