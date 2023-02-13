import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useAuthAxios from "../../../utils/useAuthAxios";
import { Button } from "@material-tailwind/react";
import Popup from "reactjs-popup";
import Swal from "sweetalert2";

function Jobs() {
  let { user } = useContext(AuthContext);
  const [freebays, setFreebays] = useState([]);
  const [currentjobs, setCurrentjobs] = useState([]);

  let authApi = useAuthAxios();
  useEffect(() => {
    getJobs();
    getFreeBays();
  }, []);

  async function getFreeBays() {
    await authApi
      .get("services/getfreebays")
      .then((res) => {
        console.log(res);
        setFreebays(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getJobs() {
    await authApi
      .get(`advisor/current-jobs/${user.user_id}`)
      .then((res) => {
        console.log(res.data);
        setCurrentjobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    console.log(e.target.service_id.value);
    console.log(e.target.freebayselect.value);
    // {
    //     "bay": null,
    //     "current_job": null,
    //     "mechanic_1": null,
    //     "mechanic_2": null
    // }
    let data = {
      bay: e.target.freebayselect.value,
      current_job: e.target.service_id.value,
    };
    await authApi
      .post("advisor/assign-job-to-bay", data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          toast: true,
          timerProgressBar: true,
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        getJobs();
        getFreeBays();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // {
  //     "id": 2,
  //     "service_bay": {
  //         "bay": null,
  //         "current_job": null,
  //         "mechanic_1": null,
  //         "mechanic_2": null
  //     },
  //     "created_at": "2023-01-23T02:29:20.269407+05:30",
  //     "status": "assigned",
  //     "finished_at": null,
  //     "is_deleted": false,
  //     "user": 12,
  //     "car": 1,
  //     "advisor": 3
  // }

  //   <div className="w-full p-2">

  //   <select name="freebayselect" className="w-4/5">
  //       {freebays.map((data,index)=>{
  //           return(
  //               <option key={index} value={data.id}>{data.bay_number}</option>
  //           )
  //       })}
  //   </select>

  //   </div>

  return (
    <div>
      <div className="p-6">
        <div>
          <span className="text-xl text-gray-500">Bay Status</span>
        </div>
        <div>
          <div className="flex  items-center gap-y-2 ">
            <div className="bg-red-400 w-2 h-2 rounded-full"></div>
            <div>
              <span>Mechanic online</span>
            </div>
          </div>
          <div className="flex items-center gap-y-2">
            <div className="bg-green-400 w-4 h-2"></div>
            <div>
              <span>Free</span>
            </div>
          </div>
        </div>
        <div className="w-full flex  gap-x-2">
          {freebays.map((data, index) => {
            return (
              <div className="relative">
              <div
                key={index}
                className={`w-12 h-12 rounded-full  ${data.mechanic_1? "before:content-[''] before:right-0 before:top-0 before:w-2 before:h-2 before:rounded-full before:bg-red-300 before:absolute" :'' }   grid place-items-center`}
                style={
                  data.status === "busy"
                    ? { background: "red" }
                    : { background: "green" }
                }
              >
                {data.bay_number}
              </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        {/* row */}
        <div className="p-6 grid grid-cols-3 lg:grid-cols-4 gap-y-4 ">
          {currentjobs.map((data, index) => {
            return (
              <div
                key={index}
                className="w-48 h-36 p-2 bg-gray-200 shadow-lg rounded-lg"
              >
                <div>
                  <div>
                    <div>Bay Number</div>
                    <div>
                      {data.status === "in-bay" ? (
                        <span>
                          {data.service_bay.map((data, index) => {
                            return (
                              <div
                                key={index}
                                className="text-2xl w-9 h-9 rounded-full bg-white grid place-items-center"
                              >
                                {data.bay}
                              </div>
                            );
                          })}
                        </span>
                      ) : (
                        <Popup
                          trigger={
                            <Button size="sm" className="bg-myblue-600">Assign </Button>
                          }
                          modal
                        >
                          <div className="w-96 bg-white p-4">
                            <div>
                              <span className="text-gray-400 text-2xl">
                                Assign to Free Bay
                              </span>
                            </div>

                            <form onSubmit={HandleSubmit}>
                              {" "}
                              <div className="w-full p-2">
                                <input
                                  type="hidden"
                                  name="service_id"
                                  value={data.id}
                                ></input>
                                <label>Bay Number</label>
                                <select
                                  name="freebayselect"
                                  className="w-full bg-gray-200 "
                                >
                                  {freebays.map((data, index) => {
                                    return (
                                      <option key={index} value={data.id}>
                                        {data.bay_number}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="flex w-full justify-center">
                                <Button type="submit" className="bg-myblue-600">
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </div>
                        </Popup>
                      )}
                    </div>
                  </div>
                  <div>
                    <span>Car - {data.car.model_name}-{data.car.model_year}</span>
                  </div>
                  <div>
                    <span>User - {data.user.username}</span>
                  </div>
                  <div>Status - {data.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
