import React, { PropsWithChildren } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { ErrorFallback, Spinner } from '@coldpbc/components';
import ReactMarkdown from 'react-markdown';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';

export interface TermsProps {
  type: string;
}

function _Terms(props: PropsWithChildren<TermsProps>) {
  const { data, error, isLoading } = useSWR<any, any, any>([`/policies/${props.type}/content`, 'GET'], axiosFetcher);
  const { logError } = useColdContext();

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    logError(error, ErrorType.SWRError);
    return <div></div>;
  }

  return (
    <div className={'bg-white h-full w-full overflow-y-auto'}>
      <div className={'markdown-terms overflow-y-auto'}>
        <ReactMarkdown children={data} />
      </div>
    </div>
  );
}

export const Terms = withErrorBoundary(_Terms, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Terms: ', error);
  },
});
