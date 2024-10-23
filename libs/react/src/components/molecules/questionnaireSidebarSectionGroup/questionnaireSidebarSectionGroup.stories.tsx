import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getQuestionnaireSidebarComplianceMock } from '@coldpbc/mocks';
import { QuestionnaireSidebarSectionGroup } from './questionnaireSidebarSectionGroup';

const meta: Meta<typeof QuestionnaireSidebarSectionGroup> = {
	title: 'Molecules/QuestionnaireSidebarSectionGroup',
	component: QuestionnaireSidebarSectionGroup,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<div className={'w-[407px]'}>
				<QuestionnaireSidebarSectionGroup {...args} />
			</div>
		);
	},
	args: {
		sectionGroup: getQuestionnaireSidebarComplianceMock().compliance_section_groups[0],
		sideBarExpanded: true,
	},
};
