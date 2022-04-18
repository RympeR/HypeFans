import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LangContext } from '../../../app/utils/LangProvider';
import { NotificationSidebarItem } from '../notifications/NotificationSidebarItem';

export const AccountSettings = () => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <h2
                className="notifications__settings_h2"
                style={{ paddingTop: "40px" }}
            >
                {currentLang.secur1}
            </h2>
            <Link to="/settings/account/password">
                <NotificationSidebarItem text={currentLang.changePass} />
            </Link>
            {/* <Link to="/settings/account/sessions">
          <NotificationSidebarItem text="Сеансы входа" />
        </Link> */}
            <h2
                className="notifications__settings_h2"
                style={{ paddingTop: "40px" }}
            >
                {currentLang.actions}
            </h2>
            <Link to="/settings/notifications/account/delete">
                <NotificationSidebarItem text={currentLang.dellAcc} />
            </Link>
        </div>
    );
};
