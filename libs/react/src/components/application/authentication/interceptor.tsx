import { Outlet, useSearchParams } from 'react-router-dom';
import { ActionDetail, Survey } from '../../pages';

export const Interceptor = () => {
  const [params] = useSearchParams();
  const surveyName = params.get('surveyName');
  const actionId = params.get('actionId');

  if (surveyName !== null) {
    return (
      <div>
        <Survey surveyName={surveyName} />
        <Outlet />
      </div>
    );
  } else if (actionId !== null) {
    return (
      <div>
        <ActionDetail id={actionId} />
        <Outlet />
      </div>
    );
  } else {
    return <Outlet />;
  }
};
