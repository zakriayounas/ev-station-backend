# EV Booking & User Management API

A full-featured backend API for an electric vehicle booking system with user management, profile images, vehicles, JWT authentication, and Google social login.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Folder Structure](#folder-structure)
* [License](#license)

---

## Features

* User registration and login (email/password)
* Google OAuth login
* User profile with profile image (Cloudinary) and random profile color
* Vehicles management (add/update/delete vehicles in profile)
* Role-based access control (`admin`, `owner`, `user`)
* Booking management with cost, status, and vehicle info
* Filtering, pagination, and search for users and stations
* Secure JWT authentication
* Cloudinary integration for profile images

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, Google OAuth
* **File Uploads:** Multer (memory storage), Cloudinary
* **Utilities:** bcryptjs, dotenv, google-auth-library

---

## Getting Started

### Prerequisites

* Node.js >= 16
* MongoDB URI (local or Atlas)
* Cloudinary account
* Google OAuth credentials (Client ID & Secret)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ev-booking-api.git
cd ev-booking-api

# Install dependencies
npm install

# Create a .env file (see below for variables)
cp .env.example .env

# Run the server
npm run dev
```

Server will start at: `http://localhost:5000` (or your PORT)

---

## Environment Variables

Create a `.env` file in the root:

```env
# Server
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Frontend URL (for redirect after social login)
FRONTEND_URL=http://localhost:3000
```

---

## API Endpoints

### Authentication

| Endpoint                    | Method | Description                             |
| --------------------------- | ------ | --------------------------------------- |
| `/api/auth/register`        | POST   | Register a new user                     |
| `/api/auth/login`           | POST   | Login with email/password               |
| `/api/auth/google`          | GET    | Redirect to Google OAuth consent screen |
| `/api/auth/google/callback` | GET    | Google OAuth callback                   |

### Users

| Endpoint                | Method | Description                                               |
| ----------------------- | ------ | --------------------------------------------------------- |
| `/api/users/`           | GET    | Get all users (admin only, supports filters & pagination) |
| `/api/users/profile/me` | GET    | Get logged-in user profile                                |
| `/api/users/profile/me` | PUT    | Update profile (name, phone, profile image, vehicles)     |

### Stations

| Endpoint        | Method | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| `/api/stations` | GET    | Get all stations (supports filters & pagination) |

### Bookings

| Endpoint            | Method | Description                                  |
| ------------------- | ------ | -------------------------------------------- |
| `/api/bookings`     | GET    | Get bookings (supports filters & pagination) |
| `/api/bookings`     | POST   | Create a new booking                         |
| `/api/bookings/:id` | PUT    | Update booking status                        |
| `/api/bookings/:id` | DELETE | Cancel booking                               |

> All protected routes require JWT in `Authorization: Bearer <token>` header.

---

## Folder Structure

```
project-root/
│
├─ controllers/
│   ├─ authController.js
│   ├─ userController.js
│   ├─ bookingController.js
│   └─ stationController.js
│
├─ middlewares/
│   ├─ authMiddleware.js
│   └─ roleMiddleware.js
│
├─ models/
│   ├─ User.js
│   ├─ Booking.js
│   └─ Station.js
│
├─ utils/
│   ├─ cloudinary.js
│   └─ color.js
│
├─ routes/
│   ├─ authRoutes.js
│   ├─ userRoutes.js
│   └─ bookingRoutes.js
│
├─ .env.example
├─ package.json
└─ server.js
```

---

## License

This project is licensed under the MIT License.
