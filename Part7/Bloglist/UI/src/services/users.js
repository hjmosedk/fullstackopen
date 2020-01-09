import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const resonse = await axios.get(baseUrl);
  return resonse.data;
};

export default { getAll };
