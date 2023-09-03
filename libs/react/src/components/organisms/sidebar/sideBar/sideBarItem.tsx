import React, {ReactElement, useState} from "react";
import {SidebarItem} from 'flowbite-react/lib/esm/components/Sidebar/SidebarItem';
import { IconNames } from '../../../../enums/iconNames';
import { ColdIcon } from '../../../atoms/icons/coldIcon';
import { flowbiteThemeOverride } from '../../../../themes/flowbiteThemeOverride';
import {Link, useLinkClickHandler} from 'react-router-dom';
import {NavbarItem} from '../../../../interfaces/sideBar';

export interface SideBarItemProps {
    item: NavbarItem;
    activeChild: string;
    setActiveChild: (activeChild: string) => void;
}

export const SideBarItem = (props: SideBarItemProps) => {
    const [ hover, setHover ] = useState(false);
    const { item, activeChild, setActiveChild} = props;

    return (
        <SidebarItem className="sidebar-item"
                     icon={item.icon? () => (<ColdIcon className={"."} name={item.icon?.name} />) : undefined}
                     key={item.key}
                     theme={flowbiteThemeOverride.sidebar.item}
                     active={activeChild === item.key}
                     onClick={() => {
                         setActiveChild(item.key);
                     }}
                     as={Link}
                     to={item.route}
        >
            {item.label}
        </SidebarItem>
    )
}
