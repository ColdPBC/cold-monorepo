import React from 'react';

export type ErrorPageProps = {
  error?: string;
};

export const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div
      className={
        'fixed inset-0 h-screen w-screen bg-bgc-main flex items-center justify-center'
      }
    >
      <div className={'text-tc-primary text-h2 w-1/2'}>
        {error ? (
          error
        ) : (
          <>
            An error occurred accessing your account. Please contact us at{' '}
            <a href="mailto: support@coldclimate.com">
              support@coldclimate.com
            </a>
            .
          </>
        )}
      </div>
    </div>
  );
};
