import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function RouteStaffLogin() {

    
    let {user} = useContext(AuthContext)
    if(user?.role==="FRONT-DESK"){
        return (<Navigate to='front-desk/dashboard'></Navigate>)
    }
    else if(user?.role==="MANAGER"){
        return (<Navigate to='manager/dashboard'></Navigate>)
    }
    else if(user?.role==="ADVISOR"){
        return (<Navigate to='advisor/dashboard'></Navigate>)
    }
    else{
        return (<Outlet/>)
    }

  
}

export default RouteStaffLogin