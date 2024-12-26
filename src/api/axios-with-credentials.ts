import axios from 'axios';
import getEnv from '@/lib/envConfig';

const axiosWithCredentials = axios.create({
  baseURL: getEnv('VITE_APP_BASE_API'),
  withCredentials: true
});

export default axiosWithCredentials;
