import React from 'react';
import ReactPlayer from 'react-video-js-player';

// export const Video = (item) => {
//   return <ReactPlayer autoplay muted src={item.src} className="profile__post_video" />;
// };
export const Video = (item) => {
  return <video
      src = {
        item.src
      }
      muted
      autoPlay
      controls="controls"
      width = "240px"
      height = "180px"
      className = "profile__post_video" /
    > ;
};