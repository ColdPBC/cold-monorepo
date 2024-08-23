import React from 'react';
import { Popover } from './popover';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ColorNames, GlobalSizes, Positions } from '@coldpbc/enums';
import { Avatar } from '../avatar/avatar';

const meta: Meta<typeof Popover> = {
  title: 'Atoms/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const { position, color, width, content, arrow } = args;
    return (
      <div className="flex w-full place-content-center">
        <Popover content={content} position={position} color={color} width={width} arrow={arrow}>
          <div className="border border-black">Hover over me</div>
        </Popover>
      </div>
    );
  },
  args: {
    position: Positions.Bottom,
    color: ColorNames.jetBlack,
    width: GlobalSizes.medium,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    arrow: true,
  },
};

export const WithComplexComponents: Story = {
  render: args => {
    const { position, color, width, arrow } = args;

    const getContent = () => {
      return (
        <div className="flex space-x-2">
          <div>
            <Avatar user={{ given_name: 'Qaalib', family_name: 'Farah' }} size={GlobalSizes.small} />
          </div>
          <div>
            A user profile contains information about the user, such as their name, email, and profile picture. The profile can be viewed by other users in the system, depending on
            the privacy settings of the user. The profile can be viewed by other users in the system, depending on the privacy settings of the user.
          </div>
        </div>
      );
    };

    return (
      <div className="flex w-full place-content-center">
        <Popover content={getContent()} position={position} color={color} width={width} arrow={arrow}>
          <div className="border border-black">Hover over me</div>
        </Popover>
      </div>
    );
  },
  args: {
    position: Positions.Bottom,
    color: ColorNames.jetBlack,
    width: GlobalSizes.medium,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    arrow: true,
  },
};
