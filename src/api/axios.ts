import axios from 'axios';
import getEnv from '@/lib/envConfig';

const axiosInstance = axios.create({ baseURL: getEnv('VITE_APP_BASE_API') });

export default axiosInstance;
