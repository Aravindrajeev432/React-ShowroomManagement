import axios from 'axios'

// const baseURL = 'http://127.0.0.1:8000'
const baseURL = 'http://18.222.144.63'

const  axios_instance = axios.create({
    baseURL,
    
});

export default axios_instance