import { Meta, StoryObj } from '@storybook/react';
import {Tabs} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'Tab 1',
        content: <div>Tab 1</div>
      },
      {
        label: 'Tab 2',
        content: <div>Tab 2</div>
      },
      {
        label: 'Tab 3',
        content: <div>Tab 3</div>
      },
    ]
  },
};
