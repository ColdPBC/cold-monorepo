import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireSidebarSection } from '@coldpbc/components';
import { getQuestionnaireSidebarComplianceMock } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireSidebarSection> = {
	title: 'Molecules/QuestionnaireSidebarSection',
	component: QuestionnaireSidebarSection,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<div className={'w-[407px]'}>
				<QuestionnaireSidebarSection {...args} />
			</div>
		);
	},
	args: {
		section: getQuestionnaireSidebarComplianceMock().compliance_section_groups[0].compliance_sections[0],
		sideBarExpanded: true,
	},
};
