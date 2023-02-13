import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRouteFrontDesk from "../PrivateRouteFrontDesk";
import FrontDeskDashboard from "../../components/FrontDesk/Dashboard/FrontDeskDashboard";

import CarAvailability from "../../components/FrontDesk/CarAvailability/CarAvailability";
import Customers from "../../components/FrontDesk/Customers/Customers";

import FrontDeskPage from "../../Pages/FrontDesk/FrontDeskPage";
import Carshowcase from "../../components/FrontDesk/CarShowcase/Carshowcase";
import Requests from "../../components/FrontDesk/Requests/Requests";
import Services from "../../components/FrontDesk/Services/Services";
function RouteFrontDesk() {
  return (
    <Routes>
      <Route element={<PrivateRouteFrontDesk />}>
        <Route path="/front-desk" element={<FrontDeskPage />}>
          <Route path="dashboard" element={<FrontDeskDashboard />}></Route>
          <Route path="requests" element={<Requests/>}></Route>
          <Route path="services" element={<Services/>}></Route>
          <Route path="carshowcase" element={<Carshowcase />}></Route>
          <Route path="availability" element={<CarAvailability />}></Route>
          <Route path="customers" element={<Customers />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default RouteFrontDesk;
