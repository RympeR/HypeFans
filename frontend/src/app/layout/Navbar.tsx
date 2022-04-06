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
import { authAPI } from "../../api/authAPI";
import { blogAPI } from "../../api/blogAPI";

const Navbar = () => {
  const { pathname } = useLocation();
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

  const getNotificationText = (item: any) => {
    switch (item.notification_type) {
      case "donation":
        return `${item.source_info.username} задонатил вам`
      case "subscription":
        return `${item.source_info.username} подписался на вас`
      case "chat_subscription":
        return `${item.source_info.username} подписался на чат с вами`
      case "comment_like":
        return `${item.source_info.username} понравился ваш комментарий`
      case "like":
        return `${item.source_info.username} понравилась ваша публикация`
      case "comment_comment":
        return `${item.source_info.username} прокомментировал ваш комментарий`
      default:
        return `${item.source_info.username} прокомментировал вашу публикацию`
    }
  }

  useEffect(() => {
    if (uid) {
      const chat_id = setInterval(() => {
        // ws.send(JSON.stringify({}));
        const showNotifications = (item: any) => {
          const notification = new Notification("Уведомление", {
            body: getNotificationText(item)
          })
        }
        const newNotifications = () => {
          const notification = new Notification("Уведомление", {
            body: `У вас новые уведомления`
          })
        }
        const asyncData = async () => {
          const data = await blogAPI.getPushNotif()
          if (data.result.length > 1 && data.result.length < 5) {
            data.result.forEach((item: any) => {
              showNotifications(item)
            })
          } else if (data.result.length === 5) {
            newNotifications()
          }
          return authAPI.onlineUpdate(uid);
        }
        asyncData()
      }, 5000);
      return () => clearInterval(chat_id);
    }
  }, [pathname, uid]);

  const dispatch = useDispatch();

  if (
    !isAuth || localStorage.getItem("hypefansToken") === null
  ) {
    return null;
  }

  if (localStorage.getItem("hypefansToken")?.length > 5) {
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
