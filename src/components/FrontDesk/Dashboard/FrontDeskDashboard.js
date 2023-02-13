import React, { useState } from 'react'
import { useEffect } from 'react'
import useAuthAxios from '../../../utils/useAuthAxios'

function FrontDeskDashboard() {

const [data,setData] = useState({})

let authApi = useAuthAxios()

useEffect(()=>{
  getData()

},[])

async function getData(){
await authApi.get('frontdesk/dashboard-data').then((res)=>{
  console.log(res)
  setData(res.data)
}).catch((err)=>{
  console.log(err)
})
}

// {pending_request: "27", new_service_request: "0", online_advisors: "1"} 

  return (
    <div className='p-2'>


<div className='grid grid-cols-3 gap-x-4 p-2'>
  <div className='bg-myblue-600 text-white  h-24 grid grid-rows-2 p-2 shadow-lg'>
    <div className='text-center'>Pending Requests</div>
    <div className='text-5xl grid place-items-center'>{data.pending_request}</div>
  </div>
  <div className='bg-myblue-600 text-white h-24 grid grid-rows-2 p-2 shadow-lg'>
    <div className='text-center'>New Service Requests</div>
    <div className='text-5xl grid place-items-center'>{data.new_service_request}</div>
  </div>
  <div className='bg-myblue-600 text-white h-24 grid grid-rows-2 p-2 shadow-lg'>
    <div className='text-center'>Advisors Online</div>
    <div className='text-5xl grid place-items-center'>{data.online_advisors}</div>
  </div>



</div>
    </div>
  )
}

export default FrontDeskDashboard