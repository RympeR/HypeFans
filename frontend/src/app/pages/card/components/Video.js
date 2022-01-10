import React from 'react';
import ReactPlayer from 'react-video-js-player';

export const Video = (item) => {
  return <ReactPlayer src={item.src} width="240px" height="180px" />;
};
