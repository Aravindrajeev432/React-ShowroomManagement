import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useAuthAxios from "../../../utils/useAuthAxios";

function CarAvailability() {

  let { setGloballoader } = useContext(AuthContext);

  const [cars, setCars] = useState([]);
  const [typefilter, setTypefilter] = useState("");
  const [model_yearfilter, setModel_yearfilter] = useState("");
  const [model_namefilter, setModenamefilter] = useState("");
  const [pagenumber, setPagenumber] = useState(1);

  const [nextpage, setNextpage] = useState("");
  const [prevpage, setPrevpage] = useState("");

  const [model_names, setModel_names] = useState([]);
  const [model_years, setModel_years] = useState([]);
  const [types, setTypes] = useState([]);

  let authApi = useAuthAxios();

  useEffect(() => {
    getCars(pagenumber);
    getCarFilters();
  }, [pagenumber]);

  async function getCars(page) {
    setGloballoader(true)
    console.log("get cars");
    await authApi
      .get(
        `frontdesk/check-car-availability?type=${typefilter}&model_year=${model_yearfilter}&model_name=${model_namefilter}&page=${page}`
      )
      .then((res) => {
        setCars(res.data.results);
        setNextpage(res.data.next);
        setPrevpage(res.data.previous);
        setGloballoader(false)
      })
      .catch((err) => {
        setGloballoader(true)
      });
  }
  async function getCarFilters() {
    await authApi
      .get("frontdesk/get-filter-data")
      .then((res) => {
        console.log(res.data.model_names);
        setModel_names(res.data.model_names);
        setModel_years(res.data.model_years);
        setTypes(res.data.types);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
  
      <div className="w-full">
        <div className="w-full p-4">
          <span className="text-4xl text-gray-600">Check Car Availability</span>
          <div className="w-full h-1 bg-gray-400 rounded-sm mt-1"></div>
        </div>
        <div className="w-full p-4 flex justify-evenly">
          <div className="w-32">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Model Name
            </label>
            <select
              id="model_name"
              name="model_name"
              onChange={(e) => {
                setModenamefilter(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="" selected>
                Any
              </option>
              {model_names.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-32">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Model Year
            </label>
            <select
              id="model_name"
              name="model_name"
              onChange={(e) => {
                setModel_yearfilter(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Any
              </option>
              {model_years.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-32">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              id="model_name"
              name="model_name"
              onChange={(e) => {
                setTypefilter(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Any
              </option>
              {types.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-32 grid place-items-center">
            <Button
              size="lg"
              className="bg-myblue-600"
              onClick={() => getCars(pagenumber)}
            >
              Submit{" "}
            </Button>
          </div>
        </div>
        <div className="w-full p-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  No
                </th>
                <th scope="col" className="py-3 px-6">
                  Model Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Model year
                </th>
                <th scope="col" className="py-3 px-6">
                  type
                </th>
                <th scope="col" className="py-3 px-6">
                  Engine Number
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((data, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{data.model_name}</td>
                    <td className="py-4 px-6">{data.model_year}</td>
                    <td className="py-4 px-6">{data.type}</td>
                    <td className="py-4 px-6">{data.engine_number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end p-4">
          <span
            onClick={() => {
              setPagenumber(pagenumber - 1);
            }}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
              prevpage ? "text-gray-500" : "text-gray-200 pointer-events-none"
            } bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
          >
            Previous
          </span>
          <span
            onClick={() => {
              setPagenumber(pagenumber + 1);
            }}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
              nextpage ? "text-myblue-600" : "text-gray-200 pointer-events-none"
            } bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer `}
          >
            Next
          </span>
        </div>
      </div>
    
  );
}

export default CarAvailability;
