import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { LangContext } from '../utils/LangContext';
import UserBanner from './UserBanner';

const Aside = () => {
  const chosenLang = useContext(LangContext);
  const settings = {
    dots: true,
    infinite: true,
    // speed: 1500,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    customPaging: () => {
      return <div className="aside__slider-dot"></div>;
    }
  };
  const [leftFixedPosition, setLeftFixedPosition] = useState<number>(0);
  const [fixedWidth, setFixedWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });
  useEffect(() => {
    const main = document.getElementById('main');
    const postList = document.getElementById('postlist');

    const mainMarginLeft = +window.getComputedStyle(main!).marginLeft.match(/\d+(?:\.\d+)?/g)!;

    const postListWidth = +window.getComputedStyle(postList!).width.match(/\d+(?:\.\d+)?/g)!;

    const mainWidth = +window.getComputedStyle(main!).width.match(/\d+(?:\.\d+)?/g)!;

    setLeftFixedPosition(postListWidth + mainMarginLeft + 47);

    setFixedWidth(mainWidth - postListWidth - 47);
  }, [windowWidth]);

  return (
    <aside className="aside" style={{ left: leftFixedPosition, width: fixedWidth }}>
      <p className="aside__title">{chosenLang.also}</p>

      <Slider {...settings}>
        <div className="aside__slider-slide">
          <UserBanner aside />
          <UserBanner aside />
          <UserBanner aside />
        </div>
        <div className="aside__slider-slide">
          <UserBanner aside />
          <UserBanner aside />
          <UserBanner aside />
        </div>
        <div className="aside__slider-slide">
          <UserBanner aside />
          <UserBanner aside />
          <UserBanner aside />
        </div>
      </Slider>
    </aside>
  );
};

export default Aside;
