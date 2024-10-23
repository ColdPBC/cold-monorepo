import React, { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { axiosFetcher } from '@coldpbc/fetchers';
import { BaseButton, Card, CardProps, ErrorFallback, InvitationModal, Spinner, TeamMembersDataGrid } from '@coldpbc/components';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { Dropdown } from 'flowbite-react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { MemberStatusType } from '@coldpbc/interfaces';

const _TeamMemberSettings = (props: any) => {
	const { logError } = useColdContext();
	const auth0 = useAuth0Wrapper();
	const [showModal, setShowModal] = useState(false);
	const [selectedMemberStatusType, setSelectedMemberStatusType] = useState<MemberStatusType>('Members');

	const organization = useOrgSWR(['', 'GET'], axiosFetcher);

	const organizationData = organization.data;

	const getCTAs = () => {
		const ctas: CardProps['ctas'] = [];
		ctas.push({
			child: (
				<Dropdown
					inline={true}
					label={
						<BaseButton variant={ButtonTypes.secondary} onClick={() => {}}>
							<span className="flex items-center">
								{selectedMemberStatusType} <ChevronDownIcon className="w-[18px] ml-2" />
							</span>
						</BaseButton>
					}
					arrowIcon={false}
					theme={flowbiteThemeOverride.dropdown}>
					<Dropdown.Item onClick={() => setSelectedMemberStatusType('Members')} theme={flowbiteThemeOverride.dropdown.floating.item}>
						<span className="w-[130px] flex justify-between">Members {selectedMemberStatusType === 'Members' && <CheckIcon className="w-[14px]" />}</span>
					</Dropdown.Item>
					<div className="bg-bgc-accent h-[1px] w-full" />
					<Dropdown.Item onClick={() => setSelectedMemberStatusType('Invitations')} theme={flowbiteThemeOverride.dropdown.floating.item}>
						<span className="w-[130px] flex justify-between">Invitations {selectedMemberStatusType === 'Invitations' && <CheckIcon className="w-[14px]" />}</span>
					</Dropdown.Item>
				</Dropdown>
			),
		});
		if (auth0.user?.coldclimate_claims.roles[0] !== 'company:member') {
			ctas.push({
				text: 'Invite Member',
				variant: ButtonTypes.primary,
				action: () => {
					setShowModal(true);
				},
			});
		}
		return ctas;
	};

	if (organization.isLoading || auth0.isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (organization.error || auth0.error) {
		if (organization.error) {
			logError(organization.error, ErrorType.SWRError);
		}
		if (auth0.error) {
			logError(auth0.error, ErrorType.Auth0Error);
		}
		return <div></div>;
	}

	if (organization.data) {
		return (
			<>
				<Card title="Team Members" glow ctas={getCTAs()} data-testid={'team-member-settings-card'}>
					<TeamMembersDataGrid selectedMemberStatusType={selectedMemberStatusType} />
				</Card>
				{showModal && <InvitationModal setShown={setShowModal} shown={showModal} companyName={organizationData.name} />}
			</>
		);
	} else {
		return <div></div>;
	}
};

export const TeamMemberSettings = withErrorBoundary(_TeamMemberSettings, {
	fallbackRender: props => <ErrorFallback {...props} />,
});
