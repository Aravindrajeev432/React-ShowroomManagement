import React from 'react'

function Dashboard() {
  // {pending_request: "27", new_service_request: "0", online_advisors: "1"} = $2
  return (
    <div>

      <div className='p-2'>

        <div className='flex flex-col md:flex-row gap-y-4  justify-evenly '>
          <div className='flex flex-col border-2 border-myblue-600 shadow-lg p-2 bg-gray-200 '>
            <div className='text-center text-xl font-sans'>Pendign Request</div>
            <div className='flex justify-center text-2xl'>22</div>

          </div>
          <div className='flex flex-col border-2 border-myblue-600 shadow-lg p-2 bg-gray-200 '>
            <div className='text-center text-xl font-sans'>Pendign Request</div>
            <div className='flex justify-center text-2xl'>22</div>

          </div>
          <div className='flex flex-col border-2 border-myblue-600 shadow-lg p-2 bg-gray-200 '>
            <div className='text-center text-xl font-sans'>Pendign Request</div>
            <div className='flex justify-center text-2xl'>22</div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard