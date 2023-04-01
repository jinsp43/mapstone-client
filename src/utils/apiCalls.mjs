import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const LOGIN = (userData) =>
  axios.post(`${baseURL}/users/login`, userData);

export const SIGNUP = (newUser) =>
  axios.post(`${baseURL}/users/signup`, newUser);