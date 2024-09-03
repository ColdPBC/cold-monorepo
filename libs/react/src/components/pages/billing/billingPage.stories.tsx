import { StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { BillingPage } from '@coldpbc/components';
import { getStripeHandlers } from '../../../__mocks__/stripeHandlers';

const meta: Meta<typeof BillingPage> = {
  title: 'Pages/BillingPage',
  component: BillingPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider>
      <BillingPage />
    </StoryMockProvider>
  ),
};

export const NoSubscription: Story = {
  render: args => (
    <StoryMockProvider handlers={getStripeHandlers.noSubscription}>
      <BillingPage />
    </StoryMockProvider>
  ),
};
