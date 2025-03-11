# Full Stack Events Management System

This is a full-stack events management project where users can view, register for events, and add events to their Google Calendar. Only admins can add new events.

## Features

- **User**:
  - View events.
  - Register for events with name and email.
  - Add events to Google Calendar.
  
- **Admin**:
  - Add events (password required).
  
## Admin Password

To add events as an admin, use the password: `admin321`.

## Project Structure

### Backend

The backend is built with **Express.js** and **MongoDB** to handle the API requests and database operations. 

1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server using:
   ```bash
   nodemon server.js
   ```

### Frontend

The frontend is built with **React.js** and **Tailwind CSS** for a responsive and modern UI.

1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```

## Environment Variables

You need to configure the following environment variables in both the frontend and backend for proper functionality.

### Backend

- **MONGO_URI**: MongoDB connection URI.
- **PORT**: Port to run the server on (default is `5001`).
- **GOOGLE_CLIENT_ID**: Google client ID for OAuth integration to add events to Google Calendar.

### Frontend

- **API_BASE_URL**: URL for the backend API (e.g., `http://localhost:5001` or the deployed URL).

## Dependencies

### Backend

- **Express.js** for server setup.
- **MongoDB** for database storage.
- **CORS** for handling cross-origin requests.
- **dotenv** for environment variables.
- **Nodemon** for automatic server restarts during development.

### Frontend

- **React.js** for building the user interface.
- **Tailwind CSS** for styling.
- **Axios** for making API requests.

