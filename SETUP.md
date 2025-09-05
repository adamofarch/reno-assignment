# School Management System - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

#### Option A: Using the setup script
```bash
# Set your database credentials
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=your_password
export DB_NAME=schools_db

# Run the setup script
node setup-db.js
```

#### Option B: Manual setup
1. Create a MySQL database named `schools_db`
2. The table will be created automatically when you first run the application

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=schools_db
DB_PORT=3306
```

### 4. Run the Application
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Features Implemented

✅ **Add School Page** (`/addSchool`)
- Complete form with all required fields
- React Hook Form integration
- Comprehensive validation (email, phone, required fields)
- Image upload functionality
- Responsive design for mobile and desktop

✅ **Show Schools Page** (`/showSchools`)
- Ecommerce-style grid layout
- Displays school name, address, city, and image
- Responsive design
- Loading states and error handling

✅ **Database Integration**
- MySQL database with proper schema
- API routes for CRUD operations
- Image storage in `public/schoolImages/`

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS for styling
- Works on all screen sizes

✅ **Form Validation**
- Email validation
- Phone number validation
- Required field validation
- File type validation for images

## Project Structure

```
├── pages/
│   ├── api/schools/
│   │   ├── add.js          # API to add schools
│   │   └── get.js          # API to fetch schools
│   ├── addSchool.jsx       # Add school page
│   ├── showSchools.jsx     # Show schools page
│   └── index.js            # Home page
├── lib/
│   └── db.js               # Database connection
├── public/
│   └── schoolImages/       # Uploaded school images
├── setup-db.js             # Database setup script
└── README.md               # Project documentation
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## Testing the Application

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Add New School" to test the form
4. Click "Browse Schools" to see the directory
5. Test on mobile by resizing your browser window

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check your database credentials in `.env.local`
- Verify the database exists

### Image Upload Issues
- Check that the `public/schoolImages/` directory exists
- Ensure proper file permissions

### Build Issues
- Run `npm install` to ensure all dependencies are installed
- Check for any linting errors with `npm run lint`
