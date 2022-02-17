import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../redux/redux";
import { ReactComponent as AddIcon } from "../../assets/images/add.svg";
import { ReactComponent as BellIcon } from "../../assets/images/bell.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home.svg";
import { ReactComponent as ChatIcon } from "../../assets/images/message.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/user.svg";
import NavLink from "../components/home/NavLink";
import { NAV_LINKS } from "../utils/utilities";
import { getUserData } from "../../redux/authReducer";
import Cookies from "js-cookie";

const Navbar = () => {
  const { pathname } = useLocation();
  const refLink = pathname.split("/").slice(2, 4).join("/");

  const nick = useSelector((state: RootState) => state.auth.username);

  // const ws = new WebSocket('ws://hype-fans.com/chat/get-chat-messages/');

  // console.log(ws);

  const [newMessages, setNewMessages] = useState(0);

  // useEffect(() => {
  //   const id = setInterval(
  //     () => chatAPI.getNewMessagesCount().then((res) => setNewMessages(res.newMessagesCount)),
  //     3000
  //   );
  //   return () => clearInterval(id);
  // }, []);

  const dispatch = useDispatch();

  if (
    refLink !== "" ||
    pathname === `/${NAV_LINKS.SIGNIN}` ||
    pathname === `/${NAV_LINKS.SIGNUP}`
  ) {
    return null;
  }

  if (Cookies?.get('token')?.length > 5) {
    dispatch(getUserData());
  }

  return (
    <nav className="nav">
      <div className="nav__inner">
        <NavLink toPath={NAV_LINKS.HOME}>
          <HomeIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.NOTIFICATIONS}>
          <BellIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.ADD}>
          <AddIcon />
        </NavLink>

        <NavLink toPath={NAV_LINKS.CHAT}>
          <div style={{ display: "flex" }}>
            <ChatIcon />
            {newMessages > 0 ? (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  backgroundColor: "#fb5734",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  color: "white",
                }}
              >
                <span style={{ marginTop: "3px" }}>{newMessages}</span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </NavLink>

        {nick ? (
          <NavLink toPath={`${NAV_LINKS.PROFILE}/${nick}`}>
            <ProfileIcon />
          </NavLink>
        ) : (
          <ProfileIcon />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
