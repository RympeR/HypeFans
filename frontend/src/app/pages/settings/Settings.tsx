import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CurrencyInput from "react-currency-input-field";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Recaptcha from "react-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { authAPI } from "../../../api/authAPI";
import {
  historyAction,
  payHistory,
  referralHistory,
  settingsValType,
} from "../../../api/types";
import { userAPI } from "../../../api/userAPI";
import { ExchangeModal } from "../../../app/components/ExchangeComponent/ExchangeModal";
import { useTabs } from "../../../app/components/Tabs";
import { Preloader } from "../../../app/utils/Preloader";
import { ReactComponent as BackIcon } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as BarSvg } from "../../../assets/images/bar-chart-2.svg";
import { ReactComponent as Copy } from "../../../assets/images/copy.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/edit.svg";
import { ReactComponent as FacebookSvg } from "../../../assets/images/facebookRef.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/images/leftIcon.svg";
import { ReactComponent as RefSvg } from "../../../assets/images/link.svg";
import { ReactComponent as PhotoIcon } from "../../../assets/images/cameraLink.svg";
import { ReactComponent as ListSvg } from "../../../assets/images/list.svg";
import { ReactComponent as LogOutSvg } from "../../../assets/images/log-in.svg";
import logo from "../../../assets/images/logo.svg";
import { ReactComponent as Readed } from "../../../assets/images/messageIcon.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/settings.svg";
import { ReactComponent as TelegramSvg } from "../../../assets/images/telegramRef.svg";
import { ReactComponent as ViberSvg } from "../../../assets/images/viberRef.svg";
import { changeSettings, logout } from "../../../redux/authReducer";
import { RootState } from "../../../redux/redux";
import { updateEmailConfirm } from "../../../redux/userReducer";
import { CardComponent } from "../card";
import {
  ExitItem,
  NotificationSidebarItem,
  SettingsSidebarItem,
} from "../notifications/NotificationSidebarItem";
import { ListsComponent } from "./List";

export const Settings = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const settings = useSelector((state: RootState) => state.auth);
  const SettingsButton = () => <SettingsIcon />;
  const isDisabled = useSelector(
    (state: RootState) => state.auth.isSettingsDisabled
  );
  const Text = ({ text }: { text: string }) => {
    const lastLocation =
      history.location.pathname.split("/")[
      history.location.pathname.split("/").length - 1
      ];
    return (
      <>
        <p className="notifications__none">{text}</p>
        <div
          className="notifications__sidebarItemPhone"
          style={{ justifyContent: "flex-start" }}
        >
          <div>
            <ArrowLeft
              onClick={() => {
                if (lastLocation === "mobileSidebar") {
                  history.push("/notifications");
                } else if (
                  lastLocation === "profileSettings" ||
                  lastLocation === "card" ||
                  lastLocation === "lists" ||
                  lastLocation === "stats" ||
                  lastLocation === "lang"
                ) {
                  history.push("/settings/profileSettings/mobileSidebar");
                }
                else if (
                  lastLocation === "account" || lastLocation === "confidentiality" || lastLocation === "prices" || lastLocation === "notifications"
                ) {
                  history.push("/settings/mobileSidebar");
                }
                else if (
                  lastLocation === "nickname" || history.location.pathname === "/settings/account/email" || lastLocation === "phone" || lastLocation === "password" || lastLocation === "sessions" || lastLocation === "delete"
                ) {
                  history.push("/settings/account")
                }
                else if (
                  lastLocation === "messages" || lastLocation === "subscribes" || lastLocation === "fans"
                ) {
                  history.push("/settings/prices")
                }
                else if (
                  lastLocation === "push" || history.location.pathname === "/settings/notifications/email" || lastLocation === "page"
                ) {
                  history.push("/settings/notifications")
                }
              }}
            />
          </div>
          <div style={{ marginLeft: "40px", marginTop: "7px" }}>{text}</div>
        </div>
      </>
    );
  };

  const LangComponent = () => {
    return (
      <div className="notifications__main">
        <div
          style={{ padding: "16px 24px", fontSize: "20px", display: "flex" }}
        >
          Українська
        </div>
        <div
          style={{
            padding: "16px 24px",
            fontSize: "20px",
            borderTop: "1px solid grey",
          }}
        >
          English
        </div>
        <div
          style={{
            padding: "16px 24px",
            fontSize: "20px",
            borderTop: "1px solid grey",
            display: "flex",
          }}
        >
          Русский
          <div style={{ marginLeft: "5px" }}>
            <Readed />
          </div>
        </div>
      </div>
    );
  };

  const ProfileSettingsSidebar = ({ showStyle }: { showStyle: boolean }) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const logoutFunc = async () => {
      Cookies?.set("token", null);
      await dispatch(logout())
      history.push("/");
    };

    const selectedColor = "#F9F9F9";
    return (
      <div
        className={
          showStyle ? "notifications__sidebarMobile" : "notifications__sidebar"
        }
      >
        <Link
          to="/settings/profileSettings"
          style={
            pathname === "/settings/profileSettings"
              ? { background: selectedColor }
              : {}
          }
        >
          <SettingsSidebarItem text="Реферальная ссылка">
            <RefSvg />
          </SettingsSidebarItem>
        </Link>
        <ExchangeModal />
        <Link
          to="/settings/profileSettings/lists"
          style={
            pathname === "/settings/profileSettings/lists"
              ? { background: selectedColor }
              : {}
          }
        >
          <SettingsSidebarItem text="Списки">
            <ListSvg />
          </SettingsSidebarItem>
        </Link>
        <Link
          to="/settings/profileSettings/stats"
          style={
            pathname === "/settings/profileSettings/stats"
              ? { background: selectedColor }
              : {}
          }
        >
          <SettingsSidebarItem text="Статистика">
            <BarSvg />
          </SettingsSidebarItem>
        </Link>
        <Link
          to="/personalSettings"
          style={
            pathname === "/personalSettings"
              ? { background: selectedColor }
              : {}
          }
        >
          <SettingsSidebarItem text="Редактирование профиля">
            <PhotoIcon />
          </SettingsSidebarItem>
        </Link>
        <Link
          to="/settings/profileSettings/lang"
          style={
            pathname === "/settings/profileSettings/lang"
              ? { background: selectedColor }
              : {}
          }
        >
          <SettingsSidebarItem text="Язык">
            <EditSvg />
          </SettingsSidebarItem>
        </Link>
        <div
          onClick={() => {
            setShow(true);
          }}
        >
          <ExitItem text="Выйти">
            <LogOutSvg />
          </ExitItem>
        </div>
        {show ? (
          <div
            className="card__logout-model"
          // style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              // onClick={() => setShow(false)}
              style={{
                boxShadow: "0px 0px 5px 1px rgba(34, 60, 80, 0.6)",
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "50px",
                width: "80%",
              }}
            >
              <h5 style={{ padding: "5px", textAlign: "center" }}>
                Вы уверены, что хотите выйти из аккаунта?
              </h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <h6 style={{ color: "#FB5734" }} onClick={() => setShow(false)}>
                  Отмена
                </h6>
                <div style={{ width: "20px" }}></div>
                <h6 onClick={() => logoutFunc()}>Продолжить</h6>
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
    const selectedColor = "#F9F9F9";
    return (
      <div
        className={
          showStyle ? "notifications__sidebarMobile" : "notifications__sidebar"
        }
      >
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
        <Link
          to="/settings/account"
          style={
            pathname === "/settings/account"
              ? { background: selectedColor }
              : {}
          }
        >
          <NotificationSidebarItem text="Аккаунт" />
        </Link>
        <Link
          to="/settings/confidentiality"
          style={
            pathname === "/settings/confidentiality"
              ? { background: selectedColor }
              : {}
          }
        >
          <NotificationSidebarItem text="Конфеденциальность" />
        </Link>
        <Link
          to="/settings/prices"
          style={
            pathname === "/settings/prices" ? { background: selectedColor } : {}
          }
        >
          <NotificationSidebarItem text="Цены" />
        </Link>
        {/* <Link
          to="/settings/notifications"
          style={
            pathname === "/settings/notifications"
              ? { background: selectedColor }
              : {}
          }
        >
          <NotificationSidebarItem text="Уведомления" />
        </Link> */}
      </div>
    );
  };

  const NotificationsSidebar = () => {
    const user = useSelector((state: RootState) => state.auth);
    const BackButton = () => <BackIcon onClick={() => {
      if (history.location.pathname !== "/settings/account") {
        history.push("/settings/account")
      } else history.push("/home")
    }} />;
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
                      fontFamily: "Factor A",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "22px",
                      marginBottom: "0px",
                    }}
                  >
                    {user.first_name}
                  </h4>

                  <h5
                    style={{
                      fontFamily: "Factor A",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "16px",
                      lineHeight: "20px",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0px",

                      color: "rgba(0, 0, 0, 0.6)",
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
                if (
                  history.location.pathname.split("/")[2] !== "profileSettings"
                ) {
                  return <Text text="Настройки" />;
                }
              }}
            />
          </p>
          <Link to="/settings/notifications">
            <Route
              path="/settings/profileSettings"
              component={SettingsButton}
            />
          </Link>
        </div>
        {/* Кнопки в сайдбаре в зависимости от роута */}
        <Route
          path="/settings"
          render={() => {
            if (history.location.pathname.split("/")[2] !== "profileSettings") {
              return (
                <Route
                  path="/settings"
                  render={() => <SettingsSidebar showStyle={false} />}
                />
              );
            } else {
              return (
                <Route
                  path="/settings/profileSettings"
                  render={() => <ProfileSettingsSidebar showStyle={false} />}
                />
              );
            }
          }}
        />
      </div>
    );
  };
  const NotificationsMain = () => {
    const dispatch = useDispatch();
    const PushSettingsNotifications = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
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
                setFieldValue("push_notifications", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <p className="notifications__listText">
            Получайте push-уведомления, чтобы узнать, что происходит, когда вы
            не находитесь на HypeFans. Вы можете выключить их в любое время.
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
          <h2
            className="notifications__settings_h2"
            style={{ paddingTop: "40px" }}
          >
            Безопасность
          </h2>
          <Link to="/settings/account/password">
            <NotificationSidebarItem text="Пароль" />
          </Link>
          {/* <Link to="/settings/account/sessions">
            <NotificationSidebarItem text="Сеансы входа" />
          </Link> */}
          <h2
            className="notifications__settings_h2"
            style={{ paddingTop: "40px" }}
          >
            Действия
          </h2>
          <Link to="/settings/notifications/account/delete">
            <NotificationSidebarItem text="Удалить аккаунт" />
          </Link>
        </div>
      );
    };
    const DeleteAccount = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
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
          <h2 style={{ fontSize: "18px", textAlign: "center" }}>
            Аккаунт будет удален
          </h2>
          <h2 style={{ fontSize: "18px", textAlign: "center" }}>
            безвозвратно!
          </h2>
          <button
            className="notifications__settingBtn"
            onClick={() => setDeleteShow(true)}
            disabled={isRobot}
          >
            Удалить
          </button>
          <Modal show={deleteShow} onHide={() => setDeleteShow(false)} centered>
            <Modal.Body className="notifications__modal">
              <h2 style={{ marginBottom: "0px" }}>Вы уверены, что хотите</h2>
              <h2> удалить аккаунт?</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <h3
                  onClick={() => setDeleteShow(false)}
                  style={{ color: "#FB5734" }}
                >
                  Отмена
                </h3>
                <div style={{ width: "20px" }}></div>
                <h3 onClick={() => setDeleteShow(false)}>Продолжить</h3>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    };
    const SessionsInfo = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__sessions notifications__main">
          <h3>MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE</h3>
          <p>188.130.176.46 - Ukraine </p>
          <p>3/23/21 10:42</p>
        </div>
      );
    };
    const NicknameSettings = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      const username = useSelector((state: RootState) => state.auth.username);
      return (
        <div className="notifications__main">
          <p style={{ padding: "16px 24px" }}>Ник</p>
          <input
            className="notifications__input"
            value={values.username}
            onChange={(val) => setFieldValue("username", val.target.value)}
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
    const PasswordSettings = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <p style={{ padding: "16px 24px" }}>Новый пароль</p>
          <input
            className="notifications__input"
            placeholder="Введите новый пароль..."
          ></input>
          <input
            className="notifications__input"
            style={{ marginTop: "16px" }}
            placeholder="Подтвердите новый пароль..."
          ></input>
          <button className="notifications__settingBtn">Сохранить</button>
        </div>
      );
    };

    const PhoneSettings = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <p style={{ padding: "16px 24px" }}> Изменить номер телефона</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ margin: "16px 24px", marginRight: "0px" }}>
              <PhoneInput
                country={"ua"}
                value={values.phone}
                onChange={(phone) => setFieldValue("phone", phone)}
              />
            </div>
            <button
              className="notifications__settingBtn"
              style={{ width: "150px", height: "40px", margin: "12px 12px" }}
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
      const [spends, setSpends] = useState<payHistory>({
        actions: [],
        result_sum: 0,
      });
      const [spendsShow, setSpendsShow] = useState<boolean>(false);
      useEffect(() => {
        const getSpends = async () => {
          const data = await userAPI.getSpends();
          setSpends(data.data);
        };
        getSpends();
      }, []);
      const [earns, setEarns] = useState<payHistory>({
        actions: [],
        result_sum: 0,
      });
      const [earnShow, setEarnShow] = useState<boolean>(false);
      useEffect(() => {
        const getEarns = async () => {
          const data = await userAPI.geEarns();
          setEarns(data.data);
        };
        getEarns();
      }, []);
      const { Tabs, WithTabs } = useTabs([
        {
          label: "Траты",
        },
        {
          label: "Зароботок",
        },
      ]);
      const formatDateTime = (timestamp: number) => {
        const d = new Date(timestamp * 1000);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      };
      const getSpendsText = (item: historyAction) => {
        switch (item.type) {
          case "donation":
            return (
              <div>
                <h3>Вы задонатили @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          case "chat_subscription":
            return (
              <div>
                <h3>Вы подписались на чат с @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          default: {
            return (
              <div>
                <h3>Вы подписались на @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          }
        }
      };
      const getEarnsText = (item: historyAction) => {
        switch (item.type) {
          case "donation":
            return (
              <div>
                <h3>Вам задонатили @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          case "referral_payment":
            return (
              <div>
                <h3>Реферальный бонус @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          case "chat_subscription":
            return (
              <div>
                <h3>На вас чат с @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          default: {
            return (
              <div>
                <h3>На вас подписался @{item.target.username}</h3>
                <h4>{formatDateTime(item.date_time)}</h4>
              </div>
            );
          }
        }
      };

      const balance = useSelector(
        (state: RootState) => state.auth.credit_amount
      );
      const earned = useSelector(
        (state: RootState) => state.auth.earned_credits_amount
      );
      const spended = useSelector(
        (state: RootState) => state.auth.earned_credits_amount
      );

      const [isShow, setShow] = useState(false);
      const isLoading = useSelector((state: RootState) => state.blog.isLoading);
      if (isLoading) {
        return <Preloader />;
      }
      return (
        <div className="notifications__main">
          <div className="notifications__tabs">
            <Tabs></Tabs>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div className="notifications__wallet">
              <div style={{ paddingBottom: "10px" }}>
                <h5>Ваш балланс</h5>
                <h5>${balance}</h5>
              </div>
              <div>
                <WithTabs tab={{ label: "Траты" }} index={0}>
                  <h5>Траты за месяц</h5>
                  <h5>$Не нашел в схеме параметра</h5>
                </WithTabs>
                <WithTabs tab={{ label: "Зароботок" }} index={1}>
                  <h5>Зароботок за месяц</h5>
                  <h5>${earned}</h5>
                </WithTabs>
              </div>
            </div>
            <div className="notifications__walletUnder">
              <h5>История</h5>
              {spends.actions.length > 9 ? (
                <h6 onClick={() => setSpendsShow(!spendsShow)}>
                  {spendsShow ? "Скрыть" : "Все"}
                </h6>
              ) : null}
            </div>
          </div>
          <WithTabs tab={{ label: "Траты" }} index={0}>
            <div className="notifications__walletMain">
              {spends.actions.map((item, key) => {
                return (
                  <>
                    {key < 9 || spendsShow ? (
                      <div
                        className="notifications__walletChild"
                        key={"spends " + key}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <img
                              src={item.target.avatar || logo}
                              alt="avatar"
                            />
                          </div>
                          {getSpendsText(item)}
                        </div>
                        <div
                          style={{
                            fontFamily: "Factor A",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "18px",
                            lineHeight: "20px",
                            color: "#000000",
                            marginRight: "12px",
                          }}
                        >
                          {item.amount}$
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <button
                  className="notifications__settingBtn"
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                  onClick={() => setShow(true)}
                >
                  Пополнить баланс
                </button>
                <Modal show={isShow} onHide={() => setShow(false)} centered>
                  <Modal.Body className="notifications__modal">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <h2>Пополнение балланса</h2>

                      <CurrencyInput
                        prefix="$"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.4)",
                          boxSizing: "border-box",
                          borderRadius: "8px",
                          padding: "8px",
                          marginTop: "16px",
                        }}
                        name="donation_amount"
                        placeholder="$ Введите сумму..."
                        decimalsLimit={2}
                        onValueChange={(value, name) => {
                          return null;
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "15px",
                        }}
                      >
                        <h3 onClick={() => setShow(false)}>Отмена</h3>
                        <div style={{ width: "20px" }}></div>
                        <h3
                          style={{ color: "#FB5734" }}
                          onClick={() => setShow(false)}
                        >
                          Пополнить
                        </h3>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </WithTabs>
          <WithTabs tab={{ label: "Зароботок" }} index={1}>
            <div className="notifications__walletMain">
              {earns.actions.map((item, key) => {
                return (
                  <>
                    {key < 9 || earnShow ? (
                      <div
                        className="notifications__walletChild"
                        key={"spends " + key}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <img
                              src={item.target.avatar || logo}
                              alt="avatar"
                            />
                          </div>
                          {getEarnsText(item)}
                        </div>
                        <div
                          style={{
                            fontFamily: "Factor A",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "18px",
                            lineHeight: "20px",
                            color: "#000000",
                            marginRight: "12px",
                          }}
                        >
                          {item.amount}$
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <button
                  className="notifications__settingBtn"
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                  onClick={() => setShow(true)}
                >
                  Пополнить баланс
                </button>
                <Modal show={isShow} onHide={() => setShow(false)} centered>
                  <Modal.Body className="notifications__modal">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <h2>Пополнение балланса</h2>

                      <CurrencyInput
                        prefix="$"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.4)",
                          boxSizing: "border-box",
                          borderRadius: "8px",
                          padding: "8px",
                          marginTop: "16px",
                        }}
                        name="donation_amount"
                        placeholder="$ Введите сумму..."
                        decimalsLimit={2}
                        onValueChange={(value, name) => {
                          return null;
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "15px",
                        }}
                      >
                        <h3 onClick={() => setShow(false)}>Отмена</h3>
                        <div style={{ width: "20px" }}></div>
                        <h3
                          style={{ color: "#FB5734" }}
                          onClick={() => setShow(false)}
                        >
                          Пополнить
                        </h3>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </WithTabs>
        </div>
      );
    };

    const EmailSettings = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      const [emailModalShow, setEmailModalShow] = useState(false);
      const email = useSelector((state: RootState) => state.auth.email);
      const uid = useSelector((state: RootState) => state.auth.pk);
      const changeEmail = () => {
        dispatch(updateEmailConfirm(values.email, uid));
        setEmailModalShow(true);
      };
      return (
        <div className="notifications__main">
          <p style={{ padding: "16px 24px" }}>Email</p>
          <input
            className="notifications__input"
            value={values.email}
            onChange={(val) => setFieldValue("email", val.target.value)}
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

          <Modal
            show={emailModalShow}
            onHide={() => setEmailModalShow(false)}
            centered
          >
            <Modal.Body className="notifications__modal">
              <h2>Письмо подтверждения</h2>
              <h2> отправлено на данный Email</h2>
              <h3 onClick={() => setEmailModalShow(false)}>Понятно!</h3>
            </Modal.Body>
          </Modal>
        </div>
      );
    };
    const ConfidentialitySettings = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Показывать статус активности </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="hide_online"
              checked={values.hide_online}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue("hide_online", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Показывать количество подписчиков</p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="show_fans_amount"
              checked={values.show_fans_amount}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue("show_fans_amount", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Показывать количество постов </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              name="show_post_amount"
              checked={values.show_post_amount}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue("show_post_amount", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
        </div>
      );
    };
    const EmailSettingsNotifications = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
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
                setFieldValue("email_notifications", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <p className="notifications__listText">
            Получайте электронные письма, чтобы узнать, что происходит, когда вы
            не находитесь на HypeFans. Вы можете выключить их в любое время.
          </p>
        </div>
      );
    };
    const PageSettingsNotifications = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Новые комментарии </p>
            <input
              type="checkbox"
              name="email_notifications"
              className="notifications__toggle-button"
              checked={values.email_notifications}
              disabled={isDisabled}
              onChange={(val) => {
                setFieldValue("email_notifications", val.target.checked);
                return submit();
              }}
            ></input>
          </div>
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Новые лайки </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              onChange={() => submit()}
            ></input>
          </div>
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Новые подписки </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              onChange={() => submit()}
            ></input>
          </div>
          <div
            className="notifications__longList"
            style={{ borderBottom: "1px solid #bbc1e1" }}
          >
            <p>Новые донаты </p>
            <input
              type="checkbox"
              className="notifications__toggle-button"
              onChange={() => submit()}
            ></input>
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
          {/* <Link to="/settings/prices/fans">
            <NotificationSidebarItem text="Для фанатов" />
          </Link> */}
        </div>
      );
    };

    const RefComponent = () => {
      const refLink = useSelector((state: RootState) => state.auth.ref_link);
      const [referrals, setReferrals] = useState<referralHistory>({
        referral_payments: [],
        result_sum: 0,
      });
      const [show, setShow] = useState<boolean>(false);
      useEffect(() => {
        const getReferrals = async () => {
          const data = await userAPI.getReferrals();
          setReferrals(data.data);
        };
        getReferrals();
      }, []);
      return (
        <div className="notifications__main" style={{ padding: "16px 24px" }}>
          <h2 style={{ fontWeight: "bold", fontSize: "14px" }}>
            Пригласите друга - получите 5% от его дохода
          </h2>
          <h3 style={{ fontSize: "14px", fontWeight: "normal" }}>
            Когда новый пользователь зарегестрируется на HypeFans и начнет
            зарабатывать, 5% от его дохода будет приходить на Ваш счет
          </h3>
          <div
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
          >
            <h4 style={{ fontSize: "14px", fontWeight: "bold" }}>
              hype-fans.com/signup/root/prewf...
            </h4>
            <div style={{ marginLeft: "24px" }}>
              <CopyToClipboard text={refLink}>
                <Copy style={{ cursor: "pointer" }} />
              </CopyToClipboard>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "12px" }}
          >
            <FacebookSvg />
            <TelegramSvg style={{ margin: "0px 24px" }} />
            <ViberSvg />
          </div>
          <div
            className="notifications__walletUnder"
            style={{ marginRight: "0px", marginLeft: "10px" }}
          >
            <h5>Ваши накопления:</h5>
            {referrals.referral_payments.length > 9 ? (
              <h6 onClick={() => setShow(!show)}>{show ? "Скрыть" : "Все"}</h6>
            ) : null}
          </div>
          <div className="notifications__walletMain">
            {referrals.referral_payments.length > 0 ? (
              referrals.referral_payments.map((item, index) => {
                return (
                  <>
                    {index < 9 || show ? (
                      <div
                        className="notifications__walletChild"
                        style={{ border: "none" }}
                        key={index + "referrals"}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <img src={item.source.avatar || logo} alt="img" />
                          </div>
                          <div>
                            <h3
                              style={{ fontWeight: "bold", fontSize: "14px" }}
                            >
                              {item.source.first_name ?? "Имя"}
                            </h3>
                            <h4>@{item.source.username}</h4>
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            color: "#000000",
                            marginRight: "12px",
                          }}
                        >
                          {item.amount}$
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })
            ) : (
              <div
                className="notifications__walletChild"
                style={{ border: "none", marginLeft: "20px" }}
              >
                Пока пусто
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <button
              className="notifications__settingBtn"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <Link
                to="/settings/profileSettings/stats"
                style={{ color: "white" }}
              >
                Мой счет
              </Link>
            </button>
          </div>
        </div>
      );
    };

    const MessagesPrice = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <p>
              Пользователь сможет общаться с вами, только заплатив определенную
              сумму.
            </p>
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
                    setFieldValue("message_price", 0);
                  } else {
                    setFieldValue("message_price", 1);
                  }
                  return submit();
                }}
              ></input>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
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
    const SubscriptionPrice = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <div className="notifications__free" style={{ marginTop: "0px" }}>
              <h2>Бесплатно</h2>
              <input
                type="checkbox"
                className="notifications__toggle-button"
                name="subscribtion_price"
                checked={values.subscribtion_price === 0}
                disabled={isDisabled}
                onChange={(val) => {
                  if (val.target.checked) {
                    setFieldValue("subscribtion_price", 0);
                  } else {
                    setFieldValue("subscribtion_price", 1);
                  }
                  return submit();
                }}
              ></input>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
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
    const ForFans = ({
      values,
      submit,
      setFieldValue,
      isDisabled,
    }: settingsValType) => {
      return (
        <div className="notifications__main">
          <div className="notifications__pricesHeader">
            <div className="notifications__free" style={{ marginTop: "0px" }}>
              <h2>1 месяц беспланой подписки</h2>
              <input
                type="checkbox"
                className="notifications__toggle-button"
                onChange={() => submit()}
              ></input>
            </div>
            <p
              className="notifications__priceText"
              style={{ marginLeft: "0px", marginBottom: "0px" }}
            >
              Ваши фанаты смогут делиться ссылкой вашего профиля и за каждого
            </p>
            <p
              className="notifications__priceText"
              style={{
                marginLeft: "0px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              нового подписчика, который подписался по этой ссылке, фанаты будут
            </p>
            <p
              className="notifications__priceText"
              style={{ marginLeft: "0px", marginTop: "0px" }}
            >
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
          <Route
            path="/settings/profileSettings"
            render={() => <Text text="Реферальная ссылка    " />}
            exact
          />
          <Route
            path="/settings/account"
            render={() => <Text text="Аккаунт" />}
            exact
          />
          <Route
            path="/settings/profileSettings/card"
            render={() => <Text text="Карта" />}
            exact
          />
          <Route
            path="/settings/profileSettings/lists"
            render={() => <Text text="Списки" />}
            exact
          />
          <Route
            path="/settings/profileSettings/stats"
            render={() => <Text text="Статистика" />}
            exact
          />
          <Route
            path="/settings/profileSettings/lang"
            render={() => <Text text="Язык" />}
            exact
          />
          <Route
            path="/settings/confidentiality"
            render={() => <Text text="Конфеденциальность" />}
            exact
          />
          <Route
            path="/settings/account/sessions"
            render={() => <Text text="Сеансы входа" />}
            exact
          />
          <Route
            path="/settings/notifications/push"
            render={() => <Text text="Push-уведомления" />}
            exact
          />
          <Route
            path="/settings/account/phone"
            render={() => <Text text="Номер телефона" />}
            exact
          />
          <Route
            path="/settings/notifications/email"
            render={() => <Text text="Email-уведомления" />}
            exact
          />
          <Route
            path="/settings/notifications/page"
            render={() => <Text text="Уведомления на сайте" />}
            exact
          />
          <Route
            path="/settings/notifications"
            render={() => <Text text="Уведомления" />}
            exact
          />
          <Route
            path="/settings/prices"
            render={() => <Text text="Цены" />}
            exact
          />
          <Route
            path="/settings/notifications/account/delete"
            render={() => <Text text="Удалить аккаунт" />}
            exact
          />
          <Route
            path="/settings/account/email"
            render={() => <Text text="Изменить Email" />}
            exact
          />
          <Route
            path="/settings/account/password"
            render={() => <Text text="Изменить пароль" />}
            exact
          />
          <Route
            path="/settings/prices/messages"
            render={() => <Text text="Цена сообщения" />}
            exact
          />
          <Route
            path="/settings/prices/subscribes"
            render={() => <Text text="Цена подписки" />}
            exact
          />
          <Route
            path="/settings/prices/fans"
            render={() => <Text text="Для фанатов" />}
            exact
          />
          <Route
            path="/settings/account/nickname"
            render={() => <Text text="Изменить ник" />}
            exact
          />
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
                <Route
                  path="/settings/notifications"
                  render={() => <SettingsNotifications />}
                  exact
                />
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
                                history.push("/settings/mobileSidebar");
                              }}
                            />
                          </div>

                          <div>
                            <h4
                              style={{
                                fontFamily: "Factor A",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "22px",
                                marginBottom: "0px",
                              }}
                            >
                              @{user.first_name}
                            </h4>
                            <h5
                              style={{
                                fontFamily: "Factor A",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "16px",
                                lineHeight: "20px",
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "0px",

                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              @{user.username}
                            </h5>
                          </div>
                          <Link to="/settings/mobileSidebar">
                            <Route
                              path="/settings/profileSettings"
                              component={SettingsButton}
                            />
                          </Link>
                        </div>
                        {/* Кнопки в сайдбаре в зависимости от роута */}
                        <ProfileSettingsSidebar showStyle={true} />
                      </div>
                    );
                  }}
                />
                <Route
                  path="/settings/profileSettings"
                  render={() => <RefComponent />}
                  exact
                />
                <Route
                  path="/settings/profileSettings/lists"
                  render={() => <ListsComponent />}
                  exact
                />
                <Route
                  path="/settings/profileSettings/stats"
                  render={() => <WalletComponent />}
                  exact
                />
                <Route
                  path="/settings/profileSettings/card"
                  render={() => <CardComponent />}
                  exact
                />
                <Route
                  path="/settings/profileSettings/lang"
                  render={() => <LangComponent />}
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
                <Route
                  path="/settings/account"
                  render={() => <AccountSettings />}
                  exact
                />
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
                <Route
                  path="/settings/prices"
                  render={() => <PricesSettings />}
                  exact
                />
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
