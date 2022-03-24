import React, { useEffect, useState } from 'react';
import MicRecorder from "mic-recorder-to-mp3"

export const AudioRecorder = ({ audioMessage, setAudioMessage }) => {
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }))

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
      {!audioMessage ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={() => {
            if (!isActive) {
              Mp3Recorder.start()
            } else {
              Mp3Recorder
                .stop()
                .getMp3().then(([buffer, blob]) => {
                  setAudioMessage(new File(buffer, 'voiceMessage.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  }))
                }).catch((e) => {
                  console.log(e);
                });
            }

            setIsActive(!isActive);
            return null
          }}>
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={isActive ? '#FF6B6B' : "#646464"} strokeWidth="1" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.9628 1.25C14.9682 1.25 14.0144 1.64509 13.3111 2.34835C12.6079 3.05161 12.2128 4.00544 12.2128 5V15C12.2128 15.9946 12.6079 16.9484 13.3111 17.6517C14.0144 18.3549 14.9682 18.75 15.9628 18.75C16.9573 18.75 17.9112 18.3549 18.6144 17.6517C19.3177 16.9484 19.7128 15.9946 19.7128 15V5C19.7128 4.00544 19.3177 3.05161 18.6144 2.34835C17.9112 1.64509 16.9573 1.25 15.9628 1.25V1.25Z" stroke={isActive ? '#FF6B6B' : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24.7128 12.5V15C24.7128 17.3206 23.7909 19.5462 22.15 21.1872C20.509 22.8281 18.2834 23.75 15.9628 23.75C13.6421 23.75 11.4165 22.8281 9.77558 21.1872C8.13464 19.5462 7.21277 17.3206 7.21277 15V12.5" stroke={isActive ? '#FF6B6B' : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.9628 23.75V28.75" stroke={isActive ? '#FF6B6B' : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.9628 28.75H20.9628" stroke={isActive ? '#FF6B6B' : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ) : null}
      <div
        className={"chat__audio " + (audioMessage ? "open" : "")}
        style={{ display: 'flex', alignItems: 'center' }}>
        {audioMessage !== null ? <audio src={URL.createObjectURL(audioMessage)} controls /> : null}
        {audioMessage ? (
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
                setAudioMessage(null);
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
