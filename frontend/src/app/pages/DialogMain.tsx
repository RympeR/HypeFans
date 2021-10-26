import React from 'react';
import { ReactComponent as ImageIcn } from '../../assets/images/imageI.svg';
import { ReactComponent as MicrIcon } from '../../assets/images/micI.svg';
import { ReactComponent as More } from '../../assets/images/more-vertical.svg';
import { ReactComponent as Vektor } from '../../assets/images/send.svg';
import { ReactComponent as Tip } from '../../assets/images/tipI.svg';
import { ReactComponent as VideoIcn } from '../../assets/images/videoI.svg';

export const DialogMain = () => {
  const MoreIcon = () => <More />;
  const VektorIcon = () => <Vektor />;
  const TipIcon = () => <Tip />;
  const MicIcon = () => <MicrIcon />;
  const VideoIcon = () => <VideoIcn />;
  const ImageIcon = () => <ImageIcn />;
  return (
    <div className="chat__dialogsMain">
      <div className="chat__dialogsHeader">
        <div className="chat__sidebarItem" style={{ alignItems: 'center' }}>
          <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="fdsfsdfsd"></img>
          <div>
            <h2>Группа ZZZZZZZ</h2>
            <p
              style={{
                fontFamily: 'Factor A',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '15px',
                color: ' #000000'
              }}
            >
              3 участника
            </p>
          </div>
        </div>
        <div style={{ marginRight: '24px' }}>
          <MoreIcon />
        </div>
      </div>
      <div className="chat__dialog">
        <div className="message-wrap">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div className="text-wrapp">Привет,как дела? </div>
              <div className="time-text">15:33</div>
            </div>
          </div>
        </div>
        <div className="chat__input">
          <div className="chat__text">
            <input></input>
            <button>
              <VektorIcon />
            </button>
          </div>
          <div style={{ margin: '0px 24px', marginBottom: '8px' }}>
            <TipIcon />
            <MicIcon />
            <VideoIcon />
            <ImageIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
