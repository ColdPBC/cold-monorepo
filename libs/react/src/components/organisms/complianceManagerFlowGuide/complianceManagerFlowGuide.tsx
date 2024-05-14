import { BaseButton, Card, CompletedBanner, Spinner } from '@coldpbc/components';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus, GlobalSizes, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

export const ComplianceManagerFlowGuide = () => {
  const { status } = useContext(ColdComplianceManagerContext);

  const getHeaderText = () => {
    let text = '';
    switch (status) {
      case ComplianceManagerStatus.activated:
        text = 'Start Uploading Documents';
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        text = 'Start ✨Cold AI';
        break;
      case ComplianceManagerStatus.startedAi:
        text = '✨Cold AI in progress';
        break;
      case ComplianceManagerStatus.completedAi:
      case ComplianceManagerStatus.startedQuestions:
      case ComplianceManagerStatus.completedQuestions:
        text = 'Re-run ✨Cold AI';
        break;
      case ComplianceManagerStatus.submitted:
        text = 'Congrats! We’ll submit this on your behalf.';
        break;
      default:
      case ComplianceManagerStatus.notActivated:
        text = 'Want to start this assessment?';
    }
    return <div className={'w-full text-h4'}>{text}</div>;
  };

  const getSubText = () => {
    let text = '';
    switch (status) {
      case ComplianceManagerStatus.activated:
        text = 'You can fill in the questionnaire now if you like, but we recommend uploading documents and using ✨Cold AI to help get you started.';
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        text = 'Once you start the AI, Cold will start answering questions for your organization. Start reviewing these generated answers once a section is complete. ';
        break;
      case ComplianceManagerStatus.startedAi:
        text = 'Start reviewing these generated answers once a section is complete. Remember, you can always edit or remove an AI response.';
        break;
      case ComplianceManagerStatus.completedAi:
      case ComplianceManagerStatus.startedQuestions:
      case ComplianceManagerStatus.completedQuestions:
        text = 'Run the AI automation again to see your answers update.';
        break;
      case ComplianceManagerStatus.submitted:
        text = 'We have submitted this assessment on your behalf';
        break;
      default:
      case ComplianceManagerStatus.notActivated:
        text = 'You can browse the questions now if you like, but once you activate you can start answering use ✨Cold AI to help.';
    }
    return <div className={'w-full text-body'}>{text}</div>;
  };

  const getGuideAction = () => {
    // dont wrap the words in the button. use 1 line
    const buttonClassName = 'text-nowrap';
    switch (status) {
      case ComplianceManagerStatus.notActivated:
        return <BaseButton onClick={() => {}} label={'Activate'} iconRight={IconNames.ColdRightArrowIcon} className={buttonClassName} />;
      case ComplianceManagerStatus.activated:
        return <BaseButton onClick={() => {}} label={'Upload'} iconRight={IconNames.ColdRightArrowIcon} className={buttonClassName} />;
      case ComplianceManagerStatus.uploadedDocuments:
        return <BaseButton onClick={() => {}} label={'Start ✨Cold AI'} iconRight={IconNames.ColdRightArrowIcon} className={buttonClassName} />;
      case ComplianceManagerStatus.startedAi:
        return <Spinner size={GlobalSizes.large} />;
      case ComplianceManagerStatus.completedAi:
      case ComplianceManagerStatus.startedQuestions:
      case ComplianceManagerStatus.completedQuestions:
        return <BaseButton onClick={() => {}} label={'Re-Start ✨Cold AI'} iconRight={IconNames.ColdRightArrowIcon} className={buttonClassName} />;
      default:
        return null;
    }
  };

  if (status === ComplianceManagerStatus.submitted) {
    return (
      <CompletedBanner className={'h-auto p-4'}>
        {getHeaderText()}
        {getSubText()}
      </CompletedBanner>
    );
  }

  const getGlowColor = () => {
    // if the status is uploadedDocuments, startedAi, completedAi, startedQuestions, completedQuestions then return yellow
    // if not return undefined
    switch (status) {
      case ComplianceManagerStatus.uploadedDocuments:
      case ComplianceManagerStatus.startedAi:
      case ComplianceManagerStatus.completedAi:
      case ComplianceManagerStatus.startedQuestions:
      case ComplianceManagerStatus.completedQuestions:
        return HexColors.yellow.DEFAULT;
      default:
        return undefined;
    }
  };

  return (
    <Card className={'w-full flex flex-row justify-between gap-[24px] items-center text-tc-primary border-[2px] border-bgc-accent bg-gray-10'} glowColor={getGlowColor()}>
      <div className={'w-full flex flex-col justify-start'}>
        {getHeaderText()}
        {getSubText()}
      </div>
      <div className={'w-auto'}>{getGuideAction()}</div>
    </Card>
  );
};
