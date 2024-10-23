import { Compliance, ComplianceManagerCountsPayload, ComplianceSidebarPayload, CurrentAIStatusPayload } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import React, { createContext } from 'react';
import { SWRResponse } from 'swr';

export interface ComplianceManagerData {
	complianceCounts: SWRResponse<ComplianceManagerCountsPayload, any, any> | undefined;
	files: SWRResponse<any[], any, any> | undefined;
	currentAIStatus: CurrentAIStatusPayload | undefined;
	sectionGroups: SWRResponse<ComplianceSidebarPayload, any, any> | undefined;
	name: string;
	compliance: Compliance | undefined;
}

export interface ComplianceManagerContextType {
	data: ComplianceManagerData;
	status: ComplianceManagerStatus;
	setStatus: (status: ComplianceManagerStatus) => void;
	showOverviewModal: boolean;
	setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
	data: {
		complianceCounts: undefined,
		files: undefined,
		name: '',
		currentAIStatus: undefined,
		sectionGroups: undefined,
		compliance: undefined,
	},
	status: ComplianceManagerStatus.notActivated,
	setStatus: () => {},
	showOverviewModal: false,
	setShowOverviewModal: () => {},
});
