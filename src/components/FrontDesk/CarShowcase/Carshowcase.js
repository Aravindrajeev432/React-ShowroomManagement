import { Button, Input } from "@material-tailwind/react";
import React, {  useContext, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";

import useAuthAxios from "../../../utils/useAuthAxios";

import Select from 'react-select';

import DisplayCards from "./DisplayCards";
import AuthContext from "../../../context/AuthContext";

function Carshowcase() {
  let {setGloballoader} = useContext(AuthContext)
let Authapi = useAuthAxios()
const [newmodal,setNewmodalopen]=useState(null)
const [newpicmodal,setNewpicmodal] = useState(false)
const [newpicid,setNewpicid] = useState(null)





//   [
//     {
//         "id": 1,
//         "model_name": "ALTO",
//         "model_year": "2022",
//         "seat_capacity": 5,
//         "gear_type": "AMT",
//         "gear_count": "5",
//         "engine_cc": "1488",
//         "fuel_type": "PETROL",
//         "engine_power": "20",
//         "engine_torque": "40",
//         "wheel_base": "15",
//         "image": "http://localhost:8000/media/images/carsALTO2022/carscar1.webp",
//         "is_active": true,
//         "is_deleted": false,
//         "colour": [
//             1,
//             3
//         ]
//     }
// ]

const [colours,setColours]=  useState([])
const [gear_types,setGear_types]=useState([])
const [fuel_types,setFuel_types]=useState([])
const [csrftoken,setCsrftoken]=useState(null)
const [displaycars,setDisplaycars] = useState([])

useEffect(()=>{
  GetDisplayCars();
  GetDetails()

},[])

async function GetDetails(){
  await Authapi.get("cars/getdisplaycarsdetails").then((res)=>{
    
    setColours(res.data.colours)
    setGear_types(res.data.gear_types)
    setFuel_types(res.data.fuel_types)
  }).catch((err)=>{})
}

async function  GetDisplayCars (){
  setGloballoader(true)
 await  Authapi.get("frontdesk/add-display-cars").then((res)=>{
    console.log(res.data)
    setGloballoader(false)
    setDisplaycars(res.data.results)
    setCsrftoken(res.cookies['csrftoken'])

  }).catch((err)=>{})
}

// async function picupdator(e){
//   e.preventDefault()

//   const form_Data = new FormData();
//   for(var key in picinputs){

//   form_Data.append(key,picinputs[key])
 



// }
// for ( var pair of form_Data.entries()){
//   console.log(pair[0]+','+pair[1])
// }



//   console.log("picupdator")
// await Authapi.patch(`frontdesk/displaycarspictureupdator/${newpicid}`,form_Data).then((res)=>{
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     title: "Your work has been saved",
//     showConfirmButton: false,
//     timer: 1500,
//   });
//   console.log(res)
// setNewpicmodal(false)
// setNewpicid(null)
// setPicinputs([])
// GetDisplayCars()


// }).catch((err)=>{
//   console.log(err)
// })


// }

// const uploadimage1=(e)=>{
//   console.log(e.target)
//   const image_1= e.target.files[0]
//   setPicinputs((values)=>({...values,["image"]:image_1}))

// }
// const uploadimage2=(e)=>{
//   const image2= e.target.files[0]
//   setPicinputs((values)=>({...values,["image1"]:image2}))

// }
// const uploadimage3=(e)=>{
//   const image3= e.target.files[0]
//   setPicinputs((values)=>({...values,["image3"]:image3}))

// }


  return (
    <div className="w-full p-4 ">
      <div className="w-fullflex justify-end">
        <Modal colours={colours} setNewmodalopen={setNewmodalopen}  GetDisplayCars={ GetDisplayCars} setNewpicmodal={setNewpicmodal} setNewpicid={setNewpicid}  newmodal={newmodal} gear_types={gear_types} fuel_types={fuel_types} csrftoken={csrftoken} />
        
        <Popup open={newpicmodal}   modal>
   
        <div className="bg-white p-4  gap-y-2">

<div className="text-2xl text-gray-400 text-center">Add Pictures{newpicid}</div>
<form >

{/* <form onSubmit={picupdator}> */}
<div>
  <div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 1
          </label>
          <input
          
          name="image_1"
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="fileinput"
            type="file"
            accept=".jpg,.webp"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 2
          </label>
          <input
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
      
            name="image_2"
            id="fileinput"
            type="file"
            
            accept=".jpg,.webp"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 3
          </label>
          <input
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="fileinput"
            name="image_3"
            type="file"

            accept=".jpg,.webp"
          />
        </div>
      </div>
      <div className="flex justify-center py-4">
        <Button size='md' type="submit" className="bg-myblue-600">Submit</Button>
      </div>
</div>
</form>
--
</div>
  </Popup>
      </div>
      <div className="w-full p-4 grid grid-cols-4 gap-4 ">
{
  displaycars.map((data,index)=>{
    return (
      
      <DisplayCards index={index} data={data} GetDisplayCars={GetDisplayCars}/>
    )
  })
}

      </div>
    </div>
  );
}





function  Modal(props) {

  let Authapi = useAuthAxios()
  const [inputs, setInputs] = useState({});
  const [colorsarr,setColoursarr] = useState([])
  const [gear_typesarr,setGear_typesarr] = useState([])
  const [fuel_typesarr,setFuel_typesarr] = useState([])
const errref = useRef(null)

  const form_Data = new FormData();

const handleChange = (e)=>{
  const name = e.target.name;
  const value = e.target.value;

  setInputs((values) => ({ ...values, [name]: value }));
 


};
function  imageuploader(e){
  console.log("image uploader")
  console.log(e.target.files)


  for (let i=0; i<e.target.files.length;i++){
    console.log(i)
    console.log(e.target.files[i])
    form_Data.append(`image${i}`,e.target.files[i])
  }
//   for(let key in e.target.files.length){
//     console.log(key)

//   
// }

console.log("_______")
for ( var pair of form_Data.entries()){
  console.log(pair[0]+','+pair[1])
}




}
async function picuploader(id){
form_Data.append('id',id)

  await Authapi.post(`frontdesk/displaycarspictureupdator`,form_Data,{
    headers: {
      'Content-Type': 'multipart/form-data',
      
    },
  }).then(
    (res)=>{
      form_Data.delete('id')
      console.log(res)
      props.setNewmodalopen(false)
      props.GetDisplayCars();


    }

  ).catch((err)=>{
    console.log(err)
  })

}



function chekinput(){

console.log("----------")

if(inputs.model_name===undefined){
console.log("model name required")
console.log(errref.current)
errref.current.innerHTML = "model name required"
return false;
}
if(inputs.model_year===undefined){
  console.log("model_year req")
  errref.current.innerHTML=" model year required"
  return false;
}
if(inputs.type===undefined){
  console.log("type req")
  errref.current.innerHTML="Please select a type"
  return false;
}
if(inputs.engine_power==undefined){
console.log("power  req")
errref.current.innerHTML = "Engine Power required"
return false;
}
else if(parseInt(inputs.engine_power)<80 || parseInt(inputs.engine_power)>200){
  console.log("power req")
  errref.current.innerHTML = "Inavlid engine power"
  return false;
}
if(inputs.engine_torque===undefined){
  errref.current.innerHTML = "Engine torque required"
  console.log("torque req1")
  return false;
}
else if(parseInt(inputs.engine_torque)<10 || parseInt(inputs.engine_torque)>500){
  console.log(inputs.engine_torque)
  errref.current.innerHTML  = "Invalid engine torque"
  console.log("torqu req2")
  return false;
}

if(inputs.wheel_base===undefined){
  console.log("wheel base")
  errref.current.innerHTML = "Wheel base required"
  return false;
}
else if(parseInt(inputs.wheel_base)<10 || parseInt(inputs.wheel_base)>30)
{
  console.log("wheel err")
  errref.current.innerHTML = "Invalid wheel base"
  return false;
}
if(inputs.engine_cc===undefined){
  console.log("engine cc error1")
  errref.current.innerHTML = "Engine cc required"
  return false;
}
else if(parseInt(inputs.engine_cc)<1000 || parseInt(inputs.engine_cc)>5000 ){
  errref.current.innerHTML = "Invalid Engine cc"
  console.log("engine cc error2")
  return false;
}


if(inputs.gear_count===undefined){
  errref.current.innerHTML=  "Gear count required"
console.log("gear err")
return false;
}
else if(parseInt(inputs.gear_count)<4 || parseInt(inputs.gear_count)>8)
{

  errref.current.innerHTML = "Invalid gear count"
  console.log("gear err")
  return false;
}

if(inputs.seat_capacity===undefined){
  errref.current.innerHTML= "Seat capacity required"
console.log("seat capacity1")
return false;
}
else if(parseInt(inputs.seat_capacity)<4 || parseInt(inputs.seat_capacity)>8){
  console.log("seat capcity2")
  errref.current.innerHTML = "Sear capacity sholud be b/w 4 and 8"
  return false;
}


if(colorsarr.length===0){
  console.log("colorsarr req")
  errref.current.innerHTML= "Please select at least one colour"
  return false;
}
if(gear_typesarr.length===0){
  errref.current.innerHTML = "Plese select at least one gear type"
  console.log("geartype req")
  return false;
}
if(fuel_typesarr.length===0){
  console.log("Fuel req")
  errref.current.innerHTML= "Please select at least one fuel type"
  return false;
}


// setInputs((values)=>({...values,["colour"]:colorsarr}))
// setInputs((values)=>({...values,["gear_type"]:gear_typesarr}))
// setInputs((values)=>({...values,["fuel_type"]:fuel_typesarr}))
errref.current.innerHTML= ""

return true;

// console.log(colorsarr)
// console.log(gear_typesarr)
// console.log(fuel_typesarr)
}


async function CreateDisplayCars(e){
  e.preventDefault()
  // const formData = new FormData();
  // formData.append(...inputs)


  let result = chekinput()
  if(result){
    console.log(result)
    console.log("treeeeee")
// for(var key in inputs){

//  if(key==="colour"){
//   console.log("CORENFIJNFIJENN")
//   form_Data.append("colour",['1','2'])
//  }
//  else{
//   form_Data.append(key,inputs[key])
//  }



// }
// for ( var pair of form_Data.entries()){
//   console.log(pair[0]+','+pair[1])
// }


await Authapi.post("http://127.0.0.1:8000/frontdesk/add-display-cars",
  {...inputs}
,{
  headers: {
    // 'Content-Type': 'multipart/form-data',
      'X-CSRFToken': props.csrftoken,
  },
}).then((res)=>{
  console.log(res)
  // Swal.fire({
  //   position: "top-end",
  //   icon: "success",
  //   title: "Your work has been saved",
  //   showConfirmButton: false,
  //   timer: 1500,
  // });

  picuploader(res.data.id)

  props.setNewmodalopen(false)
  props.setNewpicid(res.data.id)
  setInputs({})
  setColoursarr([])
  setGear_typesarr([])
  setFuel_typesarr([])
  // props.setNewpicmodal(true)
  props.GetDisplayCars();


}).catch((err)=>{
  console.log(err)
})



  }
  else{
    console.log("sdhfdkjhfks")
  }
  }

function colourarray(e){
  setColoursarr([])
  let coloursarrys=[]
  e.map((data)=>{
    
    console.log(data)
    coloursarrys.push(parseInt(data.value))
    setColoursarr(arr=>[...arr,data.value])
    
  })
  setInputs((values)=>({...values,["colour"]:coloursarrys}))
  // setInputs((values)=>({...values,["colour"]:['1','2']}))
  console.log(coloursarrys)

}

function gear_typearray(e){
  console.log(e)
  setGear_typesarr([])
  let gear_typearrays=[]
  e.map((data)=>{
    setGear_typesarr(arr=>[...arr,data.value])
    gear_typearrays.push(data.value)
  })
setInputs((values)=>({...values,['gear_type']:gear_typearrays}))
}
function fuel_typearray(e){
  setFuel_typesarr([])
  let fuel_type_arrays=[]
  e.map((data)=>{
    setFuel_typesarr(arr=>[...arr,data.value])
    fuel_type_arrays.push(data.value)

  })
  setInputs((values)=>({...values,['fuel_type']:fuel_type_arrays}))









}

  
  return(
  <Popup
    trigger={
      <Button size="lg" className="bg-myblue-600">
        <span className="flex items-center">
          Add&nbsp;
          <FaPlus />
        </span>
      </Button>
    }
    open={props.newmodal}
    modal
  >
    <div>
    <form onSubmit={CreateDisplayCars} >
    <div className="bg-white p-4 grid grid-rows-1 gap-y-2">

      <div className="text-2xl text-gray-400 text-center">Add Display Cars</div>

      <div className="h-8 w-full"><span ref={errref} className="text-red-400 text-sm"></span></div>
      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <Input label="Model Name" name="model_name" onChange={handleChange}></Input>
        </div>
        <div>
          <Input label="Model Year" name="model_year" onChange={handleChange} type="number"></Input>
        </div>
      </div>
      <div>
        <div>
          <span>Colours Available</span>
        </div>
        
        {/* <div className="flex w-max gap-4">
          <Checkbox
            name="colour_indigo"
            color="indigo"
            value="blue"
            label="Blue"
            onChange={handleChangeCheckbox}
          />
          <Checkbox name="colour_red" color="red" value="red" label="Red" />
          <Checkbox
            name="colour_white"
            label="white"
            className="bg-white checked:bg-gray-400"
            onChange={handleChange}
          ></Checkbox>
        </div> */}


<Select
    
    isMulti
    name="colors"
    options={props.colours}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={colourarray}
    
  />


      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type:
          </label>
          <select
            id="type"
            name="type"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose Type</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
          </select>
        </div>
        <div>
          <div> <span>Gear Type</span></div>
          <div>
            
          <Select
    
    isMulti
    name="Gear Types"
    options={props.gear_types}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={gear_typearray}
    
  />
        </div>
         
          
        </div> 
        <div>
          <div>    <span>Fuel type</span></div>
          <div >
          <Select
    
    isMulti
    name="Fuel Types"
    options={props.fuel_types}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={fuel_typearray}
    
  /> 
          </div>
      


        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-2">
          <Input label="Engine cc" name="engine_cc" type="number" onChange={handleChange}></Input>
          <Input label="Power" name="engine_power" type="number" onChange={handleChange}></Input>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <Input label="Torque" name="engine_torque" type="number" onChange={handleChange}></Input>
          <Input label="Wheel Base" name="wheel_base" type="number" onChange={handleChange}></Input>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <Input label="Gear's Count" name="gear_count" type="number" onChange={handleChange}></Input>
          <Input label="Seat Capacity" name="seat_capacity" type="number" onChange={handleChange}></Input>
        </div>
      </div>
      {/* <div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 1
          </label>
          <input
          onChange={uploadimage1}
          name="image_1"
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="fileinput"
            type="file"
            accept=".jpg,.webp"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 2
          </label>
          <input
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            
            name="image_2"
            id="fileinput"
            type="file"
            onChange={uploadimage2}
            accept=".jpg,.webp"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Image 3
          </label>
          <input
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="fileinput"
            name="image_3"
            type="file"
            onChange={uploadimage3}
            accept=".jpg,.webp"
          />
        </div>
      </div> */}


<div >
  <input type='file' onChange={imageuploader} className="rounded h-9  "  accept=".jpg,.webp" multiple ></input>
</div>

      <div className="w-full mt-4 flex justify-center">
        <Button  type="submit" className="bg-myblue-600 hover:bg-myblue-400" md="md">
          Submit
        </Button>
        {/* <Button onClick={()=>picuploader(51)}>check</Button> */}
      </div>
     
    </div>
    </form>
   
</div>

  </Popup>

  
)};



export default Carshowcase;
