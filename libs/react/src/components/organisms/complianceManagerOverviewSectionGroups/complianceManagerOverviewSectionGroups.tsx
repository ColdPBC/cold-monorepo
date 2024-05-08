import { ComplianceManagerOverviewSectionGroup } from '../complianceManagerOverviewSectionGroup';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { map, orderBy } from 'lodash';

export const ComplianceManagerOverviewSectionGroups = () => {
  const { data } = useContext(ColdComplianceManagerContext);

  const { mqttComplianceSet } = data;

  const sectionGroups = mqttComplianceSet?.compliance_section_groups;

  return (
    <div className={'w-full flex flex-col gap-[36px]'}>
      {map(orderBy(sectionGroups, ['order'], ['asc']), (sectionGroup, index) => {
        return <ComplianceManagerOverviewSectionGroup key={index} sectionGroup={sectionGroup} />;
      })}
    </div>
  );
};
