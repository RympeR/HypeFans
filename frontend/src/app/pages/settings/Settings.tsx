import { Formik } from "formik";
import React, { useContext } from "react";
import CurrencyInput from "react-currency-input-field";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import {
  settingsValType,
} from "../../../api/types";
import { ReactComponent as BackIcon } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/settings.svg";
import { changeSettings } from "../../../redux/authReducer";
import { RootState } from "../../../redux/redux";
import { CardComponent } from "../card";
import {
  NotificationSidebarItem,
} from "../notifications/NotificationSidebarItem";
import { ListsComponent } from "./List";
import { LangContext } from "../../../app/utils/LangProvider";
import { LangComponent } from "../../../app/components/langComponent/LangComponent";
import { Text } from "../../../app/components/text/Text";
import { ProfileSettingsSidebar } from "./ProfileSettingsSidebar";
import { RefComponent } from "./RefComponent";
import { SettingsSidebar } from "./SettingsSidebar";
import { NotificationsSidebar } from "./NotificationsSidebar";
import { AccountSettings } from "./AccountSettings";
import { PushSettingsNotifications } from "./PushSettingsNotifications";
import { DeleteAccount } from "./DeleteAccount";
import { NicknameSettings } from "./NicknameSettings";
import { SessionsInfo } from "./SessionInfo";
import { PasswordSettings } from "./PasswordSettings";
import { PhoneSettings } from "./PhoneSettings";
import { WalletComponent } from "./WalletComponent";
import { EmailSettings } from "./EmailSettings";
import { ConfidentialitySettings } from "./ConfidentionalitySettings";
import { EmailSettingsNotifications } from "./EmailSettingsNotifications";
import { PageSettingsNotifications } from "./PageSettingsNotifications";
import { SettingsNotifications } from "./SettingsNotifications";
import { PricesSettings } from "./PricesSettings";
import { MessagesPrice } from "./MessagesPrice";
import { SubscriptionPrice } from "./SubscriptionPrice";
import { ForFans } from "./ForFans";
import { ListsText } from "../../../app/components/listsText/ListsText";
import { DistributionComponent } from "./DistributionComponent";

export const Settings = () => {
  const { currentLang } = useContext(LangContext)
  const history = useHistory();
  const settings = useSelector((state: RootState) => state.auth);
  const SettingsButton = () => <SettingsIcon />;
  const isDisabled = useSelector(
    (state: RootState) => state.auth.isSettingsDisabled
  );

  const NotificationsMain = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth);
    const articles = [
      { path: "/settings/profileSettings", text: currentLang.refLink },
      { path: "/settings/account", text: currentLang.account },
      { path: "/settings/profileSettings/card", text: currentLang.card },
      { path: "/settings/profileSettings/stats", text: currentLang.stats },
      { path: "/settings/profileSettings/lang", text: currentLang.lang },
      { path: "/settings/confidentiality", text: currentLang.security },
      { path: "/settings/accout/sessions", text: currentLang.sessions },
      { path: "/settings/notifications/push", text: currentLang.pushNotf },
      { path: "/settings/account/phone", text: currentLang.phone },
      { path: "/settings/notifications/email", text: currentLang.emailNotf },
      { path: "/settings/notifications", text: currentLang.notifications },
      { path: "/settings/prices", text: currentLang.prices },
      { path: "/settings/notifications/account/delete", text: currentLang.dellAcc },
      { path: "/settings/account/email", text: currentLang.changeEmail },
      { path: "/settings/account/password", text: currentLang.changePass },
      { path: "/settings/prices/messages", text: currentLang.msgprice },
      { path: "/settings/prices/subscribes", text: currentLang.price },
      // { path: "/settings/prices/fans", text: currentLang.forFun },
      { path: "/settings/account/nickname", text: currentLang.changeNick }
    ]
    return (
      <div className="notifications__mainWrapper">
        <div className="notifications__mainHeader">
          {/* Заголовок*/}
          {articles.map((item, index) => {
            return (
              <Route
                path={item.path}
                render={() => <Text text={item.text} />}
                exact
              />
            )
          })}
          <Route
            path="/settings/profileSettings/distribution"
            render={() => <Text text="Рассылка" />}
            exact
          />
          <Route
            path="/settings/profileSettings/lists"
            render={() => <ListsText />}
            exact
          />
          {/* { path: "/settings/profileSettings/lists", text: currentLang.lists }, */}
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
                        <Text text={currentLang.settings} />
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
                                fontWeight: "bold",
                                fontSize: "22px",
                                marginBottom: "0px",
                              }}
                            >
                              @{user.first_name}
                            </h4>
                            <h5
                              style={{
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
                  path="/settings/profileSettings/distribution"
                  render={() => <DistributionComponent />}
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
                    <PasswordSettings />
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
                    <SessionsInfo />
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