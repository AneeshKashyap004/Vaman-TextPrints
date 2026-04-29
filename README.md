# Vaaman Texprint Private Limited - Corporate Website

A premium, modern corporate website for Vaaman Texprint Private Limited, a textile manufacturing company based in Telangana, India. Built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- Premium corporate UI with elegant design
- Smooth animations using Framer Motion
- Responsive design with Tailwind CSS
- Sections: Hero, About, Services, Infrastructure, Why Choose Us, Contact
- Glassmorphism effects and gradient backgrounds
- Custom scrollbar and premium color palette

### Admin Dashboard
- Secure admin login (Username: Admin, Password: Admin123)
- Manage homepage content (hero text, about section)
- Manage services (add/edit/delete)
- Manage images for all sections
- Manage contact information
- View and manage contact form messages

### Backend
- RESTful API with Express.js
- MongoDB for data storage
- JWT authentication for admin routes
- CRUD operations for all content

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, React Router, Axios, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Multer
- **Image Storage**: Cloudinary (placeholder - configure credentials in .env)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd /home/aneesh-kashyap/Documents/Vaman\ TextPrints
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vaaman-texprint
JWT_SECRET=vaaman-texprint-secret-key-2024
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

The `.env` file is already configured with:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
sudo systemctl start mongod

# Or use MongoDB Atlas
# Update MONGODB_URI in backend/.env with your connection string
```

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Server (in a new terminal)

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Accessing the Application

### Public Website
- Homepage: `http://localhost:5173`

### Admin Dashboard
- Login: `http://localhost:5173/admin`
- Dashboard: `http://localhost:5173/admin/dashboard`
- **Username**: Admin
- **Password**: Admin123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Content Management
- `GET /api/content` - Get all content
- `PUT /api/content` - Update content (admin only)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Contact Info
- `GET /api/contact` - Get contact information
- `PUT /api/contact` - Update contact information (admin only)

### Messages
- `POST /api/messages` - Submit contact form (public)
- `GET /api/messages` - Get all messages (admin only)
- `PUT /api/messages/:id/read` - Mark as read (admin only)
- `DELETE /api/messages/:id` - Delete message (admin only)

### Image Upload
- `POST /api/upload/image` - Upload image (admin only)

## Project Structure

```
Vaman TextPrints/
├── backend/
│   ├── models/
│   │   ├── Content.js
│   │   ├── Service.js
│   │   ├── Contact.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── content.js
│   │   ├── services.js
│   │   ├── contact.js
│   │   ├── messages.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Infrastructure.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── admin/
│   │   │       ├── HomepageContent.jsx
│   │   │       ├── ServicesManager.jsx
│   │   │       ├── ImageManager.jsx
│   │   │       ├── ContactManager.jsx
│   │   │       └── MessagesManager.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env
└── README.md
```

## Default Content

The application comes with pre-configured default content:
- Company name: Vaaman Texprint Private Limited
- Tagline: Precision in Textile Processing & Manufacturing
- About section with company history
- 4 default services (Dyeing & Processing, Textile Manufacturing, Polycot Fabric Processing, Industrial Finishing)
- Contact information with address and email

All content can be modified through the admin dashboard.

## Customization

### Colors
The color palette is defined in `frontend/tailwind.config.js`:
- Primary: Navy (#0a1628, #0f2744, #1a3a5c)
- Accent: Gold (#d4af37, #c9a227, #e5c04b)
- Secondary: Copper (#b87333, #a8652b)

### Fonts
- Serif: Playfair Display (headings)
- Sans: Inter (body text)

## Deployment

### Backend Deployment
1. Deploy to a hosting service (Render, Railway, Heroku, etc.)
2. Set environment variables
3. Update MongoDB URI to production database
4. Configure Cloudinary for image uploads

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update `VITE_API_URL` to production backend URL

## Security Notes

- Admin credentials are hardcoded for simplicity (change in production)
- JWT secret should be changed in production
- Implement rate limiting for API endpoints
- Add CSRF protection for forms
- Use environment variables for sensitive data

## License

This project is proprietary and confidential for Vaaman Texprint Private Limited.

## Support

For technical support, contact the development team.
