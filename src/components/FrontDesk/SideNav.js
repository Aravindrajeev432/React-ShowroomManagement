import React, { useContext } from "react";
import { FaHome, FaUsersCog, FaCarCrash, FaCarAlt } from "react-icons/fa";
import { MdNoteAlt,MdAddToQueue } from "react-icons/md";


import { RiLogoutBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Sidenav() {
  let { logout } = useContext(AuthContext);
  return (
    <div className="w-full h-full bg-myblue-600 p-4">
      <div className=" text-white w-full h-full flex  flex-col">
        <NavLink
          to="/front-desk/dashboard"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="   flex flex-row items-center w-full font-bold    my-4 px-6 py-4">
            {/* hover:bg-[#194496] */}
            <span className="text-4xl ">
              <FaHome></FaHome>
            </span>

            <span className="ml-4 text-xl">Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/front-desk/availability"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex flex-row justify-center items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
              <FaCarAlt></FaCarAlt>
            </span>
            <span className="ml-4 text-xl hidden lg:block">Availability</span>
          </div>
        </NavLink>

        <NavLink
          to="/front-desk/requests"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex flex-row justify-start items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
              <FaCarCrash></FaCarCrash>
            </span>
            <span className="ml-4 text-xl hidden lg:block">
              Repair Requests
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/front-desk/carshowcase"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex flex-row justify-start items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
              <MdAddToQueue/>
            </span>
            <span className="ml-4 text-xl hidden lg:block">Manage</span>
          </div>
        </NavLink>

        <NavLink to="/front-desk/services">
          <div className="flex flex-row items-center w-full font-bold  hover:bg-[#194496] duration-300 my-4 px-6 py-4">
            <span className="text-4xl ">
              <MdNoteAlt></MdNoteAlt>
            </span>
            <span className="ml-4 text-xl">Service Requests</span>
          </div>
        </NavLink>

        <NavLink
          to="/front-desk/customers"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex flex-row justify-start items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
              <FaUsersCog></FaUsersCog>
            </span>
            <span className="ml-4 text-xl hidden lg:block">Customers</span>
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

        <div></div>
      </div>
    </div>
  );
}

export default Sidenav;
