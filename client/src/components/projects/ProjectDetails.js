import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProjectContext from '../../context/project/ProjectContext';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../layout/Spinner';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  
  const { project, loading, getProjectById, deleteProject, getComments, comments, addComment, deleteComment } = projectContext;
  const { user, isAuthenticated } = authContext;
  
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    getProjectById(id);
    getComments(id);
    // eslint-disable-next-line
  }, [id]);

  const onDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      navigate('/dashboard');
    }
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return;
    
    try {
      await addComment(id, commentText);
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const onDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentId);
    }
  };

  if (loading || !project) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={project.image || '/images/default-project.jpg'} 
          alt={project.title} 
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{project.title}</h1>
            
            {isAuthenticated && user && project.user && user._id === project.user._id && (
              <div className="flex space-x-4">
                <Link 
                  to={`/edit-project/${project._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Edit Project
                </Link>
                <button 
                  onClick={onDeleteProject}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Delete Project
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags && project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          </div>
          
          {project.links && (Object.keys(project.links).some(key => project.links[key])) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Links</h2>
              <div className="flex flex-wrap gap-4">
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Developer</h2>
            <div className="flex items-center">
              <img 
                src={project.user?.profilePicture || '/images/default-avatar.svg'} 
                alt={project.user?.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="font-semibold">{project.user?.name}</h3>
                <Link 
                  to={`/profile/${project.user?._id}`}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
        
        {isAuthenticated ? (
          <form onSubmit={onSubmitComment} className="mb-8">
            <div className="mb-4">
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="bg-gray-100 p-4 rounded-md mb-8">
            <p className="text-gray-700">
              Please <Link to="/login" className="text-indigo-600 hover:text-indigo-800">log in</Link> to add a comment.
            </p>
          </div>
        )}
        
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment._id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <img 
                      src={comment.user?.profilePicture || '/images/default-avatar.svg'} 
                      alt={comment.user?.name} 
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{comment.user?.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {isAuthenticated && user && comment.user && user._id === comment.user._id && (
                    <button 
                      onClick={() => onDeleteComment(comment._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;