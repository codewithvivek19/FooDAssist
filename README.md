# FitFuel - Meal Planning Application

FitFuel is a comprehensive meal planning application designed to help users maintain a healthy lifestyle by providing convenient access to nutritious meal plans.

## Project Structure

The project consists of three main components:

- **Frontend**: User-facing application built with React
- **Admin**: Admin panel for managing meals, meal plans, and orders
- **Backend**: API server built with Express and MongoDB

## Features

- Customized meal plans based on user preferences
- Order tracking and management
- Admin dashboard with statistics
- Secure authentication
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Nani180704/fuelfit.git
   cd fuelfit
   ```

2. Install dependencies for all components:
   ```
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install

   # Admin
   cd ../admin
   npm install
   ```

3. Create a `.env` file in the backend directory with the following:
   ```
   PORT=5004
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```
   # Backend
   cd backend
   npm run dev

   # Frontend (in a new terminal)
   cd frontend
   npm run dev

   # Admin (in a new terminal)
   cd admin
   npm run dev
   ```

## License

This project is licensed under the MIT License. 