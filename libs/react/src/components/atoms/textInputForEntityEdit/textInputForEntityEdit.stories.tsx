import { Meta, StoryObj } from '@storybook/react';
import { TextInputForEntityEdit } from '@coldpbc/components';
import { getMaterialMock } from '@coldpbc/mocks';
import React from 'react';
import { MaterialGraphQL } from '@coldpbc/interfaces';

const meta: Meta<typeof TextInputForEntityEdit> = {
  title: 'Atoms/TextInputForEntityEdit',
  component: TextInputForEntityEdit,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InputWrapper = () => {
  const [materialState, setMaterialState] = React.useState<MaterialGraphQL>(getMaterialMock);

  return (
    <TextInputForEntityEdit<MaterialGraphQL>
      fieldName={'name'}
      label={'Name'}
      required={true}
      entityState={materialState}
      setEntityState={setMaterialState}
    />
  );
};

export const Default: Story = {
  render: () => <InputWrapper />
};
