import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubscriptionList } from '@coldpbc/components';
import { useState } from 'react';

const meta: Meta<typeof SubscriptionList> = {
  title: 'Organisms/SubscriptionList',
  component: SubscriptionList,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => StoryJSX(args),
  args: {
    products: [
      {
        id: '1',
        name: 'Basic',
        default_price: 'gwgwgrwwrtg',
      },
      {
        id: '2',
        name: 'Pro',
        default_price: 'sfgbewrwr',
      },
      {
        id: '3',
        name: 'Enterprise',
        default_price: 'rgwergwrwe',
      },
    ],
  },
};

const StoryJSX = (args: any) => {
  const [subscription, setSubscription] = useState<string | undefined>(undefined);

  return <SubscriptionList {...args} subscription={subscription} purchase={setSubscription} />;
};
