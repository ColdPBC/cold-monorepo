import React, { PropsWithChildren } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import {ErrorFallback, ErrorPage, Spinner} from '@coldpbc/components';
import ReactMarkdown from 'react-markdown';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import {isAxiosError} from "axios";

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

  if (isAxiosError(data)) {
    logError(data, ErrorType.SWRError);
    return <ErrorPage
      error={'An error occurred while fetching the terms. Try refreshing the page.'}
      showLogout={false}
    />;
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
