const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }, // ✅ Ensure news belongs to a city
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // ✅ Posted by a City Admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);
