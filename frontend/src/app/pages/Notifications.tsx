import React, { useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/images/arrow-left.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings.svg';
import { Notification } from './notifications/Notification';
import { NotificationSidebarItem } from './notifications/NotificationSidebarItem';

type NotificationsPropsType = {
  settingsVisible: boolean;
  setSettingsVisible: (bool: boolean) => void;
};

const Notifications = () => {
  const history = useHistory();
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const DefaultText = () => {
    return <p>Уведомления</p>;
  };
  const SettingsText = () => {
    return <p>Настройки</p>;
  };
  const ProfileText = () => {
    return <p>Профиль</p>;
  };
  const ConfidentialityText = () => {
    return <p>Конфеденциальность</p>;
  };
  const PricesText = () => {
    return <p>Цены</p>;
  };
  const AccountText = () => {
    return <p>Аккаунт</p>;
  };
  const NotificationsText = () => {
    return <p>Уведомления</p>;
  };
  const PushText = () => {
    return <p>Push-уведомления</p>;
  };
  const EmailText = () => {
    return <p>Email-уведомления</p>;
  };
  const PageText = () => {
    return <p>Уведомления на сайте</p>;
  };

  const NotificationsSidebar = ({ settingsVisible, setSettingsVisible }: NotificationsPropsType) => {
    const SettingsButton = () => <SettingsIcon />;
    const BackButton = () => <BackIcon onClick={history.goBack} />;
    const DefaultSidebar = () => {
      return (
        <div className="notifications__sidebar">
          <NotificationSidebarItem text="Все" />
          <NotificationSidebarItem text="Комментарии" />
          <NotificationSidebarItem text="Лайки" />
          <NotificationSidebarItem text="Подписки" />
        </div>
      );
    };
    const SettingsSidebar = () => {
      return (
        <div className="notifications__sidebar">
          <Link to="/notifications/settings/profile">
            <NotificationSidebarItem text="Профиль" />
          </Link>
          <Link to="/notifications/settings/account">
            <NotificationSidebarItem text="Аккаунт" />
          </Link>
          <Link to="/notifications/settings/confidentiality">
            <NotificationSidebarItem text="Конфеденциальность" />
          </Link>
          <Link to="/notifications/settings/prices">
            <NotificationSidebarItem text="Цены" />
          </Link>
          <Link to="/notifications/settings/notifications">
            <NotificationSidebarItem text="Уведомления" />
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
            <Route path="/notifications" component={DefaultText} exact />
            <Route path="/notifications/settings" component={SettingsText} />
          </p>
          <div className="notifications__settings">
            <Link to="/notifications/settings/profile">
              <Route path="/notifications" component={SettingsButton} exact />
            </Link>
          </div>
        </div>

        <Route path="/notifications/" component={DefaultSidebar} exact />
        <Route path="/notifications/settings" component={SettingsSidebar} />
      </div>
    );
  };
  const NotificationsMain = ({ settingsVisible }: { settingsVisible: boolean }) => {
    const PushSettingsNotifications = () => {
      return (
        <div className="notifications__main">
          <div className="notifications__listBlock">
            <p>Push-уведомления</p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <p className="notifications__listText">
            Получайте push-уведомления, чтобы узнать, что происходит, когда вы не находитесь на HypeFans. Вы можете
            выключить их в любое время.
          </p>
        </div>
      );
    };
    const EmailSettingsNotifications = () => {
      return (
        <div className="notifications__main">
          <div className="notifications__listBlock">
            <p>Уведомления электронной почты </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <p className="notifications__listText">
            Получайте электронные письма, чтобы узнать, что происходит, когда вы не находитесь на HypeFans. Вы можете
            выключить их в любое время.
          </p>
        </div>
      );
    };
    const PageSettingsNotifications = () => {
      return (
        <div className="notifications__main">
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые комментарии </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые лайки </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые подписки </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые донаты </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
        </div>
      );
    };
    const SettingsNotifications = () => {
      return (
        <div className="notifications__main">
          <Link to="/notifications/settings/notifications/push">
            <NotificationSidebarItem text="Push-уведомления" />
          </Link>
          <Link to="/notifications/settings/notifications/email">
            <NotificationSidebarItem text="Email-уведомления" />
          </Link>
          <Link to="/notifications/settings/notifications/page">
            <NotificationSidebarItem text="Уведомления на сайте" />
          </Link>
        </div>
      );
    };
    const DefaultMain = () => {
      return (
        <div className="notifications__main">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      );
    };
    return (
      <div className="notifications__mainWrapper">
        <div className="notifications__mainHeader">
          <Route path="/notifications" component={DefaultText} exact />
          <Route path="/notifications/settings/profile" component={ProfileText} exact />
          <Route path="/notifications/settings/account" component={AccountText} exact />
          <Route path="/notifications/settings/confidentiality" component={ConfidentialityText} exact />
          <Route path="/notifications/settings/notifications/push" component={PushText} exact />
          <Route path="/notifications/settings/notifications/email" component={EmailText} exact />
          <Route path="/notifications/settings/notifications/page" component={PageText} exact />
          <Route path="/notifications/settings/notifications" component={NotificationsText} exact />
          <Route path="/notifications/settings/prices" component={PricesText} exact />
        </div>
        <Route path="/notifications/settings/notifications" component={SettingsNotifications} exact />
        <Route path="/notifications/settings/notifications/push" component={PushSettingsNotifications} exact />
        <Route path="/notifications/settings/notifications/email" component={EmailSettingsNotifications} exact />
        <Route path="/notifications/settings/notifications/page" component={PageSettingsNotifications} exact />
        <Route path="/notifications" component={DefaultMain} exact />
      </div>
    );
  };

  return (
    <div className="notifications">
      <NotificationsSidebar settingsVisible={settingsVisible} setSettingsVisible={setSettingsVisible} />
      <NotificationsMain settingsVisible={settingsVisible} />
    </div>
  );
};

export default Notifications;
