import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Survey } from '../pages';

export const Interceptor = () => {
  const [params, setSearchParams] = useSearchParams();
  const surveyName = params.get('surveyName');

  if (surveyName !== null) {
    return (
      <div>
        <Survey surveyName={surveyName} />;
        <Outlet />
      </div>
    );
  } else {
    return <Outlet />;
  }
};
