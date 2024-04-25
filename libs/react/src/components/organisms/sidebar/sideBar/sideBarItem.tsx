import React, { useState } from 'react';
import { ColdIcon } from '../../../atoms/icons/coldIcon';
import { NavbarItem } from '../../../../interfaces/sideBar';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

export interface SideBarItemProps {
  item: NavbarItem;
  activeItem: NavbarItem | null;
  setActiveItem: (activeItem: NavbarItem) => void;
  expanded: boolean;
  navigateTo: (route: string) => void;
}

export const SideBarItem = (props: SideBarItemProps) => {
  const [hover, setHover] = useState(false);
  const { item, activeItem, setActiveItem, expanded, navigateTo } = props;

  const isActive = activeItem?.key === item.key;

  return (
    <div
      className={twMerge(
        'py-[12px] h-[48px] flex items-center w-full cursor-pointer border-l-[2px] border-transparent hover:bg-gray-50',
        isActive ? 'border-primary-300 bg-gray-50' : '',
      )}>
      {expanded ? (
        <Link to={item.route}>
          <div className={'flex flex-row justify-start items-center gap-[8px] w-full h-full pl-[18px]'} onClick={() => navigateTo(item.route)}>
            <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
              <ColdIcon name={item.icon?.name} color={'white'} />
            </div>
            <span className={'text-body font-bold w-full truncate'}>{item.label}</span>
          </div>
        </Link>
      ) : (
        <div className={'flex justify-center items-center w-full h-full px-[8px]'}>
          <ColdIcon name={item.icon?.name} color={'white'} />
        </div>
      )}
    </div>
  );
};
