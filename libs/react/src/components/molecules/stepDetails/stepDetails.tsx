import { Step } from '@coldpbc/interfaces';
import { StepDetailsVariants } from '@coldpbc/enums';
import { snakeCase } from 'lodash';
import { StepDetail } from '../stepDetail/stepDetail';

export interface StepDetailsProps {
	steps: Step[];
	handleStepsUpdate: (steps: Step[]) => void;
	variant?: StepDetailsVariants;
}

export const StepDetails = ({ steps, handleStepsUpdate, variant }: StepDetailsProps) => {
	if (variant === StepDetailsVariants.SubcategoryActionDetailsCard) {
		steps = steps.slice(0, 2);
	}
	const handleStepUpdate = (newStep: Step) => {
		const index = steps.findIndex(s => s.description === newStep.description);
		const updatedSteps = [...steps];
		updatedSteps[index] = newStep;

		handleStepsUpdate(updatedSteps);
	};

	const getClassName = () => {
		switch (variant) {
			case StepDetailsVariants.SubcategoryActionDetailsCard:
				return 'w-[636px] space-y-[16px] bg-bgc-elevated text-tc-primary';
			default:
				return 'w-[869px] space-y-[16px] bg-bgc-elevated p-[16px] text-tc-primary';
		}
	};

	return (
		<div className={getClassName()} data-testid={`step_details`}>
			{steps.map((step, index) => {
				return <StepDetail step={step} handleStepUpdate={handleStepUpdate} key={`step_detail_${index}`} />;
			})}
		</div>
	);
};
