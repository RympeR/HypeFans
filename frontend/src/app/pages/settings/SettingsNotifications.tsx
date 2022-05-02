import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LangContext } from '../../../app/utils/LangProvider';
import { NotificationSidebarItem } from '../notifications/NotificationSidebarItem';

export const SettingsNotifications = () => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <Link to="/settings/notifications/push">
                <NotificationSidebarItem text={currentLang.pushNotf} />
            </Link>
            <Link to="/settings/notifications/email">
                <NotificationSidebarItem text={currentLang.emailNotf} />
            </Link>
            <Link to="/settings/notifications/page">
                <NotificationSidebarItem text={currentLang.siteNotf} />
            </Link>
        </div>
    );
};