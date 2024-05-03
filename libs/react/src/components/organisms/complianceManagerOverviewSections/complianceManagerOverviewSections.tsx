import { ComplianceManagerOverviewSection } from '../complianceManagerOverviewSection';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { map } from 'lodash';

export const ComplianceManagerOverviewSections = () => {
  const { data } = useContext(ColdComplianceManagerContext);

  const { complianceSet, orgComplianceSet } = data;

  return (
    <div className={'w-full flex flex-col gap-[36px]'}>
      {map(complianceSet?.compliance_section_groups, (sectionGroup, index) => {
        return <ComplianceManagerOverviewSection sectionGroup={sectionGroup} />;
      })}
    </div>
  );
};
