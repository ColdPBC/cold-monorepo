import { Route } from 'react-router-dom';
import { AutomateComplianceFlowStep, ComplianceWizard, DocumentsUploadComplianceFlowStep, ProcessingComplianceFlowStep } from '@coldpbc/components';

export const WizardRoutes = () => {
  return (
    <Route path={'/wizard'}>
      <Route path={'compliance/:name'} element={<ComplianceWizard />}>
        <Route path={'documents'} element={<DocumentsUploadComplianceFlowStep />} />
        <Route path={'automate'} element={<AutomateComplianceFlowStep />} />
        <Route path={'processing'} element={<ProcessingComplianceFlowStep />} />
        <Route path={'questionnaire'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
      </Route>
    </Route>
  );
};
