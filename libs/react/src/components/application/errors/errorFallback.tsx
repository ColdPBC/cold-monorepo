import React from 'react';
import { ErrorType } from '../../../enums/errors';
import { useColdContext } from '@coldpbc/hooks';

export type ErrorFallbackProps = {
  error: Error;
};

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const { logError, logBrowser } = useColdContext();
  logError(error, ErrorType.RenderingError);
  logBrowser(
    'Error rendering component',
    'error',
    {
      error: { ...error },
    },
    error,
  );
  return <div></div>;
};
