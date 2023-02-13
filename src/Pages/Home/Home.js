import React, { useContext, useEffect } from 'react'
import Filter from '../../components/Filter/Filter'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import UserDashboard from '../../components/UserDashboard/UserDashboard'
import AuthContext from '../../context/AuthContext'




function Home() {

  let {custuser} = useContext(AuthContext)

  
  useEffect(()=>{

    console.log("test user >")
    console.log(custuser)
    // console.log("user")
    // console.log(testuser)
  },[custuser])

  return (
    <div className='w-full home'>
   
   <Header></Header>
{custuser ? <UserDashboard/>:"" }

   <Filter ></Filter>

   <Footer>
    
   </Footer>
   

   
   

    </div>
  )
}

export default Home