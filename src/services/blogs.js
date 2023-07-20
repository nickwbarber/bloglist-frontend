import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update };
