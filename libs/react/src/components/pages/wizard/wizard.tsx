import React, { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';

export interface WizardProps {
  baseURL: string;
  steps: {
    title: string;
    name: string;
    route: string;
  }[];
}

interface WizardContextProps {
  nextStep: () => void;
  prevStep: () => void;
  setCurrentStep: (currentStep: string) => void;
  currentStep: {
    title: string;
    name: string;
    route: string;
  };
}

export const WizardContext = React.createContext<WizardContextProps>({
  nextStep: () => {},
  prevStep: () => {},
  setCurrentStep: () => {},
  currentStep: {
    title: '',
    name: '',
    route: '',
  },
});

export const Wizard = (props: PropsWithChildren<WizardProps>) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { steps, baseURL, children } = props;

  const [currentStep, setCurrentStep] = React.useState<{
    title: string;
    name: string;
    route: string;
  }>(steps[0]);

  const nextStep = () => {
    const currentIndex = steps.findIndex(step => isEqual(step, currentStep));
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      navigateToStep(steps[currentIndex + 1].name);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(step => isEqual(step, currentStep));
    if (currentIndex > 0) {
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
    const currentRoute = location.pathname.replace(baseURL, '');
    const foundStep = steps.find(step => step.route === currentRoute);
    // if the currentRoute is empty then we are at the base URL. go to the first step
    if (!currentRoute) {
      setCurrentStep(steps[0]);
      navigateToStep(steps[0].name);
    }
    if (foundStep && !isEqual(foundStep, currentStep)) {
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
      }}>
      {children}
    </WizardContext.Provider>
  );
};
