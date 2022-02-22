import React, { useEffect, useState } from 'react';
import { ReactComponent as MicIcon } from '../../../assets/images/micI.svg';
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
          <MicIcon
            style={isActive ? { fill: 'red' } : {}}
            onClick={() => {
              if (!isActive) {
                Mp3Recorder.start()
              } else {
                Mp3Recorder
                  .stop()
                  .getMp3().then(([buffer, blob]) => {
                    setAudioMessage(new File(buffer, 'me-at-thevoice.mp3', {
                      type: blob.type,
                      lastModified: Date.now()
                    }))
                  }).catch((e) => {
                    alert('We could not retrieve your message');
                    console.log(e);
                  });
              }

              setIsActive(!isActive);
              return console.log('fdsf');
            }}
          />
        </div>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
