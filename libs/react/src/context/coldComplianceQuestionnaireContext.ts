import { createContext } from 'react';
import { AIDetails, Compliance, ComplianceSidebarPayload } from '@coldpbc/interfaces';
import { SWRResponse } from 'swr';

export interface ComplianceQuestionnaireContextType {
	name: string;
	complianceDefinition: Compliance | undefined;
	scrollToQuestion: string | null;
	setScrollToQuestion: (question: string | null) => void;
	focusQuestion: {
		key: string;
		aiDetails: AIDetails;
	} | null;
	setFocusQuestion: (
		question: {
			key: string;
			aiDetails: AIDetails;
		} | null,
	) => void;
	sectionGroups: SWRResponse<ComplianceSidebarPayload, any, any> | undefined;
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
	name: '',
	complianceDefinition: undefined,
	scrollToQuestion: null,
	setScrollToQuestion: () => {},
	focusQuestion: null,
	setFocusQuestion: () => {},
	sectionGroups: undefined,
});
