import React from 'react';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = (props: FallbackProps) => {
  const { logError, logBrowser } = useColdContext();
  logError(props.error, ErrorType.RenderingError);
  logBrowser(
    'Error rendering component',
    'error',
    {
      props,
    },
    props.error,
  );
  return <div></div>;
};
