import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import profileLinkBg from "../../../assets/images/profile-link-bg.png";
import { LangContext } from "../../utils/LangProvider";

const UserBanner = ({ aside, profile }: { aside?: boolean; profile: any }) => {
  const { currentLang } = useContext(LangContext);

  return (
    <div
      className={`user-banner ${aside ? "user-banner_aside" : ""}`}
      style={{
        backgroundImage: `url(${profile?.background_photo || profileLinkBg})`,
      }}
    >
      <div className="user-banner__profile">
        <Link to={`/profile/${profile?.username}`}>
          <img
            className="user-banner__avatar"
            src={profile?.avatar || logo}
            alt="avatar"
          />
        </Link>
        <div>
          <p className="user-banner__name">{profile?.first_name}</p>
          <p className="user-banner__nickname">@{profile?.username}</p>
        </div>
      </div>
      {profile?.subscribtion_price == 0 ? (
        <div className="user-banner__status">{currentLang.free}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserBanner;
