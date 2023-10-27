import React from 'react';
import { ErrorType } from '../../../enums/errors';
import { useColdContext } from '@coldpbc/hooks';

export type ErrorFallbackProps = {
  error: Error;
};

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const { logError } = useColdContext();
  logError(error, ErrorType.RenderingError);
  return <div></div>;
};
