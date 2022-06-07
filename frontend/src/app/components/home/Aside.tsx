import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { LangContext } from '../../utils/LangProvider';
import { getComputedLeftPosition } from '../../utils/utilities';
import UserBanner from './UserBanner';
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper"
import "swiper/css";
import "swiper/css/autoplay";

const Aside = ({ recommendations }: { recommendations: Array<any> }) => {
  const { currentLang } = useContext(LangContext);

  if (recommendations?.length < 5) {
    return null;
  }


  const sliced_array = [];

  for (let i = 0; i < recommendations?.length; i += 3) {
    sliced_array.push(recommendations.slice(i, i + 3));
  }

  // setInterval(handleWindowResize, 1);
  // style={{ left: leftFixedPosition }}
  return (
    <aside className="aside">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20} loop={true} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} init={true} preloadImages={true} >
        {sliced_array.map((item, index) => {
          return (
            <SwiperSlide>
              {item.map((slide, i) => {
                return <UserBanner aside key={`${index + i} slideItem`} profile={slide} />;
              })}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </aside >
  );
};

export default Aside;
