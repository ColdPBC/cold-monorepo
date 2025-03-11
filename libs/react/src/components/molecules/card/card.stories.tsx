import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';
import { ButtonTypes } from '../../../enums/buttons';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[668px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    title: 'Company Footprint',
    ctas: [
      {
        text: 'Learn More',
        action: function () {
          window.alert('Learning more!');
        },
      },
    ],
  },
};

export const RightColumn: Story = {
  render: (args) => {
    return (
      <div className="w-[437px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    title: 'Company Footprint',
    ctas: [
      {
        text: 'Learn More',
        action: function () {
          window.alert('Learning more!');
        },
      },
    ],
  },
};

export const NoButton: Story = {
  render: (args) => {
    return (
      <div className="w-[668px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    title: 'Company Footprint',
  },
};

export const NoTitle: Story = {
  render: (args) => {
    return (
      <div className="w-[668px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    ctas: [
      {
        text: 'Learn More',
        action: function () {
          window.alert('Learning more!');
        },
      },
    ],
  },
};

export const OnlyContent: Story = {
  render: (args) => {
    return (
      <div className="w-[668px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
  },
};

export const NoGlow: Story = {
  render: (args) => {
    return (
      <div className="w-[668px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: false,
  },
};

export const TwoButton: Story = {
  render: (args) => {
    return (
      <div className="w-[1097px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    title: 'Manage Your Account',
    ctas: [
      {
        text: 'Delete My Profile',
        action: function () {
          window.alert('Fake delete!');
        },
      },
      {
        text: 'Log Out',
        action: function () {
          window.alert('Fake logout!');
        },
      },
    ],
  },
};

export const PrimaryButton: Story = {
  render: (args) => {
    return (
      <div className="w-[1097px]">
        <Card {...args}>
          <div>Lots of great content in this card!</div>
        </Card>
      </div>
    );
  },
  args: {
    glow: true,
    title: 'Team Members',
    ctas: [
      {
        text: 'Invite Users',
        action: function () {
          window.alert('Fake invite!');
        },
        variant: ButtonTypes.primary,
      },
    ],
  },
};

export const Dropdown: Story = {
  render: (args) => {
    return <RenderDropdown {...args} />;
  },
  args: {
    glow: true,
    title: 'Team Members',
    dropdownOptions: [
      { value: 'category', label: 'Category' },
      { value: 'subcategory', label: 'Subcategory' }
    ],
  },
};


const RenderDropdown = (args) => {
  const [selectedView, setSelectedView] = React.useState('category');

  return (
    <div className="w-[1097px]">
      <Card
        {...args}
        selectedDropdownValue={selectedView}
        onDropdownSelect={setSelectedView}
      >
        <div>Lots of great content in this card!</div>
      </Card>
    </div>
  );
}
