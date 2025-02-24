import { Meta, StoryObj } from '@storybook/react';
import {
  UploadModalFileListItem
} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';

const meta: Meta<typeof UploadModalFileListItem> = {
  title: 'Molecules/UploadModalFileListItem',
  component: UploadModalFileListItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Uploading: Story = {
  args: {
    file: new File([''], '2022-PD-Impact-Report.pdf'),
    apiResponse: null,
    uploading: true,
  },
};

export const Failed: Story = {
  args: {
    file: new File([''], '2022-PD-Impact-Report.pdf'),
    apiResponse: {
      message: 'test.txt already exists',
      success: false,
    },
    uploading: false,
  },
};

export const Success: Story = {
  args: {
    file: new File([''], '2022-PD-Impact-Report.pdf'),
    apiResponse: {
      message: 'Success',
      success: true,
    },
    uploading: false,
  },
};
