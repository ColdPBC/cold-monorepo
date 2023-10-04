import { ActionItem, ActionItemProps } from './actionItem';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import { getActionMock } from '../../../__mocks__/actions/actionsMock';
import { StoryMockProvider } from '@coldpbc/mocks';
import { ActionItemVariants } from '../../../enums/actions';

const meta = {
  title: 'Molecules/ActionItem',
  component: ActionItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ActionItemTemplate = (args: ActionItemProps) => {
  return (
    <StoryMockProvider handlers={[]}>
      <ActionItem {...args} />;
    </StoryMockProvider>
  );
};

export const WideVariant: Story = {
  render: (args) => {
    return <ActionItemTemplate {...args} />;
  },
  args: {
    action: getActionMock(),
    variant: ActionItemVariants.wide,
  },
};

export const NarrowVariant: Story = {
  render: (args) => {
    return <ActionItemTemplate {...args} />;
  },
  args: {
    action: getActionMock(),
    variant: ActionItemVariants.narrow,
  },
};
