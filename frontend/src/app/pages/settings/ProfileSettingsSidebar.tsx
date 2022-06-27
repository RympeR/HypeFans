import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ExchangeModal } from '../../../app/components/ExchangeComponent/ExchangeModal';
import { LangContext } from '../../../app/utils/LangProvider';
import { logout } from '../../../redux/authReducer';
import { SettingsSidebarItem, ExitItem } from '../notifications/NotificationSidebarItem';
import { ReactComponent as RefSvg } from "../../../assets/images/link.svg";
import { ReactComponent as ListSvg } from "../../../assets/images/list.svg";
import { ReactComponent as BarSvg } from "../../../assets/images/bar-chart-2.svg";
import { ReactComponent as EditSvg } from "../../../assets/images/edit.svg";
import { ReactComponent as PhotoIcon } from "../../../assets/images/cameraLink.svg";
import { ReactComponent as LogOutSvg } from "../../../assets/images/log-in.svg";

export const ProfileSettingsSidebar = ({ showStyle }: { showStyle: boolean }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentLang } = useContext(LangContext)
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);

    const logoutFunc = async () => {
        localStorage.removeItem("hypefansToken")
        await dispatch(logout());
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
                <SettingsSidebarItem text={currentLang.refLink}>
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
                <SettingsSidebarItem text={currentLang.lists}>
                    <ListSvg />
                </SettingsSidebarItem>
            </Link>
            <Link
                to="/settings/profileSettings/distribution"
                style={
                    pathname === "/settings/profileSettings/distribution"
                        ? { background: selectedColor }
                        : {}
                }
            >
                <SettingsSidebarItem text="Рассылка">
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
                <SettingsSidebarItem text={currentLang.stats}>
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
                <SettingsSidebarItem text={currentLang.editProfile}>
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
                <SettingsSidebarItem text={currentLang.lang}>
                    <EditSvg />
                </SettingsSidebarItem>
            </Link>
            <div
                onClick={() => {
                    setShow(true);
                }}
            >
                <ExitItem text={currentLang.exit}>
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
                            {currentLang.exitConfirm}
                        </h5>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "15px",
                            }}
                        >
                            <h6 style={{ color: "#FB5734" }} onClick={() => setShow(false)}>
                                {currentLang.cancel}
                            </h6>
                            <div style={{ width: "20px" }}></div>
                            <h6 onClick={() => logoutFunc()}>{currentLang.next}</h6>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};