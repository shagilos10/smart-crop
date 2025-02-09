const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Crop name (e.g., "Wheat", "Corn")
  recommendedDate: { type: Date, default: Date.now } // When the crop was recommended
});

module.exports = mongoose.model('Crop', cropSchema);
