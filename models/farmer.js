const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true }, 
  farmArea: [
    {
      farmFieldId: { type: String, required: true }, // New field for identifying each farm plot
      soil: { type: mongoose.Schema.Types.ObjectId, ref: 'Soil', default: null }, 
      areaSize: { type: Number, required: true } 
    }
  ],
  crop: [
    {
      cropName: { type: String, required: true }, // Name of recommended crop
      recommendedDate: { type: Date, default: Date.now } // Date when recommendation was made
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

farmerSchema.index({ username: 1, districtId: 1 }, { unique: true });

module.exports = mongoose.model('Farmer', farmerSchema);
