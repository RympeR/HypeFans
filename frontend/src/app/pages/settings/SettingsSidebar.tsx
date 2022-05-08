import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { LangContext } from '../../../app/utils/LangProvider';
import { NotificationSidebarItem } from '../notifications/NotificationSidebarItem';

export const SettingsSidebar = ({ showStyle }: { showStyle: boolean }) => {
    const { currentLang } = useContext(LangContext)
    const selectedColor = "#F9F9F9";
    const { pathname } = useLocation();
    return (
        <div
            className={
                showStyle ? "notifications__sidebarMobile" : "notifications__sidebar"
            }
        >
            <div className="notifications__displayMobile">
                <Link to="/settings/profileSettings/mobileSidebar">
                    <NotificationSidebarItem text={currentLang.profile} />
                </Link>
            </div>
            <div className="notifications__none">
                <Link to="/settings/profileSettings">
                    <NotificationSidebarItem text={currentLang.profile} />
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
                <NotificationSidebarItem text={currentLang.account} />
            </Link>
            <Link
                to="/settings/confidentiality"
                style={
                    pathname === "/settings/confidentiality"
                        ? { background: selectedColor }
                        : {}
                }
            >
                <NotificationSidebarItem text={currentLang.security} />
            </Link>
            <Link
                to="/settings/prices"
                style={
                    pathname === "/settings/prices" ? { background: selectedColor } : {}
                }
            >
                <NotificationSidebarItem text={currentLang.prices} />
            </Link>
        </div>
    );
};
