import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../../assets/images/leftIcon.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/images/settings.svg';

export const SidebarText = ({ text }: { text: string }) => {
  const history = useHistory();
  return (
    <>
      <p className="notifications__none">{text}</p>
      <div className="notifications__sidebarItemPhone">
        <div style={{ marginBottom: '5px', marginRight: '17px' }}>
          <ArrowLeft onClick={history.goBack} />
        </div>
        <div style={{ marginTop: '4px' }}>{text}</div>
        <div className="notifications__none">
          <Link to="/settings/notifications">
            <Route path="/notifications" component={SettingsIcon} />
          </Link>
        </div>
        <div className="notifications__displayMobile">
          <Link to="/settings/mobileSidebar">
            <Route path="/notifications" component={SettingsIcon} />
          </Link>
        </div>
      </div>
    </>
  );
};
