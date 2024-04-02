import React, { useContext } from 'react';
import { ComplianceWizardLairBase, ErrorFallback, WizardContext } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useFlags } from 'launchdarkly-react-client-sdk';

const _DocumentsUploadComplianceFlowStep = () => {
  const { nextStep } = useContext(WizardContext);
  const { complianceSetFlowMarkdown } = useFlags();
  return (
    <ComplianceWizardLairBase
      markdown={complianceSetFlowMarkdown}
      ctas={[
        {
          label: 'Upload From My Device',
          onClick: () => nextStep(),
          className: 'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300',
          isDocumentUpload: true,
        },
        {
          label: 'Skip For Now',
          onClick: () => nextStep(),
          variant: ButtonTypes.secondary,
          className: 'h-[72px] w-full',
        },
      ]}
    />
  );
};

export const DocumentsUploadComplianceFlowStep = withErrorBoundary(_DocumentsUploadComplianceFlowStep, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DocumentsUploadComplianceFlowStep: ', error);
  },
});
