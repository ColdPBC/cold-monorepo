import React from 'react';
import { IButtonProps } from '@coldpbc/interfaces';
import { BaseButton, DocumentUploadButton, Markdown, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';

export interface ComplianceWizardLairBaseProps {
  title: string;
  markdown: string;
  ctas?: Array<
    IButtonProps & {
      isDocumentUpload?: boolean;
    }
  >;
  ['data-testid']?: string;
  isLoading?: boolean;
}

export const ComplianceWizardLairBase = (props: ComplianceWizardLairBaseProps) => {
  const { title, markdown, ctas, isLoading } = props;
  return (
    <div className={'min-h-[797px] w-full flex justify-center items-center text-tc-primary'} data-testid={props['data-testid']}>
      <div className={'w-[847px] h-[624px] flex justify-center items-start'}>
        {isLoading ? (
          <Spinner size={GlobalSizes.xLarge} />
        ) : (
          <div className={'w-full h-full space-y-[24px]'}>
            <div className={'text-h1 text-left'}>{title}</div>
            <Markdown markdown={markdown} />
            <div className={'w-full flex flex-row space-x-4'}>
              {ctas?.map((cta, index) => {
                if (cta.isDocumentUpload) {
                  return <DocumentUploadButton key={`cta_${index}`} buttonProps={{ ...cta }} />;
                } else {
                  return <BaseButton key={`cta_${index}`} {...cta} />;
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
