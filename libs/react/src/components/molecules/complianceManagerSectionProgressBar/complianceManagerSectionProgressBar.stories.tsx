import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';

const meta: Meta<typeof ComplianceManagerSectionProgressBar> = {
  title: 'Molecules/ComplianceManagerSectionProgressBar',
  component: ComplianceManagerSectionProgressBar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className="w-[620px]">
        <ComplianceManagerSectionProgressBar {...args} />
      </div>
    );
  },
  args: {
    questions: [
      {
        id: 'cq_d2cmihcr4mwpn2sa',
        prompt: 'Please specify which third-party RSL(s).',
        order: 30,
        key: 'CHEM-3A',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
      {
        id: 'cq_jba9yyibiexy6zx7',
        prompt: 'Is your brand’s RSL publicly available?',
        order: 31,
        key: 'CHEM-4',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
      {
        id: 'cq_pvz2w191snt5jwu4',
        prompt: 'Does your brand have a means of verifying that products you supply to REI comply with your RSL?',
        order: 27,
        key: 'CHEM-1',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
      {
        id: 'cq_v8379scq7pncl3d5',
        prompt: 'Is your RSL aligned to an internationally recognized third-party RSL?',
        order: 29,
        key: 'CHEM-3',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
      {
        id: 'cq_wu2kksbvijpxmyc3',
        prompt:
          'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a Restricted Substances List (RSL) that specifies which substances are banned or restricted in products and that meets or exceeds all applicable regulatory requirements.\n\nDoes your brand have an RSL in place for the products you supply to REI?',
        order: 26,
        key: 'CHEM-0',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
      {
        id: 'cq_y5ar15bfkrud9ysx',
        prompt: 'Please indicate whether your brand’s chemicals management program consists of the following components that aid in verifying compliance with your RSL.',
        order: 28,
        key: 'CHEM-2',
        organization_id: 'org_VWv3Al9pLEI4CaOH',
        not_started: true,
        ai_answered: false,
        user_answered: false,
        bookmarked: false,
      },
    ],
  },
};
