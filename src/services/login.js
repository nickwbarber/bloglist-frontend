import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  return axios.post(baseUrl, credentials);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
