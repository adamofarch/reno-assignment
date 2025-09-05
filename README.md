# School Management System

A comprehensive school management web application built with Next.js and MySQL, featuring school registration and directory browsing capabilities.

## Features

- **Add Schools**: Complete form with validation for adding new schools
- **Browse Schools**: Ecommerce-style directory to view all schools
- **Image Upload**: Support for school image uploads
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Form Validation**: Email and phone number validation
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Form Handling**: React Hook Form
- **File Upload**: Multer
- **Styling**: Tailwind CSS

## Database Schema

The application uses a MySQL database with the following table structure:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=schools_db
DB_PORT=3306
```

5. Create the MySQL database:
```sql
CREATE DATABASE schools_db;
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Home Page (`/`)
- Landing page with navigation
- Overview of features
- Quick access to add/view schools

### Add School (`/addSchool`)
- Form to add new schools
- Comprehensive validation
- Image upload functionality
- Responsive design

### Show Schools (`/showSchools`)
- Grid layout displaying all schools
- Ecommerce-style card design
- School name, address, city, and image display
- Responsive grid system

## API Endpoints

### POST `/api/schools/add`
Adds a new school to the database.

**Body**: FormData with school information and optional image file.

**Response**: Success message with school ID.

### GET `/api/schools/get`
Retrieves all schools from the database.

**Response**: Array of school objects.

## File Structure

```
├── pages/
│   ├── api/
│   │   └── schools/
│   │       ├── add.js
│   │       └── get.js
│   ├── addSchool.jsx
│   ├── showSchools.jsx
│   └── index.js
├── lib/
│   └── db.js
├── public/
│   └── schoolImages/
├── styles/
│   └── globals.css
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | (empty) |
| `DB_NAME` | Database name | schools_db |
| `DB_PORT` | MySQL port | 3306 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.