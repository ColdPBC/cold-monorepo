import { forOwn, get, map } from 'lodash';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ErrorFallback, StatusChecklist, StatusChecklistItem} from '@coldpbc/components';
import { isComplianceStatusReached } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';


const _ComplianceManagerOverviewStatusCard = () => {
  const { data, status: managerStatus } = useContext(ColdComplianceManagerContext);
  const { compliance, currentAIStatus, complianceCounts } = data;

  const showProgressBarGradient = (status: ComplianceManagerStatus) => {
    return status === managerStatus;
  };

  const getComplianceStatusProgress = (status: ComplianceManagerStatus, managerStatus: ComplianceManagerStatus): number | undefined => {
    if (
      (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions) ||
      (managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi)
    ) {
      let percentage = 0;
      if (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions) {
        let totalQuestions = 0;
        let answeredQuestions = 0;
        const counts = get(complianceCounts, 'data.counts', {
          org_answered: 0,
        });
        forOwn(counts, (value, key) => {
          totalQuestions += value;
        });
        answeredQuestions = counts.org_answered;
        percentage = (answeredQuestions / totalQuestions) * 100;
      } else if (managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi) {
        const sectionGroups = get(complianceCounts, 'data.compliance_section_groups', []);
        // go through each section group and get the sections that have been answered by AI
        let sectionKeys: string[] = [];
        sectionGroups.forEach(group => {
          const sections = get(group, 'compliance_sections', []);
          const keys = sections.map(s => s.key);
          sectionKeys = [...sectionKeys, ...keys];
        });

        const currentAiStatusSections = currentAIStatus?.filter(s => sectionKeys.includes(s.section));
        const currentAiStatusSectionKeys = currentAiStatusSections ? currentAiStatusSections.map(s => s.section) : [];
        // all the sections that have been answered by AI are not in the currentAIStatusSectionKeys. The ones in the currentAIStatusSectionKeys are the ones that have not been answered by AI yet
        const answeredSections = sectionKeys.filter(s => !currentAiStatusSectionKeys.includes(s));
        percentage = sectionKeys.length === 0 ? 0 : (answeredSections.length / sectionKeys.length) * 100;
      }

      return percentage;
    } else {
      return undefined;
    }
  }

  const getComplianceSetStatusListItem = (status: ComplianceManagerStatus): StatusChecklistItem | null => {
    if ([ComplianceManagerStatus.notActivated, ComplianceManagerStatus.startedAi, ComplianceManagerStatus.startedQuestions].includes(status)) {
      return null;
    }

    let text = '';

    switch (status) {
      case ComplianceManagerStatus.activated:
        text = `Activate ${compliance?.title}`;
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        text = 'Upload Documents';
        break;
      case ComplianceManagerStatus.completedAi:
        text = 'Start ✨Cold AI';
        break;
      case ComplianceManagerStatus.completedQuestions:
        text = 'Complete Questions';
        break;
      case ComplianceManagerStatus.submitted:
        text = 'Submit to Cold';
        break;
      default:
        text = '';
    }

    return {
      label: text,
      completed: isComplianceStatusReached(status, managerStatus),
      progress: getComplianceStatusProgress(status, managerStatus),
      showProgressBarGradient: showProgressBarGradient(status),
    }
  };

  const getComplianceStatusCheckList = (): StatusChecklistItem[] => {
    return map(ComplianceManagerStatus, (status) => {
      return getComplianceSetStatusListItem(status);
    }).filter((item) => item !== null) as StatusChecklistItem[];
  }

  return <StatusChecklist
    className={'w-[347px]'}
    checklist={getComplianceStatusCheckList()}
    data-testid={'compliance-overview-statuses'}
  />
};

export const ComplianceManagerOverviewStatusCard = withErrorBoundary(_ComplianceManagerOverviewStatusCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerOverviewStatusCard: ', error);
  },
});
