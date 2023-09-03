import React from "react";
import { BaseButton } from '../../atoms/button/button';
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { ToastMessageTypes } from '../../../interfaces/toastMessage';
import { ApplicationToaster } from './applicationToaster';
import { GlobalSizes } from '../../../enums/sizes';
import { useAddToastMessage } from '../../../hooks/useToastMessage';
import { SWRConfig } from "swr";

const meta = {
  title: "Molecules/Application Toaster",
  component: ApplicationToaster,
  tags: ["autodocs"],
  decorators: [withKnobs],
  argTypes: {
    type: {
      control: "select",
      options: ToastMessageTypes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = (args: any) => {
  const { addToastMessage } = useAddToastMessage();
  const addNewToasterMessage = (type: string) => {
    addToastMessage({
      message: "New toaster message",
      type: type,
      timeout: 3000,
    });
  };
  return (
    <div className={"relative w-full h-screen"}>
      <SWRConfig
        value={{
          provider: (cache) => {
            cache.delete("messages");
            return cache;
          },
        }}
      >
        <div className="space-x-2">
          <BaseButton
            onClick={() => {
              addNewToasterMessage("success");
            }}
            label={"Add New Success Message"}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage("failure");
            }}
            label={"Add New Warning Message"}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage("info");
            }}
            label={"Add New Informational Message"}
          />
        </div>
        <ApplicationToaster />
      </SWRConfig>
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    return <DefaultComponent {...args} />;
  },
};
