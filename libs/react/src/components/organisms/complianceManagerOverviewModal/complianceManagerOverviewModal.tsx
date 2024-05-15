import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Modal as FBModal } from 'flowbite-react';
import { BaseButton, Card, ColdSparkleIcon } from '@coldpbc/components';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { ActivationCompleteModalBody } from './activationCompleteModalBody';

export interface ComplianceManagerOverviewModalProps {
  show: boolean;
  setShowModal: (show: boolean) => void;
}

export const ComplianceManagerOverviewModal = (props: ComplianceManagerOverviewModalProps) => {
  const { show, setShowModal } = props;
  const { status, data } = useContext(ColdComplianceManagerContext);

  const { mqttComplianceSet } = data;

  const complianceDefinition = mqttComplianceSet?.compliance_definition;

  const getModalHeaderIcon = () => {
    if (status === ComplianceManagerStatus.notActivated) {
      return null;
    }

    switch (status) {
      case ComplianceManagerStatus.activated:
        return <ArrowUpIcon className={'w-[40px] h-[40px]'} />;
      case ComplianceManagerStatus.uploadedDocuments:
        return <ColdSparkleIcon />;
    }
  };

  const getModalHeader = () => {
    let titleText = '';
    switch (status) {
      case ComplianceManagerStatus.notActivated:
        titleText = 'Activation Complete';
        break;
      case ComplianceManagerStatus.activated:
        titleText = 'Upload Documents';
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        titleText = 'Start ✨Cold AI';
        break;
    }
    return (
      <div className={'absolute top-0 left-0 bg-gray-30 px-[24px] w-full flex flex-row justify-start items-center gap-[16px] min-h-[104px]'}>
        <div className={'flex flex-row gap-[16px] justify-start items-center'}>
          <div className={'w-[80px] h-[80px] flex items-center justify-center rounded-full bg-gray-50'}>
            <img src={complianceDefinition?.logo_url} className={'w-[60px] h-[60px] invert'} alt={'Compliance Logo'} />
          </div>
          <div className={'text-h3'}>{titleText}</div>
        </div>
        {getModalHeaderIcon()}
      </div>
    );
  };

  const getModalBody = () => {
    let component = null;
    switch (status) {
      case ComplianceManagerStatus.notActivated:
        component = <ActivationCompleteModalBody />;
      case ComplianceManagerStatus.activated:
    }
    return <div className={'w-full h-auto flex justify-center items-center'}>{component}</div>;
  };

  const getUpNextText = () => {
    let text = '';
    switch (status) {
      case ComplianceManagerStatus.notActivated:
        text = 'Up next: Upload Documents';
        break;
      case ComplianceManagerStatus.activated:
        text = 'Up next: Start ✨Cold AI';
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        text = '';
        break;
    }
    return text;
  };

  const getFooterButton = () => {
    let label = '';
    const onClick = () => {};
    const iconRight = false;

    switch (status) {
      case ComplianceManagerStatus.notActivated:
      case ComplianceManagerStatus.activated:
        label = 'Continue';
      case ComplianceManagerStatus.uploadedDocuments:
        label = 'Start Automation';
    }

    return <BaseButton onClick={onClick} label={label} iconRight={iconRight ? IconNames.ColdRightArrowIcon : undefined} />;
  };

  const getModalFooter = () => {
    return (
      <div className={'absolute bottom-0 left-0 w-full min-h-[98px] p-[24px] flex flex-row justify-between items-center'}>
        <div
          className={'cursor-pointer text-button'}
          onClick={() => {
            setShowModal(false);
          }}>
          Come Back Later
        </div>
        <div className={'flex flex-row gap-[16px] items-center text-body'}>
          {getUpNextText()}
          {getFooterButton()}
        </div>
      </div>
    );
  };

  return (
    <FBModal
      dismissible
      show={show}
      onClose={() => props.setShowModal(false)}
      theme={flowbiteThemeOverride.modal}
      style={{
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
      }}
      size={'4xl'}>
      <Card className="p-0 h-full w-full flex flex-col relative pt-[104px] pb-[98px]" glow={false}>
        <img src={complianceDefinition?.image_url} className={'absolute top-0 left-0 object-contain'} alt={'Compliance Background'} />
        {getModalHeader()}
        {getModalBody()}
        {getModalFooter()}
      </Card>
    </FBModal>
  );
};
