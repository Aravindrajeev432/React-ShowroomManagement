import { React,useState,useRef } from "react";
import Popup from "reactjs-popup";
import useAuthAxios from "../../../utils/useAuthAxios";
import Select from "react-select";
import { IoIosCloseCircle } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import {BsArrowLeft} from 'react-icons/bs'

export default function PartUpdator(props) {
    let authApi = useAuthAxios()
    const [updated,setUpdated] = useState(false)
    const errRef = useRef(null);
    const [inputs,setInputs] = useState({
        "unique_part_name": props.part.unique_part_name,
        "stock": props.part.stock,
        "price": props.part.price,
        "labour_charge": props.part.labour_charge,
        "compatible_cars": props.part.compatible_cars.map((data)=>data.value)
    })


    const handleChange = (e) => {
        console.log(e.target);
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
      };
    
      function compatible_carsarrayHandler(e) {
        console.log(e);
    
        let comptible_cararrays = [];
        e.map((data) => {
          //   setGear_typesarr(arr=>[...arr,data.value])
          comptible_cararrays.push(data.value);
        });
        setInputs((values) => ({
          ...values,
          ["compatible_cars"]: comptible_cararrays,
        }));
      }
      function validation() {
      
        console.log(inputs.unique_part_name);
    
        if (inputs.unique_part_name === undefined) {
          errRef.current.innerHTML = "Invalid Part Name";
          return false;
        }
        if (inputs.stock === undefined) {
          errRef.current.innerHTML = "Invalid Stock";
          return false;
        }
        if (inputs.stock <= 0 || inputs.stock > 10000) {
          errRef.current.innerHTML = "Invalid Stock";
          return false;
        }
        if (inputs.price === undefined) {
          errRef.current.innerHTML = "Invalid Price";
          return false;
        }
    
        if (inputs.price <= 0 || inputs.price > 100000) {
          errRef.current.innerHTML = "Invalid Price";
          return false;
        }
        if (inputs.labour_charge === undefined) {
          errRef.current.innerHTML = "Invalid Price";
          return false;
        }
    
        if (inputs.labour_charge <= 0 || inputs.labour_charge > 100000) {
          errRef.current.innerHTML = "Invalid Price";
          return false;
        }
    
        if (inputs.compatible_cars === undefined) {
          errRef.current.innerHTML = "Invalid compatible cars";
          return false;
        }
        if (inputs.compatible_cars.length <= 0) {
          errRef.current.innerHTML = "Invalid compatible cars";
          return false;
        }
        errRef.current.innerHTML = "";
        return true;
      }
    function formHandler(e){
        e.preventDefault()
        if(validation()){
console.log("success validation")


updatorFunction()



        }
        
    }

async function updatorFunction(){
    authApi.patch(`parts/update-part/${props.part.id}`,
    {
        ...inputs
    }).then((res)=>{
        console.log(res)
        props.getparts();
        setUpdated(true)
    }).catch((err)=>{
        console.log(err)
    })
}

    // unique_part_name: data.unique_part_name,
    // stock: data.stock,
    // price: data.price,
    // labour_charge: data.labour_charge,
    // compatible_cars: data.compatible_cars,
    // options:options

  return (
    <>
      <Popup
        trigger={<span className="text-blue-400 cursor-pointer">Edit</span>}
        modal
        closeOnDocumentClick={true}
      >
        {(close) => (

           
          <div className="w-96 bg-white  p-2 rounded-md">


          <div>
            <div className="text-2xl w-full flex justify-end cursor-pointer text-myblue-600 hover:text-myblue-300">
              <IoIosCloseCircle
                onClick={()=>{
                    props.getparts();
                    close();
                    setUpdated(false);
                
                }}
                
              />
              
            </div>
            <div className="">
              <span className="text-gray-500 text-2xl">Update Part</span>
            </div>

            {updated ? <div>
                <div><span className="text-xl ">Successfully Updated</span></div>
                <div className="my-3"><Button onClick={()=>{close()
                setUpdated(false)
                }} className="flex items-center gap-x-2 bg-myblue-600">
                <BsArrowLeft className="font-serif text-base"/><span>Go Back</span></Button></div>
                
            </div>:<div>
            <div className="h-4">
              <span ref={errRef} className="text-red-300"></span>
            </div>
            <div className="my-2">
              <form onSubmit={formHandler}>
                <div className="my-2">
                  <input
                    name="unique_part_name"
                    defaultValue={props.part.unique_part_name}
                    className="bg-white w-full p-1 border-b-2"
                    type="text"
                    placeholder="Part Name"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="my-2">
                  <input
                    name="stock"
                    defaultValue={props.part.stock}
                    className="bg-white w-full p-1 border-b-2"
                    type="number"
                    placeholder="Stock"
                    onChange={handleChange}
                  ></input>
                </div>
  
                <div className="my-2">
                  <input
                    name="price"
                    defaultValue={props.part.price}
                    className="bg-white w-full p-1 border-b-2"
                    type="number"
                    placeholder="Price"
                    onChange={handleChange}
                  ></input>
                </div>
  
                <div className="my-2">
                  <input
                    name="labour_charge"
                    defaultValue={props.part.labour_charge}
                    className="bg-white w-full p-1 border-b-2"
                    type="number"
                    placeholder="Labour Charge"
                    onChange={handleChange}
                  ></input>
                </div>
  
                <div className="my-2">
                  <Select
                    name="compatible_cars"
                    defaultValue={props.part.compatible_cars}
                    isMulti
                    options={props.part.options}
                    onChange={compatible_carsarrayHandler}
                  />
                </div>
  
                <div className="my-2 w-full flex justify-center">
                  <Button className="bg-myblue-600" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            </div>
        }
                
            {/* <div>
                <Button onClick={()=>props.getparts()}>Test</Button>
            </div> */}
      
          </div>
        </div>
        )}
      </Popup>
    </>
  );
}
