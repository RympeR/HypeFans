import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrencyInput from 'react-currency-input-field';
import 'react-phone-input-2/lib/style.css';
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
  const Text = ({ text }: { text: string }) => {
    return <p>{text}</p>;
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
            <Route path="/notifications" render={() => <Text text="Уведомления" />} exact />
            <Route path="/notifications/settings" render={() => <Text text="Настройки" />} />
          </p>
          <div className="notifications__settings">
            <Link to="/notifications/settings/notifications">
              <Route path="/notifications" component={SettingsButton} exact />
            </Link>
          </div>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
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
    const AccountSettings = () => {
      return (
        <div className="notifications__main">
          <h2 className="notifications__settings_h2">Информация</h2>
          <Link to="/notifications/settings/account/nickname">
            <NotificationSidebarItem text="Ник" />
          </Link>
          <Link to="/notifications/settings/account/email">
            <NotificationSidebarItem text="Email" />
          </Link>
          <Link to="/notifications/settings/account/phone">
            <NotificationSidebarItem text="Номер телефона" />
          </Link>
          <h2 className="notifications__settings_h2" style={{ paddingTop: '40px' }}>
            Безопасность
          </h2>
          <Link to="/notifications/settings/account/password">
            <NotificationSidebarItem text="Пароль" />
          </Link>
          <Link to="/notifications/settings/account/sessions">
            <NotificationSidebarItem text="Сеансы входа" />
          </Link>
          <h2 className="notifications__settings_h2" style={{ paddingTop: '40px' }}>
            Действия
          </h2>
          <Link to="/notifications/settings/notifications/account/delete">
            <NotificationSidebarItem text="Удалить аккаунт" />
          </Link>
        </div>
      );
    };
    const DeleteAccount = () => {
      return <div className="notifications__main">fdfd</div>;
    };
    const SessionsInfo = () => {
      return (
        <div className="notifications__sessions notifications__main">
          <h3>MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE</h3>
          <p>188.130.176.46 - Ukraine </p>
          <p>3/23/21 10:42</p>
        </div>
      );
    };
    const NicknameSettings = () => {
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Ник</p>
          <input className="notifications__input"></input>
          <button className="notifications__settingBtn">Сохранить</button>
        </div>
      );
    };
    const PasswordSettings = () => {
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Новый пароль</p>
          <input className="notifications__input" placeholder="Введите новый пароль..."></input>
          <input
            className="notifications__input"
            style={{ marginTop: '16px' }}
            placeholder="Подтвердите новый пароль..."
          ></input>
          <button className="notifications__settingBtn">Сохранить</button>
        </div>
      );
    };

    const PhoneSettings = () => {
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Номер телефона</p>
        </div>
      );
    };
    const EmailSettings = () => {
      const [emailModalShow, setEmailModalShow] = useState(false);
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Email</p>
          <input className="notifications__input"></input>
          <button
            className="notifications__settingBtn"
            onClick={() => {
              setEmailModalShow(true);
            }}
          >
            Изменить Email
          </button>

          <Modal show={emailModalShow} onHide={() => setEmailModalShow(false)} centered>
            <Modal.Body className="notifications__modal">
              <h2>Письмо подтверждения</h2>
              <h2> отправлено на данный Email</h2>
              <h3 onClick={() => setEmailModalShow(false)}>Понятно!</h3>
            </Modal.Body>
          </Modal>
        </div>
      );
    };
    const ConfidentialitySettings = () => {
      return (
        <div className="notifications__main">
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать статус активности </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать количество подписчиков</p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать количество постов </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Заблокированные аккаунты </p>
            <input type="checkbox" className="notifications__toggle-button"></input>
          </div>
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
    const PricesSettings = () => {
      return (
        <div className="notifications__main">
          <Link to="/notifications/settings/prices/messages">
            <NotificationSidebarItem text="Цена сообщения" />
          </Link>
          <Link to="/notifications/settings/prices/subscribes">
            <NotificationSidebarItem text="Цена подписки" />
          </Link>
          <Link to="/notifications/settings/prices/fans">
            <NotificationSidebarItem text="Для фанатов" />
          </Link>
        </div>
      );
    };
    const MessagesPrice = () => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <p>Пользователь сможет общаться с вами, только заплатив определенную сумму.</p>
            <div className="notifications__free">
              <h2>Бесплатно</h2>
              <input type="checkbox" className="notifications__toggle-button"></input>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}>
            <p className="notifications__priceText">Цена за 1 месяц</p>
            <CurrencyInput
              className="notifications__input"
              prefix="$"
              name="input-name"
              placeholder="$ Введите сумму..."
              decimalsLimit={2}
              onValueChange={(value, name) => console.log(value, name)}
            />
          </div>
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
          {/* Заголовок*/}
          <Route path="/notifications" render={() => <Text text="Уведомления" />} exact />
          <Route path="/notifications/settings/profile" render={() => <Text text="Профиль" />} exact />
          <Route path="/notifications/settings/account" render={() => <Text text="Аккаунт" />} exact />
          <Route
            path="/notifications/settings/confidentiality"
            render={() => <Text text="Конфеденциальность" />}
            exact
          />
          <Route path="/notifications/settings/account/sessions" render={() => <Text text="Сеансы входа" />} exact />
          <Route
            path="/notifications/settings/notifications/push"
            render={() => <Text text="Push-уведомления" />}
            exact
          />
          <Route path="/notifications/settings/account/phone" render={() => <Text text="Номер телефона" />} exact />
          <Route
            path="/notifications/settings/notifications/email"
            render={() => <Text text="Email-уведомления" />}
            exact
          />
          <Route
            path="/notifications/settings/notifications/page"
            render={() => <Text text="Уведомления на сайте" />}
            exact
          />
          <Route path="/notifications/settings/notifications" render={() => <Text text="Уведомления" />} exact />
          <Route path="/notifications/settings/prices" render={() => <Text text="Цены" />} exact />
          <Route path="/notifications/settings/account/delete" render={() => <Text text="Удалить аккаунт" />} exact />
          <Route path="/notifications/settings/account/email" render={() => <Text text="Изменить Email" />} exact />
          <Route path="/notifications/settings/account/password" render={() => <Text text="Изменить пароль" />} exact />
          <Route path="/notifications/settings/prices/messages" render={() => <Text text="Цена сообщения" />} exact />
          <Route path="/notifications/settings/account/nickname" render={() => <Text text="Изменить ник" />} exact />
          {/* Заголовок(конец)*/}
        </div>
        {/* Главное тело в зависимости от роута*/}
        <Route path="/notifications/settings/notifications" component={SettingsNotifications} exact />
        <Route path="/notifications/settings/notifications/push" component={PushSettingsNotifications} exact />
        <Route path="/notifications/settings/notifications/email" component={EmailSettingsNotifications} exact />
        <Route path="/notifications/settings/account" component={AccountSettings} exact />
        <Route path="/notifications/settings/account/nickname" component={NicknameSettings} exact />
        <Route path="/notifications/settings/confidentiality" component={ConfidentialitySettings} exact />
        <Route path="/notifications/settings/notifications/page" component={PageSettingsNotifications} exact />
        <Route path="/notifications" component={DefaultMain} exact />
        <Route path="/notifications/settings/prices/messages" component={MessagesPrice} exact />
        <Route path="/notifications/settings/prices" component={PricesSettings} exact />
        <Route path="/notifications/settings/account/password" component={PasswordSettings} exact />
        <Route path="/notifications/settings/account/phone" component={PhoneSettings} exact />
        <Route path="/notifications/settings/account/delete" component={DeleteAccount} exact />
        <Route path="/notifications/settings/account/sessions" component={SessionsInfo} exact />
        <Route path="/notifications/settings/account/email" component={EmailSettings} exact />
      </div>
    );
  };

  return (
    <div className="notifications">
      {/* Сайдбар и блок с информацией */}
      <NotificationsSidebar settingsVisible={settingsVisible} setSettingsVisible={setSettingsVisible} />
      <NotificationsMain settingsVisible={settingsVisible} />
    </div>
  );
};

export default Notifications;
