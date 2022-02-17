import React, { useState } from 'react';

const TabList = ({ children }) => <ul role="tablist">{children}</ul>;

const TabItem = ({ children, setTab, isActive, disabled }) => (
  <li className="nav-item" onClick={disabled ? () => null : setTab}>
    <a
      className={`nav-link ${isActive && 'notifications__tab_active'} ${disabled && 'disabled'}`}
      data-toggle="tab"
      role="tab"
      aria-selected={isActive.toString()}
    >
      {children}
    </a>
  </li>
);

const renderTabs = (tabs, currentIndex, setTabIndex) =>
  tabs.map((tab, index) => (
    <TabItem
      setTab={() => setTabIndex(index)}
      isActive={index === currentIndex}
      disabled={tab.disabled}
      key={Math.random()}
    >
      {tab.label}
    </TabItem>
  ));

const getTabIndex = (tab, tabs) => tabs.findIndex((tab2) => tab === tab2);

export function useTabs(tabs) {
  const [currentIndex, setTabIndex] = useState(0);

  const WithTabs = ({ tab, children, index }) => {
    console.log(getTabIndex(tab, tabs));
    console.log(currentIndex);
    if (index !== currentIndex) return null;
    return children;
  };

  const Tabs = () => <TabList>{renderTabs(tabs, currentIndex, setTabIndex)}</TabList>;

  return { currentIndex, setTabIndex, WithTabs, Tabs };
}
