import axios from 'axios';
const baseUrl = BACKEND_URL + '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog, id) => {
  const updateUrl = baseUrl + `/${id}`;
  const config = { headers: { Authorization: token } };
  const response = await axios.put(updateUrl, updatedBlog, config);
  return response.data;
};

const remove = async id => {
  const deleteUrl = baseUrl + `/${id}`;
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(deleteUrl, config);
  return response.status;
};

const addComment = async (id, comment) => {
  const commentUrl = baseUrl + `/${id}/comments`;
  const response = await axios.post(commentUrl, comment);
  return response.data;
};

export default { getAll, setToken, create, update, remove, addComment };
