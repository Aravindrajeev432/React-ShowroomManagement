import { Button } from "@material-tailwind/react";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import useAuthAxios from "../../../utils/useAuthAxios";
import Swal from "sweetalert2";

function MyJobs() {
  let authApi = useAuthAxios();

  let { setGloballoader } = useContext(AuthContext);
  const [uni_part_num_id, setUni_part_num_id] = useState(null);
  const [com_parts, setCom_parts] = useState([]);
  const [parts_used, setParts_used] = useState([]);
  const [service_id, setService_id] = useState();
  const [current_bay_id, setCurrent_Bay_id] = useState();
  const [loader, setLoader] = useState(1);
  const [notfound, setNotFound] = useState(false);

  const [myjob, setMyjob] = useState({
    id: "",
    related_bay: [],
    bay_number: "",
    status: "",
    mechanic_1: "",
  });
  useEffect(() => {
    getMyJob();
  }, []);

  async function getCompatibleParts(id) {
    setGloballoader(true);
    await authApi
      .get(`mechanic/compatible-parts/${id}`)
      .then((res) => {
        console.log(res.data);
        setCom_parts(res.data);
        setGloballoader(false);
      })
      .catch((err) => {});
  }

  async function getMyJob() {
    setGloballoader(true);
    await authApi
      .get(`mechanic/my-current-job`)
      .then((res) => {
        setMyjob(res.data);
        setUni_part_num_id(
          res.data.related_bay[0].current_job.car.uni_car_part_num.id
        );
        getCompatibleParts(
          res.data.related_bay[0].current_job.car.uni_car_part_num.id
        );
        setService_id(res.data.related_bay[0].current_job.id);
        setCurrent_Bay_id(res.data.id);

        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
        setGloballoader(false);
        setNotFound(true);
      });
  }

  //   {
  //     "parts_used": []
  // }
  function servicePartUpdator(e) {
    e.preventDefault();
    console.log(e.target.service_parts.value);
    // console.log(e.target.count.value)
    // data = {
    //     'id':
    // }
    // setArray(oldArray => [...oldArray,newValue] );
    setParts_used((parts_used) => [
      ...parts_used,
      e.target.service_parts.value,
    ]);
  }
  // setFruits((current) =>
  //       current.filter((fruit) => fruit.id !== 2)
  //     );
  function userpartRemover(index) {
    console.log(index);
    setParts_used((current) => current.filter((part, ind) => ind !== index));
  }

  async function MakeBayFree() {
    await authApi
      .patch(`mechanic/make-bay-free/${current_bay_id}`, {
        status: "free",
      })
      .then((res) => {})
      .catch((err) => {});
  }

  async function MechServiceFinish() {
    await authApi
      .patch(`mechanic/service-mech-finish/${service_id}`, {
        status: "billing",
      })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        MakeBayFree();
        setLoader(loader + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function ServiceCompleter(e) {
    e.preventDefault();
    console.log(service_id);

    await authApi
      .patch(`mechanic/services-part-update/${service_id}`, {
        parts_used: parts_used,
      })
      .then((res) => {
        MechServiceFinish();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   {
  //     "id": 2,
  //     "related_bay": [
  //       {
  //         "id": 2,
  //         "current_job": {
  //           "id": 2,
  //           "user": {
  //             "username": "aswanthanu"
  //           },
  //           "advisor": {
  //             "username": "advisor1"
  //           },
  //           "car": {
  //             "model_name": "ALTO",
  //             "model_year": "2022",
  //             "gear_type": "AMT",
  //             "uni_car_part_num": {
  //               "id": 2,
  //               "universal_car_part_number": "ALTO-2022-AMT-PETROL"
  //             }
  //           },
  //           "created_at": "2023-01-23T02:29:20.269407+05:30",
  //           "status": "in-bay",
  //           "finished_at": null,
  //           "is_deleted": false,
  //           "parts_used": [

  //           ]
  //         },
  //         "bay": 2,
  //         "mechanic_1": 14,
  //         "mechanic_2": null
  //       }
  //     ],
  //     "bay_number": 2,
  //     "status": "busy",
  //     "mechanic_1": 14
  //   }
  return (
    <div className="w-full  min-h-screen p-4">
      {notfound ? (
        <div>No Current Job</div>
      ) : (
        <div className="">
          <div>
            <div>
              <span className="text-4xl text-gray-400">
                Current Job Details
              </span>
            </div>
            <div>
              <span className="text-xl">Bay-Number : {myjob.bay_number}</span>
            </div>
            <div>
              <span className="text-xl">Status : {myjob.status}</span>
            </div>
          </div>
          <div className="w-full h-[2px] bg-gray-200"></div>

          <div className="w-full bg-gray-200 rounded-lg mt-2 shadow-lg grid grid-cols-1 md:grid-cols-2 ">
            <div>
              {myjob.related_bay.map((data, index) => {
                return (
                  <div key={index} className="">
                    <div>Customer Name : {data.current_job.user.username}</div>
                    <div>
                      Advisor Name : {data.current_job.advisor.username}
                    </div>
                    <div>Status : {data.current_job.status}</div>
                    <div>created_at : {data.current_job.created_at}</div>
                  </div>
                );
              })}
            </div>
            <div>
              {myjob.related_bay.map((data, index) => {
                return (
                  <div key={index} className="">
                    <div>Model Name : {data.current_job.car.model_name}</div>
                    <div>Model Year : {data.current_job.car.model_year}</div>
                    <div>Gear Type : {data.current_job.car.gear_type}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2">
            Parts
            <form onSubmit={servicePartUpdator}>
              <select className="h-8 " name="service_parts">
                {com_parts.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.unique_part_name} / {data.stock} left
                    </option>
                  );
                })}
              </select>
              {/* <input
              type="number"
              placeholder="Count"
              className="border-0 border-b-2"
              defaultValue={1}
              name='count'
              min={1}
              max={5}
            ></input> */}
              <Button className="bg-myblue-600" type="submit">
                Add
              </Button>
              <Button
                onClick={() => {
                  console.log(parts_used);
                }}
              >
                Test
              </Button>
            </form>
          </div>
          <div>
            {myjob.related_bay.map((data, index) => {
              return (
                <div key={index} className="">
                  {/* {
            "unique_part_name": "HeadLightLeft",
            "price": 200,
            "labour_charge": 200
          } */}
                  {/* <Button onClick={()=>{console.log(com_parts)}}>checkcomparts</Button>
                    <Button onClick={()=>{console.log(parts_used)}}>partsused</Button> */}

                  <div>
                    {parts_used.map((used_data, index1) => {
                      return (
                        <div key={index1}>
                          {com_parts.map((part_data, index2) => {
                            return (
                              <div key={index2}>
                                {part_data.id == used_data ? (
                                  <div className="w-full h-9 ">
                                    {part_data.unique_part_name}--
                                    <span
                                      className="text-blue-300 text-sm cursor-pointer"
                                      onClick={() => {
                                        userpartRemover(index1);
                                      }}
                                    >
                                      remove-index-{index}-i1-{index1}/i2-{index2}
                                    </span>
                                  </div>
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {/* {data.current_job.parts_used.map((data,index)=>{
                        return(
                            <div key={index} className='bg-gray-200'>
                                <div>Part Name : {data.unique_part_name}
                                    </div>
                                    <div>
                                    <div>Price :   {data.price}
                                        </div>
                                        <div>
                                        Labour : {data.labour_charge}
                                        </div>
                                        </div>
                                   
                              
                            </div>
                        )
                    })} */}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <form onClick={ServiceCompleter}>
              <Button className="bg-myblue-600" type="submit">
                Mark as Completed
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
