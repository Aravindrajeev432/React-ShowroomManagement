import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import useAuthAxios from "../../../utils/useAuthAxios";
import Swal from "sweetalert2";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

import { useState } from "react";

export default function DisplayCards(props) {
  let authApi = useAuthAxios();

  const [editmodelopan, setEditmodelopen] = useState(false);

  async function toggler(e) {
    let data = {};
    console.log(e.target.checked);
    console.log(e.target.value);
    data = { is_active: e.target.checked };
    console.log(data);
    await authApi
      .patch(`frontdesk/displaycarsstatusupdator/${e.target.value}`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          toast: true,
          timerProgressBar: true,
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        props.GetDisplayCars();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          toast: true,
          timerProgressBar: true,
          title: "Something went Wrong ",
          showConfirmButton: false,
          timer: 1500,
          width: 500,
          height: 10,
        });
      });
  }

  return (
    <Card className="w-64" key={props.index}>
      <CardHeader
        floated={false}
        className="h-60  flex justify-center items-center"
      >
        {/* <img src={props.data.image} alt="car-picture" /> */}

        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          navigation={true}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {props.data.carimg.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                {" "}
                <img src={data.image} alt="car-picture2"></img>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {props.data.model_name}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {props.data.model_year}/
          {props.data.gear_type.map((data, index) => {
            return (
              <>
                <span key={index}>{data.label}</span>
                <span>-</span>
              </>
            );
          })}
        </Typography>
        <Typography>
          {props.data.fuel_type.map((data, index) => {
            return <span key={index}>{data.label}-</span>;
          })}
        </Typography>

        <div>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value={props.data.id}
              name="checkbox"
              onChange={toggler}
              className="sr-only peer"
              checked={props.data.is_active}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              is active
            </span>
          </label>
        </div>

        {/* Edit Button */}
        {/* <div className="flex justify-center">
          
          <Popup  trigger={<div  className="bg-myblue-300  text-white w-8 h-8 rounded-full shadow-xl hover:scale-125 duration-300 flex justify-center items-center cursor-pointer">
       <AiFillEdit></AiFillEdit>
          </div>} modal>
          {close => (


    <span> Modal content{props.data.model_name} </span>

          )}
  </Popup>

        </div> */}
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2 bg-gray-200">
        {props.data.colour.map((data, index) => {
          return (
            <span key={index}>
              <Tooltip content={`${data.label}`}>
                <div
                  className="w-8 h-8 rounded-full shadow-xl hover:scale-125 duration-300"
                  style={{ background: `${data.label}` }}
                ></div>
              </Tooltip>
            </span>
          );
        })}
      </CardFooter>
    </Card>
  );
}
