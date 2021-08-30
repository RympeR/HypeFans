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

export const NotificationSidebarFilterItem = ({ text, filter }: { text: string; filter: () => void | null }) => {
  return (
    <div className="notifications__sidebarItem" onClick={() => filter()}>
      <p>{text}</p>
      <ArrowRightIcon />
    </div>
  );
};
