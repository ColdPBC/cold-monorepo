import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ComplianceNotePayload } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { axiosFetcher } from '@coldpbc/fetchers';
import { BaseButton, ErrorFallback, Spinner } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';

const _QuestionnaireNotesDetail = () => {
	const [noteText, setNoteText] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);
	const { name, focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
	const { orgId } = useAuth0Wrapper();

	const getNotesURL = () => {
		if (orgId && focusQuestion) {
			return [`/compliance/${name}/organizations/${orgId}/questions/${focusQuestion.key}/notes`, 'GET'];
		} else {
			return null;
		}
	};

	const notesSWR = useSWR<ComplianceNotePayload[], any, any>(getNotesURL(), axiosFetcher);

	const firstNote = notesSWR.data?.[0];

	useEffect(() => {
		setNoteText(firstNote?.note || '');
	}, [firstNote]);

	const getSaveButton = () => {
		// want to disable the button if the note is the same as the saved note or is empty
		const disableButton = noteText === firstNote?.note || noteText === '';
		return (
			<div className={'w-full flex flex-row justify-end'}>
				<BaseButton
					label={'Save'}
					onClick={async () => {
						// if the note data is empty then create a new note. if not then update the note
						setButtonLoading(true);
						let response;
						if (!firstNote) {
							response = await axiosFetcher([`/compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes`, 'POST', { note: noteText }]);
						} else {
							response = await axiosFetcher([`/compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes/${firstNote.id}`, 'PATCH', { note: noteText }]);
						}
						if (!isAxiosError(response)) {
							await notesSWR.mutate();
						}
						setButtonLoading(false);
					}}
					disabled={disableButton}
					loading={buttonLoading}
				/>
			</div>
		);
	};

	if (notesSWR.isLoading) {
		return (
			<div className={'w-full h-full'}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={'w-full h-full p-[24px] flex flex-col gap-[16px] text-tc-primary'}>
			<div className={'w-full text-h4 text-start'}>Notes</div>
			<textarea
				className={
					'w-full text-sm not-italic text-tc-primary font-medium bg-transparent rounded-lg py-6 px-4 border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0 resize-none'
				}
				value={noteText}
				onChange={e => setNoteText(e.target.value)}
				placeholder={'Add a note for yourself here....'}
				rows={2}
			/>
			{getSaveButton()}
		</div>
	);
};

export const QuestionnaireNotesDetail = withErrorBoundary(_QuestionnaireNotesDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in QuestionnaireNotesDetail: ', error);
	},
});
