# Collaborative Product Wishlist App

A full-stack web application that allows users to create, manage, and share product wishlists collaboratively. Users can sign up, create wishlists, add products, and manage their collections with real-time updates.

## LIVE LINK OF APP :- https://wishlist-uvi7.onrender.com

## Features

- **User Authentication**: Secure signup and login functionality
- **Wishlist Management**: Create, edit, and delete wishlists
- **Product Management**: Add, edit, and remove products from wishlists
- **Ownership Control**: Only wishlist owners can edit/delete their wishlists and products
- **User-Friendly Interface**: Clean and responsive design
- **Real-time Updates**: Seamless data synchronization

## Tech Stack

### Frontend

- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page application
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **REST API** - RESTful API architecture
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library

### Database

- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling library

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <https://github.com/Airaf724/Wishlist.git>
cd Wishlist
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create a .env file in the root directory and add:
MONGODB_URL=mongodb://localhost:27017/wishlist-app
JWT_SECRET=your-secret-key-here
PORT=5000

# Start the backend server
node backend/index.js
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will run on `http://localhost:3000`

## Project Structure

```
collaborative-wishlist-app/
├── backend/
│   ├── index.js          # Main server file
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   └── controllers/      # Route handlers
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   ├── utils/        # Utility functions
│   │   └── App.jsx       # Main App component
│   ├── public/
│   └── package.json
├── README.md
└── package.json
```

## Authentication

The application implements JWT-based authentication:

- Users can sign up with email and password
- Secure login with password hashing
- Protected routes requiring authentication
- Automatic token refresh and session management

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Wishlists

- `GET /api/wishlists` - Get all user wishlists
- `POST /api/wishlists` - Create new wishlist
- `PUT /api/wishlists/:id` - Update wishlist
- `DELETE /api/wishlists/:id` - Delete wishlist

### Products

- `GET /api/products/:wishlistId` - Get products in wishlist
- `POST /api/products` - Add product to wishlist
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## Assumptions

1. **Single User per Wishlist**: Each wishlist is owned by one user who has full control
2. **Mock Collaboration**: The "invite others" feature is simulated - no actual email invitations
3. **Local Authentication**: Uses custom authentication instead of third-party providers
4. **Image URLs**: Products use image URLs instead of file uploads
5. **No Payment Integration**: Prices are for display purposes only
6. **Basic Validation**: Minimal client-side and server-side validation implemented

## Limitations

1. **No Real-time Collaboration**: Multiple users cannot edit the same wishlist simultaneously
2. **No File Upload**: Product images must be provided as URLs
3. **Limited Error Handling**: Basic error messages without detailed logging
4. **No Email Verification**: Users can sign up without email confirmation
5. **No Password Reset**: Users cannot reset forgotten passwords
6. **No Data Pagination**: All data is loaded at once (not suitable for large datasets)
7. **No Search Functionality**: No search or filter options for wishlists/products
8. **No User Profiles**: Limited user information storage and display
9. **No Backup/Recovery**: No data backup or recovery mechanisms
10. **No Rate Limiting**: API endpoints are not rate-limited

## Future Enhancements

1. **Real-time Updates**: Implement WebSockets for live collaboration
2. **File Upload**: Add image upload functionality with cloud storage
3. **Advanced Search**: Implement search and filtering capabilities
4. **User Profiles**: Enhanced user profile management
5. **Email Notifications**: Send invitations and updates via email
6. **Social Features**: Add comments, likes, and sharing capabilities
7. **Mobile App**: Develop native mobile applications
8. **Analytics**: Add usage analytics and reporting
9. **Performance Optimization**: Implement caching and pagination
10. **Security Enhancements**: Add rate limiting, input sanitization, and audit logs

## Known Issues

1. **Session Management**: Tokens don't auto-refresh, requiring manual re-login
2. **Responsive Design**: Some UI components may not be fully mobile-optimized

## Testing

Currently, the application lacks comprehensive testing. Future versions should include:

- Unit tests for components and utilities
- Integration tests for API endpoints
- End-to-end testing with tools like Cypress
- Performance testing for scalability

## License

This project is created as part of a technical assignment and is for educational purposes only.

## Contributing

This is an assignment project. For any questions or suggestions, please contact the developer.

---

**Note**: This application is built as a technical demonstration and may require additional security measures and optimizations for production use.

## ScreenShots

## Login Page
