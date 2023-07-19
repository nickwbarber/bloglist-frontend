import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  return axios.post(baseUrl, credentials);
};

// export default login; // NOTE: does the default export have to be an object?
// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
