import axios from "axios";

const AxiosService = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token)
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default AxiosService