import React from 'react';
import {
  ErrorFallback,
  ErrorPage,
  MainContent,
  Spinner,
} from '@coldpbc/components';
import { EntityLevel } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { processSustainabilityAttributeDataFromGraphQL, toSentenceCase } from '@coldpbc/lib';

export const _SustainabilityAttributeDetail = () => {
  const { id: sustainabilityAttributeId } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const sustainabilityAttributeQuery = useGraphQLSWR<{
    sustainabilityAttribute: SustainabilityAttributeGraphQL | null;
  }>('GET_SUSTAINABILITY_ATTRIBUTE', {
    id: sustainabilityAttributeId,
    organizationId: orgId,
  });

  if (sustainabilityAttributeQuery.isLoading) {
    return <Spinner />;
  }

  if (isError(sustainabilityAttributeQuery.data)) {
    const error = get(sustainabilityAttributeQuery.data, 'error', null);
    if (error) {
      logBrowser('Error fetching sustainability attribute', 'error', { error }, error);
    }

    return <ErrorPage error={'An error occurred'} showLogout={false} />;
  }

  const sustainabilityAttributeGraphQL = get(sustainabilityAttributeQuery.data, 'data.sustainabilityAttribute');

  const sustainabilityAttribute = sustainabilityAttributeGraphQL ? processSustainabilityAttributeDataFromGraphQL([sustainabilityAttributeGraphQL])[0] : null;

  if (!sustainabilityAttribute) {
    return null;
  }

  const levelLabel = `${toSentenceCase(EntityLevel[sustainabilityAttribute.level])}-Level`;
  // TODO: Add type, e.g. "Certification" when available from backend
  const subtitle = [levelLabel].filter(val => !!val).join(' | ');

  return (
    <MainContent title={sustainabilityAttribute.name} subTitle={subtitle} breadcrumbs={[{ label: 'Sustainability', href: '/sustainability' }, { label: sustainabilityAttribute.name }]} className={'w-[calc(100%)]'}>
    </MainContent>
  );
};

export const SustainabilityAttributeDetail = withErrorBoundary(_SustainabilityAttributeDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SustainabilityAttributeDetail: ', error);
  },
});
