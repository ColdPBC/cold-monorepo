import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceTargetProgressBar } from '@coldpbc/components';
import { AssessmentsContext } from '@coldpbc/context';
import { getOrganizationComplianceMock } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceTargetProgressBar> = {
  title: 'Organisms/ComplianceTargetProgressBar',
  component: ComplianceTargetProgressBar,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <AssessmentsContext.Provider
        value={{
          currentAssessment: 'b_corp_2024',
          setCurrentAssessment: () => {},
          data: {
            b_corp_2024: {
              compliance: getOrganizationComplianceMock()[0],
              section_types: {
                Environment: {
                  score: 0,
                  max: 0,
                  percentage: 0,
                },
                Social: {
                  score: 0,
                  max: 0,
                  percentage: 0,
                },
                Governance: {
                  score: 0,
                  max: 0,
                  percentage: 0,
                },
              },
              progress_data: {
                total_score: 10,
                total_max_score: 117.35000000000008,
                total_review: 0,
                question_count: 216,
                percentage: 9,
                questions_answered: 2,
                sections: [
                  {
                    section_score: 0,
                    section_max_score: 13.089999999999998,
                    title: 'Air & Climate',
                    total: 17,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'AIR-192': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-195': {
                        max_score: 0.29,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-196': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-197': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-198': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-199': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-205': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-206': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-207': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-208': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-209': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-210': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-211': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-212': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-213': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-214': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'AIR-215': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 2.67,
                    title: 'Career Development',
                    total: 6,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'CDE-62': {
                        max_score: 0.41,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CDE-65': {
                        max_score: 0.41,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CDE-66': {
                        max_score: 0.82,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CDE-67': {
                        max_score: 0.41,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CDE-68': {
                        max_score: 0.41,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CDE-69': {
                        max_score: 0.21,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Community Impact Area Introduction',
                    total: 1,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'CIA-92': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Customers Impact Area Introduction',
                    total: 1,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'CIN-242': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 1.3800000000000001,
                    title: 'Civic Engagement & Giving',
                    total: 3,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'CIV-128': {
                        max_score: 0.55,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CIV-133': {
                        max_score: 0.55,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CIV-138': {
                        max_score: 0.28,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 0.76,
                    title: 'Customer Stewardship',
                    total: 2,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'CUS-263': {
                        max_score: 0.38,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'CUS-270': {
                        max_score: 0.38,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 7.010000000000001,
                    title: 'Diversity, Equity, & Inclusion',
                    total: 12,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'DIV-102': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-103': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-104': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-105': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-106': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-111': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-112': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-113': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-114': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-115': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-116': {
                        max_score: 0.3,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DIV-117': {
                        max_score: 0.61,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Disclosure Outcomes & Penalties',
                    total: 18,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'DOP-308': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-309': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-310': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-311': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-312': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-313': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-314': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-315': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-316': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-317': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-318': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-319': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-320': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-321': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-322': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-323': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-324': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DOP-325': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Disclosure Industries',
                    total: 18,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'DSI-274': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-275': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-276': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-277': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-278': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-279': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-280': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-281': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-282': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-283': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-284': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-285': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-286': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-287': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-288': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-289': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-290': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSI-291': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Disclosure Practices',
                    total: 16,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'DSP-292': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-293': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-294': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-295': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-296': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-297': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-298': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-299': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-300': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-301': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-302': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-303': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-304': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-305': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-306': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'DSP-307': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 8.84,
                    title: 'Economic Impact',
                    total: 9,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'ECO-118': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-119': {
                        max_score: 2.35,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-120': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-121': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-122': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-123': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-124': {
                        max_score: 0.59,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-125': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ECO-127': {
                        max_score: 1.18,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Environment Impact Area Introduction',
                    total: 5,
                    answered: 1,
                    complete: false,
                    review: 0,
                    questions: {
                      'EIA-1': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'EIA-168': {
                        user_answered: true,
                        ai_answered: false,
                      },
                      'EIA-169': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'EIA-170': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'EIA-171': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 3.67,
                    title: 'Engagement & Satisfaction',
                    total: 5,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'ENG-77': {
                        max_score: 0.33,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENG-78': {
                        max_score: 0.67,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENG-79': {
                        max_score: 1.33,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENG-80': {
                        max_score: 0.67,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENG-81': {
                        max_score: 0.67,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 13.180000000000003,
                    title: 'Environmental Management',
                    total: 12,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'ENV-182': {
                        max_score: 0.95,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-183': {
                        max_score: 0.95,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-184': {
                        max_score: 0.95,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-185': {
                        max_score: 1.9,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-186': {
                        max_score: 0.95,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-187': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-188': {
                        max_score: 0.48,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-189': {
                        max_score: 1.9,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-190': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-191': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-192': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ENV-184:B': {
                        max_score: 1.9,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 4.42,
                    title: 'Ethics & Transparency',
                    total: 9,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'ETH-7': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-11': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-13': {
                        max_score: 0.46,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-14': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-15': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-16': {
                        max_score: 0.46,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-17': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-18': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'ETH-16:B': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 11.559999999999999,
                    title: 'Financial Security',
                    total: 8,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'FIN-40': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-41': {
                        max_score: 2.72,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-42': {
                        max_score: 2.72,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-43': {
                        max_score: 1.36,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-44': {
                        max_score: 1.36,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-47': {
                        max_score: 1.36,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-49': {
                        max_score: 1.36,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'FIN-50': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Governance Metrics',
                    total: 6,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'GVM-21': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'GVM-22': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'GVM-23': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'GVM-24': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'GVM-25': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'GVM-26': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 12.400000000000002,
                    title: 'Health, Wellness, & Safety',
                    total: 12,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'HEA-51': {
                        max_score: 2,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-52': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-53': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-54': {
                        max_score: 2,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-55': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-56': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-57': {
                        max_score: 1,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-58': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-59': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-60': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-61': {
                        max_score: 0.8,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'HEA-60:B': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 12.929999999999998,
                    title: 'Land & Life',
                    total: 19,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'LAN-221': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-225': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-226': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-227': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-228': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-229': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-230': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-231': {
                        max_score: 1.37,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-232': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-233': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-234': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-235': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-236': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-237': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-238': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-239': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-240': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-241': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'LAN-228:B': {
                        max_score: 0.68,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 1.5,
                    title: 'Mission & Engagement',
                    total: 6,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'MSE-1': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'MSE-2': {
                        max_score: 0.25,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'MSE-4': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'MSE-10': {
                        max_score: 0.25,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'MSE-11': {
                        max_score: 0.5,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'MSE-12': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 10,
                    section_max_score: 10,
                    title: 'Mission Locked',
                    total: 1,
                    answered: 1,
                    complete: true,
                    review: 0,
                    questions: {
                      'MSL-27': {
                        max_score: 10,
                        score: 10,
                        user_answered: true,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Supply Chain Disclosure',
                    total: 4,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'SCD-326': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SCD-327': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SCD-328': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SCD-329': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 6.9399999999999995,
                    title: 'Supply Chain Management',
                    total: 13,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'SUP-139': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-140': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-143': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-148': {
                        max_score: 0.32,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-149': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-151': {
                        max_score: 1.26,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-152': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-153': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-154': {
                        max_score: 0.32,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-155': {
                        max_score: 1.26,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-156': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-157': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'SUP-158': {
                        max_score: 0.63,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    section_score: 0,
                    section_max_score: 7,
                    title: 'Water',
                    total: 4,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'WAT-216': {
                        max_score: 1.75,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WAT-218': {
                        max_score: 1.75,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WAT-219': {
                        max_score: 1.75,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WAT-220': {
                        max_score: 1.75,
                        score: 0,
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                  {
                    title: 'Workers Impact Area Introduction',
                    total: 9,
                    answered: 0,
                    complete: false,
                    review: 0,
                    questions: {
                      'WIA-28': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-29': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-31': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-34': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-35': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-36': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-37': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-38': {
                        user_answered: false,
                        ai_answered: false,
                      },
                      'WIA-39': {
                        user_answered: false,
                        ai_answered: false,
                      },
                    },
                  },
                ],
              },
              compliance_type: 'target_score',
              target_score: 80,
            },
          },
        }}>
        <ComplianceTargetProgressBar />
      </AssessmentsContext.Provider>
    );
  },
};
