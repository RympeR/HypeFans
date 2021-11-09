import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Popup from 'reactjs-popup';
import { chatAPI } from '~/api/chatAPI';
import { userAPI } from '~/api/userAPI';
import { RootState } from '~/redux/redux';
import { ReactComponent as ImageIcn } from '../../assets/images/imageI.svg';
import { ReactComponent as MicrIcon } from '../../assets/images/micI.svg';
import { ReactComponent as More } from '../../assets/images/more-vertical.svg';
import { ReactComponent as Vektor } from '../../assets/images/send.svg';
import { ReactComponent as Tip } from '../../assets/images/tipI.svg';
import { ReactComponent as VideoIcn } from '../../assets/images/videoI.svg';
import { getLastUrlPoint } from '../utils/utilities';

const Input = ({ sendMessage }: { sendMessage: any }) => {
  const [messageText, setMessageText] = useState('');
  const VektorIcon = () => <Vektor />;
  return (
    <div className="chat__text">
      <input value={messageText} onChange={(val) => setMessageText(val.currentTarget.value)}></input>
      <button onClick={() => sendMessage(messageText, setMessageText)}>
        <VektorIcon />
      </button>
    </div>
  );
};

export const DialogMain = ({ rooms }: { rooms: any }) => {
  const history = useHistory();
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const MoreIcon = () => <More />;
  const TipIcon = () => <Tip />;
  const MicIcon = () => <MicrIcon />;
  const VideoIcon = () => <VideoIcn />;
  const ImageIcon = () => <ImageIcn />;
  const [ws, setWs] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState([]);

  const uid = useSelector((state: RootState) => state.auth.pk);

  useEffect(() => {
    const wsClient = new WebSocket(`wss://hype-fans.com/ws/chat/${lastUrl}/`);
    wsClient.onopen = () => {
      console.log('ws opened');
      setWs(wsClient);
    };
    wsClient.onclose = () => console.log('ws closed');

    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (e: any) => {
      const message = JSON.parse(e.data);
      setMessages((oldMessages) => [message, ...oldMessages]);
    };
  }, [ws]);

  const sendMessage = (message: string, setMessageText: any) => {
    ws.send(JSON.stringify({ text: message, user: uid, attachments: [], room_id: lastUrl, message_id: 0 }));
    return setMessageText('');
  };

  useEffect(() => {
    const recieveChatMessages = async () => {
      const response = await chatAPI.getChatMessages(Number(lastUrl));
      setMessages(response);
    };
    recieveChatMessages();
  }, [lastUrl]);

  const sendTip = async (amount: number, reciever: number) => {
    const data = await userAPI.createDonation({ amount, sender: uid, reciever });
    if (data.status === 200) {
      return setShowTip(false);
    } else if (data.status === 451) {
      setShowTip(false);
      return console.log('Не хватает средств');
    } else {
      return console.log('ошибка сервера');
    }
  };

  const blockUser = async (id: number) => {
    await userAPI.blockUser({ user: id });
  };

  return (
    <div className="chat__dialogsMain">
      <div className="chat__dialogsHeader">
        <div className="chat__sidebarItem" style={{ alignItems: 'center' }}>
          <img
            src={rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.avatar}
            alt="fdsfsdfsd"
          ></img>
          <div>
            <h2>{rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.first_name}</h2>
            <h2
              style={{
                fontFamily: 'Factor A',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '18px',
                lineHeight: '20px',
                color: '#000000'
              }}
            >
              @{rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.username}
            </h2>
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
            <button
              onClick={() => blockUser(rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.pk)}
            >
              Заблокировать
            </button>
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
          <Input sendMessage={sendMessage} />
          <div style={{ margin: '0px 24px', marginBottom: '8px', display: 'flex' }}>
            <div onClick={() => setShowTip(true)}>
              <TipIcon />
            </div>
            <MicIcon />
            <VideoIcon />
            <ImageIcon />
          </div>
        </div>
      </div>
      <Modal
        show={showTip}
        onHide={() => {
          setShowTip(false);
        }}
        centered
        size="sm"
        style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: '0px' }}>
          <Formik
            initialValues={{
              donation_amount: 0
            }}
            onSubmit={(obj) => {
              console.log(obj);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
                  <h2>Отправить донат</h2>
                  <div className="chat__sidebarItem" style={{ alignItems: 'center', padding: '0px' }}>
                    <img
                      src={rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.avatar}
                      alt="fdsfsdfsd"
                    ></img>
                    <div>
                      <h2>{rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.first_name}</h2>
                      <h2
                        style={{
                          fontFamily: 'Factor A',
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                          fontSize: '18px',
                          lineHeight: '20px',
                          color: '#000000'
                        }}
                      >
                        @{rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.username}
                      </h2>
                    </div>
                  </div>
                  <CurrencyInput
                    prefix="$"
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      padding: '8px',
                      marginTop: '16px'
                    }}
                    name="donation_amount"
                    value={values.donation_amount}
                    placeholder="$ Введите сумму..."
                    decimalsLimit={2}
                    onValueChange={(value, name) => setFieldValue(name, value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <h3 onClick={() => setShowTip(false)}>Отмена</h3>
                    <div style={{ width: '20px' }}></div>
                    <h3
                      style={{ color: '#FB5734' }}
                      onClick={() =>
                        sendTip(
                          values.donation_amount,
                          rooms.find((item: any) => item.room.id === Number(lastUrl))?.room?.user?.pk
                        )
                      }
                    >
                      Отправить
                    </h3>
                  </div>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
