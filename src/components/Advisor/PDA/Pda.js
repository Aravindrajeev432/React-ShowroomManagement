import React, { useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button, Checkbox } from "@material-tailwind/react";
import useAuthAxios from "../../../utils/useAuthAxios";

import Swal from "sweetalert2";
function Pda() {
  let authApi = useAuthAxios();

  const [inputs, setInputs] = useState({});
  const [finalcheck, setFinalcheck] = useState(false);

  const engine_error_ref = useRef();
  const [errors, setErrors] = useState([]);

  const [reloaderpage, setReloaderpage] = useState("1");

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await authApi
      .post("/cars/stockcar", {
        ...inputs,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        setErrors([]);
        setReloaderpage(reloaderpage+1)
      })
      .catch((err) => {
        console.log(err.response.data.errorText);
        const er = err.response.data.errorText;
        if (err.response.data.errorText) {
          console.log("error found");
          const keys = Object.keys(er);
          console.log(keys);
          setErrors(keys);
        }
        // let error = err.response.data.errorText
        // if("engine_power" in error){
        //     console.log("error found")
        //     setErrors(values=>({...values,["engine_error"]:"engine error"}))
        // }
      });
  };

  return (
   <div className="w-full">
        <div className="w-full p-4 ">
        <div>
          <span className="text-4xl p-4 text-gray-500">Add new Car</span>
        </div>

        <div className="w-full h-1 bg-gray-400 rounded-sm mt-1"></div>
        <div className="w-full p-4">
          <span className="p-4 text-sm">
            All Inspections are needed to be done before submiting this form ⚠️
          </span>
        </div>
        <div className="w-full px-4">
          <span className="px-4 text-red-500">
            {errors.length === 0 ? "" : "Error at"}
            {errors.map((data, index) => {
              return (
                <>
                  <span className="mx-1" key={index}>
                    {data === "engine_power" ? "Power" : ""}
                    {data === "seat_capacity" ? "Seat capacity" : ""}
                    {data === "gear_type" ? "Gear Type" : ""}
                    {data === "gear_count" ? "Gear count" : ""}
                    {data === "fuel_type" ? "Fuel Type" : ""}
                    {data === "type" ? "Type" : ""}
                    {data === "chase_number" ? "Chase Number Repeating❗️" : ""}
                    {data === "engine_number"
                      ? "Engine Number Repeating❗️"
                      : ""}
                    ,
                  </span>
                </>
              );
            })}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 w-full  grid lg:grid-cols-2   ">
          <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2">
            <Input
              label="Model Name"
              name="model_name"
              onChange={handleChange}
              required
            />
            <Input
              label="Model year"
              name="model_year"
              onChange={handleChange}
              required
            />

            <Input
              label="Colour"
              name="colour"
              onChange={handleChange}
              required
            />
            <Input
              label="Price"
              name="price"
              onChange={handleChange}
              required
            />
            {/* <Select label="Type" name="type" onChange={(e)=>console.log(e)}>
            <Option value="Sedan">Sedan</Option>
            <Option value="SUV">SUV</Option>
            <Option value='Hatchback'>Hatchback</Option>
            </Select> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Type
              </label>
              <select
                onChange={handleChange}
                name="type"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a Value</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2">
            <Input
              label="Chase Number"
              name="chase_number"
              onChange={handleChange}
              required
            />
            <Input
              label="Engine Number"
              name="engine_number"
              onChange={handleChange}
              required
            />

            {/* <Select label="Gears Count" name="gears_count" onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value='3'>3</Option>
            <Option value='4'>4</Option>
            <Option value='5'>5</Option>
            <Option value='6'>7</Option>
        </Select> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Gear's Count
              </label>
              <select
                onChange={handleChange}
                name="gear_count"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a value</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            {/* <Select label="Gear type" name="gear_type" onChange={handleChange}>
            <Option value="1">AMT</Option>
            <Option value="2">Manual</Option>
            <Option value='3'>DCT</Option>
            </Select> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gear Type
              </label>
              <select
                onChange={handleChange}
                name="gear_type"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a value</option>
                <option value="AMT">AMT</option>
                <option value="Manual">Manual</option>
                <option value="DCT">DCT</option>
              </select>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2">
            {/* <Select label="Seat Capacity" name="seat_capacity" onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value='3'>3</Option>
            <Option value='3'>4</Option>
            <Option value='3'>5</Option>
            <Option value='3'>6</Option>
            <Option value='3'>7</Option>
            </Select> */}

            <Input
              label="Engine cc"
              name="engine_cc"
              onChange={handleChange}
              required
            />
            {/* <Select label="fuel Type" name="fuel_type" onChange={handleChange}>
            <Option value="Petrol">Petrol</Option>
            <Option value="Diesel">Deisel</Option>
        </Select> */}

            <Input
              label="Power"
              name="engine_power"
              ref={engine_error_ref}
              onChange={handleChange}
              required
            />
            <Input
              label="Torque"
              name="engine_torque"
              onChange={handleChange}
              required
            />
            <Input
              label="Wheel base"
              name="wheel_base"
              onChange={handleChange}
              min="15"
              max="25"
              required
            />
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Seat Capacity
              </label>
              <select
                onChange={handleChange}
                name="seat_capacity"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select a value</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Fuel Type
              </label>
              <select
                onChange={handleChange}
                name="fuel_type"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a value</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesal">Diesal</option>
              </select>
            </div>
          </div>

          <div className="p-4 ">
            <Checkbox
              className="checked:bg-myblue-500"
              onChange={(e) => {
                console.log(e.target.checked);
                setFinalcheck(e.target.checked);
              }}
            ></Checkbox>
            <span className="text-gray-700">
              I certify that I am finished all inspections and I agree to the{" "}
              <span className="text-myblue-500">Terms and Policies</span>
              and <span className="text-myblue-500">Privacy Policy.</span>
            </span>
          </div>
        </div>
        <div className="w-full grid place-items-center">
          <Button
            size="lg"
            className="bg-myblue-500 "
            type="submit"
            disabled={finalcheck ? false : true}
          >
            <span className="tracking-widest">Submit</span>
          </Button>
        </div>
      </form>
    </div> 

  );
}

export default Pda;
