import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
const PrivateRoutesFrontDesk = () => {
  let { user } = useContext(AuthContext);
  console.log("current user >");
  console.log(user);

  let frontdesk = user?.role === "FRONT-DESK" ? true : false;
  console.log("current user front desk or not");

  return frontdesk ? <Outlet /> : <Navigate to="/access-denied" />;
};
export default PrivateRoutesFrontDesk;
