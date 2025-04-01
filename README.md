# FooDAssist - Personalized Meal Planning Application

FooDAssist is a comprehensive meal planning application designed to help users maintain a healthy lifestyle by providing personalized meal plans based on body type, weight, and fitness goals.

## Key Features

- **Body Profile Analysis**: Calculate BMI, BMR, and TDEE based on user body measurements
- **Personalized Meal Recommendations**: Get customized meal plans based on your body type and fitness goals
- **Nutrition Tracking**: Track calories, protein, and macronutrients
- **Meal Management**: Browse, filter, and order meals tailored to your needs
- **Admin Dashboard**: Manage meals, meal plans, and orders

## Project Structure

The project consists of three main components:

- **Frontend**: User-facing application built with React
- **Admin**: Admin panel for managing content built with React
- **Backend**: API server built with Express and MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/codewithvivek19/FooDAssist.git
   cd FooDAssist
   ```

2. Backend Setup:
   ```
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5004
   MONGODB_URI=mongodb://localhost:27017/foodassist
   JWT_SECRET=yoursecretshouldbeunique123
   ```

   Note: Replace the MongoDB URI with your own connection string if using Atlas.

3. Frontend Setup:
   ```
   cd ../frontend
   npm install
   ```

4. Admin Setup:
   ```
   cd ../admin
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```
   cd frontend
   npm run dev
   ```

3. Start the admin panel:
   ```
   cd admin
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Admin Panel: http://localhost:5174
- Backend API: http://localhost:5004

## User Guide

### Body Profile Feature

1. Navigate to "Create My Plan" on the homepage
2. Enter your body measurements:
   - Weight
   - Height
   - Age
   - Gender
   - Body type (Ectomorph, Mesomorph, Endomorph)
   - Activity level
   - Fitness goal
3. Submit to get personalized meal plan recommendations
4. Review your nutritional needs and recommended meal plans
5. Select a plan and add it to your cart

### API Documentation

#### Meal Plan Recommendation API

**Endpoint:** `POST /api/meal-plans/recommend`

**Request Body:**
```json
{
  "weight": 70,
  "height": 175,
  "age": 30,
  "gender": "male",
  "bodyType": "mesomorph",
  "activityLevel": "moderate",
  "fitnessGoals": "weight-loss"
}
```

**Response:**
```json
{
  "metrics": {
    "bmi": 22.9,
    "bmr": 1655,
    "tdee": 2565,
    "targetCalories": 2052,
    "proteinTarget": 126
  },
  "recommendedPlans": [
    {
      "_id": "...",
      "name": "Weight Loss Plan",
      "description": "...",
      "duration": 28,
      "price": 149.99,
      "targetCalories": 2000,
      "type": "weight-loss",
      "image": "..."
    }
  ]
}
```

## License

This project is licensed under the MIT License. 