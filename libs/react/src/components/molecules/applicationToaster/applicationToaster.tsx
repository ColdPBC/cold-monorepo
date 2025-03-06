import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Toaster } from '../../atoms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useColdContext } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

const _ApplicationToaster = () => {
  const { data, error, isLoading, mutate } = useSWR('messages', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { logError } = useColdContext();

  useEffect(() => {
    if (data) {
      // clear timeout if it exists
      const timeout = setTimeout(
        () => {
          mutate(null);
        },
        data.timeout ? data.timeout : 3000,
      );

      return () => {
        return clearTimeout(timeout);
      };
    } else {
      return;
    }
  }, [data]);

  if (error) {
    logError(error, ErrorType.SWRError);
    return null;
  }

  if (isLoading) {
    return <></>;
  }

  if (data) {
    return <Toaster toastMessage={data} />;
  } else {
    return <></>;
  }
};

export const ApplicationToaster = withErrorBoundary(_ApplicationToaster, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ApplicationToaster: ', error);
  },
});
