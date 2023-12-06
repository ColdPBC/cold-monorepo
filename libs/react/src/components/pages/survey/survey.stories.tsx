import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getSurveyFormDataByName, StoryMockProvider } from '@coldpbc/mocks';
import { getSurveyHandler } from '@coldpbc/mocks';
import { Survey } from '@coldpbc/components';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { forEach, setWith, sortBy } from 'lodash';
import { SurveyPayloadType, SurveySectionType } from '@coldpbc/interfaces';

const meta: Meta<typeof Survey> = {
  title: 'Pages/Survey',
  component: Survey,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider handlers={getSurveyHandler.DEFAULT}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'qaalib_test',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    await step('Fill out survey', async () => {
      const surveyRightNav = await canvas.findByTestId('survey-right-nav-intro-outro');
      const welcomeText = await within(surveyRightNav).findByText('Welcome to Cold Climate!');
      await expect(welcomeText).toBeInTheDocument();
      await expect(await canvas.findByTestId('survey-intro')).toBeInTheDocument();

      const startButton = await within(surveyRightNav).findByRole('button', { name: 'Start' });
      await waitFor(async () => {
        fireEvent.click(startButton);
      });
      const surveyQuestionContainer = await canvas.findByTestId('survey-question-container');
      const surveySectionsProgress = await canvas.findByTestId('survey-sections-progress');
      const survey = getSurveyFormDataByName(args.surveyName);
      // sort sections object by order
      const copy = {
        ...survey,
        definition: {
          ...survey.definition,
          sections: {},
        },
      } as SurveyPayloadType;

      Object.keys(survey.definition.sections)
        .sort((a, b) => {
          return survey.definition.sections[a].category_idx - survey.definition.sections[b].category_idx;
        })
        .forEach(key => {
          copy.definition.sections[key] = {
            ...survey.definition.sections[key],
            follow_up: {},
          };
          // sort the followups and set the sorted followups in the copy
          Object.keys(survey.definition.sections[key].follow_up)
            .sort((a, b) => {
              return survey.definition.sections[key].follow_up[a].idx - survey.definition.sections[key].follow_up[b].idx;
            })
            .forEach(followupKey => {
              copy.definition.sections[key].follow_up[followupKey] = survey.definition.sections[key].follow_up[followupKey];
            });
        });

      const loopThroughSection = async (section: SurveySectionType) => {
        if (section.component) {
          // Yes answer
          await waitFor(async () => {
            const yesAnswer = await within(surveyQuestionContainer).findByText('Yes');
            fireEvent.click(yesAnswer);
            const continueButton = await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' });
            fireEvent.click(continueButton);
          });
        }

        forEach(section.follow_up, async (followUp, followUpName) => {
          await waitFor(async () => {
            const followUpPrompt = await within(surveyQuestionContainer).findByText(followUp.prompt);
            await expect(followUpPrompt).toBeInTheDocument();
            switch (followUp.component) {
              case 'text':
                // get the input with id of the follow up name
                // enter random text
                const questionInput = await within(surveyQuestionContainer).findByRole('textbox', { name: followUpName });
                fireEvent.input(questionInput, { target: { value: 'test' } });
                break;
              case 'select':
                // choose the first option
                const firstOption = await within(surveyQuestionContainer).findByText(followUp.options[0]);
                fireEvent.click(firstOption);
                break;
              case 'multi_select':
                // choose the first option
                const firstMultiSelectOption = await within(surveyQuestionContainer).findByText(followUp.options[0]);
                fireEvent.click(firstMultiSelectOption);
                break;
              case 'yes_no':
                const yesAnswer = await within(surveyQuestionContainer).findByText('Yes');
                fireEvent.click(yesAnswer);
                break;
              case 'currency':
                const currencyInput = await within(surveyQuestionContainer).findByRole('textbox', { name: followUpName });
                fireEvent.input(currencyInput, { target: { value: '100' } });
                break;
              case 'number':
                const numberInput = await within(surveyQuestionContainer).findByRole('textbox', { name: followUpName });
                fireEvent.input(numberInput, { target: { value: '100' } });
                break;
              case 'percent_slider':
                const percentSliderInput = await within(surveyQuestionContainer).findByTestId('percent-slider-input');
                fireEvent.input(percentSliderInput, { target: { value: '50' } });
                break;
            }
          });

          await waitFor(async () => {
            const continueButton = await within(surveyQuestionContainer).queryByRole('button', { name: 'Continue' });
            const submitButton = await within(surveyQuestionContainer).queryByRole('button', { name: 'Submit' });
            // expect continue/submit button to be there
            await expect(continueButton || submitButton).toBeInTheDocument();
            if (submitButton) {
              fireEvent.click(submitButton);
            } else if (continueButton) {
              fireEvent.click(continueButton);
            }
          });
        });
      };

      const generalSection = copy.definition.sections['general'];
      await waitFor(async () => {
        const generalSectionCategoryDescription = await within(surveySectionsProgress).findByText(generalSection.category_description);
        await expect(generalSectionCategoryDescription).toBeInTheDocument();
      });
      await waitFor(async () => {
        await loopThroughSection(generalSection);
      });

      const productSection = copy.definition.sections['product'];
      await waitFor(async () => {
        const productSectionCategoryDescription = await within(surveySectionsProgress).findByText(productSection.category_description);
        return await expect(productSectionCategoryDescription).toBeInTheDocument();
      });
      await waitFor(async () => {
        await loopThroughSection(productSection);
      });

      const facilitiesSection = copy.definition.sections['facilities'];
      await waitFor(async () => {
        const facilitiesSectionCategoryDescription = await within(surveySectionsProgress).findByText(facilitiesSection.category_description);
        await expect(facilitiesSectionCategoryDescription).toBeInTheDocument();
      });
      await waitFor(async () => {
        await loopThroughSection(facilitiesSection);
      });

      await waitFor(async () => {
        const surveyRightNavIntroOutro = await canvas.findByTestId('survey-right-nav-intro-outro');
        const thanksText = await within(surveyRightNavIntroOutro).findByText('Thanks!');
        const thanksText2 = await within(surveyRightNavIntroOutro).findByText("Thanks for submitting your information. We'll take a look and get back to you soon.");
        const continueToDashboardButton = await within(surveyRightNavIntroOutro).findByRole('button', { name: 'Continue to Dashboard' });
        await expect(thanksText).toBeInTheDocument();
        await expect(thanksText2).toBeInTheDocument();
        await expect(continueToDashboardButton).toBeInTheDocument();
        fireEvent.click(continueToDashboardButton);
      });
    });

    await step('Survey Closed', async () => {
      // make sure the survey is closed. expect the survey left nav and right nav to be gone
      await waitFor(async () => {
        const surveyLeftNav = await canvas.queryByTestId('survey-left-nav');
        const surveyRightNav = await canvas.queryByTestId('survey-right-nav-intro-outro');
        const surveyQuestionContainer = await canvas.queryByTestId('survey-question-container');
        await expect(surveyLeftNav).not.toBeInTheDocument();
        await expect(surveyRightNav).not.toBeInTheDocument();
        await expect(surveyQuestionContainer).not.toBeInTheDocument();
      });
    });
  },
};

export const InitialSurvey: Story = {
  render: args => (
    <StoryMockProvider handlers={getSurveyHandler.DEFAULT}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'journey_overview',
  },
};

export const IncompleteSurvey: Story = {
  render: args => (
    <StoryMockProvider handlers={getSurveyHandler.incompleteSurvey}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'journey_overview',
  },
};
