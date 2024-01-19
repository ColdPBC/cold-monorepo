import React from 'react';
import { BaseButton, Card, Spinner } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { ProgressBar } from '../../atoms/progressBar/progressBar';
import { HexColors } from '@coldpbc/themes';

export type ComplianceOverviewCardProps = {
  complianceData: any;
  isOverview?: boolean;
  onOverviewPage?: boolean;
  ctaOnClick?: () => void;
};

export const ComplianceOverviewCard = (props: ComplianceOverviewCardProps) => {
  const { complianceData, isOverview, onOverviewPage, ctaOnClick } = props;

  const getCtaButton = () => {
    if (onOverviewPage) {
      if (complianceData.aiAttemptedQuestions !== complianceData.totalQuestions) {
        return null;
      }
      if (complianceData.answeredQuestions === 0 && complianceData.aiAnsweredQuestions === 0) {
        return <BaseButton label={'Activate'} variant={ButtonTypes.primary} size={GlobalSizes.small} onClick={ctaOnClick} />;
      } else {
        return <BaseButton label={'See Details'} variant={ButtonTypes.secondary} size={GlobalSizes.small} onClick={ctaOnClick} />;
      }
    } else {
      if (isOverview) {
        return null;
      } else {
        if (complianceData.answeredQuestions === complianceData.totalQuestions) {
          return <BaseButton label={'Edit Answers'} variant={ButtonTypes.secondary} size={GlobalSizes.small} onClick={ctaOnClick} />;
        } else {
          return <BaseButton label={'Review and Answer'} variant={ButtonTypes.secondary} size={GlobalSizes.small} onClick={ctaOnClick} />;
        }
      }
    }
  };

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
    if (complianceData.answeredQuestions > 0) {
      shades.push({ color: HexColors.primary.DEFAULT, percentage: complianceData.percentageAnswered });
    }
    if (complianceData.aiAnsweredQuestions > 0) {
      shades.push({ color: HexColors.primary['100'], percentage: complianceData.percentageAIAnswered });
    }
    return shades;
  };

  const getProgressBar = () => {
    // show progress bar if the questions are being analyzed or if there are questions answered/ai answered
    if (onOverviewPage) {
      if (complianceData.aiAttemptedQuestions === 0) {
        return null;
      } else {
        if (complianceData.aiAttemptedQuestions !== complianceData.totalQuestions) {
          return (
            <Card glow={false} className={'w-full border-1 border-bgc-accent'}>
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
            <Card glow={false} className={'w-full border-1 border-bgc-accent'}>
              <div className={'w-full gap-y-[10px]'}>
                <div className={'w-full'}>
                  <ProgressBar shades={getProgressBarShades()} />
                </div>
                <div className={'w-full gap-[8px]'}>
                  {complianceData.answeredQuestions > 0 && (
                    <div className={'flex w-full justify-between'}>
                      <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAnswered}% Complete</div>
                      <div className={'text-body font-bold text-bgc-primary'}>
                        {complianceData.answeredQuestions} / {complianceData.totalQuestions} Requirements
                      </div>
                    </div>
                  )}
                  {complianceData.aiAnsweredQuestions > 0 && (
                    <div className={'flex w-full justify-between'}>
                      <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAIAnswered}% Needing review</div>
                      <div className={'text-body font-bold text-bgc-primary'}>
                        {complianceData.aiAnsweredQuestions} / {complianceData.totalQuestions} Requirements
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        }
      }
    } else {
      return (
        <Card glow={false} className={'w-full border-1 border-bgc-accent'}>
          <div className={'w-full gap-y-[10px]'}>
            {showProgressBar() && (
              <div className={'w-full'}>
                <ProgressBar shades={getProgressBarShades()} />
              </div>
            )}
            <div className={'w-full gap-[8px]'}>
              {complianceData.answeredQuestions > 0 && (
                <div className={'flex w-full justify-between'}>
                  <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAnswered}% Complete</div>
                  <div className={'text-body font-bold text-bgc-primary'}>
                    {complianceData.answeredQuestions}/{complianceData.totalQuestions} Requirements
                  </div>
                </div>
              )}
              {complianceData.aiAnsweredQuestions > 0 && (
                <div className={'flex w-full justify-between'}>
                  <div className={'text-body font-bold text-bgc-primary'}>{complianceData.percentageAIAnswered}% Needing review</div>
                  <div className={'text-body font-bold text-bgc-primary'}>
                    {complianceData.aiAnsweredQuestions}/{complianceData.totalQuestions} Requirements
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    }
  };

  return (
    <Card className={'w-full gap-y-6'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex gap-x-4 items-center justify-center'}>
          {isOverview && (
            <div className={'w-[60px] h-[60px] flex justify-center items-center bg-white rounded-2xl'}>
              <img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/ReiLogo.png" alt="compliance" />
            </div>
          )}
          <div className="text-h4 flex-1">{complianceData.title}</div>
        </div>
        {getCtaButton()}
      </div>
      {getProgressBar()}
    </Card>
  );
};
