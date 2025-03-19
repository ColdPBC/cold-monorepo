import React, { useEffect, useState } from 'react';
import { ColdIcon, SideBarItem } from '@coldpbc/components';
import { NavbarItem, NavbarItemWithRoute } from '@coldpbc/interfaces';
import { IconNames } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { forEach } from 'lodash';

export interface SideBarCollapseProps {
  item: NavbarItem;
  activeItem: NavbarItem | null;
  setActiveItem: (activeItem: NavbarItem) => void;
  expanded: boolean;
}

export const SideBarCollapse = (props: SideBarCollapseProps) => {
  const { item, activeItem, expanded } = props;
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);

  const ifSubItemIsActive = () => {
    return !!item.items?.find((sub_item: NavbarItem) => sub_item.key === activeItem?.key);
  };

  const getSubItemsHeight = () => {
    let height = 0;
    if (item.items === undefined) return height;
    forEach(item.items, (sub_item: NavbarItem, index) => {
      height += 48;
    });
    // also add 8px gap between items
    height += 8 * (item.items.length - 1);
    return height;
  };

  useEffect(() => {
    if (!expanded) setCollapseIsOpen(false);
  }, [expanded]);

  return expanded ? (
    <div className={'w-full flex flex-col gap-[8px] transition-height duration-200'}>
      <div
        className={twMerge(
          'flex flex-row justify-start items-center gap-[8px] w-full cursor-pointer h-[48px] border-l-[2px] border-transparent hover:bg-gray-50 pl-[16px] pr-[8px] text-tc-primary',
          ifSubItemIsActive() ? 'border-primary-300 bg-gray-50' : '',
        )}
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
      {collapseIsOpen && (
        <div
          className={'flex flex-col gap-[8px] w-full transition-height duration-200 overflow-hidden'}
          style={{
            height: collapseIsOpen ? getSubItemsHeight() + 'px' : '0px',
          }}>
          {item.items?.map((sub_item: NavbarItemWithRoute, index: number) => {
            return (
              <Link
                to={sub_item.route}
                className={twMerge(
                  'flex flex-row justify-start items-center gap-[8px] w-full cursor-pointer h-[48px] border-l-[2px] border-transparent hover:bg-gray-50 ',
                  activeItem?.key === sub_item.key ? 'pl-8 text-tc-primary font-bold text-body' : 'pl-12 text-tc-secondary text-body',
                )}
                key={sub_item.key + '_' + index}>
                {activeItem?.key === sub_item.key && <div className={'w-[8px] h-[8px] rounded-full bg-primary-300'}></div>}
                <span className={'w-full truncate'}>{sub_item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <div
      className={twMerge(
        'w-full flex justify-start items-center h-[48px] border-l-[2px] border-transparent px-[16px]',
        ifSubItemIsActive() ? 'border-primary-300 bg-gray-50' : '',
      )}>
      <ColdIcon name={item.icon?.name} color={'white'} />
    </div>
  );
};
