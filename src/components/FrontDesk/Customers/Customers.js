import React, { useEffect, useState } from "react";
import { Button, Input, Radio } from "@material-tailwind/react";
import Popup from "reactjs-popup";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import useAuthAxios from "../../../utils/useAuthAxios";
import Swal from "sweetalert2";
import { BiErrorCircle } from "react-icons/bi";
import CustomerTable from "./CustomerTable";
function Customers() {
  let authApi = useAuthAxios();
  const [car_not_found_err, setCar_not_found_err] = useState("");
  const [car_det_open, setCar_det_open] = useState(false);
  const [assign_user_open, setAssign_user_open] = useState(false);
  const [open, setOpen] = useState(0);
  const [cardata, setCardata] = useState({});
  const [engine_number, setEngine_number] = useState("");
  const [user_error, setUser_error] = useState(null);

  const [inputs, setInputs] = useState({
    model_name: "",
    model_year: "",
    type: "",
    gear_type: "",
    colour: "",
  });
  const [cars, setCars] = useState([]);
  const [model_year_filter, setModel_year_filter] = useState("");
  const [model_name_filter, setModel_name_filter] = useState("");
  const [model_gear_type_filter, setModel_gear_type_filter] = useState("");
  const [model_colour_filter, setModel_colour_filter] = useState("");




  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    getCarFilters();
  }, []);

  async function getCarFilters() {
    await authApi
      .get("frontdesk/get-filter-data")
      .then((res) => {
        console.log(res.data);
        setModel_name_filter(res.data.model_names);
        setModel_year_filter(res.data.model_years);
        setModel_gear_type_filter(res.data.gear_types);
        setModel_colour_filter(res.data.colours);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getCars() {
    console.log("getcarddetails");
    await authApi
      .get(
        `frontdesk/check-car-availability?type=${inputs.type}&model_year=${inputs.model_year}&model_name=${inputs.model_name}&gear_type=${inputs.gear_type}&colour=${inputs.colour}&page=1`
      )
      .then((res) => {
        console.log(res);
        if(res.data.results.length===0){
          console.log("ZERO")
          setAssign_user_open(false)
          setCar_not_found_err("Nothing Found")
        }
        else{
          setCar_not_found_err(null)
        }
        
        setCars(res.data.results);
         // resetting engine number
        setEngine_number("");
        setCar_det_open(true);
      })
      .catch((err) => {

        console.log(err);
        // resetting engine number
        setEngine_number("")
        setCar_not_found_err("Not Found");
        setCar_det_open(true);
      });
  }

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };
  const handleOpen = (value) => {
    setOpen(value);
  };
  const [modalopen, setModalopen] = useState(null);

  async function MakeCustomer(e) {
    e.preventDefault();
    console.log("Make customer");
    await authApi
      .post("frontdesk/create-customer", {
        username: e.target.username.value,
        phone_number: e.target.phone.value,
        address: e.target.address.value,
        email: e.target.email.value,
        engine_number: engine_number,
      })
      .then((res) => {
        console.log(res);
        setUser_error(null);
        if (res.status === 201) {
          setModalopen(false);
          setCardata({});
          setCar_det_open(false);
          setAssign_user_open(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        setUser_error(err.response.data.message);
      });
  }
  async function CheckEngineNumber(e) {
    e.preventDefault();
    console.log("check ecngiine number");
    await authApi
      .get(`/cars/check-enginenumber/${e.target.engine_number.value}`)
      .then((res) => {
        console.log(res);
        setCardata(res.data);
        setCar_not_found_err(null);
        setCar_det_open(true);
        setAssign_user_open(true);
        setEngine_number(e.target.engine_number.value);
      })
      .catch((err) => {
        console.log(err);

        setCar_not_found_err("Not Found");
        setCardata(false);
        setCar_det_open(true);
        setAssign_user_open(false);
      });
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full p-4">
          <span className="text-4xl text-gray-600">Add New Customer</span>
          <div className="w-full h-1 bg-gray-400 rounded-sm mt-1"></div>
        </div>
        <div className="w-full p-4">
          <Popup
            open={modalopen}
            closeOnDocumentClick={false}
            position="topleft"
            trigger={
              <Button ripple={true} size="lg" className="bg-myblue-500">
                Add new Customer
              </Button>
            }
            modal
          >
            {(close) => (
              <div
                className="p-5  bg-white rounded-sm"
                style={{ width: "400px" }}
              >
                <div className="w-full flex justify-end">
                  <button
                    className="text-2xl text-myblue-600 right-0"
                    onClick={() => {
                      close();
                      setCar_det_open(false);
                      setCar_not_found_err(null);
                      setCardata({});
                      setInputs({    model_name: "",
                      model_year: "",
                      type: "",
                      gear_type: "",
                      colour: "",})
                      setAssign_user_open(false);
                    }}
                  >
                    {" "}
                    &times;
                  </button>
                </div>
                <h1 className="text-myblue-600 text-center ">Add a Customer</h1>
                <div className="text-white text-center">
                  <div className="flex flex-col">
                    {/* <form onSubmit={CheckEngineNumber}>
    <div className="p-2">
      <span className="text-white">
      <Input label="Engine Number" name="engine_number" className=" text-myblue-600 border-white uppercase"  required/>
      <div className="mt-2">
      <Button type="submit" size="md" className="text-white bg-myblue-600 ">Check</Button>
      </div>
      
      </span>
    </div>

  </form> */}
                  </div>
                  <Accordion open={true} icon="">
                    <AccordionHeader>Select A Car</AccordionHeader>
                    <AccordionBody>
                      {/* <form onSubmit={CheckEngineNumber}>
                        <div className="p-2">
                          <span className="text-white">
                            <Input
                              label="Engine Number"
                              name="engine_number"
                              className=" text-myblue-600 border-white uppercase"
                              required
                            />
                            <div className="mt-2">
                              <Button
                                type="submit"
                                size="md"
                                className="text-white bg-myblue-600 "
                              >
                                Check
                              </Button>
                            </div>
                          </span>
                        </div>
                      </form> */}

                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Model Name
                          </label>
                          <select
                            id="model_name"
                            onChange={handleChange}
                            name="model_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option value="" selected>
                              Any
                            </option>
                            <Options model_names={model_name_filter}></Options>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Model Year
                          </label>
                          <select
                            id="model_year"
                            onChange={handleChange}
                            name="model_year"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option value="" selected>
                              Any
                            </option>
                            <Options model_names={model_year_filter}></Options>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Gear Type
                          </label>
                          <select
                            id="gear_type"
                            onChange={handleChange}
                            name="gear_type"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option value="" selected>
                              Any
                            </option>
                            <Options
                              model_names={model_gear_type_filter}
                            ></Options>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Colour
                          </label>
                          <select
                            id="colour"
                            onChange={handleChange}
                            name="colour"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option value="" selected>
                              Any
                            </option>
                            <Options
                              model_names={model_colour_filter}
                            ></Options>
                          </select>
                        </div>
                        <div className="col-span-2 py-2">
                          <Button
                            size="md"
                            onClick={getCars}
                            className="bg-myblue-600 text-white"
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </AccordionBody>
                  </Accordion>

                  <Accordion open={car_det_open} icon="">
                    <AccordionHeader>Car Details</AccordionHeader>
                    <AccordionBody className="text-center">
                      <div className="flex flex-col h-28 p-3 border-2 overflow-scroll">
                        {car_not_found_err ? car_not_found_err: "" }
                          {cars.map((data, index) => {
                            return (
                              <div className="flex items-center  border-b-2">
                                <span
                                  key={index}
                                  className="w-full text-center flex  items-center justify-center h-8"
                                >
                                  {data.engine_number}
                                </span>
                                <Radio
                                  id={"radio" + index}
                                  name="engine_number_selector"
                                  value={data.engine_number}
                                  onClick={(e)=>{setEngine_number(e.target.value);setAssign_user_open(true)}}
                                />
                              </div>
                            );
                          })}
                 
                      </div>
                    </AccordionBody>
                  </Accordion>
                  <Accordion open={assign_user_open} icon="">
                    <AccordionHeader>Assign User</AccordionHeader>
                    <AccordionBody>
                      <form onSubmit={MakeCustomer}>
                        <div className="grid gap-y-1">
                          <div>
                            <span className="text-red-400">
                              {user_error ? user_error : ""}
                            </span>
                          </div>
                          <div>
                            <Input
                              label="username"
                              name="username"
                              required
                            ></Input>
                          </div>
                          <div>
                            <Input
                              label="phone"
                              type="number"
                              name="phone"
                              required
                            ></Input>
                          </div>
                          <div>
                            <Input
                              label="address"
                              name="address"
                              required
                            ></Input>
                          </div>
                          <div>
                            <Input
                              label="email"
                              type="email"
                              name="email"
                              required
                            ></Input>
                          </div>
                          <div>
                            <Button
                              type="submit"
                              size="md"
                              className="text-white bg-myblue-600 "
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                      <div className="w-full ">
                        <span className="text-gray-400 text-sm">Default password is phone number</span>
                      </div>
                    </AccordionBody>
                  </Accordion>
                </div>
              </div>
            )}
          </Popup>
        </div>
            <CustomerTable/>


      </div>
    </>
  );
}

export default Customers;

function Options(props) {
  return props.model_names.map((data, index) => {
    return (
      <option key={index} value={data}>
        {data}
      </option>
    );
  });
}
