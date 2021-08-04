import React, { useContext, useEffect, useState } from 'react';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { LangContext } from '../../utils/LangProvider';
import { getComputedLeftPosition } from '../../utils/utilities';
import UserBanner from './UserBanner';
SwiperCore.use([Pagination, Autoplay]);

const Aside = () => {
  const { currentLang } = useContext(LangContext);

  const [leftFixedPosition, setLeftFixedPosition] = useState<number>(0);

  const handleWindowResize = async () => {
    const leftPosition = (await getComputedLeftPosition(47)) as number;
    setLeftFixedPosition(leftPosition);
  };

  useEffect(() => {
    const asyncHandle = async () => {
      await handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
    };

    asyncHandle();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <aside className="aside" style={{ left: leftFixedPosition }}>
      <p className="aside__title">{currentLang.also}</p>

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
