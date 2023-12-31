import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const userManagementApi = axios.create({
    baseURL: VITE_API_URL
});

userManagementApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return config;
});

export default userManagementApi;