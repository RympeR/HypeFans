import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { LangContext } from '../../utils/LangProvider';
import { getComputedLeftPosition } from '../../utils/utilities';
import UserBanner from './UserBanner';

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
      <Slider dots={true} arrows={false} autoplay={false} autoplaySpeed={2000}>
        {sliced_array.map((item, index) => {
          return (
            <>
              {item.map((slide, i) => {
                return <UserBanner aside key={`${index + i} slideItem`} profile={slide} />;
              })}
            </>
          );
        })}
      </Slider>
    </aside >
  );
};

export default Aside;
