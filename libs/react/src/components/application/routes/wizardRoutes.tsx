import { Route } from 'react-router-dom';
import { ComplianceWizard, DocumentsUploadWizard, AutomateComplianceFlowStep } from '@coldpbc/components';

export const WizardRoutes = () => {
  return (
    <Route path={'/wizard'}>
      <Route path={'compliance/:name'} element={<ComplianceWizard />}>
        <Route path={'documents'} element={<DocumentsUploadWizard />} />
        <Route path={'automate'} element={<AutomateComplianceFlowStep />} />
        <Route path={'processing'} element={<div className={'text-tc-primary'}>Automation Processing Step</div>} />
        <Route path={'questionnaire'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
      </Route>
    </Route>
  );
};
