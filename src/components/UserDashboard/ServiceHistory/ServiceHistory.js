import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import useCustAuthAxios from "../../../utils/useCustAuthAxios";

function ServiceHistory(props) {
  const [service_data, setService_data] = useState([]);
  const [loading, setLoading] = useState(true);
  let authApi = useCustAuthAxios();

  useEffect(() => {
    console.log("service history ");
    getServiceData();
  }, []);
  async function getServiceData() {
    authApi
      .get(`user/servicehistory/${props.car}`)
      .then((res) => {
        console.log(res.data);
        setService_data(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log();
      });
  }

  return (
    <div className="bg-white w-max p-4">
      <div className="flex justify-end">
        <div onClick={props.close} className="w-8 h-8 rounded-full border-2 flex justify-center duration-300 items-center hover:bg-myblue-600 hover:text-white ">
          <span className="text-2xl flex ">&times;</span>
        </div>
      </div>
      <div className="after:content-[''] after:block after:bg-gray-300 after:h-[2px]">
        <span className="text-2xl text-gray-400">ServiceHistory</span>
      </div>

      {loading ? (
        <Skelton />
      ) : (
        <div>
          {service_data.length === 0 ? (
            <span className="text-gray-400">No Service has Done</span>
          ) : (
            ""
          )}
        </div>
      )}

      {/* [
    {
        "id": 1,
        "service": {
            "id": 2,
            "created_at": "2023-01-23T02:29:20.269407+05:30",
            "status": "finished",
            "is_free": true,
            "car": 1,
            "advisor": 3
        },
        "amount": 350,
        "parts_total": 350,
        "labour_charge": 100,
        "is_free": true
    }
] */}

      <div className="my-2">
        {service_data.map((data, index) => {
          return (
            <div key={index} className="p-2 flex flex-row border-2">
              <div className="grid place-items-center p-2">
                {data.service.car.model_name}
              </div>
              <div className="grid grid-rows-3">
                <div className="">
                  created at :{" "}
                  {moment(data.service.created_at).format("d MMM YYYY")}
                </div>
                <div className="">Amount Paid : {data.amount}</div>
                <div>
                  <span className="text-blue-400 text-sm underline cursor-pointer">
                    Download Invoice
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
}

export default ServiceHistory;

function Skelton() {
  return (
    <div
      role="status"
      className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse  md:p-6 "
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
