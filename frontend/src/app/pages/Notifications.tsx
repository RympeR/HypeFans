import React, { useContext, useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import {
  getNotifications,
  updateNotifications,
} from "../../redux/notificationsReducer";
import { RootState } from "../../redux/redux";
import { ReactComponent as BackIcon } from "../../assets/images/arrow-left.svg";
import { ReactComponent as BellIcon } from "../../assets/images/bell.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";
import { ReactComponent as CommentIcon } from "../../assets/images/message-circle.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as DonateIcon } from "../../assets/images/tip.svg";
import { ReactComponent as UnlockIcon } from "../../assets/images/unlock.svg";
import loader from '../../assets/loaders/Spinner-1s-200px.gif';
import { DefaultSidebar } from "../components/notificationsComponents/DefaultSidebar";
import { SidebarText } from "../components/notificationsComponents/SidebarText";
import { Preloader } from "../utils/Preloader";
import { Notification } from "./notifications/Notification";
import { LangContext } from "../utils/LangProvider";

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentLang } = useContext(LangContext);
  const isLoading = useSelector(
    (state: RootState) => state.notifications.isLoading
  );


  useEffect(() => {
    dispatch(getNotifications(0, history.location.pathname.split("/")[
      history.location.pathname.split("/").length - 1
    ]));
  }, [history.location.pathname, dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  const articles = [
    {
      path: "/notifications/all",
      text: currentLang.allRef,
      exact: true,
      type: "all",
      icon: <DonateIcon />,
    },
    {
      path: "/notifications/donation",
      text: currentLang.donuts,
      exact: true,
      type: "donation",
      icon: <DonateIcon />,
    },
    {
      path: "/notifications/chat_subscription",
      text: "Подписки на чаты",
      exact: true,
      type: "subscription",
      icon: <UnlockIcon />,
    },
    {
      path: "/notifications/subscription",
      text: currentLang.subscribs,
      exact: true,
      type: "subscription",
      icon: <UnlockIcon />,
    },
    {
      path: "/notifications/like",
      text: currentLang.likes,
      exact: true,
      type: "like",
      icon: <LikeIcon />,
    },
    {
      path: "/notifications/comment",
      text: currentLang.comments,
      exact: true,
      type: "comment",
      icon: <CommentIcon />,
    },
  ];

  const NotificationsSidebar = () => {
    const SettingsButton = () => <SettingsIcon />;
    const { currentLang } = useContext(LangContext);

    return (
      <div>
        <div className="notifications__header">
          <div className="notifications__back">
            <BackIcon onClick={() => history.push("/home")} />
          </div>

          <div className="notifications__headingText">
            <Route
              path="/notifications"
              render={() => <SidebarText text={currentLang.notif} />}
            />
          </div>
          <div className="notifications__settings">
            <Link to="/settings/notifications">
              <Route path="/notifications" component={SettingsButton} />
            </Link>
          </div>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
        <Route
          path="/notifications/"
          render={() => <DefaultSidebar articles={articles} />}
        />
      </div>
    );
  };
  const NotificationsMain = () => {
    const [isShown, setShown] = useState(false);
    useEffect(() => {
      if (history.location.pathname !== "/notifications/all") {
        setShown(true);
      }
    }, []);
    const Main = () => {
      const notifications = useSelector(
        (state: RootState) => state.notifications.notifications
      );
      const [offset, setOffset] = useState<number>(10);
      const divRef = useRef(null)
      const [bottomPos, setBottomPos] = useState(0)

      const isUpdateLoading = useSelector((state: RootState) => state.blog.isPaginationLoading);

      useEffect(() => {
        divRef.current.scrollBy({ top: bottomPos, behavior: "smooth" })
      }, [notifications])


      const onScrollList = async (event: any) => {
        const scrollBottom =
          event.target.scrollTop + event.target.offsetHeight >=
          event.target.scrollHeight;
        if (scrollBottom && !isUpdateLoading && offset <= notifications.length) {
          setBottomPos(event.target.offsetHeight)
          dispatch(updateNotifications({
            offset: offset, type: history.location.pathname.split("/")[
              history.location.pathname.split("/").length - 1
            ]
          }))
          setOffset(offset + 10);
        }
      };

      return (
        <div
          className="notifications__main"
          onScroll={(event) => onScrollList(event)}
          ref={divRef}
        >
          {notifications.length > 0 && typeof notifications[0]?.user?.first_name ? (
            <>
              {notifications.map((item, i) => {
                return <Notification key={`notification ${i}`} item={item} />;
              })}
              <div style={{ display: "flex", justifyContent: "center" }}>
                {isUpdateLoading ? <img src={loader} alt="loading..." /> : null}
              </div>
            </>
          ) : (
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              {currentLang.noNotifications}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="notifications__mainWrapper">
        <div className="notifications__mainHeader">
          {/* Заголовок*/}
          {articles.map((item, key) => (
            <Route
              path={item.path}
              render={() => <SidebarText text={item.text} />}
              exact={item.exact}
              key={key + "article"}
            />
          ))}
          {/* Заголовок(конец)*/}
          <div
            className="notifications__navMobile"
            style={isShown ? { width: "137px" } : { width: "25px" }}
          >
            {isShown ? (
              <div style={{ marginLeft: "5px" }}>
                <div
                  className={
                    history.location.pathname === "/notifications"
                      ? "nav__icon_notifications_active "
                      : "nav__icon_notifications_inactive "
                  }
                  // to="/notifications"
                  onClick={() => setShown(false)}
                >
                  <BellIcon />
                </div>
              </div>
            ) : (
              <div
                className={
                  history.location.pathname === "/notifications"
                    ? "nav__icon_notifications_active "
                    : "nav__icon_notifications_inactive "
                }
                onClick={() => setShown(true)}
              >
                <BellIcon />
              </div>
            )}
            {articles.map((item, key) => {
              if (item.text === currentLang.all) return null;
              return (
                <Link
                  className={
                    history.location.pathname === item.path
                      ? "nav__icon_notifications_active "
                      : "nav__icon_notifications_inactive "
                  }
                  to={item.path}
                  style={{ marginLeft: "5px" }}
                  key={key + "mobileItems"}
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Главное тело в зависимости от роута*/}
        <Main
        />
      </div>
    );
  };

  return (
    <div className="notifications">
      {/* Сайдбар и блок с информацией */}
      <NotificationsSidebar />
      <NotificationsMain />
    </div>
  );
};

export default Notifications;
