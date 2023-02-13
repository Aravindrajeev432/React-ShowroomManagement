import React, { useContext, useEffect, useState,useRef } from 'react'
import Popup from "reactjs-popup";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import {GiGearStickPattern} from 'react-icons/gi';
import {IoWaterOutline} from 'react-icons/io5';
import {TbEngine} from 'react-icons/tb';
import {GiCarSeat} from 'react-icons/gi'

import axios_instance from '../../utils/axios_instance';

import Swal from "sweetalert2";

import { useNavigate , NavLink, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

import {  Navigation } from "swiper";

// Import Swiper styles
import 'swiper/css';
import useAuthAxios from '../../utils/useAuthAxios';
import AuthContext from '../../context/AuthContext';
import useCustAuthAxios from '../../utils/useCustAuthAxios'
function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
}


function Filter(props) {

  let {custuser} = useContext(AuthContext)

  const [user_phone_number,setUser_phone_number] = useState(() =>localStorage.getItem("userphone") ? (localStorage.getItem("userphone")): null);
  const [open, setOpen] = useState(null);
 
  const handleaccordianOpen = (value) => {
    console.log(value)
    setOpen(open === value ? null : value);
  };





  let [filterdata,setFilterdata] = useState([])
  const [model_names, setModel_names] = useState([]);
  const [types, setTypes] = useState([]);
  const [type_filter,setType_filter]=useState([])
  const [gear_type_filter,setGear_type_flter] = useState([])
  const [seat_capacity_filter,setSeat_capacity_filter] = useState([]) 


  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const [model_name, setModel_name] = useState(search.get('param1') || '');
  const [type, setType] = useState(search.get('param2') || '');
  const [gear_type,setGearType] = useState(search.get('gear_type') || '')

 const handleSubmit = async (event) => {
    event.preventDefault();
    // search.set('model_name', model_name);
    search.set('gear_type', gear_type);
    navigate(`?${search.toString()}`);
    await axios_instance.get('cars/getdisplaycars', { params: { gear_type, type } })
      .then((res) => {
        // Handle the response from the server
        console.log(res)
        setFilterdata(res.data)
      });
  };



  let query = useQuery();
  console.log(query.get("model_name"))

  
   

    useEffect(()=>{
     
console.log(custuser)

getCarFilters();
getDisplayCars();

// console.log(filterdata)
    },[])
    // setModel_name_filter(query.get("model_name")? query.get("model_name"):"")/
    async function getDisplayCars(){
      let type = query.get("type") ? query.get("type") : ""
      await axios_instance.get(`cars/getdisplaycars`).then((res)=>{
        console.log(res)
        setFilterdata(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }


    async function getCarFilters() {
      await axios_instance
        .get("cars/get-filter-data")
        .then((res) => {
          console.log(res);
          setType_filter(res.data.gear_types);
          setGear_type_flter(res.data.gear_types)
          setSeat_capacity_filter(res.data.seat_capacity)

        })
        .catch((err) => {
          console.log(err);
        });
    }
  


  return (



<>
{/* Filter tab starts here */}

{/* <div className='w-full   mt-5 mb-5'>
    <div className='  flex flex-wrap justify-center ' >
   
     <div>


        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Type</label>
        <select id="countries" className="bg-myblue-600 text-white p-4 rounded-none" onChange={(e)=>{
          
          console.log(e.target.value)}}>

            {type_filter.map((data,index)=>{
              return(
                <option key={index} value={data}>{data}</option>
              )
            })}
       
        </select>
      </div>

    <div>

    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Gear Type </label>
        <select id="countries" className="bg-myblue-600 text-white p-4 rounded-none" onChange={(event) => setModel_name(event.target.value)}>
          
          <option value="" defaultChecked>Select a value</option>

            {gear_type_filter.map((data,index)=>{
              return(
                <option key={index} value={data} >{data}</option>
              )
            })}
       
        </select>
    </div>
    <div>

    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seat Capacity </label>
        <select id="countries" className="bg-myblue-600 text-white p-4 rounded-none" onChange={(event) => setModel_name(event.target.value)}>
          
          <option value="" defaultChecked>Select a value</option>

            {seat_capacity_filter.map((data,index)=>{
              return(
                <option key={index} value={data} >{data}</option>
              )
            })}
       
        </select>
    </div>
    
    </div>

  
</div>




Filter tab ends */}

<div className="w-full  grid place-items-center px-5 flex-warp ">
        <div className=" mb-5 grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16 w-4/5   justify-center flex-grow-0">

{
  filterdata.map((data,index)=>{
    return(
      <Card className="w-80 h-fit" key={index}>
      <CardHeader
        floated={false}
        className="h-60  flex justify-center items-center"
      >
  
        <Swiper style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }} navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
        
        {data.carimg.map((data,index)=>{
          return(       <SwiperSlide key={index}>
            <img src={data.image} alt="car-picture" />
    </SwiperSlide>)
        })}
 
       
      </Swiper>
        
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
        {data.model_year} {data.model_name}
        </Typography>
        <Typography  className="font-medium" >
          <div className='flex justify-center items-center gap-x-2'>
          <GiGearStickPattern/>{data.gear_type.map((data,index)=>{
        return (
         <span className="before:content-[''] before:block  before:bg-[#dcdcdc] before:w-[2px] before:mx-1 before:h-5 flex justify-center items-center" key={index}>{data.label}</span> 
        )
       })}
          </div>
      
        </Typography>
        {/* Fueltype */}
        <Typography>
          <div className='flex justify-center items-center'>
          <IoWaterOutline/>
          {data.fuel_type.map((data,index)=>{
            return (
              <>
                   <span className="before:content-[''] before:block  before:bg-[#dcdcdc] before:w-[2px] before:mx-1 before:h-5 flex justify-center items-center" key={index}>{data.label}</span>
              </>
         
            )
          })}
          </div>
  

        </Typography>
        <Typography>
        <Accordion open={open===`${index}`} >
        <AccordionHeader icon={false} onClick={() => handleaccordianOpen (`${index}`)}>
          Know More 
        </AccordionHeader>
        <AccordionBody className="">


          
         <div>

          <Typography>
            <div className='text-2xl '>
            <GiCarSeat/>
            </div>
        <div>
          <div>
            {data.seat_capacity}<span> Seater {data.type}</span>
          </div>
        </div>

          </Typography>
         <Typography>

<div className='text-xl '>
<TbEngine/> 
            </div>
            <div>
              <div>{data.engine_cc} <span>cc</span></div>
              <div>{data.engine_cc}<span>hp @ 4000 rpm</span></div>
              <div>{data.engine_torque}Nm @ 3000 rpm </div>
              
            </div>
   </Typography>
   <Typography>
    <div className='text-xl '>
    <GiGearStickPattern/>

    </div>
    <div>
      <div>{data.gear_count}<span> speed gear box </span> </div>
    </div>
   </Typography>
   <div className='w-full bg-[#dcdcdc] h-[2px] my-3'></div>
   <Typography className='pt-2'>
    {custuser ? <AuthuserModal car={data.id}/> :<Modal user={custuser} car={data.id} user_phone_number={user_phone_number} setUser_phone_number={setUser_phone_number}/>}
    
    

   </Typography>
         </div>
 
        </AccordionBody>
      </Accordion>
        </Typography>

    
      </CardBody>
      <CardFooter className="flex flex-col justify-center gap-7 pt-2 bg-gray-200">
      <div className='text-center'>Available in</div>
      <div className='flex flex-row justify-center gap-x-3'>
     {data.colour.map((data,index)=>{
      return(
        <>

<div className='w-8 h-8 rounded-full shadow-xl hover:scale-125 duration-300' key={index} style={{ background: `${data.label}` }}></div>
 

    
        </>
      )
     })}
     </div>
      </CardFooter>
    </Card>


    )
  })
}

        </div>
      </div>
<div>

</div>

</>


  )


}

export default Filter

function Modal(props){
  const [user_phone_error,setUser_phone_error]= useState(null)
  const [enqmodalopen,setEnqmodalopen] = useState(null)
  const [numberfound,setNumberfound]=useState(false)
  const phone_err_ref = useRef(null)
  const buttonRef = useRef(null);
  

 let Authapi = useAuthAxios()


useEffect(()=>{
if(props.user){
  setNumberfound(true)
}
},[])


  
async function hanldenumberfoundSubmit(e){
  e.preventDefault()
  console.log("handlesub,it404")
  if(localStorage.getItem("user_phone") ){
    if(props.user){}
    else {
     await axios_instance.post("/requests/enquiry",{
        'display_car':props.car,
        'user_phone':localStorage.getItem("user_phone") 

      }).then((res)=>{console.log(res)
        console.log("******7")
      localStorage.setItem("user_phone",res.data.user_phone)
setEnqmodalopen(false)
setUser_phone_error(null)
phone_err_ref.current.innerHTML=""
setNumberfound(true)

Swal.fire({
position: "top-end",
icon: "success",
title: "Your work has been saved",
showConfirmButton: false,
timer: 1500,
});
      }).catch((err)=>{
        console.log(err)
        setEnqmodalopen(false)
setUser_phone_error(null)
phone_err_ref.current.innerHTML=""

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Made a Request Already!',
          showConfirmButton: false,
          timer: 1500,
          toast:true
        })
        
      })
    }
  }
}

async function handleEnqSubmit(e){
  e.preventDefault()
  console.log(e.target.user_phone.value)
  try {
    if(e.target.user_phone.value.length != 10 ){

      setUser_phone_error("Invalid Phone Number")
      phone_err_ref.current.innerHTML="Invalid Phone Number"
    }
    else{
      console.log("worked")
      if(props.user){
        console.log("valid user")

         // localStorage.setItem("userphone",JSON.stringify(e.target.name))
      }
      else{
        // guest user

        await axios_instance.post("/requests/enquiry",{
          'display_car':props.car,
          'user_phone':e.target.user_phone.value

        }).then((res)=>{console.log(res)
          console.log("*****5")
        localStorage.setItem("user_phone",res.data.user_phone)
setEnqmodalopen(false)
setUser_phone_error(null)
phone_err_ref.current.innerHTML=""
setNumberfound(true)

Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500,
});
        }).catch((err)=>{
          console.log(err)
          setEnqmodalopen(false)
          setUser_phone_error(null)
          phone_err_ref.current.innerHTML=""
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Made a Request Already!',
            showConfirmButton: false,
            timer: 1500,
            toast:true
          })
          
        })
        console.log("invalid user")
      }
 

     
     
    }
  }
  catch{
    setUser_phone_error("Invalid Phone Number")
    phone_err_ref.current.innerHTML="Invalid Phone Number"

  }


}

  return (



  <Popup trigger={<Button size='md' className='bg-myblue-600 hover:bg-myblue-500 '>Make Enquiry</Button>} 
  open={enqmodalopen}
  modal>
   
   {props.user? " " : 
   <div className='bg-white p-5'>
      <div className='mb-4'>
       <span className='text-xl text-gray-400'>Want to Know More ?</span>
        </div>
        <div className='w-full text-center h-5 my-3'>
          <span ref={phone_err_ref} className='text-red-400 text-sm '>
          {/* {user_phone_error?user_phone_error:""} */}
          </span>
       </div>
        <div className='flex items-center justify-center gap-y-4'>
        



        {
           localStorage.getItem("user_phone")  ? 
          <form onSubmit={hanldenumberfoundSubmit}>
          <div className='flex flex-col items-center gap-y-4'> 
         

<div>
<Button  size='md' type="submit" className='bg-myblue-600 hover:bg-myblue-500 ' >Contact Me</Button>
</div>
</div>
        </form>

        // Here
          :
        
        <form onSubmit={handleEnqSubmit}>
          <div className='flex flex-col items-center gap-y-4'> 
          <div>
          <Input label='Phone Number' name="user_phone" type="number" onChange={(e)=>props.setUser_phone_number(e.target.value)}></Input>

</div>
<div className='flex gap-4 justify-center items-center'>
  
  <span className='text-sm'>It's okay to contact me in the future</span>
  <span>
    <Checkbox name="agreed" onChange={(e)=>{e.target.checked? buttonRef.current.disabled = false:  buttonRef.current.disabled = true}}></Checkbox>
  </span>
  </div>
<div>
<Button ref={buttonRef} size='md' type="submit" className='bg-myblue-600 hover:bg-myblue-500 ' disabled>Submit</Button>
</div>
</div>
        </form>
}
        </div>
        <div className='my-4 text-center'>
          <span className='text-sm text-myblue-800'>Click the Submit, Our Team Will Contact You As Soon As Possible</span>
        </div>
     

    </div>

   }
  </Popup>
);
  }


  function AuthuserModal(props){
    let {custuser}= useContext(AuthContext)
    let authApiuser = useCustAuthAxios()
    const [enqmodalopen,setEnqmodalopen] = useState(null)

   async  function AuthuserHandleSubmit(e){
      e.preventDefault()
   
await authApiuser.post("/requests/enquiry",
{
  'display_car':props.car,
  'user_phone':custuser.phone_number
}
).then((res)=>{
  console.log(res)

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  
}).catch((err)=>{
console.log(err)
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Made a Request Already!',
    showConfirmButton: false,
    timer: 1500,
    toast:true
  })

})
    }

return(


  <Popup trigger={<Button size='md' className='bg-myblue-600 hover:bg-myblue-500 '>Make Enquiry</Button>} 
  open={enqmodalopen}

  modal>
   
   
   <div className='bg-white p-5'>
      <div className='mb-4'>
       <span className='text-xl text-gray-400'>Want to Know More ?</span>
        </div>
        <div className='w-full text-center h-5 my-3'>
          <span className='text-red-400 text-sm '>

          </span>
       </div>
        <div className='flex items-center justify-center gap-y-4'>
        
<Button  size='md'  className='bg-myblue-600 hover:bg-myblue-500 'onClick={AuthuserHandleSubmit} >Contact Us</Button>
        </div>
        <div className='my-4 text-center'>
          <span className='text-sm text-myblue-800'  >Click the Submit, Our Team Will Contact You As Soon As Possible</span>
        </div>
     

    </div>

   
  </Popup>
);
  }