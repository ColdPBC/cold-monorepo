import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { TeamMembersSettings } from "./teamMembersSettings";
import { SWRConfig } from "swr";

const meta = {
  title: "Pages/TeamMembersSettings",
  component: TeamMembersSettings,
  tags: ["autodocs"],
  decorators: [withKnobs],
} satisfies Meta<typeof TeamMembersSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <SWRConfig
        value={{
          provider: (cache) => {
            cache.delete("messages");
            return cache;
          },
        }}
      >
        <TeamMembersSettings {...args} />
      </SWRConfig>
    );
  },
  args: {
    user: {
      coldclimate_claims: {
        org_id: "org_123",
      },
      name: "John Doe",
    },
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  }
};
