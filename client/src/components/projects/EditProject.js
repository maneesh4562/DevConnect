import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectContext from '../../context/project/ProjectContext';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../layout/Spinner';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const { project, loading, getProjectById, updateProject, clearProject } = projectContext;
  const { setAlert } = alertContext;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    links: {
      github: '',
      demo: ''
    }
  });

  useEffect(() => {
    getProjectById(id);

    return () => clearProject();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        tags: project.tags ? project.tags.join(', ') : '',
        links: {
          github: project.links?.github || '',
          demo: project.links?.demo || ''
        }
      });
    }
  }, [project]);

  const { title, description, image, tags, links } = formData;

  const onChange = (e) => {
    if (e.target.name === 'github' || e.target.name === 'demo') {
      setFormData({
        ...formData,
        links: {
          ...links,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      setAlert('Please fill in all required fields', 'error');
      return;
    }

    // Convert tags string to array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      const projectData = {
        ...formData,
        tags: tagsArray
      };

      await updateProject(id, projectData);
      setAlert('Project updated successfully', 'success');
      navigate(`/project/${id}`);
    } catch (err) {
      setAlert('Failed to update project', 'error');
    }
  };

  if (loading || !project) {
    return <Spinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Project</h1>
      
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Project Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your project in detail"
            rows="6"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image URL for your project"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to use default image. For best results, use a 16:9 aspect ratio image.
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="React, Node.js, MongoDB, etc. (comma separated)"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="github" className="block text-gray-700 font-medium mb-2">
            GitHub Repository URL
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={links.github}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="demo" className="block text-gray-700 font-medium mb-2">
            Live Demo URL
          </label>
          <input
            type="url"
            id="demo"
            name="demo"
            value={links.demo}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://your-demo-site.com"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/project/${id}`)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;