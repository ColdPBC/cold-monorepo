import React from 'react';
import { BaseButton, Card, Spinner } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { ProgressBar } from '../../atoms/progressBar/progressBar';
import { HexColors } from '@coldpbc/themes';
import { IButtonProps } from '@coldpbc/interfaces';

export type ComplianceOverviewCardProps = {
  title: string;
  complianceData: any | undefined;
  isOverview?: boolean;
  onOverviewPage?: boolean;
  ctas?: IButtonProps[];
};

export const ComplianceOverviewCard = (props: ComplianceOverviewCardProps) => {
  const { complianceData, isOverview, onOverviewPage, ctas, title } = props;

  const showProgressBar = () => {
    // do not show progress bar if there are no questions answered
    if (complianceData.answeredQuestions === 0 && complianceData.aiAnsweredQuestions === 0 && complianceData.aiAttemptedQuestions === 0) {
      return false;
    } else {
      return true;
    }
  };

  const getProgressBarShades = () => {
    const shades = [];
    shades.push({ color: HexColors.primary.DEFAULT, percentage: complianceData.percentageAnswered });
    shades.push({ color: HexColors.primary['100'], percentage: complianceData.percentageAIAnswered });
    return shades;
  };

  const getProgressBar = () => {
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
                  <ProgressBar shades={getProgressBarShades()} />
                </div>
                <div className={'w-full gap-[8px]'}>
                  <div className={'flex w-full justify-between'}>
                    <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAnswered}% Complete</div>
                    <div className={'text-body font-bold text-bgc-primary'}>
                      {complianceData.answeredQuestions} / {complianceData.totalQuestions} Requirements
                    </div>
                  </div>
                  <div className={'flex w-full justify-between'}>
                    <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAIAnswered}% Needing review</div>
                    <div className={'text-body font-bold text-bgc-primary'}>
                      {complianceData.aiAnsweredQuestions} / {complianceData.totalQuestions} Requirements
                    </div>
                  </div>
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
                <div className={'flex w-full justify-between'}>
                  <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAnswered}% Complete</div>
                  <div className={'text-body font-bold text-bgc-primary'}>
                    {complianceData.answeredQuestions}/{complianceData.totalQuestions} Requirements
                  </div>
                </div>
                <div className={'flex w-full justify-between'}>
                  <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAIAnswered}% Needing review</div>
                  <div className={'text-body font-bold text-bgc-primary'}>
                    {complianceData.aiAnsweredQuestions}/{complianceData.totalQuestions} Requirements
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      }
    }
  };

  return (
    <Card className={'w-full gap-y-6'} data-testid={'compliance-overview-card'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex gap-x-4 items-center justify-center'}>
          {isOverview && (
            <div className={'w-[60px] h-[60px] flex justify-center items-center bg-white rounded-2xl'}>
              <img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/ReiLogo.png" alt="compliance" />
            </div>
          )}
          <div className="text-h4 flex-1" data-testid={'compliance-overview-card-title'}>
            {title}
          </div>
        </div>
        {ctas?.map(cta => {
          return (
            <div className={'flex items-center'}>
              <BaseButton {...cta} />
            </div>
          );
        })}
      </div>
      {getProgressBar()}
    </Card>
  );
};
