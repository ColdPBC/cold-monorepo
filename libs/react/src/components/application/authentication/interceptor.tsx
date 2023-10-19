import { Outlet, useSearchParams } from 'react-router-dom';
import { Survey } from '../../pages';
import { ActionDetail } from '../../pages/actionDetail/actionDetail';

export const Interceptor = () => {
  const [params] = useSearchParams();
  const surveyName = params.get('surveyName');
  const actionId = params.get('actionId');

  return (
    <div>
      {surveyName && <Survey surveyName={surveyName} />}
      {actionId && <ActionDetail id={actionId} />}
      <Outlet />
    </div>
  );
};
