import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { ColdIcon } from '@coldpbc/components';
import { flowbiteThemeOverride } from '../../../../themes/flowbiteThemeOverride';
import { SideBarItem } from './sideBarItem';
import { NavbarItem } from '@coldpbc/interfaces';

export interface SideBarCollapseProps {
  item: NavbarItem;
  activeChild: string;
  setActiveChild: (activeChild: string) => void;
}

export const SideBarCollapse = (props: SideBarCollapseProps) => {
  const { item, activeChild, setActiveChild } = props;
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);

  const ifSubItemIsActive = () => {
    return !!item.items?.find((sub_item: NavbarItem) => sub_item.key === activeChild);
  };

  useEffect(() => {
    if (ifSubItemIsActive()) {
      setCollapseIsOpen(true);
    } else {
      setCollapseIsOpen(false);
    }
  }, [item, activeChild, setActiveChild]);

  return (
    <Sidebar.Collapse
      icon={item.icon ? () => <ColdIcon className={'.'} name={item.icon?.name} /> : undefined}
      label={item.label}
      open={collapseIsOpen}
      active={ifSubItemIsActive() ? true : undefined}
      onClick={() => {
        setCollapseIsOpen(!collapseIsOpen);
      }}
      theme={flowbiteThemeOverride.sidebar.collapse}>
      {item.items?.map((sub_item: NavbarItem, index: number) => {
        return <SideBarItem setActiveChild={setActiveChild} activeChild={activeChild} item={sub_item} key={sub_item.key + '_' + index} />;
      })}
    </Sidebar.Collapse>
  );
};
