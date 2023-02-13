import { Button} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import useAuthAxios from "../../../utils/useAuthAxios";
import { AiFillCloseCircle } from "react-icons/ai";
import Popup from "reactjs-popup";
import Swal from "sweetalert2";

function SericeConfig() {
  let authApi = useAuthAxios();
  const [distinctdata, setDistinctdata] = useState([]);
  const [modalopen, setModalopen] = useState(null);
  const [inputs, setInputs] = useState({});
  const [distinctdataunicarnum, setDistinctdataunicarnum] = useState([]);
  const [serviceinfo, setServiceinfo] = useState([]);
    const [pagenumber,setPagenumber] = useState(1)
    const [previous,setPrevious] = useState(false)
    const [next,setNext] = useState(false)
    const [searchkey,setSearchkey] = useState('')
    const [loader,setLoader] = useState(1)


  const [testdata, setTestData] = useState([
    {
      id: 1,
      universal_car_number: "ALTO-2022",
      first_service_km: 1000,
      first_service_month: 1,
      second_service_km: 5000,
      second_service_month: 6,
      third_service_km: 10000,
      third_service_month: 12,
      number_of_free_services: 3,
      afterwards_service_km: 10000,
      afterwards_service_month: 12,
      base_fee: 2500,
    },
  ]);

  const errref = useRef(null);
  useEffect(() => {
    console.log("useeffeect");
    getServiceinfo();
    getData();
    getDistinctUniCarNums();
  }, [pagenumber,searchkey,loader]);

  async function getServiceinfo() {
    await authApi
      .get(`services/showserivceinfo?page=${pagenumber}&search=${searchkey}`)
      .then((res) => {
        console.log(res);
        setServiceinfo(res.data.results);
        setNext(res.data.next)
        setPrevious(res.data.previous)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getDistinctUniCarNums() {
    await authApi
      .get("services/getdistinctunicarnum")
      .then((res) => {
        console.log(res);
        setDistinctdataunicarnum(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getData() {
    await authApi
      .get("services/getunicarnum")
      .then((res) => {
        console.log(res);
        setDistinctdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   {
  //     "universal_car_number": "",
  //     "first_service_km": null,
  //     "first_service_month": null,
  //     "second_service_km": null,
  //     "second_service_month": null,
  //     "third_service_km": null,
  //     "third_service_month": null,
  //     "number_of_free_services": null,
  //     "afterwards_service_km": null,
  //     "afterwards_service_month": null,
  //     "base_fee": null
  // }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSelect = (e) => {
    const uni_car_num = e.label;
    setInputs((values) => ({
      ...values,
      ["universal_car_number"]: uni_car_num,
    }));
  };

  function formValidation() {
    if (inputs.universal_car_number === undefined) {
      errref.current.innerHTML = "Please select a Universal Car Number";
      console.log("universal");
      return false;
    }
    if (inputs.first_service_km === undefined) {
      errref.current.innerHTML = "Invalid 1st Service km";
      console.log("first service");
      return false;
    }
    if (inputs.first_service_km < 10 || inputs.first_service_km > 10000) {
      errref.current.innerHTML = "Invalid 1st Service km";
      console.log("first service");
      return false;
    }
    if (inputs.first_service_month === undefined) {
      errref.current.innerHTML = "Invalid 1st Service month";
      console.log("first service month");
      return false;
    }
    if (inputs.first_service_month < 0 || inputs.first_service_month > 10) {
      errref.current.innerHTML = "Invalid 1st Service month";
      console.log("first service month");
      return false;
    }
    if (inputs.second_service_km === undefined) {
      errref.current.innerHTML = "Invalid 2nd Service km";
      console.log("second service1");
      return false;
    }
    if (inputs.second_service_km <= inputs.first_service_km) {
      errref.current.innerHTML = "Invalid 2nd Service km";
      console.log("second service2");
      return false;
    }
    if (inputs.second_service_month === undefined) {
      errref.current.innerHTML = "Invalid 2nd Service month";
      console.log("second month1");
      return false;
    }
    if (inputs.second_service_month <= inputs.first_service_month) {
      errref.current.innerHTML = "Invalid 2nd Service month";
      console.log("second month2");
      return false;
    }
    // ===
    if (inputs.third_service_km === undefined) {
      errref.current.innerHTML = "Invalid 3rd Service km";
      console.log("third service1");
      return false;
    }
    if (
      parseInt(inputs.third_service_km) <= parseInt(inputs.second_service_km)
    ) {
      console.log(inputs.third_service_km);
      console.log(inputs.second_service_km);
      // 10000 <= 5000
      if (
        parseInt(inputs.third_service_km) <= parseInt(inputs.second_service_km)
      ) {
        console.log("ererer");
      } else {
        console.log("succees");
      }
      errref.current.innerHTML = "Invalid 3rd Service km";
      console.log("third service2");
      return false;
    }
    if (inputs.third_service_month === undefined) {
      errref.current.innerHTML = "Invalid 3rd Service month";
      console.log("third month1");
      return false;
    }
    if (
      parseInt(inputs.third_service_month) <=
      parseInt(inputs.second_service_month)
    ) {
      errref.current.innerHTML = "Invalid 3rd Service month";
      console.log("third month2");
      return false;
    }
    // /===
    if (inputs.afterwards_service_km === undefined) {
      errref.current.innerHTML = "Invalid Afterwards Service km";
      console.log("after service1");
      return false;
    }
    if (inputs.afterwards_service_km <= 0) {
      errref.current.innerHTML = "Invalid Afterwards Service km";
      console.log("after service2");
      return false;
    }
    if (inputs.afterwards_service_month === undefined) {
      errref.current.innerHTML = "Invalid Afterwards Service month";
      console.log("after month1");
      return false;
    }
    if (inputs.afterwards_service_month <= 0) {
      errref.current.innerHTML = "Invalid Afterwards Service month";
      console.log("after month2");
      return false;
    }
    // ===
    if (inputs.number_of_free_services === undefined) {
      errref.current.innerHTML = "Invalid free services";
      return false;
    }
    if (
      inputs.number_of_free_services > 5 ||
      inputs.number_of_free_services < 0
    ) {
      errref.current.innerHTML = "Invalid free services";
      return false;
    }
    if (inputs.base_fee === undefined) {
      errref.current.innerHTML = "Invalid base fee";
      console.log("base fee");
      return false;
    }
    if (inputs.base_fee <= 0 || inputs.base_fee > 25000) {
      errref.current.innerHTML = "Invalid base feee";
      console.log("base fee2");
      return false;
    }

    errref.current.innerHTML = "";
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = formValidation();
    if (valid) {
      console.log("valid");

      authApi
        .post("services/addserviceinfo", {
          ...inputs,
        })
        .then((res) => {
          setModalopen(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoader(loader+1)

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("not valid");
    }
  }



function search(e){
    e.preventDefault()
    console.log(e.target.search.value)
  if(e.target.search.value ==='' ){
setSearchkey('')
  }
  else{
    setSearchkey(e.target.search.value)
  }

}











  return (
    <div>
      <div className="w-full p-4">
        <div className="p-4 flex">
          <Popup
            trigger={
              <Button size="md" className="bg-myblue-600 ">
                <span>Add</span>
              </Button>
            }
            open={modalopen}
            lockScroll
            closeOnDocumentClick={false}
            closeOnEscape={false}
            modal
          >
            {(close) => (
              <div className="bg-white w-96 rounded-lg p-4">
                <div className="absolute right-0 mr-2  ">
                  <div className="">
                    <AiFillCloseCircle
                      onClick={() => {
                        close();
                        setInputs({});
                        errref.current.innerHTML = "";
                      }}
                      className="text-3xl cursor-pointer bg-myblue-600 text-white rounded-full hover:text-myblue-600 hover:bg-white duration-300"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-lg text-gray-500">
                    Add Service Configuration
                  </span>
                </div>
                <div className="h-8 ">
                  <span ref={errref} className="text-red-400 text-sm"></span>
                </div>
                <labe className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Universal Car Number
                </labe>
                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <Select
                      name="unviversal_car_number"
                      options={distinctdata}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleSelect}
                    />
                  </div>

                  <div className="mt-4">
                    {/* <Input label="first service after"></Input> */}

                    <div>
                      <label
                        htmlFor="first_service"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        <span>
                          1<sup>st</sup> Service
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <input
                            name="first_service_km"
                            type="number"
                            id="first_service_km"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Km"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <input
                            name="first_service_month"
                            type="number"
                            id="first_service_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Month"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="second_service_km"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        <span>
                          2<sup>nd</sup> Service
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <input
                            name="second_service_km"
                            type="number"
                            id="second_service_km"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Km"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <input
                            name="second_service_month"
                            type="number"
                            id="second_service_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Month"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="first_service"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        <span>
                          3<sup>rd</sup> Service
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <input
                            name="third_service_km"
                            type="number"
                            id="third_service_km"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Km"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <input
                            name="third_service_month"
                            type="number"
                            id="third_service_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Month"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label
                        htmlFor="afterwards"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        <span>Afterwards</span>
                      </label>
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <input
                            name="afterwards_service_km"
                            type="number"
                            id="afterwards_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Km"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <input
                            name="afterwards_service_month"
                            type="number"
                            id="afterwards_month"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                            placeholder="Month"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="free_service_count"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of free service
                    </label>
                    <input
                      name="number_of_free_services"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                      placeholder="max 5"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="fee"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Base Fee
                    </label>
                    <input
                      name="base_fee"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                      placeholder="₹"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="w-full flex justify-center p-2">
                    <Button type="submit">Submit</Button>
                    <Button
                      onClick={() => {
                        console.log(inputs);
                      }}
                    >
                      Checker
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Popup>
          <form onSubmit={search}>
          <div className=" flex gap-x-2 mx-6">
        

         
            
            <div className="w-80">
            <Select
              className="basic-single"
              classNamePrefix="select"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="search"
              options={distinctdataunicarnum}

            />
                </div>
                <div>
            <Button type='submit' size="md" className="bg-myblue-600">
              Search
            </Button>
          </div>
       
          </div>
          </form>
        </div>
        {/* //   {
  //     "universal_car_number": "",
  //     "first_service_km": null,
  //     "first_service_month": null,
  //     "second_service_km": null,
  //     "second_service_month": null,
  //     "third_service_km": null,
  //     "third_service_month": null,
  //     "number_of_free_services": null,
  //     "afterwards_service_km": null,
  //     "afterwards_service_month": null,
  //     "base_fee": null
  // } */}



<div> {serviceinfo.length===0 ? <div className="w-full text-center">
    <span className="font-sans font-bold text-lg">No data to show</span></div>:''}</div>

        <div className="grid grid-cols-1 gap-y-3 w-full">
          {serviceinfo.map((data, index) => {
            return (
              <div
                key={index}
                className="flex bg-gray-300 rounded-lg shadow-lg overflow-hidden"
              >
                <div className=" rounded-lg  flex justify-center items-center whitespace-nowrap   after:content-[''] after:w-1 after:h-full after:ml-2 after:bg-[#bebebe]">
                  <span className="mx-4">{data.universal_car_number}</span>
                </div>

<div className="w-full">



<div className="flex  justify-evenly w-full">
                  <div className=" flex flex-col  p-2">
                    <div className="">
                      <span>
                        1 <sup>st</sup> Service
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        (year/month)
                      </span>
                    </div>

                    <div className="text-center py-2">
                        <span className="text-xl font-sans">
                        {data.first_service_km}\{data.first_service_month}
                        </span>
                 
                    </div>
                  </div>


                  <div className=" flex flex-col  p-2">
                    <div className="">
                      <span>
                        2 <sup>nd</sup> Service
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        (year/month)
                      </span>
                    </div>

                    <div className="text-center py-2">
                        <span className="text-xl font-sans">
                        {data.second_service_km}\{data.second_service_month}
                        </span>
                 
                    </div>
                  </div>
                  <div className=" flex flex-col  p-2">
                    <div className="">
                      <span>
                        3 <sup>rd</sup> Service
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        (year/month)
                      </span>
                    </div>

                    <div className="text-center py-2">
                        <span className="text-xl font-sans">
                        {data.third_service_km}\{data.third_service_month}
                        </span>
                 
                    </div>


                  </div>
              
                </div>

    <div className="w-full ">
        <div className="w-full flex justify-center">
            <div>
                <div> <span>Afterwards</span></div>
                <div><span className="text-sm text-gray-600">(year/month)</span></div>
           <div>
            <span className="text-xl font-sans">
          

{data.afterwards_service_km}\  {data.afterwards_service_month}
            </span>
    
  
            </div>
      
                </div>

        </div>
        <div className="flex justify-around p-2">

        <div className="">
            <span>Base Fee :</span>
            <span className="text-xl font-sans">
            {data.base_fee} 
            </span>
            </div>

            <div>
<span>Free Services :</span>
           <span className="text-xl font-sans">
           {data.number_of_free_services}
            </span> 
            </div>
       
        </div>

        

  
   

    </div>
</div>
                
              </div>
            );
          })}
        </div>
        <div className="w-full p-2 flex justify-end bottom-0 my-6 ">

<div className="grid grid-cols-2 gap-x-2"><Button onClick={()=>{setPagenumber(pagenumber-1)}} disabled={previous? false: true }>Previous</Button><Button onClick={()=>{setPagenumber(pagenumber+1)}} disabled={next? false: true }>Next</Button></div>

        </div>
      </div>
    </div>
  );
}

export default SericeConfig;
