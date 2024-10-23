import React, { useEffect, useState } from 'react';
import { BaseButton } from '../../../atoms/button/button';
import { InputTypes } from '../../../../enums/inputs';
import { Input } from '../../../atoms/input/input';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Spinner } from '../../../atoms/spinner/spinner';
import capitalize from 'lodash/capitalize';
import includes from 'lodash/includes';
import { isArray } from 'lodash';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../../application/errors/errorFallback';
import { useColdContext } from '@coldpbc/hooks';
import { InputOption, UserRole } from '@coldpbc/interfaces';

export interface InviteMemberFormProps {
	inviteMembers: (email: string, roleId: string) => void;
	onCancel: () => void;
}

const Component = (props: InviteMemberFormProps) => {
	const { inviteMembers } = props;
	const [memberForm, setMemberForm] = useState<any>({
		email: '',
		role: undefined,
	});
	const {
		data,
		error,
		isLoading,
	}: {
		data: any;
		error: any;
		isLoading: boolean;
	} = useSWR(['/roles', 'GET'], axiosFetcher, {
		revalidateOnFocus: false,
	});

	const { logError } = useColdContext();

	const handleChange = (name: string, value: any) => {
		setMemberForm({ ...memberForm, [name]: value });
	};

	const handleSubmit = () => {
		inviteMembers(memberForm.email, memberForm.role.value);
	};

	const isEmailValid = () => {
		return String(memberForm.email)
			.toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	};

	// Filter out special case roles
	const filterRoles = (role: UserRole) => {
		const filteredRoles = ['company:owner', 'cold:', 'default:'];
		let match = false;
		filteredRoles.map(roleFilter => {
			if (match) return;
			match = includes(role.name, roleFilter);
		});
		if (match) return;
		return role;
	};

	useEffect(() => {
		if (data) {
			const filtered = data.filter(filterRoles);
			setMemberForm({
				...memberForm,
				role: {
					id: 0,
					value: filtered[0].name,
					name: capitalize(filtered[0].name?.replace('company:', '')),
				},
			});
		}
	}, [data]);

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (isArray(data) && memberForm.role) {
		return (
			<>
				<div className="flex items-end">
					<div className="flex-1">
						<Input
							input_props={{
								name: 'email',
								value: memberForm.email,
								onChange: e => {
									handleChange('email', e.target.value);
								},
								onValueChange: value => {
									handleChange('email', value);
								},
								required: true,
								className:
									'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 w-full',
							}}
							input_label_props={{
								className: 'text-sm not-italic text-tc-primary font-medium',
							}}
							idx={0}
							type={InputTypes.Text}
							input_label="Email Address"
						/>
					</div>
					<div className="w-40 ml-4">
						<Input
							input_props={{
								name: 'role',
								value: memberForm.role,
								onValueChange: (value: InputOption) => {
									handleChange('role', value);
								},
								options: (data as UserRole[]).filter(filterRoles).map((role: UserRole, index) => {
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
				<div className="mt-11 flex justify-end">
					<span className="mr-4">
						<BaseButton
							variant={ButtonTypes.secondary}
							label={'Cancel'}
							onClick={() => {
								props.onCancel();
							}}
						/>
					</span>
					<BaseButton
						type={'submit'}
						label={'Invite'}
						onClick={() => {
							handleSubmit();
						}}
						disabled={!isEmailValid()}
					/>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export const InviteMemberForm = withErrorBoundary(Component, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in InviteMemberForm: ', error);
	},
});
