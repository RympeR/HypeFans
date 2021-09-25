import React, { useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { getNotifications } from '~/redux/notificationsReducer';
import { RootState } from '~/redux/redux';
import { ReactComponent as BackIcon } from '../../assets/images/arrow-left.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings.svg';
import { Preloader } from '../utils/Preloader';
import { Notification } from './notifications/Notification';
import { NotificationSidebarItem } from './notifications/NotificationSidebarItem';

const Notifications = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const isLoading = useSelector((state: RootState) => state.notifications.isLoading);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  if (isLoading) {
    return <Preloader />;
  }
  const Text = ({ text }: { text: string }) => {
    return <p>{text}</p>;
  };

  const NotificationsSidebar = () => {
    const selectedColor = '#edebeb';
    const SettingsButton = () => <SettingsIcon />;
    const BackButton = () => <BackIcon onClick={history.goBack} />;
    const DefaultSidebar = () => {
      return (
        <div className="notifications__sidebar">
          <Link to="/notifications" style={pathname === '/notifications' ? { background: selectedColor } : {}}>
            <NotificationSidebarItem text="Все" />
          </Link>
          <Link
            to="/notifications/comments"
            style={pathname === '/notifications/comments' ? { background: selectedColor } : {}}
          >
            <NotificationSidebarItem text="Комментарии" />
          </Link>
          <Link
            to="/notifications/likes"
            style={pathname === '/notifications/likes' ? { background: selectedColor } : {}}
          >
            <NotificationSidebarItem text="Лайки" />
          </Link>
          <Link
            to="/notifications/subscriptions"
            style={pathname === '/notifications/subscriptions' ? { background: selectedColor } : {}}
          >
            <NotificationSidebarItem text="Подписки" />
          </Link>
          <Link
            to="/notifications/donations"
            style={pathname === '/notifications/donations' ? { background: selectedColor } : {}}
          >
            <NotificationSidebarItem text="Донаты" />
          </Link>
        </div>
      );
    };

    return (
      <div>
        <div className="notifications__header">
          <div className="notifications__back">
            <BackButton />
          </div>

          <p className="notifications__headingText">
            <Route path="/notifications" render={() => <Text text="Уведомления" />} />
          </p>
          <div className="notifications__settings">
            <Link to="/settings/notifications">
              <Route path="/notifications" component={SettingsButton} />
            </Link>
          </div>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
        <Route path="/notifications/" component={DefaultSidebar} />
      </div>
    );
  };
  const NotificationsMain = () => {
    const Main = ({ notifications }: { notifications: Array<any> }) => {
      return (
        <div className="notifications__main">
          {notifications.length > 0 ? (
            notifications.map((item, i) => {
              return <Notification key={`notification ${i}`} item={item} />;
            })
          ) : (
            <div style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginTop: '70px' }}>
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
          <Route path="/notifications" render={() => <Text text="Все" />} exact />
          <Route path="/notifications/donations" render={() => <Text text="Донаты" />} exact />
          <Route path="/notifications/subscriptions" render={() => <Text text="Подписки" />} exact />
          <Route path="/notifications/likes" render={() => <Text text="Лайки" />} exact />
          <Route path="/notifications/comments" render={() => <Text text="Комментарии" />} exact />
          {/* Заголовок(конец)*/}
        </div>
        {/* Главное тело в зависимости от роута*/}
        <Route path="/notifications" render={() => <Main notifications={notifications} />} exact />
        <Route
          path="/notifications/subscriptions"
          render={() => <Main notifications={notifications.filter((item) => item.type === 'subscription')} />}
          exact
        />
        <Route
          path="/notifications/likes"
          render={() => <Main notifications={notifications.filter((item) => item.type === 'like')} />}
          exact
        />
        <Route
          path="/notifications/comments"
          render={() => <Main notifications={notifications.filter((item) => item.type === 'comment')} />}
          exact
        />
        <Route
          path="/notifications/donations"
          render={() => <Main notifications={notifications.filter((item) => item.type === 'donation')} />}
          exact
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
