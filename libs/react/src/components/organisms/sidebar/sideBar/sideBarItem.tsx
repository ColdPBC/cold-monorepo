import React, { useState } from 'react';
import { ColdIcon } from '../../../atoms/icons/coldIcon';
import { NavbarItem } from '../../../../interfaces/sideBar';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Sidebar } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';

export interface SideBarItemProps {
	item: NavbarItem;
	activeItem: NavbarItem | null;
	setActiveItem: (activeItem: NavbarItem) => void;
	expanded: boolean;
}

export const SideBarItem = (props: SideBarItemProps) => {
	const ldFlags = useFlags();
	const [hover, setHover] = useState(false);
	const { item, activeItem, setActiveItem, expanded } = props;

	const isActive = activeItem?.key === item.key;

	if (ldFlags.showNewNavigationCold698) {
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
	} else {
		return (
			<Sidebar.Item
				className="sidebar-item"
				icon={item.icon ? () => <ColdIcon className={'.'} name={item.icon?.name} /> : undefined}
				key={item.key}
				theme={flowbiteThemeOverride.sidebar.item}
				active={activeItem?.key === item.key}
				onClick={() => {
					setActiveItem(item);
				}}
				as={Link}
				to={item.route}>
				{item.label}
			</Sidebar.Item>
		);
	}
};
