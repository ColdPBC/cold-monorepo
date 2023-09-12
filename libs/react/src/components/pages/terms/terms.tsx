import React, { PropsWithChildren } from 'react';
import { axiosFetcher } from '../../../fetchers';
import useSWR from 'swr';
import { Spinner } from '../../atoms';
import ReactMarkdown from 'react-markdown';

export interface TermsProps {
  type: string;
}

export function Terms(props: PropsWithChildren<TermsProps>) {
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
    error.log(error);
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
