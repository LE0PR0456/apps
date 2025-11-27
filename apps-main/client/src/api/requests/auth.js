import axios from "@/api/axios.js";

export const signupRequest = async (user) => {
  return axios.post(`/auth/signup`, user);
};

export const signinRequest = async (user) => {
  return axios.post("/auth/signin", user);
};