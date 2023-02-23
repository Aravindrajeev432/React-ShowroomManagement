import React, { useContext, useEffect, useState } from "react";
import useAuthAxios from "../../../utils/useAuthAxios";
import Popup from "reactjs-popup";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function Services() {
  let { baseUrl } = useContext(AuthContext);
  let authApi = useAuthAxios();
  let { setGloballoader } = useContext(AuthContext);
  const [requestedservices, setRequestedservices] = useState([]);
  const [assignedservices, setAssignedservices] = useState([]);
  const [in_bayservices, setIn_bayservices] = useState([]);
  const [billing, setBillingservices] = useState([]);
  const [finished, setFinishedservices] = useState([]);

  const [available_advisor, setAvailable_advisor] = useState([]);
  useEffect(() => {
    console.log("in useeffect");
    getReqServiceData("requested");
    getAsgServiceData("assigned");
    getInServiceData("in-bay");
    getBillingServiceData("billing");
    getFinishedServiceData("finished");
    getAvailableAdvisors();
  }, []);

  async function getReqServiceData(status) {
    setGloballoader(true);
    await authApi
      .get(`services/services/${status}`)
      .then((res) => {
        console.log(res.data);
        setRequestedservices(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getAsgServiceData(status) {
    setGloballoader(true);
    await authApi
      .get(`services/services/${status}`)
      .then((res) => {
        console.log(res.data);
        setAssignedservices(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getInServiceData(status) {
    setGloballoader(true);
    await authApi
      .get(`services/services/${status}`)
      .then((res) => {
        console.log(res.data);
        setIn_bayservices(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getBillingServiceData(status) {
    setGloballoader(true);
    await authApi
      .get(`services/services/${status}`)
      .then((res) => {
        console.log(res.data);
        setBillingservices(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getFinishedServiceData(status) {
    setGloballoader(true);
    await authApi
      .get(`services/services/${status}`)
      .then((res) => {
        console.log(res.data);
        setFinishedservices(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getAvailableAdvisors() {
    setGloballoader(true);
    await authApi
      .get("advisor/available")
      .then((res) => {
        console.log(res);
        setAvailable_advisor(res.data);
        setGloballoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function advisorAssign(e) {
    e.preventDefault();

    console.log(e.target.service_id.value);
    console.log(e.target.advisors_id.value);
    await authApi
      .patch(`services/service-assign-advisor/${e.target.service_id.value}`, {
        advisor: e.target.advisors_id.value,
        status: "assigned",
      })
      .then((res) => {
        console.log(res);

        getReqServiceData("requested");
        getAsgServiceData("assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function filedownloader(id) {
    axios
      .get(`${baseUrl}/services/billgenerator/${id}`, { responseType: "blob" })
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
  }

  async function Servicecompleter(id) {
    authApi
      .post("services/servicecompleter", {
        service_id: id,
        make_complete: true,
      })
      .then((res) => {
        getBillingServiceData("billing");
        getFinishedServiceData("finished");
      })
      .catch((err) => {});
  }

  return (
    <div className="p-2">
      <div>
        <span>Requested</span>
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <td scope="col" class="px-6 py-3">
                User
              </td>
              <th scope="col" class="px-6 py-3">
                Car
              </th>
              <th scope="col" class="px-6 py-3">
                Created at
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
              <th scope="col" class="px-6 py-3">
                Assigned to
              </th>
            </tr>
          </thead>
          <tbody>
            {requestedservices.length === 0 ? (
              <tr>
                <td colSpan={5}>No Data Available</td>
              </tr>
            ) : (
              ""
            )}
            {requestedservices.map((data, index) => {
              return (
                <tr key={index} class="bg-white border-b">
                  <th
                    scope="row"
                    class=" py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {data.user.username}({data.user.phone_number})
                  </th>
                  <td class="px-6 py-4">{data.car.model_name}</td>
                  <td class="px-6 py-4">{data.created_at}</td>
                  <td class="px-6 py-4">{data.status}</td>
                  <td class="px-6 py-4">
                    <Popup
                      trigger={
                        <span className="text-blue-300 text-sm cursor-pointer">
                          Assign now
                        </span>
                      }
                      modal
                    >
                      {(close) => (
                        <div className="w-96 bg-white rounded-lg p-2">
                          <div>
                            <div className="w-full  flex justify-end">
                              {/* <span onClick={()=>{close()}}>close</span> */}
                              <button
                                className="close text-2xl w-8 h-8 border  border-white  bg-myblue-500 duration-300 text-white rounded-full flex justify-center items-center hover:text-myblue-500 hover:bg-white hover:border-myblue-500"
                                onClick={close}
                              >
                                &times;
                              </button>
                            </div>
                            <div>
                              <form onSubmit={advisorAssign}>
                                <div className="my-2">
                                  <span
                                    className="text-2xl text-gray-400 my-2 
                                after:content-[''] after:block after:bg-gray-400 after:rounded-lg after:w-full after:h-[2px]
                                "
                                  >
                                    Available Advisors{data.id}
                                  </span>
                                  <input
                                    type="hidden"
                                    name="service_id"
                                    value={data.id}
                                  ></input>
                                  <div className="my-2">
                                    <select
                                      name="advisors_id"
                                      className="w-full h-8 bg-white "
                                    >
                                      {available_advisor.map((data, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={data.advisor.id}
                                          >
                                            {data.advisor.username}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                                <div className="w-full flex justify-center">
                                  <Button
                                    type="submit"
                                    className="bg-myblue-600"
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </form>
                            </div>

                            <div></div>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <div>
          <span>Assigned</span>
        </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User
                </th>
                <th scope="col" class="px-6 py-3">
                  Car
                </th>
                <th scope="col" class="px-6 py-3">
                  Created at
                </th>
                <th scope="col" class="px-6 py-3">
                  status
                </th>
                <th scope="col" class="px-6 py-3">
                  Assigned to
                </th>
              </tr>
            </thead>
            <tbody>
              {assignedservices.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Data Available</td>
                </tr>
              ) : (
                ""
              )}

              {assignedservices.map((data, index) => {
                return (
                  <tr key={index} class="bg-white border-b">
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.user.username}({data.user.phone_number})
                    </td>
                    <td class="px-6 py-4">{data.car.model_name}</td>
                    <td class="px-6 py-4">{data.created_at}</td>
                    <td class="px-6 py-4">{data.status}</td>
                    <td class="px-6 py-4">{data.advisor.username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span>In-Bay</span>
        </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User
                </th>
                <th scope="col" class="px-6 py-3">
                  Car
                </th>
                <th scope="col" class="px-6 py-3">
                  Created at
                </th>
                <th scope="col" class="px-6 py-3">
                  status
                </th>
                <th scope="col" class="px-6 py-3">
                  Assigned to
                </th>
              </tr>
            </thead>
            <tbody>
              {in_bayservices.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Data Available</td>
                </tr>
              ) : (
                ""
              )}

              {in_bayservices.map((data, index) => {
                return (
                  <tr key={index} class="bg-white border-b">
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.user}({data.user.phone_number})
                    </td>
                    <td class=" py-4">{data.car.model_name}</td>
                    <td class=" py-4">{data.created_at}</td>
                    <td class="py-4">{data.status}</td>
                    <td class=" py-4">{data.advisor.username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span>Billing</span>
        </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class=" py-3">
                  User
                </th>
                <th scope="col" class=" py-3">
                  Car
                </th>

                <th scope="col" class=" py-3">
                  status
                </th>

                <th scope="col" class=" py-3">
                  Assigned to
                </th>
                <th scope="col" class=" py-3">
                  Generatebill
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {billing.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Data Available</td>
                </tr>
              ) : (
                ""
              )}
              {billing.map((data, index) => {
                return (
                  <tr key={index} class="bg-white border-b">
                    <td class=" py-4 font-medium text-gray-900 whitespace-nowrap">
                      {data.user.username}({data.user.phone_number})
                    </td>
                    <td class=" py-4">{data.car.model_name}</td>
                    {/* <td class=" py-4">{data.created_at}</td> */}

                    <td class=" py-4">{data.status}</td>

                    <td class=" py-4">{data.advisor.username}</td>
                    <td className="py-4">
                      <span
                        className="text-blue-300 cursor-pointer"
                        onClick={() => {
                          filedownloader(data.id);
                        }}
                      >
                        Bill
                      </span>
                    </td>
                    <td>
                      <Button
                        className="bg-myblue-600"
                        onClick={() => {
                          Servicecompleter(data.id);
                        }}
                      >
                        Make Completed
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span>Finished</span>
        </div>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User
                </th>
                <th scope="col" class="px-6 py-3">
                  Car
                </th>
                <th scope="col" class="px-6 py-3">
                  Created at
                </th>
                <th scope="col" class="px-6 py-3">
                  status
                </th>
                <th scope="col" class="px-6 py-3">
                  Assigned to
                </th>
                <th scope="col" class="px-6 py-3">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {finished.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Data Available</td>
                </tr>
              ) : (
                ""
              )}
              {finished.map((data, index) => {
                return (
                  <tr key={index} class="bg-white border-b">
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.user.username}
                    </td>
                    <td class="px-6 py-4">{data.car.model_name}</td>
                    <td class="px-6 py-4">{data.created_at}</td>
                    <td class="px-6 py-4">{data.status}</td>
                    <td class="px-6 py-4">{data.advisor.username}</td>
                    <td class="px-6 py-4"><span onClick={() => {
                          filedownloader(data.id);
                        }} className="text-blue-400 cursor-pointer">Download</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Services;

const ServiceDetailsModal = () => (
  <Popup trigger={<button className="button"> Show </button>} modal>
    <span> Modal content </span>
  </Popup>
);
