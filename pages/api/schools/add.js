import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getConnection, initDatabase } from '../../../lib/db';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'public', 'schoolImages');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize database
    await initDatabase();
    
    // Use multer to handle file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, address, city, state, contact, email_id } = req.body;
      
      // Validation
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_id)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Phone validation
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(contact)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
      }

      const conn = await getConnection();
      
      // Get image path if uploaded
      const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;
      
      // Insert school data
      const [result] = await conn.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, imagePath, email_id]
      );

      res.status(201).json({ 
        message: 'School added successfully',
        schoolId: result.insertId 
      });
    });

  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
