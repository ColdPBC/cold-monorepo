import { BaseButton, Card, CompletedBanner, Spinner } from '@coldpbc/components';
import { useContext, useEffect } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerFlowGuideStatus, ComplianceManagerStatus, GlobalSizes, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

interface ComplianceManagerFlowGuideProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  flowGuideStatus: ComplianceManagerFlowGuideStatus;
  setFlowGuideStatus: (status: ComplianceManagerFlowGuideStatus) => void;
}

export const ComplianceManagerFlowGuide = ({ showModal, setShowModal, flowGuideStatus, setFlowGuideStatus }: ComplianceManagerFlowGuideProps) => {
  const { status: managerStatus } = useContext(ColdComplianceManagerContext);

  useEffect(() => {
    switch (managerStatus) {
      case ComplianceManagerStatus.activated:
      case ComplianceManagerStatus.uploadedDocuments:
        setFlowGuideStatus(ComplianceManagerFlowGuideStatus.upload);
        break;
      case ComplianceManagerStatus.startedAi:
        setFlowGuideStatus(ComplianceManagerFlowGuideStatus.startedAI);
        break;
      case ComplianceManagerStatus.completedAi:
      case ComplianceManagerStatus.startedQuestions:
      case ComplianceManagerStatus.completedQuestions:
        setFlowGuideStatus(ComplianceManagerFlowGuideStatus.restartAI);
        break;
      case ComplianceManagerStatus.submitted:
        setFlowGuideStatus(ComplianceManagerFlowGuideStatus.submitted);
        break;
      default:
      case ComplianceManagerStatus.notActivated:
        setFlowGuideStatus(ComplianceManagerFlowGuideStatus.activate);
    }
  }, []);

  const getHeaderText = () => {
    let text = '';
    switch (flowGuideStatus) {
      case ComplianceManagerFlowGuideStatus.upload:
        text = 'Start Uploading Documents';
        break;
      case ComplianceManagerFlowGuideStatus.startAI:
        text = 'Start ✨Cold AI';
        break;
      case ComplianceManagerFlowGuideStatus.startedAI:
        text = '✨Cold AI in progress';
        break;
      case ComplianceManagerFlowGuideStatus.restartAI:
        text = 'Re-run ✨Cold AI';
        break;
      case ComplianceManagerFlowGuideStatus.submitted:
        text = 'Congrats! We’ll submit this on your behalf.';
        break;
      default:
      case ComplianceManagerFlowGuideStatus.activate:
        text = 'Want to start this assessment?';
    }
    return <div className={'w-full text-h4'}>{text}</div>;
  };

  const getSubText = () => {
    let text = '';
    switch (flowGuideStatus) {
      case ComplianceManagerFlowGuideStatus.upload:
        text = 'You can fill in the questionnaire now if you like, but we recommend uploading documents and using ✨Cold AI to help get you started.';
        break;
      case ComplianceManagerFlowGuideStatus.startAI:
        text = 'Once you start the AI, Cold will start answering questions for your organization. Start reviewing these generated answers once a section is complete. ';
        break;
      case ComplianceManagerFlowGuideStatus.startedAI:
        text = 'Start reviewing these generated answers once a section is complete. Remember, you can always edit or remove an AI response.';
        break;
      case ComplianceManagerFlowGuideStatus.restartAI:
        text = 'Run the AI automation again to see your answers update.';
        break;
      case ComplianceManagerFlowGuideStatus.submitted:
        text = 'We have submitted this assessment on your behalf';
        break;
      default:
      case ComplianceManagerFlowGuideStatus.activate:
        text = 'You can browse the questions now if you like, but once you activate you can start answering use ✨Cold AI to help.';
    }
    return <div className={'w-full text-body'}>{text}</div>;
  };

  const getGuideAction = () => {
    const buttonClassName = 'text-nowrap';
    switch (flowGuideStatus) {
      case ComplianceManagerFlowGuideStatus.activate:
        return (
          <BaseButton
            onClick={() => {
              setFlowGuideStatus(ComplianceManagerFlowGuideStatus.activate);
              setShowModal(true);
            }}
            label={'Activate'}
            iconRight={IconNames.ColdRightArrowIcon}
            className={buttonClassName}
          />
        );
      case ComplianceManagerFlowGuideStatus.upload:
        return (
          <BaseButton
            onClick={() => {
              setFlowGuideStatus(ComplianceManagerFlowGuideStatus.upload);
              setShowModal(true);
            }}
            label={'Upload'}
            iconRight={IconNames.ColdRightArrowIcon}
            className={buttonClassName}
          />
        );
      case ComplianceManagerFlowGuideStatus.startAI:
        return (
          <BaseButton
            onClick={() => {
              setFlowGuideStatus(ComplianceManagerFlowGuideStatus.startAI);
              setShowModal(true);
            }}
            label={'Start ✨Cold AI'}
            iconRight={IconNames.ColdRightArrowIcon}
            className={buttonClassName}
          />
        );
      case ComplianceManagerFlowGuideStatus.startedAI:
        return <Spinner size={GlobalSizes.large} />;
      case ComplianceManagerFlowGuideStatus.restartAI:
        return (
          <BaseButton
            onClick={() => {
              setFlowGuideStatus(ComplianceManagerFlowGuideStatus.restartAI);
              setShowModal(true);
            }}
            label={'Re-Start ✨Cold AI'}
            iconRight={IconNames.ColdRightArrowIcon}
            className={buttonClassName}
          />
        );
      default:
        return null;
    }
  };

  if (flowGuideStatus === ComplianceManagerFlowGuideStatus.submitted) {
    return (
      <CompletedBanner className={'h-auto p-4'}>
        {getHeaderText()}
        {getSubText()}
      </CompletedBanner>
    );
  }

  const getGlowColor = () => {
    switch (flowGuideStatus) {
      case ComplianceManagerFlowGuideStatus.startAI:
      case ComplianceManagerFlowGuideStatus.startedAI:
      case ComplianceManagerFlowGuideStatus.restartAI:
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
