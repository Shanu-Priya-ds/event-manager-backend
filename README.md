# Event Manager Backend

A RESTful API backend for managing events and user registrations. Built with Express.js, MongoDB, and JWT authentication.

**[Live API](https://event-manager-backend-hhfs.onrender.com)** | **[Frontend Repository](https://github.com/Shanu-Priya-ds/event-manager-frontend)**

## Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Event Management**: Create, read, update, and delete events
- **Authorization**: Event organizers can only modify their own events
- **Event Registrations**: Users can register for events
- **Protected Routes**: Token-based authorization on sensitive endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.6.3
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Hashing**: bcrypt v6.0.0
- **Environment**: dotenv v17.4.2

## Project Structure

```
event_manager_backend/
├── controllers/          # Business logic for routes
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── routes/              # API route definitions
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── registrationRoutes.js
│   └── index.js
├── middleware/          # Custom middleware
│   ├── authMiddleware.js
│   └── eventMiddleware.js
├── config/              # Configuration files
│   └── db.js
├── server.js            # Express app setup
├── package.json         # Dependencies
├── .env                 # Environment variables
└── .gitignore
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event_manager_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   The server will start on `http://localhost:5000` (or the port specified in your .env file)

## Deployment

The backend is deployed on Render at: **https://event-manager-backend-hhfs.onrender.com**

### Environment Variables for Deployment
Ensure the following environment variables are set in your deployment platform:
- `PORT`: Server port (default: 3080)
- `MONGO_URI`: MongoDB connection string
- `JWTSECRET`: JWT secret key for token generation
- `FRONTEND_URL`: URL of the frontend application

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate user and receive JWT token |

### Event Routes (`/api/events`)

*All event routes require a valid JWT token*

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/events/` | Get all events of logged-in user | Required |
| GET | `/events/all` | Get all events from database | Required |
| GET | `/events/:id` | Get a specific event by ID | Required |
| POST | `/events/` | Create a new event | Required |
| PUT | `/events/:id` | Update an event | Organizer only |
| DELETE | `/events/:id` | Delete an event | Organizer only |

### Registration Routes (`/api/registrations`)

*All registration routes require a valid JWT token*

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/registrations/` | Get registrations for user's events | Required |
| POST | `/registrations/` | Register user for an event | Required |
| DELETE | `/registrations/:id` | Cancel registration | Required |

## Authentication Flow

1. **Register**: Send user credentials to `/api/auth/register`
2. **Login**: Send credentials to `/api/auth/login` to receive JWT token
3. **Access Protected Routes**: Include token in Authorization header:
   ```
   Authorization: Bearer <jwt-token>
   ```

## Middleware

### authMiddleware
Validates JWT token on protected routes. Extracts user information and attaches it to the request object.

### eventMiddleware (isEventOrganizer)
Verifies that the logged-in user is the organizer of the event before allowing updates or deletions.

## Database Schema

### User
- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String

### Event
- `_id`: ObjectId
- `title`: String (required)
- `description`: String
- `imageUrl`: String
- `venue`: String
- `dateTime`: Date (required)
- `organizerId`: ObjectId (ref: User)
- `createdAt`: Date
- `updatedAt`: Date

### Registration
- `_id`: ObjectId
- `eventId`: ObjectId (ref: Event)
- `userId`: ObjectId (ref: User)
- `createdAt`: Date
- `updatedAt`: Date

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User lacks permission (not event organizer)
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Notes

- Event deletion automatically cascades to delete all associated registrations
- Users can only view/manage events they created (for PUT/DELETE operations)
- All dates are stored in ISO 8601 format in MongoDB
- Passwords are hashed using bcrypt before storage

## Future Enhancements

- Input validation and sanitization
- Rate limiting
- Event categories/tags
- Event search and filtering
- User profile management
- Email notifications for registrations
- Event capacity limits

## License

ISC
