import jwt_decode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { redirect } from "react-router-dom";


const baseURL = 'http://18.222.144.63'
// const baseURL = 'http://127.0.0.1:8000'
const useCustAuthAxios=() => {

    const {custauthTokens,setCustuser,setCustauthTokens,logout} = useContext(AuthContext)

    const auth_axios_instance = axios.create({
        baseURL,
        headers: {
    
            Authorization: `Bearer ${custauthTokens?.access}`
        }
    });
    auth_axios_instance.interceptors.request.use(async req => {
        console.log("intreseptor ran")

        const user = jwt_decode(custauthTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        console.log("isExpired: ", isExpired)
        if (! isExpired) {
            console.log(custauthTokens.access)
            console.log("valid token")
            return req
        }
    
        console.log("invalid token")
        console.log(" old refresh")
        console.log(custauthTokens.refresh)
        await axios.post(`${baseURL}/account/api/token/refresh/`, {'refresh': custauthTokens.refresh}).then((response) => {
            console.log("new access token", response.data.access)
            console.log("success full refresh")
            console.log(response.data)
            localStorage.setItem('custauthTokens', JSON.stringify(response.data));
            console.log("responce 43")
            
            setCustuser(jwt_decode(response.data.access))
            setCustauthTokens(response.data)
            console.log("req acces token",response.data.access)
            req.headers.Authorization = `Bearer ${response.data.access}`
        }).catch((err) => {
            console.log("useCustauthaxios catch")
            logout()
            redirect("/")
        })
    
    
        return req
    })



    return auth_axios_instance
}

export default useCustAuthAxios;