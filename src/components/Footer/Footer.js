import React from 'react'
import {FaFacebookF,FaTwitter,FaYoutube,FaInstagram,FaTumblr} from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div  className='w-full h-80 bg-myblue-400 p-4'>
        
        <div className='w-full h-9 flex flex-row justify-center' >
            <div className='w-11 text-white text-xl grid place-items-center'>
                <FaFacebookF>

                </FaFacebookF>

            </div>
            <div className='w-11 text-white text-xl grid place-items-center'>
<FaTwitter></FaTwitter>
            </div>
            <div className='w-11 text-white text-xl grid place-items-center'>
                <FaYoutube></FaYoutube>
            </div>
            <div className='w-11 text-white text-xl grid place-items-center'>
                <FaInstagram></FaInstagram>
            </div>
            <div className='w-11 text-white text-xl grid place-items-center'>
                <FaTumblr></FaTumblr>
            </div>
        </div>


<div className='w-full grid place-items-center'>
    <div className='bg-[#194496] h-60 w-full grid grid-cols-1 md:grid-cols-2 justify-items-center'>
        <div className=' h-full'>
            <Link to="stafflogin">
            <span className='text-white underline'>Staff Login</span>
            </Link>
            <div>
                <span className='text-white text-sm'>
                The above login option is restricted
                for customers
                </span>
                
            </div>

        </div>
        <div className='h-full'>
            <div>
                <span className='text-white'>Reach Us</span>
            </div>
            </div>

    </div>
    <div>
        <span className='text-white'>
        © 2023 Copyright: MyShowroom.com
        </span>

    </div>

</div>



    </div>
  )
}

export default Footer