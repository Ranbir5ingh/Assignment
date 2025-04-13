# QuickTask

## Description
QuickTask is a task management application that allows users to create, manage, and track their tasks efficiently. The application features user authentication, task creation, completion tracking, and a user-friendly dashboard.

## Features
- User authentication (login/register)
- Create, read, update, and delete tasks
- Toggle task completion status
- Filter tasks by status (all, completed, pending)
- Responsive design for mobile and desktop

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ranbir5ingh/Assignment.git
   cd assignment
   ```

2. Install dependencies for the frontend:
   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in both `client` and `server` directories and add the necessary configurations.

   ### Server Environment Variables (server/.env)
   ```
   MONGO_URL= your_mongodb_connection_string
   PORT=server_port (default 5000)
   CLIENT_BASE_URL=your_client_base_url
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

   ### Client Environment Variables (client/.env)
   ```
   VITE_API_URL=base_url_for_api_requests (http://localhost:5000)
   ```

## Usage
1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend application:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to your client base url to access the application.

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user

### Task Management
- `POST /api/task/add` - Create a new task
- `GET /api/task/get/:userId` - Get all tasks for a user
- `PUT /api/task/toggle-complete` - Toggle task completion status
- `PUT /api/task/update` - Update task details
- `DELETE /api/task/clear-completed/:userId` - Clear all completed tasks
- `DELETE /api/task/:userId/:taskId` - Delete a single task

## Technologies Used
- Frontend: React, Vite, Redux
- Backend: Node.js, Express, MongoDB
- UI Components: shadcn, tailwind css
