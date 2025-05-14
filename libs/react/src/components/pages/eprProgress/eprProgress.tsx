import {EprProgressStatusBucket, ErrorFallback, MainContent} from "@coldpbc/components";
import {useAuth0Wrapper, useColdContext, useGraphQLSWR} from "@coldpbc/hooks";
import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import React, {useEffect, useState} from "react";
import {getGraphqlError} from "@coldpbc/lib";
import {withErrorBoundary} from "react-error-boundary";


const _EprProgress = () => {
  const {logBrowser} = useColdContext();
  const {orgId} = useAuth0Wrapper();
  const [eprSubmissions, setEprSubmissions] = useState<EprSubmissionGraphQL[]>([])
  const eprQuery = useGraphQLSWR<{
    eprSubmissions: EprSubmissionGraphQL[]
  }>('GET_EPR_SUBMISSIONS', {
    filter: {
      organization: {
        id: orgId,
      },
    },
  })

  useEffect(() => {
    const error = getGraphqlError(eprQuery);
    if(eprQuery.data && error === null){
      setEprSubmissions(eprQuery.data.data.eprSubmissions)
    }
  }, [eprQuery]);

  const error = getGraphqlError(eprQuery);
  if(error){
    logBrowser(
      'EPR Progress Page Error',
      'error',
      {
        error: error,
      },
    );
  }

  // separate the submissions by status into 'Upcoming', 'In Progress', and 'Submitted' arrays
  const upcomingSubmissions = eprSubmissions.filter(submission => submission.status === 'Upcoming');
  const inProgressSubmissions = eprSubmissions.filter(submission => submission.status === 'In Progress');
  const submittedSubmissions = eprSubmissions.filter(submission => submission.status === 'Submitted');

  return (
    <MainContent
      title="Extended Producer Responsibility Progress"
      className={'w-full h-full'}
      isLoading={eprQuery.isLoading}>
      <div className={'w-full h-full overflow-x-auto scrollbar-hide flex flex-row gap-4'}>
        <EprProgressStatusBucket title={'Upcoming'} items={upcomingSubmissions} />
        <EprProgressStatusBucket title={'In Progress'} items={inProgressSubmissions} />
        <EprProgressStatusBucket title={'Submitted'} items={submittedSubmissions} />
      </div>
    </MainContent>
  )
}

export const EprProgress = withErrorBoundary(_EprProgress, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in EprProgress: ', error);
  },
});
