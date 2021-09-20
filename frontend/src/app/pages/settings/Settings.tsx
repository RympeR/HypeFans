import { Formik } from 'formik';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrencyInput from 'react-currency-input-field';
import 'react-phone-input-2/lib/style.css';
import Recaptcha from 'react-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { settingsValType } from '~/api/types';
import { changeSettings } from '~/redux/authReducer';
import { RootState } from '~/redux/redux';
import { updateEmailConfirm } from '~/redux/userReducer';
import { ReactComponent as BackIcon } from '../../../assets/images/arrow-left.svg';
import { NotificationSidebarItem } from '../notifications/NotificationSidebarItem';

export const Settings = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const settings = useSelector((state: RootState) => state.auth);
  const isLoading = useSelector((state: RootState) => state.notifications.isLoading);
  const isDisabled = useSelector((state: RootState) => state.auth.isSettingsDisabled);
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  const Text = ({ text }: { text: string }) => {
    return <p>{text}</p>;
  };

  const NotificationsSidebar = () => {
    const selectedColor = '#edebeb';
    const BackButton = () => <BackIcon onClick={history.goBack} />;

    const SettingsSidebar = () => {
      return (
        <div className="notifications__sidebar">
          <Link to="/settings/account" style={pathname === '/settings/account' ? { background: selectedColor } : {}}>
            <NotificationSidebarItem text="Аккаунт" />
          </Link>
          <Link
            to="/settings/confidentiality"
            style={pathname === '/settings/confidentiality' ? { background: selectedColor } : {}}
          >
            <NotificationSidebarItem text="Конфеденциальность" />
          </Link>
          <Link to="/settings/prices" style={pathname === '/settings/prices' ? { background: selectedColor } : {}}>
            <NotificationSidebarItem text="Цены" />
          </Link>
          <Link
            to="/settings/notifications"
            style={pathname === '/settings/notifications' ? { background: selectedColor } : {}}
          >
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
            <Route path="/settings" render={() => <Text text="Настройки" />} />
          </p>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
        <Route path="/settings" component={SettingsSidebar} />
      </div>
    );
  };
  const NotificationsMain = () => {
    const dispatch = useDispatch();
    const PushSettingsNotifications = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__listBlock">
            <p>Push-уведомления</p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="push_notifications"
              checked={values.push_notifications}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('push_notifications', val.target.checked);
                return submit();
              }}
            ></input>
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
          <Link to="/settings/account/nickname">
            <NotificationSidebarItem text="Ник" />
          </Link>
          <Link to="/settings/account/email">
            <NotificationSidebarItem text="Email" />
          </Link>
          <Link to="/settings/account/phone">
            <NotificationSidebarItem text="Номер телефона" />
          </Link>
          <h2 className="notifications__settings_h2" style={{ paddingTop: '40px' }}>
            Безопасность
          </h2>
          <Link to="/settings/account/password">
            <NotificationSidebarItem text="Пароль" />
          </Link>
          <Link to="/settings/account/sessions">
            <NotificationSidebarItem text="Сеансы входа" />
          </Link>
          <h2 className="notifications__settings_h2" style={{ paddingTop: '40px' }}>
            Действия
          </h2>
          <Link to="/settings/notifications/account/delete">
            <NotificationSidebarItem text="Удалить аккаунт" />
          </Link>
        </div>
      );
    };
    const DeleteAccount = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      const [deleteShow, setDeleteShow] = useState(false);
      const [isRobot, setIsRobot] = useState(true);
      return (
        <div className="notifications__main">
          <div className="notifications__listBlock">
            <p>Подтверждение</p>
          </div>
          <div className="notifications__listBlock">
            <Recaptcha
              sitekey="6Lep7U8cAAAAABG9Qppk743EBuVmeXxml7F4Umr3"
              size="normal"
              onChange={() => setIsRobot(false)}
            />
          </div>
          <h2 style={{ fontSize: '18px', textAlign: 'center' }}>Аккаунт будет удален</h2>
          <h2 style={{ fontSize: '18px', textAlign: 'center' }}>безвозвратно!</h2>
          <button className="notifications__settingBtn" onClick={() => setDeleteShow(true)} disabled={isRobot}>
            Удалить
          </button>
          <Modal show={deleteShow} onHide={() => setDeleteShow(false)} centered>
            <Modal.Body className="notifications__modal">
              <h2 style={{ marginBottom: '0px' }}>Вы уверены, что хотите</h2>
              <h2> удалить аккаунт?</h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <h3 onClick={() => setDeleteShow(false)} style={{ color: '#FB5734' }}>
                  Отмена
                </h3>
                <div style={{ width: '20px' }}></div>
                <h3 onClick={() => setDeleteShow(false)}>Продолжить</h3>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    };
    const SessionsInfo = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__sessions notifications__main">
          <h3>MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE</h3>
          <p>188.130.176.46 - Ukraine </p>
          <p>3/23/21 10:42</p>
        </div>
      );
    };
    const NicknameSettings = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      const username = useSelector((state: RootState) => state.auth.username);
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Ник</p>
          <input
            className="notifications__input"
            value={values.username}
            onChange={(val) => setFieldValue('username', val.target.value)}
          ></input>
          <button
            className="notifications__settingBtn"
            onClick={() => submit()}
            disabled={username === values.username ? true : false}
          >
            Сохранить
          </button>
        </div>
      );
    };
    const PasswordSettings = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
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

    const PhoneSettings = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Номер телефона</p>
        </div>
      );
    };
    const EmailSettings = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      const [emailModalShow, setEmailModalShow] = useState(false);
      const email = useSelector((state: RootState) => state.auth.email);
      const uid = useSelector((state: RootState) => state.auth.pk);
      const changeEmail = () => {
        dispatch(updateEmailConfirm(values.email, uid));
        setEmailModalShow(true);
      };
      return (
        <div className="notifications__main">
          <p style={{ padding: '16px 24px' }}>Email</p>
          <input
            className="notifications__input"
            value={values.email}
            onChange={(val) => setFieldValue('email', val.target.value)}
          ></input>
          <button
            className="notifications__settingBtn"
            onClick={() => {
              changeEmail();
            }}
            disabled={email === values.email ? true : false}
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
    const ConfidentialitySettings = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать статус активности </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="hide_online"
              checked={values.hide_online}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('hide_online', val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать количество подписчиков</p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="show_fans_amount"
              checked={values.show_fans_amount}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('show_fans_amount', val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Показывать количество постов </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="show_post_amount"
              checked={values.show_post_amount}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('show_post_amount', val.target.checked);
                return submit();
              }}
            ></input>
          </div>
        </div>
      );
    };
    const EmailSettingsNotifications = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__listBlock">
            <p>Уведомления электронной почты </p>
            <input
              type="checkbox"
              name="email_notifications"
              className="notifications__toggle-button"
              checked={values.email_notifications}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('email_notifications', val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <p className="notifications__listText">
            Получайте электронные письма, чтобы узнать, что происходит, когда вы не находитесь на HypeFans. Вы можете
            выключить их в любое время.
          </p>
        </div>
      );
    };
    const PageSettingsNotifications = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые комментарии </p>
            <input
              type="checkbox"
              name="email_notifications"
              className="notifications__toggle-button"
              checked={values.email_notifications}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue('email_notifications', val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые лайки </p>
            <input type="checkbox" className="notifications__toggle-button" onChange={() => submit()}></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые подписки </p>
            <input type="checkbox" className="notifications__toggle-button" onChange={() => submit()}></input>
          </div>
          <div className="notifications__longList" style={{ borderBottom: '1px solid #bbc1e1' }}>
            <p>Новые донаты </p>
            <input type="checkbox" className="notifications__toggle-button" onChange={() => submit()}></input>
          </div>
        </div>
      );
    };
    const SettingsNotifications = () => {
      return (
        <div className="notifications__main">
          <Link to="/settings/notifications/push">
            <NotificationSidebarItem text="Push-уведомления" />
          </Link>
          <Link to="/settings/notifications/email">
            <NotificationSidebarItem text="Email-уведомления" />
          </Link>
          <Link to="/settings/notifications/page">
            <NotificationSidebarItem text="Уведомления на сайте" />
          </Link>
        </div>
      );
    };
    const PricesSettings = () => {
      return (
        <div className="notifications__main">
          <Link to="/settings/prices/messages">
            <NotificationSidebarItem text="Цена сообщения" />
          </Link>
          <Link to="/settings/prices/subscribes">
            <NotificationSidebarItem text="Цена подписки" />
          </Link>
          <Link to="/settings/prices/fans">
            <NotificationSidebarItem text="Для фанатов" />
          </Link>
        </div>
      );
    };
    const MessagesPrice = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <p>Пользователь сможет общаться с вами, только заплатив определенную сумму.</p>
            <div className="notifications__free">
              <h2>Бесплатно</h2>
              <input
                type="checkbox"
                className="notifications__toggle-button"
                name="message_price"
                checked={values.message_price === 0}
                disabled={isDisabled}
                onChange={(val) => {
                  if (val.target.checked) {
                    setFieldValue('message_price', 0);
                  } else {
                    setFieldValue('message_price', 1);
                  }
                  return submit();
                }}
              ></input>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}>
            <p className="notifications__priceText">Цена за 1 месяц</p>
            <CurrencyInput
              className="notifications__input"
              prefix="$"
              name="message_price"
              value={values.message_price}
              placeholder="$ Введите сумму..."
              decimalsLimit={2}
              disabled={values.message_price === 0}
              onValueChange={(value, name) => setFieldValue(name, value)}
              onBlur={() => submit()}
            />
          </div>
        </div>
      );
    };
    const SubscriptionPrice = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <div className="notifications__free" style={{ marginTop: '0px' }}>
              <h2>Бесплатно</h2>
              <input
                type="checkbox"
                className="notifications__toggle-button"
                name="subscribtion_price"
                checked={values.subscribtion_price === 0}
                disabled={isDisabled}
                onChange={(val) => {
                  if (val.target.checked) {
                    setFieldValue('subscribtion_price', 0);
                  } else {
                    setFieldValue('subscribtion_price', 1);
                  }
                  return submit();
                }}
              ></input>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}>
            <p className="notifications__priceText">Цена за 1 месяц</p>
            <CurrencyInput
              className="notifications__input"
              prefix="$"
              name="subscribtion_price"
              value={values.subscribtion_price}
              placeholder="$ Введите сумму..."
              decimalsLimit={2}
              disabled={values.subscribtion_price === 0}
              onValueChange={(value, name) => setFieldValue(name, value)}
              onBlur={() => submit()}
            />
          </div>
        </div>
      );
    };
    const ForFans = ({ values, submit, setFieldValue, isDisabled }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <div className="notifications__free" style={{ marginTop: '0px' }}>
              <h2>1 месяц беспланой подписки</h2>
              <input type="checkbox" className="notifications__toggle-button" onChange={() => submit()}></input>
            </div>
            <p className="notifications__priceText" style={{ marginLeft: '0px', marginBottom: '0px' }}>
              Ваши фанаты смогут делиться ссылкой вашего профиля и за каждого
            </p>
            <p
              className="notifications__priceText"
              style={{ marginLeft: '0px', marginTop: '0px', marginBottom: '0px' }}
            >
              нового подписчика, который подписался по этой ссылке, фанаты будут
            </p>
            <p className="notifications__priceText" style={{ marginLeft: '0px', marginTop: '0px' }}>
              получать месяц бесплатной подписки на 1 месяц.
            </p>
          </div>
        </div>
      );
    };
    return (
      <div className="notifications__mainWrapper">
        <div className="notifications__mainHeader">
          {/* Заголовок*/}
          <Route path="/settings/account" render={() => <Text text="Аккаунт" />} exact />
          <Route path="/settings/confidentiality" render={() => <Text text="Конфеденциальность" />} exact />
          <Route path="/settings/account/sessions" render={() => <Text text="Сеансы входа" />} exact />
          <Route path="/settings/notifications/push" render={() => <Text text="Push-уведомления" />} exact />
          <Route path="/settings/account/phone" render={() => <Text text="Номер телефона" />} exact />
          <Route path="/settings/notifications/email" render={() => <Text text="Email-уведомления" />} exact />
          <Route path="/settings/notifications/page" render={() => <Text text="Уведомления на сайте" />} exact />
          <Route path="/settings/notifications" render={() => <Text text="Уведомления" />} exact />
          <Route path="/settings/prices" render={() => <Text text="Цены" />} exact />
          <Route path="/settings/notifications/account/delete" render={() => <Text text="Удалить аккаунт" />} exact />
          <Route path="/settings/account/email" render={() => <Text text="Изменить Email" />} exact />
          <Route path="/settings/account/password" render={() => <Text text="Изменить пароль" />} exact />
          <Route path="/settings/prices/messages" render={() => <Text text="Цена сообщения" />} exact />
          <Route path="/settings/prices/subscribes" render={() => <Text text="Цена подписки" />} exact />
          <Route path="/settings/prices/fans" render={() => <Text text="Для фанатов" />} exact />
          <Route path="/settings/account/nickname" render={() => <Text text="Изменить ник" />} exact />
          {/* Заголовок(конец)*/}
        </div>
        {/* Главное тело в зависимости от роута*/}
        <Formik
          initialValues={settings}
          onSubmit={(obj) => {
            dispatch(changeSettings(obj));
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <>
                <Route path="/settings/notifications" render={() => <SettingsNotifications />} exact />
                <Route
                  path="/settings/notifications/push"
                  render={() => (
                    <PushSettingsNotifications
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/prices/fans"
                  render={() => (
                    <ForFans
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/notifications/email"
                  render={() => (
                    <EmailSettingsNotifications
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route path="/settings/account" render={() => <AccountSettings />} exact />
                <Route
                  path="/settings/account/nickname"
                  render={() => (
                    <NicknameSettings
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/confidentiality"
                  render={() => (
                    <ConfidentialitySettings
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/notifications/page"
                  render={() => (
                    <PageSettingsNotifications
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/prices/messages"
                  render={() => (
                    <MessagesPrice
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/prices/subscribes"
                  render={() => (
                    <SubscriptionPrice
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/notifications/account/delete"
                  render={() => (
                    <DeleteAccount
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route path="/settings/prices" render={() => <PricesSettings />} exact />
                <Route
                  path="/settings/account/password"
                  render={() => (
                    <PasswordSettings
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/account/phone"
                  render={() => (
                    <PhoneSettings
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/account/delete"
                  render={() => (
                    <DeleteAccount
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/account/sessions"
                  render={() => (
                    <SessionsInfo
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
                <Route
                  path="/settings/account/email"
                  render={() => (
                    <EmailSettings
                      isDisabled={isDisabled}
                      values={values}
                      submit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  exact
                />
              </>
            );
          }}
        </Formik>
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
