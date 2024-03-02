export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockData(set?: string) {
  let mockData: any;

  switch (set) {
    case 'rei_pia_2024':
      mockData = Object.assign({}, rei_pia_2024);
      break;
    default:
      mockData = Object.assign({}, rei_pia_2023);
  }

  for (const sectionKey in mockData.definition.sections) {
    const section = mockData.definition.sections[sectionKey];

    for (const followUpKey in section.follow_up) {
      const followUp = section.follow_up[followUpKey];
      let mockAnswer;

      switch (followUp.component) {
        case 'yes_no':
          mockAnswer = getRandomNumber(0, 21) % 2 === 0;
          break;
        case 'select':
          mockAnswer = followUp.options[getRandomNumber(0, followUp.options.length - 1)];
          break;
        case 'multi_text': {
          const numOptions = getRandomNumber(1, followUp.options.length);
          mockAnswer = [];
          for (let i = 0; i < numOptions; i++) {
            mockAnswer.push(`Mock answer ${i} for ${followUpKey}`);
          }
          break;
        }
        case 'multi_select': {
          const numOptions = getRandomNumber(0, followUp.options.length);
          mockAnswer = followUp.options.slice(0, numOptions);
          break;
        }
        case 'text':
        case 'textarea':
          mockAnswer = 'Mock answer';
          break;
        case 'number':
          mockAnswer = getRandomNumber(1, 100);
          break;
        default:
          mockAnswer = 'N/A';
      }

      // Randomly add an AI response
      if (getRandomNumber(0, 21) % 2 === 0) {
        followUp.ai_response = { answer: mockAnswer };
      }

      followUp.value = mockAnswer;
    }
  }

  return mockData;
}

export const rei_pia_2024 = {
  name: 'rei_pia_2024',
  description: "2024 version of REI's product impact assessment",
  type: 'COMPLIANCE',
  definition: {
    title: 'REI 2024 Product Impact Assessment',
    version: 2024,
    image_url: '',
    intro_markdown: '',
    sections: {
      GEN: {
        title: 'Brand Information',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 0,
        section_type: 'Practices',
        follow_up: {
          'GEN-0:1': {
            idx: 0,
            prompt: 'What is your REI Vendor ID?',
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'GEN-0:2': {
            idx: 1,
            prompt: 'What is your Vendor Name?',
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'GEN-0:3': {
            idx: 2,
            prompt: 'For which brand(s) are you completing the assessment?',
            tooltip: '',
            component: 'multi_text',
            options: [],
            placeholder: '',
          },
          'GEN-1:1': {
            idx: 3,
            prompt: 'List the name, email, and title of the person completing this assessment.',
            tooltip: '',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-1:2': {
            idx: 4,
            prompt: "List your brand's Product Sustainability Contact, if different from your response in the previous question",
            tooltip: 'Please include name, email, and title',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-1:3': {
            idx: 5,
            prompt: "List your brand's Diversity, Equity, & Inclusion (DEI) Contact, if different from your response in the previous question(s)",
            tooltip: 'Please include name, email, and title',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-1:4': {
            idx: 6,
            prompt: 'List any additional contacts for Product Sustainability',
            tooltip: 'Please include names, emails, and titles',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-1:5': {
            idx: 7,
            prompt: 'List any additional contacts for Diversity, Equity, & Inclusion (DEI)',
            tooltip: 'Please include names, emails, and titles',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-1:6': {
            idx: 8,
            prompt: 'List any additional contacts that supported filling out this assessment',
            tooltip: 'Please include names, emails, and titles',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'GEN-2': {
            idx: 9,
            prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
            tooltip:
              'Note: Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
            component: 'select',
            options: ['0', '1', '2-5', '6-10', '11-25', '26-50', '51+'],
            placeholder: '',
          },
          'GEN-3': {
            idx: 10,
            prompt:
              'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
            tooltip:
              'Note: This is not an exhaustive list of product categories sold at REI. Your selection below will determine whether you see questions in the online version of the assessment that are specifically related to each product category.',
            component: 'multi_select',
            options: [
              'Apparel',
              'Accessories (textile-based)',
              'Cookware',
              'Footwear',
              'Headwear',
              'Other textile products',
              'Packs',
              'Products that contain down',
              'Products that contain leather',
              'Products that contain wool',
              'Ski wax',
              'Sleeping bags',
              'Sunscreens or other formulated sun-protection products',
              'Tents',
              'Treatments for gear and clothing',
              'Water bottles, food containers, dinnerware or utensils',
              'None of the above',
            ],
            placeholder: '',
          },
        },
      },
      MFG: {
        title: 'Manufacturing Code of Conduct & Responsible Sourcing',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 1,
        section_type: 'Practices',
        follow_up: {
          'MFG-0': {
            idx: 11,
            prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-1': {
            idx: 12,
            prompt:
              'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.\n\nPlease indicate which of the following topics are included in your manufacturing code of conduct.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Transparency',
              'Non-discrimination',
              'Harassment and Abuse',
              'Recruitment and Hiring',
              'Freedom of Association & Collective Bargaining',
              'Hours of Work',
              'Compensation',
              'Health & Safety',
              'Environment',
              'Community',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas.',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                Transparency: 0.1,
                'Non-discrimination': 0.1,
                'Harassment and Abuse': 0.1,
                'Recruitment and Hiring': 0.1,
                'Freedom of Association & Collective Bargaining': 0.1,
                'Hours of Work': 0.1,
                Compensation: 0.1,
                'Health & Safety': 0.1,
                Environment: 0.1,
                Community: 0.1,
                Other: 0.1,
              },
            },
          },
          'MFG-2': {
            idx: 13,
            prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Tier 1 (finished product manufacturers)',
              'Tier 2 (finished material/subcomponent manufacturers)',
              'Tier 3 (raw material processors)',
              'Tier 4 (raw material suppliers)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Tier 1 (finished product manufacturers)': 0.25,
                'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                'Tier 3 (raw material processors)': 0.25,
                'Tier 4 (raw material suppliers)': 0.25,
              },
            },
          },
          'MFG-3': {
            idx: 14,
            prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-4': {
            idx: 15,
            prompt:
              'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-5': {
            idx: 16,
            prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe. Limit your response to 100 words or less.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-6:1': {
            idx: 17,
            prompt:
              'Approximately what percentage of your Tier 1 (finished product manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'select',
            options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-5',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
            },
          },
          'MFG-6:2': {
            idx: 18,
            prompt:
              'Approximately what percentage of your Tier 2 (finished material/subcomponent manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'select',
            options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-5',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
            },
          },
          'MFG-6:3': {
            idx: 19,
            prompt:
              'Approximately what percentage of your Tier 3 (raw material processors) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'select',
            options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-5',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
            },
          },
          'MFG-6:4': {
            idx: 20,
            prompt:
              'Approximately what percentage of your Tier 4 (raw material suppliers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'select',
            options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-5',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
            },
          },
          'MFG-7': {
            idx: 21,
            prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-8': {
            idx: 22,
            prompt: 'Is your brand’s supplier list publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-9': {
            idx: 23,
            prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Tier 1 (finished product manufacturers)',
              'Tier 2 (finished material/subcomponent manufacturers)',
              'Tier 3 (raw material processors)',
              'Tier 4 (raw material suppliers)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-8',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-8').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Tier 1 (finished product manufacturers)': 0.25,
                'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                'Tier 3 (raw material processors)': 0.25,
                'Tier 4 (raw material suppliers)': 0.25,
              },
            },
          },
          'MFG-10': {
            idx: 24,
            prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-11': {
            idx: 25,
            prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      CHEM: {
        title: 'Restricted Substances List & Chemicals Management',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 2,
        section_type: 'Materials',
        follow_up: {
          'CHEM-0': {
            idx: 26,
            prompt:
              'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a Restricted Substances List (RSL) that specifies which substances are banned or restricted in products and that meets or exceeds all applicable regulatory requirements.\n\nDoes your brand have an RSL in place for the products you supply to REI?',
            tooltip:
              'Note: Brands that sell products in categories regulated by the U.S. Food and Drug Administration (FDA) or U.S. Department of Agriculture (USDA) do not need to have a separate RSL for their products in these categories.',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-1': {
            idx: 27,
            prompt: 'Does your brand have a means of verifying that products you supply to REI comply with your RSL?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe how your brand verifies that products you supply to REI comply with your RSL.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-2': {
            idx: 28,
            prompt: 'Please indicate whether your brand’s chemicals management program consists of the following components that aid in verifying compliance with your RSL.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL and/or other standards for managing chemicals or ingredients.',
              'An input-stream management system aimed at managing the chemistry and/or ingredients entering the manufacturing process.',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'CHEM-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL and/or other standards for managing chemicals or ingredients.': 0.5,
                'An input-stream management system aimed at managing the chemistry and/or ingredients entering the manufacturing process.': 0.5,
              },
            },
          },
          'CHEM-3': {
            idx: 29,
            prompt: 'Is your RSL aligned to an internationally recognized third-party RSL?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'CHEM-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-3A': {
            idx: 30,
            prompt: 'Please specify which third-party RSL(s).',
            tooltip: '',
            component: 'multi_select',
            options: ['American Apparel and Footwear Association (AAFA)', 'AFIRM', 'bluesign', 'ZDHC MSRL', 'REACH', 'OEKO-TEX', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please specify any additional third party RSL(s)',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-0',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'CHEM-3',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true and $lookup(sections.*.follow_up, 'CHEM-3').value = true",
            },
          },
          'CHEM-4': {
            idx: 31,
            prompt: 'Is your brand’s RSL publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-0',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      GHG: {
        title: 'GHG Emissions & Climate',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 3,
        section_type: 'Environment',
        follow_up: {
          'GHG-1': {
            idx: 32,
            prompt:
              'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions, set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.\n\nHas your brand measured its carbon footprint this year or within the last calendar year?',
            tooltip: 'Note: The term “carbon” is used here as a generally accepted shorthand for “greenhouse gas”.',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-2': {
            idx: 33,
            prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
            tooltip: '',
            component: 'select',
            options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard', 'No'],
            placeholder: '',
            additional_context: {
              prompt: 'If you used a different standard than the GHG Protocol, please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
              operator: 'has',
              component: 'textarea',
              comparison: 'Yes, using another GHG accounting standard',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                'Yes, using the GHG Protocol': 1,
                'Yes, using another GHG accounting standard': 0.5,
                No: 0,
              },
            },
          },
          'GHG-3': {
            idx: 34,
            prompt: 'Please indicate which components of your operations were included in your carbon footprint.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilities',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
              'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
              },
            },
          },
          'GHG-4': {
            idx: 35,
            prompt: "Has your brand's carbon footprint been verified by an indepenedent third-party?",
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink to the verification document, if available:',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-5': {
            idx: 36,
            prompt: 'Does your brand report its carbon footprint publicly?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink to your most recent public report:',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-6': {
            idx: 37,
            prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
            tooltip: '',
            component: 'select',
            options: [
              'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
              'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
              'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
              'No',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.': 1,
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.': 0.5,
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.': 0.2,
                No: 0,
              },
            },
          },
          'GHG-6A': {
            idx: 38,
            prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
            tooltip: '',
            component: 'multi_select',
            options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe. Limit your response to 100 words or less.',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-6',
                  operator: 'has',
                  values: [
                    'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                    'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                    'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                  ],
                },
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression:
                "true in $map($lookup(sections.*.follow_up, 'GHG-6').value, function($v) { $v in ['Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.'] }) and $lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'We use spend-based emissions factors': 0.5,
                'We use material-based emissions factors': 1,
                Other: 0,
              },
            },
          },
          'GHG-7': {
            idx: 39,
            prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-7A': {
            idx: 40,
            prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilities',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
              'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
              },
            },
          },
          'GHG-7B:1': {
            idx: 41,
            prompt:
              'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat percent reduction are you aiming to achieve from your baseline year to your target year?',
            tooltip: '',
            component: 'percent_slider',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
          },
          'GHG-7B:2': {
            idx: 42,
            prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your baseline year?',
            tooltip: '',
            component: 'number',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
          },
          'GHG-7B:3': {
            idx: 43,
            prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your target year?',
            tooltip: '',
            component: 'number',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
          },
          'GHG-7C': {
            idx: 44,
            prompt:
              'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
            tooltip: '',
            component: 'select',
            options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              score_map: {
                'Absolute emissions reduction': 1,
                'Reduction in emissions intensity': 0,
              },
            },
          },
          'GHG-8': {
            idx: 45,
            prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
            tooltip:
              'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5 degrees C above pre-industrial levels',
            component: 'select',
            options: [
              'Yes, our target(s) has been approved by the SBTi',
              'No, but our target(s) is currently being evaluated by the SBTi for approval',
              'No, but we’ve aligned our target(s) with the SBTi’s guidance',
              'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
              'No',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              score_map: {
                'Yes, our target(s) has been approved by the SBTi': 1,
                'No, but our target(s) is currently being evaluated by the SBTi for approval': 0.8,
                'No, but we’ve aligned our target(s) with the SBTi’s guidance': 0.5,
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets': 0.3,
                No: 0,
              },
            },
          },
          'GHG-9': {
            idx: 46,
            prompt: 'Has your brand established an emissions reduction action plan or roadmap that guides your efforts to achieve your reduction targets?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-9A': {
            idx: 47,
            prompt: 'What are the primary components of your emissions reduction action plan?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Use of low-carbon materials or ingredients in products',
              'Use of clean energy in product manufacturing',
              'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)',
              'Minimization of materials waste in manufacturing',
              'Energy efficiency in manufacturing',
              'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)',
              'Supporting customers in reducing emissions during product use',
              'Reduction in emissions from air freight',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-9',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-9').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Use of low-carbon materials or ingredients in products': 0.125,
                'Use of clean energy in product manufacturing': 0.125,
                'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)': 0.125,
                'Minimization of materials waste in manufacturing': 0.125,
                'Energy efficiency in manufacturing': 0.125,
                'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)': 0.125,
                'Supporting customers in reducing emissions during product use': 0.125,
                'Reduction in emissions from air freight': 0.125,
                Other: 0.125,
              },
            },
          },
          'GHG-10': {
            idx: 48,
            prompt:
              'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
            tooltip: '',
            component: 'select',
            options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
            placeholder: '',
            rubric: {
              score_map: {
                'Yes, a 1-25% reduction': 0.2,
                'Yes, a 26-50% reduction': 0.4,
                'Yes, a 51-75% reduction': 0.6,
                'Yes, a 76-99% reduction': 0.8,
                'Yes, a 100% reduction': 1,
                No: 0,
              },
            },
          },
          'GHG-11': {
            idx: 49,
            prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-12': {
            idx: 50,
            prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilitie',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
              'All or a portion of scope 3 emissions, including all the products you sell to REI',
              'Other',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-11',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilitie': 0.2,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.2,
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI': 0.2,
                'All or a portion of scope 3 emissions, including all the products you sell to REI': 0.2,
                Other: 0.2,
              },
            },
          },
          'GHG-13': {
            idx: 51,
            prompt:
              'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
            tooltip: '',
            component: 'select',
            options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard', 'No'],
            placeholder: '',
            additional_context: {
              prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
              operator: '==',
              component: 'textarea',
              comparison: 'Yes, we’re certified to another carbon/climate neutrality standard',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-11',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
            },
            rubric: {
              score_map: {
                'Yes, we’re Climate Neutral Certified': 1,
                'Yes, we’re certified to another carbon/climate neutrality standard': 1,
                No: 0,
              },
            },
          },
        },
      },
      PFAS: {
        title: 'Per- and Polyfluoroalkyl Substances',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 4,
        section_type: 'Materials',
        follow_up: {
          'PFAS-1': {
            idx: 52,
            prompt:
              'The REI Product Impact Standards include the existing expectation that all apparel, footwear, packs, sleeping bags or tents supplied to REI be free of long-chain PFAS and that all ski wax and gear & clothing treatments supplied to REI be free of long-chain and short-chain PFAS.\n\nDoes your brand have a formal policy/target in place regarding the presence of PFAS in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PFAS-2': {
            idx: 53,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: [
                'Apparel',
                'Accessories (textile-based)',
                'Cookware',
                'Footwear',
                'Headwear',
                'Other textile products',
                'Packs',
                'Ski wax',
                'Sleeping bags',
                'Tents',
                'Treatments for gear and clothing',
              ],
            },
          ],
          expression:
            "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel','Accessories (textile-based)','Cookware','Footwear','Headwear','Other textile products','Packs','Ski wax','Sleeping bags','Tents','Treatments for gear and clothing'] })",
        },
      },
      BPA: {
        title: 'Bisphenol A',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 5,
        section_type: 'Materials',
        follow_up: {
          'BPA-1': {
            idx: 54,
            prompt:
              'The REI Product Impact Standards include the expectation that products supplied to REI that are meant to come in direct contact with food or liquids for human consumption be free of Bisphenol A (BPA).\n\nDoes your brand have a formal policy/target in place regarding the use of BPA in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'BPA-2': {
            idx: 55,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'BPA-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'BPA-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Cookware', 'Water bottles, food containers, dinnerware or utensils'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Cookware','Water bottles, food containers, dinnerware or utensils'] })",
        },
      },
      SUN: {
        title: 'Sunscreen Ingredients',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 6,
        section_type: 'Materials',
        follow_up: {
          'SUN-1': {
            idx: 56,
            prompt:
              'The REI Product Impact Standards include the expectation that sunscreens and formulated sun-protection products supplied to REI be free of oxybenzone and contain only active ingredients that are generally recognized as safe and effective.\n\nDoes your brand have a formal policy/target in place regarding the use of oxybenzone in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'SUN-2': {
            idx: 57,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'SUN-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'SUN-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'SUN-3': {
            idx: 58,
            prompt: 'Does your brand have a formal policy/target in place that includes avoiding the use of other active sunscreen ingredients?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please indicate which other active sunscreen ingredients your brand formally avoids using.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Sunscreens or other formulated sun-protection products'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Sunscreens or other formulated sun-protection products'] })",
        },
      },
      FR: {
        title: 'Flame Retardant (FR) Chemicals',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 7,
        section_type: 'Materials',
        follow_up: {
          'FR-1': {
            idx: 59,
            prompt:
              'The REI Product Impact Standards include the expectation that all camping shelters supplied to REI be free of prohibited flame retardant (FR) chemicals.\n(See REI’s Product Impact Standards for a list of prohibited FR chemicals.)\n\nDoes your brand have a formal policy/target in place regarding the use of FR chemicals in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'FR-2': {
            idx: 60,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'FR-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'FR-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'FR-3': {
            idx: 61,
            prompt: 'Does your brand have plans to transition away from the use of all flame retardants in your tents?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Tents'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Tents'] })",
        },
      },
      DWN: {
        title: 'Down',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 8,
        section_type: 'Materials',
        follow_up: {
          'DWN-1': {
            idx: 62,
            prompt:
              'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin down meet standards that safeguard the well-being of ducks and geese in the down supply chain and prohibit live-plucking and force-feeding.\n\nDoes your brand have a formal policy/target in place regarding animal welfare in your down supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'DWN-2': {
            idx: 63,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'DWN-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'DWN-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Products that contain down'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Products that contain down'] })",
        },
      },
      WL: {
        title: 'Wool',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 9,
        section_type: 'Materials',
        follow_up: {
          'WL-1': {
            idx: 64,
            prompt:
              'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin wool meet standards that safeguard the well-being of sheep in the wool supply chain and prohibit mulesing.\n\nDoes your brand have a formal policy/target in place regarding animal welfare in your wool supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'WL-2': {
            idx: 65,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'WL-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'WL-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Products that contain wool'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Products that contain wool'] })",
        },
      },
      AFL: {
        title: 'Animal Fur & Exotic Leather',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 10,
        section_type: 'Materials',
        follow_up: {
          'AFL-1': {
            idx: 66,
            prompt:
              'The REI Product Impact Standards include the expectation that products supplied to REI do not contain animal fur or exotic leather. (See REI’s Product Impact Standards for a definition of exotic leather.)\n\nDoes your brand have a formal policy/target in place regarding the use of animal fur and exotic leather in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'AFL-2': {
            idx: 67,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'AFL-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'AFL-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'AFL-3': {
            idx: 68,
            prompt:
              'Does your brand have a formal policy/target in place regarding the geographic origin of the leather used in your products (e.g., avoiding sourcing from regions undergoing deforestation, etc.)?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'AFL-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'AFL-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Apparel', 'Products that contain leather'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel','Products that contain leather'] })",
        },
      },
      APP: {
        title: 'Diversity & Inclusion: Cultural Appropriation',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 11,
        section_type: 'D & I',
        follow_up: {
          'APP-1': {
            idx: 69,
            prompt:
              'As part of the REI Product Impact Standards, REI has established several expectations related to diversity and inclusion that we would like brand partners to implement. The following questions are intended to understand brand partners’ current state in implementing these practices.\n\nThe REI Product Impact Standards include the expectation that each brand partner has in place creative controls to prevent cultural appropriation: plagiarism, theft and/or inappropriate use of designs, patterns, forms, materials, words/names, etc. that are culturally meaningful to and/or originated from underrepresented communities. These creative controls should ensure that the development of products, promotions, and marketing used during annual cultural moments (e.g., Pride, Black History Month etc.) is shaped by members of the represented communities.\n\nWhich option below best describes how your brand is actively mitigating cultural appropriation, as of Spring 2024 product lines and marketing?',
            tooltip: '',
            component: 'select',
            options: [
              'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
              'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
              'We do not currently have creative controls in place to address cultural appropriation',
            ],
            placeholder: '',
            rubric: {
              score_map: {
                'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation': 1,
                'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process': 0.5,
                'We do not currently have creative controls in place to address cultural appropriation': 0,
              },
            },
          },
          'APP-2': {
            idx: 70,
            prompt: 'Which creative controls is your brand currently using to prevent cultural appropriation?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Hiring BIPOC creatives or design collectives',
              'Partnering with Native/Indigenous consultants or organizations (tribal organizations, nonprofits, etc.) to ensure appropriate use of cultural designs',
              'Philanthropy/grantmaking to Native/Indigenous causes',
              'Transparency about the source of a design’s inspiration (on product labeling, PI provided to REI, your website, etc.)',
              'Clarity around source of product names that are derived from cultural traditions, places, or language',
              'Use of marketing channels (website, social media, catalogue, etc.) to elevate Native artists, issues impacting tribal communities, etc.',
              'Reviewing potential product concerns with our REI Merchandising and/or Inclusion Marketing contacts',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'APP-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
                    'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'APP-1').value, function($v) { $v in ['We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation','We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Hiring BIPOC creatives or design collectives': 0.125,
                'Partnering with Native/Indigenous consultants or organizations (tribal organizations, nonprofits, etc.) to ensure appropriate use of cultural designs': 0.125,
                'Philanthropy/grantmaking to Native/Indigenous causes': 0.125,
                'Transparency about the source of a design’s inspiration (on product labeling, PI provided to REI, your website, etc.)': 0.125,
                'Clarity around source of product names that are derived from cultural traditions, places, or language': 0.125,
                'Use of marketing channels (website, social media, catalogue, etc.) to elevate Native artists, issues impacting tribal communities, etc.': 0.125,
                'Reviewing potential product concerns with our REI Merchandising and/or Inclusion Marketing contacts': 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      MKT: {
        title: 'Diversity & Inclusion: Marketing Diversity',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 12,
        section_type: 'D & I',
        follow_up: {
          'MKT-1': {
            idx: 71,
            prompt:
              'The REI Product Impact Standards include the expectation that each brand partner has in place guidelines for marketing assets, photo casting and production that ensure diverse and inclusive representation across race, age, gender identity/expression, body size and disability. Content supplied to REI by influencers and affiliate media, as well as photography, marketing copy, and other content, shall reflect the same inclusive representation.\n\nWhich option below best describes your brand’s status, as of Spring 2023 product lines and marketing, in addressing diverse and inclusive representation in its marketing and photo casting?',
            tooltip: '',
            component: 'select',
            options: [
              'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
              'We have some practices in place, but do not yet have formal guidelines or targets in place',
              'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
            ],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: 'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
              placeholder: '',
            },
            rubric: {
              score_map: {
                'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions': 1,
                'We have some practices in place, but do not yet have formal guidelines or targets in place': 0.5,
                'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography': 0,
              },
            },
          },
          'MKT-2': {
            idx: 72,
            prompt: 'What strategies is your brand currently using as part of its guidelines?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Representation targets (e.g., % representation of specific cohorts)',
              'Inclusive intake process (e.g., on casting questionnaire or portal)',
              'Casting calls specific to diverse talent',
              'Outreach to/partnerships with diversity organizations',
              '“Behind the camera” recruitment initiatives (photographers, producers, etc.)',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MKT-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                    'We have some practices in place, but do not yet have formal guidelines or targets in place',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Representation targets (e.g., % representation of specific cohorts)': 0.125,
                'Inclusive intake process (e.g., on casting questionnaire or portal)': 0.125,
                'Casting calls specific to diverse talent': 0.125,
                'Outreach to/partnerships with diversity organizations': 0.125,
                '“Behind the camera” recruitment initiatives (photographers, producers, etc.)': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                Other: 0.125,
              },
            },
          },
          'MKT-3': {
            idx: 73,
            prompt: 'Which dimensions of diversity or other topics do your guidelines address?',
            tooltip: '',
            component: 'multi_select',
            options: ['Race', 'Gender', 'LGBTQ+', 'Disability', 'Military status', 'Faith tradition/religion', 'Body size', 'Age', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MKT-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                    'We have some practices in place, but do not yet have formal guidelines or targets in place',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                Race: 0.125,
                Gender: 0.125,
                'LGBTQ+': 0.125,
                Disability: 0.125,
                'Military status': 0.125,
                'Faith tradition/religion': 0.125,
                'Body size': 0.125,
                Age: 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      COP: {
        title: 'Diversity & Inclusion: Inclusive Copy',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 13,
        section_type: 'D & I',
        follow_up: {
          'COP-1': {
            idx: 74,
            prompt:
              'The REI Product Impact Standards include the expectation that each brand partner has in place creative controls to prevent the use of language in naming conventions (as applied to product, collection, color, or design); product information; marketing assets, etc., that negatively impact underrepresented groups (e.g., by reinforcing stereotypes, utilizing slurs, coopting cultural language, etc.).\n\nDoes your brand currently have in place policies or creative controls related to inclusive product copy?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'COP-2': {
            idx: 75,
            prompt: 'Which of the following policies or creative controls do you utilize as it relates to inclusive product copy?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Diversity & inclusion guidance in my brand’s style guide',
              'Use of other diversity style guides (e.g., NABJ Style Guide, GLAAD Media Guide, etc.)',
              'Diverse pool of product testers',
              'Feedback from employee resource groups or similar',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Participating in communities of practice related to inclusive copy',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'COP-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'COP-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Diversity & inclusion guidance in my brand’s style guide': 0.125,
                'Use of other diversity style guides (e.g., NABJ Style Guide, GLAAD Media Guide, etc.)': 0.125,
                'Diverse pool of product testers': 0.125,
                'Feedback from employee resource groups or similar': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                'Participating in communities of practice related to inclusive copy': 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      COL: {
        title: 'Diversity & Inclusion: Inclusive Colorways',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 14,
        section_type: 'D & I',
        follow_up: {
          'COL-1': {
            idx: 76,
            prompt:
              'The REI Product Impact Standards include the expectation that all wearable products supplied to REI be available in colorways appropriate for a range of skin tones/complexions; and that product marketed as ‘Nude’ including those with embellishments and/or linings intended to give the impression of bare skin or to mimic skin tone, be available in a range of tones.\n\nWhich of the following describes the active creative controls your brand has in place to ensure colorways of wearable products are appropriate for a variety of skin tones/complexions?',
            tooltip: '',
            component: 'select',
            options: ['We have creative controls in place', 'We do NOT have creative controls in place'],
            placeholder: '',
            rubric: {
              score_map: {
                'We have creative controls in place': 1,
                'We do NOT have creative controls in place': 0,
              },
            },
          },
          'COL-2': {
            idx: 77,
            prompt: 'Which of the following strategies is your brand currently using to address inclusion in its color offering?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Offering a range of tones within products marketed as ‘Nude’ or intended to mimic skin',
              'Offering a range of tones for product embellishments and/or linings intended to give the impression of bare skin',
              'Diverse pool of product testers',
              'Feedback from employee resource groups or similar',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Testing to ensure the availability of colorways to complement a range of complexions',
              'Participating in communities of practice related to inclusive design',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Offering a range of tones within products marketed as ‘Nude’ or intended to mimic skin': 0.125,
                'Offering a range of tones for product embellishments and/or linings intended to give the impression of bare skin': 0.125,
                'Diverse pool of product testers': 0.125,
                'Feedback from employee resource groups or similar': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                'Testing to ensure the availability of colorways to complement a range of complexions': 0.125,
                'Participating in communities of practice related to inclusive design': 0.125,
                Other: 0.125,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Apparel'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel'] })",
        },
      },
      ISS: {
        title: 'Diversity & Inclusion: Inclusive Sizing',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 15,
        section_type: 'D & I',
        follow_up: {
          'ISS-1': {
            idx: 78,
            prompt:
              'The REI Product Impact Standard has an expectation that each brand partner that sells wearable products offered in a variety of sizes to provide REI at least one sample size outside the standard size range for marketing photography. \n\nAs a standard practice, does your brand currently send REI at least one sample size outside the standard size range for marketing photography of wearable products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'ISS-2': {
            idx: 79,
            prompt:
              'The REI Product Impact Standards has an expectation that all brand partners who sell wearable products offered in a variety of sizes maintain the same price within a style regardless of size. \n\nDoes your brand currently maintain the same price across wearable products offered in a variety of sizes regardless of size?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      DHT: {
        title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 16,
        section_type: 'D & I',
        follow_up: {
          'DHT-1': {
            idx: 80,
            prompt:
              'The REI Product Impact Standards has an expectation that each brand partner that produces headwear (helmets, hats, headbands, hoods, balaclavas, hijab, etc.) to have in place guidelines for ensuring an inclusive assortment for a variety of hair types, including higher-volume and textured hair.\n\nWhich of the below options best represents how your brand is approaching the Diverse Hair Type Inclusion expectation?',
            tooltip: '',
            component: 'select',
            options: ['We have successfully implemented guidelines', 'We have not implemented guidelines', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            rubric: {
              score_map: {
                'We have successfully implemented guidelines': 1,
                'We have not implemented guidelines': 0,
                Other: 0.5,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Headwear'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Headwear'] })",
        },
      },
      INC: {
        title: 'Diversity & Inclusion: General',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 17,
        section_type: 'D & I',
        follow_up: {
          'INC-1': {
            idx: 81,
            prompt:
              'This subset of questions is related to diversity, equity and inclusion practices at your organization, not limited to the product space. As REI seeks to progress a more inclusive outdoor industry, we are hoping to understand where brands are at.\n\nDoes your brand have a policy/policies in place regarding nondiscrimination as related to employment, customer service, grant-making or other areas?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'INC-2': {
            idx: 82,
            prompt: 'Does your policy explicitly prohibit discrimination based on both sexual orientation and gender identity?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'INC-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'INC-3': {
            idx: 83,
            prompt: 'Please select one the following to describe the reach of your nondiscrimination policy.',
            tooltip: '',
            component: 'select',
            options: ['Applies to all employees/customers regardless of location', 'Policy varies by country', 'Policy varies by US state', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'INC-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
            },
            rubric: {
              score_map: {
                'Applies to all employees/customers regardless of location': 1,
                'Policy varies by country': 0,
                'Policy varies by US state': 0,
                Other: 0,
              },
            },
          },
          'INC-4': {
            idx: 84,
            prompt: "Does your brand have/plan to create product that is designed beyond the gender binary (i.e. not women or men's only)?",
            tooltip: '',
            component: 'select',
            options: ['Yes', 'No', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            rubric: {
              score_map: {
                Yes: 1,
                No: 0,
                Other: 0,
              },
            },
          },
          'INC-5': {
            idx: 85,
            prompt: 'Does your brand have in place a policy or practice for pay equity across gender and race?',
            tooltip: '',
            component: 'select',
            options: ['Yes', 'No', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            rubric: {
              score_map: {
                Yes: 1,
                No: 0,
                Other: 0,
              },
            },
          },
          'INC-6': {
            idx: 86,
            prompt: 'Does your brand have in place a policy for healthcare explicitly inclusive of the LGBTQ+ community?',
            tooltip: '',
            component: 'select',
            options: ['Yes', 'No', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            rubric: {
              score_map: {
                Yes: 1,
                No: 0,
                Other: 0,
              },
            },
          },
        },
      },
      PSA: {
        title: 'Product Sustainability & Preferred Attributes',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 18,
        section_type: 'Product',
        follow_up: {
          'PSA-1': {
            idx: 87,
            prompt: 'Does your brand utilize a formal methodology or tool to measure the sustainability of your materials and/or finished products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe. Limit your response to 100 words or less.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PSA-2:1a': {
            idx: 88,
            prompt:
              "For the following questions, please indicate whether your brand has any policies or targets in place for any of REI's preferred sustainability attributes and whether those policies or targets are publicly available.\n\nDo you have a policy/target in place for bluesign®?",
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:1b': {
            idx: 89,
            prompt: 'Is your bluesign® policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:1a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:1a').value = true",
            },
          },
          'PSA-2:2a': {
            idx: 90,
            prompt: 'Do you have a policy/target in place for "Certified organic/organic ingredients"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:2b': {
            idx: 91,
            prompt: 'Is your "Certified organic/organic ingredients" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:2a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:2a').value = true",
            },
          },
          'PSA-2:3a': {
            idx: 92,
            prompt: 'Do you have a policy/target in place for "Climate Neutral Certified"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:3b': {
            idx: 93,
            prompt: 'Is your "Climate Neutral Certified" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:3a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:3a').value = true",
            },
          },
          'PSA-2:4a': {
            idx: 94,
            prompt: 'Do you have a policy/target in place for "Fair trade certification"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:4b': {
            idx: 95,
            prompt: 'Is your "Fair trade certification" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:4a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:4a').value = true",
            },
          },
          'PSA-2:5a': {
            idx: 96,
            prompt: 'Do you have a policy/target in place for "Forest Stewardship Council certification (FSC)"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:5b': {
            idx: 97,
            prompt: 'Is your "Forest Stewardship Council certification (FSC)" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:5a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:5a').value = true",
            },
          },
          'PSA-2:6a': {
            idx: 98,
            prompt: 'Do you have a policy/target in place for "Leather Working Group certification (LWG)"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:6b': {
            idx: 99,
            prompt: 'Is your "Leather Working Group certification (LWG)" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:6a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:6a').value = true",
            },
          },
          'PSA-2:7a': {
            idx: 100,
            prompt: 'Do you have a policy/target in place for "Organically grown cotton"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:7b': {
            idx: 101,
            prompt: 'Is your "Organically grown cotton" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:7a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:7a').value = true",
            },
          },
          'PSA-2:8a': {
            idx: 102,
            prompt: 'Do you have a policy/target in place for "Recycled materials"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:8b': {
            idx: 103,
            prompt: 'Is your "Recycled materials" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:8a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:8a').value = true",
            },
          },
          'PSA-2:9a': {
            idx: 104,
            prompt: 'Do you have a policy/target in place for "Responsibly sourced down"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:9b': {
            idx: 105,
            prompt: 'Is your "Responsibly sourced down" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:9a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:9a').value = true",
            },
          },
          'PSA-2:10a': {
            idx: 106,
            prompt: 'Do you have a policy/target in place for "Responsibly sourced wool"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PSA-2:10b': {
            idx: 107,
            prompt: 'Is your "Responsibly sourced wool" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PSA-2:10a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PSA-2:10a').value = true",
            },
          },
        },
      },
      PKG: {
        title: 'Packaging - General',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 19,
        section_type: 'Product',
        follow_up: {
          'PKG-1:1a': {
            idx: 108,
            prompt:
              'For the following questions, please indicate whether your brand has formal policies/targets in place regarding the use of more sustainable product packaging.\n\nDo you have a policy/target in place for "FSC certified packaging materials"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:1b': {
            idx: 109,
            prompt: 'Is your "FSC certified packaging materials" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:1a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:1a').value = true",
            },
          },
          'PKG-1:2a': {
            idx: 110,
            prompt: 'Do you have a policy/target in place for "Recycled packaging materials"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:2b': {
            idx: 111,
            prompt: 'Is your "Recycled packaging materials" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:2a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:2a').value = true",
            },
          },
          'PKG-1:3a': {
            idx: 112,
            prompt: 'Do you have a policy/target in place for "Recyclable packaging"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:3b': {
            idx: 113,
            prompt: 'Is your "Recyclable packaging" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:3a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:3a').value = true",
            },
          },
          'PKG-1:4a': {
            idx: 114,
            prompt: 'Do you have a policy/target in place for "Reduced packaging volume"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:4b': {
            idx: 115,
            prompt: 'Is your "Reduced packaging volume" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:4a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:4a').value = true",
            },
          },
          'PKG-1:5a': {
            idx: 116,
            prompt: 'Do you have a policy/target in place for "How2Recycle logo on packaging"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:5b': {
            idx: 117,
            prompt: 'Is your "How2Recycle logo on packaging" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:5a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:5a').value = true",
            },
          },
          'PKG-1:6a': {
            idx: 118,
            prompt: 'Do you have a policy/target in place for "Primary plastic packaging elimination"?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
          },
          'PKG-1:6b': {
            idx: 119,
            prompt: 'Is your "Primary plastic packaging elimination" policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PKG-1:6a',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PKG-1:6a').value = true",
            },
          },
          'PKG-2': {
            idx: 120,
            prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PKG-3': {
            idx: 121,
            prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      APK: {
        title: 'Packaging - Apparel',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 20,
        section_type: 'Product',
        follow_up: {
          'APK-1': {
            idx: 122,
            prompt:
              'REI’s Vendor Guide indicates that brands shipping non-white apparel items to REI should do so without individual polybags. Brands will be charged a $.01/unit polybag recycling fee for apparel items arriving in individual polybags at an REI receiving location. Please refer to REI’s Vendor Guide (available on the REI Partners Site) for more information.\n\nApproximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in individual polybags?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            rubric: {
              score_map: {
                Unknown: 0,
                '0%': 1,
                '1-25%': 0.8,
                '26-50%': 0.6,
                '51-75%': 0.4,
                '76-99%': 0.2,
                '100%': 0,
              },
            },
          },
          'APK-2': {
            idx: 123,
            prompt:
              'Approximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in a master polybag containing all units in each carton?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
          },
          'APK-3': {
            idx: 124,
            prompt: 'If you ship apparel items to REI without individual polybags, how are they packaged?',
            tooltip: '',
            component: 'multi_select',
            options: ['Roll-packed', 'Folded and stacked', 'Flat packed', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'APK-1',
                  operator: 'has',
                  values: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%'],
                },
              ],
              expression: "true in $map($lookup(sections.*.follow_up, 'APK-1').value, function($v) { $v in ['Unknown','0%','1-25%','26-50%','51-75%','76-99%'] })",
            },
          },
          'APK-4': {
            idx: 125,
            prompt: 'Approximately what percentage of the apparel product units that you ship to REI during the coming year will be packaged in individual polybags?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            rubric: {
              score_map: {
                Unknown: 0,
                '0%': 1,
                '1-25%': 0.8,
                '26-50%': 0.6,
                '51-75%': 0.4,
                '76-99%': 0.2,
                '100%': 0,
              },
            },
          },
          'APK-5': {
            idx: 126,
            prompt:
              'As of the Spring 2024 product season, have you implemented as your standard practice the shipment of non-white apparel products to REI without the use of individual polybags?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'APK-6': {
            idx: 127,
            prompt:
              'If your brand is unable to ship non-white apparel items to REI without the use of individual polybags, please describe the key factors that prevent you from doing so.',
            tooltip: '',
            component: 'textarea',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'APK-5',
                  operator: '==',
                  values: ['No'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'APK-5').value = false",
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-3',
              operator: 'has',
              values: ['Apparel'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel'] })",
        },
      },
      PRD: {
        title: 'Product Care, Repair, Reuse & End-of-life',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 21,
        section_type: 'Product',
        follow_up: {
          'PRD-1': {
            idx: 128,
            prompt: 'Does your brand provide customers with guidance for how to use and care for your product in an environmentally responsible manner?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-2': {
            idx: 129,
            prompt: 'Does your brand offer a lifetime warranty for products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide a link to your warranty policy, if available',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-3': {
            idx: 130,
            prompt: 'Does your brand provide product repair services to your customers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-4': {
            idx: 131,
            prompt: 'Are the repairs conducted in-house or through a third-party?',
            tooltip: '',
            component: 'multi_select',
            options: ['Conducted in-house', 'Conducted through a third-party'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'PRD-3',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PRD-3').value = true",
            },
          },
          'PRD-5': {
            idx: 132,
            prompt: 'Does your brand sell used products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-6': {
            idx: 133,
            prompt: 'Does your brand rent or lease products to your customers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-7': {
            idx: 134,
            prompt: 'Does your brand offer solutions for your customers to donate and/or recycle products at end-of-life?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      CRP: {
        title: 'Core Practices',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 22,
        section_type: 'Practices',
        follow_up: {
          'CRP-1': {
            idx: 135,
            prompt: 'Is your brand an active member of or participant in any of the following globally recognized sustainability forums?',
            tooltip: '',
            component: 'multi_select',
            options: [
              '1% for the Planet',
              'American Apparel & Footwear Association: Social Responsibility or Environmental Committees',
              'B Corp',
              'bluesign®',
              'Business Social Compliance Initiative',
              'Change Climate (formerly known as Climate Neutral)',
              'Ethical Trading Initiative',
              'Fair Factories Clearinghouse',
              'Fair Labor Association',
              'Fair Wear Foundation',
              'Footwear Distributors & Retailers of America',
              'Global Social Compliance Programme',
              'Green Chemistry & Commerce Council',
              'International Labour Organization Better Work Programme',
              'Leather Working Group',
              'Outdoor Industry Association Climate Action Corps',
              'Outdoor Industry Association Sustainability Working Group',
              'PeopleForBikes Sustainability Working Group',
              'Retail Industry Leaders Association: Sustainability Workgroups',
              'Science Based Targets Initiative',
              'Snowsports Industries America ClimateUnited',
              'Social and Labor Convergence Program',
              'Sustainable Apparel Coalition',
              'Textile Exchange',
              'The Microfibre Consortium',
              'Zero Discharge of Hazardous Chemicals',
              'Others',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please list here',
              operator: 'has',
              component: 'textarea',
              comparison: 'Others',
              placeholder: '',
            },
            rubric: {
              max_score: 1,
              score_map: {
                '1% for the Planet': 1,
                'American Apparel & Footwear Association: Social Responsibility or Environmental Committees': 1,
                'B Corp': 1,
                'bluesign®': 1,
                'Business Social Compliance Initiative': 1,
                'Change Climate (formerly known as Climate Neutral)': 1,
                'Ethical Trading Initiative': 1,
                'Fair Factories Clearinghouse': 1,
                'Fair Labor Association': 1,
                'Fair Wear Foundation': 1,
                'Footwear Distributors & Retailers of America': 1,
                'Global Social Compliance Programme': 1,
                'Green Chemistry & Commerce Council': 1,
                'International Labour Organization Better Work Programme': 1,
                'Leather Working Group': 1,
                'Outdoor Industry Association Climate Action Corps': 1,
                'Outdoor Industry Association Sustainability Working Group': 1,
                'PeopleForBikes Sustainability Working Group': 1,
                'Retail Industry Leaders Association: Sustainability Workgroups': 1,
                'Science Based Targets Initiative': 1,
                'Snowsports Industries America ClimateUnited': 1,
                'Social and Labor Convergence Program': 1,
                'Sustainable Apparel Coalition': 1,
                'Textile Exchange': 1,
                'The Microfibre Consortium': 1,
                'Zero Discharge of Hazardous Chemicals': 1,
                Others: 1,
              },
            },
          },
          'CRP-2': {
            idx: 136,
            prompt: 'Does your brand have an ongoing commitment to donating a specific portion of your sales or profits to philanthropic causes?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CRP-3': {
            idx: 137,
            prompt:
              'Does your brand publish regular public-facing updates on your sustainability commitments and progress toward those commitments (e.g., annual sustainability report)?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CRP-4': {
            idx: 138,
            prompt:
              '(Optional) We want to explore ways we can best convene and support you and other brands we work with to deliver more inclusive and culturally relevant offerings to our customer, and extend positive impacts to the broader community. What practices, information, or other resources would you be interested in?',
            tooltip: '',
            component: 'multi_select',
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
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
          },
          'CRP-5': {
            idx: 139,
            prompt:
              '(Optional) As part of our ongoing support, we have offered various resources including virtual trainings, panels, and an inclusive design playbook. If you or your team have utilized or attended any of these resources/events, what was helpful and what would you like to see more of?',
            tooltip: '',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
          'CRP-6': {
            idx: 140,
            prompt: '(Optional) If there are any other general comments or questions you would like to share with REI regarding product impact, please enter them below.',
            tooltip: '',
            component: 'textarea',
            options: [],
            placeholder: '',
          },
        },
      },
    },
  },
};

export const rei_pia_2023 = {
  name: '',
  description: '',
  type: 'COMPLIANCE',
  definition: {
    title: '',
    image_url: '',
    intro_markdown: '',
    sections: {
      GEN: {
        title: 'Brand Information',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 0,
        follow_up: {
          'GEN-1': {
            idx: 0,
            prompt: 'For which brand(s) are you completing the assessment?',
            tooltip: '',
            component: 'multi_text',
            options: [],
            placeholder: '',
          },
          'GEN-2': {
            idx: 1,
            prompt: 'Enter the REI vendor number(s) for the brand(s) listed in the previous question.',
            tooltip:
              'Note: In the boxes below, enter the vendor number(s) corresponding with the above brand(s). If entering multiple, ensure the brand names and vendor numbers are entered in the same order. (REI vendor numbers are typically 3-5 digits in length. If you are unsure of your vendor number, it is listed on the POs issued by REI. If you are still unsure of your REI vendor number, please reach out to your Merchandising contact.)',
            component: 'multi_text',
            options: [],
            placeholder: '',
          },
          'GEN-3': {
            idx: 2,
            prompt: 'List the name of the person completing this assessment.',
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'GEN-4': {
            idx: 3,
            prompt: "List your brand's primary contact for product sustainability, if different from your response in the previous question.",
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'GEN-5': {
            idx: 4,
            prompt: "List your brand's primary contact for diversity, equity & inclusion (DEI), if different from your response in the previous two questions.",
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'GEN-6': {
            idx: 5,
            prompt: 'List the email addresses of any other key sustainability contacts at your brand:',
            tooltip: '',
            component: 'multi_text',
            options: [],
            placeholder: '',
          },
          'GEN-6a': {
            idx: 6,
            prompt: 'List the email addresses of any other key DEI contacts at your brand, if applicable.',
            tooltip: '',
            component: 'multi_text',
            options: [],
            placeholder: '',
          },
          'GEN-7': {
            idx: 7,
            prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
            tooltip:
              'Note: Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
            component: 'number',
            options: [],
            placeholder: '',
          },
          'GEN-8': {
            idx: 8,
            prompt:
              'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
            tooltip:
              'Note: This is not an exhaustive list of product categories sold at REI. Your selection below will determine whether you see questions in the online version of the assessment that are specifically related to each product category.',
            component: 'multi_select',
            options: [
              'Apparel',
              'Accessories (textile-based)',
              'Cookware',
              'Footwear',
              'Headwear',
              'Other textile products',
              'Packs',
              'Products that contain down',
              'Products that contain leather',
              'Products that contain wool',
              'Ski wax',
              'Sleeping bags',
              'Sunscreens or other formulated sun-protection products',
              'Tents',
              'Treatments for gear and clothing',
              'Water bottles, food containers, dinnerware or utensils',
              'None of the above',
            ],
            placeholder: '',
          },
        },
      },
      MFG: {
        title: 'Manufacturing Code of Conduct',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 1,
        follow_up: {
          'MFG-1': {
            idx: 9,
            prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-2': {
            idx: 10,
            prompt: 'Please indicate which of the following topics are included in your manufacturing code of conduct.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Transparency',
              'Non-discrimination',
              'Harassment and Abuse',
              'Recruitment and Hiring',
              'Freedom of Association & Collective Bargaining',
              'Hours of Work',
              'Compensation',
              'Health & Safety',
              'Environment',
              'Community',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas.',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                Transparency: 0.1,
                'Non-discrimination': 0.1,
                'Harassment and Abuse': 0.1,
                'Recruitment and Hiring': 0.1,
                'Freedom of Association & Collective Bargaining': 0.1,
                'Hours of Work': 0.1,
                Compensation: 0.1,
                'Health & Safety': 0.1,
                Environment: 0.1,
                Community: 0.1,
                Other: 0.1,
              },
            },
          },
          'MFG-3': {
            idx: 11,
            prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Tier 1 (finished product manufacturers)',
              'Tier 2 (finished material/subcomponent manufacturers)',
              'Tier 3 (raw material processors)',
              'Tier 4 (raw material suppliers)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Tier 1 (finished product manufacturers)': 0.25,
                'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                'Tier 3 (raw material processors)': 0.25,
                'Tier 4 (raw material suppliers)': 0.25,
              },
            },
          },
          'MFG-4': {
            idx: 12,
            prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-5': {
            idx: 13,
            prompt:
              'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-6': {
            idx: 14,
            prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-7:1': {
            idx: 15,
            prompt:
              'Approximately what percentage of your Tier 1 (finished product manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'percent_slider',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-6',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true and $lookup(sections.*.follow_up, 'MFG-6').value = true",
            },
          },
          'MFG-7:2': {
            idx: 16,
            prompt:
              'Approximately what percentage of your Tier 2 (finished material/subcomponent manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'percent_slider',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-6',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true and $lookup(sections.*.follow_up, 'MFG-6').value = true",
            },
          },
          'MFG-7:3': {
            idx: 17,
            prompt:
              'Approximately what percentage of your Tier 3 (raw material processors) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'percent_slider',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-6',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true and $lookup(sections.*.follow_up, 'MFG-6').value = true",
            },
          },
          'MFG-7:4': {
            idx: 18,
            prompt:
              'Approximately what percentage of your Tier 4 (raw material suppliers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
            tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
            component: 'percent_slider',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-6',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true and $lookup(sections.*.follow_up, 'MFG-6').value = true",
            },
          },
          'MFG-8': {
            idx: 19,
            prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'MFG-6',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'MFG-1').value = true and $lookup(sections.*.follow_up, 'MFG-6').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-9': {
            idx: 20,
            prompt: 'Is your brand’s supplier list publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-10': {
            idx: 21,
            prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Tier 1 (finished product manufacturers)',
              'Tier 2 (finished material/subcomponent manufacturers)',
              'Tier 3 (raw material processors)',
              'Tier 4 (raw material suppliers)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'MFG-9',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'MFG-9').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Tier 1 (finished product manufacturers)': 0.25,
                'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                'Tier 3 (raw material processors)': 0.25,
                'Tier 4 (raw material suppliers)': 0.25,
              },
            },
          },
          'MFG-11': {
            idx: 22,
            prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'MFG-12': {
            idx: 23,
            prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      CHEM: {
        title: 'Restricted Substances List & Chemicals Management',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 2,
        follow_up: {
          'CHEM-1': {
            idx: 24,
            prompt: 'Does your brand have an RSL in place for the products you supply to REI?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-2': {
            idx: 25,
            prompt: 'Does your brand have a means of verifying that products you supply to REI comply with your RSL?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe. Limit your response to 100 words or less.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-3': {
            idx: 26,
            prompt: 'Please indicate whether your brand’s chemicals management program consists of the following components that aid in verifying compliance with your RSL.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL',
              'An input-stream management system aimed at managing the chemistry entering the manufacturing process',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'CHEM-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL': 0.5,
                'An input-stream management system aimed at managing the chemistry entering the manufacturing process': 0.5,
              },
            },
          },
          'CHEM-4': {
            idx: 27,
            prompt: 'Is your RSL aligned to an internationally recognized third-party RSL?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'CHEM-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CHEM-4A': {
            idx: 28,
            prompt: 'Please specify which third-party RSL(s).',
            tooltip: '',
            component: 'multi_select',
            options: ['American Apparel and Footwear Association (AAFA)', 'AFIRM', 'bluesign', 'ZDHC MSRL', 'REACH', 'OEKO-TEX', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please specify any additional third party RSL(s)',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-1',
                  operator: '==',
                  values: ['Yes'],
                },
                {
                  question: 'CHEM-4',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression: "$lookup(sections.*.follow_up, 'CHEM-1').value = true and $lookup(sections.*.follow_up, 'CHEM-4').value = true",
            },
          },
          'CHEM-5': {
            idx: 29,
            prompt: 'Is your brand’s RSL publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'CHEM-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'CHEM-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      GHG: {
        title: 'GHG Emissions & Climate',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 3,
        follow_up: {
          'GHG-1': {
            idx: 30,
            prompt: 'Has your brand measured its carbon footprint this year or within the last calendar year?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-2': {
            idx: 31,
            prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
            tooltip: '',
            component: 'select',
            options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard', 'No'],
            placeholder: '',
            additional_context: {
              prompt: 'If you used a different standard than the GHG Protocol, please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
              operator: 'has',
              component: 'textarea',
              comparison: 'Yes, using another GHG accounting standard',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                'Yes, using the GHG Protocol': 1,
                'Yes, using another GHG accounting standard': 0.5,
                No: 0,
              },
            },
          },
          'GHG-3': {
            idx: 32,
            prompt: 'Please indicate which components of your operations were included in your carbon footprint.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilities',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
              'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
              },
            },
          },
          'GHG-4': {
            idx: 33,
            prompt: "Has your brand's carbon footprint been verified by an indepenedent third-party?",
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink to the verification document, if available:',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-5': {
            idx: 34,
            prompt: 'Does your brand report its carbon footprint publicly?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink to your most recent public report:',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-6': {
            idx: 35,
            prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
            tooltip: '',
            component: 'select',
            options: [
              'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
              'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
              'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
              'No',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              score_map: {
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.': 1,
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.': 0.5,
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.': 0.2,
                No: 0,
              },
            },
          },
          'GHG-6A': {
            idx: 36,
            prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
            tooltip: '',
            component: 'multi_select',
            options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe. Limit your response to 100 words or less.',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-6',
                  operator: 'has',
                  values: [
                    'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                    'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                    'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                  ],
                },
                {
                  question: 'GHG-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              and: true,
              expression:
                "true in $map($lookup(sections.*.follow_up, 'GHG-6').value, function($v) { $v in ['Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.'] }) and $lookup(sections.*.follow_up, 'GHG-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'We use spend-based emissions factors': 0.5,
                'We use material-based emissions factors': 1,
                Other: 0,
              },
            },
          },
          'GHG-7': {
            idx: 37,
            prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-7A': {
            idx: 38,
            prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilities',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
              'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
              },
            },
          },
          'GHG-7B': {
            idx: 39,
            prompt:
              'Please complete the following table to indicate your quantitative Scope 3 emissions reduction target(s).\nPlease complete the following table to indicate your quantitative Scope 3 emissions reduction target(s).',
            tooltip: '',
            component: '',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
          },
          'GHG-7C': {
            idx: 40,
            prompt:
              'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
            tooltip: '',
            component: 'select',
            options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              score_map: {
                'Absolute emissions reduction': 1,
                'Reduction in emissions intensity': 0,
              },
            },
          },
          'GHG-8': {
            idx: 41,
            prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
            tooltip:
              'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5 degrees C above pre-industrial levels',
            component: 'select',
            options: [
              'Yes, our target(s) has been approved by the SBTi',
              'No, but our target(s) is currently being evaluated by the SBTi for approval',
              'No, but we’ve aligned our target(s) with the SBTi’s guidance',
              'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
              'No',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-7',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
            },
            rubric: {
              score_map: {
                'Yes, our target(s) has been approved by the SBTi': 1,
                'No, but our target(s) is currently being evaluated by the SBTi for approval': 0.8,
                'No, but we’ve aligned our target(s) with the SBTi’s guidance': 0.5,
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets': 0.3,
                No: 0,
              },
            },
          },
          'GHG-9': {
            idx: 42,
            prompt: 'Has your brand established an emissions reduction action plan or roadmap that guides your efforts to achieve your reduction targets?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-9A': {
            idx: 43,
            prompt: 'What are the primary components of your emissions reduction action plan?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Use of low-carbon materials or ingredients in products',
              'Use of clean energy in product manufacturing',
              'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)',
              'Minimization of materials waste in manufacturing',
              'Energy efficiency in manufacturing',
              'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)',
              'Supporting customers in reducing emissions during product use',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-9',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-9').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Use of low-carbon materials or ingredients in products': 0.125,
                'Use of clean energy in product manufacturing': 0.125,
                'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)': 0.125,
                'Minimization of materials waste in manufacturing': 0.125,
                'Energy efficiency in manufacturing': 0.125,
                'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)': 0.125,
                'Supporting customers in reducing emissions during product use': 0.125,
                Other: 0.125,
              },
            },
          },
          'GHG-10': {
            idx: 44,
            prompt:
              'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
            tooltip: '',
            component: 'select',
            options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
            placeholder: '',
            rubric: {
              score_map: {
                'Yes, a 1-25% reduction': 0.2,
                'Yes, a 26-50% reduction': 0.4,
                'Yes, a 51-75% reduction': 0.6,
                'Yes, a 76-99% reduction': 0.8,
                'Yes, a 100% reduction': 1,
                No: 0,
              },
            },
          },
          'GHG-11': {
            idx: 45,
            prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'GHG-12': {
            idx: 46,
            prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Scope 1: Direct emissions from company vehicles & facilitie',
              'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
              'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
              'All or a portion of scope 3 emissions, including all the products you sell to REI',
              'Other',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GHG-11',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Scope 1: Direct emissions from company vehicles & facilitie': 0.2,
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.2,
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI': 0.2,
                'All or a portion of scope 3 emissions, including all the products you sell to REI': 0.2,
                Other: 0.2,
              },
            },
          },
          'GHG-13': {
            idx: 47,
            prompt:
              'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
            tooltip: '',
            component: 'select',
            options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard', 'No'],
            placeholder: '',
            additional_context: {
              prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
              operator: '==',
              component: 'textarea',
              comparison: 'Yes, we’re certified to another carbon/climate neutrality standard',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'GHG-11',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
            },
            rubric: {
              score_map: {
                'Yes, we’re Climate Neutral Certified': 1,
                'Yes, we’re certified to another carbon/climate neutrality standard': 1,
                No: 0,
              },
            },
          },
        },
      },
      PFAS: {
        title: 'Per- and Polyfluoroalkyl Substances',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 4,
        follow_up: {
          'PFAS-A1': {
            idx: 48,
            prompt: 'Does your brand have a formal policy/target in place regarding the presence of PFAS in your products?',
            tooltip:
              'The REI Product Impact Standards include the existing expectation that all apparel, footwear, packs, sleeping bags or tents supplied to REI be free of long-chain PFAS and that all ski wax and gear & clothing treatments supplied to REI be free of long-chain and short-chain PFAS.',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GEN-8',
                  operator: 'has',
                  values: ['Apparel', 'Footwear', 'Packs', 'Ski wax', 'Sleeping bags', 'Tents', 'Treatments for gear and clothing'],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Apparel','Footwear','Packs','Ski wax','Sleeping bags','Tents','Treatments for gear and clothing'] })",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PFAS-A2': {
            idx: 49,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'PFAS-A1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PFAS-A1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PFAS-C1': {
            idx: 50,
            prompt: 'Please indicate when you expect that all products in these categories that your brand sells to REI will be free of PFAS.',
            tooltip: 'v3.0 of the REI Product Impact Standards introduced the new expectation that by fall 2024 product lines all cookware  will be free of PFAS.',
            component: 'select',
            options: [
              'Our products are already free of PFAS',
              'All products sold to REI for the Spring 2024 season and beyond will be free of PFAS',
              'All products sold to REI for the Fall 2024 season and beyond will be free of PFAS',
              'Our transition away from PFAS will continue beyond the Fall 2024 season',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GEN-8',
                  operator: 'has',
                  values: ['Cookware'],
                },
              ],
              expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Cookware'] })",
            },
            rubric: {
              score_map: {
                'Our products are already free of PFAS': 1,
                'All products sold to REI for the Spring 2024 season and beyond will be free of PFAS': 0.8,
                'All products sold to REI for the Fall 2024 season and beyond will be free of PFAS': 0.5,
                'Our transition away from PFAS will continue beyond the Fall 2024 season': 0,
              },
            },
          },
          'PFAS-O1': {
            idx: 51,
            prompt: 'Please indicate when you expect that all products in these categories that your brand sells to REI will be free of PFAS.',
            tooltip: 'v3.0 of the REI Product Impact Standards introduced the new expectation that by fall 2026 product lines all remaining textile products will be free of PFAS.',
            component: 'select',
            options: [
              'Our products are already free of PFAS',
              'By the Fall 2026 season',
              'Our transition away from PFAS will continue beyond the Fall 2026 season',
              'We are unsure when our transition away from PFAS will be complete',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GEN-8',
                  operator: 'has',
                  values: ['Other textile products'],
                },
              ],
              expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Other textile products'] })",
            },
            rubric: {
              score_map: {
                'Our products are already free of PFAS': 1,
                'By the Fall 2026 season': 0.5,
                'Our transition away from PFAS will continue beyond the Fall 2026 season': 0,
                'We are unsure when our transition away from PFAS will be complete': 0,
              },
            },
          },
          'PFAS-T1': {
            idx: 52,
            prompt: 'Please indicate when you expect that all products in these categories that your brand sells to REI will be free of PFAS.',
            tooltip:
              'v3.0 of the REI Product Impact Standards introduced the new expectation that by fall 2024 product lines all textile products covered by California AB-1817 – including but not limited to apparel, textile accessories, footwear, packs & bags – be free of PFAS.',
            component: 'select',
            options: [
              'Our products are already free of PFAS',
              'All products sold to REI for the Spring 2024 season and beyond will be free of PFAS',
              'All products sold to REI for the Fall 2024 season and beyond will be free of PFAS',
              'Our transition away from PFAS will continue beyond the Fall 2024 season',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'GEN-8',
                  operator: 'has',
                  values: ['Apparel', 'Accessories (textile-based)', 'Footwear', 'Packs'],
                },
              ],
              expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Apparel','Accessories (textile-based)','Footwear','Packs'] })",
            },
            rubric: {
              score_map: {
                'Our products are already free of PFAS': 1,
                'All products sold to REI for the Spring 2024 season and beyond will be free of PFAS': 0.8,
                'All products sold to REI for the Fall 2024 season and beyond will be free of PFAS': 0.5,
                'Our transition away from PFAS will continue beyond the Fall 2024 season': 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: [
                'Apparel',
                'Accessories (textile-based)',
                'Cookware',
                'Footwear',
                'Headwear',
                'Other textile products',
                'Packs',
                'Ski wax',
                'Sleeping bags',
                'Tents',
                'Treatments for gear and clothing',
              ],
            },
          ],
          expression:
            "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Apparel','Accessories (textile-based)','Cookware','Footwear','Headwear','Other textile products','Packs','Ski wax','Sleeping bags','Tents','Treatments for gear and clothing'] })",
        },
      },
      BPA: {
        title: 'BPA',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 5,
        follow_up: {
          'BPA-1': {
            idx: 53,
            prompt:
              'The REI Product Impact Standards include the expectation that products supplied to REI that are meant to come in direct contact with food or liquids for human consumption be free of Bisphenol A (BPA).\n\nDoes your brand have a means of ensuring that all such products supplied to REI meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area. Limit your response to 100 words or less.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'BPA-2': {
            idx: 54,
            prompt: 'Does your brand have a formal policy/target in place regarding the use of BPA in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'BPA-3': {
            idx: 55,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'BPA-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'BPA-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Cookware', 'Water bottles, food containers, dinnerware or utensils'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Cookware','Water bottles, food containers, dinnerware or utensils'] })",
        },
      },
      SUN: {
        title: 'Sunscreen',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 6,
        follow_up: {
          'SUN-1': {
            idx: 56,
            prompt:
              'The REI Product Impact Standards include the expectation that sunscreens and formulated sun-protection products supplied to REI be free of oxybenzone and contain only active ingredients that are generally recognized as safe and effective. \n\nDoes your brand have a means of ensuring that all such products supplied to REI meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'SUN-2': {
            idx: 57,
            prompt: 'Does your brand have a formal policy/target in place regarding the use of oxybenzone in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'SUN-3': {
            idx: 58,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'SUN-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'SUN-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'SUN-4': {
            idx: 59,
            prompt: 'Does your brand have a formal policy/target in place that includes avoiding the use of other active sunscreen ingredients?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please indicate which other active sunscreen ingredients your brand formally avoids using.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Sunscreens or other formulated sun-protection products'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Sunscreens or other formulated sun-protection products'] })",
        },
      },
      FR: {
        title: 'FR Chemicals',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 7,
        follow_up: {
          'FR-1': {
            idx: 60,
            prompt:
              'The REI Product Impact Standards include the expectation that all camping shelters supplied to REI be free of prohibited flame retardant (FR) chemicals.\n(See REI’s Product Impact Standards for a list of prohibited FR chemicals.)\n\nDoes your brand have a means of ensuring that all camping shelters you supply to REI meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'FR-2': {
            idx: 61,
            prompt: 'Does your brand have a formal policy/target in place regarding the use of FR chemicals in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'FR-3': {
            idx: 62,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'FR-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'FR-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'FR-4': {
            idx: 63,
            prompt: 'Does your brand have plans to transition away from the use of all flame retardants in your tents?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Tents'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Tents'] })",
        },
      },
      DWN: {
        title: 'Down',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 8,
        follow_up: {
          'DWN-1': {
            idx: 64,
            prompt:
              'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin down meet standards that safeguard the well-being of ducks and geese in the down supply chain and prohibit live-plucking and force-feeding.\n\nDoes your brand have a means of ensuring that the products you supply to REI that contain virgin down meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'DWN-2': {
            idx: 65,
            prompt: 'Does your brand have a formal policy/target in place regarding animal welfare in your down supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'DWN-3': {
            idx: 66,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'DWN-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'DWN-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Products that contain down'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Products that contain down'] })",
        },
      },
      WL: {
        title: 'Wool',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 9,
        follow_up: {
          'WL-1': {
            idx: 67,
            prompt:
              'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin wool meet standards that safeguard the well-being of sheep in the wool supply chain and prohibit mulesing.\n\nDoes your brand have a means of ensuring that the products you supply to REI that contain virgin wool meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'WL-2': {
            idx: 68,
            prompt: 'Does your brand have a formal policy/target in place regarding animal welfare in your wool supply chain?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'WL-3': {
            idx: 69,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'WL-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'WL-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Products that contain wool'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Products that contain wool'] })",
        },
      },
      AFL: {
        title: 'Animal Fur & Exotic Leather',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 10,
        follow_up: {
          'AFL-1': {
            idx: 70,
            prompt:
              'The REI Product Impact Standards include the expectation that products supplied to REI do not contain animal fur or exotic leather. (See REI’s Product Impact Standards for a definition of exotic leather.)\n\nDoes your brand have a means of ensuring that your brand meets this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'AFL-2': {
            idx: 71,
            prompt: 'Does your brand have a formal policy/target in place regarding the use of animal fur and exotic leather in your products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'AFL-3': {
            idx: 72,
            prompt: 'Is the policy/target publicly available?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide the hyperlink',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'AFL-2',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'AFL-2').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Products that contain leather'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Products that contain leather'] })",
        },
      },
      APP: {
        title: 'Diversity & Inclusion: Cultural Appropriation',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 11,
        follow_up: {
          'APP-1': {
            idx: 73,
            prompt:
              'Which option below best describes your brand’s status, as of Spring 2023 product lines and marketing, in addressing cultural appropriation: plagiarism, theft and/or inappropriate use of designs, patterns, forms, materials, words/names etc. that are culturally meaningful to and/or originated from underrepresented communities?',
            tooltip:
              'The REI Product Impact Standards include the expectation that each brand partner has in place creative controls to prevent cultural appropriation: plagiarism, theft and/or inappropriate use of designs, patterns, forms, materials, words/names, etc. that are culturally meaningful to and/or originated from underrepresented communities. These creative controls should ensure that the development of products, promotions, and marketing used during annual cultural moments (e.g., Pride, Black History Month etc.) is shaped by members of the represented communities.',
            component: 'select',
            options: [
              'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
              'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
              'We do not currently have creative controls in place to address cultural appropriation',
            ],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area",
              operator: '==',
              component: 'textarea',
              comparison: 'We do not currently have creative controls in place to address cultural appropriation',
              placeholder: '',
            },
            rubric: {
              score_map: {
                'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation': 1,
                'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process': 0.5,
                'We do not currently have creative controls in place to address cultural appropriation': 0,
              },
            },
          },
          'APP-2': {
            idx: 74,
            prompt: 'What strategies is your brand currently using to address cultural appropriation?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Hiring BIPOC creatives or design collectives',
              'Partnering with Native/Indigenous consultants or organizations (tribal organizations, nonprofits, etc.) to ensure appropriate use of cultural designs',
              'Philanthropy/grantmaking to Native/Indigenous causes',
              'Transparency about the source of a design’s inspiration (on product labeling, PI provided to REI, your website, etc.)',
              'Clarity around source of product names that are derived from cultural traditions, places, or language',
              'Use of marketing channels (website, social media, catalogue, etc.) to elevate Native artists, issues impacting tribal communities, etc.',
              'Reviewing potential product concerns with our REI Merchandising and/or Inclusion Marketing contacts',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: 'has',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'APP-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
                    'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'APP-1').value, function($v) { $v in ['We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation','We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Hiring BIPOC creatives or design collectives': 0.125,
                'Partnering with Native/Indigenous consultants or organizations (tribal organizations, nonprofits, etc.) to ensure appropriate use of cultural designs': 0.125,
                'Philanthropy/grantmaking to Native/Indigenous causes': 0.125,
                'Transparency about the source of a design’s inspiration (on product labeling, PI provided to REI, your website, etc.)': 0.125,
                'Clarity around source of product names that are derived from cultural traditions, places, or language': 0.125,
                'Use of marketing channels (website, social media, catalogue, etc.) to elevate Native artists, issues impacting tribal communities, etc.': 0.125,
                'Reviewing potential product concerns with our REI Merchandising and/or Inclusion Marketing contacts': 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      COL: {
        title: 'Diversity & Inclusion: Inclusive Colorways',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 12,
        follow_up: {
          'COL-1': {
            idx: 75,
            prompt:
              'Does your brand currently have policies or creative controls in place to ensure colorways of wearable products are appropriate for a variety of skin tones/complexions?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'COL-2': {
            idx: 76,
            prompt: 'Which of the following strategies is your brand currently using to address inclusion in its color offering?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Offering a range of tones within products marketed as ‘Nude’ or intended to mimic skin',
              'Offering a range of tones for product embellishments and/or linings intended to give the impression of bare skin',
              'Diverse pool of product testers',
              'Feedback from employee resource groups or similar',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Testing to ensure the availability of colorways to complement a range of complexions',
              'Participating in communities of practice related to inclusive design',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'COL-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'COL-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Offering a range of tones within products marketed as ‘Nude’ or intended to mimic skin': 0.125,
                'Offering a range of tones for product embellishments and/or linings intended to give the impression of bare skin': 0.125,
                'Diverse pool of product testers': 0.125,
                'Feedback from employee resource groups or similar': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                'Testing to ensure the availability of colorways to complement a range of complexions': 0.125,
                'Participating in communities of practice related to inclusive design': 0.125,
                Other: 0.125,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Apparel'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Apparel'] })",
        },
      },
      COP: {
        title: 'Diversity & Inclusion: Inclusive Copy',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 13,
        follow_up: {
          'COP-1': {
            idx: 77,
            prompt: 'Does your brand currently have in place policies or creative controls related to inclusive product copy?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: false,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'COP-2': {
            idx: 78,
            prompt: 'Which of the following strategies do you utilize?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Diversity & inclusion guidance in my brand’s style guide',
              'Use of other diversity style guides (e.g., NABJ Style Guide, GLAAD Media Guide, etc.)',
              'Diverse pool of product testers',
              'Feedback from employee resource groups or similar',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Participating in communities of practice related to inclusive copy',
              'Other',
            ],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'COP-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'COP-1').value = true",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Diversity & inclusion guidance in my brand’s style guide': 0.125,
                'Use of other diversity style guides (e.g., NABJ Style Guide, GLAAD Media Guide, etc.)': 0.125,
                'Diverse pool of product testers': 0.125,
                'Feedback from employee resource groups or similar': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                'Participating in communities of practice related to inclusive copy': 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      MKT: {
        title: 'Diversity & Inclusion: Marketing Diversity',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 14,
        follow_up: {
          'MKT-1': {
            idx: 79,
            prompt:
              'Which option below best describes your brand’s status, as of Spring 2023 product lines and marketing, in addressing diverse and inclusive representation in its marketing and photo casting?',
            tooltip: '',
            component: 'select',
            options: [
              'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
              'We have some practices in place, but do not yet have formal guidelines or targets in place',
              'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
            ],
            placeholder: '',
            additional_context: {
              prompt: "Describe how your brand plans to align with REI's expectation in this area.",
              operator: '==',
              component: 'textarea',
              comparison: 'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
              placeholder: '',
            },
            rubric: {
              score_map: {
                'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions': 1,
                'We have some practices in place, but do not yet have formal guidelines or targets in place': 0.5,
                'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography': 0,
              },
            },
          },
          'MKT-2': {
            idx: 80,
            prompt: 'What strategies is your brand currently using as part of its guidelines?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Representation targets (e.g., % representation of specific cohorts)',
              'Inclusive intake process (e.g., on casting questionnaire or portal)',
              'Casting calls specific to diverse talent',
              'Outreach to/partnerships with diversity organizations',
              '“Behind the camera” recruitment initiatives (photographers, producers, etc.)',
              'Designer/design team education on inclusion topics',
              'Diversity/inclusion reviews within product development/creative process',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MKT-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                    'We have some practices in place, but do not yet have formal guidelines or targets in place',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                'Representation targets (e.g., % representation of specific cohorts)': 0.125,
                'Inclusive intake process (e.g., on casting questionnaire or portal)': 0.125,
                'Casting calls specific to diverse talent': 0.125,
                'Outreach to/partnerships with diversity organizations': 0.125,
                '“Behind the camera” recruitment initiatives (photographers, producers, etc.)': 0.125,
                'Designer/design team education on inclusion topics': 0.125,
                'Diversity/inclusion reviews within product development/creative process': 0.125,
                Other: 0.125,
              },
            },
          },
          'MKT-3': {
            idx: 81,
            prompt: 'Which dimensions of diversity or other topics do your guidelines address?',
            tooltip: '',
            component: 'multi_select',
            options: ['Race', 'Gender', 'LGBTQ+', 'Disability', 'Military status', 'Faith tradition/religion', 'Body size', 'Age', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'MKT-1',
                  operator: 'has',
                  values: [
                    'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                    'We have some practices in place, but do not yet have formal guidelines or targets in place',
                  ],
                },
              ],
              expression:
                "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
            },
            rubric: {
              max_score: 1,
              score_map: {
                Race: 0.125,
                Gender: 0.125,
                'LGBTQ+': 0.125,
                Disability: 0.125,
                'Military status': 0.125,
                'Faith tradition/religion': 0.125,
                'Body size': 0.125,
                Age: 0.125,
                Other: 0.125,
              },
            },
          },
        },
      },
      ISS: {
        title: 'Diversity & Inclusion: Inclusive Sizing',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 15,
        follow_up: {
          'ISS-1': {
            idx: 82,
            prompt:
              'The REI Product Impact Standard has an expectation that each brand partner that sells wearable products offered in a variety of sizes to provide REI at least one sample size outside the standard size range for marketing photography. \n\nAs a standard practice, does your brand currently send REI at least one sample size outside the standard size range for marketing photography of wearable products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'ISS-2': {
            idx: 83,
            prompt:
              'The REI Product Impact Standards has an expectation that all brand partners who sell wearable products offered in a variety of sizes maintain the same price within a style regardless of size. \n\nDoes your brand currently maintain the same price across wearable products offered in a variety of sizes regardless of size?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      DHT: {
        title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 16,
        follow_up: {
          'DHT-1': {
            idx: 84,
            prompt:
              'The REI Product Impact Standards has an expectation that each brand partner that produces headwear (helmets, hats, headbands, hoods, balaclavas, hijab, etc.) to have in place guidelines for ensuring an inclusive assortment for a variety of hair types, including higher-volume and textured hair.\n\nDoes your brand have in place guidelines that meet this expectation?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Headwear'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Headwear'] })",
        },
      },
      INC: {
        title: 'Diversity & Inclusion: General',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 17,
        follow_up: {
          'INC-1': {
            idx: 85,
            prompt: 'Does your brand have a policy/policies in place regarding nondiscrimination as related to employment, customer service, grant-making or other areas?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'INC-2': {
            idx: 86,
            prompt: 'Does your policy explicitly prohibit discrimination based on both sexual orientation and gender identity?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'INC-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'INC-3': {
            idx: 87,
            prompt: 'Please select one the following to describe the reach of your nondiscrimination policy.',
            tooltip: '',
            component: 'select',
            options: ['Applies to all employees/customers regardless of location', 'Policy varies by country', 'Policy varies by US state', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'INC-1',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
            },
            rubric: {
              score_map: {
                'Applies to all employees/customers regardless of location': 1,
                'Policy varies by country': 0,
                'Policy varies by US state': 0,
                Other: 0,
              },
            },
          },
        },
      },
      PSA: {
        title: 'Product Sustainability & Preferred Attributes',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 18,
        follow_up: {
          'PSA-1': {
            idx: 88,
            prompt: 'Does your brand utilize a formal methodology or tool to measure the sustainability of your materials and/or finished products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PSA-2': {
            idx: 89,
            prompt:
              'Please indicate (a) whether your brand has any policies or targets in place related to any of REI’s preferred sustainability attributes and (b) whether the policies or targets are publicly available. Please also provide hyperlink(s) in the boxes below to any publicly available policies or targets related to the preferred attributes you selected.',
            tooltip: '',
            component: '',
            options: [],
            placeholder: '',
          },
        },
      },
      PKG: {
        title: 'Packaging - General',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 19,
        follow_up: {
          'PKG-1': {
            idx: 90,
            prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
            tooltip: '',
            component: '',
            options: [],
            placeholder: '',
          },
          'PKG-2': {
            idx: 91,
            prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PKG-3': {
            idx: 92,
            prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PKG-4': {
            idx: 93,
            prompt:
              'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      APK: {
        title: 'Packaging - Apparel',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 20,
        follow_up: {
          'APK-1': {
            idx: 94,
            prompt:
              'REI’s Vendor Guide indicates that brands shipping non-white apparel items to REI should do so without individual polybags. Brands will be charged a $.01/unit polybag recycling fee for apparel items arriving in individual polybags at an REI receiving location. Please refer to REI’s Vendor Guide (available on the REI Partners Site  ) for more information.\n\nApproximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in individual polybags?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            rubric: {
              score_map: {
                Unknown: 0,
                '0%': 1,
                '1-25%': 0.8,
                '26-50%': 0.6,
                '51-75%': 0.4,
                '76-99%': 0.2,
                '100%': 0,
              },
            },
          },
          'APK-2': {
            idx: 95,
            prompt:
              'Approximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in a master polybag containing all units in each carton?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
          },
          'APK-3': {
            idx: 96,
            prompt: 'If you ship apparel items to REI without individual polybags, how are they packaged?',
            tooltip: '',
            component: 'multi_select',
            options: ['Roll-packed', 'Folded and stacked', 'Flat packed', 'Other'],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
            dependency: {
              conditions: [
                {
                  question: 'APK-1',
                  operator: 'has',
                  values: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%'],
                },
              ],
              expression: "true in $map($lookup(sections.*.follow_up, 'APK-1').value, function($v) { $v in ['Unknown','0%','1-25%','26-50%','51-75%','76-99%'] })",
            },
          },
          'APK-4': {
            idx: 97,
            prompt: 'Approximately what percentage of the apparel product units that you ship to REI during the coming year will be packaged in individual polybags?',
            tooltip: '',
            component: 'select',
            options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
            placeholder: '',
            rubric: {
              score_map: {
                Unknown: 0,
                '0%': 1,
                '1-25%': 0.8,
                '26-50%': 0.6,
                '51-75%': 0.4,
                '76-99%': 0.2,
                '100%': 0,
              },
            },
          },
          'APK-5': {
            idx: 98,
            prompt:
              'As of the Spring 2023 product season, have you implemented as your standard practice the shipment of non-white apparel products to REI without the use of individual polybags?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'APK-6': {
            idx: 99,
            prompt:
              'If your brand is unable to ship non-white apparel items to REI without the use of individual polybags, please describe the key factors that prevent you from doing so.',
            tooltip: '',
            component: 'textarea',
            options: [],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'APK-5',
                  operator: '==',
                  values: ['No'],
                },
              ],
            },
          },
          'APK-7': {
            idx: 100,
            prompt:
              '(If >0 to question 1 and/or 2) Of the total number of polybags used to ship apparel products to REI during the last calendar year, please indicate approximately what percentage are made of each of the following materials:',
            tooltip: '',
            component: '',
            options: [],
            placeholder: '',
          },
        },
        dependency: {
          conditions: [
            {
              question: 'GEN-8',
              operator: 'has',
              values: ['Apparel'],
            },
          ],
          expression: "true in $map($lookup(sections.*.follow_up, 'GEN-8').value, function($v) { $v in ['Apparel'] })",
        },
      },
      PRD: {
        title: 'Product Care, Repair, Reuse & End-of-life',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 21,
        follow_up: {
          'PRD-1': {
            idx: 101,
            prompt: 'Does your brand provide customers with guidance for how to use and care for product in an environmentally responsible manner?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-2': {
            idx: 102,
            prompt: 'Does your brand offer a lifetime warranty for products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please provide a link to your warranty policy, if available',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-3': {
            idx: 103,
            prompt: 'Does your brand provide product repair services to your customers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-4': {
            idx: 104,
            prompt: 'Are the repairs conducted in-house or through a third-party?',
            tooltip: '',
            component: 'multi_select',
            options: ['Conducted in-house', 'Conducted through a third-party'],
            placeholder: '',
            dependency: {
              conditions: [
                {
                  question: 'PRD-3',
                  operator: '==',
                  values: ['Yes'],
                },
              ],
              expression: "$lookup(sections.*.follow_up, 'PRD-3').value = true",
            },
          },
          'PRD-5': {
            idx: 105,
            prompt: 'Does your brand sell used products?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-6': {
            idx: 106,
            prompt: 'Does your brand rent or lease products to your customers?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'PRD-7': {
            idx: 107,
            prompt: 'Does your brand offer solutions for your customers to donate and/or recycle products at end-of-life?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
        },
      },
      CRP: {
        title: 'Core Practices',
        category_description: '',
        prompt: '',
        component: {},
        image_url: '',
        category_idx: 22,
        follow_up: {
          'CRP-1': {
            idx: 108,
            prompt: 'Is your brand an active member of or participant in any of the following globally recognized sustainability forums?',
            tooltip: '',
            component: 'multi_select',
            options: [
              '1% for the Planet',
              'American Apparel & Footwear Association: Social Responsibility or Environmental Committees',
              'B Corp',
              'bluesign®',
              'Business Social Compliance Initiative',
              'Climate Neutral',
              'Ethical Trading Initiative',
              'Fair Factories Clearinghouse',
              'Fair Labor Association',
              'Fair Wear Foundation',
              'Footwear Distributors & Retailers of America',
              'Global Social Compliance Programme',
              'Green Chemistry & Commerce Council',
              'Leather Working Group',
              'International Labour Organization Better Work Programme',
              'Outdoor Industry Association Climate Action Corps',
              'Outdoor Industry Association Sustainability Working Group',
              'PeopleForBikes Sustainability Working Group',
              'Retail Industry Leaders Association: Sustainability Workgroups',
              'Science Based Targets Initiative',
              'Snowsports Industries America ClimateUnited',
              'Social and Labor Convergence Program',
              'Sustainable Apparel Coalition',
              'Textile Exchange',
              'The Microfibre Consortium',
              'Zero Discharge of Hazardous Chemicals',
              'Others',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please list here',
              operator: '==',
              component: 'textarea',
              comparison: 'Others',
              placeholder: '',
            },
            rubric: {
              max_score: 1,
              score_map: {
                '1% for the Planet': 1,
                'American Apparel & Footwear Association: Social Responsibility or Environmental Committees': 1,
                'B Corp': 1,
                'bluesign®': 1,
                'Business Social Compliance Initiative': 1,
                'Climate Neutral': 1,
                'Ethical Trading Initiative': 1,
                'Fair Factories Clearinghouse': 1,
                'Fair Labor Association': 1,
                'Fair Wear Foundation': 1,
                'Footwear Distributors & Retailers of America': 1,
                'Global Social Compliance Programme': 1,
                'Green Chemistry & Commerce Council': 1,
                'Leather Working Group': 1,
                'International Labour Organization Better Work Programme': 1,
                'Outdoor Industry Association Climate Action Corps': 1,
                'Outdoor Industry Association Sustainability Working Group': 1,
                'PeopleForBikes Sustainability Working Group': 1,
                'Retail Industry Leaders Association: Sustainability Workgroups': 1,
                'Science Based Targets Initiative': 1,
                'Snowsports Industries America ClimateUnited': 1,
                'Social and Labor Convergence Program': 1,
                'Sustainable Apparel Coalition': 1,
                'Textile Exchange': 1,
                'The Microfibre Consortium': 1,
                'Zero Discharge of Hazardous Chemicals': 1,
                Others: 1,
              },
            },
          },
          'CRP-2': {
            idx: 109,
            prompt: 'Does your brand have an ongoing commitment to donating a specific portion of your sales or profits to philanthropic causes?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CRP-3': {
            idx: 110,
            prompt:
              'Does your brand publish regular public-facing updates on your sustainability commitments and progress toward those commitments (e.g., annual sustainability report)?',
            tooltip: '',
            component: 'yes_no',
            options: [],
            placeholder: '',
            additional_context: {
              prompt: 'If yes, provide hyperlink.',
              operator: '==',
              component: 'textarea',
              comparison: true,
              placeholder: '',
            },
            rubric: {
              score_map: {
                true: 1,
                false: 0,
              },
            },
          },
          'CRP-4': {
            idx: 111,
            prompt:
              'If REI were to provide or facilitate additional guidance on sustainability- or impact-related topic, which topics, which would be the most helpful for your brand?',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Achieving carbon emissions reduction targets',
              'Avoiding the use of polybags',
              'Chemicals management program development',
              'Diversity & inclusion in products',
              'Establishing carbon emissions reduction targets',
              'Implementing animal welfare standards',
              'Incorporating sustainability attributes into products',
              'Manufacturing code of conduct implementation',
              'Measuring carbon footprint',
              'Restricted substances list (RSL) implementation & chemical testing',
              'Supply chain oversight & auditing',
              'Utilizing more sustainable packaging',
              'Other',
            ],
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
          },
          'CRP-5': {
            idx: 112,
            prompt:
              'We want to explore ways we can best convene and support you and other brands we work with to deliver more inclusive and culturally relevant offerings to our customer, and extend positive impacts to the broader community. What practices, information, or other resources would you be interested in?',
            tooltip: '',
            component: 'multi_select',
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
            placeholder: '',
            additional_context: {
              prompt: 'Please describe',
              operator: '==',
              component: 'textarea',
              comparison: 'Other',
              placeholder: '',
            },
          },
          'CRP-6': {
            idx: 113,
            prompt:
              'As we are working toward a more inclusive co-op and outdoors, we are seeking to collaborate with like-minded brands to explore shared challenges and promising approaches related to addressing diversity, equity, and inclusion within business policies, practices, and programs, including but also beyond the areas addressed in REI’s Product Impact Standards. Additionally, REI is currently undergoing an enterprise-wide assessment of our own policies and practices. We are committed to transparency about our own DEI journey and sharing our learnings, and we would like to gauge your interest in receiving more detailed report-outs and related communications. Please let us know if your brand would be interested in participating in a more detailed survey, receiving updates about REI’s progress, and/or joining follow-up conversations regarding this topic. Your answers will only be used to help us understand your level of interest; there is no commitment to participate implied or expected.',
            tooltip: '',
            component: 'multi_select',
            options: [
              'Please include my brand in a follow up survey regarding DEI policies and practices',
              'Please include my brand in communications regarding REI’s DEI Initiatives',
            ],
            placeholder: '',
          },
          'CRP-7': {
            idx: 114,
            prompt:
              '(Optional) As part of our ongoing support, we have offered various resources including virtual trainings, panels, and an inclusive design playbook. If you or your team have utilized or attended any of these resources/events, what was helpful and what would you like to see more of?',
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
          'CRP-8': {
            idx: 115,
            prompt: '(Optional) If there are any other general comments or questions you would like to share with REI regarding product impact, please enter them below.',
            tooltip: '',
            component: 'text',
            options: [],
            placeholder: '',
          },
        },
      },
    },
  },
};
