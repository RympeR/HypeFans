import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import { chatAPI } from '~/api/chatAPI';
import { RootState } from '~/redux/redux';
import { ReactComponent as ImageIcn } from '../../assets/images/imageI.svg';
import { ReactComponent as MicrIcon } from '../../assets/images/micI.svg';
import { ReactComponent as More } from '../../assets/images/more-vertical.svg';
import { ReactComponent as Vektor } from '../../assets/images/send.svg';
import { ReactComponent as Tip } from '../../assets/images/tipI.svg';
import { ReactComponent as VideoIcn } from '../../assets/images/videoI.svg';
import { getLastUrlPoint } from '../utils/utilities';

export const DialogMain = ({ rooms }: { rooms: any }) => {
  const history = useHistory();
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const MoreIcon = () => <More />;
  const VektorIcon = () => <Vektor />;
  const TipIcon = () => <Tip />;
  const MicIcon = () => <MicrIcon />;
  const VideoIcon = () => <VideoIcn />;
  const ImageIcon = () => <ImageIcn />;
  const [messages, setMessages] = useState([]);

  const uid = useSelector((state: RootState) => state.auth.pk);
  useEffect(() => {
    const createNewChat = async () => {
      const response = await chatAPI.getChatMessages(Number(lastUrl));
      setMessages(response);
    };
    createNewChat();
  }, [lastUrl]);
  console.log(rooms.find((item: any) => item.room.id === Number(lastUrl))?.room);
  return (
    <div className="chat__dialogsMain">
      <div className="chat__dialogsHeader">
        <div className="chat__sidebarItem" style={{ alignItems: 'center' }}>
          <img
            src={rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.avatar}
            alt="fdsfsdfsd"
          ></img>
          <div>
            <h2>{rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.username}</h2>
            {/* <p
              style={{
                fontFamily: 'Factor A',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '11px',
                lineHeight: '15px',
                color: ' #000000'
              }}
            >
              3 участника
            </p> */}
          </div>
        </div>
        <Popup
          trigger={
            <div style={{ marginRight: '24px' }}>
              <MoreIcon />
            </div>
          }
          position="bottom right"
        >
          <div style={{ padding: '5px', fontSize: '11px' }}>
            <button>Отключить уведомления</button>
          </div>
          <div style={{ padding: '5px', fontSize: '11px' }}>
            <button>Посмотреть вложения</button>
          </div>
          <div style={{ padding: '5px', fontSize: '11px' }}>
            <button>Копировать ссылку на профиль</button>
          </div>
          <div style={{ padding: '5px', fontSize: '11px' }}>
            <button>Убрать из всех групп</button>
          </div>
          <div style={{ padding: '5px', fontSize: '11px' }}>
            <button>Заблокировать</button>
          </div>
        </Popup>
      </div>
      <div className="chat__dialog">
        <div className="message-wrap">
          {messages.map((item, index) => {
            return (
              <div
                style={
                  item.user.pk === uid
                    ? { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }
                    : { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }
                }
                key={index}
              >
                <div>
                  <div className="text-wrapp">{item.text}</div>
                  <div className="time-text">15:33</div>
                </div>
              </div>
            );
          })}
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
