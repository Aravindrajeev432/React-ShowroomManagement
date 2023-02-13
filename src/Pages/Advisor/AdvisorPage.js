import React, { useContext, useState } from 'react'
import {  Outlet } from 'react-router-dom'
import Sidenav from '../../components/Advisor/Sidenav/Sidenav'

import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai";
import StaffHeader from '../../components/StaffComponants/StaffHeader';
import AuthContext from '../../context/AuthContext';

function AdvisorPage() {
    let {user} =useContext(AuthContext)
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
    </div>
    
    
    
        </div>
    
        
        </>
  )
}

export default AdvisorPage