import React, { useContext, useEffect, useState } from "react";
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
import { LangContext } from "../utils/LangProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { pathname } = useLocation();
  const nick = useSelector((state: RootState) => state.auth.username);
  const uid = useSelector((state: RootState) => state.auth.pk);
  const [ws, setWs] = useState(null);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { currentLang } = useContext(LangContext);

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
        return `${item.source_info.username} ${currentLang.donatedU}`;
      case "subscription":
        return `${item.source_info.username} ${currentLang.subscribedU}`;
      case "chat_subscription":
        return `${item.source_info.username} ${currentLang.chatSubscribedU}`;
      case "comment_like":
        return `${item.source_info.username} ${currentLang.likedUrComment}`;
      case "like":
        return `${item.source_info.username} ${currentLang.likedUrPost}`;
      case "comment_comment":
        return `${item.source_info.username} ${currentLang.commentUrComment}`;
      default:
        return `${item.source_info.username} ${currentLang.commentUrPost}`;
    }
  };

  useEffect(() => {
    if (uid) {

      const showNotifications = (item: any) => {
        const notification = new Notification("Уведомление", {
          body: getNotificationText(item),
        });
      };

      const newNotifications = () => {
        const notification = new Notification("Уведомление", {
          body: `У вас новые уведомления`,
        });
      };

      const asyncData = async () => {
        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }
        const data = await blogAPI.getPushNotif();
        if (document.hidden) {
          if (data?.result?.length > 1 && data?.result?.length < 5) {
            data?.result?.forEach((item: any) => {
              showNotifications(item);
            });
          } else if (data?.result?.length === 5) {
            newNotifications();
          }
        } else if (!document.hidden) {
          if (data?.result?.length > 1 && data?.result?.length < 5) {
            data?.result?.forEach((item: any) => {
              toast.success(getNotificationText(item));
            });
          } else if (data?.result?.length === 5) {
            toast.success(`У вас ${data.result.length} уведомлений`)
          }
        }
        authAPI.onlineUpdate(uid);
      };

      const chat_id = setInterval(() => {
        asyncData()
      }, 5000);
      return () => clearInterval(chat_id);
    }
  }, [pathname, uid]);

  const dispatch = useDispatch();

  if (!isAuth || localStorage.getItem("hypefansToken") === null) {
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
