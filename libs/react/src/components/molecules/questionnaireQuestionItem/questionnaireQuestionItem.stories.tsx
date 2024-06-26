import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireQuestionItem } from '@coldpbc/components';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import { getComplianceMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireQuestionItem> = {
  title: 'Molecules/QuestionnaireQuestionItem',
  component: QuestionnaireQuestionItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Bookmarked: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      prompt: 'Choose your favorite colors',
      bookmarked: true,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'text',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      id: '1',
      compliance_responses: [],
    },
  },
};

export const NotStarted: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      prompt: 'Choose your favorite colors',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: true,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'text',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      id: '1',
      compliance_responses: [],
    },
  },
};

export const AiAnswered: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      prompt: 'What is the name of your company',
      bookmarked: false,
      ai_answered: true,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'text',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      id: '1',
      compliance_responses: [
        {
          ai_response: {
            justification: 'We chose this answer because of all of these reasons and this one document that supports why we chose this.',
            answer: 'Cold Climate',
            references: null,
          },
          org_response: null,
        },
      ],
    },
  },
};

export const Complete: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'What is the name of your company',
      bookmarked: false,
      ai_answered: false,
      user_answered: true,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'text',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      compliance_responses: [
        {
          ai_response: null,
          org_response: {
            value: 'Cold Climate',
          },
        },
      ],
    },
  },
};

export const YesNo: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'What is your name?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'yes_no',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const Select: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'Choose your favorite color',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: ['Red', 'Green', 'Blue'],
      tooltip: 'This is a tooltip',
      component: 'select',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const MultiSelect: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'Choose your favorite colors',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: ['Red', 'Green', 'Blue'],
      tooltip: 'This is a tooltip',
      component: 'multi_select',
      placeholder: 'Enter your name',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const Text: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'What is the name of your sustainability point of contact?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter their name',
      component: 'text',
      placeholder: 'Enter here',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const Number: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'How old are you?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter your age',
      component: 'number',
      placeholder: '',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const Currency: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'How much money do you have?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter amount in dollars',
      component: 'currency',
      placeholder: '',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const Percent: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'What percentage of your company is sustainable?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter number between 0 and 100 inclusive',
      component: 'percent_slider',
      placeholder: '',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const TextArea: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: "Tell me about your company's sustainability efforts",
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: '',
      component: 'textarea',
      placeholder: '',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const MultiText: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'Give a list of your favorite colors',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: '',
      component: 'multi_text',
      placeholder: '',
      key: '1',
      order: 1,
      compliance_responses: [],
    },
  },
};

export const AdditionalContext: Story = {
  render: args => {
    return <QuestionnaireStory {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      prompt: 'What is your name?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'yes_no',
      placeholder: 'Enter your name',
      order: 1,
      key: '1',
      additional_context: {
        prompt: 'Please provide the hyperlink.',
        operator: '==',
        component: 'textarea',
        comparison: true,
        placeholder: '',
      },
      compliance_responses: [
        {
          ai_response: null,
          org_response: {
            value: true,
          },
        },
      ],
    },
  },
};

export const SelectWithPointsInTargetScoreCompliance: Story = {
  render: args => {
    return <BCorpQuestionnaire {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: 'cq_bf5zjdjlpz01r09j',
      key: 'GHG-6',
      order: 37,
      component: 'select',
      prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
      tooltip: '',
      placeholder: '',
      options: [
        'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
        'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
        'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
        'No',
      ],
      additional_context: null,
      compliance_responses: [],
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: true,
      score: 0,
      max_score: 1.7,
      answer_score_map: {
        No: 0,
        'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.': 1,
        'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.': 0.5,
        'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.': 0.2,
      },
    },
  },
};

export const SelectWithPointsInTargetScoreComplianceAlreadyAnswered: Story = {
  render: args => {
    return <BCorpQuestionnaire {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: 'cq_bf5zjdjlpz01r09j',
      key: 'GHG-6',
      order: 37,
      component: 'select',
      prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
      tooltip: '',
      placeholder: '',
      options: [
        'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
        'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
        'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
        'No',
      ],
      additional_context: null,
      compliance_responses: [
        {
          org_response: {
            value: ['Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.'],
          },
          ai_response: null,
        },
      ],
      bookmarked: false,
      ai_answered: false,
      user_answered: true,
      not_started: false,
      score: 0,
      max_score: 1.7,
      answer_score_map: {
        No: 0,
        'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.': 1,
        'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.': 0.5,
        'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.': 0.2,
      },
    },
  },
};

const QuestionnaireStory = (args: { question: QuestionnaireQuestion; number: number }) => {
  return (
    <StoryMockProvider>
      <QuestionnaireQuestionItem {...args} questionnaireMutate={() => {}} sectionId={'1'} sectionGroupId={'1'} />
    </StoryMockProvider>
  );
};

const BCorpQuestionnaire = (args: { question: QuestionnaireQuestion; number: number }) => {
  return (
    <StoryMockProvider
      complianceQuestionnaireContext={{
        name: 'b_corp_2024',
        complianceDefinition: getComplianceMock().find(compliance => compliance.name === 'b_corp_2024'),
      }}>
      <QuestionnaireQuestionItem {...args} questionnaireMutate={() => {}} sectionId={'1'} sectionGroupId={'1'} />
    </StoryMockProvider>
  );
};
