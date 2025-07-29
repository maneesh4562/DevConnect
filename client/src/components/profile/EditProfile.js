import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../layout/Spinner';

const EditProfile = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { user, loading, loadUser } = authContext;
  const { setAlert } = alertContext;

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicture: '',
    skills: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      portfolio: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        skills: user.skills ? user.skills.join(', ') : '',
        location: user.location || '',
        socialLinks: {
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || '',
          portfolio: user.socialLinks?.portfolio || ''
        }
      });
    }
  }, [user]);

  const { name, bio, profilePicture, skills, location, socialLinks } = formData;

  const onChange = (e) => {
    if (e.target.name === 'github' || e.target.name === 'linkedin' || e.target.name === 'portfolio') {
      setFormData({
        ...formData,
        socialLinks: {
          ...socialLinks,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      setAlert('Name is required', 'error');
      return;
    }

    // Convert skills string to array
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

    try {
      const profileData = {
        name,
        bio,
        profilePicture,
        skills: skillsArray,
        location,
        socialLinks
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.post('/api/profile', profileData, config);
      
      setAlert('Profile updated successfully', 'success');
      loadUser(); // Reload user data
      navigate('/dashboard');
    } catch (err) {
      setAlert('Failed to update profile', 'error');
    }
  };

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
      
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about yourself"
            rows="4"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">Max 500 characters</p>
        </div>

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-gray-700 font-medium mb-2">
            Profile Picture URL
          </label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={profilePicture}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="URL to your profile picture"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to use default avatar. For best results, use a square image.
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="City, State, Country"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={skills}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="JavaScript, React, Node.js, etc. (comma separated)"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h3>
          
          <div className="mb-4">
            <label htmlFor="github" className="block text-gray-700 font-medium mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={socialLinks.github}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="linkedin" className="block text-gray-700 font-medium mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={socialLinks.linkedin}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="portfolio" className="block text-gray-700 font-medium mb-2">
              Portfolio URL
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={socialLinks.portfolio}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;