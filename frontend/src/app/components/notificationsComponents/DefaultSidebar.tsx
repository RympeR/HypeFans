import React from "react";
import { Link, useLocation } from "react-router-dom";
import { articleType } from "../../../api/types";
import { NotificationSidebarItem } from "../../../app/pages/notifications/NotificationSidebarItem";

export const DefaultSidebar = ({
  articles,
}: {
  articles: Array<articleType>;
}) => {
  const { pathname } = useLocation();
  const selectedColor = "#edebeb";
  return (
    <div className="notifications__sidebar">
      {articles.map((item: articleType, key: number) => (
        <Link
          to={item.path}
          style={pathname === item.path ? { background: selectedColor } : {}}
          key={key + "sidebarItem"}
        >
          <NotificationSidebarItem text={item.text} />
        </Link>
      ))}
    </div>
  );
};
