import React from 'react';
import { AllCompliance } from '@coldpbc/interfaces';
import { BaseButton, Card } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { snakeCase } from 'lodash';

export type NextStepCardProps = {
	nextStep: {
		compliance: AllCompliance;
		name: string;
		title: string;
		started: boolean;
		surveyProgress: number;
	};
	onNextStepClick: () => void;
};

export const NextStepCard = (props: NextStepCardProps) => {
	const { nextStep, onNextStepClick } = props;
	return (
		<div
			className={
				'w-full border-[1px] justify-start items-center space-y-[12px] border-bgc-accent rounded-2xl p-4 self-stretch bg-bgc-elevated text-tc-primary relative overflow-hidden'
			}
			data-testid={`next-step-card-${nextStep.title}`}>
			<div className="flex justify-end items-center gap-2 self-stretch h-[40px]">
				<div className="text-h5 flex-1">{nextStep.compliance.title}</div>
				<div className={'flex space-x-4'}>
					<BaseButton key={'button_' + snakeCase(nextStep.title)} label={nextStep.started ? 'Continue' : 'Start'} onClick={onNextStepClick} variant={ButtonTypes.primary} />
				</div>
			</div>
			{nextStep.started && (
				<Card className={'w-full border-[1px] border-bgc-accent'} glow={false} data-testid={`next-step-card-progress`}>
					<div className={'flex w-full justify-center items-center space-x-2'}>
						<div className={'h-2 flex-1 w-full rounded-2xl bg-bgc-accent'}>
							<div
								className={'h-full rounded-2xl bg-primary'}
								style={{
									width: `${nextStep.surveyProgress}%`,
								}}></div>
						</div>
						<div className={'flex text-body font-bold space-x-1'}>
							<div>{nextStep.surveyProgress.toFixed(0)}%</div>
							<div>Complete</div>
						</div>
					</div>
				</Card>
			)}
		</div>
	);
};
