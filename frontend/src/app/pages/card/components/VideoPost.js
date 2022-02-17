import React from 'react';
import ReactPlayer from 'react-video-js-player';

export const Video = (item) => {
  return <ReactPlayer autoplay muted src={item.src} className="profile__post_video" />;
};
