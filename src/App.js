import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "animate.css";
import Manger from "./Pages/Manager/Manger";
import Dashboard from "./components/Manager/Dashboard/Dashboard";
import Employee from "./components/Manager/Employee/Employee";
import Stafflogin from "./Pages/StaffLogin/Stafflogin";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutesManger from "./utils/PrivateRoutesManger";
import Restricted from "./components/Restricted/Restricted";

import RouteAdvisor from "./utils/Routes/RouteAdvisor";

import RouteStaffLogin from "./utils/Routes/RouteStaffLogin";
import RouteFrontDesk from "./utils/Routes/RouteFrontDesk";
import RouteMechanic from "./utils/Routes/RouteMechanic";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            {/* <Route path="/?model_name=&type=" element={<Home></Home>}></Route> */}
          </Routes>

          <Routes>
            <Route path="/access-denied" element={<Restricted />}></Route>
          </Routes>

          <Routes>
            <Route element={<RouteStaffLogin/>}>

            <Route path="/stafflogin" element={<Stafflogin />}></Route>
            </Route>
            <Route element={<PrivateRoutesManger />}>
              <Route path="/manager" element={<Manger />}>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="employee" element={<Employee />}></Route>
              </Route>
            </Route>
         
          </Routes>
          <RouteFrontDesk/>
          <RouteAdvisor />
          <RouteMechanic/>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
