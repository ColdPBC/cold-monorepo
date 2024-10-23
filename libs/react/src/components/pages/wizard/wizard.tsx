import React, { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';

export interface WizardProps {
	baseURL: string;
	steps: {
		title: string;
		name: string;
		route: string;
	}[];
	data: {
		[key: string]: any;
	};
}

export interface WizardContextType {
	nextStep: () => void;
	prevStep: () => void;
	setCurrentStep: (currentStep: string) => void;
	currentStep: {
		title: string;
		name: string;
		route: string;
	};
	data: {
		[key: string]: any;
	};
	navigateToStep: (stepName: string) => void;
}

export const WizardContext = React.createContext<WizardContextType>({
	nextStep: () => {},
	prevStep: () => {},
	setCurrentStep: () => {},
	currentStep: {
		title: '',
		name: '',
		route: '',
	},
	data: {},
	navigateToStep: () => {},
});

export const Wizard = (props: PropsWithChildren<WizardProps>) => {
	const navigate = useNavigate();
	const { logBrowser } = useColdContext();
	const location = useLocation();

	const { steps, baseURL, children, data } = props;

	const [currentStep, setCurrentStep] = React.useState<{
		title: string;
		name: string;
		route: string;
	}>(steps[0]);

	const nextStep = () => {
		const currentIndex = steps.findIndex(step => isEqual(step, currentStep));
		if (currentIndex < steps.length - 1) {
			logBrowser('Navigating to next step', 'info', {
				currentStep,
				nextStep: steps[currentIndex + 1],
				steps,
				location,
			});
			setCurrentStep(steps[currentIndex + 1]);
			navigateToStep(steps[currentIndex + 1].name);
		}
	};

	const prevStep = () => {
		const currentIndex = steps.findIndex(step => isEqual(step, currentStep));
		if (currentIndex > 0) {
			logBrowser('Navigating to previous step', 'info', {
				currentStep,
				prevStep: steps[currentIndex + 1],
				steps,
				location,
			});
			setCurrentStep(steps[currentIndex - 1]);
			navigateToStep(steps[currentIndex - 1].name);
		}
	};

	const navigateToStep = (stepName: string) => {
		const step = steps.find(step => isEqual(step.name, stepName));
		if (!step) return;
		navigate(baseURL + step.route);
	};

	useEffect(() => {
		// handle the case where the user navigates to a step directly and not through the wizard
		const currentRoute = location.pathname.replace(baseURL, '');
		const foundStep = steps.find(step => step.route === currentRoute);
		if (foundStep && !isEqual(foundStep, currentStep)) {
			logBrowser(`Navigating to ${foundStep.name} step`, 'info', {
				currentRoute,
				currentStep,
				foundStep,
				steps,
				location,
			});
			setCurrentStep(foundStep);
		}
	}, [location.pathname]);

	return (
		<WizardContext.Provider
			value={{
				nextStep,
				prevStep,
				currentStep,
				setCurrentStep: (currentStep: string) => {
					const step = steps.find(step => step.name === currentStep);
					if (step) {
						setCurrentStep(step);
						navigateToStep(step.name);
					}
				},
				data,
				navigateToStep,
			}}>
			{children}
		</WizardContext.Provider>
	);
};
