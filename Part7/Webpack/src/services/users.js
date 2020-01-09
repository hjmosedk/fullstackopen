import axios from 'axios';
const baseUrl = BACKEND_URL + '/api/users';

const getAll = async () => {
  const resonse = await axios.get(baseUrl);
  return resonse.data;
};

export default { getAll };
