# Project Setup

## Technologies Used
•⁠  ⁠*Frontend:* JavaScript, Vanilla CSS, React
•⁠  ⁠*Backend:* Express, MongoDB

## Setup Instructions

### 1. Install Node.js Dependencies
Run the following command in both the ⁠ /backend ⁠ and ⁠ /frontend ⁠ directories:

⁠ bash
npm install
 ⁠

### 2. Install and Start MongoDB
•⁠  ⁠Install MongoDB if you haven't already.
•⁠  ⁠Start MongoDB by running:

⁠ bash
mongod
 ⁠

	⁠This will start the database server at: ⁠ mongodb://127.0.0.1:27017 ⁠

### 3. Start the Servers
•⁠  ⁠Start the *backend* server:

⁠ bash
cd backend
npm start
 ⁠

•⁠  ⁠Start the *frontend* server:

⁠ bash
cd frontend
npm start
 ⁠

### 4. Open in Browser
Visit:

⁠ text
http://localhost:5173
 ⁠

to view the application.

## Production Deployment

If you plan to deploy the project to production, be sure to move any sensitive data into a ⁠ .env ⁠ file.
