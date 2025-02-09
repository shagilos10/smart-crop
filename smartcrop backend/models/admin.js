const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['District', 'City'], default: 'District' },
  district: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'District', 
    required: function() { return this.role === 'District'; }, 
    default: null 
  },
  city: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'City', 
    required: function() { return this.role === 'City'; }, 
    default: null
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);
