import React, { useEffect, useState } from "react";
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
import { authAPI } from "../../api/authAPI";
import { blogAPI } from "../../api/blogAPI";
import { toast } from "react-toastify";

const Navbar = () => {
  const { pathname } = useLocation();
  const refLink = pathname.split("/").slice(2, 4).join("/");

  const nick = useSelector((state: RootState) => state.auth.username);
  const uid = useSelector((state: RootState) => state.auth.pk);
  const [ws, setWs] = useState(null);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  const [newMessages, setNewMessages] = useState(0);
  // const wsClient = new WebSocket(
  //   `wss://hype-fans.com/ws/api/chat-rooms/${uid ?? 0}/`
  // );
  // wsClient.onopen = () => {
  //   setWs(wsClient);
  // };
  useEffect(() => {
    if (uid) {
      const chat_id = setInterval(() => {
        // ws.send(JSON.stringify({}));
        const asyncData = async () => {
          const data = await blogAPI.getPushNotif().then((res) => {
            // return toast.success("Уведомление")
          })
          return authAPI.onlineUpdate(uid);
        }
        asyncData()
      }, 5000);
      return () => clearInterval(chat_id);
    }
  }, [pathname, uid]);

  const dispatch = useDispatch();

  if (
    !isAuth
  ) {
    return null;
  }

  if (Cookies?.get("token")?.length > 5) {
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
