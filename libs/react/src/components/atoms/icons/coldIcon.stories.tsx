import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { DefaultHexColors } from '../../../enums/colors';
import { ColdIcon } from './coldIcon';
import { IconNames } from '../../../enums/iconNames';

const meta = {
    title: "Atoms/Icons/ColdIcon",
    component: ColdIcon,
    tags: ["autodocs"],
    decorators: [withKnobs],
    argTypes: {
        name: {
            control: "select",
            options: IconNames,
        },
        color: {
            control: "select",
            options: DefaultHexColors
        }
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: IconNames.ColdSettingsIcon
    },
};
