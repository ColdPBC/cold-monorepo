import { BaseButton } from './button';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import { ButtonTypes } from '../../../enums/buttons';
import { IconNames } from '../../../enums/iconNames';
import { Spinner } from 'flowbite-react';
import { GlobalSizes } from '@coldpbc/enums';
import React from 'react';

const meta = {
  title: 'Atoms/Button',
  component: BaseButton,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {
    variant: {
      control: 'select',
      options: ButtonTypes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};

export const DefaultIcon: Story = {
  args: {
    label: 'Button',
    iconRight: IconNames.ColdJourneyIcon,
  },
};

export const DefaultDisabled: Story = {
  args: {
    variant: ButtonTypes.primary,
    label: 'Button',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonTypes.secondary,
    label: 'Button',
  },
};

export const Warning: Story = {
  args: {
    variant: ButtonTypes.warning,
    label: 'Cancel',
  },
};

export const Link: Story = {
  args: {
    variant: ButtonTypes.hyperlink,
    label: 'This is a link',
  },
};

export const ButtonWithSpinner: Story = {
  render: (args) => (
    <BaseButton {...args}>
      <span>Button</span>
      <Spinner size={GlobalSizes.small} />
    </BaseButton>
  ),
  args: {
    variant: ButtonTypes.primary,
    disabled: true,
  },
};
