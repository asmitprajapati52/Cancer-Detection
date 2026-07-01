const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Scan = require('../models/Scan'); // Exact Path Sahi Hai ✅
const { protect } = require('../authMiddleware'); // Exact Path Sahi Hai ✅

// 📂 Ensure 'uploads' folder automatically ban jaye server root me
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ⚙️ Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 🔒 Image validation filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, and WEBP images are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 🔬 POST: /api/scan/upload
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image!' });
    }

    const localImageUrl = `/uploads/${req.file.filename}`;
    const absolutePath = req.file.path;

    // 🚀 Prepare Data to send to Python FastAPI
    const formData = new FormData();
    formData.append('file', fs.createReadStream(absolutePath));

    // 📡 Hit FastAPI Server
    const fastApiResponse = await axios.post('http://127.0.0.1:8000/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const { class: predictionClass, confidence: confidenceScore } = fastApiResponse.data;

    // 💾 Create MongoDB entry using your exact ScanSchema
    const newScan = new Scan({
      user: req.user._id, // Real logged-in user ki id legi tabhi context safe rahega
      imageUrl: localImageUrl,
      prediction: predictionClass || "Unknown",
      confidence: confidenceScore ? Number(confidenceScore) : 0, 
      notes: req.body.notes || 'Scanned via FastAPI Core Integration.'
    });

    const savedScan = await newScan.save();

    res.status(201).json({
      success: true,
      message: 'Prediction successful and saved to DB!',
      scan: savedScan
    });

  } catch (error) {
    console.error("❌ Error in pipeline:", error.message);
    res.status(500).json({ 
      message: "Model prediction failed or FastAPI is down!", 
      error: error.message 
    });
  }
});

module.exports = router;