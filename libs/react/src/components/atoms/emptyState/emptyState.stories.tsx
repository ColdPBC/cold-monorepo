import { EmptyState } from './emptyState';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EmptyState> = {
  title: 'Atoms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'This is the empty state of this page',
  },
};

export const WithBody: Story = {
  args: {
    header: 'This is the empty state of this page',
    body: 'Please look at another page instead'
  },
};

export const EmbeddedLinks: Story = {
  args: {
    header: <p>This is a header with a <a href={'/documents'}>link to documents</a></p>,
    body: <p>And the body has a way to <a href="mailto:support@coldclimate.com">send an email to support</a></p>
  }
};
