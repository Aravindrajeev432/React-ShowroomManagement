import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import StaffHeader from '../../components/StaffComponants/StaffHeader'
import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai";
import Sidenav from '../../components/Mechanic/Sidenav/Sidenav';
import AuthContext from '../../context/AuthContext';
import Popup from "reactjs-popup";
import Animation from '../../lotties/gears.json';
import Lottie from "react-lottie";
function MechanicPage() {
    let {user,globalloader} =useContext(AuthContext)

    const [sidebaropen,setSidebaropen]= useState(false) 
  return (
    <>
    <div className='w-screen h-screen grid grid-flow-col grid-cols-12'>

    <div className='col-span-12'>
    <div className='absolute flex flex-row h-screen  z-20'>
           {
            sidebaropen?
        
            <Sidenav >

    </Sidenav>:""}
    
    <div className='relative h-11 z-30' >
      {
        sidebaropen ? 
        <AiOutlineClose className='text-5xl text-[#0f2857]' onClick={()=>setSidebaropen(!sidebaropen)}/>
        :
        <AiOutlineMenu className='text-5xl text-[#0f2857]'  onClick={()=>setSidebaropen(!sidebaropen)}/>
      }
        </div>

    </div>
    {
          sidebaropen? <div className='absolute w-screen h-screen bg-[#0000004f] z-10'>

          </div>:<></>
    }

   
     <StaffHeader user={user}></StaffHeader>
    
    <Outlet ></Outlet>


    <Popup open={globalloader} closeOnDocumentClick={false}>
        <div className="modal p-5">
        <GearAnimation/>
        </div>
      </Popup>
    </div>
    
    
    
        </div>
    
        
        </>
  )
}

export default MechanicPage


function GearAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
}