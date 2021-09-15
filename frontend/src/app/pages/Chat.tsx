import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/images/arrow-left.svg';
import { ReactComponent as ImageIcn } from '../../assets/images/imageI.svg';
import { ReactComponent as MicrIcon } from '../../assets/images/micI.svg';
import { ReactComponent as More } from '../../assets/images/more-vertical.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as Vektor } from '../../assets/images/send.svg';
import { ReactComponent as Tip } from '../../assets/images/tipI.svg';
import { ReactComponent as UsersIcon } from '../../assets/images/users.svg';
import { ReactComponent as VideoIcn } from '../../assets/images/videoI.svg';

const Chat = () => {
  const history = useHistory();
  const BackButton = () => <BackIcon onClick={history.goBack} />;
  const Plus = () => <PlusIcon />;
  const UserIcon = () => <UsersIcon />;
  const MoreIcon = () => <More />;
  const VektorIcon = () => <Vektor />;
  const TipIcon = () => <Tip />;
  const MicIcon = () => <MicrIcon />;
  const VideoIcon = () => <VideoIcn />;
  const ImageIcon = () => <ImageIcn />;

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
              <div>
                <div className="text-wrapp">
                  gdfffffffffffff
                  <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="imdsa"></img>
                </div>
              </div>
              <div>
                <div className="text-wrapp">
                  gdfffffffffffff
                  <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="imdsa"></img>
                </div>
              </div>
              <div>
                <div className="text-wrapp">
                  gdfffffffffffff
                  <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="imdsa"></img>
                </div>
              </div>
              <div>
                <div className="text-wrapp">
                  gdfffffffffffff
                  <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="imdsa"></img>
                </div>
              </div>
              <div>
                <div className="text-wrapp">
                  gdfffffffffffff
                  <img src="https://avatars1.githubusercontent.com/u/2048511?v=4" alt="imdsa"></img>
                </div>
              </div>
              <div>
                <div className="text-wrapp"></div>
              </div>
              <div>
                <div className="text-wrapp"></div>
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
      </div>
    </div>
  );
};

export default Chat;
