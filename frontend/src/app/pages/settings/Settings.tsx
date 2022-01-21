import { Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CurrencyInput from 'react-currency-input-field';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Recaptcha from 'react-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { authAPI } from '~/api/authAPI';
import { historyAction, settingsValType } from '~/api/types';
import { ExchangeModal } from '~/app/components/ExchangeComponent/ExchangeModal';
import { useTabs } from '~/app/components/Tabs';
import { changeSettings } from '~/redux/authReducer';
import { RootState } from '~/redux/redux';
import { updateEmailConfirm, userGetSpendHistory, userGetEarnHistory } from '~/redux/userReducer';
import { ReactComponent as BackIcon } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as BarSvg } from '../../../assets/images/bar-chart-2.svg';
import { ReactComponent as Copy } from '../../../assets/images/copy.svg';
import { ReactComponent as EditSvg } from '../../../assets/images/edit.svg';
import { ReactComponent as FacebookSvg } from '../../../assets/images/facebookRef.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/images/leftIcon.svg';
import { ReactComponent as RefSvg } from '../../../assets/images/link.svg';
import { ReactComponent as ListSvg } from '../../../assets/images/list.svg';
import { ReactComponent as LogOutSvg } from '../../../assets/images/log-in.svg';
import { ReactComponent as Readed } from '../../../assets/images/messageIcon.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/images/settings.svg';
import { ReactComponent as TelegramSvg } from '../../../assets/images/telegramRef.svg';
import { ReactComponent as ViberSvg } from '../../../assets/images/viberRef.svg';
import { CardComponent } from '../card';
import { ExitItem, NotificationSidebarItem, SettingsSidebarItem } from '../notifications/NotificationSidebarItem';
import { ListsComponent } from './List';

export const Settings = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const settings = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userGetSpendHistory());
    dispatch(userGetEarnHistory());
  }, []);
  const earnHistory = useSelector((state: RootState) => state.user.earnHistory);
  const spendHistory = useSelector((state: RootState) => state.user.spendHistory);
  const isDisabled = useSelector((state: RootState) => state.auth.isSettingsDisabled);
  const SettingsButton = () => <SettingsIcon />;
  const Text = ({ text }: { text: string }) => {
    const lastLocation = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1];
    return (
      <>
        <p className="notifications__none">{text}</p>
        <div className="notifications__sidebarItemPhone" style={{ justifyContent: 'flex-start' }}>
          <div>
            <ArrowLeft
              onClick={() => {
                if (lastLocation === 'mobileSidebar') {
                  history.push('/notifications');
                } else if (lastLocation === 'profileSettings' || 'card' || 'lists' || 'stats' || 'lang') {
                  history.push('/settings/profileSettings/mobileSidebar');
                } else if (lastLocation === 'account' || 'confidentiality' || 'prices' || 'notifications') {
                  history.push('/settings/mobileSidebar');
                }
              }}
            />
          </div>
          <div style={{ marginLeft: '40px', marginTop: '7px' }}>{text}</div>
        </div>
      </>
    );
  };

  const LangComponent = () => {
    return (
      <div className="notifications__main">
        <div style={{ padding: '16px 24px', fontSize: '20px', display: 'flex' }}>Українська</div>
        <div style={{ padding: '16px 24px', fontSize: '20px', borderTop: '1px solid grey' }}>English</div>
        <div style={{ padding: '16px 24px', fontSize: '20px', borderTop: '1px solid grey', display: 'flex' }}>
          Русский
          <div style={{ marginLeft: '5px' }}>
            <Readed />
          </div>
        </div>
      </div>
    );
  };

  const ProfileSettingsSidebar = ({ showStyle }: { showStyle: boolean }) => {
    console.log(showStyle);
    const user = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const [show, setShow] = useState(false);

    const logout = () => {
      Cookies?.set('token', '');
      authAPI.logout();
      history.push('/');
    };

    const selectedColor = '#F9F9F9';
    return (
      <div className={showStyle ? 'notifications__sidebarMobile' : 'notifications__sidebar'}>
        <Link
          to="/settings/profileSettings"
          style={pathname === '/settings/profileSettings' ? { background: selectedColor } : {}}
        >
          <SettingsSidebarItem text="Реферальная ссылка">
            <RefSvg />
          </SettingsSidebarItem>
        </Link>
        <ExchangeModal />
        <Link
          to="/settings/profileSettings/lists"
          style={pathname === '/settings/profileSettings/lists' ? { background: selectedColor } : {}}
        >
          <SettingsSidebarItem text="Списки">
            <ListSvg />
          </SettingsSidebarItem>
        </Link>
        <Link
          to="/settings/profileSettings/stats"
          style={pathname === '/settings/profileSettings/stats' ? { background: selectedColor } : {}}
        >
          <SettingsSidebarItem text="Статистика">
            <BarSvg />
          </SettingsSidebarItem>
        </Link>
        <Link
          to="/settings/profileSettings/lang"
          style={pathname === '/settings/profileSettings/lang' ? { background: selectedColor } : {}}
        >
          <SettingsSidebarItem text="Язык">
            <EditSvg />
          </SettingsSidebarItem>
        </Link>
        <div onClick={() => setShow(true)}>
          <ExitItem text="Выйти">
            <LogOutSvg />
          </ExitItem>
        </div>
        {show ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              // onClick={() => setShow(false)}
              style={{
                boxShadow: '0px 0px 5px 1px rgba(34, 60, 80, 0.6)',
                backgroundColor: 'white',
                borderRadius: '8px',
                marginTop: '50px',
                width: '80%'
              }}
            >
              <h5 style={{ padding: '5px', textAlign: 'center' }}>Вы уверены, что хотите выйти из аккаунта?</h5>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <h6 style={{ color: '#FB5734' }} onClick={() => setShow(false)}>
                  Отмена
                </h6>
                <div style={{ width: '20px' }}></div>
                <h6 onClick={() => logout()}>Продолжить</h6>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const SettingsSidebar = ({ showStyle }: { showStyle: boolean }) => {
    const selectedColor = '#F9F9F9';
    const BackButton = () => <BackIcon onClick={history.goBack} />;
    return (
      <div className={showStyle ? 'notifications__sidebarMobile' : 'notifications__sidebar'}>
        <div className="notifications__displayMobile">
          <Link to="/settings/profileSettings/mobileSidebar">
            <NotificationSidebarItem text="Профиль" />
          </Link>
        </div>
        <div className="notifications__none">
          <Link to="/settings/profileSettings">
            <NotificationSidebarItem text="Профиль" />
          </Link>
        </div>
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

  const NotificationsSidebar = () => {
    const user = useSelector((state: RootState) => state.auth);
    const BackButton = () => <BackIcon onClick={history.goBack} />;
    return (
      <div>
        <div className="notifications__header">
          <div className="notifications__back">
            <BackButton />
          </div>
          <Route
            path="/settings/profileSettings"
            render={() => {
              return (
                <div>
                  <h4
                    style={{
                      fontFamily: 'Factor A',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      fontSize: '22px',
                      marginBottom: '0px'
                    }}
                  >
                    {user.first_name}
                  </h4>

                  <h5
                    style={{
                      fontFamily: 'Factor A',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '16px',
                      lineHeight: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0px',

                      color: 'rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    @{user.username}
                  </h5>
                </div>
              );
            }}
          />

          <p className="notifications__headingText">
            <Route
              path="/settings"
              render={() => {
                if (history.location.pathname.split('/')[2] !== 'profileSettings') {
                  return <Text text="Настройки" />;
                }
              }}
            />
          </p>
          <Link to="/settings/notifications">
            <Route path="/settings/profileSettings" component={SettingsButton} />
          </Link>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
        <Route
          path="/settings"
          render={() => {
            if (history.location.pathname.split('/')[2] !== 'profileSettings') {
              return <Route path="/settings" render={() => <SettingsSidebar showStyle={false} />} />;
            } else {
              return (
                <Route path="/settings/profileSettings" render={() => <ProfileSettingsSidebar showStyle={false} />} />
              );
            }
          }}
        />
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
          <p style={{ padding: '16px 24px' }}> Изменить номер телефона</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ margin: '16px 24px', marginRight: '0px' }}>
              <PhoneInput country={'ua'} value={values.phone} onChange={(phone) => setFieldValue('phone', phone)} />
            </div>
            <button
              className="notifications__settingBtn"
              style={{ width: '150px', height: '40px', margin: '12px 12px' }}
              onClick={() => submit()}
              disabled={isDisabled}
            >
              Изменить
            </button>
          </div>
        </div>
      );
    };

    const WalletComponent = () => {
      const { Tabs, WithTabs } = useTabs([
        {
          label: 'Траты'
        },
        {
          label: 'Зароботок'
        }
      ]);
      const linka2 =
        'data:image/jpeg;base64,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';
      const linka =
        'data:image/jpeg;base64,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';

      const [isShow, setShow] = useState(false);

      return (
        <div className="notifications__main">
          <div className="notifications__tabs">
            <Tabs></Tabs>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
            <div className="notifications__wallet">
              <h5>Балланс</h5>
              <h5>$320</h5>
            </div>
            <div className="notifications__walletUnder">
              <h5>История</h5>
              <h6>Все</h6>
            </div>
          </div>
          <WithTabs tab={{ label: 'Траты' }} index={0}>
            <div className="notifications__walletMain">
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka2} alt="img" />
                  </div>
                  <div>
                    <h3>Вы задонатили Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka2} alt="img" />
                  </div>
                  <div>
                    <h3>Вы задонатили Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka2} alt="img" />
                  </div>
                  <div>
                    <h3>Вы задонатили Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                <button
                  className="notifications__settingBtn"
                  style={{ marginLeft: '0px', marginRight: '0px' }}
                  onClick={() => setShow(true)}
                >
                  Пополнить баланс
                </button>
                <Modal show={isShow} onHide={() => setShow(false)} centered>
                  <Modal.Body className="notifications__modal">
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
                      <h2>Пополнение балланса</h2>

                      <CurrencyInput
                        prefix="$"
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.4)',
                          boxSizing: 'border-box',
                          borderRadius: '8px',
                          padding: '8px',
                          marginTop: '16px'
                        }}
                        name="donation_amount"
                        placeholder="$ Введите сумму..."
                        decimalsLimit={2}
                        onValueChange={(value, name) => {
                          return null;
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                        <h3 onClick={() => setShow(false)}>Отмена</h3>
                        <div style={{ width: '20px' }}></div>
                        <h3 style={{ color: '#FB5734' }} onClick={() => setShow(false)}>
                          Пополнить
                        </h3>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </WithTabs>
          <WithTabs tab={{ label: 'Зароботок' }} index={1}>
            <div className="notifications__walletMain">
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka} alt="img" />
                  </div>
                  <div>
                    <h3>Вам задонатил Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka} alt="img" />
                  </div>
                  <div>
                    <h3>Вам задонатил Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka} alt="img" />
                  </div>
                  <div>
                    <h3>Вам задонатил Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div className="notifications__walletChild">
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={linka} alt="img" />
                  </div>
                  <div>
                    <h3>Вам задонатил Valera</h3>
                    <h4>вчера</h4>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Factor A',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '20px',
                    color: '#000000',
                    marginRight: '12px'
                  }}
                >
                  100$
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                <button className="notifications__settingBtn" style={{ marginLeft: '0px', marginRight: '0px' }}>
                  <Link to="/settings/profileSettings/card" style={{ color: 'white' }}>
                    Карта
                  </Link>
                </button>
              </div>
            </div>
          </WithTabs>
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

    const RefComponent = () => {
      const refLink = useSelector((state: RootState) => state.auth.ref_link);
      const linka2 =
        'data:image/jpeg;base64,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';
      return (
        <div className="notifications__main" style={{ padding: '16px 24px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '14px' }}>Пригласите друга - получите 5% от его дохода</h2>
          <h3 style={{ fontSize: '14px', fontWeight: 'normal' }}>
            Когда новый пользователь зарегестрируется на HypeFans и начнет зарабатывать, 5% от его дохода будет
            приходить на Ваш счет
          </h3>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>hype-fans.com/signup/root/prewf...</h4>
            <div style={{ marginLeft: '24px' }}>
              <CopyToClipboard text={refLink}>
                <Copy style={{ cursor: 'pointer' }} />
              </CopyToClipboard>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
            <FacebookSvg />
            <TelegramSvg style={{ margin: '0px 24px' }} />
            <ViberSvg />
          </div>
          <div className="notifications__walletUnder" style={{ marginRight: '0px', marginLeft: '10px' }}>
            <h5>Ваши накопления:</h5>
            <h6>Все</h6>
          </div>
          <div className="notifications__walletMain">
            <div className="notifications__walletChild" style={{ border: 'none' }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <img src={linka2} alt="img" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>Valera Petrov</h3>
                  <h4>@ValeraMLG</h4>
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Factor A',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '18px',
                  lineHeight: '20px',
                  color: '#000000',
                  marginRight: '12px'
                }}
              >
                100$
              </div>
            </div>
            <div className="notifications__walletChild" style={{ border: 'none' }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <img src={linka2} alt="img" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>Valera Petrov</h3>
                  <h4>@ValeraMLG</h4>
                </div>
              </div>
              <div
                style={{
                  fontSize: '18px',
                  lineHeight: '20px',
                  color: '#000000',
                  marginRight: '12px'
                }}
              >
                100$
              </div>
            </div>
            <div className="notifications__walletChild" style={{ border: 'none' }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <img src={linka2} alt="img" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '14px' }}>Valera Petrov</h3>
                  <h4>@ValeraMLG</h4>
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Factor A',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '18px',
                  lineHeight: '20px',
                  color: '#000000',
                  marginRight: '12px'
                }}
              >
                100$
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
            <button className="notifications__settingBtn" style={{ marginLeft: '0px', marginRight: '0px' }}>
              <Link to="/settings/profileSettings/stats" style={{ color: 'white' }}>
                Мой счет
              </Link>
            </button>
          </div>
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
    const user = useSelector((state: RootState) => state.auth);
    return (
      <div className="notifications__mainWrapper">
        <div className="notifications__mainHeader">
          {/* Заголовок*/}
          <Route path="/settings/profileSettings" render={() => <Text text="Реферальная ссылка    " />} exact />
          <Route path="/settings/account" render={() => <Text text="Аккаунт" />} exact />
          <Route path="/settings/profileSettings/card" render={() => <Text text="Карта" />} exact />
          <Route path="/settings/profileSettings/lists" render={() => <Text text="Списки" />} exact />
          <Route path="/settings/profileSettings/stats" render={() => <Text text="Статистика" />} exact />
          <Route path="/settings/profileSettings/lang" render={() => <Text text="Язык" />} exact />
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
                  path="/settings/mobileSidebar"
                  render={() => {
                    return (
                      <div>
                        <Text text="Настройки" />
                        <SettingsSidebar showStyle={true} />
                      </div>
                    );
                  }}
                />
                <Route
                  path="/settings/profileSettings/mobileSidebar"
                  render={() => {
                    return (
                      <div>
                        <div className="notifications__headerMobile">
                          <div className="notifications__back">
                            <BackIcon
                              onClick={() => {
                                history.push('/settings/mobileSidebar');
                              }}
                            />
                          </div>

                          <div>
                            <h4
                              style={{
                                fontFamily: 'Factor A',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: '22px',
                                marginBottom: '0px'
                              }}
                            >
                              @{user.first_name}
                            </h4>
                            <h5
                              style={{
                                fontFamily: 'Factor A',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '16px',
                                lineHeight: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '0px',

                                color: 'rgba(0, 0, 0, 0.6)'
                              }}
                            >
                              @{user.username}
                            </h5>
                          </div>
                          <Link to="/settings/mobileSidebar">
                            <Route path="/settings/profileSettings" component={SettingsButton} />
                          </Link>
                        </div>
                        {/* Кнопки в сайдбаре в зависимости от роута */}
                        <ProfileSettingsSidebar showStyle={true} />
                      </div>
                    );
                  }}
                />
                <Route path="/settings/profileSettings" render={() => <RefComponent />} exact />
                <Route path="/settings/profileSettings/lists" render={() => <ListsComponent />} exact />
                <Route path="/settings/profileSettings/stats" render={() => <WalletComponent />} exact />
                <Route path="/settings/profileSettings/card" render={() => <CardComponent />} exact />
                <Route path="/settings/profileSettings/lang" render={() => <LangComponent />} exact />
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
