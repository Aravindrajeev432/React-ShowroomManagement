import React from "react";
import { Route, Routes } from "react-router-dom";
import Bay from "../../components/Mechanic/Bay/Bay";
import Dashboard from "../../components/Mechanic/Dashboard/Dashboard";
import MyJobs from "../../components/Mechanic/MyJobs/MyJobs";
import MechanicPage from "../../Pages/Mechanic/MechanicPage";
import PrivateRouteMechanic from "../Privateroutes/PrivateRouteMechanic";

function RouteMechanic() {
  return (
    <Routes>
      {/* privateroute */}
      <Route element={<PrivateRouteMechanic />}>
        <Route path="/mechanic" element={<MechanicPage/>}>
            <Route path='dashboard' element={<Dashboard/>}></Route>
            <Route path='bay' element={<Bay/>}></Route>
            <Route path='my-job' element={<MyJobs/>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default RouteMechanic;
