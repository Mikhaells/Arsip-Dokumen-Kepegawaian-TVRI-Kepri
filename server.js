const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ganti ini ke path shared folder Anda
const SHARED_FOLDER = 'Z:\Testing'; // Untuk Windows network share
// const SHARED_FOLDER = path.join(__dirname, 'uploads');
// Alternatif untuk local development:
// const SHARED_FOLDER = path.join(__dirname, 'uploads');

const app = express();

// Middleware untuk serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let namaPegawai = req.body.namaPegawai || 'Unknown';
      namaPegawai = namaPegawai.replace(/[<>:"/\\|?*]/g, '_').trim();

      const userFolder = path.join(SHARED_FOLDER, namaPegawai);

      fs.mkdir(userFolder, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder:', err);
          return cb(err);
        }
        cb(null, userFolder);
      });
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      let label = '';
      switch (file.fieldname) {
        case 'ijazahSma':
          label = 'IJAZAH_SMA_SMK';
          break;
        case 'ijazahSarjana':
          label = 'IJAZAH_D3_S1_S2_S3';
          break;
        case 'aktaKelahiran':
          label = 'AKTA_KELAHIRAN';
          break;
        default:
          label = 'FILE';
      }
      
      const ext = path.extname(file.originalname);
      const timestamp = Date.now();
      cb(null, `${label}_${timestamp}${ext}`);
    } catch (error) {
      cb(error);
    }
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    // Validasi tipe file (opsional)
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
});

// Route untuk upload
app.post('/upload', upload.fields([
  { name: 'ijazahSma', maxCount: 5 },
  { name: 'ijazahSarjana', maxCount: 5 },
  { name: 'aktaKelahiran', maxCount: 5 }
]), (req, res) => {
  try {
    console.log('Files uploaded successfully:', req.files);
    res.json({ 
      success: true, 
      message: 'Files uploaded successfully',
      files: req.files 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading files' 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File too large' 
      });
    }
  }
  res.status(500).json({ 
    success: false, 
    message: error.message 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Shared folder: ${SHARED_FOLDER}`);
});