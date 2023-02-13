import jwt_decode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { redirect } from "react-router-dom";



// const baseURL = 'http://127.0.0.1:8000'
const baseURL = 'http://18.222.144.63'
const useAuthAxios=() => {

    const {authTokens,setUser,setAuthTokens,logout} = useContext(AuthContext)

    const auth_axios_instance = axios.create({
        baseURL,
        headers: {
    
            Authorization: `Bearer ${authTokens?.access}`
        }
    });
    auth_axios_instance.interceptors.request.use(async req => {
        console.log("intreseptor ran")

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
            // authTokens= response.data
            setUser(jwt_decode(response.data.access))
            setAuthTokens(response.data)
            req.headers.Authorization = `Bearer ${
                response.data.access
            }`
        }).catch((err) => {
logout()
redirect("/")
        })
    
    
        return req
    })



    return auth_axios_instance
}

export default useAuthAxios;