import axios from 'axios';
import queryString from 'query-string';
import constants from '../constants';
import { getToken } from './token';

const axiosClient = axios.create({
    baseURL: constants.URL_API,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
