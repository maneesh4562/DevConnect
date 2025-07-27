import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

// Page Components
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import CreateProject from './components/projects/CreateProject';
import EditProject from './components/projects/EditProject';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Search from './components/search/Search';
import NotFound from './components/pages/NotFound';

// Context
import { AuthProvider } from './context/auth/AuthContext';
import { ProjectProvider } from './context/project/ProjectContext';
import { AlertProvider } from './context/alert/AlertContext';

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ProjectProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <ToastContainer position="top-right" autoClose={3000} />
                <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                
                {/* Private Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/create-project" element={
                  <PrivateRoute>
                    <CreateProject />
                  </PrivateRoute>
                } />
                <Route path="/edit-project/:id" element={
                  <PrivateRoute>
                    <EditProject />
                  </PrivateRoute>
                } />
                <Route path="/edit-profile" element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ProjectProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;