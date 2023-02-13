import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import { IoIosCloseCircle } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import useAuthAxios from "../../../utils/useAuthAxios";
import Swal from "sweetalert2";
import CompactibleModal from "./CompatibleCars";
import PartUpdator from "./PartUpdator";

function Parts() {
  let authApi = useAuthAxios();

  const [modalopen, setModelopen] = useState(null);
  const [options, setOptions] = useState([]);

  const [inputs, setInputs] = useState({});
  const [partsdata, setPartsdata] = useState([]);
  const [search, setSearch] = useState("");

  const errRef = useRef(null);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    getunicarnum();
    getparts();
  }, [search]);

  const getparts = async () => {
    await authApi
      .get(`parts/parts?search=${search}`)
      .then((res) => {
        console.log(res);
        setPartsdata(res.data.results);
      })
      .catch((err) => {});
  };

  const getunicarnum = async () => {
    await authApi
      .get("parts/unicarpartnumbers")
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function compatible_carsarrayHandler(e) {
    console.log(e);

    let comptible_cararrays = [];
    e.map((data) => {
      //   setGear_typesarr(arr=>[...arr,data.value])
      comptible_cararrays.push(data.value);
    });
    setInputs((values) => ({
      ...values,
      ["compatible_cars"]: comptible_cararrays,
    }));
  }

  function validation() {
    setModelopen(true);
    console.log(inputs.unique_part_name);

    if (inputs.unique_part_name === undefined) {
      errRef.current.innerHTML = "Invalid Part Name";
      return false;
    }
    if (inputs.stock === undefined) {
      errRef.current.innerHTML = "Invalid Stock";
      return false;
    }
    if (inputs.stock <= 0 || inputs.stock > 10000) {
      errRef.current.innerHTML = "Invalid Stock";
      return false;
    }
    if (inputs.price === undefined) {
      errRef.current.innerHTML = "Invalid Price";
      return false;
    }

    if (inputs.price <= 0 || inputs.price > 100000) {
      errRef.current.innerHTML = "Invalid Price";
      return false;
    }
    if (inputs.labour_charge === undefined) {
      errRef.current.innerHTML = "Invalid Price";
      return false;
    }

    if (inputs.labour_charge <= 0 || inputs.labour_charge > 100000) {
      errRef.current.innerHTML = "Invalid Price";
      return false;
    }

    if (inputs.compatible_cars === undefined) {
      errRef.current.innerHTML = "Invalid compatible cars";
      return false;
    }
    if (inputs.compatible_cars.length <= 0) {
      errRef.current.innerHTML = "Invalid compatible cars";
      return false;
    }
    errRef.current.innerHTML = "";
    return true;
  }

  function formHandler(e) {
    e.preventDefault();
    if (validation()) {
      console.log("succes");
      authApi
        .post("parts/parts", { ...inputs })
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
          setInputs({});
          setModelopen(false);
          getparts();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            position: "top-end",
            toast: true,
            icon: "error",
            timerProgressBar: true,
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
          setInputs({});
          setModelopen(false);
        });
    } else {
      console.log("failure");
    }
  }

  function searchHandler(e) {
    e.preventDefault();
    setSearch(e.target.search.value);
    console.log(e.target.search.value);
  }

  return (
    <div className="p-4">
      <div className="w-full flex gap-x-8">
        <div>
          <Modal
            modalopen={modalopen}
            options={options}
            setInputs={setInputs}
            inputs={inputs}
            handleChange={handleChange}
            compatible_carsarrayHandler={compatible_carsarrayHandler}
            errRef={errRef}
            formHandler={formHandler}
          ></Modal>
        </div>

        <form onSubmit={searchHandler}>
          <div className="flex gap-x-8">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-white w-full p-1 border-b-2 focus:outline-none"
            ></input>
            <Button
              type="submit"
              className="bg-myblue-600 grid place-items-center"
            >
              <span className="text-xl">
                <BiSearchAlt />
              </span>
            </Button>
          </div>
        </form>
      </div>
      <div className="my-4 after:content-[''] after:block after:h-[2px] after:bg-[#ececec] after:w-full ">
        <span className="text-4xl text-gray-500">Parts</span>
      </div>

      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Parts name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Labour Charge
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Compactable with
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {partsdata.map((data, index) => {
                return (
                  <tr key={index} className="bg-white border-b ">
                    <td className="px-6 py-4 ">{data.unique_part_name}</td>
                    <td className="px-6 py-4">{data.price}</td>
                    <td className="px-6 py-4">{data.labour_charge}</td>
                    <td className="px-6 py-4">{data.stock}</td>
                    {/* <td className="px-6 py-4">{data.compatible_cars.map((data,index)=>{
                            return (
                                <span>     {data.universal_car_part_number}</span>
                           
                            )
                        })}</td> */}
                    <td className="px-6 py-4">
                      <CompactibleModal data={data.compatible_cars} />
                    </td>
                    <td className="px-6 py-4">
                      {/* {
    "id": 2,
    "unique_part_name": "HeadLightRight",
    "stock": 3,
    "price": 200,
    "labour_charge": 200,
    "compatible_cars": [
        1
    ]
} */}
                      <PartUpdator
                        part={{
                          id: data.id,
                          unique_part_name: data.unique_part_name,
                          stock: data.stock,
                          price: data.price,
                          labour_charge: data.labour_charge,
                          compatible_cars: data.compatible_cars,
                          options:options
                        }}

                        getparts={getparts}
                      />
                    </td>
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

export default Parts;
// {
//     "unique_part_name": "",
//     "stock": null,
//     "compatible_cars": []
// }

const Modal = (props) => (
  <Popup
    trigger={
      <Button
        className="bg-myblue-600 text-white "
        onClick={() => props.setModelopen(true)}
      >
        Add A Part
      </Button>
    }
    open={props.modalopen}
    modal
    closeOnDocumentClick={false}
  >
    {(close) => (
      <div className="w-96 bg-white  p-2 rounded-md">
        <div>
          <div className="text-2xl w-full flex justify-end cursor-pointer text-myblue-600 hover:text-myblue-300">
            <IoIosCloseCircle
              onClick={() => {
                close();
                props.setInputs({});
                props.errRef.innerHTML = "";
              }}
            />
          </div>
          <div className="">
            <span className="text-gray-500 text-2xl">Add New Part</span>
          </div>
          <div className="h-4">
            <span ref={props.errRef} className="text-red-300"></span>
          </div>
          <div className="my-2">
            <form onSubmit={props.formHandler}>
              <div className="my-2">
                <input
                  name="unique_part_name"
                  onChange={props.handleChange}
                  className="bg-white w-full p-1 border-b-2"
                  type="text"
                  placeholder="Part Name"
                ></input>
              </div>
              <div className="my-2">
                <input
                  name="stock"
                  onChange={props.handleChange}
                  className="bg-white w-full p-1 border-b-2"
                  type="number"
                  placeholder="Stock"
                ></input>
              </div>

              <div className="my-2">
                <input
                  name="price"
                  onChange={props.handleChange}
                  className="bg-white w-full p-1 border-b-2"
                  type="number"
                  placeholder="Price"
                ></input>
              </div>

              <div className="my-2">
                <input
                  name="labour_charge"
                  onChange={props.handleChange}
                  className="bg-white w-full p-1 border-b-2"
                  type="number"
                  placeholder="Labour Charge"
                ></input>
              </div>

              <div className="my-2">
                <Select
                  name="compatible_cars"
                  onChange={props.compatible_carsarrayHandler}
                  options={props.options}
                  isMulti
                />
              </div>

              <div className="my-2 w-full flex justify-center">
                <Button className="bg-myblue-600" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div><Button onClick={()=>{console.log(props.inputs)}}>Check</Button></div>
        </div>
      </div>
// ......


    )}
  </Popup>
);
