import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { put } from '@vercel/blob';
import { getConnection, initDatabase } from '../../../lib/db';

// Configure multer for file uploads based on environment
const storage = process.env.NODE_ENV === 'production' 
  ? multer.memoryStorage() // Use memory storage for production (Vercel)
  : multer.diskStorage({   // Use disk storage for development
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
      
      // Handle image upload based on environment
      let imagePath = null;
      if (req.file) {
        if (process.env.NODE_ENV === 'production') {
          // Production: Use Vercel Blob storage
          try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename = `schoolImages/image-${uniqueSuffix}${path.extname(req.file.originalname)}`;
            
            const blob = await put(filename, req.file.buffer, {
              access: 'public',
            });
            
            imagePath = blob.url;
          } catch (error) {
            console.error('Error uploading image to Vercel Blob:', error);
            return res.status(500).json({ message: 'Error uploading image' });
          }
        } else {
          // Development: Use local file system
          imagePath = `/schoolImages/${req.file.filename}`;
        }
      }
      
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
