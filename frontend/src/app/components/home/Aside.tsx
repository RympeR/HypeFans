import React, { useContext, useEffect, useState } from 'react';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { LangContext } from '../../utils/LangContext';
import { getComputedLeftPosition, getComputedWidth } from '../../utils/utilities';
import UserBanner from './UserBanner';
SwiperCore.use([Pagination, Autoplay]);

const Aside = () => {
  const chosenLang = useContext(LangContext);

  const [leftFixedPosition, setLeftFixedPosition] = useState<number>(0);

  const [fixedWidth, setFixedWidth] = useState<number>(0);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    setLeftFixedPosition(getComputedLeftPosition(47));
    setFixedWidth(getComputedWidth(47));
  }, [windowWidth]);

  return (
    <aside className="aside" style={{ left: leftFixedPosition, width: fixedWidth }}>
      <p className="aside__title">{chosenLang.also}</p>

      <Swiper pagination={true} spaceBetween={20} loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }}>
        <SwiperSlide>
          <UserBanner aside />

          <UserBanner aside />

          <UserBanner aside />
        </SwiperSlide>

        <SwiperSlide>
          <UserBanner aside />

          <UserBanner aside />

          <UserBanner aside />
        </SwiperSlide>

        <SwiperSlide>
          <UserBanner aside />

          <UserBanner aside />

          <UserBanner aside />
        </SwiperSlide>
      </Swiper>
    </aside>
  );
};

export default Aside;
