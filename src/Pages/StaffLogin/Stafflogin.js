import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
function Stafflogin() {

    let {userLogin} = useContext(AuthContext)
   let {loginerr} = useContext(AuthContext)
   const {usernameref} = useContext(AuthContext)
   const {passwordref} = useContext(AuthContext)

    return (
        <div className='w-screen h-screen grid place-items-center  p-4'>

            <div className=' w-full md:w-[400px] h-[500px] shadow-lg'>
                <div className='h-10 text-myblue-400 text-2xl flex justify-center after:content-[""] after:w-4/5 after:h-1 relative after:absolute after:bottom-0 after:bg-myblue-400'>Login</div>
                <div className='p-4 w-full '>
                    <form onSubmit={userLogin}>

                        <div className='w-full my-2 '>
                            <input type="text" ref={usernameref} name='username' className='w-full h-16 focus:outline-none border-2 border-white ' placeholder='username'></input>
                        </div>

                        <div className='w-full my-2 '>
                            <input type="password" ref={passwordref}  name='password' className='w-full h-16 focus:outline-none border-2 border-white ' placeholder='Password'></input>
                        </div>
                        <div className='w-full grid '>
                            <button className='border-2 border-white text-white bg-myblue-400 rounded-lg sm:px-6 sm:py-4 px-4 py-2 text-center '>
                                <span className=''>Submit</span>
                            </button>
                        </div>
                    </form>

                </div>
                <div className='w-full text-sm flex justify-center mt-4'>
                    <span>Not a Staff !
                    </span>
                    <Link to="/">
                        <span className='text-myblue-400 ml-1'>
                            Got to Home Page</span>
                    </Link>

                </div>

                <div className=' w-full flex justify-center '>
                    {loginerr ? <span className='mt-4 text-red-500 animate__animated animate__shakeX'>Invalid Login</span>:""}
                </div>
            </div>
        </div>
    )
}

export default Stafflogin
