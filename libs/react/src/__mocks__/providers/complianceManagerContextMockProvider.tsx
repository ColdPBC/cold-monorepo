import React, {PropsWithChildren} from "react";
import {ComplianceManagerStatus} from "@coldpbc/enums";
import {ColdComplianceManagerContext, ComplianceManagerContextType, ComplianceManagerData} from "@coldpbc/context";
import {
  getAllFilesMock,
  getComplianceCountsMock,
  getComplianceMock,
  getQuestionnaireSidebarComplianceMock, StoryMockProvider,
  StoryMockProviderProps
} from "@coldpbc/mocks";
import {SWRResponse} from "swr";
import {ComplianceManagerCountsPayload, ComplianceSidebarPayload} from "@coldpbc/interfaces";

export interface ComplianceManagerContextMockProviderProps extends StoryMockProviderProps {
  complianceManagerContext?: Partial<{
    data: Partial<ComplianceManagerData>;
    status: ComplianceManagerStatus;
    setStatus: (status: ComplianceManagerStatus) => void;
    showOverviewModal: boolean;
    setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
}

export const ComplianceManagerContextMockProvider = (props: PropsWithChildren<ComplianceManagerContextMockProviderProps>) => {
  const { complianceManagerContext, children, ...storyMockProviderProps } = props;
  const [status, setStatus] = React.useState<ComplianceManagerStatus>(complianceManagerContext?.status || ComplianceManagerStatus.notActivated);
  const [showOverviewModal, setShowOverviewModal] = React.useState<boolean>(complianceManagerContext?.showOverviewModal || false);

  const complianceManagerContextData: ComplianceManagerData = {
    name: 'rei_pia_2024',
    files: {
      data: getAllFilesMock(),
      error: undefined,
      revalidate: () => {},
      isValidating: false,
      isLoading: false,
      mutate: () => Promise.resolve(),
    } as SWRResponse<any[], any, any>,
    currentAIStatus: undefined,
    complianceCounts: {
      data: getComplianceCountsMock(),
      error: undefined,
      revalidate: () => {},
      isValidating: false,
      isLoading: false,
      mutate: () => Promise.resolve(),
    } as SWRResponse<ComplianceManagerCountsPayload, any, any>,
    sectionGroups: {
      data: getQuestionnaireSidebarComplianceMock(),
      error: undefined,
      revalidate: () => {},
      isValidating: false,
      isLoading: false,
      mutate: () => Promise.resolve(),
    } as SWRResponse<ComplianceSidebarPayload, any, any>,
    compliance: getComplianceMock().find(c => c.name === 'rei_pia_2024'),
    ...complianceManagerContext?.data,
  };

  const complianceManagerContextValue: ComplianceManagerContextType = {
    ...complianceManagerContext,
    data: complianceManagerContextData,
    status,
    setStatus: complianceManagerContext?.setStatus || setStatus,
    showOverviewModal,
    setShowOverviewModal: complianceManagerContext?.setShowOverviewModal || setShowOverviewModal,
  };

  return (
    <StoryMockProvider
      {...storyMockProviderProps}
    >
      <ColdComplianceManagerContext.Provider value={complianceManagerContextValue}>
        {children}
      </ColdComplianceManagerContext.Provider>
    </StoryMockProvider>
    )
}
