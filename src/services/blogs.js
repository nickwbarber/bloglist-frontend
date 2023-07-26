import axios from 'axios';

const serverUrl = 'http://localhost:3003';
const blogsEndpoint = `${serverUrl}/api/blogs`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(blogsEndpoint, newBlog, config);
  return response;
};

const getAll = async () => {
  const response = await axios.get(blogsEndpoint);
  return response;
};

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${blogsEndpoint}/${id}`, newBlog, config);
  return response;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${blogsEndpoint}/delete/${id}`, config);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, setToken, create, update, remove,
};
