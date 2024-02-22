import React, { useContext } from 'react';
import { ComplianceWizardLairBase, WizardContext } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { Compliance } from '@coldpbc/interfaces';

export const DocumentsUploadComplianceFlowStep = () => {
  const { nextStep, data } = useContext(WizardContext);
  const complianceSet = data['compliances'].find((compliance: Compliance) => compliance.name === data['name']);
  const { title } = complianceSet;

  return (
    <ComplianceWizardLairBase
      title={`Automate your ${title} Form`}
      markdown={`Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information. \n\nYou'll always be able to review and edit yourself before submitting anything. \n\nYou can upload as many or as few documents as you want. We recommend uploading any of the following for ${title}. \n1. Your previous year REI PIA Compliance completed answers and impact assessment documents \n2. Other retailer sustainability compliance forms \n3. Supplier code of conduct \n4. Climate or environmental impact statements or documents \n4. Sustainability Certifications \n6. Diversity and Inclusion policies`}
      ctas={[
        { label: 'Upload From My Device', onClick: () => nextStep(), className: 'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300', isDocumentUpload: true },
        { label: 'Skip For Now', onClick: () => nextStep(), variant: ButtonTypes.secondary, className: 'h-[72px] w-full' },
      ]}
    />
  );
};
