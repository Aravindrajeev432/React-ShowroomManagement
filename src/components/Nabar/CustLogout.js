import React, { useContext } from 'react'
import Popup from 'reactjs-popup';
import { Button } from '@material-tailwind/react';
import AuthContext from '../../context/AuthContext';


function CustLogout() {
    let {logout} =  useContext(AuthContext)
    
  return (
    <>
        <div  className='h-full h grid place-items-center text-white text-2xl  md:w-16 ' >

{/* <Popup
    trigger={open => (
        <FaUserAlt className='hover:scale-125 duration-300'/>
    )}
    position="right center"
    closeOnDocumentClick
  >
    <span> Popup content </span>
  </Popup> */}

<Popup
    trigger={open => (
      <button className="button text-lg">Logout</button>
    )}
    position="bottom center"
    arrow={true}
    closeOnDocumentClick
    keepTooltipInside=".home"
    on={['hover']}

  >
    <div className='w-64 h-32 bg-white drop-shadow-2xl flex flex-col'>
        <div className='absolute border-l-2 border-t-2 border-gray-400  w-10 h-10 '></div>
        <div className='absolute right-0 border-r-2 border-t-2 border-gray-400 w-10 h-10 '></div>
        <div className='absolute left-0 bottom-0 border-l-2 border-b-2 border-gray-400 w-10 h-10 '></div>
        <div className='absolute right-0 bottom-0 border-r-2 border-b-2 border-gray-400 w-10 h-10 '></div>
        <div className='flex justify-center w-full' >
        <span>Are you Sure?</span>
        </div>
        <div className=' w-full h-full items-center flex justify-center'>
        <Button size='md' className='bg-myblue-600' onClick={logout}>Yes</Button>

        </div>

    </div>
  </Popup>
        </div>
    </>
  )
}

export default CustLogout