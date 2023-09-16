import React from 'react';
import { useAuth0, User as Auth0User } from '@auth0/auth0-react';
import { BaseButton, Input } from '@coldpbc/components';
import { ButtonTypes, InputTypes } from '@coldpbc/enums';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Organization } from 'auth0';
import { PolicyType } from '@coldpbc/interfaces';

export interface SignupFormProps {
  userData: Auth0User;
  companyData?: Organization;
  tosSigned: boolean;
  privacySigned: boolean;
  tosData: PolicyType;
  privacyData: PolicyType;
}

export const SignupForm = ({
  userData,
  companyData,
  tosSigned,
  privacySigned,
  tosData,
  privacyData,
}: SignupFormProps) => {
  const { user } = useAuth0();
  const [firstName, setFirstName] = React.useState<string | undefined>(
    userData.given_name,
  );
  const [lastName, setLastName] = React.useState<string | undefined>(
    userData.family_name,
  );
  const [companyName, setCompanyName] = React.useState<string>(
    companyData?.name || '',
  );
  const [isAgreedToPrivacyAndTOS, setIsAgreedToPrivacyAndTOS] =
    React.useState<boolean>(tosSigned && privacySigned);

  const onContinue = () => {
    // call api to update user with firstName, lastName, companyName
    // if successful, redirect to /dashboard
    // if unsuccessful, show error message
    console.log('onContinue');
    postUserData();
    postCompanyData();
    signTOSandPrivacy();
  };

  const getContinueButton = () => {
    // check if all fields are filled out
    // check if isAgreedToPrivacyAndTOS is true
    // if both are true, return a button that is enabled
    // if either are false, return a button that is disabled
    if (isAgreedToPrivacyAndTOS && firstName && lastName && companyName) {
      return (
        <BaseButton
          onClick={onContinue}
          label={'Continue'}
          variant={ButtonTypes.primary}
        />
      );
    } else {
      return (
        <BaseButton
          onClick={onContinue}
          label={'Continue'}
          variant={ButtonTypes.primary}
          disabled
        />
      );
    }
  };

  const postUserData = () => {
    if (user && !userData.given_name && !userData.family_name) {
      axiosFetcher([
        `/users/${user.email}`,
        'PATCH',
        JSON.stringify({
          family_name: lastName,
          given_name: firstName,
        }),
      ]);
    }
  };

  const postCompanyData = () => {
    if (user && !companyData) {
      axiosFetcher([
        `/organizations`,
        'POST',
        JSON.stringify({
          name: companyName,
        }),
      ]);
    }
  };

  const signTOSandPrivacy = () => {
    if (user) {
      axiosFetcher([`/policies/${tosData.id}/signed`, 'POST']);
      axiosFetcher([`/policies/${privacyData.id}/signed`, 'POST']);
    }
  };

  return (
    <div className={'text-tc-primary space-y-[32px]'}>
      <div className={'space-y-[8px]'}>
        <div className={'text-h2 font-bold pb-2'}>Welcome to Cold!</div>
        <div className={'text-h4 font-bold'}>
          Let's finish creating your account
        </div>
      </div>
      <div>
        <div className={'space-y-[40px] py-[20px]'}>
          <Input
            input_props={{
              value: firstName,
              onChange: (e) => setFirstName(e.target.value),
              onValueChange: (name) => setFirstName(name),
              name: 'firstName',
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
            }}
            input_label_props={{
              className: 'text-sm not-italic text-tc-primary font-medium',
            }}
            input_label={'First Name'}
          />
          <Input
            input_props={{
              value: lastName,
              onChange: (e) => setLastName(e.target.value),
              onValueChange: (name) => setLastName(name),
              name: 'lastName',
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
            }}
            input_label_props={{
              className: 'text-sm not-italic text-tc-primary font-medium',
            }}
            input_label={'Last Name'}
          />
          <Input
            input_props={{
              value: companyName,
              onChange: (e) => setCompanyName(e.target.value),
              onValueChange: (name) => setCompanyName(name),
              name: 'companyName',
              className:
                'text-sm not-italic font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent' +
                ' focus:border focus:border-bgc-accent focus:ring-0 ' +
                (companyData ? 'text-tc-disabled' : 'text-tc-primary'),
              disabled: !!companyData,
            }}
            input_label_props={{
              className: 'text-sm not-italic text-tc-primary font-medium',
            }}
            input_label={'Company Name'}
          />
        </div>
        <div className={'py-[16px]'}>
          <div className={'flex space-x-[12px]'}>
            <Input
              type={InputTypes.Checkbox}
              input_props={{
                checked: isAgreedToPrivacyAndTOS,
                onChange: (e) => setIsAgreedToPrivacyAndTOS(e.target.checked),
                onValueChange: (agreed) => setIsAgreedToPrivacyAndTOS(agreed),
                name: 'isAgreedToPrivacyAndTOS',
                className:
                  'w-6 h-6 rounded border border-bgc-accent bg-transparent focus:ring-0 focus:ring-offset-0',
              }}
            />
            <div>
              I agree to Cold's{' '}
              <a
                className={'underline'}
                href={'/terms'}
                target={'_blank'}
                rel="noreferrer"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                className={'underline'}
                href={'/privacy'}
                target={'_blank'}
                rel="noreferrer"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>{getContinueButton()}</div>
    </div>
  );
};
