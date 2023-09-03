import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { TeamMembersDataGrid } from '@coldpbc/components';
import { SWRConfig } from "swr";

const meta = {
  title: "Organisms/TeamMemberDatagrid",
  component: TeamMembersDataGrid,
  tags: ["autodocs"],
  decorators: [withKnobs],
} satisfies Meta<typeof TeamMembersDataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <SWRConfig value={{ provider: (cache) => {return cache} }}>
        <TeamMembersDataGrid {...args} />
      </SWRConfig>
    );
  },
  args: {
    dataGridUser: {
      coldclimate_claims: {
        org_id: "org_123",
      },
    },
  },
};
