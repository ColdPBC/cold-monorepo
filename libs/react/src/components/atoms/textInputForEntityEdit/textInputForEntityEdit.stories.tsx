import { Meta, StoryObj } from '@storybook/react';
import { TextInputForEntityEdit } from '@coldpbc/components';
import { getMaterialMock } from '@coldpbc/mocks';
import React from 'react';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { userEvent, within } from '@storybook/test';

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
  const [error, setError] = React.useState<string | undefined>(undefined);

  return (
    <TextInputForEntityEdit<MaterialGraphQL>
      fieldName={'name'}
      label={'Name'}
      required={true}
      error={error}
      setError={setError}
      preexistingValues={['Preexisting Name']}
      entityState={materialState}
      setEntityState={setMaterialState}
    />
  );
};

export const Default: Story = {
  render: () => <InputWrapper />
};

export const NoNameError: Story = {
  render: () => <InputWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByRole('textbox', { name: 'Name *' });
    await userEvent.clear(nameInput);
  }
};

export const PreexistingNameError: Story = {
  render: () => <InputWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByRole('textbox', { name: 'Name *' });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Preexisting Name');
  }
};
