import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { FaHome} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {GiHomeGarage} from 'react-icons/gi';
import {GiAutoRepair} from 'react-icons/gi';
import { RiLogoutBoxFill } from "react-icons/ri";
function Sidenav(){
let {logout} = useContext(AuthContext);

return (
    <div className="w-full h-full bg-myblue-600 p-4 z-10">
    <div className=" text-white w-full h-full flex  flex-col">
<NavLink 
to='dashboard'
className="hover:bg-[#194496] duration-300 hover:text-white"
>
<div className="   flex lg:flex-row flex-col items-center w-full font-bold    my-4 px-6 py-4">
            {/* hover:bg-[#194496] */}
            <span className="text-4xl ">
              <FaHome></FaHome>
            </span>

            <span className="ml-4 text-xl ">Dashboard</span>
          </div>

</NavLink>


<NavLink 
to='bay'
className="hover:bg-[#194496] duration-300 hover:text-white"
>
<div className="   flex lg:flex-row flex-col items-center w-full font-bold    my-4 px-6 py-4">
            {/* hover:bg-[#194496] */}
            <span className="text-4xl ">
              <GiHomeGarage></GiHomeGarage>
            </span>

            <span className="ml-4 text-xl ">BAY</span>
          </div>

</NavLink>


<NavLink 
to='my-job'
className="hover:bg-[#194496] duration-300 hover:text-white"
>
<div className="   flex lg:flex-row flex-col items-center w-full font-bold    my-4 px-6 py-4">
            {/* hover:bg-[#194496] */}
            <span className="text-4xl ">
              <GiAutoRepair></GiAutoRepair>
            </span>

            <span className="ml-4 text-xl ">Current Job</span>
          </div>

</NavLink>
<div
          onClick={logout}
          className="flex flex-row items-center cursor-pointer w-full font-bold  hover:bg-[#194496] duration-300 my-4 px-6 py-4"
        >
          <span className="text-4xl ">
            <RiLogoutBoxFill></RiLogoutBoxFill>
          </span>

          <span className="ml-4 text-xl">Logout</span>
        </div>

        </div>
        </div>
)
}
export default Sidenav;