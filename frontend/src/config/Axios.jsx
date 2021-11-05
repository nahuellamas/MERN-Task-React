import Axios from 'axios';

const clientAxios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clientAxios;