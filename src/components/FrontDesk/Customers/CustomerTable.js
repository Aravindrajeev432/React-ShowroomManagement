import React, { useEffect, useState } from "react";
import useAuthAxios from "../../../utils/useAuthAxios";
import Popup from "reactjs-popup";
import { SpinnerCircularSplit } from "spinners-react";
import { SlClose } from "react-icons/sl";
import { Button, Input, Radio } from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import Swal from "sweetalert2";
function CustomerTable() {
  const [spinnerloading, setSpinnerloading] = useState(true);
  const [customerlist, setCustomerlist] = useState([]);
  const [usereditmodal, setUsereditmodel] = useState(null);
  const [ediusermodal, setEditorusermodel] = useState(false);
  const [model_year_filter, setModel_year_filter] = useState("");
  const [model_name_filter, setModel_name_filter] = useState("");
  const [model_gear_type_filter, setModel_gear_type_filter] = useState("");
  const [model_colour_filter, setModel_colour_filter] = useState("");
  const [car_not_found_err, setCar_not_found_err] = useState("");
  const [car_det_open, setCar_det_open] = useState(false);
  const [assign_user_open, setAssign_user_open] = useState(false);
  const [open, setOpen] = useState(0);
  const [cardata, setCardata] = useState({});
  const [engine_number, setEngine_number] = useState("");
  const [user_error, setUser_error] = useState(null);
  const [cars, setCars] = useState([]);

  const [inputs, setInputs] = useState({
    model_name: "",
    model_year: "",
    type: "",
    gear_type: "",
    colour: "",
  });

  const authApi = useAuthAxios();

  useEffect(() => {
    CustomerList();
    getCarFilters();
  }, []);

  async function CustomerList() {
    authApi
      .get("frontdesk/get-customer")
      .then((res) => {
        console.log(res);
        console.log("customer table");
        setCustomerlist(res.data);
        setSpinnerloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function getCars() {
    console.log("getcarddetails");
    await authApi
      .get(
        `frontdesk/check-car-availability?type=${inputs.type}&model_year=${inputs.model_year}&model_name=${inputs.model_name}&gear_type=${inputs.gear_type}&colour=${inputs.colour}&page=1`
      )
      .then((res) => {
        console.log(res);
        if (res.data.results.length === 0) {
          console.log("ZERO");
          setAssign_user_open(false);
          setCar_not_found_err("Nothing Found");
        } else {
          setCar_not_found_err(null);
        }

        setCars(res.data.results);
        // resetting engine number
        setEngine_number("");
        setCar_det_open(true);
      })
      .catch((err) => {
        console.log(err);
        // resetting engine number
        setEngine_number("");
        setCar_not_found_err("Not Found");
        setCar_det_open(true);
      });
  }

  async function UpdateuserCars(e) {
    e.preventDefault();
    console.log(inputs);
    console.log(engine_number);
    console.log(e.target.userid.value);
    await authApi
      .post("frontdesk/update-customer", {
        engine_number: engine_number,
        user_id: e.target.userid.value,
      })
      .then((res) => {
        setUsereditmodel(false);
        setCar_det_open(false);
        setCar_not_found_err(null);
        setCardata({});
        setInputs({
          model_name: "",
          model_year: "",
          type: "",
          gear_type: "",
          colour: "",
        });
        setAssign_user_open(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        CustomerList();

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setUsereditmodel(false);
        setCar_det_open(false);
        setCar_not_found_err(null);
        setCardata({});
        setInputs({
          model_name: "",
          model_year: "",
          type: "",
          gear_type: "",
          colour: "",
        });
        setAssign_user_open(false);
      });
  }

  return (
    <div className="w-full  h-2 p-4">
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Customer Name
              </th>
              <th scope="col" className="py-3 px-6">
                Cars
              </th>
              <th scope="col" className="py-3 px-6">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {customerlist.map((data, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td>{index + 1}</td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.username}
                  </th>
                  <td className="py-4 px-6">
                    <span className="w-full flex flex-col">
                      {data.usercar.map((data, index) => {
                        return (
                          <span key={index}>
                            {data.model_name},({data.model_year}),(
                            {data.gear_type})
                          </span>
                        );
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-blue-400 underline cursor-pointer">
                      <Popup
                        open={usereditmodal}
                        closeOnDocumentClick={false}
                        trigger={
                          <button className="button underline text-blue-400 cursor-pointer">
                            {" "}
                            Edit{" "}
                          </button>
                        }
                        modal
                      >
                        {(close) => (
                          <div
                            className="p-5  bg-white rounded-sm"
                            style={{ width: "400px" }}
                          >
                            <div className="flex justify-end text-2xl text-gray-600 hover:text-black">
                              <SlClose
                                onClick={() => {
                                  close();
                                  setCar_det_open(false);
                                  setCar_not_found_err(null);
                                  setCardata({});
                                  setInputs({
                                    model_name: "",
                                    model_year: "",
                                    type: "",
                                    gear_type: "",
                                    colour: "",
                                  });
                                  setAssign_user_open(false);
                                }}
                              />
                            </div>
                            <div
                              className="text-2xl text-black"
                              onClick={() => console.log(usereditmodal)}
                            >
                              {data.username}
                            </div>

                            <div>
                              <Accordion open={true} icon="">
                                <AccordionHeader className="poin">
                                  Select A Car
                                </AccordionHeader>
                                <AccordionBody>
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
                                        <Options
                                          model_names={model_name_filter}
                                        ></Options>
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
                                        <Options
                                          model_names={model_year_filter}
                                        ></Options>
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
                                    <div className="col-span-2 py-2 flex justify-center">
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
                            </div>
                            <div>
                              <Accordion open={car_det_open} icon="">
                                <AccordionHeader>Car Details</AccordionHeader>
                                <AccordionBody className="text-center">
                                  <div className="flex flex-col h-28 p-3 border-2 overflow-scroll">
                                    {car_not_found_err ? car_not_found_err : ""}
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
                                            onClick={(e) => {
                                              setEngine_number(e.target.value);
                                              setAssign_user_open(true);
                                            }}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </AccordionBody>
                              </Accordion>
                            </div>
                            <div>
                              <Accordion open={assign_user_open} icon="">
                                <AccordionHeader>Assign User</AccordionHeader>
                                <AccordionBody>
                                  <div className="w-full flex justify-center">
                                    <form onSubmit={UpdateuserCars}>
                                      <input
                                        name="userid"
                                        type="hidden"
                                        value={data.id}
                                      ></input>
                                      <Button
                                        type="submit"
                                        className="bg-myblue-600"
                                      >
                                        Update
                                      </Button>
                                    </form>
                                  </div>
                                </AccordionBody>
                              </Accordion>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </span>
                    {/* <button className="button" onClick={()=>setEditorusermodel(true)}> Open Modal </button>

<UserEditModal username={data.username}/> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Popup open={spinnerloading}>
        <div className="modal p-5">
          <SpinnerCircularSplit size="200px" color="#ffffff" />
        </div>
      </Popup>
    </div>
  );
}

export default CustomerTable;
function Options(props) {
  return props.model_names.map((data, index) => {
    return (
      <option key={index} value={data}>
        {data}
      </option>
    );
  });
}
