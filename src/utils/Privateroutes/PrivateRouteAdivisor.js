import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const PrivateRouteAdvisor = () => {
  let { user } = useContext(AuthContext);
  let advisor = user?.role === "ADVISOR" ? true : false;

  return advisor ? <Outlet /> : <Navigate to="/access-denied" />;
};

export default PrivateRouteAdvisor;
