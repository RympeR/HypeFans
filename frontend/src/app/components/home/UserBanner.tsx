import React, { useContext } from 'react';
import userAvatar from '../../../assets/images/ava2.png';
import profileLinkBg from '../../../assets/images/profile-link-bg.jpg';
import { LangContext } from '../../utils/LangProvider';

const UserBanner = ({ aside }: { aside?: boolean }) => {
  const { currentLang } = useContext(LangContext);

  return (
    <a
      className={`user-banner ${aside ? 'user-banner_aside' : ''}`}
      href="#"
      style={{ backgroundImage: `url(${profileLinkBg})` }}
    >
      <div className="user-banner__profile">
        <img className="user-banner__avatar" src={userAvatar} alt="avatar" />
        <div>
          <p className="user-banner__name">Tony Bellew</p>
          <p className="user-banner__nickname">@tonybellew</p>
        </div>
      </div>
      <div className="user-banner__status">{currentLang.free}</div>
    </a>
  );
};

export default UserBanner;
