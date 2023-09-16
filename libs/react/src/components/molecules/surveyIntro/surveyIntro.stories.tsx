import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import { SurveyIntro } from './surveyIntro';
import { getTestingSurveyData } from '../../../__mocks__/surveyDataMock';

const meta = {
  title: 'Molecules/SurveyIntro',
  component: SurveyIntro,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <SurveyIntro {...args} />;
  },
  args: {
    surveyFormDefinition: getTestingSurveyData().definition,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSurveyStart: () => {},
  },
};
