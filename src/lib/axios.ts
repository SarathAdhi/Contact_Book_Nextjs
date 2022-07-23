import Axios from "axios";

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

export default axios;
