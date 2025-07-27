const projectReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case 'GET_PROJECT':
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case 'GET_USER_PROJECTS':
      return {
        ...state,
        userProjects: action.payload,
        loading: false
      };
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        ),
        project: action.payload,
        loading: false
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        ),
        loading: false
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        ),
        loading: false
      };
    case 'PROJECT_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_PROJECT':
      return {
        ...state,
        project: null,
        comments: [],
        loading: false
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default projectReducer;