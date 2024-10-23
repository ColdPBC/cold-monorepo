import { ActivationCompleteModalBody, BaseButton, Card, ColdSparkleIcon, StartAIComplianceModal, UploadComplianceDocumentsModal } from '@coldpbc/components';
import { MouseEvent, ReactNode, useContext, useRef, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerFlowGuideStatus, ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { startComplianceAI } from '@coldpbc/lib';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';

export interface ComplianceManagerOverviewModalProps {
	show: boolean;
	setShowModal: (show: boolean) => void;
	flowGuideStatus: ComplianceManagerFlowGuideStatus;
	setFlowGuideStatus: (status: ComplianceManagerFlowGuideStatus) => void;
}

export const ComplianceManagerOverviewModal = (props: ComplianceManagerOverviewModalProps) => {
	const { show, setShowModal, flowGuideStatus, setFlowGuideStatus } = props;
	const { orgId } = useAuth0Wrapper();
	const { data, setStatus } = useContext(ColdComplianceManagerContext);
	const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const { logBrowser } = useColdContext();

	const { compliance, files, name } = data;

	const complianceDefinition = compliance;

	const getModalHeaderIcon = () => {
		if (flowGuideStatus === ComplianceManagerFlowGuideStatus.activate) {
			return null;
		}

		switch (flowGuideStatus) {
			case ComplianceManagerFlowGuideStatus.upload:
				return <ArrowUpIcon className={'w-[40px] h-[40px]'} />;
			default:
			case ComplianceManagerFlowGuideStatus.startAI:
				return <ColdSparkleIcon />;
		}
	};

	const getModalHeader = () => {
		let titleText = '';
		switch (flowGuideStatus) {
			case ComplianceManagerFlowGuideStatus.activate:
				titleText = 'Activation Complete';
				break;
			case ComplianceManagerFlowGuideStatus.upload:
				titleText = 'Upload Documents';
				break;
			case ComplianceManagerFlowGuideStatus.startAI:
			case ComplianceManagerFlowGuideStatus.restartAI:
				titleText = 'Start ✨Cold AI';
				break;
		}
		return (
			<div className={'absolute z-20 top-0 left-0 bg-gray-30 px-[24px] w-full flex flex-row justify-between items-center gap-[16px] min-h-[104px]'}>
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
		let component: ReactNode;
		switch (flowGuideStatus) {
			case ComplianceManagerFlowGuideStatus.activate:
				component = <ActivationCompleteModalBody setButtonDisabled={setButtonDisabled} />;
				break;
			case ComplianceManagerFlowGuideStatus.upload:
				component = <UploadComplianceDocumentsModal setButtonDisabled={setButtonDisabled} />;
				break;
			case ComplianceManagerFlowGuideStatus.startAI:
			case ComplianceManagerFlowGuideStatus.restartAI:
				component = <StartAIComplianceModal />;
				break;
		}
		return <div className={'h-full w-full z-20'}>{component}</div>;
	};

	const getUpNextText = () => {
		let text = '';
		switch (flowGuideStatus) {
			case ComplianceManagerFlowGuideStatus.activate:
				text = 'Up next: Upload Documents';
				break;
			case ComplianceManagerFlowGuideStatus.upload:
				text = 'Up next: Start ✨Cold AI';
				break;
			case ComplianceManagerFlowGuideStatus.startAI:
			case ComplianceManagerFlowGuideStatus.restartAI:
				text = '';
				break;
		}
		return text;
	};

	const getFooterButton = () => {
		let label = '';
		let onClick = () => {};
		let iconRight = false;
		let loading = false;

		switch (flowGuideStatus) {
			case ComplianceManagerFlowGuideStatus.activate:
				label = 'Continue';
				iconRight = true;
				onClick = () => {
					logBrowser(`Compliance ${name} Manager Activation Complete. Moving to upload`, 'info', {
						orgId,
						name,
						flowGuideStatus,
					});
					setFlowGuideStatus(ComplianceManagerFlowGuideStatus.upload);
				};
				loading = buttonDisabled;
				break;
			case ComplianceManagerFlowGuideStatus.upload:
				label = 'Continue';
				iconRight = true;
				onClick = async () => {
					logBrowser(`Compliance ${name} Manager Documents Uploaded. Moving to start AI`, 'info', {
						orgId,
						name,
						flowGuideStatus,
					});
					setFlowGuideStatus(ComplianceManagerFlowGuideStatus.startAI);
					setStatus(ComplianceManagerStatus.uploadedDocuments);
					await files?.mutate();
				};
				break;
			case ComplianceManagerFlowGuideStatus.startAI:
			case ComplianceManagerFlowGuideStatus.restartAI:
				label = 'Start Automation';
				onClick = async () => {
					if (orgId) {
						setButtonDisabled(true);
						const response = await startComplianceAI(name, orgId);
						logBrowser(`Compliance Manager AI Started for ${name}`, 'info', { orgId, name, response });
						setFlowGuideStatus(ComplianceManagerFlowGuideStatus.startedAI);
						setButtonDisabled(false);
						setShowModal(false);
					}
				};
				loading = buttonDisabled;
				break;
		}

		return <BaseButton onClick={onClick} disabled={buttonDisabled} loading={loading} label={label} iconRight={iconRight ? IconNames.ColdRightArrowIcon : undefined} />;
	};

	const getModalFooter = () => {
		return (
			<div className={'absolute z-20 bottom-0 left-0 w-full min-h-[98px] p-[24px] flex flex-row justify-between items-center'}>
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

	const closeModal = (event: MouseEvent<HTMLDivElement>) => {
		// make sure the modal is not closed when the user clicks on the modal itself
		if (modalRef.current?.contains(event.target as Node)) {
			return;
		}
		setShowModal(false);
	};

	if (show) {
		return (
			<div className={'h-screen w-screen fixed p-[100px] top-0 left-0 z-50 flex bg-bgc-backdrop bg-opacity-90 overflow-auto'} onClick={event => closeModal(event)}>
				<Card className="relative p-0 h-full w-full min-w-[1100px] min-h-[750px] flex flex-col pb-[98px] pt-[104px]" glow={false} innerRef={modalRef}>
					<div
						className={'absolute top-0 left-0 w-full h-full'}
						style={{
							background: `url(${complianceDefinition?.image_url}) center / cover no-repeat`,
						}}></div>
					<div className={'absolute top-0 left-0 h-full w-full bg-opacity-50 bg-gradient-to-t from-gray-30 to-gray-5'}></div>
					{getModalHeader()}
					{getModalBody()}
					{getModalFooter()}
				</Card>
			</div>
		);
	} else {
		return null;
	}
};
