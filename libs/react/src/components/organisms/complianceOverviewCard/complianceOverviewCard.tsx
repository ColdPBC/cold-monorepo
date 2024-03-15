import React from 'react';
import { BaseButton, Card, ProgressBar, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { ComplianceProgress, IButtonProps } from '@coldpbc/interfaces';

export type ComplianceOverviewCardProps = {
  title: string;
  complianceData: ComplianceProgress | undefined;
  isOverview?: boolean;
  onOverviewPage?: boolean;
  ctas?: IButtonProps[];
  logo_url?: string;
  'data-testid'?: string;
};

export const ComplianceOverviewCard = (props: ComplianceOverviewCardProps) => {
  const { complianceData, isOverview, onOverviewPage, ctas, title, logo_url } = props;

  const showProgressBar = () => {
    // do not show progress bar if there are no questions answered
    if (!complianceData) return false;

    return !(complianceData.answeredQuestions === 0 && complianceData.aiAnsweredQuestions === 0 && complianceData.aiAttemptedQuestions === 0);
  };

  const getProgressBarShades = () => {
    const shades = [];
    if (!complianceData) return [];

    if (complianceData.answeredQuestions > 0) {
      shades.push({ color: HexColors.primary.DEFAULT, percentage: complianceData.percentageAnswered, type: 'answered' });
    }
    if (complianceData.aiAnsweredQuestions > 0) {
      shades.push({ color: HexColors.primary['100'], percentage: complianceData.percentageAIAnswered, type: 'aiAnswered' });
    }
    return shades;
  };

  const getProgressBar = () => {
    const shades = getProgressBarShades();
    if (!complianceData) return null;
    if (isOverview) {
      if (!onOverviewPage) {
        if (complianceData.aiAttemptedQuestions !== complianceData.totalQuestions) {
          return (
            <Card glow={false} className={'w-full border-1 border-bgc-accent'} data-testid={'compliance-overview-progress-bar-analyzing'}>
              <div className={'flex w-full justify-between font-body font-bold'}>
                <div className={'flex space-x-[8px]'}>
                  <Spinner size={GlobalSizes.medium} />
                  <span>Analyzing...</span>
                </div>
                <div>
                  {complianceData.aiAttemptedQuestions} / {complianceData.totalQuestions} Requirements Evaluated
                </div>
              </div>
            </Card>
          );
        } else {
          return (
            <Card glow={false} className={'w-full border-1 border-bgc-accent'} data-testid={'compliance-overview-progress-bar-ready'}>
              <div className={'w-full gap-y-[10px]'}>
                <div className={'w-full'}>
                  <ProgressBar shades={shades} />
                </div>
                <div className={'w-full gap-[8px]'}>
                  {shades.map((shade, index) => {
                    return (
                      <div className={'flex w-full justify-between'} key={index}>
                        <div className={'text-body font-bold text-bgc-primary'}>
                          {shade.percentage}% {shade.type === 'answered' ? 'Complete' : 'Needing Review'}
                        </div>
                        <div className={'text-body font-bold text-bgc-primary'}>
                          {shade.type === 'answered' ? complianceData.answeredQuestions : complianceData.aiAnsweredQuestions} / {complianceData.totalQuestions} Requirements
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        }
      } else {
        return null;
      }
    } else {
      if (complianceData.aiAttemptedQuestions !== complianceData.totalQuestions) {
        return (
          <Card glow={false} className={'w-full border-1 border-bgc-accent'} data-testid={'compliance-section-overview-progress-bar-analyzing'}>
            <div className={'flex w-full justify-between font-body font-bold'}>
              <div className={'flex space-x-[8px]'}>
                <Spinner size={GlobalSizes.medium} />
                <span>Analyzing...</span>
              </div>
              <div>
                {complianceData.aiAttemptedQuestions} / {complianceData.totalQuestions} Requirements Evaluated
              </div>
            </div>
          </Card>
        );
      } else {
        return (
          <Card glow={false} className={'w-full border-1 border-bgc-accent'} data-testid={'compliance-section-overview-progress-bar-ready'}>
            <div className={'w-full gap-y-[10px]'}>
              {showProgressBar() && (
                <div className={'w-full'}>
                  <ProgressBar shades={getProgressBarShades()} />
                </div>
              )}
              <div className={'w-full gap-[8px]'}>
                {shades.map((shade, index) => {
                  return (
                    <div className={'flex w-full justify-between'} key={index}>
                      <div className={'text-body font-bold text-bgc-primary'}>
                        {shade.percentage}% {shade.type === 'answered' ? 'Complete' : 'Needing Review'}
                      </div>
                      <div className={'text-body font-bold text-bgc-primary'}>
                        {shade.type === 'answered' ? complianceData.answeredQuestions : complianceData.aiAnsweredQuestions} / {complianceData.totalQuestions} Requirements
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      }
    }
  };

  return (
    <Card className={'w-full gap-y-6'} data-testid={props['data-testid'] || 'compliance-overview-card'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex gap-x-4 items-center justify-center'}>
          {logo_url && (
            <div className={'w-[60px] h-[60px] flex justify-center items-center bg-white rounded-2xl overflow-hidden'}>
              <img src={`${logo_url}`} className={'max-w-[55px] max-h-[55px]'} alt="compliance" />
            </div>
          )}
          <div className="text-h4 flex-1" data-testid={'compliance-overview-card-title'}>
            {title}
          </div>
        </div>
        {ctas?.map((cta, index) => {
          return (
            <div className={'flex items-center'} key={`compliance_button_${index}`}>
              <BaseButton {...cta} />
            </div>
          );
        })}
      </div>
      {getProgressBar()}
    </Card>
  );
};
