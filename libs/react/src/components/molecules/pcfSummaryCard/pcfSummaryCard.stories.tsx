import { Meta, StoryObj } from '@storybook/react';
import { PcfSummaryCard } from '@coldpbc/components';
import { MaterialClassificationCategory } from '@coldpbc/enums';

const meta: Meta<typeof PcfSummaryCard> = {
  title: 'Molecules/PcfSummaryCard',
  component: PcfSummaryCard,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        classificationCategory: MaterialClassificationCategory.TEXTILES,
        emissions: 1.6,
      },
      {
        classificationCategory: MaterialClassificationCategory.INSULATION_MATERIAL,
        emissions: 0.41,
      },
      {
        classificationCategory: MaterialClassificationCategory.METALS,
        emissions: 0.223,
      },
      {
        classificationCategory: MaterialClassificationCategory.PLASTICS,
        emissions: 0.167,
      }
    ],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

