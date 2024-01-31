import { SurveySectionFollowUpType } from '@coldpbc/interfaces';
import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const enterInputValue = async (
  followUp: SurveySectionFollowUpType,
  followUpName: string,
  surveyQuestionContainer: HTMLElement,
  value: string | string[] | boolean | number,
  isAdditional: boolean,
) => {
  // switch through all the component types and enter a value
  const id = `${followUpName}${isAdditional ? '-additional' : ''}`;
  switch (isAdditional ? followUp.additional_context?.component : followUp.component) {
    case 'text':
      const questionInput = await within(surveyQuestionContainer).findByRole('textbox', { name: id });
      fireEvent.input(questionInput, { target: { value: value } });
      break;
    case 'select':
      // choose the first option
      const selectValue = followUp.options.find(option => option === value) || followUp.options[0];
      const selectOptionElement = await within(surveyQuestionContainer).findByTestId(id);
      const firstOption = await within(selectOptionElement).findByText(selectValue);
      fireEvent.click(firstOption);
      break;
    case 'multi_select':
      const multiSelectOptionElement = await within(surveyQuestionContainer).findByTestId(id);
      if (Array.isArray(value)) {
        value.map(async valueItem => {
          const multiSelectValue = followUp.options.find(option => option === valueItem) || followUp.options[0];
          const firstMultiSelectOption = await within(multiSelectOptionElement).findByText(multiSelectValue);
          fireEvent.click(firstMultiSelectOption);
        });
      } else {
        const multiSelectValue = followUp.options.find(option => option === value) || followUp.options[0];
        const firstMultiSelectOption = await within(multiSelectOptionElement).findByText(multiSelectValue);
        fireEvent.click(firstMultiSelectOption);
      }
      break;
    case 'yes_no':
      const yesNoInput = await within(surveyQuestionContainer).findByTestId(id);
      const answer = await within(yesNoInput).findByText(value as string);
      fireEvent.click(answer);
      break;
    case 'currency':
      const currencyInput = await within(surveyQuestionContainer).findByRole('textbox', { name: id });
      fireEvent.input(currencyInput, { target: { value: value } });
      break;
    case 'number':
      const numberInput = await within(surveyQuestionContainer).findByRole('textbox', { name: id });
      fireEvent.input(numberInput, { target: { value: value } });
      break;
    case 'percent_slider':
      const percentSliderInput = await within(surveyQuestionContainer).findByTestId(id);
      fireEvent.input(percentSliderInput, { target: { value: '50' } });
      break;
    case 'textarea':
      const textAreaInput = await within(surveyQuestionContainer).findByRole('textbox', { name: id });
      fireEvent.input(textAreaInput, { target: { value: 'test' } });
      break;
  }
};

export const verifyAdditionalContext = async (followUp: SurveySectionFollowUpType, followUpName: string, surveyQuestionContainer: HTMLElement) => {
  if (followUp.additional_context) {
    const id = `${followUpName}-additional`;
    let questionInput = null;

    switch (followUp.additional_context.component) {
      case 'text':
        questionInput = await within(surveyQuestionContainer).queryByRole('textbox', { name: id });
        break;
      case 'select':
        questionInput = await within(surveyQuestionContainer).queryByTestId(id);
        break;
      case 'multi_select':
        questionInput = await within(surveyQuestionContainer).queryByTestId(id);
        break;
      case 'yes_no':
        questionInput = await within(surveyQuestionContainer).queryByTestId(id);
        break;
      case 'currency':
        questionInput = await within(surveyQuestionContainer).queryByRole('textbox', { name: id });
        break;
      case 'number':
        questionInput = await within(surveyQuestionContainer).queryByRole('textbox', { name: id });
        break;
      case 'percent_slider':
        questionInput = await within(surveyQuestionContainer).queryByTestId(id);
        break;
      case 'textarea':
        questionInput = await within(surveyQuestionContainer).queryByRole('textbox', { name: id });
        break;
    }
    console.log(questionInput);
    if (questionInput !== null) {
      // verify the button is disabled
      await expect(await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' })).toBeDisabled();
      // put in a value. use enterInputValue function
      switch (followUp.additional_context.component) {
        case 'text':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', true);
          break;
        case 'yes_no':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'Yes', true);
          break;
        case 'currency':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', true);
          break;
        case 'number':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', true);
          break;
        case 'percent_slider':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, '50', true);
          break;
        case 'textarea':
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', true);
          break;
      }
      await expect(await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' })).toBeEnabled();
    }
  }
};
