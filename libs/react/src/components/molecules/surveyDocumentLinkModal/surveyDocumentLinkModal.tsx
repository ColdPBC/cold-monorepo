import { BaseButton, Card, ColdIcon, Input } from '@coldpbc/components';
import { useState } from 'react';
import { ButtonTypes, IconNames } from '@coldpbc/enums';

export interface SurveyDocumentLinkModalProps {
	show: boolean;
	setShowModal: (show: boolean) => void;
	surveyDocumentLink: string | undefined | null;
	questionKey: string;
	saveSurveyDocumentLink: (key: string, value: any) => void;
}

export const SurveyDocumentLinkModal = (props: SurveyDocumentLinkModalProps) => {
	const { show, setShowModal, surveyDocumentLink, saveSurveyDocumentLink, questionKey } = props;
	const [documentLink, setDocumentLink] = useState<string>(surveyDocumentLink ? surveyDocumentLink : '');

	const onSaveSurveyDocumentLinkClick = () => {
		if (documentLink) {
			saveSurveyDocumentLink(questionKey, documentLink);
		} else {
			saveSurveyDocumentLink(questionKey, null);
		}
	};

	if (show) {
		return (
			<Card glow={false} className={'w-[400px] h-auto p-[12px] border-[1px] border-primary text-label text-tc-primary'}>
				<div className={'w-full flex flex-col space-y-[9px]'}>
					<div className={'flex flex-row justify-between'}>
						<div className={'flex items-center text-left items-center text-eyebrow'}>Paste Document Link</div>
						<div className={'flex justify-center items-center cursor-pointer w-[24px] h-[24px]'} onClick={() => setShowModal(false)}>
							<ColdIcon name={IconNames.CloseModalIcon} className={'w-[8px] h-[8px]'} />
						</div>
					</div>
					<div className={'flex flex-row space-x-[8px] w-full'}>
						<Input
							input_props={{
								name: 'documentLink',
								value: documentLink,
								onChange: (e: any) => setDocumentLink(e.target.value),
								onValueChange: (value: any) => setDocumentLink(value),
								className: 'w-full px-[16px] py-[8px] bg-bgc-accent',
							}}
							container_classname={'w-full'}
						/>
						<BaseButton label={'Save'} onClick={() => onSaveSurveyDocumentLinkClick()} variant={ButtonTypes.secondary} className={'w-[61px] h-[auto]'} />
					</div>
				</div>
			</Card>
		);
	} else {
		return null;
	}
};
