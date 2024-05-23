import { ComplianceManagerOverviewSectionGroup } from '../complianceManagerOverviewSectionGroup';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { map, orderBy } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

const _ComplianceManagerOverviewSectionGroups = () => {
  const { data } = useContext(ColdComplianceManagerContext);
  const { logBrowser } = useColdContext();

  const { mqttComplianceSet } = data;

  const sectionGroups = mqttComplianceSet?.compliance_definition.compliance_section_groups;

  const orderedSectionGroups = orderBy(sectionGroups, ['order', 'title'], ['asc', 'asc']);

  logBrowser('Compliance Manager Overview Section Groups', 'info', { orderedSectionGroups });

  return (
    <div className={'w-full flex flex-col gap-[36px]'}>
      {map(orderedSectionGroups, (sectionGroup, index) => {
        return <ComplianceManagerOverviewSectionGroup key={index} sectionGroup={sectionGroup} position={index} />;
      })}
    </div>
  );
};

export const ComplianceManagerOverviewSectionGroups = withErrorBoundary(_ComplianceManagerOverviewSectionGroups, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerOverviewSectionGroups: ', error);
  },
});
