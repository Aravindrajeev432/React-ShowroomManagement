import React, { useContext } from "react";
import Sidenav from "../../components/FrontDesk/SideNav";

import { Outlet } from "react-router-dom";
import StaffHeader from "../../components/StaffComponants/StaffHeader";
import AuthContext from "../../context/AuthContext";
import Popup from "reactjs-popup";
import { SpinnerCircularSplit } from "spinners-react";
function FrontDeskPage() {
  
  let { user,globalloader} = useContext(AuthContext);
  
  console.log(user)

  return (
    <>
      <div className="w-screen h-screen grid grid-flow-col grid-cols-12">
        <div className="col-span-2">
          <Sidenav></Sidenav>
        </div>
        <div className="col-span-10">
          <StaffHeader user={user}></StaffHeader>
          <Outlet></Outlet>
          <Popup open={globalloader}>
        <div className="modal p-5">
          <SpinnerCircularSplit size="200px" color="#ffffff" />
        </div>
      </Popup>
        </div>
      </div>
    </>
  );
}

export default FrontDeskPage;
