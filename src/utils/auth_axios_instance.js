import axios from 'axios'
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = 'http://127.0.0.1:8000'
let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

console.log("auth axios instance  authTokens >")
console.log(authTokens)
const auth_axios_instance = axios.create({
    baseURL,
    headers: {

        Authorization: `Bearer ${authTokens?.access}`
    }
})
auth_axios_instance.interceptors.request.use(async req => {
    console.log("intreseptor ran")
    if (! authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${
            authTokens?.access
        }`
    }
    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("isExpired: ", isExpired)
    if (! isExpired) {
        console.log(authTokens.access)
        console.log("valid token")
        return req
    }

    console.log("invalid token")
    console.log(authTokens.refresh)
    await axios.post(`${baseURL}/account/api/token/refresh/`, {'refresh': authTokens.refresh}).then((response) => {
        console.log("new refresh token", response.data.access)
        console.log("success full refresh")
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        authTokens= response.data
        req.headers.Authorization = `Bearer ${
            response.data.access
        }`
    }).catch((err) => {})


    return req
})

export default auth_axios_instance;
