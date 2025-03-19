import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireAIDetail, QuestionnaireAIDetailProps } from '@coldpbc/components';
import { QuestionnaireContextMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireAIDetail> = {
  title: 'Organisms/QuestionnaireAIDetail',
  component: QuestionnaireAIDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AiHasNotBeenRun: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: false,
      value: ['1', '2'],
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        prompt: 'What is the name of your company',
        bookmarked: false,
        ai_answered: false,
        user_answered: false,
        not_started: false,
        options: [],
        tooltip: 'This is a tooltip',
        component: 'multi_select',
        placeholder: 'Enter your name',
        key: '1',
        order: 1,
        id: '1',
        compliance_responses: [
          {
            ai_response: null,
            org_response: null,
          },
        ],
      },
      sectionGroupId: 'cs_fqiwgmgebqp9il2e',
      sectionId: 'csg_m3dt64ix15uiap6e',
    },
  },
};

export const LowConfidence: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: false,
      value: ['1', '2'],
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        prompt: 'What is the name of your company',
        bookmarked: false,
        ai_answered: false,
        user_answered: false,
        not_started: false,
        options: [],
        tooltip: 'This is a tooltip',
        component: 'multi_text',
        placeholder: 'Enter your name',
        key: '1',
        order: 1,
        id: '1',
        compliance_responses: [
          {
            ai_response: {
              references: [
                {
                  file: 'Askov Demo Doc.pdf',
                  text: [
                    "does your company formally screen for regarding the social or \nenvironmental practices and performance of your suppliers?\nAskov Finlayson Answer:\nCompliance with all local laws and regulations, including those \nrelated to social and environmental performance\nGood governance, including policies related to ethics and corruption\nPositive practices beyond what is required by regulations (e.g. \nenvironmentally-friendly manufacturing process, excellent labor \npractices)\nB Corp Question 91\nCategory: Community - Supply Chain Management - Supplier Evaluation \nPractices\nQuestion:\nWhat methods does your company use to evaluate the social or \nenvironmental impact of your suppliers?\nAskov Finlayson Answer:\nWe share policies or rules with suppliers but we don't have a \n\nverification process in place\nB Corp Question 92\nCategory: Community - Supply Chain Management - Outsourced Staffing \nServices\nQuestion:\nDoes your company outsource support services (staffing) essential to \nthe delivery of your",
                    "and treatments that pollute \nwater; our other apparel items are made from certified organic pima \ncotton, which is produced without chemical fertilizers/pesticides/\nherbicides/defoliants and is hand-picked; and with the carbon offsets \npurchased at more than we used to produce the product, many positive \nenvironmental outcomes are realized (Google global warming \nexternalities). We’ve committed to investing more money fighting \nclimate change than running our business costs the planet. We call \nthis way of doing business climate positive, and we achieve it by \nmeasuring our annual carbon footprint, converting that amount of \ncarbon into a dollar amount using the social cost of carbon, and then \nGiving 110% of that amount every year to leading-edge organizations \nworking to solve the climate crisis.  #KeepTheNorthCold\nB Corp Question 101\nCategory: Environment - Environment Impact Area Introduction - \nEnvironmental Product or Service Impact\nQuestion:\nIs the environmental impact you've",
                    'your product/service conserve the \nenvironment?\nPlease select ONE option per product line. You may select an \nadditional option if your product line has two separate environmental \nattributes.\nAskov Finlayson Answer:\nConserves or diverts resources (including energy, water, materials, \netc.)\nReduces or is made of less toxic/hazardous substances (e.g. brownfield \nremediation services, organic certified food, non-toxic cleaners)\nB Corp Question 103\nCategory: Environment - Environment Impact Area Introduction - \nResource Conservation Overview\nQuestion:\nTell us more about how your product or service reduces energy, GHG \nemissions, water and/or waste.\nAskov Finlayson Answer:\nOur outerwear products and hats are made with recycled materials \n(e.g., 100% recycled polyester and nylon), which reduces waste by \nrepurposing existing materials. Our other apparel items (e.g., tees \nand crews) are produced with organic cotton that is hand-picked in \norder to reduce energy consumption and emissions',
                  ],
                },
              ],
              justification:
                "The provided excerpts from the 'Askov Demo Doc.pdf' do not contain any specific information regarding a formal policy or target related to the geographic origin of the leather used in the company's products. To effectively answer the question, we would need explicit information stating the company's policy on the sourcing of leather, including any specific targets or guidelines that address the geographic origin of the materials and how they relate to sustainability concerns such as deforestation.",
              answer: ['1', '2'],
            },
            org_response: null,
          },
        ],
      },
      sectionGroupId: 'cs_fqiwgmgebqp9il2e',
      sectionId: 'csg_m3dt64ix15uiap6e',
    },
  },
};

export const UnderReview: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: true,
      value: true,
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        id: 'cq_vsmrhriz0fam36mh',
        key: 'PSA-1',
        order: 87,
        component: 'yes_no',
        prompt: 'Does your brand utilize a formal methodology or tool to measure the sustainability of your materials and/or finished products?',
        tooltip: '',
        placeholder: '',
        options: [],
        additional_context: {
          prompt: 'Please describe. Limit your response to 100 words or less.',
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
                'Cotopaxi works with numerous third-party standards, including ReMake, to share their real-time performance across various social, environmental, and governmental metrics. This indicates the use of formal methodologies or tools to measure the sustainability of their materials and finished products.',
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
        score: 0,
        ai_score: 1,
        max_score: 1,
      },
      sectionGroupId: 'csg_pukqrndkcvtxnz6y',
      sectionId: 'cs_knwupnz9o24amkfb',
    },
  },
};

export const Accepted: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: true,
      value: true,
      questionAnswerSaved: true,
      questionAnswerChanged: false,
      question: {
        id: 'cq_vsmrhriz0fam36mh',
        key: 'PSA-1',
        order: 87,
        component: 'yes_no',
        prompt: 'Does your brand utilize a formal methodology or tool to measure the sustainability of your materials and/or finished products?',
        tooltip: '',
        placeholder: '',
        options: [],
        additional_context: {
          prompt: 'Please describe. Limit your response to 100 words or less.',
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
                'Cotopaxi works with numerous third-party standards, including ReMake, to share their real-time performance across various social, environmental, and governmental metrics. This indicates the use of formal methodologies or tools to measure the sustainability of their materials and finished products.',
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
        score: 0,
        ai_score: 1,
        max_score: 1,
      },
      sectionGroupId: 'csg_pukqrndkcvtxnz6y',
      sectionId: 'cs_knwupnz9o24amkfb',
    },
  },
};

export const NotAccepted: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: true,
      value: ['1', '2'],
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        prompt: 'What is the name of your company',
        bookmarked: false,
        ai_answered: true,
        user_answered: false,
        not_started: false,
        options: [],
        tooltip: 'This is a tooltip',
        component: 'multi_text',
        placeholder: 'Enter your name',
        order: 1,
        id: 'cq_vsmrhriz0fam36mh',
        key: 'PSA-1',
        compliance_responses: [
          {
            org_response: null,
            ai_response: {
              answer: ['1'],
              justification:
                'Cotopaxi works with numerous third-party standards, including ReMake, to share their real-time performance across various social, environmental, and governmental metrics. This indicates the use of formal methodologies or tools to measure the sustainability of their materials and finished products.',
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
      },
      sectionGroupId: 'csg_pukqrndkcvtxnz6y',
      sectionId: 'cs_knwupnz9o24amkfb',
    },
  },
};

export const UnderReviewYesNo: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
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
};

export const UnderReviewSelect: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: true,
      value: ['We have some practices in place, but do not yet have formal guidelines or targets in place'],
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        id: 'cq_rtr4mual38m1f3lw',
        key: 'MKT-1',
        order: 71,
        component: 'select',
        prompt:
          'The REI Product Impact Standards include the expectation that each brand partner has in place guidelines for marketing assets, photo casting and production that ensure diverse and inclusive representation across race, age, gender identity/expression, body size and disability. Content supplied to REI by influencers and affiliate media, as well as photography, marketing copy, and other content, shall reflect the same inclusive representation.\n\nWhich option below best describes your brand’s status, as of Spring 2023 product lines and marketing, in addressing diverse and inclusive representation in its marketing and photo casting?',
        tooltip: '',
        placeholder: '',
        options: [
          'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
          'We have some practices in place, but do not yet have formal guidelines or targets in place',
          'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
        ],
        additional_context: {
          prompt: "Describe how your brand plans to align with REI's expectation in this area.",
          operator: '==',
          component: 'textarea',
          comparison: 'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
          placeholder: '',
        },
        compliance_responses: [
          {
            org_response: null,
            ai_response: {
              answer: ['We have some practices in place, but do not yet have formal guidelines or targets in place'],
              justification:
                "Based on the context provided, Cotopaxi's marketing meets diversity best practices, and the company is actively taking steps to ensure inclusive representation. However, there is no specific mention of formal guidelines or targets being in place for marketing assets, photo casting, and production. Therefore, the best description is that some practices are in place, but formal guidelines or targets are not yet established.",
              references: [
                {
                  url: 'www.cotopaxi.com/pages/jobs',
                  text: [
                    'explore new ways of achieving our mission, whether that’s building more sustainable products or making a positive impact. \n\n### Inclusion & Belonging at Cotopaxi\n\nAs a humanitarian and mission-driven brand, we are deeply invested in welcoming, embracing, and celebrating all people, regardless of gender, age, race, disability, nationality, ethnicity, faith, or sexual orientation. Diversifying our team is essential and we’re actively taking steps to do so, including implementing the following practices: \n\n* Adopting a **remote-first model** allowing us to recruit diverse talent outside Utah\n* Partnering with **diversity, inclusion, refugee and veteran focused specific job boards**, organizations and communities\n* Providing **transparent details** on compensation and benefits on job postings\n* Utilizing an anonymous applicant screening tool to **eliminate unconscious bias in our hiring process**\n\nTo foster inclusion and continuously make Cotopaxi a better place to work for all, we’ve',
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
        score: 0,
        ai_score: 0.5,
        max_score: 1.5,
      },
      sectionGroupId: 'csg_j8gp3cqg1en67qor',
      sectionId: 'cs_a243nr32celxvegb',
    },
  },
};

export const UnderReviewMultiSelect: Story = {
  render: args => {
    return <AIDetailStory {...args} />;
  },
  args: {
    aiDetails: {
      ai_answered: true,
      value: [
        'Attending a talk or lecture on DEI topics specific to product (webinar, lunch and learn, etc.)',
        'Participating in collaborative learning sessions',
        'Presenting a talk or learning session',
        'Diversity & inclusion resource lists (reading, viewing, activities)',
        'Collaborating on an industry-wide DEI style guide',
        'Participating in an industry community of practice',
        'Integration of inclusion discussions in the buying process',
        'Consultation with REI’s Inclusion Marketing team on specific topics',
        'Connections to inclusion organizations or ambassadors',
      ],
      questionAnswerSaved: false,
      questionAnswerChanged: false,
      question: {
        id: 'cq_kcv8g80wbzvtj2i4',
        key: 'CRP-4',
        order: 110,
        component: 'multi_select',
        prompt:
          '(Optional) We want to explore ways we can best convene and support you and other brands we work with to deliver more inclusive and culturally relevant offerings to our customer, and extend positive impacts to the broader community. What practices, information, or other resources would you be interested in?',
        tooltip: '',
        placeholder: '',
        options: [
          'Attending a talk or lecture on DEI topics specific to product (webinar, lunch and learn, etc.)',
          'Participating in collaborative learning sessions',
          'Presenting a talk or learning session',
          'Diversity & inclusion resource lists (reading, viewing, activities)',
          'Collaborating on an industry-wide DEI style guide',
          'Participating in an industry community of practice',
          'Integration of inclusion discussions in the buying process',
          'Consultation with REI’s Inclusion Marketing team on specific topics',
          'Connections to inclusion organizations or ambassadors',
          'Other',
        ],
        additional_context: {
          prompt: 'Please describe',
          operator: 'has',
          component: 'textarea',
          comparison: 'Other',
          placeholder: '',
        },
        compliance_responses: [
          {
            org_response: null,
            ai_response: {
              answer: [
                'Attending a talk or lecture on DEI topics specific to product (webinar, lunch and learn, etc.)',
                'Participating in collaborative learning sessions',
                'Presenting a talk or learning session',
                'Diversity & inclusion resource lists (reading, viewing, activities)',
                'Collaborating on an industry-wide DEI style guide',
                'Participating in an industry community of practice',
                'Integration of inclusion discussions in the buying process',
                'Consultation with REI’s Inclusion Marketing team on specific topics',
                'Connections to inclusion organizations or ambassadors',
              ],
              justification:
                "Based on the information provided, Cotopaxi is deeply invested in fostering inclusion and diversity through various practices such as adopting a remote-first model, partnering with specific job boards, and utilizing anonymous applicant screening tools. Additionally, Cotopaxi aims to ensure equitable and inclusive practices in its recruiting, retention, hiring, and onboarding processes. Therefore, the suggested practices and resources align with Cotopaxi's ongoing efforts and commitment to DEI. These options provide a comprehensive approach to supporting and delivering inclusive and culturally relevant offerings to customers and extending positive impacts to the broader community.",
              references: [
                {
                  url: 'www.cotopaxi.com/pages/jobs',
                  text: [
                    'explore new ways of achieving our mission, whether that’s building more sustainable products or making a positive impact. \n\n### Inclusion & Belonging at Cotopaxi\n\nAs a humanitarian and mission-driven brand, we are deeply invested in welcoming, embracing, and celebrating all people, regardless of gender, age, race, disability, nationality, ethnicity, faith, or sexual orientation. Diversifying our team is essential and we’re actively taking steps to do so, including implementing the following practices: \n\n* Adopting a **remote-first model** allowing us to recruit diverse talent outside Utah\n* Partnering with **diversity, inclusion, refugee and veteran focused specific job boards**, organizations and communities\n* Providing **transparent details** on compensation and benefits on job postings\n* Utilizing an anonymous applicant screening tool to **eliminate unconscious bias in our hiring process**\n\nTo foster inclusion and continuously make Cotopaxi a better place to work for all, we’ve',
                  ],
                },
              ],
            },
          },
        ],
        bookmarked: false,
        score: 0,
        ai_score: 0,
        max_score: 0,
        ai_answered: true,
        user_answered: false,
        not_started: false,
      },
      sectionGroupId: 'csg_m3dt64ix15uiap6e',
      sectionId: 'cs_fqiwgmgebqp9il2e',
    },
  },
};

const AIDetailStory = (args: QuestionnaireAIDetailProps) => {
  const { aiDetails } = args;
  return (
    <div className={'w-[407px] h-screen'}>
      <QuestionnaireContextMockProvider>
        <QuestionnaireAIDetail aiDetails={aiDetails} />
      </QuestionnaireContextMockProvider>
    </div>
  );
};
