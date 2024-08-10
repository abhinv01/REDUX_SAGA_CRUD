import axios from "axios";

const { REACT_APP_PROD_URL, REACT_APP_DEV_URL } = process.env;
// const URL =
//   process.env.NODE_ENV === "production"
//     ? REACT_APP_PROD_URL
//     : REACT_APP_DEV_URL;
const URL = "https://saga-server-3.onrender.com/users";

export const loadUsersApi = async () => {
  return await axios.get(URL);
};

export const createUserApi = async (user) => {
  return await axios.post(URL, user);
};

export const deleteUserApi = async (userId) => {
  return await axios.delete(`${URL}/${userId}`);
};

export const updateUserApi = async (userId, userInfo) => {
  return await axios.put(`${URL}/${userId}`, userInfo);
};

export const loadSingleUserApi = async (userId) => {
  return await axios.get(`${URL}/${userId}`);
};

export const SearchUserApi = async (query) => {
  return await axios.get(`${URL}?q=${query}`);
};

export const filterUserApi = async (value) => {
  return await axios.get(`${URL}?status=${value}`);
};

export const sortUserApi = async (value) => {
  return await axios.get(`${URL}?_sort=${value}&_order=asc`);
};
