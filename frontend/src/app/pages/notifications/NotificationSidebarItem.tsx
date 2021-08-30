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
