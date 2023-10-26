import React, { PropsWithChildren } from 'react';
import { axiosFetcher } from '../../../fetchers';
import useSWR from 'swr';
import { Spinner } from '../../atoms';
import ReactMarkdown from 'react-markdown';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export interface TermsProps {
  type: string;
}

function _Terms(props: PropsWithChildren<TermsProps>) {
  const { data, error, isLoading } = useSWR<any>(
    ['/policy-content/' + props.type + '/content', 'GET'],
    axiosFetcher,
  );

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else if (error) {
    return <div></div>;
  }

  return (
    <div className={'bg-white h-full w-full'}>
      <div className={'markdown-terms'}>
        <ReactMarkdown children={data} />
      </div>
    </div>
  );
}

export const Terms = withErrorBoundary(_Terms, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Terms: ', error);
  },
});
