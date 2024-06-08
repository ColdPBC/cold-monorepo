import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireQuestionItem } from './questionnaireQuestion';

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
    return <QuestionnaireQuestionItem {...args} />;
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
    },
  },
};

export const NotStarted: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
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
    },
  },
};

export const AiAnswered: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
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
      ai_response: {
        justification: 'We chose this answer because of all of these reasons and this one document that supports why we chose this.',
        answer: 'Cold Climate',
      },
      key: '1',
      order: 1,
    },
  },
};

export const Complete: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'What is the name of your company',
      bookmarked: false,
      ai_answered: false,
      user_answered: true,
      not_started: false,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'text',
      answer: 'Cold Climate',
      placeholder: 'Enter your name',
    },
  },
};

export const YesNo: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'What is your name?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      answer: true,
      options: [],
      tooltip: 'This is a tooltip',
      component: 'yes_no',
      placeholder: 'Enter your name',
    },
  },
};

export const Select: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'Choose your favorite color',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: ['Red', 'Green', 'Blue'],
      tooltip: 'This is a tooltip',
      component: 'select',
      placeholder: 'Enter your name',
    },
  },
};

export const MultiSelect: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'Choose your favorite colors',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: ['Red', 'Green', 'Blue'],
      tooltip: 'This is a tooltip',
      answer: ['Red'],
      component: 'multi_select',
      placeholder: 'Enter your name',
    },
  },
};

export const Text: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'What is the name of your sustainability point of contact?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter their name',
      component: 'text',
      placeholder: 'Enter here',
    },
  },
};

export const Number: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'How old are you?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter your age',
      component: 'number',
      placeholder: '',
    },
  },
};

export const Currency: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'How much money do you have?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter amount in dollars',
      component: 'currency',
      placeholder: '',
    },
  },
};

export const Percent: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'What percentage of your company is sustainable?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: 'Enter number between 0 and 100 inclusive',
      component: 'percent_slider',
      placeholder: '',
    },
  },
};

export const TextArea: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: "Tell me about your company's sustainability efforts",
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: '',
      component: 'textarea',
      placeholder: '',
    },
  },
};

export const MultiText: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      id: '1',
      number: 1,
      prompt: 'Give a list of your favorite colors',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      options: [],
      tooltip: '',
      component: 'multi_text',
      placeholder: '',
    },
  },
};

export const AdditionalContext: Story = {
  render: args => {
    return <QuestionnaireQuestionItem {...args} />;
  },
  args: {
    number: 1,
    question: {
      prompt: 'What is your name?',
      bookmarked: false,
      ai_answered: false,
      user_answered: false,
      not_started: false,
      value: true,
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
    },
    focusQuestion: null,
    setFocusQuestion: () => {},
  },
};
