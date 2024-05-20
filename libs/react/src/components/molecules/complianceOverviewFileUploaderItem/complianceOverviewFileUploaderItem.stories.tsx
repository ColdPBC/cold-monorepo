import { Meta, StoryObj } from '@storybook/react';
import { ComplianceOverviewFileUploaderItem } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceOverviewFileUploaderItem> = {
  title: 'Molecules/ComplianceOverviewFileUploaderItem',
  component: ComplianceOverviewFileUploaderItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewFile: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <div className="w-[620px]">
          <ComplianceOverviewFileUploaderItem {...args} />
        </div>
      </StoryMockProvider>
    );
  },
  args: {
    file: {
      uploaded: false,
      new: true,
      contents: {
        name: 'test.txt',
      },
    },
  },
};

export const OldFile: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <div className="w-[620px]">
          <ComplianceOverviewFileUploaderItem {...args} />
        </div>
      </StoryMockProvider>
    );
  },
  args: {
    file: {
      uploaded: true,
      new: false,
      contents: {
        original_name: 'test.txt',
        updated_at: '2024-05-19T00:00:00.000Z',
      },
    },
  },
};
