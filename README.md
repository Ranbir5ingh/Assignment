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
   git clone https://github.com/yourusername/quicktask.git
   cd quicktask
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

## Usage
1. Start the backend server:
   ```bash
   cd server
   node server.js
   ```

2. Start the frontend application:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user

### Task Management
- `POST /api/task/add` - Create a new task
- `GET /api/task/get/:userId` - Get all tasks for a user
- `GET /api/task/:userId/:taskId` - Get a single task
- `PUT /api/task/toggle-complete` - Toggle task completion status
- `PUT /api/task/update` - Update task details
- `DELETE /api/task/clear-completed/:userId` - Clear all completed tasks
- `DELETE /api/task/:userId/:taskId` - Delete a single task

## Technologies Used
- Frontend: React, Vite, Redux
- Backend: Node.js, Express, MongoDB
- UI Components: shadcn