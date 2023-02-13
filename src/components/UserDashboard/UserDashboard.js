import React, { useEffect, useState } from "react";
import { FaCarAlt, FaRegCalendarAlt, FaCarSide } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import Popup from "reactjs-popup";
import useCustAuthAxios from "../../utils/useCustAuthAxios";
import { Button } from "@material-tailwind/react";

import Swal from "sweetalert2";
import Lottie from "react-lottie";
import Thumsupanimation from "../../lotties/thumbs-up.json";
import Repairanimation from "../../lotties/repair-icon.json";
import Carrepairanimation from "../../lotties/carrrepair.json";
import Billinganimation from "../../lotties/receipt.json";
import Requestedanimation from "../../lotties/weareworkingonit.json";
import useWebSocket from "./useWebSocket";
import ServiceHistory from "./ServiceHistory/ServiceHistory";
function UserDashboard() {
  const [carslist, setCarslist] = useState([]);
  let authApi = useCustAuthAxios();
  let websocket = useWebSocket();

  useEffect(() => {
    console.log("dashboars useeffect");

    getmyCars();
    console.log("useffect");

    websocket.onopen = (event) => {
      console.log("connected111");
    };
    websocket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      getmyCars();
      console.log("onmessage");
    };
  }, []);

  async function getmyCars() {
    await authApi
      .get("/user/mycars")
      .then((res) => {
        console.log(res);
        setCarslist(res.data);
      })
      .catch((err) => {
        console.log("userdashboard errr");
        console.log(err);
      });
  }

  function MakeServiceRequest(car_id) {
    let data = {
      car: car_id,
    };
    console.log(car_id);
    Swal.fire({
      title: "Are you sure?",
      text: "Want to Make Request ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authApi
          .post("services/requestservice", data)
          .then((res) => {
            Swal.fire("Success", "We accepted the request", "success");
            getmyCars();
          })
          .catch((err) => {
            Swal.fire("Something went Wrong", "Your request denied.", "error");
          });
      }
    });
  }

  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-col gap-y-4 p-2">
        <div className="w-full p-4">
          {carslist.map((data, index) => {
            return (
              <div
                key={index}
                className="w-full rounded-md shadow-xl my-4 p-4   flex flex-col md:flex-row justify-center md:justify-evenly "
              >
                <div className=" grid place-items-center p-2">
                  <div>
                    <img
                      src={data.image}
                      alt="sampleimage"
                      className="w-[250px]"
                    ></img>
                  </div>
                </div>
                <div className=" ">
                  <div className="w-full flex justify-between">
                    <div className=" p-2 flex flex-col justify-center items-center">
                      {" "}
                      <FaCarAlt></FaCarAlt> {data.model_name}
                    </div>
                    <div className="p-2 flex flex-col justify-center items-center">
                      <FaRegCalendarAlt />
                      {data.model_year}
                    </div>
                    <div className="p-2 flex flex-col justify-center items-center ">
                      <FaCarSide></FaCarSide>
                      {data.type}
                    </div>
                    <div className="p-2 flex flex-col justify-center items-center">
                      {" "}
                      <GiGearStickPattern /> {data.gear_type}
                    </div>
                  </div>
                  <div className="">
                    <span className="text-gray-400">Additional Details</span>
                    <div className="flex flex-wrap flex-col">
                      <span>Colour:{data.colour}</span>
                      <span>Engine power:{data.engine_power}</span>
                      <span>Wheel base:{data.wheel_base}</span>
                      <span>Fuel type:{data.fuel_type}</span>
                      <span>Gears :{data.gear_count}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-x-3">
                    <Popup
                      trigger={
                        <Button className="bg-myblue-600">
                          Get Service History
                        </Button>
                      }
                      modal
                      lockScroll={true}
                    >
                      {close => (
                      <ServiceHistory car={data.id} close={close}/>
                      )}
                    </Popup>
                  </div>
                  <div className=" w-full h-4 lg:hidden md:hidden  flex justify-center items-center ">
                    <div className="w-4/5 h-[2px]  bg-[#cccccc] rounded-lg"></div>
                  </div>
                </div>
                <div className=" h-full flex flex-col">
                  <div className="w-full flex justify-center text-xl text-gray-500"></div>
                  {/* <div className='w-full flex justify-center items-center'>
  <ReactSpeedometer
  maxValue={200000}
  value={15000}
  needleColor="black"
  startColor="green"
  maxSegmentLabels={5}
  segments={8555}
  endColor="red"
  dimensionUnit="px"
  height="19"
/>

  </div> */}
                  <div>
                    {/* 
  {
    "id": 6,
    "last_service_date": null,
    "is_service_needed": null,
    "model_name": "ALTO",
    "model_year": "2023",
    "type": "Hatchback",
    "colour": "Blue",
    "price": "100000",
    "chase_number": "1212AB99321",
    "engine_number": "ASE111GHE48",
    "seat_capacity": 5,
    "gear_type": "AMT",
    "gear_count": "5",
    "engine_cc": "1000",
    "fuel_type": "Petrol",
    "engine_power": "110",
    "engine_torque": "40",
    "wheel_base": "15",
    "is_active": true,
    "is_deleted": false,
    "delivered_date": null,
    "verified_by": "advisor1",
    "universal_car_number": "ALTO-2023",
    "universal_part_number": "ALTO-2023-AMT-PETROL",
    "user": 12
} */}

                    <div>
                      <span>Service Status</span>
                    </div>
                    {/* <span> -{data.last_service_date}- </span>
                    <span>ser{data.is_service_needed}</span> */}
                    <div>
                      {data.current_service_status && (
                        <span className="text-center text-align font-sans">
                          {/* {data.current_service_status} */}
                        </span>
                      )}

                      {data.is_service_needed === "first" && (
                        <div className="w-full">
                          <RepairConnect />
                          <div className="text-align w-full  flex justify-center">
                            <span className="text-align font-sans">
                              Time for First Service
                            </span>
                          </div>
                          <div className="w-full flex justify-center">
                            <Button
                              className="bg-myblue-600 hover:bg-myblue-400"
                              onClick={() => {
                                MakeServiceRequest(data.id);
                              }}
                            >
                              <div className="flex flex-row justify-center gap-x-1 text-md md:text-lg  items-center">
                                <span className="">
                                  <MdMiscellaneousServices />
                                </span>
                                <span className="text-sm">
                                  Make a Request Now !{data.id}
                                </span>
                              </div>
                            </Button>
                          </div>
                        </div>
                      )}

                      {data.is_service_needed === "second" && (
                        <div className="w-full">
                          <RepairConnect />
                          <div className="text-align w-full  flex justify-center">
                            <span className="text-align font-sans">
                              Time for First Service
                            </span>
                          </div>
                          <div className="w-full flex justify-center">
                            <Button
                              className="bg-myblue-600 hover:bg-myblue-400"
                              onClick={() => {
                                MakeServiceRequest(data.id);
                              }}
                            >
                              <div className="flex flex-row justify-center gap-x-1 text-md md:text-lg  items-center">
                                <span className="">
                                  <MdMiscellaneousServices />
                                </span>
                                <span className="text-sm">
                                  Make a Request Now !
                                </span>
                              </div>
                            </Button>
                          </div>
                        </div>
                      )}

                      {data.is_service_needed === "third" && (
                        <div className="w-full">
                          <RepairConnect />
                          <div className="text-align w-full  flex justify-center">
                            <span className="text-align font-sans">
                              Time for First Service
                            </span>
                          </div>
                          <div className="w-full flex justify-center">
                            <Button
                              className="bg-myblue-600 hover:bg-myblue-400"
                              onClick={() => {
                                MakeServiceRequest(data.id);
                              }}
                            >
                              <div className="flex flex-row justify-center gap-x-1 text-md md:text-lg  items-center">
                                <span className="">
                                  <MdMiscellaneousServices />
                                </span>
                                <span className="text-sm">
                                  Make a Request Now !{data.id}
                                </span>
                              </div>
                            </Button>
                          </div>
                        </div>
                      )}

                      {data.is_service_needed == "afterwards" && (
                        <div className="w-full">
                          <RepairConnect />
                          <div className="text-align w-full  flex justify-center">
                            <span className="text-align font-sans">
                              Time for First Service
                            </span>
                          </div>
                          <div className="w-full flex justify-center">
                            <Button
                              className="bg-myblue-600 hover:bg-myblue-400"
                              onClick={() => {
                                MakeServiceRequest(data.id);
                              }}
                            >
                              <div className="flex flex-row justify-center gap-x-1 text-md md:text-lg  items-center">
                                <span className="">
                                  <MdMiscellaneousServices />
                                </span>
                                <span className="text-sm">
                                  Make a Request Now !{data.id}
                                </span>
                              </div>
                            </Button>
                          </div>
                        </div>
                      )}

                      {data.current_service_status === null &&
                        data.is_service_needed === null && (
                          <div>
                            <div>
                              <AnimationConnect />
                              <div className="text-align w-full mt-2 flex justify-center">
                                <span className="text-align font-sans ">
                                  No Pending Services
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                      {data.current_service_status === "in-bay" &&
                        data.is_service_needed === null && (
                          <div>
                            <div>
                              <CarRepairInbay />
                              <div className="text-align w-full mt-2 flex justify-center">
                                <span className="text-align font-sans">
                                  In Service
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      {data.current_service_status === "requested" &&
                        data.is_service_needed === null && (
                          <div>
                            <div>
                              <CarRequested />
                              <div className="text-align w-full mt-2 flex justify-center">
                                <span className="text-align font-sans">
                                  Requested
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                      {data.current_service_status === "assigned" &&
                        data.is_service_needed === null && (
                          <div>
                            <div>
                              <CarRequested />
                              <div className="text-align w-full mt-2 flex justify-center">
                                <span className="text-align font-sans">
                                  Job assigned to a Advisor
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                      {data.current_service_status === "billing" &&
                        data.is_service_needed === null && (
                          <div>
                            <div>
                              <CarBilling />
                              <div className="text-align w-full mt-2 flex justify-center">
                                <span className="text-align font-sans">
                                  Our Employee will contact you
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

function AnimationConnect() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Thumsupanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
}

function RepairConnect() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Repairanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}

function CarRepairInbay() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Carrepairanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}

function CarBilling() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Billinganimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}
function CarRequested() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Requestedanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}
