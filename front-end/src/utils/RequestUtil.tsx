import axios from 'axios';

export const axioClient = axios.create({
    timeout: 0,
});