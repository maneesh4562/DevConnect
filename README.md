# DevConnect

DevConnect is a platform for developers to connect, share projects, and build a professional network. This full-stack application allows developers to create profiles, showcase their projects, and interact with other developers through comments and feedback.

## Features

- **User Authentication**: Secure registration and login system
- **Profile Management**: Create and update developer profiles with skills, bio, and social links
- **Project Showcase**: Share your coding projects with title, description, tags, and links
- **Project Interaction**: Comment on projects and provide feedback to other developers
- **Search Functionality**: Find developers and projects based on skills, names, or tags
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- RESTful API

### Frontend
- React
- React Router
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests
- React Toastify for notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/devconnect.git
   cd devconnect
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

### Running the Application

#### Development Mode

1. Start the server
   ```bash
   cd server
   npm run dev
   ```

2. Start the client (in a new terminal)
   ```bash
   cd client
   npm start
   ```

3. Access the application at `http://localhost:3000`

#### Production Mode

1. Build the client
   ```bash
   cd client
   npm run build
   ```

2. Start the server in production mode
   ```bash
   cd ../server
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Profiles
- `GET /api/profile/me` - Get current user's profile (protected)
- `POST /api/profile` - Create or update profile (protected)
- `GET /api/profile` - Get all profiles
- `GET /api/profile/user/:userId` - Get profile by user ID

### Projects
- `POST /api/projects` - Create a new project (protected)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `GET /api/projects/user/:userId` - Get projects by user ID

### Comments
- `POST /api/projects/:id/comments` - Add comment to project (protected)
- `GET /api/projects/:id/comments` - Get all comments for a project
- `DELETE /api/comments/:id` - Delete comment (protected)

### Search
- `GET /api/search?q=query` - Search for users and projects