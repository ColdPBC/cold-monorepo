import React from 'react';
import { Avatar } from '../../atoms/avatar/avatar';
import { useAuth0 } from '@auth0/auth0-react';
import { GlobalSizes } from '../../../enums/sizes';
import { Dropdown } from 'flowbite-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
	const { user, logout: auth0Logout } = useAuth0();
	const headerUser = user;

	const getHeaderName = () => {
		if (headerUser?.name) {
			return headerUser?.name;
		} else {
			return headerUser?.email;
		}
	};

	const logout = () => {
		sessionStorage.clear();

		auth0Logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	if (headerUser) {
		return (
			<div className="h-16 w-full flex justify-end border-b-2 border-cold-fadeAwayGray bg-cold-starkWhite">
				<div className="flex px-4 space-x-2">
					<div className="grid content-center">
						<div>{getHeaderName()}</div>
					</div>
					<div className="grid content-center">
						<Dropdown inline={true} label={<Avatar size={GlobalSizes.medium} user={headerUser} circle={true} />} arrowIcon={false}>
							<Dropdown.Item
								onClick={() => {
									logout();
								}}>
								Log Out
							</Dropdown.Item>
						</Dropdown>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};
