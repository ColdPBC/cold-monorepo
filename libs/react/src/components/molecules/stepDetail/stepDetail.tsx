import React from 'react';
import { Assignee, Step } from '@coldpbc/interfaces';
import { Disclosure } from '@headlessui/react';
import { StepDetailAssigneeSelector, ColdIcon, StepDetailsCheckbox } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

export type StepDetailProps = {
	step: Step;
	handleStepUpdate: (step: Step) => void;
};

export const StepDetail = ({ step, handleStepUpdate }: StepDetailProps) => {
	const assigneeSelectorRef = React.useRef<HTMLDivElement>(null);
	const stepDetailsCheckboxRef = React.useRef<HTMLDivElement>(null);

	const handleAssigneeSelection = (step: Step, assignee: Assignee | null) => {
		const updatedStep = {
			...step,
			assignee: assignee,
		};
		handleStepUpdate(updatedStep);
	};

	const handleCheckBoxClick = (newStep: Step) => {
		handleStepUpdate(newStep);
	};

	return (
		<Disclosure as="div" data-testid={`step-detail`}>
			{({ open }) => (
				<div className={'border-[1px] border-bgc-accent rounded-lg bg-bgc-elevated text-tc-primary'}>
					<Disclosure.Button
						className={'z-0 flex w-full p-[16px] space-x-[16px] justify-between items-center'}
						onClick={event => {
							if (assigneeSelectorRef.current?.contains(event.target as Node) || stepDetailsCheckboxRef.current?.contains(event.target as Node)) {
								event.preventDefault();
							}
						}}>
						<div className={'flex space-x-[16px] items-center'}>
							<div className={'z-10'} ref={stepDetailsCheckboxRef}>
								<StepDetailsCheckbox
									complete={step.complete}
									setComplete={complete => {
										handleCheckBoxClick({
											...step,
											complete: complete,
										});
									}}
								/>
							</div>
							<div className={'text-body text-left font-bold'}>{step.description}</div>
						</div>
						<div className={'flex grow-0 shrink-0 space-x-[16px] items-center justify-center'}>
							<div ref={assigneeSelectorRef}>
								<StepDetailAssigneeSelector
									assignee={step.assignee}
									handleAssigneeSelection={assignee => {
										handleAssigneeSelection(step, assignee);
									}}
								/>
							</div>
							<div className={'flex items-center justify-center h-6 w-6'}>
								{open ? <ColdIcon name={IconNames.ColdChevronUpIcon} className={'h-[8px]'} /> : <ColdIcon name={IconNames.ColdChevronDownIcon} className={'h-[8px]'} />}
							</div>
						</div>
					</Disclosure.Button>
					<Disclosure.Panel as="dd" className="px-[16px] pb-[16px]">
						<p className="text-caption">{step.overview}</p>
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	);
};
