import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getActionMock, StoryMockProvider } from '@coldpbc/mocks';
import { EntityLevel } from '@coldpbc/enums';
import { BulkEditSustainabilityAttributeModal, BulkEditSustainabilityAttributeModalProps } from '@coldpbc/components';
import {fireEvent, waitFor, waitForElementToBeRemoved, within} from "@storybook/testing-library";

const meta: Meta<typeof BulkEditSustainabilityAttributeModal> = {
	title: 'Organisms/BulkEditSustainabilityAttributeModal',
	component: BulkEditSustainabilityAttributeModal,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const BulkEditSustainabilityAttributeModalStpry = (args: BulkEditSustainabilityAttributeModalProps) => {
  const [modalShow, setModalShow] = useState<boolean>(true);
  return (
    <StoryMockProvider handlers={[]}>
      <BulkEditSustainabilityAttributeModal {...args} show={modalShow} setShow={setModalShow} />
    </StoryMockProvider>
  );
};

export const True: Story = {
  render: args => {
    return <BulkEditSustainabilityAttributeModalStpry {...args} />;
  },
  args: {
    show: true,
    setShow: () => {},
    refreshMaterials: () => {},
    entities: [
      {
        entity: {
          id: '1',
          name: 'Material 1',
        },
        attributeAssuranceIds: [
          'attr_assr_1',
        ],
        hasAttribute: false,
      },
    ],
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Material Attribute',
      level: EntityLevel.MATERIAL,
      attributeAssurances: [],
    },
    level: 'material',
  },
};

export const OpenDropdown: Story = {
  render: args => {
    return <BulkEditSustainabilityAttributeModalStpry {...args} />;
  },
  args: {
    show: true,
    setShow: () => {},
    refreshMaterials: () => {},
    entities: [
      {
        entity: {
          id: '1',
          name: 'Material 1',
        },
        attributeAssuranceIds: [
          'attr_assr_1',
        ],
        hasAttribute: false,
      },
    ],
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Material Attribute',
      level: EntityLevel.MATERIAL,
      attributeAssurances: [],
    },
    level: 'material',
  },
  play: async ({ canvasElement, args, step }) => {
    if(canvasElement.parentElement === null) {
      return;
    }
    const canvas = within(canvasElement.parentElement);
    const dropdown = await canvas.findByTestId('bulk-edit-attribute-dropdown');
    const button = within(dropdown).getByRole('button');
    fireEvent.click(button);
  }
};
