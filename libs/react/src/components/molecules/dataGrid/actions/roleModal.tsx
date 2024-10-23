import { useEffect, useState } from 'react';
import { IModalProps, Input, Modal, Spinner } from '@coldpbc/components';
import capitalize from 'lodash/capitalize';
import { ColorNames, ErrorType, GlobalSizes, InputTypes } from '@coldpbc/enums';
import { InputOption, TableActionType } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import includes from 'lodash/includes';
import { isEqual } from 'lodash';
import { getFormattedUserName } from '@coldpbc/lib';

export type RoleModalProps = {
	show: boolean;
	setShowModal: () => void;
	action: TableActionType & {
		modalProps: {
			header: IModalProps['header'];
			body: IModalProps['body'];
			footer: IModalProps['footer'];
		};
	};
};

export const RoleModal = (props: RoleModalProps) => {
	const { logError } = useColdContext();
	const [selectedRole, setSelectedRole] = useState<any>(undefined);
	const auth0 = useAuth0Wrapper();
	const { modalProps, actionObject } = props.action;

	const { data, isLoading, error } = useSWR(['/roles', 'GET'], axiosFetcher);

	const filterRoles = (role: any) => {
		const filteredRoles = ['cold:', 'default:'];

		let match = false;
		filteredRoles.map(roleFilter => {
			if (match) return;
			match = includes(role.name, roleFilter);
		});

		filteredRoles.map(roleFilter => {
			if (match) return;
			match = isEqual(role.name, actionObject.role);
		});

		if (auth0.user?.coldclimate_claims.roles[0] === 'company:admin' && role.name === 'company:owner') {
			if (match) return;
			match = true;
		}

		if (match) return;
		return role;
	};

	useEffect(() => {
		if (data) {
			const filteredRoles = (data as any[]).filter(filterRoles);
			setSelectedRole({
				id: 0,
				value: filteredRoles[0].name,
				name: capitalize(filteredRoles[0].name?.replace('company:', '')),
			});
		}
	}, [data]);

	if (error || auth0.error) {
		if (error) {
			logError(error, ErrorType.SWRError);
		}
		if (auth0.error) {
			logError(auth0.error, ErrorType.Auth0Error);
		}
		return null;
	}

	if (isLoading || auth0.isLoading) {
		return (
			<div className="w-full h-full grid content-center">
				<Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
			</div>
		);
	}

	if (data && selectedRole) {
		return (
			<Modal
				show={props.show}
				setShowModal={props.setShowModal}
				{...modalProps}
				body={
					<div className="text-sm font-medium flex space-x-2 items-center w-full justify-between">
						<div>
							Update role for <span className="font-bold">{getFormattedUserName(actionObject)}</span>
						</div>
						<div className={'w-40'}>
							<Input
								input_props={{
									name: 'role',
									value: selectedRole,
									onValueChange: (value: InputOption) => {
										setSelectedRole(value);
									},
									options: (data as any[]).filter(filterRoles).map((role: any, index) => {
										return {
											id: index,
											value: role.name,
											name: capitalize(role.name?.replace('company:', '')),
										};
									}),
								}}
								idx={1}
								type={InputTypes.Select}
							/>
						</div>
					</div>
				}
				footer={{
					...modalProps?.footer,
					resolveButton: {
						...modalProps?.footer?.resolveButton,
						onClick: () => {
							// set the action api request call url to change roleName to role
							props.action.apiRequests[0].url = props.action.apiRequests[0].url.replace(':roleName', selectedRole.value);
							if (modalProps?.footer?.resolveButton?.onClick) {
								modalProps?.footer?.resolveButton?.onClick();
							}
						},
					},
				}}
			/>
		);
	} else {
		return null;
	}
};
