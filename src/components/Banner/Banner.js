import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import car1 from "../../assets/car1.webp"
import car2 from "../../assets/car2.webp"
import car3 from "../../assets/car3.webp"


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Banner() {
  return (
    <div className='w-full bannerdiv'>
 <Swiper  spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
    <SwiperSlide><img src={car1} className="object-cover w-full  md:h-[600px]" alt="carimg"></img></SwiperSlide>
    <SwiperSlide><img src={car2} className="object-cover w-full md:h-[600px]" alt="carimg"></img></SwiperSlide>
    <SwiperSlide><img src={car3} className="object-cover w-full md:h-[600px]" alt="carimg"></img></SwiperSlide>

  </Swiper>

    </div>
   
  )
}

export default Banner