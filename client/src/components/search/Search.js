import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], projects: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await axios.get(`/api/search?q=${searchQuery}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error('Search error:', err.message);
      setSearchResults({ users: [], projects: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Search Developers & Projects</h1>
      
      <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for developers, skills, projects, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input flex-grow rounded-r-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <Spinner />
      ) : searched ? (
        <div>
          {searchResults.users.length === 0 && searchResults.projects.length === 0 ? (
            <p className="text-center text-gray-600 my-8">No results found for "{searchQuery}"</p>
          ) : (
            <div>
              {/* Users Results */}
              {searchResults.users.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 border-b pb-2">Developers ({searchResults.users.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.users.map(user => (
                      <div key={user._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <img
                              src={user.profilePicture || '/default-avatar.png'}
                              alt={user.name}
                              className="w-16 h-16 rounded-full mr-4 object-cover"
                            />
                            <div>
                              <h3 className="text-xl font-bold">{user.name}</h3>
                              <p className="text-gray-600">{user.location || 'No location specified'}</p>
                            </div>
                          </div>
                          
                          {user.skills && user.skills.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <Link
                            to={`/profile/${user._id}`}
                            className="block text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Results */}
              {searchResults.projects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 border-b pb-2">Projects ({searchResults.projects.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.projects.map(project => (
                      <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                        <img
                          src={project.image || '/default-project.jpg'}
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
                                  className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={project.user.profilePicture || '/default-avatar.png'}
                                alt={project.user.name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <span className="text-sm text-gray-600">{project.user.name}</span>
                            </div>
                            
                            <Link
                              to={`/project/${project._id}`}
                              className="text-indigo-600 font-medium hover:text-indigo-800"
                            >
                              View Project →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;