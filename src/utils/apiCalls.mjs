import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const LOGIN = (userData) =>
  axios.post(`${baseURL}/users/login`, userData);

export const SIGNUP = (newUser) =>
  axios.post(`${baseURL}/users/signup`, newUser);

export const GET_PROFILE = (authToken) =>
  axios.get(`${baseURL}/users/profile`, {
    headers: {
      authorisation: `Bearer ${authToken}`,
    },
  });

export const GET_GROUPS = (authToken) =>
  axios.get(`${baseURL}/groups`, {
    headers: {
      authorisation: `Bearer ${authToken}`,
    },
  });

export const NEW_GROUP = (newGroup, authToken) =>
  axios.post(`${baseURL}/groups`, newGroup, {
    headers: {
      authorisation: `Bearer ${authToken}`,
    },
  });

export const USERS_IN_GROUP = (groupId, authToken) =>
  axios.post(`${baseURL}/groups/users`, groupId, {
    headers: {
      authorisation: `Bearer ${authToken}`,
    },
  });
