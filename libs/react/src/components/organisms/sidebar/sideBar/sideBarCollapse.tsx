
import React, {useEffect, useState} from "react";
import {Sidebar} from "flowbite-react";
import {ColdIcon} from '@coldpbc/components';
import { flowbiteThemeOverride } from '@coldpbc/components';
import {SideBarItem} from '@coldpbc/components';
import {NavbarItem} from '@coldpbc/components';

export interface SideBarCollapseProps {
    item: NavbarItem;
    activeChild: string;
    setActiveChild: (activeChild: string) => void;
}

export const SideBarCollapse = (props: SideBarCollapseProps) => {
    const { item, activeChild, setActiveChild } = props;
    const [collapseIsOpen, setCollapseIsOpen] = useState(true);

    const ifSubItemIsActive = () => {
        return !!item.items?.find( ( sub_item: NavbarItem ) => sub_item.key === activeChild );
    }

    return (
        <Sidebar.Collapse
            icon={item.icon? () => (<ColdIcon className={"."} name={item.icon?.name} />) : undefined}
            label={item.label}
            open={collapseIsOpen}
            active={ifSubItemIsActive()}
            onClick={() => {
                setCollapseIsOpen( !collapseIsOpen )
            }}
            theme={flowbiteThemeOverride.sidebar.collapse}>
            {
                item.items?.map( ( sub_item:NavbarItem, index: number) => {
                    return <SideBarItem setActiveChild={setActiveChild} activeChild={activeChild} item={sub_item} key={sub_item.key + "_" + index} />
                })
            }
        </Sidebar.Collapse>
    )
}
