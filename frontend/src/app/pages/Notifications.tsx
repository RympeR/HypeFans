import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { getNotifications, updateNotifications } from "../../redux/notificationsReducer";
import { RootState } from "../../redux/redux";
import { ReactComponent as BackIcon } from "../../assets/images/arrow-left.svg";
import { ReactComponent as BellIcon } from "../../assets/images/bell.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";
import { ReactComponent as CommentIcon } from "../../assets/images/message-circle.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as DonateIcon } from "../../assets/images/tip.svg";
import { ReactComponent as UnlockIcon } from "../../assets/images/unlock.svg";
import { DefaultSidebar } from "../components/notificationsComponents/DefaultSidebar";
import { SidebarText } from "../components/notificationsComponents/SidebarText";
import { Preloader } from "../utils/Preloader";
import { Notification } from "./notifications/Notification";
import axios from "axios";
import { blogAPI } from "../../api/blogAPI";

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const isLoading = useSelector(
    (state: RootState) => state.notifications.isLoading
  );


  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }


  const articles = [
    {
      path: "/notifications",
      text: "Все",
      exact: true,
      type: "all",
      icon: <DonateIcon />,
    },
    {
      path: "/notifications/donations",
      text: "Донаты",
      exact: true,
      type: "donation",
      icon: <DonateIcon />,
    },
    {
      path: "/notifications/subscriptions",
      text: "Подписки",
      exact: true,
      type: "subscription",
      icon: <UnlockIcon />,
    },
    {
      path: "/notifications/likes",
      text: "Лайки",
      exact: true,
      type: "like",
      icon: <LikeIcon />,
    },
    {
      path: "/notifications/comments",
      text: "Комментарии",
      exact: true,
      type: "comment",
      icon: <CommentIcon />,
    },
  ];

  const NotificationsSidebar = () => {
    const SettingsButton = () => <SettingsIcon />;

    return (
      <div>
        <div className="notifications__header">
          <div className="notifications__back">
            <BackIcon onClick={() => history.push("/home")} />
          </div>

          <div className="notifications__headingText">
            <Route
              path="/notifications"
              render={() => <SidebarText text="Уведомления" />}
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
      if (history.location.pathname !== "/notifications") {
        setShown(true);
      }
    }, []);
    const Main = ({ notifications }: { notifications: Array<any> }) => {

      const [page, setPage] = useState<number>(2)

      const [data, setData] = useState([...notifications])

      console.log([data]);



      const onScrollList = async (event: any) => {
        const scrollBottom = event.target.scrollTop +
          event.target.offsetHeight === event.target.scrollHeight;

        if (scrollBottom) {
          const response = await blogAPI.getNotifications({ limit: 5, offset: page })
          setData([...data, ...response.data])
          setPage(page + 1)
        }
      }


      return (
        <div className="notifications__main" onScroll={event => onScrollList(event)}>
          {data.length > 0 ? (
            <>
              {data.map((item, i) => {
                return <Notification key={`notification ${i}`} item={item} />;
              })}
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
              Нет уведомлений
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
                <Link
                  className={
                    history.location.pathname === "/notifications"
                      ? "nav__icon_notifications_active "
                      : "nav__icon_notifications_inactive "
                  }
                  to="/notifications"
                  onClick={() => setShown(true)}
                >
                  <BellIcon />
                </Link>
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
              if (item.text === "Все") return null;
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
        {articles.map((article, key) => {
          return (
            <Route
              path={article.path}
              render={() => (
                <Main
                  notifications={
                    article.text === "Все"
                      ? notifications
                      : notifications.filter(
                        (item) => item.type === article.type
                      )
                  }
                />
              )}
              exact
              key={key + "mainItem"}
            />
          );
        })}
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
