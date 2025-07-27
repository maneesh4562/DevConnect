import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import projectReducer from './projectReducer';

// Create context
const ProjectContext = createContext();

// Provider component
export const ProjectProvider = ({ children }) => {
  const initialState = {
    projects: [],
    project: null,
    userProjects: [],
    comments: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all projects
  const getProjects = async () => {
    try {
      const res = await axios.get('/api/projects');

      dispatch({
        type: 'GET_PROJECTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get project by ID
  const getProjectById = async (id) => {
    try {
      const res = await axios.get(`/api/projects/${id}`);

      dispatch({
        type: 'GET_PROJECT',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get projects by user ID
  const getProjectsByUser = async (userId) => {
    try {
      const res = await axios.get(`/api/projects/user/${userId}`);

      dispatch({
        type: 'GET_USER_PROJECTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Create project
  const createProject = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/projects', formData, config);

      dispatch({
        type: 'CREATE_PROJECT',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
      throw err;
    }
  };

  // Update project
  const updateProject = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/projects/${id}`, formData, config);

      dispatch({
        type: 'UPDATE_PROJECT',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
      throw err;
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);

      dispatch({
        type: 'DELETE_PROJECT',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get comments for a project
  const getComments = async (projectId) => {
    try {
      const res = await axios.get(`/api/projects/${projectId}/comments`);

      dispatch({
        type: 'GET_COMMENTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Add comment to project
  const addComment = async (projectId, text) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/projects/${projectId}/comments`,
        { text },
        config
      );

      dispatch({
        type: 'ADD_COMMENT',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
      throw err;
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);

      dispatch({
        type: 'DELETE_COMMENT',
        payload: commentId
      });
    } catch (err) {
      dispatch({
        type: 'PROJECT_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Clear current project
  const clearProject = () => {
    dispatch({ type: 'CLEAR_PROJECT' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        userProjects: state.userProjects,
        comments: state.comments,
        loading: state.loading,
        error: state.error,
        getProjects,
        getProjectById,
        getProjectsByUser,
        createProject,
        updateProject,
        deleteProject,
        getComments,
        addComment,
        deleteComment,
        clearProject,
        clearErrors
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;