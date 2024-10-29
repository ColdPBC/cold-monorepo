import { Meta, StoryObj } from '@storybook/react';

import { SustainabilityAttributeSelect } from '@coldpbc/components';
import { StoryMockProvider, sustainabilityAttributesMocks } from '@coldpbc/mocks';

const meta: Meta<typeof SustainabilityAttributeSelect> = {
  title: 'Atoms/SustainabilityAttributeSelect',
  component: SustainabilityAttributeSelect,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks}>
        <SustainabilityAttributeSelect />
      </StoryMockProvider>
    );
  },
};
