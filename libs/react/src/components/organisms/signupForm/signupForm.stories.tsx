import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SignupForm, SignupFormProps } from './signupForm';
import {
  auth0UserMock,
  getFootprintHandler,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { getOrganizationMock } from '../../../__mocks__/organizationMock';
import { getPrivacyMock, getTosMock } from '../../../__mocks__/policyMock';
import { FootprintOverviewChart } from '@coldpbc/components';
import { getSignUpHandler } from '../../../__mocks__/signupHandlers';

const meta = {
  title: 'Organisms/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const SignupFormStory = (args: SignupFormProps) => {
  return (
    <StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
      <SignupForm {...args} />
    </StoryMockProvider>
  );
};

export const NoCompany: Story = {
  render: (args) => <SignupFormStory {...args} />,
  args: {
    userData: auth0UserMock,
    companyData: undefined,
    tosSigned: false,
    privacySigned: false,
    tosData: getTosMock(),
    privacyData: getPrivacyMock(),
  },
};

export const NoName: Story = {
  render: (args) => <SignupFormStory {...args} />,
  args: {
    userData: {
      ...auth0UserMock,
      given_name: undefined,
      family_name: undefined,
    },
    companyData: getOrganizationMock(),
    tosSigned: false,
    privacySigned: false,
    tosData: getTosMock(),
    privacyData: getPrivacyMock(),
  },
};
