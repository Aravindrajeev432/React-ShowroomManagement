import { Outlet,Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const PrivateRouteMechanic = () => {
  let { user } = useContext(AuthContext);
  let mechanic = user?.role === "MECHANIC" ? true : false;

  return mechanic ? <Outlet /> : <Navigate to="/access-denied" />;
};

export default PrivateRouteMechanic;
