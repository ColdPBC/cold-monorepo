import { Outlet, useSearchParams } from 'react-router-dom';
import { ActionDetail, Survey } from '../../pages';

export const Interceptor = () => {
  const [params] = useSearchParams();
  const surveyName = params.get('surveyName');
  const actionId = params.get('actionId');

  return (
    <div>
      <Outlet />
      {actionId && <ActionDetail id={actionId} />}
      {surveyName && <Survey surveyName={surveyName} />}
    </div>
  );
};
