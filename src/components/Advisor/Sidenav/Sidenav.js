import React, { useContext } from "react";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import {MdFactCheck} from "react-icons/md";
import {GrDocumentConfig} from 'react-icons/gr';
import { RiLogoutBoxFill } from "react-icons/ri";
import {GiAutoRepair} from 'react-icons/gi'
import {CgFolderAdd} from 'react-icons/cg'
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

function Sidenav() {
  let { logout } = useContext(AuthContext);
  return (
    <div className="w-full h-full bg-myblue-600 p-4 z-10">
      <div className=" text-white w-full h-full flex  flex-col">
        <NavLink
          to="dashboard"
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

        <NavLink to="jobs">
          <div className="flex lg:flex-row flex-col items-center w-full font-bold  hover:bg-[#194496] duration-300 my-4 px-6 py-4">
            <span className="text-4xl ">
              <MdNoteAlt></MdNoteAlt>
            </span>
            <span className="ml-4 text-xl ">Current Job</span>
          </div>
        </NavLink>

        <NavLink
          to="pda"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex lg:flex-row flex-col justify-center items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
             <MdFactCheck/>
            </span>
            <span className="lg:ml-4 text-xl">PDA</span>
          </div>
        </NavLink>
        <NavLink
          to="parts"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="flex lg:flex-row flex-col justify-center items-center w-full font-bold   my-4 px-6 py-4">
            <span className="text-4xl ">
            <GiAutoRepair/>
            </span>
            <span className="lg:ml-4 text-xl">Parts</span>
          </div>
        </NavLink>




        
        <NavLink
          to="service-config"
          className="hover:bg-[#194496] duration-300 hover:text-white"
        >
          <div className="   flex lg:flex-row flex-col items-center w-full font-bold    my-4 px-6 py-4">
            {/* hover:bg-[#194496] */}
            <span className="text-4xl ">
             {/* <GrDocumentConfig/> */}
             <CgFolderAdd/>
            </span>

            <span className="ml-4 text-xl ">Service Config</span>
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
