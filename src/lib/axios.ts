import Axios, { AxiosRequestConfig } from "axios";

export type AxiosResponse = {
  message: string;
  error: string | null;
  data?: any;
};

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return error.response.data;
  }
);

axios.interceptors.request.use((req: AxiosRequestConfig) => {
  req!.headers!.authorization = process.env.API_ACCESS_TOKEN!;
  return req;
});

export default axios;
