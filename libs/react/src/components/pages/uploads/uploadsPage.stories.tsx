import { Meta, StoryObj } from '@storybook/react';
import { UploadsPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';

const meta: Meta<typeof UploadsPage> = {
  title: 'Pages/UploadsPage',
  component: UploadsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <UploadsPage />
    );
  },
};
