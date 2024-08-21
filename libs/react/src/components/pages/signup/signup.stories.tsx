import { auth0UserMock, getEmptyPoliciesSignedMock, getSignUpHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ApplicationToaster, SignupPage } from '@coldpbc/components';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewUserExistingCompany: Story = {
  render: args => (
    <StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: undefined,
          family_name: undefined,
        }}
        signedPolicyData={getEmptyPoliciesSignedMock()}
      />
    </StoryMockProvider>
  ),
};

export const OnSignupError: Story = {
  render: args => (
    <StoryMockProvider handlers={getSignUpHandler.server500Error}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: undefined,
          family_name: undefined,
        }}
        signedPolicyData={getEmptyPoliciesSignedMock()}
      />
      <ApplicationToaster />
    </StoryMockProvider>
  ),
};
