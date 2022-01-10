import React from 'react';
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/simpleArrow-right.svg';

export const NotificationSidebarItem = ({ text }: { text: string }) => {
  return (
    <div className="notifications__sidebarItem">
      <p>{text}</p>
      <ArrowRightIcon />
    </div>
  );
};

export const SettingsSidebarItem = ({ text, children }: { text: string; children: any }) => {
  return (
    <div className="notifications__sidebarItem">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {children}
        <p style={{ marginLeft: '15px' }}>{text}</p>
      </div>
      <ArrowRightIcon />
    </div>
  );
};

export const ExitItem = ({ text, children }: { text: string; children: any }) => {
  return (
    <div className="notifications__sidebarItem" style={{ border: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {children}
        <p style={{ marginLeft: '15px', color: '#FB5734' }}>{text}</p>
      </div>
    </div>
  );
};
