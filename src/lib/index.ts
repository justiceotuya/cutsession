import axios from 'axios';
import { API_URL } from '../../config';
import AbstractView from '../views/AbstractView';

const axiosInstance = axios.create({
    baseURL: API_URL,
})

axiosInstance.defaults.headers.common['Prefer'] = 'code=200, dynamic=true'

export default axiosInstance
