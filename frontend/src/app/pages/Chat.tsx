import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, useHistory } from 'react-router-dom';
import { RootState } from '~/redux/redux';
import { ReactComponent as BackIcon } from '../../assets/images/arrow-left.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as UsersIcon } from '../../assets/images/users.svg';
import { getLastUrlPoint } from '../utils/utilities';
import { DialogMain } from './DialogMain';
import { NoDialog } from './NoDialog';
const Chat = () => {
  const userId = useSelector((state: RootState) => state.auth.pk);
  const history = useHistory();
  const BackButton = () => <BackIcon onClick={history.goBack} />;
  const Plus = () => <PlusIcon />;
  const UserIcon = () => <UsersIcon />;
  const [rooms, setRooms] = useState([]);
  const [isSended, setSended] = useState(false);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);

  if (isLoading) {
    return <div>fdfd</div>;
  }

  const ws = new WebSocket(`wss://hype-fans.com/ws/chat-rooms/${userId}/`);

  ws.onopen = () => {
    if (isSended) {
      return;
    } else {
      setSended(true);
      ws.send(
        JSON.stringify({
          room: 0
        })
      );
    }
  };

  ws.onmessage = (e) => {
    console.log(JSON.parse(e.data).room);
    return setRooms(JSON.parse(e.data).room);
  };

  const SidebarItem = (item: any) => {
    const history = useHistory();
    const lastUrl = getLastUrlPoint(history.location.pathname);
    return (
      <Link to={`/chat/${item?.item?.room?.id}`}>
        <div
          style={
            lastUrl !== item?.item?.room?.id
              ? { display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }
              : { display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.2),', backgroundColor: 'red' }
          }
        >
          <div className="chat__sidebarItem">
            <img src={item?.item?.room?.user?.avatar} alt="fdsfsdfsd"></img>
            <div>
              <h2>{item?.item?.room?.user?.first_name}</h2>
              <p>{item?.item?.room?.message?.text}</p>
            </div>
          </div>
          <p className="chat__p">{moment(item?.item?.room?.message?.time).format('L')}</p>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="chat__header">
        <div className="chat__row">
          <BackButton />
          <p className="chat__header_title">Сообщения</p>
        </div>
        <div className="chat__row">
          <div>
            <Plus />
          </div>
          <div style={{ marginLeft: '40px' }}>
            <UserIcon />
          </div>
        </div>
      </div>
      <div className="chat__main">
        <div className="chat__sidebar">
          {rooms.map((item, key) => {
            return (
              <div key={key}>
                <SidebarItem item={item} />
              </div>
            );
          })}
        </div>
        <Route path="/chat/:id" render={() => <DialogMain rooms={rooms} />} exact />
        <Route path="/chat" component={NoDialog} exact />
      </div>
    </div>
  );
};

export default Chat;
