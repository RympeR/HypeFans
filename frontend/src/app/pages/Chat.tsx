import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/images/arrow-left.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as Vektor } from '../../assets/images/send.svg';
import { ReactComponent as UsersIcon } from '../../assets/images/users.svg';
import { NoDialog } from './NoDialog';

const Chat = () => {
  const history = useHistory();
  const BackButton = () => <BackIcon onClick={history.goBack} />;
  const Plus = () => <PlusIcon />;
  const UserIcon = () => <UsersIcon />;
  const VektorIcon = () => <Vektor />;

  const SidebarItem = () => {
    return (
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}>
        <div className="chat__sidebarItem">
          <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="fdsfsdfsd"></img>
          <div>
            <h2>Aleksej Bel`ajev</h2>
            <p>Привет!!!</p>
          </div>
        </div>
        <p className="chat__p">15 минут назад</p>
      </div>
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
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
        </div>
        {/* <DialogMain /> */}
        <NoDialog />
      </div>
    </div>
  );
};

export default Chat;
