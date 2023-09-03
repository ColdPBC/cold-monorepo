import React from "react";
import { BaseButton } from '@coldpbc/components';
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { ToastMessageTypes } from '@coldpbc/components';
import { ApplicationToaster } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/components';
import { useAddToastMessage } from '@coldpbc/components';
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
