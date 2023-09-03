/* eslint-disable @nx/enforce-module-boundaries */
import React, { useState } from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { Input } from '@coldpbc/components';
import { InputTypes } from '@coldpbc/components';
import {IInputProps} from '@coldpbc/components';

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <InputStory {...args} />
  },
  args: {
    idx: 1,
    input_label: "Name",
    type: InputTypes.Text,
    input_props: {
      name: "",
      value: "",
      onValueChange: (value) => {},
    }
  },
};

export const Currency: Story = {
  render: (args) => {
    return <InputStory {...args} />
  },
  args: {
    idx: 1,
    input_label: "Currency",
    type: InputTypes.Currency,
    input_props: {
      name: "",
      value: "",
      onValueChange: (value) => {},
    }
  },
};

export const Number: Story = {
  render: (args) => {
    return <InputStory {...args} />
  },
  args: {
    idx: 1,
    input_label: "Number",
    type: InputTypes.Number,
    input_props: {
      name: "",
      value: "",
      onValueChange: (value) => {},
    }
  },
};

export const Select: Story = {
  render: (args) => {
    return <InputStory {...args} />
  },
  args:{
    idx: 1,
    input_label: "State",
    type: InputTypes.Select,
    input_props: {
      name: "state",
      value: "",
      options: [
        {
          id: 1,
          name: "Minnesota"
        },
        {
          id: 2,
          name: "Wisconsin"
        }
      ],
      onValueChange: (value) => {},
      defaultValue: "Minnesota",
    }
  }
};

const InputStory = (props: IInputProps) => {
  const {
    input_props,
    input_label,
    input_label_props,
    numeric_input_props,
    container_classname,
    idx,
    type,
  } = props;
  const [value, setValue] = useState<any>("" || input_props.defaultValue);
  return (
      <Input
          {...props}
          input_props={{
            ...input_props,
            value:value,
            onValueChange: (value) => {
                setValue(value);
            }
          }}
      />
  );
}
