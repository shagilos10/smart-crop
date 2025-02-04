const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true }, // ✅ Kept ObjectId reference
  farmArea: [
    {
      soil: { type: mongoose.Schema.Types.ObjectId, ref: 'Soil', default: null }, 
      areaSize: { type: Number, required: true } 
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Farmer', farmerSchema);
