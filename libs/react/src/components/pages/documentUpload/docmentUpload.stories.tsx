import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentUpload } from "@coldpbc/components";

const meta: Meta<typeof DocumentUpload> = {
  title: 'Pages/DocumentUpload',
  component: DocumentUpload,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
