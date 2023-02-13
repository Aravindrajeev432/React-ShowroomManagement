import React, { useEffect } from 'react'
import Sidenav from '../../components/Manager/Sidenav/Sidenav';

import { Outlet } from 'react-router-dom';


function Manger() {


  
  useEffect(()=>{

  
  },[])




  return (
    <>
    <div className='w-screen h-screen grid grid-flow-col grid-cols-12'>
<div className='col-span-2'>
<Sidenav>
</Sidenav>
</div>
<div className='col-span-10'>

<Outlet ></Outlet>
</div>



    </div>

    
    </>
  )
}

export default Manger