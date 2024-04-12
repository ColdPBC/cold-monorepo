import { useContext } from 'react';
import { AssessmentsContext } from '@coldpbc/context';
import { ProgressBar } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';

export const ComplianceTargetProgressBar = () => {
  const { currentAssessment, data } = useContext(AssessmentsContext);

  if (!(data[currentAssessment] && data[currentAssessment].compliance_type !== 'target-score' && data[currentAssessment].target_score !== undefined)) return null;

  const progressData = data[currentAssessment].progress_data;
  const totalScore = Math.round(progressData.total_score);
  const totalMaxScore = Math.round(progressData.total_max_score);
  const totalTargetScore = Math.round(data[currentAssessment].target_score || 0);
  const complianceTitle = data[currentAssessment].compliance?.compliance_definition.title;

  return (
    <div className={'w-full flex flex-col space-y-10 text-tc-primary'}>
      <div className={'w-full flex flex-col'}>
        <div className={'text-h4'}>Certification Progress</div>
        <div className={'text-eyebrow'}>
          Current points total based off your questionnaire answers. {`${complianceTitle} `} certification requires {`${totalTargetScore} `} total points.
        </div>
      </div>
      <div className={'w-full flex flex-col relative mb-10'}>
        <ProgressBar shades={[{ color: HexColors.primary['100'], percentage: (totalScore / totalMaxScore) * 100 }]} className={'w-full h-4'} />
        <div
          className={'text-tc-primary font-bold text-eyebrow'}
          style={{
            position: 'absolute',
            top: '-15px',
            left: `calc(${(totalScore / totalMaxScore) * 100}% - 8px)`,
          }}>
          {totalScore}
        </div>
        <div
          className={'text-tc-primary font-bold text-eyebrow'}
          style={{
            position: 'absolute',
            top: '-15px',
            right: `0%`,
          }}>
          {Math.round(totalMaxScore)}
        </div>
        <div
          className={'text-tc-primary flex flex-col text-eyebrow'}
          style={{
            position: 'absolute',
            top: '0',
            left: `calc(${(totalTargetScore / totalMaxScore) * 100}% - 8px)`,
          }}>
          <div className={'h-[18px] w-full justify-center flex mb-[6px]'}>
            <div className={'h-[18px] w-[3px] bg-cold-starkWhite'}></div>
          </div>
          <div className={'flex flex-col justify-center text-center'}>
            <div className={'font-bold'}>{Math.round(totalTargetScore)}</div>
            <div>(target)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
