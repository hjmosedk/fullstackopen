import blogServices from '../services/blogs';
export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll();
    dispatch({ type: 'INIT_BLOGS', data: blogs });
  };
};

export const createBlog = content => {
  return async dispatch => {
    const newblog = await blogServices.create(content);
    dispatch({ type: 'NEW_BLOG', data: newblog });
  };
};

export const removeBlog = id => {
  return async dispatch => {
    const response = await blogServices.remove(id);
    dispatch({ type: 'DELETE', data: id });
  };
};

export const addLikes = (blog, id) => {
  return async dispatch => {
    const newBlog = await blogServices.update(blog, id);
    dispatch({ type: 'LIKES', data: newBlog });
  };
};

export const addComment = (id, comment) => {
  return async dispatch => {
    const newComments = await blogServices.addComment(id, comment);
    dispatch({ type: 'COMMENT', data: newComments });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKES':
      return state.map(blog => {
        return blog.id === action.data.id ? action.data : blog;
      });
    case 'DELETE':
      return state.filter(blog => {
        return blog.id !== action.data;
      });
    case 'COMMENT':
      return state.map(blog => {
        return blog.id === action.data.id ? action.data : blog;
      });
    default:
      return state;
  }
};

export default blogReducer;
