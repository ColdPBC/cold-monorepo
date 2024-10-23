import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SurveyDocumentLinkModal } from '@coldpbc/components';
import { useState } from 'react';

const meta: Meta<typeof SurveyDocumentLinkModal> = {
	title: 'Molecules/SurveyDocumentLinkModal',
	component: SurveyDocumentLinkModal,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <SurveyDocumentLinkModalStory {...args} />;
	},
	args: {
		show: true,
		setShowModal: () => {},
		questionKey: 'GEN:1',
		saveSurveyDocumentLink: (key: string, value: any) => {},
		surveyDocumentLink: 'https://www.google.com',
	},
};

const SurveyDocumentLinkModalStory = (args: any) => {
	const [show, setShowModal] = useState<boolean>(args.show);

	const saveSurveyDocumentLink = (key: string, value: any) => {
		setShowModal(false);
	};

	return <SurveyDocumentLinkModal {...args} show={show} setShowModal={setShowModal} saveSurveyDocumentLink={saveSurveyDocumentLink} />;
};
