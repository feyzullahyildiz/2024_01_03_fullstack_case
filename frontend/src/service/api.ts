import axios from "axios";
import { TokenService } from "./Token.service";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

export const authenticatedApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

authenticatedApi.interceptors.request.use((value) => {
  value.headers.Authorization = `Bearer ${TokenService.getToken()}`;
  return value;
});
