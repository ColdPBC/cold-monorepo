import {
  auth0UserMock,
  getPoliciesSignedMock,
  getSignUpHandler,
  StoryMockProvider,
} from '@coldpbc/mocks';
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
  render: (args) => (
    <StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }}
        signedPolicyData={getPoliciesSignedMock()}
      />
    </StoryMockProvider>
  ),
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      },
    },
  },
};

export const NewCompany: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSignUpHandler.newCompanyAndUser}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }}
        signedPolicyData={getPoliciesSignedMock()}
      />
    </StoryMockProvider>
  ),
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        coldclimate_claims: {
          ...auth0UserMock.coldclimate_claims,
          org_id: null,
        },
      },
    },
  },
};

export const OnOrgCreationError: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSignUpHandler.server500Error}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }}
        signedPolicyData={getPoliciesSignedMock()}
      />
      <ApplicationToaster />
    </StoryMockProvider>
  ),
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        coldclimate_claims: {
          ...auth0UserMock.coldclimate_claims,
          org_id: null,
        },
      },
    },
  },
};
