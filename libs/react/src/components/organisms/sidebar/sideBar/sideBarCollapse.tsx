import React, { useEffect, useState } from 'react';
import { ColdIcon } from '@coldpbc/components';
import { NavbarItem } from '@coldpbc/interfaces';
import { IconNames } from '@coldpbc/enums';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface SideBarCollapseProps {
  item: NavbarItem;
  activeItem: NavbarItem | null;
  setActiveItem: (activeItem: NavbarItem) => void;
  expanded: boolean;
  navigateTo: (route: string) => void;
}

export const SideBarCollapse = (props: SideBarCollapseProps) => {
  const { item, activeItem, setActiveItem, expanded, navigateTo } = props;
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const navigate = useNavigate();

  const ifSubItemIsActive = () => {
    return !!item.items?.find((sub_item: NavbarItem) => sub_item.key === activeItem?.key);
  };

  const onItemClicked = (item: NavbarItem) => {
    navigate(item.route);
  };

  useEffect(() => {
    if (ifSubItemIsActive()) {
      setCollapseIsOpen(true);
    } else {
      setCollapseIsOpen(false);
    }
  }, [item, activeItem, setActiveItem]);

  return expanded ? (
    <div className={'w-full flex flex-col gap-[8px] transition-height duration-200'}>
      <div
        className={'flex flex-row justify-start items-center gap-[8px] w-full cursor-pointer h-[48px] border-l-[2px] border-transparent hover:bg-gray-50 pl-[18px] pr-[8px]'}
        onClick={() => {
          setCollapseIsOpen(!collapseIsOpen);
        }}>
        <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
          <ColdIcon name={item.icon?.name} color={'white'} />
        </div>
        <span className={'text-body font-bold w-full truncate'}>{item.label}</span>
        <div className={'h-full p-[8px] flex items-center'}>
          <ColdIcon name={collapseIsOpen ? IconNames.ColdChevronUpIcon : IconNames.ColdChevronDownIcon} color={'white'} />
        </div>
      </div>
      {collapseIsOpen &&
        item.items?.map((sub_item: NavbarItem, index: number) => {
          return (
            <Link to={sub_item.route}>
              <div
                className={twMerge(
                  'flex flex-row justify-start items-center gap-[8px] w-full cursor-pointer h-[48px] border-l-[2px] border-transparent pl-12 hover:bg-gray-50 ' +
                    'transition-all duration-200',
                  activeItem?.key === sub_item.key ? 'border-primary-300 bg-gray-50' : '',
                )}>
                <span className={'text-body font-bold w-full truncate'}>{sub_item.label}</span>
              </div>
            </Link>
          );
        })}
    </div>
  ) : (
    <div
      className={twMerge(
        'w-full flex justify-center items-center h-[48px] border-l-[2px] border-transparent px-[8px]',
        ifSubItemIsActive() ? 'border-primary-300 bg-gray-50' : '',
      )}>
      <ColdIcon name={item.icon?.name} color={'white'} />
    </div>
  );
};
