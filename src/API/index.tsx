import axios, { AxiosInstance } from 'axios';

const BASE_URL = '/requests';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});
