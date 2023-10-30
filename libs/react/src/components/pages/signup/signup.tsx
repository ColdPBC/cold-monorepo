import React, { useContext } from 'react';
import { ColdLogos, SignupForm, Spinner } from '@coldpbc/components';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR, { mutate } from 'swr';
import { PolicySignedDataType, PolicyType } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { ColdLogoNames, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Organization } from 'auth0';
import ColdContext from '../../../context/coldContext';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';

export interface SignupPageProps {
  userData: User;
  signedPolicyData?: PolicySignedDataType[];
}

const _SignupPage = ({ userData, signedPolicyData }: SignupPageProps) => {
  const { logError } = useColdContext();
  const organizationSWR = useOrgSWR<Organization, any>(
    [``, 'GET'],
    axiosFetcher,
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = async () => {};

  if (organizationSWR.error) {
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

  const tos = signedPolicyData?.find((policy) => policy.name === 'tos');
  const privacy = signedPolicyData?.find((policy) => policy.name === 'privacy');
  const { data: organizationData } = organizationSWR;

  if (tos && privacy && signedPolicyData) {
    return (
      <div className={'flex h-full w-full'}>
        <div className={'pl-[40px] pb-[40px] pt-[40px] pr-[24px]'}>
          <div
            className={
              'items-center w-[668px] h-[963px] justify-center flex rounded-2xl'
            }
            style={{
              background: `url('https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/signup_image.jpeg'), lightgray 50% / cover no-repeat`,
            }}
          >
            <div className={'space-y-6 w-[438px]'}>
              <ColdLogos
                name={ColdLogoNames.ColdWordmark}
                color={HexColors.tc.primary}
                width={153}
                height={48}
              />
              <div className={'text-tc-primary text-h1'}>
                Start Your Journey to Absolute Zero™
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            'h-[1040px] flex items-center justify-center w-[708px] p-[64px]'
          }
        >
          <div className={'w-[540px]'}>
            <SignupForm
              userData={userData}
              companyData={organizationData}
              tosSigned={signedPolicyData.some(
                (policy) =>
                  policy.name === 'tos' && !isEmpty(policy.policy_data),
              )}
              privacySigned={signedPolicyData.some(
                (policy) =>
                  policy.name === 'privacy' && !isEmpty(policy.policy_data),
              )}
              tosData={tos}
              privacyData={privacy}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export const SignupPage = withErrorBoundary(_SignupPage, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SignupPage: ', error);
  },
});
