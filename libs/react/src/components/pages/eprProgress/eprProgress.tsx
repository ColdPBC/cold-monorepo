import {EprProgressStatusBucket, MainContent} from "@coldpbc/components";
import {useAuth0Wrapper, useColdContext, useGraphQLSWR} from "@coldpbc/hooks";
import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import {useEffect, useState} from "react";
import {getGraphqlError, hasGraphqlError} from "@coldpbc/lib";


export const EprProgress = () => {
  const {logBrowser} = useColdContext();
  const {orgId} = useAuth0Wrapper();
  const [epsSubmissions, setEpsSubmissions] = useState<EprSubmissionGraphQL[]>([])
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
      setEpsSubmissions(eprQuery.data.data.eprSubmissions)
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
  const upcomingSubmissions = epsSubmissions.filter(submission => submission.status === 'Upcoming');
  const inProgressSubmissions = epsSubmissions.filter(submission => submission.status === 'In Progress');
  const submittedSubmissions = epsSubmissions.filter(submission => submission.status === 'Submitted');

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
