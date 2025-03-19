import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireDetailSidebar } from '@coldpbc/components';
import { QuestionnaireContextMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireDetailSidebar> = {
  title: 'Organisms/QuestionnaireDetailSidebar',
  component: QuestionnaireDetailSidebar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
};

const SidebarStory = () => {
  return (
    <QuestionnaireContextMockProvider
      complianceQuestionnaireContext={{
        focusQuestion: {
          key: 'key',
          aiDetails: {
            ai_answered: true,
            value: true,
            questionAnswerSaved: false,
            questionAnswerChanged: false,
            question: {
              id: 'cq_h9f68m5chgu5pyd9',
              key: 'MFG-8',
              order: 22,
              component: 'yes_no',
              prompt: 'Is your brand’s supplier list publicly available?',
              tooltip: '',
              placeholder: '',
              options: [],
              additional_context: {
                prompt: 'Please provide the hyperlink.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              compliance_responses: [
                {
                  org_response: null,
                  ai_response: {
                    answer: [true],
                    justification:
                      'Cold Climate makes their factory list (both Tier 1 and Tier 2) publicly available for scrutiny. This information is reported annually through their impact report and as part of their B Corp assessment.',
                    references: [
                      {
                        url: 'www.cotopaxi.com/blogs/impact/supply-chain-ethics-in-crisis',
                        text: [
                          'such as Fair Trade USA, the Sustainable Apparel Coalition, B Lab, and peers to drive awareness around this issue.\n* **Holding ourselves accountable by making our factory list (both Tier 1 and Tier 2), Restrict Substance List (RSL), and Code of Conduct (CoC) publicly available for scrutiny.** We also report our supply chain management outcomes publicly every year through our impact report and as part of our B Corp assessment.\n* **Always working to go beyond compliance and to build a better capitalism that works for everyone, including workers.** Here’s what we’re still working on: adopting testing of all materials, building upon our sustainable design practices, working with workers directly to elevate their livelihoods through health and educational programming in factories.\n\nWe’re always working to do more to build a sustainable supply chain and to hold fast to our founders’ mission of using business as a force for good.\n\nSincerely, \n\n![Annie Agle',
                        ],
                      },
                    ],
                  },
                },
              ],
              bookmarked: false,
              ai_answered: true,
              user_answered: false,
              not_started: false,
            },
            sectionGroupId: 'csg_m3dt64ix15uiap6e',
            sectionId: 'cs_g3xkxk4vkdwc7fjz',
          },
        },
      }}>
      <div className={'w-[407px] h-screen'}>
        <QuestionnaireDetailSidebar />
      </div>
    </QuestionnaireContextMockProvider>
  );
};
