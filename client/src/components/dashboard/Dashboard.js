import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ProjectContext from '../../context/project/ProjectContext';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { user } = authContext;
  const { userProjects, getProjectsByUser, loading, deleteProject } = projectContext;

  useEffect(() => {
    if (user) {
      getProjectsByUser(user._id);
    }
    // eslint-disable-next-line
  }, [user]);

  const onDeleteProject = id => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user && user.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/create-project"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Add New Project
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <img
            src={user.profilePicture || '/images/default-avatar.svg'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-6 mb-4 md:mb-0"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <Link
              to="/edit-profile"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Projects</h2>
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map(project => (
              <div
                key={project._id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300"
              >
                <img
                  src={project.image || '/images/default-project.svg'}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/project/${project._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View
                    </Link>
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-project/${project._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => onDeleteProject(project._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't created any projects yet.</p>
            <Link
              to="/create-project"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Create Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;