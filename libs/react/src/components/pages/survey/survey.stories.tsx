import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getAIAnsweredSurveyMock, getSurveyFormDataByName, StoryMockProvider } from '@coldpbc/mocks';
import { getSurveyHandler } from '@coldpbc/mocks';
import { Survey } from '@coldpbc/components';
import { fireEvent, waitFor, within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SurveyPayloadType, SurveySectionFollowUpType, SurveySectionType } from '@coldpbc/interfaces';
import { forEach, forOwn } from 'lodash';
import { continueOrSubmit, enterInputValue, verifyAdditionalContext } from '@coldpbc/lib';

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
    const user = userEvent.setup();
    await step('Fill out survey', async () => {
      const surveyRightNav = await canvas.findByTestId('survey-right-nav-intro-outro');
      const welcomeText = await within(surveyRightNav).findByText('Welcome to Cold Climate!');
      await expect(welcomeText).toBeInTheDocument();
      await expect(await canvas.findByTestId('survey-intro')).toBeInTheDocument();

      const startButton = await within(surveyRightNav).findByRole('button', { name: 'Start' });
      await userEvent.click(startButton);
      const surveyQuestionContainer = await canvas.findByTestId('survey-question-container');
      const surveySectionsProgress = await canvas.findByTestId('survey-sections-progress');
      const survey = getSurveyFormDataByName(args.surveyName);
      // sort sections object by order
      if (survey === undefined) {
        return;
      }

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

      const answerQuestion = async (followUp: SurveySectionFollowUpType, followUpName: string) => {
        await waitFor(async () => {
          await expect(await within(surveyQuestionContainer).findByText(followUp.prompt)).toBeInTheDocument();
        });
        if (followUpName === 'general:3') {
          await enterInputValue(followUp, followUpName, surveyQuestionContainer, '1', false);
          await verifyAdditionalContext(followUp, followUpName, surveyQuestionContainer);
        } else {
          switch (followUp.component) {
            case 'text':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', false);
              break;
            case 'select':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
              break;
            case 'multi_select':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
              break;
            case 'yes_no':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'Yes', false);
              break;
            case 'currency':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
              break;
            case 'number':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
              break;
            case 'percent_slider':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '50', false);
              break;
          }
        }

        await continueOrSubmit(surveyQuestionContainer);
      };

      const answerSectionQuestion = async (section: SurveySectionType, sectionName: string) => {
        await waitFor(async () => {
          await expect(await within(surveySectionsProgress).findByText(section.category_description)).toBeInTheDocument();
        });
        if (section.component) {
          console.log('section', section);
          if (sectionName === 'product') {
            await enterInputValue(
              {
                ...section,
                tooltip: '',
                options: [],
                idx: 0,
                placeholder: '',
              },
              sectionName,
              surveyQuestionContainer,
              'Yes',
              false,
            );
            await verifyAdditionalContext(section, sectionName, surveyQuestionContainer);
          } else {
            // get Yes answer
            await waitFor(async () => {
              await expect(await within(surveyQuestionContainer).findByText('Yes')).toBeInTheDocument();
            });
            fireEvent.click(await within(surveyQuestionContainer).findByText('Yes'));
          }
          const continueButton = await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' });
          fireEvent.click(continueButton);
        }
      };

      // const verifyAdditionalContext = async (questionKey: string) => {
      //   if (questionKey === 'general:3') {
      //     const numberInput = await within(surveyQuestionContainer).findByRole('textbox', { name: questionKey });
      //     await fireEvent.input(numberInput, { target: { value: '1' } });
      //   } else if (questionKey === 'product') {
      //     const yesAnswer = await within(surveyQuestionContainer).findByText('Yes');
      //     await fireEvent.click(yesAnswer);
      //   }
      //   const textArea = await within(surveyQuestionContainer).findByRole('textbox', { name: `${questionKey}-isAdditional` });
      //   await waitFor(async () => {
      //     await expect(surveyQuestionContainer.querySelector('textarea')).toBeInTheDocument();
      //   });
      //   if (surveyQuestionContainer === null) {
      //     throw new Error('surveyQuestionContainer is null');
      //   }
      //   fireEvent.input(surveyQuestionContainer.querySelector('textarea'), { target: { value: 'test' } });
      //   await waitFor(async () => {
      //     await expect(await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' })).toBeEnabled();
      //   });
      //
      //   await fireEvent.input(surveyQuestionContainer.querySelector('textarea'), { target: { value: '' } });
      //   await waitFor(async () => {
      //     await expect(await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' })).toBeDisabled();
      //   });
      //
      //   await fireEvent.input(surveyQuestionContainer.querySelector('textarea'), { target: { value: 'test' } });
      //   await expect(await within(surveyQuestionContainer).findByRole('button', { name: 'Continue' })).toBeEnabled();
      // };

      await waitFor(async () => {
        await answerSectionQuestion(copy.definition.sections['general'], 'general');
      });
      const generalSection = copy.definition.sections['general'];
      await answerQuestion(generalSection.follow_up['general:0'], 'general:0');
      await answerQuestion(generalSection.follow_up['general:1'], 'general:1');
      await answerQuestion(generalSection.follow_up['general:2'], 'general:2');
      await answerQuestion(generalSection.follow_up['general:3'], 'general:3');

      const productSection = copy.definition.sections['product'];
      await waitFor(async () => {
        await answerSectionQuestion(productSection, 'product');
      });
      await answerQuestion(productSection.follow_up['product:0'], 'product:0');
      await answerQuestion(productSection.follow_up['product:1'], 'product:1');
      await answerQuestion(productSection.follow_up['product:2'], 'product:2');
      await answerQuestion(productSection.follow_up['product:3'], 'product:3');

      const facilitySection = copy.definition.sections['facilities'];
      await waitFor(async () => {
        await answerSectionQuestion(facilitySection, 'facilities');
      });
      await answerQuestion(facilitySection.follow_up['facilities:0'], 'facilities:0');
    });

    // close the survey
    await step('Close Survey', async () => {
      const surveyRightNav = await canvas.findByTestId('survey-right-nav-intro-outro');
      await waitFor(async () => {
        await expect(await within(surveyRightNav).findByText('Thanks!')).toBeInTheDocument();
      });

      await waitFor(async () => {
        await expect(await within(surveyRightNav).findByText("Thanks for submitting your information. We'll take a look and get back to you soon.")).toBeInTheDocument();
      });
      const continueButton = await within(surveyRightNav).findByRole('button', { name: 'Continue to Dashboard' });
      fireEvent.click(continueButton);
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

export const AIAnsweredSurvey: Story = {
  render: args => (
    <StoryMockProvider handlers={getSurveyHandler.getAiAnsweredSurvey}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'rei_pkg_survey',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await step('Fill out survey', async () => {
      const survey = getAIAnsweredSurveyMock();
      const surveyRightNav = await canvas.findByTestId('survey-right-nav-intro-outro');
      const welcomeText = await within(surveyRightNav).findByText(survey.definition.title);
      await expect(welcomeText).toBeInTheDocument();
      await expect(await canvas.findByTestId('survey-intro')).toBeInTheDocument();
      const startButton = await within(surveyRightNav).findByRole('button', { name: 'Start' });
      await userEvent.click(startButton);
      const surveyQuestionContainer = await canvas.findByTestId('survey-question-container');
      const surveySectionsProgress = await canvas.findByTestId('survey-sections-progress');
      // sort sections object by order
      if (survey === undefined) {
        return;
      }

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

      const verifyAiResponse = async (followUp: SurveySectionFollowUpType, followUpName: string, surveyQuestionContainer: HTMLElement) => {
        // check if there is an AI response
        const aiResponse = await within(surveyQuestionContainer).queryByTestId('survey-input-ai-response');
        // verify the ai response justification is in the ai response
        if (aiResponse && followUp.ai_response?.justification) {
          await within(aiResponse).findByText(followUp.ai_response?.justification);
          await within(surveyQuestionContainer).findByRole('button', { name: 'Confirm' });

          switch (followUp.component) {
            case 'text':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', false);
              break;
            case 'select':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
              break;
            case 'multi_select':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
              break;
            case 'yes_no':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'Yes', false);
              break;
            case 'currency':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
              break;
            case 'number':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
              break;
            case 'percent_slider':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, '50', false);
              break;
            case 'textarea':
              await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', false);
              break;
          }

          // verify there is no confirm button
          await expect(await within(surveyQuestionContainer).queryByRole('button', { name: 'Confirm' })).toBe(null);

          await expect(await within(surveyQuestionContainer).queryByTestId('survey-input-ai-response')).toBe(null);
        }
      };

      const answerQuestion = async (followUp: SurveySectionFollowUpType, followUpName: string) => {
        await waitFor(async () => {
          await expect(await within(surveyQuestionContainer).findByText(followUp.prompt)).toBeInTheDocument();
        });

        await verifyAiResponse(followUp, followUpName, surveyQuestionContainer);

        switch (followUp.component) {
          case 'text':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', false);
            break;
          case 'select':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
            break;
          case 'multi_select':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, followUp.options[0], false);
            break;
          case 'yes_no':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'Yes', false);
            break;
          case 'currency':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
            break;
          case 'number':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, '100', false);
            break;
          case 'percent_slider':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, '50', false);
            break;
          case 'textarea':
            await enterInputValue(followUp, followUpName, surveyQuestionContainer, 'test', false);
            break;
        }

        await verifyAdditionalContext(followUp, followUpName, surveyQuestionContainer);

        await continueOrSubmit(surveyQuestionContainer);
      };

      // verify that there is an AI response
      // loop through the sections and answer the questions
      forOwn(copy.definition.sections['PKG'].follow_up, async (followUp, followUpName) => {
        await waitFor(async () => {
          await answerQuestion(followUp, followUpName);
        });
      });
    });
  },
};
