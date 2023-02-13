import React, {useContext, useEffect, useState} from 'react'
import {FaUserTie} from 'react-icons/fa'
import AuthContext from '../../../context/AuthContext';
import Popup from 'reactjs-popup';
import useAuthAxios from '../../../utils/useAuthAxios';

import {SpinnerCircularSplit} from 'spinners-react';

import Swal from 'sweetalert2'

function Employee() {

    const [spinnerloading, setSpinnerloading] = useState(true)
    const [modalopen,setModalopen] = useState(null)

   


    let authApi = useAuthAxios()
    const [empdata, setEmpdata] = useState([])

    const [nextpage, setNextpage] = useState("")
    const [prevpage,setPrevpage] = useState("")
    // error message for phone_number
    const [errormsg, setErrormsg] = useState(null)
    // error message for username
    const [errormsgusername,setErrormsgusername] = useState("")
    const [errormsgemail,setErrormsgemail] = useState("")
    let {user} = useContext(AuthContext)


    const [pagenumber, setPagenumber] = useState(1)
    useEffect(() => {


// const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
// toast.promise(functionThatReturnPromise,{
//       pending: 'Promise is pending',
//       success: 'Promise resolved 👌',
//       error: 'Promise rejected 🤯'
//     })
            console.log("in useEffect")
        getEmployees(pagenumber)
        // console.log(user)
    }, [pagenumber])


    async function getEmployees(page) {
        
        await authApi.get(`/manager/get-employees?page=${page}`).then((res) => {

            setEmpdata(res.data.results)
            
            setNextpage(res.data.next)
            setPrevpage(res.data.previous)
            setSpinnerloading(false)


        }).catch((err) => {
            console.log("axios error line 35 >")
            console.log(err)
        })
    }


    const MakeEmployee = async (e) => {
        e.preventDefault()
        let username = e.target.username.value.replaceAll(" ","")
        let email = e.target.email.value.replaceAll(" ","")
        let phone_number = e.target.phone_number.value.replaceAll(" ","")
        console.log(username, email)
        let valid = true
        if(username==="")
        {
            console.log("Please username")
            setErrormsgusername("Invalid username")
            valid = false
        }
        if(email===""){
            console.log("Please password")
            setErrormsgemail("Invalid email")
            valid= false
        }
        if(phone_number===""){
            setErrormsg("Please phone number")
            valid= false
        }
        

        if(valid){
        await authApi.post("http://127.0.0.1:8000/account/create-employee", {
            "role": e.target.type.value,
            "username": e.target.username.value,
            "email": e.target.email.value,
            "phone_number": e.target.phone_number.value
        }).then((res) => {
            console.log(res.status)
            if (res.status === 201) {
                console.log(res.data)
                setModalopen(false)
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            getEmployees(pagenumber)

        }).catch((error) => {
            console.log(error)
            if (error.statusText==="email already taken"){
                setErrormsgemail('email already taken')
            }
            // setErrormsg("Phone number is already taken")
            

        })
    }
    }


    return (
        <div className='w-full h-screen'>


            <div className='w-full h-16  flex items-center justify-end px-4'>
                <div className=' flex flex-row '>

                    <div className='grid place-items-center text-2xl p-4'>
                        <FaUserTie></FaUserTie>
                    </div>
                    <div className='flex flex-col items-center justify-center'>

                        <span> {
                            user.username
                        } </span>
                        <span className='text-sm text-slate-400'>

                            Manager


                        </span>
                    </div>
                </div>
            </div>

            <div>

                <Popup open={modalopen} position="topleft" trigger={<button className='border-2 border-white text-white bg-myblue-600 rounded-lg sm:px-6 sm:py-4 px-4 py-3 '>
                    <span className='flex flex-row items-center'>Add An Employee</span></button>
                    } modal>


    
    { close=>(<div className='bg-myblue-600  p-5'>
                            <div className=' w-full flex justify-end'>
                                <button className="close text-2xl text-white right-0"
                                    onClick={
                                        () => {
                                            setErrormsg("")
                                            setErrormsgemail("")
                                            setErrormsgusername("")
                                            close()
                                        }
                                }>
                                    &times;
                                </button>
                            </div>

                            <h1 className='text-white text-center'>Add an Emloyee</h1>

                            <div className='flex flex-col'>

                                <form onSubmit={MakeEmployee}>


                                    <div className='p-2'>
                                        <span className='text-white'>Employee Type :</span>
                                        <span>
                                            <select className='h-11 p-2' name="type">
                                                <option value="Advisor">Advisor</option>
                                                <option value="Mechanic">Mechanic</option>
                                                <option value="Front_desk ">Front Desk Executive</option>
                                            </select>
                                        </span>
                                    </div>
                                    <div className='p-2'>

                                        <input name="username" className='w-full h-11 p-2' placeholder='Username' required></input>

                                    </div>
                                    {
                                        errormsgusername ? <span className='text-red-500 text-sm'>
                                            {errormsgusername}</span> : ""
                                    }
                                    <div className='p-2'>
                                        <input name="phone_number" type="number" className='w-full h-11 p-2' placeholder='Phone number' required></input>


                                    </div>
                               
                                        {
                                        errormsg ? <span className='text-red-500 text-sm'>
                                            {errormsg}</span> : ""
                                    } 
                                  

                                    <div className='p-2'>
                                        <input name="email" className='w-full h-11 p-2' placeholder='email' required></input>
                                    </div>
                                    {
                                        errormsgemail ? <span className='text-red-500 text-sm'>
                                            {errormsgemail}</span> : ""
                                    }
                                    <div className='p-2'>
                                        <span className='text-white'>The Default password is "username+123"</span>

                                    </div>
                                    <div className=' grid place-items-center p-2'>
                                        <button type='submit' className='py-3 border-white border-2'>
                                            <span className='mx-8 text-white'>Submit</span>
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>)
                } 
                </Popup>


            </div>
            <div className='w-full p-4'>



            <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
            Username
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope='col' className='py-3 px-6'>
                Role
              </th>
            </tr>
          </thead>

          <tbody>
          {
                        empdata.map((data, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6">{
                                        index + 1
                                    }</td>
                                    <td className="py-4 px-6">{
                                        data.username
                                    }</td>
                                    <td className="py-4 px-6">{
                                        data.email
                                    }</td>
                                    <td className="py-4 px-6">
                                    {data.phone_number}
                                    </td>
                                    <td className="py-4 px-6">
                                       {data.role}
                                    </td>

                                </tr>
                            )
                        })
                    } 

           
            
          </tbody>
        </table>
      </div>







                <div className='w-full flex justify-end'>
                    <span 
                    onClick={
                        () => {
                            setPagenumber(pagenumber -1 )
                        }
                    }
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium ${prevpage ? "text-gray-500":"text-gray-200 pointer-events-none"} bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}>Previous
                    </span>
                    <span onClick={
                            () => {
                                setPagenumber(pagenumber + 1)
                            }
                        } className={`inline-flex items-center px-4 py-2 text-sm font-medium ${nextpage ? "text-gray-500":"text-gray-200 pointer-events-none"} bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer `}>
                        Next
                    </span>
               </div>
               <div className='w-full flex justify-end'>
 
            </div>




                <Popup open={spinnerloading}>
                    <div className="modal p-5">
                        <SpinnerCircularSplit size="200px" color="#ffffff"/>
                    </div>
                </Popup>
            </div>

        </div>
    )
}

export default Employee
