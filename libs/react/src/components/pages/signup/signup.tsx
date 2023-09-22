import React, { useContext } from 'react';
import { ColdLogos, SignupForm } from '@coldpbc/components';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR, { mutate } from 'swr';
import { PolicySignedDataType, PolicyType } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { ColdLogoNames } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Organization } from 'auth0';
import ColdContext from '../../../context/coldContext';

export interface SignupPageProps {
  userData: User;
}

export const SignupPage = ({ userData }: SignupPageProps) => {
  const { auth0Options } = useContext(ColdContext);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const {
    data: policyData,
    error,
    isLoading,
  } = useSWR<PolicySignedDataType[], any, any>(
    ['/policies/signed/user', 'GET'],
    axiosFetcher,
  );

  const { data: tos } = useSWR<PolicyType, any, any>(
    ['/policies/tos', 'GET'],
    axiosFetcher,
  );

  const { data: privacy } = useSWR<PolicyType, any, any>(
    ['/policies/privacy', 'GET'],
    axiosFetcher,
  );

  const { data: organizationData } = useSWR<Organization, any, any>(
    user?.coldclimate_claims.org_id
      ? [`/organizations/${user.coldclimate_claims.org_id}`, 'GET']
      : null,
    axiosFetcher,
  );

  const onSubmit = async () => {
    navigate('/home?surveyName=journey_overview');
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (tos && privacy && policyData) {
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
              tosSigned={
                policyData.some(
                  (policy) =>
                    policy.name === 'tos' && !isEmpty(policy.policy_data),
                ) || false
              }
              privacySigned={
                policyData.some(
                  (policy) =>
                    policy.name === 'privacy' && !isEmpty(policy.policy_data),
                ) || false
              }
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
