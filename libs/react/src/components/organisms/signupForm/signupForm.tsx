import React, { useEffect } from 'react';
import { User as Auth0User } from '@auth0/auth0-react';
import { BaseButton, Input } from '@coldpbc/components';
import { ButtonTypes, InputTypes } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Organization } from 'auth0';
import { PolicyType, ToastMessage } from '@coldpbc/interfaces';
import { useAddToastMessage } from '@coldpbc/hooks';
import { isAxiosError } from 'axios';
import { mutate } from 'swr';

export interface SignupFormProps {
  userData?: Auth0User;
  companyData?: Organization;
  tosSigned: boolean;
  privacySigned: boolean;
  tosData: PolicyType;
  privacyData: PolicyType;
  onSubmit: () => void;
}

export const SignupForm = ({
  userData,
  companyData,
  tosSigned,
  privacySigned,
  tosData,
  privacyData,
  onSubmit,
}: SignupFormProps) => {
  const [firstName, setFirstName] = React.useState<string | undefined>(
    !userData?.given_name ? '' : userData?.given_name,
  );
  const [lastName, setLastName] = React.useState<string | undefined>(
    !userData?.family_name ? '' : userData?.family_name,
  );
  const [companyName, setCompanyName] = React.useState<string | undefined>(
    companyData?.name === undefined ? '' : companyData?.display_name,
  );
  const [isAgreedToPrivacyAndTOS, setIsAgreedToPrivacyAndTOS] =
    React.useState<boolean>(tosSigned && privacySigned);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const { addToastMessage } = useAddToastMessage();

  useEffect(() => {
    if (isAgreedToPrivacyAndTOS && companyName && firstName && lastName) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [firstName, lastName, companyName, isAgreedToPrivacyAndTOS]);

  const onContinue = async () => {
    setDisabled(true);
    const promises = await Promise.all([signTOSandPrivacy(), postUserData()]);
    // check if all promises are successful
    if (promises.every((promise) => !isAxiosError(promise))) {
      setDisabled(false);
      await mutate([`/members/${userData?.email}`, 'GET']);
      onSubmit();
    } else {
      await addToastMessage({
        message: 'Error creating account',
        type: ToastMessage.FAILURE,
        timeout: 5000,
      });
      setDisabled(false);
    }
  };

  const postUserData = () => {
    if (userData) {
      return axiosFetcher([
        `/members/${userData.email}`,
        'PATCH',
        JSON.stringify({
          family_name: lastName,
          given_name: firstName,
        }),
      ]);
    }
    return;
  };

  const signTOSandPrivacy = async () => {
    const promises = [];
    if (!tosSigned) {
      promises.push(axiosFetcher([`/policies/${tosData.id}/signed`, 'POST']));
    }
    if (!privacySigned) {
      promises.push(
        axiosFetcher([`/policies/${privacyData.id}/signed`, 'POST']),
      );
    }
    return (await Promise.all(promises)).flat();
  };

  const isButtonDisabled = () => {
    if (disabled) {
      return true;
    } else {
      return !isValid;
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
              disabled: !!userData?.given_name,
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
              disabled: !!userData?.family_name,
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
            input_label={'Company'}
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
                disabled: tosSigned && privacySigned,
              }}
            />
            <div>
              I agree to the Cold Climate Platform{' '}
              <a
                className={'underline'}
                href={'/terms'}
                target={'_blank'}
                rel="noreferrer"
              >
                Terms And Conditions
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
      <div>
        <BaseButton
          onClick={onContinue}
          label={'Continue'}
          variant={ButtonTypes.primary}
          disabled={isButtonDisabled()}
        />
      </div>
    </div>
  );
};
