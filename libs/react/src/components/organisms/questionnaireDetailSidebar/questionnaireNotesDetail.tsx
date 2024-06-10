import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ComplianceNotePayload } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { axiosFetcher } from '@coldpbc/fetchers';
import { BaseButton, Spinner } from '@coldpbc/components';

export const QuestionnaireNotesDetail = () => {
  const [noteText, setNoteText] = useState('');
  const { name, focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const { orgId } = useAuth0Wrapper();

  const getNotesURL = () => {
    if (orgId) {
      return [`/compliance_definitions/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes`, 'GET'];
    } else {
      return null;
    }
  };

  const notesSWR = useSWR<ComplianceNotePayload, any, any>(getNotesURL(), axiosFetcher);

  useEffect(() => {
    setNoteText(notesSWR.data?.note || '');
  }, [notesSWR.data]);

  const getSaveButton = () => {
    // want to disable the button if the note is the same as the saved note or is empty
    const disableButton = noteText === notesSWR.data?.note || noteText === '';
    return (
      <div className={'w-full flex flex-row justify-end'}>
        <BaseButton
          label={'Save'}
          onClick={() => {
            // todo: handle note API submission
          }}
          disabled={disableButton}
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
