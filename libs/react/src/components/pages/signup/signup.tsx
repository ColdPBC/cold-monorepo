import React from 'react';
import { ColdLogos, SignupForm, Spinner, Takeover } from '@coldpbc/components';
import { User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { PolicySignedDataType } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { ColdLogoNames, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { isEmpty } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';

export interface SignupPageProps {
	userData: User;
	signedPolicyData?: PolicySignedDataType[];
}

const _SignupPage = ({ userData, signedPolicyData }: SignupPageProps) => {
	const { logError, logBrowser } = useColdContext();
	const [show, setShow] = React.useState<boolean>(true);
	const organizationSWR = useOrgSWR<any, any>([``, 'GET'], axiosFetcher);

	const onSubmit = async () => {
		setShow(false);
	};

	if (organizationSWR.error) {
		logBrowser('Error fetching organization data', 'error', { error: organizationSWR.error }, organizationSWR.error);
		logError(organizationSWR.error, ErrorType.SWRError);
		return <div></div>;
	}

	if (organizationSWR.isLoading) {
		return (
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				<Spinner size={GlobalSizes.xLarge} />
			</div>
		);
	}

	const tos = signedPolicyData?.find(policy => policy.name === 'tos');
	const privacy = signedPolicyData?.find(policy => policy.name === 'privacy');
	const { data: organizationData } = organizationSWR;

	if (tos && privacy && signedPolicyData) {
		logBrowser('Signup page loaded', 'info', {
			signedPolicyData,
			organizationData,
			tos,
			privacy,
		});
		return (
			<Takeover show={show} setShow={setShow} className={'fixed inset-0 flex flex-col h-screen w-screen overflow-y-auto pb-[40px]'} data-testid={'signup-takeover'}>
				<div className="flex-1 flex max-h-[1040px]">
					<div className={'pr-[24px]'}>
						<div
							className={'max-h-[963px] w-[668px] flex h-full items-center justify-center rounded-2xl'}
							style={{
								background: `url('https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/signup_image.jpeg'), lightgray 50% / cover no-repeat`,
							}}>
							<div className={'space-y-6 w-[438px]'}>
								<ColdLogos name={ColdLogoNames.ColdWordmark} color={HexColors.tc.primary} width={153} height={48} />
								<div className={'text-tc-primary text-h1'}>Start Your Journey to Absolute Zero™</div>
							</div>
						</div>
					</div>
					<div className={'w-full h-full flex items-center justify-center p-[64px]'}>
						<SignupForm
							userData={userData}
							companyData={organizationData}
							tosSigned={signedPolicyData.some(policy => policy.name === 'tos' && !isEmpty(policy.policy_data))}
							privacySigned={signedPolicyData.some(policy => policy.name === 'privacy' && !isEmpty(policy.policy_data))}
							tosData={tos}
							privacyData={privacy}
							onSubmit={onSubmit}
						/>
					</div>
				</div>
			</Takeover>
		);
	} else {
		return <div></div>;
	}
};

export const SignupPage = withErrorBoundary(_SignupPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SignupPage: ', error);
	},
});
