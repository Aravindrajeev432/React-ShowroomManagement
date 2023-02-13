import { Navigate,Outlet } from "react-router-dom"
import React,{useContext} from "react"
import AuthContext from "../context/AuthContext"
const PrivateRoutesManger=()=>{
    let {user} = useContext(AuthContext)
    console.log("current user >")
    console.log(user)

    let manager = user?.role === "MANAGER" ? true : false;
    console.log("current user manger or not")
    console.log(manager)
    return (
        manager ? <Outlet/> :<Navigate to='/access-denied'/>
    )
}
export default PrivateRoutesManger