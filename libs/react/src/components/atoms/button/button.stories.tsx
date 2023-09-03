import { BaseButton } from '@coldpbc/components';
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { ButtonTypes } from '@coldpbc/components';
import {IconNames} from '@coldpbc/components';

const meta = {
  title: "Atoms/Button",
  component: BaseButton,
  tags: ["autodocs"],
  decorators: [withKnobs],
  argTypes: {
    variant: {
      control: "select",
      options: ButtonTypes,
    },
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button"
  },
};

export const DefaultIcon: Story = {
  args: {
    label: "Button",
    iconRight:IconNames.ColdJourneyIcon
  },
};

export const DefaultDisabled: Story = {
  args: {
    variant: ButtonTypes.primary,
    label: "Button",
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonTypes.secondary,
    label: "Button",
  },
};

export const Warning: Story = {
  args: {
    variant: ButtonTypes.warning,
    label: "Cancel",
  },
};

export const Link: Story = {
  args: {
    variant: ButtonTypes.hyperlink,
    label: "This is a link",
  },
};
