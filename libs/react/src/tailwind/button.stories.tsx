import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ButtonTypes } from '@coldpbc/enums';
import { IconNames } from '@coldpbc/enums';
import { GlobalSizes } from '@coldpbc/enums';
import React from 'react';
import { Spinner } from '@coldpbc/components';
import { NewButton } from './newButton';

const meta: Meta<typeof NewButton> = {
  title: 'Tailwind/Button',
  component: NewButton,
  tags: ['autodocs'],
  decorators: [withKnobs],
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
  args: {
    variant: ButtonTypes.primary,
    loading: true,
  },
};
