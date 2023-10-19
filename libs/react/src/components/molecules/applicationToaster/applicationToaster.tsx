import React, { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Toaster } from '../../atoms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

const _ApplicationToaster = () => {
  const { data, error, isLoading } = useSWR('messages', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      // clear timeout if it exists
      const timeout = setTimeout(
        () => {
          mutate('messages', undefined);
        },
        data.timeout ? data.timeout : 3000,
      );

      return () => {
        return clearTimeout(timeout);
      };
    }
  }, [data]);

  if (error) {
    return <></>;
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
  FallbackComponent: ErrorFallback,
  onError: (error, info) => {
    console.error('Error occurred in ApplicationToaster: ', error);
  },
});
