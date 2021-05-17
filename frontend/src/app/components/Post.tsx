import React from 'react';

const Post = () => {
  return (
    <div className="post">
      <div className="post__top">
        <div className="post__top-left">
          <svg width="71" height="70" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35.4766" cy="35" r="35" fill="url(#paint0_linear)" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.7672 18.2002H18.6765V36.4573L28.7672 28.6792V18.2002ZM52.2763 27.0709L28.7672 45.1922V51.8002H18.6765V40.2399L19.0726 39.9346L19.0711 39.9327L42.9944 21.4921H52.0908L52.2763 21.7264V27.0709ZM42.0174 38.8742L52.2764 30.9664V41.7665H52.2765V51.8006H42.0174V41.7665H42.0174V38.8742Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="-2.05692"
                y1="1.48879e-06"
                x2="100.421"
                y2="74.1302"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6644" />
                <stop offset="0.796432" stopColor="#FF485C" />
                <stop offset="1" stopColor="#FF1A6C" />
              </linearGradient>
            </defs>
          </svg>

          <div>
            <h3 className="post__brand">HypeFans</h3>
            <a href="#">@hypefans</a>
          </div>
        </div>
        <div className="post__top-right">
          <p>50 мин назад</p>
          <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.58838 9.40472C3.14066 9.40472 3.58838 8.99968 3.58838 8.50003C3.58838 8.00038 3.14066 7.59534 2.58838 7.59534C2.03609 7.59534 1.58838 8.00038 1.58838 8.50003C1.58838 8.99968 2.03609 9.40472 2.58838 9.40472Z"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.58838 3.07193C3.14066 3.07193 3.58838 2.66688 3.58838 2.16722C3.58838 1.66756 3.14066 1.26251 2.58838 1.26251C2.03609 1.26251 1.58838 1.66756 1.58838 2.16722C1.58838 2.66688 2.03609 3.07193 2.58838 3.07193Z"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.58838 15.7376C3.14066 15.7376 3.58838 15.3325 3.58838 14.8329C3.58838 14.3333 3.14066 13.9282 2.58838 13.9282C2.03609 13.9282 1.58838 14.3333 1.58838 14.8329C1.58838 15.3325 2.03609 15.7376 2.58838 15.7376Z"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="post__caption">
        Сняли перчатки, поскольку чемпион по боксу @TonyBellew присоединился к нам на HypeFans 🥊 Он предлагает
        возможность присоединиться к нему за пределами ринга. Вы можете отследить невиданные ранее кадры фитнеса и
        тренировок, а также взглянуть на его образ жизни. Так что дайте ему лучший шанс на:
        http://hypefans.com/tonybellew
      </p>
      <a href="#" className="post__user-link"></a>
    </div>
  );
};

export default Post;
