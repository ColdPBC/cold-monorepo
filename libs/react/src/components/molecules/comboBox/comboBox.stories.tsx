import React, {useState} from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {ComboBox, ComboBoxProps} from "./comboBox";
import {InputOption} from "@coldpbc/interfaces";
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof ComboBox> = {
  title: 'Molecules/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ComboBoxStory {...args} />;
  },
  args: {
    options: [
      { id: 0, name: 'Option 1', value: 'value_1' },
      { id: 1, name: 'Option 2', value: 'value_2' },
      { id: 2, name: 'Option 3', value: 'value_3' },
    ],
    name: 'name',
    label: 'Label',
    value: { id: 1, name: 'Option 1', value: 'value_1' },
  },
};

export const AddNewOption: Story = {
  render: (args) => {
    return <ComboBoxStory {...args} />;
  },
  args: {
    options: [
      { id: 0, name: 'Option 1', value: 'value_1' },
      { id: 1, name: 'Option 2', value: 'value_2' },
      { id: 2, name: 'Option 3', value: 'value_3' },
    ],
    name: 'name',
    label: 'Label',
    value: { id: 1, name: 'Option 1', value: 'value_1' },
    allowAddNewOption: true,
  },
  play: async ({canvasElement, step}) => {
    // select the input type
    const canvas = within(canvasElement);
    const combobox = canvas.getByTestId('name');
    const input = within(combobox).getByTestId('name_input')
    // type in
    await userEvent.type(input, 'Option 4');

    const newOption = within(combobox).getByTestId('option_new_option');
    await userEvent.click(newOption);

    await userEvent.click(input);

    // make sure the new option is there
    const option4 = await within(combobox).findByTestId('option_3');
    await userEvent.click(option4);
  }
};

const ComboBoxStory = (props: ComboBoxProps) => {
  const {value, allowAddNewOption, onAddNewOption } = props;
  const [stateValue, setStateValue] = useState<InputOption>(value);
  const [options, setOptions] = useState<InputOption[]>(props.options);

  const addNewOption = (newOption: InputOption) => {
    setOptions([...options, newOption]);
    setStateValue(newOption);
    console.log('Add new option:', newOption);
  }

  console.log(options)

  return (
    <div
      className={'w-[150px]'}
    >
      <ComboBox
        {...props}
        options={options}
        onAddNewOption={allowAddNewOption ? addNewOption : onAddNewOption}
        value={stateValue}
        onChange={(selectedOption) => {
          console.log('Onchange', selectedOption);
          setStateValue(selectedOption);
        }}
      />
    </div>
  );
};
