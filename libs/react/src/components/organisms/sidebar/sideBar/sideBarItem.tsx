import React, { useState } from 'react';
import { ColdIcon } from '../../../atoms/icons/coldIcon';
import { flowbiteThemeOverride } from '../../../../themes/flowbiteThemeOverride';
import { Link } from 'react-router-dom';
import { NavbarItem } from '../../../../interfaces/sideBar';
import { Sidebar } from 'flowbite-react';

export interface SideBarItemProps {
  item: NavbarItem;
  activeChild: string;
  setActiveChild: (activeChild: string) => void;
}

export const SideBarItem = (props: SideBarItemProps) => {
  const [hover, setHover] = useState(false);
  const { item, activeChild, setActiveChild } = props;

  return (
    <Sidebar.Item
      className="sidebar-item"
      icon={item.icon ? () => <ColdIcon className={'.'} name={item.icon?.name} /> : undefined}
      key={item.key}
      theme={flowbiteThemeOverride.sidebar.item}
      active={activeChild === item.key}
      onClick={() => {
        setActiveChild(item.key);
      }}
      as={Link}
      to={item.route}>
      {item.label}
    </Sidebar.Item>
  );
};
