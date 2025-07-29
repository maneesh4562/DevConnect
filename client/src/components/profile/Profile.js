import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectContext from '../../context/project/ProjectContext';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../layout/Spinner';

const Profile = () => {
  const { id } = useParams();
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  
  const { getProjectsByUser, userProjects, loading: projectsLoading } = projectContext;
  const { user: authUser, loading: authLoading } = authContext;
  
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${id}`);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
    getProjectsByUser(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || authLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md mb-6">Profile not found</div>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Developers
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-indigo-600 h-48 flex items-center justify-center">
          <img 
            src={profile.profilePicture || '/images/default-avatar.svg'} 
            alt={profile.name} 
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
        
        <div className="p-8 -mt-16 pt-24 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
          
          {profile.location && (
            <p className="text-gray-600 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </p>
          )}
          
          {profile.bio && (
            <div className="mb-6">
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}
          
          {authUser && authUser._id === profile._id && (
            <div className="mb-6">
              <Link 
                to="/edit-profile" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Edit Profile
              </Link>
            </div>
          )}
          
          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {profile.socialLinks && Object.values(profile.socialLinks).some(link => link) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Connect</h2>
              <div className="flex justify-center space-x-4">
                {profile.socialLinks.github && (
                  <a 
                    href={profile.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a 
                    href={profile.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {profile.socialLinks.portfolio && (
                  <a 
                    href={profile.socialLinks.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
        
        {projectsLoading ? (
          <Spinner />
        ) : userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map(project => (
              <div 
                key={project._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img 
                  src={project.image || '/images/default-project.jpg'} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </p>
                  
                  {project.tags && project.tags.length > 0 && (
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
                  )}
                  
                  <Link 
                    to={`/project/${project._id}`} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">
            This user hasn't created any projects yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;