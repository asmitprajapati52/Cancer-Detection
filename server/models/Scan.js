const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  // 🎯 Yeh scan kis user ne kiya hai, uski ID (User model se linked)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // 🖼️ Uploaded image ka URL (jo Cloudinary ya server par save hogi)
  imageUrl: {
    type: String,
    required: true
  },
  // 🧠 ML Model ne kya predict kiya (e.g., 'Melanoma', 'Benign')
  prediction: {
    type: String,
    required: true
  },
  // 📊 Model ka confidence score (e.g., 94.5%)
  confidence: {
    type: Number,
    required: true
  },
  // 📝 Agar doctor ya user koi apna note add karna chahe
  notes: {
    type: String,
    default: ''
  }
}, { 
  // Isse automatic createdAt aur updatedAt mil jata hai (pata chalega kab scan hua)
  timestamps: true 
});

module.exports = mongoose.model('Scan', ScanSchema);