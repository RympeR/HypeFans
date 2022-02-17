import React, { useEffect, useState } from 'react';
import { ReactComponent as MicIcon } from '../../../assets/images/micI.svg';

export const AudioRecorder = ({ startRecording, stopRecording, mediaBlobUrl, clearBlobUrl }) => {
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 650);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
  }

  return (
    <div>
      {!mediaBlobUrl ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MicIcon
            style={isActive ? { fill: 'red' } : {}}
            onClick={() => {
              if (!isActive) {
                startRecording();
              } else {
                stopRecording();
              }

              setIsActive(!isActive);
              return console.log('fdsf');
            }}
          />
        </div>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {mediaBlobUrl !== null ? <audio src={mediaBlobUrl} controls /> : null}
        {mediaBlobUrl ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                borderRadius: '100%',
                backgroundColor: 'grey',
                width: '15px',
                height: '15px',
                display: 'flex',
                margin: '15px',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black'
              }}
              onClick={() => {
                stopTimer();
                clearBlobUrl();
              }}
            >
              x
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
