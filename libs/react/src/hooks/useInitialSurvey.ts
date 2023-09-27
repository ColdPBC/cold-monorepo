import useSWR from 'swr';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import {
  SurveyFormDataPayloadType,
  SurveyFormDefinitionPayloadType,
  SurveyPayloadType,
} from '@coldpbc/interfaces';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const useInitialSurveyCheck = () => {
  const [needInitialSurvey, setNeedInitialSurvey] = useState(false);

  const [cookies] = useCookies(['coldpbc']);

  const { coldpbc } = cookies;

  const initialSurveySWR = useSWR<SurveyPayloadType, any, any>(
    coldpbc ? [`/surveys/journey_overview`, 'GET'] : null,
    axiosFetcher,
  );

  if (initialSurveySWR.data) {
    if (initialSurveySWR.data.definition.submitted) {
      setNeedInitialSurvey(false);
    } else {
      setNeedInitialSurvey(true);
    }
  }

  return { needInitialSurvey };
};
