import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Advisor/Dashboard/Dashboard";
import Jobs from "../../components/Advisor/Jobs/Jobs";
import Parts from "../../components/Advisor/Parts/Parts";
import Pda from "../../components/Advisor/PDA/Pda";
import SericeConfig from "../../components/Advisor/SericeConfig/SericeConfig";
import AdvisorPage from "../../Pages/Advisor/AdvisorPage";
import PrivateRouteAdvisor from "../Privateroutes/PrivateRouteAdivisor";

function RouteAdvisor() {
  return (
    <Routes>
      <Route element={<PrivateRouteAdvisor />}>
        <Route path="/advisor" element={<AdvisorPage />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="jobs" element={<Jobs/>}></Route>
          <Route path="pda" element={<Pda />}>
            
          </Route>
          <Route path="parts" element={<Parts/>}>
            
          </Route>
          <Route path="service-config" element={<SericeConfig />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default RouteAdvisor;
