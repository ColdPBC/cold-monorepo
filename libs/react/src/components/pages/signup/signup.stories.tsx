import {
  auth0UserMock,
  getSignUpHandler,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SignupPage } from '@coldpbc/components';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
      <SignupPage
        userData={{
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }}
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
