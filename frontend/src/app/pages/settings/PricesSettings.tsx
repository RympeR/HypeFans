import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LangContext } from '../../../app/utils/LangProvider';
import { NotificationSidebarItem } from '../notifications/NotificationSidebarItem';

export const PricesSettings = () => {
    const { currentLang } = useContext(LangContext)
    return (
        <div className="notifications__main">
            <Link to="/settings/prices/messages">
                <NotificationSidebarItem text={currentLang.msgPrice} />
            </Link>
            <Link to="/settings/prices/subscribes">
                <NotificationSidebarItem text={currentLang.price} />
            </Link>
            {/* <Link to="/settings/prices/fans">
          <NotificationSidebarItem text="Для фанатов" />
        </Link> */}
        </div>
    );
};