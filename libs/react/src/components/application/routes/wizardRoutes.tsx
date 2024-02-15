import { Route } from 'react-router-dom';
import { ComplianceWizard } from '@coldpbc/components';

export const WizardRoutes = () => {
  return (
    <Route path={'/wizard'}>
      <Route path={'compliance/:name'} element={<ComplianceWizard />}>
        <Route path={'documents'} element={<div className={'text-tc-primary'}>Documents Upload Step</div>} />
        <Route path={'automate'} element={<div className={'text-tc-primary'}>Automation Step</div>} />
        <Route path={'automation'} element={<div className={'text-tc-primary'}>Automation Processing Step</div>} />
        <Route path={'survey'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
      </Route>
    </Route>
  );
};
