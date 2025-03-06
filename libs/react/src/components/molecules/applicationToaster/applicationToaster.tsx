import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Toaster } from '../../atoms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

const _ApplicationToaster = () => {
  const { data, error, isLoading, mutate } = useSWR('messages', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: process.env.STORYBOOK ? 0 : 2000,
    keepPreviousData: true
  });

  // Debug logging for Chromatic environment
  React.useEffect(() => {
    if (process.env.STORYBOOK) {
      console.log('Toast data updated:', data);
    }
  }, [data]);

  // @ts-ignore
  useEffect(() => {
    if (data) {
      // Use shorter timeout in Storybook environment
      const timeoutDuration = process.env.STORYBOOK ? 1000 : (data.timeout || 3000);

      const timeout = setTimeout(() => {
        mutate(null);
      }, timeoutDuration);

      return () => clearTimeout(timeout);
    }
  }, [data, mutate]);

  // Show immediately when data is available
  if (data) {
    return <Toaster toastMessage={data} />;
  }

  return null;
};

export const ApplicationToaster = withErrorBoundary(_ApplicationToaster, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ApplicationToaster: ', error);
  },
});
