import React, { useState } from 'react';
import { ColdIcon } from '@coldpbc/components';
import { NavbarItem } from '@coldpbc/interfaces';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

export interface SideBarItemProps {
  item: NavbarItem;
  activeItem: NavbarItem | null;
  setActiveItem: (activeItem: NavbarItem) => void;
  expanded: boolean;
}

export const SideBarItem = (props: SideBarItemProps) => {
  const { item, activeItem, setActiveItem, expanded } = props;

  const isActive = activeItem?.key === item.key;

  return (
    <Link
      className={twMerge(
        'py-[12px] h-[48px] flex items-center w-full cursor-pointer border-l-[2px] border-transparent hover:bg-gray-50',
        isActive ? 'border-primary-300 bg-gray-50' : '',
      )}
      to={item.route}>
      {expanded ? (
        <div className={'flex flex-row justify-start items-center gap-[8px] w-full h-full pl-[16px] pr-[8px]'}>
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ColdIcon name={item.icon?.name} color={'white'} />
          </div>
          <span className={'text-body font-bold w-full truncate'}>{item.label}</span>
        </div>
      ) : (
        <div className={'flex justify-start items-center w-full h-full px-[16px]'}>
          <ColdIcon name={item.icon?.name} color={'white'} />
        </div>
      )}
    </Link>
  );
};
