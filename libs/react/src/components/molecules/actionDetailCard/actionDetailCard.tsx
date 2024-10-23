import { Action, ActionPayload, Assignee, Step } from '@coldpbc/interfaces';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BaseButton, Card, ColdIcon, ColdLogos, StepDetails } from '@coldpbc/components';
import { ActionDetailCardVariants, ButtonTypes, ColdLogoNames, IconNames, StepDetailsVariants } from '@coldpbc/enums';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@coldpbc/components';

export type ActionDetailCardProps = {
	actionPayload: ActionPayload;
	setActionPayLoad: (actionPayload: ActionPayload) => void;
	variant: ActionDetailCardVariants;
};
const _ActionDetailCard = ({ actionPayload, setActionPayLoad, variant }: ActionDetailCardProps) => {
	const { action } = actionPayload;

	const areSurveysComplete = () => {
		return action.dependent_surveys.every(survey => survey.submitted);
	};

	const navigate = useNavigate();

	const getProgress = () => {
		const totalSteps = action.steps.length;
		const completedSteps = action.steps.filter(step => step.complete).length;
		const progress = completedSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);
		const progressText = `${completedSteps}/${totalSteps} Completed`;
		return (
			<div className={'w-full flex space-x-[8px] h-[15px] text-label items-center'}>
				<div className={'shrink-0'}>{progressText}</div>
				<div className={'shrink w-full bg-bgc-accent h-[8px] rounded-full'}>
					<div
						className={'bg-primary rounded-full'}
						style={{
							width: `${progress}%`,
							height: '100%',
						}}></div>
				</div>
			</div>
		);
	};

	const handleStepsUpdate = (steps: Step[]) => {
		const updatedAction = {
			...action,
			steps: steps,
		};
		setActionPayLoad({
			...actionPayload,
			action: updatedAction,
		});
	};

	const getSurveyButtons = (action: Action) => {
		return (
			<>
				{action.dependent_surveys.map(survey => {
					return (
						<BaseButton
							onClick={() => {
								if (!survey.submitted) {
									navigate(`?surveyName=${survey.name}&actionId=${actionPayload.id}`);
								}
							}}
							disabled={survey.submitted}
							key={'button_action_detail_progress_' + survey.name}>
							<div className={'flex space-x-2'}>
								{survey.submitted && <ColdIcon name={IconNames.ColdCheckIcon} width={24} height={24} />}
								<div className={'flex items-center'}>{survey.title}</div>
							</div>
						</BaseButton>
					);
				})}
			</>
		);
	};

	const getSurveysNeedCompletion = (action: Action) => {
		if (variant === ActionDetailCardVariants.ActionDetailProgress) {
			return (
				<Card glow className={'text-tc-primary p-0 gap-[8px] px-[16px]'} data-testid={'action-detail-progress-card'}>
					<div className={'flex justify-start space-y-[8px]'}>
						<div className={'w-[664px]'}>
							<div className={'text-h4'}>Get Started</div>
							<div className={'text-body'}>
								We need more data to start building out a customized action plan that’s specific to your company. Fill out the necessary surveys to begin.
							</div>
						</div>
					</div>
					<div className={'flex justify-start py-[24px] space-x-[16px]'}>{getSurveyButtons(action)}</div>
				</Card>
			);
		} else {
			return (
				<Disclosure
					as="div"
					className={'w-full p-[16px] space-y-[16px] border-[1px] border-bgc-accent rounded-lg bg-bgc-elevated text-tc-primary'}
					data-testid={'action-detail-progress-card'}>
					{({ open }) => (
						<>
							<Disclosure.Button className={'flex w-full space-x-[16px] justify-between items-center'}>
								<div className={'text-body font-bold'}>Get Started with this action</div>
								<div className={'flex items-center justify-center h-6 w-6'}>
									{open ? <ColdIcon name={IconNames.ColdChevronUpIcon} className={'h-[8px]'} /> : <ColdIcon name={IconNames.ColdChevronDownIcon} className={'h-[8px]'} />}
								</div>
							</Disclosure.Button>
							<Disclosure.Panel as="dd" className="space-y-[16px]">
								<div className={'text-caption'} data-testid="">
									Take a few moments to provide the data necessary for this action. After the surveys are complete, CØLD will step away to evaluate your data and build the optimal
									solution for your company.
								</div>
								<div className={'flex justify-start space-x-[16px]'}>
									{action.dependent_surveys.map(survey => {
										return (
											<BaseButton
												onClick={() => {
													if (!survey.submitted) {
														navigate(`?surveyName=${survey.name}`);
													}
												}}
												disabled={survey.submitted}
												key={'button_action_detail_progress_' + survey.name}>
												<div className={'flex space-x-2'}>
													{survey.submitted && <ColdIcon name={IconNames.ColdCheckIcon} width={24} height={24} />}
													<div>{survey.title}</div>
												</div>
											</BaseButton>
										);
									})}
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			);
		}
	};

	const getActionIsNotReadyToExecute = (action: Action) => {
		if (variant === ActionDetailCardVariants.ActionDetailProgress) {
			return (
				<Card glow={false} className={'h-[120px] p-0 px-[16px] text-tc-primary rounded-2xl border-[2px] border-bgc-accent bg-gray-10'} data-testid={'action-detail-progress-card'}>
					<div className={'absolute right-[0px] top-[-39px] w-[198px] h-[198px]'}>
						<ColdLogos name={ColdLogoNames.ColdSymbol} color={HexColors.primary.DEFAULT} className={'w-[198px] h-[198px]'} />
					</div>
					<div className={'w-[827px] h-[815px] absolute top-[-363.5px] left-[-82.5px] bg-gray-10 blur-[150px] rounded-[827px]'}></div>
					<div className={'flex items-center py-[16px] justify-start w-[664px] h-full relative'}>
						<div className={'space-y-[8px]'}>
							<div className={'text-h4'}>Hold tight while we build out your plan</div>
							<div className={'text-body'}>We’re working on building the optimal solution for your company</div>
						</div>
					</div>
				</Card>
			);
		} else {
			return (
				<Card glow={false} className={'p-[16px] text-tc-primary rounded-lg border-[1px] border-bgc-accent bg-bgc-elevated'} data-testid={'action-detail-progress-card'}>
					<div className={'absolute top-[-39px] right-[-45px] w-[198px] h-[198px]'}>
						<ColdLogos name={ColdLogoNames.ColdSymbol} color={HexColors.primary.DEFAULT} className={'w-[198px] h-[198px]'} />
					</div>
					<div className={'py-[16px] space-y-[8px] justify-start w-[451px]'}>
						<div className={'text-h4'}>Hold tight while we build out your plan</div>
						<div className={'text-body'}>We’re working on building the optimal solution for your company</div>
					</div>
				</Card>
			);
		}
	};

	const getActionIsReadyToExecute = (action: Action) => {
		if (variant === ActionDetailCardVariants.ActionDetailProgress) {
			return (
				<Card glow className={'text-tc-primary'} data-testid={'action-detail-progress-card'}>
					<div className={'text-h4 text-left w-full'}>Steps</div>
					<div className={'w-full'} data-testid={'action-detail-progress-progress-bar'}>
						{getProgress()}
					</div>
					<div>
						<StepDetails steps={action.steps} handleStepsUpdate={handleStepsUpdate} />
					</div>
				</Card>
			);
		} else {
			return (
				<div className={'space-y-[16px] w-full'} data-testid={'action-detail-progress-card'}>
					<StepDetails steps={action.steps} handleStepsUpdate={handleStepsUpdate} variant={StepDetailsVariants.SubcategoryActionDetailsCard} />
					<div className={'flex justify-center items-center w-full'}>
						<BaseButton
							onClick={() => {
								navigate(`?actionId=${actionPayload.id}`);
							}}
							label={`View all (${action.steps.length}) Steps`}
							variant={ButtonTypes.secondary}
						/>
					</div>
				</div>
			);
		}
	};

	if (!areSurveysComplete()) {
		return <>{getSurveysNeedCompletion(action)}</>;
	} else {
		if (!action.ready_to_execute) {
			return <>{getActionIsNotReadyToExecute(action)}</>;
		} else {
			return <>{getActionIsReadyToExecute(action)}</>;
		}
	}
};

export const ActionDetailCard = withErrorBoundary(_ActionDetailCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ActionDetailCard: ', error);
	},
});
