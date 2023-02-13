import React from 'react'
import {FaUserTie} from 'react-icons/fa'
function StaffHeader(props) {
  return (
    <div className='w-full h-16  flex items-center justify-end px-4 border-b-2'>
    <div className=' flex flex-row '>
    
    <div className='grid place-items-center text-2xl p-4'>
    <FaUserTie>
    
    </FaUserTie>
    </div>
    <div className='flex flex-col items-center justify-center'>
    
    <span>
    {props.user.username}
    </span>  
     <span className='text-sm text-slate-400'>
     
      
    {props.user.role}
        
        </span>
    </div>
    </div>
        </div>

  )
}

export default StaffHeader