import { Meta, StoryObj } from '@storybook/react';

import { AttributeAssuranceCountGraph } from '@coldpbc/components';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import {
  defaultGraphqlMocks,
  getMaterialsMocksWithAssurances,
  getProductsMock,
  getSupplierMocks,
  StoryMockProvider,
} from '@coldpbc/mocks';

const meta: Meta<typeof AttributeAssuranceCountGraph> = {
  title: 'Molecules/AttributeAssuranceCountGraph',
  component: AttributeAssuranceCountGraph,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Material Attribute',
      attributeAssurances: [
        {
          ids: [],
          status: AttributeAssuranceStatus.NOT_DOCUMENTED,
          entity: getMaterialsMocksWithAssurances()[0],
        },
      ],
      level: EntityLevel.MATERIAL,
    },
  },
  render: (args) => {
    return (
      <StoryMockProvider graphqlMocks={defaultGraphqlMocks}>
        <AttributeAssuranceCountGraph {...args} />
      </StoryMockProvider>
    );
  },
};

export const Product: Story = {
	args: {
		sustainabilityAttribute: {
			id: 'a',
			name: 'Default Product Attribute',
			attributeAssurances: [
				{
          ids: [],
					status: AttributeAssuranceStatus.ACTIVE,
					entity: getProductsMock()[0],
				},
			],
			level: EntityLevel.PRODUCT,
		},
	},
  render: (args) => {
    return (
      <StoryMockProvider graphqlMocks={defaultGraphqlMocks}>
        <AttributeAssuranceCountGraph {...args} />
      </StoryMockProvider>
    );
  },
};

export const Organization: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Organization Attribute',
      attributeAssurances: [],
      level: EntityLevel.ORGANIZATION,
    },
  },
};

export const Supplier: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Supplier Attribute',
      attributeAssurances: [
        {
          ids: [],
          status: AttributeAssuranceStatus.ACTIVE,
          entity: getSupplierMocks()[0],
        },
      ],
      level: EntityLevel.SUPPLIER,
    },
  },
  render: (args) => {
    return (
      <StoryMockProvider graphqlMocks={defaultGraphqlMocks}>
        <AttributeAssuranceCountGraph {...args} />
      </StoryMockProvider>
    );
  },
};
