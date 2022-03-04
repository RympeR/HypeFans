import React from 'react';
import ReactPlayer from 'react-video-js-player';


export const Video = (item) => {
  return <video 
            src = {
              item.src
            }
            muted
            hideControls={['timer','playbackrates','fullscreen']}
            width = "240px"
            height = "180px" 
          /> ;
  };

