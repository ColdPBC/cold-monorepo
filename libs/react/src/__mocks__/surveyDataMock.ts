import { ComplianceSurveyPayloadType, ComplianceSurveyProgressQuestionType, ComplianceSurveySectionProgressType, SurveyPayloadType, SurveySectionType } from '@coldpbc/interfaces';
import { forEach, forOwn } from 'lodash';

export const getSurveyFormDataByName = (name: string): SurveyPayloadType | ComplianceSurveyPayloadType | undefined => {
  const surveys = getSurveysMock();
  return surveys.find(s => s.name === name);
};

export const getTestingSurveyFormDefinitionData = (): SurveyPayloadType => {
  return {
    id: '622fe082-a490-49a3-97f1-9cb511b53581',
    name: 'qaalib_test',
    type: 'survey',
    description: 'A survey that exercises lots of sections and components for Qaalib to test everything with the survey',
    created_at: '2023-08-14T16:14:14.128Z',
    updated_at: '2023-08-14T16:14:14.128Z',
    definition: {
      title: 'Welcome to Cold Climate!',
      image_url:
        'https://images.unsplash.com/photo-1603437873662-dc1f44901825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
      intro_markdown:
        "Let’s Start Your Journey to Absolute Zero™ \nWe will start with our basic company information survey. \nThis is a quick form to understand a little more about your company and what climate efforts you've already undertaken.",
      sections: {
        product: {
          title: 'Product',
          prompt: 'Does your company make a physical product?',
          component: 'yes_no',
          follow_up: {
            'product:0': {
              idx: 0,
              prompt: 'Is your product made of metal?',
              options: [],
              tooltip: 'Select yes or no',
              component: 'yes_no',
              placeholder: '',
            },
            'product:1': {
              idx: 1,
              prompt: 'How much does your product cost, in dollars?',
              options: [],
              tooltip: 'Enter the cost to your company to produce',
              component: 'currency',
              placeholder: '45',
            },
            'product:2': {
              idx: 2,
              prompt: 'What percent of your product is leather?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            'product:3': {
              idx: 3,
              prompt: 'How many factories make your product?',
              options: [],
              tooltip: 'Choose the number across all countries',
              component: 'number',
              placeholder: '2',
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          category_idx: 1,
          category_description: 'Questions about how your products are produced',
          additional_context: {
            prompt: 'Please explain your answer',
            component: 'textarea',
            placeholder: 'Write in here',
            operator: '==', // could be ==, >, <, <=, >=
            comparison: true,
          },
        },
        facilities: {
          title: 'Facilities',
          prompt: 'Do you own or lease any facilities like offices or warehouses?',
          component: 'yes_no',
          follow_up: {
            'facilities:0': {
              idx: 0,
              prompt: 'What colors are your office carpets?',
              options: ['Gray', 'Black', 'Orange', 'Blue', 'Purple'],
              tooltip: 'If carpets are multiple colors choose all colors that apply',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          category_idx: 2,
          category_description: 'Questions about your the facilities you own or lease',
        },
        general: {
          title: 'General',
          prompt: '',
          component: null,
          follow_up: {
            'general:0': {
              idx: 0,
              prompt: 'Which regions do you sell your product into?',
              options: ['North America', 'South America', 'Europe', 'Asia', 'Australia', 'Africa'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            'general:1': {
              idx: 1,
              prompt: "What is your company's name?",
              options: [],
              tooltip: 'Enter your company name',
              component: 'text',
              placeholder: 'Yourco',
            },
            'general:2': {
              idx: 2,
              prompt: 'What is your favorite color of the primary colors?',
              options: ['Red', 'Blue', 'Yellow'],
              tooltip: 'Pick the one you like the most',
              component: 'select',
              placeholder: '',
            },
            'general:3': {
              idx: 3,
              prompt: 'How many employees did your company have as of the end of last calendar year?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: 'Enter number of employees',
              additional_context: {
                prompt: 'Please explain your answer',
                component: 'textarea',
                placeholder: 'Write in here',
                operator: '<', // could be ==, >, <, <=, >=
                comparison: 10,
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: 'General questions about your business',
        },
      },
      submitted: true,
    },
  };
};

export const getJourneyOverviewMock = (): SurveyPayloadType => {
  return {
    id: 'ca3ad2ed-619b-4ee0-834e-2e56c336dba8',
    name: 'journey_overview',
    type: 'JOURNEY',
    description: 'Introductory survey to understand where an organization currently stands with climate',
    created_at: '2023-09-18T23:37:55.849Z',
    updated_at: '2023-09-18T23:37:55.959Z',
    definition: {
      title: 'Welcome to Cold!',
      sections: {
        general: {
          title: 'General',
          prompt: '',
          component: null,
          follow_up: {
            employee_count: {
              idx: 0,
              prompt: 'How many employees did your company have as of the end of last calendar year?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: '',
            },
            company_industry: {
              idx: 1,
              prompt: 'Which industry is your company a part of?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: 'Enter your industry',
            },
            operating_regions: {
              idx: 2,
              prompt: 'In which regions do you operate?',
              options: [
                'North America - United States',
                'North America - Canada, Mexico, or Central America',
                'South America',
                'Africa',
                'Asia',
                'Europe',
                'Oceania',
                'Not Applicable',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            growth_expectations: {
              idx: 3,
              prompt: 'How quickly do you expect your company to grow over the next five years?',
              options: ['Light (e.g. < 5% Year-over-Year)', 'Moderate (e.g. 5-15% Year-over-year)', 'Aggressive (e.g. > 15% Year-over-Year)'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
          category_idx: 0,
          category_description: 'Basic information about your company',
        },
        product: {
          title: 'Product',
          prompt: 'Do you make, sell, or distribute a physical product?',
          component: 'yes_no',
          follow_up: {
            lca_use: {
              idx: 0,
              prompt: 'Have you conducted LCAs (life-cycle analyses) to determine the environmental impact of your products?',
              options: ['Yes, for all products', 'Yes, for some products', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            air_freight: {
              idx: 4,
              prompt: 'How much of your freight shipping is done by air?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: "Skip if you don't import freight.",
              component: 'select',
              placeholder: '',
            },
            air_shipping: {
              idx: 6,
              prompt: 'How much of your product shipping is done by air?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: "Skip if you don't ship products to customers.",
              component: 'select',
              placeholder: '',
            },
            freight_import: {
              idx: 3,
              prompt: 'Do you import any freight into countries where you manufacture or sell your product(s)?',
              options: [],
              tooltip: 'Freight includes all raw materials, secondary goods, or final products you import into a country where you manufacture and/or sell your product',
              component: 'yes_no',
              placeholder: '',
            },
            product_shipping: {
              idx: 5,
              prompt: 'Do you ship products to customers or retailers?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            manufacturing_utility_use: {
              idx: 1,
              prompt:
                'Do you monitor and report usage for the following in your manufacturing facilities, or do you ask manufacturing partners to monitor and report on the following?',
              options: ['Water', 'Electricity', 'Gas', 'Waste', 'None of these'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            maufacturing_utility_reduction: {
              idx: 2,
              prompt: 'Do you have reduction targets per unit of output in place for any of the following?',
              options: ['Water', 'Electricity', 'Gas', 'Waste', 'None of these'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Product.png',
          category_idx: 4,
          category_description: 'Information about products your company makes or distributes',
        },
        vehicles: {
          title: 'Vehicles',
          prompt: 'Does your company own or lease vehicles?',
          component: 'yes_no',
          follow_up: {
            electric_fleet: {
              idx: 0,
              prompt: 'How many vehicles in your fleet are electric?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Vehicles.png',
          category_idx: 3,
          category_description: 'Information about vehicles your company owns or leases',
        },
        employees: {
          title: 'Employees',
          prompt: '',
          component: null,
          follow_up: {
            food_education: {
              idx: 1,
              prompt: 'Do you educate employees on the environmental impact of foods consumed at company facilities and at home?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_benefits: {
              idx: 0,
              prompt: 'What climate-friendly benefits do you offer to your employees?',
              options: [
                'ESG-focused 401k options',
                'Climate-friendly commuter benefits',
                'EE & HVAC home improvement benefits',
                'We provide non-EE/HVAC climate-friendly home improvement benefits',
                'We support employee at-home renewables purchasing',
                'We support employee on-site renewables adoption',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            employee_opportunities: {
              idx: 2,
              prompt: 'Do you offer any of the following to your employees?',
              options: ['Climate education', 'Local environmental leadership experiences', 'Paid volunteering opportunities with mission-aligned NGOs or community organizations'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Employees.png',
          category_idx: 7,
          category_description: 'Information about benefits you provide to your employees and how you engage them on climate',
        },
        machinery: {
          title: 'Machinery',
          prompt: 'Does your company own or lease industrial machinery?',
          component: 'yes_no',
          follow_up: {
            machine_energy: {
              idx: 0,
              prompt: 'Do you monitor and record industrial machinery energy use in order to optimize energy performance and conservation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Machinery.png',
          category_idx: 5,
          category_description: 'Information about industrial machinery used in your operations',
        },
        facilities: {
          title: 'Facilities',
          prompt: 'Does your company own or lease any facilities?',
          component: 'yes_no',
          follow_up: {
            gas_monitoring: {
              idx: 4,
              prompt: 'At which of your facilities do you monitor and record gas use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            waste_education: {
              idx: 7,
              prompt: 'Do you educate employees to properly dispose of waste at all offices and facilities?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            facilities_count: {
              idx: 0,
              prompt: 'How many locations do you own or lease?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: '',
            },
            waste_receptacles: {
              idx: 6,
              prompt: 'Do you offer the following waste diversion receptacles at some or all of your facilities?',
              options: ['Electronic waste', 'Compost / organics', 'Paper and cardboard recycling', 'Glass, aluminum, and plastics recycling'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            renewable_estimate: {
              idx: 1,
              prompt: 'How much of your electricity came from renewable electricity generated on-site at your facilities? ',
              options: ['All', 'Some', 'None'],
              tooltip: '(i.e. if you own, you installed your own solar panels; if you lease, your landlord has installed solar panels)',
              component: 'select',
              placeholder: '',
            },
            renewable_purchased: {
              idx: 2,
              prompt: 'How much of your electricity was renewable electricity you purchased from your utility provider?',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            electricity_monitoring: {
              idx: 3,
              prompt: 'At which of your facilities do you monitor and record electricity use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            facilities_actions_taken: {
              idx: 5,
              prompt: "Which of the following actions have you taken to improve your climate impact at any of your organization's facilities?",
              options: [
                'Optimized building management systems for energy usage (i.e. set points, lighting timers, etc.)',
                'Installed LED bulbs, programmable thermostats, occupancy sensors, or other equipment to support energy efficiency and conservation',
                'Replaced devices and appliances with low-energy certified alternatives (e.g., Energy Star)',
                'Implemented company policies for energy efficiency and conservation ',
                'Conducted energy audit within last year to assess energy efficiency improvement opportunities',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Facilities.png',
          category_idx: 1,
          category_description: 'Information about any facilities your company manages',
        },
        purchasing: {
          title: 'Office Purchasing',
          prompt: '',
          component: null,
          follow_up: {
            reusable_water: {
              idx: 3,
              prompt: 'Have you eliminated bottled water in office and do you provide filtered water stations and reusable glasses?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            used_donations: {
              idx: 6,
              prompt: 'Do you donate any unused office supplies, equipment, or furniture to local organizations?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            paper_purchasing: {
              idx: 1,
              prompt: 'Do you purchase only certified deforestation-free or 100% post-consumer recycled paper & paper products (towels & napkins, etc.)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            energystar_equipment: {
              idx: 5,
              prompt: 'Do you purchase EnergyStar top performing for all digital equipment?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            double_sided_printing: {
              idx: 2,
              prompt: 'Have you implemented a policy to minimize printing and require double-sided printing?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            eco_friendly_cleaning: {
              idx: 4,
              prompt: 'Do you require custodial staff to use only non-toxic and environmentally-friendly cleaning supplies?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            environmental_purchasing: {
              idx: 0,
              prompt: 'Have you written and implemented an environmentally preferred purchasing policy?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Purchasing.png',
          category_idx: 6,
          category_description: "Information about your company's purchasing decisions and policies",
        },
        commuting_travel: {
          title: 'Commuting & Travel',
          prompt: '',
          component: null,
          follow_up: {
            commute_drive: {
              idx: 2,
              prompt: 'Approximately how many employees drive to work when commuting?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_wfh: {
              idx: 1,
              prompt: 'Approximately how many days per week are work-from-home days across all employees, on average?',
              options: ['One', 'Two', 'Three', 'Four'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            business_travel: {
              idx: 3,
              prompt: 'Roughly how many employees regularly travel for business?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_structure: {
              idx: 0,
              prompt: 'How is your employee workforce structured?',
              options: [
                'All or nearly all employees work on-site or at office full-time',
                'Most or many employees work hybrid schedules',
                'All or nearly all employees work remotely full-time',
                'None of the above',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/CommutingTravel.png',
          category_idx: 2,
          category_description: "Information about your employee's commuting and business travel habits",
        },
        climate_leadership: {
          title: 'Climate Leadership',
          prompt: '',
          component: null,
          follow_up: {
            ghg_target: {
              idx: 2,
              prompt: 'Has your organization set a company-wide GHG emissions reduction target?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            cost_of_carbon: {
              idx: 1,
              prompt: 'Do you incorporate the cost of carbon into financial accounting and decision making?',
              options: ['No', 'We implement a shadow or proxy price on carbon', 'We implement an internal price on carbon aligned with or higher than the social cost of carbon'],
              tooltip:
                'Carbon prices help businesses to assess the climate-related externalities of doing business. Externalities, in this case, refer to the social and environmental cost of greenhouse gas emissions associated with key business activities that are otherwise not included or reflected in company balance sheets or transaction analyses. Companies implement a "shadow or proxy price on carbon" to help them better understand their company\'s social and environmental impact or to project potential impacts to the bottom-line under scenarios where regulators adopt or strengthen carbon tax policies. Implementing an "internal price on carbon" typically involves incorporating the cost of climate-related externalities into departmental balance sheets or cost-benefit analyses, which directly affects bottom-line decision making.',
              component: 'select',
              placeholder: '',
            },
            vendor_screening: {
              idx: 6,
              prompt: 'Do you have a screening policy to evaluate and support supplier/vendor climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_disclosure: {
              idx: 5,
              prompt: 'Do you publicly disclose any of your environmental performance or impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            external_leadership: {
              idx: 7,
              prompt: 'Do you do any of the following?',
              options: [
                'Participate in panels or public events on mission-aligned topics',
                'Engage with scientists, research institutions, or other experts to drive impact',
                'Donate to  scientists, research institutions, or other experts to drive impact',
                'Engage with mission-aligned peer companies or industry associations',
                'Engage with mission-aligned NGOs, non-profits, or community organizations',
                'Donate to mission-aligned NGO, non-profits, or community organizations',
                'Match employee donations to NGOs or community organizations',
                'Have a product-based impact program, where a % of revenue is given to an NGO, non-profit, or community organization?',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            financial_screening: {
              idx: 0,
              prompt: 'Do you screen potential banking & financial partners for climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_hr_decisions: {
              idx: 3,
              prompt: 'Do you consider environmental issues in HR-related matters such as recruitment or compensation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_company_decisions: {
              idx: 4,
              prompt: 'Does your board consider environmental impact as a part of company decision making?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/ClimateLeadership.png',
          category_idx: 8,
          category_description: 'Efforts your company makes to bring climate to the forefront of decision making',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        "Thanks for joining Cold. We'll start with our initial overview questionnaire.\n\nThis is a short set of questions to help us understand where you are on your climate journey and where you might be able to go next.",
      submitted: true,
    },
  };
};

export const getSurveyMockSomeCompleted = (): SurveyPayloadType => {
  return {
    id: 'ca3ad2ed-619b-4ee0-834e-2e56c336dba8',
    name: 'journey_overview',
    type: 'JOURNEY',
    description: 'Introductory survey to understand where an organization currently stands with climate',
    created_at: '2023-09-18T23:37:55.849Z',
    updated_at: '2023-09-18T23:37:55.959Z',
    definition: {
      title: 'Welcome to Cold!',
      sections: {
        general: {
          title: 'General',
          prompt: '',
          component: null,
          follow_up: {
            employee_count: {
              idx: 0,
              prompt: 'How many employees did your company have as of the end of last calendar year?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: '',
              value: 100,
              skipped: false,
            },
            company_industry: {
              idx: 1,
              prompt: 'Which industry is your company a part of?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: 'Enter your industry',
              value: 'Tech',
              skipped: false,
            },
            operating_regions: {
              idx: 2,
              prompt: 'In which regions do you operate?',
              options: [
                'North America - United States',
                'North America - Canada, Mexico, or Central America',
                'South America',
                'Africa',
                'Asia',
                'Europe',
                'Oceania',
                'Not Applicable',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              value: null,
              skipped: true,
            },
            growth_expectations: {
              idx: 3,
              prompt: 'How quickly do you expect your company to grow over the next five years?',
              options: ['Light (e.g. < 5% Year-over-Year)', 'Moderate (e.g. 5-15% Year-over-year)', 'Aggressive (e.g. > 15% Year-over-Year)'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              value: null,
              skipped: true,
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
          category_idx: 0,
          category_description: 'Basic information about your company',
        },
        product: {
          title: 'Product',
          prompt: 'Do you make, sell, or distribute a physical product?',
          component: 'yes_no',
          follow_up: {
            lca_use: {
              idx: 0,
              prompt: 'Have you conducted LCAs (life-cycle analyses) to determine the environmental impact of your products?',
              options: ['Yes, for all products', 'Yes, for some products', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            air_freight: {
              idx: 4,
              prompt: 'How much of your freight shipping is done by air?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: "Skip if you don't import freight.",
              component: 'select',
              placeholder: '',
            },
            air_shipping: {
              idx: 6,
              prompt: 'How much of your product shipping is done by air?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: "Skip if you don't ship products to customers.",
              component: 'select',
              placeholder: '',
            },
            freight_import: {
              idx: 3,
              prompt: 'Do you import any freight into countries where you manufacture or sell your product(s)?',
              options: [],
              tooltip: 'Freight includes all raw materials, secondary goods, or final products you import into a country where you manufacture and/or sell your product',
              component: 'yes_no',
              placeholder: '',
            },
            product_shipping: {
              idx: 5,
              prompt: 'Do you ship products to customers or retailers?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            manufacturing_utility_use: {
              idx: 1,
              prompt:
                'Do you monitor and report usage for the following in your manufacturing facilities, or do you ask manufacturing partners to monitor and report on the following?',
              options: ['Water', 'Electricity', 'Gas', 'Waste', 'None of these'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            maufacturing_utility_reduction: {
              idx: 2,
              prompt: 'Do you have reduction targets per unit of output in place for any of the following?',
              options: ['Water', 'Electricity', 'Gas', 'Waste', 'None of these'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Product.png',
          category_idx: 4,
          category_description: 'Information about products your company makes or distributes',
        },
        vehicles: {
          title: 'Vehicles',
          prompt: 'Does your company own or lease vehicles?',
          component: 'yes_no',
          follow_up: {
            electric_fleet: {
              idx: 0,
              prompt: 'How many vehicles in your fleet are electric?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Vehicles.png',
          category_idx: 3,
          category_description: 'Information about vehicles your company owns or leases',
        },
        employees: {
          title: 'Employees',
          prompt: '',
          component: null,
          follow_up: {
            food_education: {
              idx: 1,
              prompt: 'Do you educate employees on the environmental impact of foods consumed at company facilities and at home?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_benefits: {
              idx: 0,
              prompt: 'What climate-friendly benefits do you offer to your employees?',
              options: [
                'ESG-focused 401k options',
                'Climate-friendly commuter benefits',
                'EE & HVAC home improvement benefits',
                'We provide non-EE/HVAC climate-friendly home improvement benefits',
                'We support employee at-home renewables purchasing',
                'We support employee on-site renewables adoption',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            employee_opportunities: {
              idx: 2,
              prompt: 'Do you offer any of the following to your employees?',
              options: ['Climate education', 'Local environmental leadership experiences', 'Paid volunteering opportunities with mission-aligned NGOs or community organizations'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Employees.png',
          category_idx: 7,
          category_description: 'Information about benefits you provide to your employees and how you engage them on climate',
        },
        machinery: {
          title: 'Machinery',
          prompt: 'Does your company own or lease industrial machinery?',
          component: 'yes_no',
          follow_up: {
            machine_energy: {
              idx: 0,
              prompt: 'Do you monitor and record industrial machinery energy use in order to optimize energy performance and conservation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Machinery.png',
          category_idx: 5,
          category_description: 'Information about industrial machinery used in your operations',
        },
        facilities: {
          title: 'Facilities',
          prompt: 'Does your company own or lease any facilities?',
          component: 'yes_no',
          follow_up: {
            gas_monitoring: {
              idx: 4,
              prompt: 'At which of your facilities do you monitor and record gas use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            waste_education: {
              idx: 7,
              prompt: 'Do you educate employees to properly dispose of waste at all offices and facilities?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            facilities_count: {
              idx: 0,
              prompt: 'How many locations do you own or lease?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: '',
            },
            waste_receptacles: {
              idx: 6,
              prompt: 'Do you offer the following waste diversion receptacles at some or all of your facilities?',
              options: ['Electronic waste', 'Compost / organics', 'Paper and cardboard recycling', 'Glass, aluminum, and plastics recycling'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            renewable_estimate: {
              idx: 1,
              prompt: 'How much of your electricity came from renewable electricity generated on-site at your facilities? ',
              options: ['All', 'Some', 'None'],
              tooltip: '(i.e. if you own, you installed your own solar panels; if you lease, your landlord has installed solar panels)',
              component: 'select',
              placeholder: '',
            },
            renewable_purchased: {
              idx: 2,
              prompt: 'How much of your electricity was renewable electricity you purchased from your utility provider?',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            electricity_monitoring: {
              idx: 3,
              prompt: 'At which of your facilities do you monitor and record electricity use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            facilities_actions_taken: {
              idx: 5,
              prompt: "Which of the following actions have you taken to improve your climate impact at any of your organization's facilities?",
              options: [
                'Optimized building management systems for energy usage (i.e. set points, lighting timers, etc.)',
                'Installed LED bulbs, programmable thermostats, occupancy sensors, or other equipment to support energy efficiency and conservation',
                'Replaced devices and appliances with low-energy certified alternatives (e.g., Energy Star)',
                'Implemented company policies for energy efficiency and conservation ',
                'Conducted energy audit within last year to assess energy efficiency improvement opportunities',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Facilities.png',
          category_idx: 1,
          category_description: 'Information about any facilities your company manages',
        },
        purchasing: {
          title: 'Office Purchasing',
          prompt: '',
          component: null,
          follow_up: {
            reusable_water: {
              idx: 3,
              prompt: 'Have you eliminated bottled water in office and do you provide filtered water stations and reusable glasses?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            used_donations: {
              idx: 6,
              prompt: 'Do you donate any unused office supplies, equipment, or furniture to local organizations?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            paper_purchasing: {
              idx: 1,
              prompt: 'Do you purchase only certified deforestation-free or 100% post-consumer recycled paper & paper products (towels & napkins, etc.)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            energystar_equipment: {
              idx: 5,
              prompt: 'Do you purchase EnergyStar top performing for all digital equipment?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            double_sided_printing: {
              idx: 2,
              prompt: 'Have you implemented a policy to minimize printing and require double-sided printing?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            eco_friendly_cleaning: {
              idx: 4,
              prompt: 'Do you require custodial staff to use only non-toxic and environmentally-friendly cleaning supplies?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            environmental_purchasing: {
              idx: 0,
              prompt: 'Have you written and implemented an environmentally preferred purchasing policy?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Purchasing.png',
          category_idx: 6,
          category_description: "Information about your company's purchasing decisions and policies",
        },
        commuting_travel: {
          title: 'Commuting & Travel',
          prompt: '',
          component: null,
          follow_up: {
            commute_drive: {
              idx: 2,
              prompt: 'Approximately how many employees drive to work when commuting?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_wfh: {
              idx: 1,
              prompt: 'Approximately how many days per week are work-from-home days across all employees, on average?',
              options: ['One', 'Two', 'Three', 'Four'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            business_travel: {
              idx: 3,
              prompt: 'Roughly how many employees regularly travel for business?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_structure: {
              idx: 0,
              prompt: 'How is your employee workforce structured?',
              options: [
                'All or nearly all employees work on-site or at office full-time',
                'Most or many employees work hybrid schedules',
                'All or nearly all employees work remotely full-time',
                'None of the above',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/CommutingTravel.png',
          category_idx: 2,
          category_description: "Information about your employee's commuting and business travel habits",
        },
        climate_leadership: {
          title: 'Climate Leadership',
          prompt: '',
          component: null,
          follow_up: {
            ghg_target: {
              idx: 2,
              prompt: 'Has your organization set a company-wide GHG emissions reduction target?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            cost_of_carbon: {
              idx: 1,
              prompt: 'Do you incorporate the cost of carbon into financial accounting and decision making?',
              options: ['No', 'We implement a shadow or proxy price on carbon', 'We implement an internal price on carbon aligned with or higher than the social cost of carbon'],
              tooltip:
                'Carbon prices help businesses to assess the climate-related externalities of doing business. Externalities, in this case, refer to the social and environmental cost of greenhouse gas emissions associated with key business activities that are otherwise not included or reflected in company balance sheets or transaction analyses. Companies implement a "shadow or proxy price on carbon" to help them better understand their company\'s social and environmental impact or to project potential impacts to the bottom-line under scenarios where regulators adopt or strengthen carbon tax policies. Implementing an "internal price on carbon" typically involves incorporating the cost of climate-related externalities into departmental balance sheets or cost-benefit analyses, which directly affects bottom-line decision making.',
              component: 'select',
              placeholder: '',
            },
            vendor_screening: {
              idx: 6,
              prompt: 'Do you have a screening policy to evaluate and support supplier/vendor climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_disclosure: {
              idx: 5,
              prompt: 'Do you publicly disclose any of your environmental performance or impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            external_leadership: {
              idx: 7,
              prompt: 'Do you do any of the following?',
              options: [
                'Participate in panels or public events on mission-aligned topics',
                'Engage with scientists, research institutions, or other experts to drive impact',
                'Donate to  scientists, research institutions, or other experts to drive impact',
                'Engage with mission-aligned peer companies or industry associations',
                'Engage with mission-aligned NGOs, non-profits, or community organizations',
                'Donate to mission-aligned NGO, non-profits, or community organizations',
                'Match employee donations to NGOs or community organizations',
                'Have a product-based impact program, where a % of revenue is given to an NGO, non-profit, or community organization?',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            financial_screening: {
              idx: 0,
              prompt: 'Do you screen potential banking & financial partners for climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_hr_decisions: {
              idx: 3,
              prompt: 'Do you consider environmental issues in HR-related matters such as recruitment or compensation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_company_decisions: {
              idx: 4,
              prompt: 'Does your board consider environmental impact as a part of company decision making?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/ClimateLeadership.png',
          category_idx: 8,
          category_description: 'Efforts your company makes to bring climate to the forefront of decision making',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        "Thanks for joining Cold. We'll start with our initial overview questionnaire.\n\nThis is a short set of questions to help us understand where you are on your climate journey and where you might be able to go next.",
    },
  };
};

export function getSurveySectionMock() {
  return getSurveyFormDataPayload().definition.sections;
}

export function getSurveySectionScrollableMock(): {
  [key: string]: SurveySectionType;
} {
  const surveyData = getSurveyFormDataPayload().definition.sections;

  const SECTIONS_TO_ADD = 16;
  for (let i = 1; i <= SECTIONS_TO_ADD; i++) {
    surveyData['product' + i] = {
      title: 'Product' + i,
      prompt: 'Does your company make a physical product?',
      component: 'yes_no',
      follow_up: {},
      image_url:
        'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category_idx: i,
      category_description: 'Questions about how your products are produced',
    };
  }
  return surveyData;
}

export function getSurveyFormDataPayload(): SurveyPayloadType {
  return {
    id: '622fe082-a490-49a3-97f1-9cb511b53581',
    name: 'qaalib_test',
    type: 'ONBOARDING',
    description: 'A survey that exercises lots of sections and components',
    created_at: '2023-08-14T16:14:14.128Z',
    updated_at: '2023-08-14T16:14:14.128Z',
    definition: getTestingSurveyFormDefinitionData().definition,
  };
}

export function getSurveysMock(): Array<SurveyPayloadType | ComplianceSurveyPayloadType> {
  const surveys = [];
  surveys.push(getTestingSurveyFormDefinitionData());
  surveys.push(getJourneyOverviewMock());
  surveys.push({
    id: '5244b099-2978-4d0d-bce7-e5b124d48e2d',
    name: 'footprint_overview',
    type: 'FOOTPRINT',
    description: "Survey for evaluating a company's basic carbon emissions",
    created_at: '2023-09-28T01:21:31.390Z',
    updated_at: '2023-09-28T01:21:31.482Z',
    definition: {
      title: 'Understanding your emissions',
      sections: {
        travel: {
          title: 'Travel',
          prompt: '',
          component: null,
          follow_up: {
            travel_spend: {
              idx: 1,
              prompt: 'How much did your company spend on travel costs in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            travel_percent: {
              idx: 0,
              prompt: 'Approximately what percent of employees travel for business?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            air_spend_percent: {
              idx: 2,
              prompt: 'Approximately what percentage of that expense was spent on air travel versus non-air travel (car, hotel, ground transportation)?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            fuel_cost_vehicles: {
              idx: 3,
              prompt: 'What was the estimated total fuel cost of owned and leased vehicles?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FFootprint%20-%20Travel.png',
          category_idx: 3,
          category_description: 'Emissions due to work travel',
        },
        product: {
          title: 'Product',
          prompt: '',
          component: null,
          follow_up: {
            cogs: {
              idx: 0,
              prompt: "What was your company's estimated total COGS for the last calendar year?",
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            wood_spend: {
              idx: 4,
              prompt: 'How much did you spend on wood in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            metal_spend: {
              idx: 3,
              prompt: 'How much did you spend on metal in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            textile_spend: {
              idx: 1,
              prompt: 'How much did you spend on textiles in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            chemical_spend: {
              idx: 5,
              prompt: 'How much did you spend on chemicals in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            packaging_cost: {
              idx: 12,
              prompt: "What was your company's total cost of packaging materials in the last calendar year?",
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            plastics_spend: {
              idx: 2,
              prompt: 'How much did you spend on plastics & rubber in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            air_import_percent: {
              idx: 9,
              prompt: 'Approximately what percentage of that expense was spent on air-based versus bulk (train, cargo ship, etc) shipping?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            air_outbound_percent: {
              idx: 11,
              prompt: 'Approximately what percentage of that expense was spent on air-based versus ground-based shipping?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            import_shipping_cost: {
              idx: 8,
              prompt: "What was your company's total cost of import shipping in the last calendar year?",
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            apparel_leather_spend: {
              idx: 6,
              prompt: 'How much did you spend on apparel & leather in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            other_materials_spend: {
              idx: 7,
              prompt: 'How much did you spend on Other materials in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            outbound_shipping_cost: {
              idx: 10,
              prompt: "What was your company's total cost of shipping product to customers in the last calendar year?",
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Machinery.png',
          category_idx: 4,
          category_description: 'Emissions from product manufacturing and distribution',
        },
        commuting: {
          title: 'Commuting',
          prompt: '',
          component: null,
          follow_up: {
            commute_car: {
              idx: 3,
              prompt: 'Approximately what percent of employees commute via car?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            commute_length: {
              idx: 2,
              prompt: 'What is the average one-way commute length in miles?',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: 'Enter value',
            },
            commute_scooter: {
              idx: 6,
              prompt: 'Approximately what percent of employees commute via scooter or ebike?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            average_work_week: {
              idx: 0,
              prompt: "How many days are in your company's average work week?",
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: 'Enter value',
            },
            commute_walk_bike: {
              idx: 4,
              prompt: 'Approximately what percent of employees commute by walking or biking?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            commute_public_transit: {
              idx: 5,
              prompt: 'Approximately what percent of employees commute by taking public transit?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
            commute_employee_percent: {
              idx: 1,
              prompt: 'What percentage of employees regularly commute to work at company facilities?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/CommutingTravel.png',
          category_idx: 1,
          category_description: 'Emissions from employee commuting',
        },
        facilities: {
          title: 'Facilities',
          prompt: '',
          component: null,
          follow_up: {
            diesel: {
              idx: 4,
              prompt: 'How much did you spend on diesel for owned and leased spaces in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            gasoline: {
              idx: 3,
              prompt: 'How much did you spend on gasoline for owned and leased spaces in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            electricity: {
              idx: 0,
              prompt: 'How much did you spend on electricity for owned and leased spaces in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            heating_oil: {
              idx: 2,
              prompt: 'How much did you spend on heating oil for owned and leased spaces in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            natural_gas: {
              idx: 1,
              prompt: 'How much did you spend on natural gas for owned and leased spaces in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            renewable_percent: {
              idx: 5,
              prompt: 'What percentage of your electricity spend was on renewable energy?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FFootprint%20-%20Facilities.png',
          category_idx: 0,
          category_description: 'Emissions related to facilities you own or lease',
        },
        operations: {
          title: 'Operations',
          prompt: '',
          component: null,
          follow_up: {
            meals_and_e_spend: {
              idx: 1,
              prompt: 'How much did your company spend on meals & entertainment in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            fuel_cost_machinery: {
              idx: 0,
              prompt: 'What was the estimated total fuel cost (in USD) of owned and leased industrial machinery?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            cloud_software_spend: {
              idx: 5,
              prompt: 'How much did your company spend on cloud software or cloud computing services in the last calendar year? ',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            office_supplies_spend: {
              idx: 2,
              prompt: 'How much did your company spend on office supplies (paper, snacks, other consumable goods) in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            office_equipment_spend: {
              idx: 4,
              prompt: 'How much did your company spend on other office equipment (printers, computers, monitors, etc) in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            office_furniture_spend: {
              idx: 3,
              prompt: 'How much did your company spend on Office furniture (desks, chairs, etc) in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            purchased_vehicles_spend: {
              idx: 7,
              prompt: 'How much did your company spend on Purchased vehicles in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            purchased_machinery_spend: {
              idx: 8,
              prompt: 'How much did your company spend on purchased industrial machinery in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            professional_services_spend: {
              idx: 6,
              prompt: 'How much did your company spend on Professional services (legal, consulting, accounting, etc) in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
            purchased_capital_goods_spend: {
              idx: 9,
              prompt: 'How much did your company spend on Other purchased capital goods in the last calendar year?',
              options: [],
              tooltip: '',
              component: 'currency',
              placeholder: 'Enter value',
            },
          },
          image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/ClimateLeadership.png',
          category_idx: 5,
          category_description: 'Emissions due to company operations',
        },
        hybrid_work: {
          title: 'Hybrid Work',
          prompt: 'Do you have any policies that grant employees hybrid work opportunities (i.e. to work at home for one day a week, etc.)?',
          component: 'yes_no',
          follow_up: {
            hybrid_commute_days: {
              idx: 1,
              prompt: 'How many days per week do hybrid-working employees typically commute to work? ',
              options: [],
              tooltip: '',
              component: 'number',
              placeholder: 'Enter value',
            },
            hybrid_policy_coverage: {
              idx: 0,
              prompt: 'What percent of your commuting employees do these policies cover? ',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FFootprint%20-%20Hybrid%20Work.png',
          category_idx: 2,
          category_description: 'Emissions that might be mitigated through work from home policies',
        },
      },
      image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FFootprint%20-%20Overview.png',
      intro_markdown:
        "Now that we've finished understanding the basics of your company, we're going to dive into some of the numbers to do an initial evaluation of your carbon footprint.",
    },
  });
  surveys.push({
    id: '067d1343-86a7-4686-8e1b-7ae0de6b948b',
    name: 'live_test_demo',
    type: 'JOURNEY',
    description: 'Here we go!!!',
    created_at: '2023-09-21T19:20:18.363Z',
    updated_at: '2023-09-21T19:20:18.371Z',
    definition: {
      title: 'Are you kidding me?',
      sections: {
        troy: {
          title: "Troy's Section",
          prompt: 'Do you want to talk about Troy?',
          component: 'yes_no',
          follow_up: {
            ice_cream: {
              idx: 0,
              prompt: "What is troy's favorite ice cream?",
              options: ['Vanilla', 'Chocolate', 'All of the above'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              value: 'All of the above',
              skipped: false,
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1694618237009-39477c66a31b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2845&q=80',
          category_idx: 0,
          category_description: 'Questions all about Troy',
          value: true,
          skipped: false,
        },
      },
      image_url:
        'https://images.unsplash.com/photo-1695196312518-b1223a8298b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
      intro_markdown: 'Here is a brief introduction that is not styled yet',
      submitted: true,
    },
  });
  surveys.push({
    id: '6ec9038f-859b-4ec9-ac35-a21b6bd2cd34',
    name: 'test_survey',
    type: 'JOURNEY',
    description: 'A survey that exercises lots of sections and components for Qaalib to test everything with the survey',
    created_at: '2023-10-11T16:04:52.531Z',
    updated_at: '2023-12-12T16:08:48.801Z',
    definition: {
      title: 'Survey Test',
      sections: {
        general: {
          title: 'General',
          value: null,
          prompt: '',
          component: null,
          follow_up: {
            'general:0': {
              idx: 0,
              value: null,
              prompt: 'Which regions do you sell your product into?',
              options: ['North America', 'South America', 'Europe', 'Asia', 'Australia', 'Africa'],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            'general:1': {
              idx: 1,
              value: null,
              prompt: "What is your company's name?",
              options: [],
              tooltip: 'Enter your company name',
              component: 'text',
              placeholder: 'Yourco',
            },
            'general:2': {
              idx: 2,
              value: null,
              prompt: 'What is your favorite color of the primary colors?',
              options: ['Red', 'Blue', 'Yellow'],
              tooltip: 'Pick the one you like the most',
              component: 'select',
              placeholder: '',
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: 'General questions about your business',
        },
        product: {
          title: 'Product',
          value: true,
          prompt: 'Does your company make a physical product?',
          component: 'yes_no',
          follow_up: {
            'product:0': {
              idx: 1,
              prompt: 'Is your product made of metal?',
              options: [],
              tooltip: 'Select yes or no',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Why is it made of metal?',
                operator: '==',
                component: 'textarea',
                comparison: 'yes',
                placeholder: 'Tell me',
              },
              value: true,
              skipped: false,
            },
            'product:1': {
              idx: 2,
              value: null,
              prompt: 'How much does your product cost, in dollars?',
              options: [],
              tooltip: 'Enter the cost to your company to produce',
              component: 'currency',
              placeholder: '45',
              skipped: true,
            },
            'product:2': {
              idx: 3,
              value: null,
              prompt: 'What percent of your product is leather?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
              skipped: true,
            },
            'product:3': {
              idx: 4,
              value: null,
              prompt: 'How many factories make your product?',
              options: [],
              tooltip: 'Choose the number across all countries',
              component: 'number',
              placeholder: '2',
              skipped: true,
            },
            addl_context_test: {
              idx: 0,
              prompt: 'Do you like apples?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Tell me why you like apples!',
                operator: '==',
                component: 'textarea',
                comparison: 'yes',
                placeholder: 'Tell me',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          category_idx: 1,
          category_description: 'Questions about how your products are produced',
          skipped: false,
        },
        facilities: {
          title: 'Facilities',
          value: true,
          prompt: 'Do you own or lease any facilities like offices or warehouses?',
          component: 'yes_no',
          follow_up: {
            'facilities:0': {
              idx: 0,
              value: ['Black', 'Gray'],
              prompt: 'What colors are your office carpets?',
              options: ['Gray', 'Black', 'Orange', 'Blue', 'Purple'],
              tooltip: 'If carpets are multiple colors choose all colors that apply',
              component: 'multi_select',
              placeholder: '',
              skipped: false,
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          category_idx: 2,
          category_description: 'Questions about your the facilities you own or lease',
          skipped: false,
        },
      },
      image_url:
        'https://images.unsplash.com/photo-1603437873662-dc1f44901825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
      intro_markdown:
        "Welcome to Cold Climate!\n Let’s Start Your Journey to Absolute Zero™ \nWe will start with our basic company information survey. \nThis is a quick form to understand a little more about your company and what climate efforts you've already undertaken.",
      submitted: true,
    },
  });
  surveys.push({
    id: 'b5a544e8-c87e-48e2-9c92-d9352dcc2d33',
    name: 'rei_mfg_survey',
    type: 'TEST',
    description: "Introductory survey to gather information about a brand's manufacturing practices",
    created_at: '2024-01-17T17:36:53.231Z',
    updated_at: '2024-01-17T17:36:53.232Z',
    definition: {
      title: 'Manufacturing Code of Conduct',
      sections: {
        MFG: {
          title: 'Manufacturing Code of Conduct',
          prompt: '',
          component: null,
          follow_up: {
            'MFG-1': {
              idx: 0,
              prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: "Please describe how your brand plans to align with REI's expectation in this area.",
                operator: '==',
                component: 'textarea',
                comparison: false,
                placeholder: '',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-2': {
              idx: 1,
              prompt: 'Please indicate which of the following topics are included in your manufacturing code of conduct.',
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
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas',
                operator: '==',
                component: 'textarea',
                comparison: ['Other'],
                placeholder: '',
              },
              value: ['Transparency', 'Non-discrimination'],
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Transparency', 'Non-discrimination'],
              },
            },
            'MFG-3': {
              idx: 2,
              prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              value: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
              },
            },
            'MFG-4': {
              idx: 3,
              prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
                value: 'https://www.google.com',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-5': {
              idx: 4,
              prompt:
                'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-6': {
              idx: 5,
              prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please Describe',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
                value: 'We have a team of 10 people who do this',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-7': {
              idx: 6,
              prompt:
                'Approximately what percentage of your supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              based_on: 'MFG-6',
              component: 'textarea',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: '10%',
              },
            },
            'MFG-8': {
              idx: 7,
              prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-9': {
              idx: 8,
              prompt: 'Is your brand’s supplier list publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-10': {
              idx: 9,
              prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 4 (raw material suppliers)'],
              },
            },
            'MFG-11': {
              idx: 10,
              prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'MFG-12': {
              idx: 11,
              prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Manufacturing Code of Conduct survey to the best of your ability. If you have any questions, please contact your REI Merchandising contact.',
    },
  });
  surveys.push({
    id: 'b122c540-f736-4940-b179-b95b2d26e4e6',
    name: 'rei_ghg_survey',
    type: 'TEST',
    description: '',
    created_at: '2024-01-17T17:48:36.402Z',
    updated_at: '2024-01-17T17:48:36.404Z',
    definition: {
      title: 'Greenhouse Gas Emissions & Climate',
      sections: {
        GHG: {
          title: 'Greenhouse Gas Emissions & Climate',
          prompt: '',
          component: null,
          follow_up: {
            'GHG-1': {
              idx: 0,
              prompt: 'Has your brand measured its carbon footprint this year or within the last calendar year?',
              options: [],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-2': {
              idx: 1,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard (please indicate below)', 'No'],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              based_on: 'GHG-1',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, using another GHG accounting standard (please indicate below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'Yes, using the GHG Protocol',
              },
            },
            'GHG-3': {
              idx: 2,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Scope 1: Direct emissions from company vehicles & facilities'],
              },
            },
            'GHG-4': {
              idx: 3,
              prompt: "Has your brand 's carbon footprint been verified by an independent third-party?",
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to the verification document.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-5': {
              idx: 4,
              prompt: 'Does your brand report its carbon footprint publicly?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to your most recent public report.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-6': {
              idx: 5,
              prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
              options: [
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                'No',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['No'],
              },
            },
            'GHG-7': {
              idx: 7,
              prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-8': {
              idx: 11,
              prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
              options: [
                'Yes, our target(s) has been approved by the SBTi',
                'No, but our target(s) is currently being evaluated by the SBTi for approval',
                'No, but we’ve aligned our target(s) with the SBTi’s guidance',
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
                'No',
              ],
              tooltip:
                'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5oC above pre-industrial levels.',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Yes, our target(s) has been approved by the SBTi'],
              },
            },
            'GHG-10': {
              idx: 13,
              prompt:
                'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
              options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-11': {
              idx: 14,
              prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-12': {
              idx: 15,
              prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
                'All or a portion of scope 3 emissions, including all the products you sell to REI',
                'Other',
              ],
              tooltip: 'Select all that apply.',
              based_on: 'GHG-11',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-13': {
              idx: 16,
              prompt:
                'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
              options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-6A': {
              idx: 6,
              prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
              options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7A': {
              idx: 8,
              prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emissions from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other relevant upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7C': {
              idx: 10,
              prompt:
                'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
              options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-9A': {
              idx: 12,
              prompt: 'What are the primary components of your emissions reduction action plan?',
              options: [
                'Use of low-carbon materials or ingredients in products',
                'Use of clean energy in product manufacturing',
                'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)',
                'Minimization of materials waste in manufacturing',
                'Energy efficiency in manufacturing',
                'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)',
                'Supporting customers in reducing emissions during product use',
                'Other (please describe)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions , set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Greenhouse Gas Emissions & Climate survey to the best of your ability. If you have any questions, please contact your REI Sustainability Manager.',
    },
  });
  surveys.push({
    id: 'e85c4fb2-12dd-4be0-9027-5117c993e07f',
    name: 'rei_pkg_survey',
    type: 'TEST',
    description: '',
    created_at: '2024-01-17T17:51:59.384Z',
    updated_at: '2024-01-17T17:51:59.386Z',
    definition: {
      title: 'Packaging - General',
      sections: {
        PKG: {
          title: 'Packaging - General',
          prompt: '',
          component: null,
          follow_up: {
            'PKG-1': {
              idx: 0,
              prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
              value: 'We have a team of 10 people who do this',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'We have a team of 10 people who do this',
              },
            },
            'PKG-2': {
              idx: 1,
              prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'PKG-3': {
              idx: 2,
              prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'PKG-4': {
              idx: 3,
              prompt:
                'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: '',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Packaging - General survey below. This survey is intended to help REI understand your brand’s current efforts to reduce the environmental impact of your product packaging. Please complete this survey by October 1, 2021.',
    },
  });

  surveys.push({
    id: 'e85c4fb2-12dd-4be0-9027-5117c993e07f',
    name: 'rei_consolidated_survey',
    type: 'REI_COMPLIANCE',
    description: '',
    created_at: '2024-01-17T17:51:59.384Z',
    updated_at: '2024-01-17T17:51:59.386Z',
    definition: {
      title: 'REI Compliance Survey',
      sections: {
        GEN: {
          title: 'Brand Information',
          prompt: '',
          component: null,
          follow_up: {
            'GEN-1': {
              idx: 0,
              prompt: 'For which brand(s) are you completing the assessment?',
              options: [],
              tooltip: '',
              component: 'multi_text',
              placeholder: '',
            },
            'GEN-2': {
              idx: 1,
              prompt: 'Enter the REI vendor number(s) for the brand(s) listed above.',
              options: [],
              tooltip: '',
              component: 'multi_text',
              placeholder: '',
            },
            'GEN-3': {
              idx: 2,
              prompt: 'List the person completing the assessment.',
              options: [],
              tooltip: '',
              component: 'table',
              placeholder: '',
            },
            'GEN-4': {
              idx: 3,
              prompt: "List your brand's primary contact for product sustainability, if different from above.",
              options: [],
              tooltip: '',
              component: 'table',
              placeholder: '',
            },
            'GEN-5': {
              idx: 4,
              prompt: "List your brand's primary contact for diversity, equity & inclusion (DEI), if different from your response in GEN-3.",
              options: [],
              tooltip: '',
              component: 'table',
              placeholder: '',
            },
            'GEN-6': {
              idx: 5,
              prompt: 'List the email addresses of any other key sustainability contacts at your brand:',
              options: [],
              tooltip: 'If entering multiple email addresses, separate using commas',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-6A': {
              idx: 6,
              prompt: 'List the email addresses of any other key DEI contacts at your brand, if applicable.',
              options: [],
              tooltip: 'If entering multiple email addresses, separate using commas',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-7': {
              idx: 7,
              prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
              options: [],
              tooltip:
                'Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
              component: 'number',
              placeholder: '',
            },
            'GEN-8': {
              idx: 8,
              prompt:
                'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
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
              tooltip:
                'This is not an exhaustive list of product categories sold at REI. Your selection below will determine whether you see questions in the online version of the assessment that are specifically related to each product category.',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: 'General questions about your business',
          section_type: 'Practices',
        },
        PKG: {
          title: 'Packaging - General',
          prompt: '',
          component: null,
          follow_up: {
            'PKG-1': {
              idx: 0,
              prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'We have a team of 10 people who do this',
              },
            },
            'PKG-2': {
              idx: 1,
              prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'PKG-3': {
              idx: 2,
              prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'PKG-4': {
              idx: 3,
              prompt:
                'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 1,
          category_description: '',
          section_type: 'Product',
        },
        MFG: {
          title: 'Manufacturing Code of Conduct',
          prompt: '',
          component: null,
          follow_up: {
            'MFG-1': {
              idx: 0,
              prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: "Please describe how your brand plans to align with REI's expectation in this area.",
                operator: '==',
                component: 'textarea',
                comparison: false,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-2': {
              idx: 1,
              prompt: 'Please indicate which of the following topics are included in your manufacturing code of conduct.',
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
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas',
                operator: '==',
                component: 'textarea',
                comparison: ['Other'],
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Transparency', 'Non-discrimination'],
              },
            },
            'MFG-3': {
              idx: 2,
              prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
              },
            },
            'MFG-4': {
              idx: 3,
              prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-5': {
              idx: 4,
              prompt:
                'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-6': {
              idx: 5,
              prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please Describe',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-7': {
              idx: 6,
              prompt:
                'Approximately what percentage of your supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              based_on: 'MFG-6',
              component: 'textarea',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: '10%',
              },
            },
            'MFG-8': {
              idx: 7,
              prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-9': {
              idx: 8,
              prompt: 'Is your brand’s supplier list publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-10': {
              idx: 9,
              prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 4 (raw material suppliers)'],
              },
            },
            'MFG-11': {
              idx: 10,
              prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'MFG-12': {
              idx: 11,
              prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 2,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.',
          section_type: 'Product',
        },
        GHG: {
          title: 'Greenhouse Gas Emissions & Climate',
          prompt: '',
          component: null,
          follow_up: {
            'GHG-1': {
              idx: 0,
              prompt: 'Has your brand measured its carbon footprint this year or within the last calendar year?',
              options: [],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-2': {
              idx: 1,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard (please indicate below)', 'No'],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              based_on: 'GHG-1',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, using another GHG accounting standard (please indicate below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'Yes, using the GHG Protocol',
              },
            },
            'GHG-3': {
              idx: 2,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Scope 1: Direct emissions from company vehicles & facilities'],
              },
            },
            'GHG-4': {
              idx: 3,
              prompt: "Has your brand 's carbon footprint been verified by an independent third-party?",
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to the verification document.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-5': {
              idx: 4,
              prompt: 'Does your brand report its carbon footprint publicly?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to your most recent public report.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-6': {
              idx: 5,
              prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
              options: [
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                'No',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['No'],
              },
            },
            'GHG-6A': {
              idx: 6,
              prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
              options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7': {
              idx: 7,
              prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-7A': {
              idx: 8,
              prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emissions from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other relevant upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7B': {
              idx: 10,
              prompt:
                'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
              options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-8': {
              idx: 11,
              prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
              options: [
                'Yes, our target(s) has been approved by the SBTi',
                'No, but our target(s) is currently being evaluated by the SBTi for approval',
                'No, but we’ve aligned our target(s) with the SBTi’s guidance',
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
                'No',
              ],
              tooltip:
                'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5oC above pre-industrial levels.',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Yes, our target(s) has been approved by the SBTi'],
              },
            },
            'GHG-9': {
              idx: 12,
              prompt: 'What are the primary components of your emissions reduction action plan?',
              options: [
                'Use of low-carbon materials or ingredients in products',
                'Use of clean energy in product manufacturing',
                'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)',
                'Minimization of materials waste in manufacturing',
                'Energy efficiency in manufacturing',
                'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)',
                'Supporting customers in reducing emissions during product use',
                'Other (please describe)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-10': {
              idx: 13,
              prompt:
                'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
              options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-11': {
              idx: 14,
              prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-12': {
              idx: 15,
              prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
                'All or a portion of scope 3 emissions, including all the products you sell to REI',
                'Other',
              ],
              tooltip: 'Select all that apply.',
              based_on: 'GHG-11',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-13': {
              idx: 16,
              prompt:
                'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
              options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 3,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions , set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.',
          section_type: 'Environment',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Packaging - General survey below. This survey is intended to help REI understand your brand’s current efforts to reduce the environmental impact of your product packaging. Please complete this survey by October 1, 2021.',
    },
    progress: {
      total_score: 0,
      total_max_score: 100,
      total_review: 0,
      question_count: 87,
      percentage: 0,
      questions_answered: 0,
      sections: [
        {
          answered: 0,
          complete: false,
          questions: {
            'GEN-1': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-2': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-3': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-4': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-5': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-6': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-6A': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-7': {
              ai_answered: false,
              user_answered: false,
            },
            'GEN-8': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Brand Information',
          total: 9,
        },
        {
          answered: 0,
          complete: false,
          questions: {
            'MFG-1': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-10': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-11': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-12': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-2': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-3': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-4': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-5': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-6': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-7': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-8': {
              ai_answered: false,
              user_answered: false,
            },
            'MFG-9': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Manufacturing Code of Conduct',
          total: 12,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'CHEM-1': {
              ai_answered: false,
              user_answered: false,
            },
            'CHEM-2': {
              ai_answered: false,
              user_answered: false,
            },
            'CHEM-3': {
              ai_answered: false,
              user_answered: false,
            },
            'CHEM-4': {
              ai_answered: false,
              user_answered: false,
            },
            'CHEM-4A': {
              ai_answered: false,
              user_answered: false,
            },
            'CHEM-5': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Restricted Substances List & Chemicals Management',
          total: 6,
        },
        {
          answered: 0,
          complete: false,
          questions: {
            'GHG-1': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-2': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-3': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-4': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-5': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-6': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-6A': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-7': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-7A': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-7B': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-8': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-9': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-10': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-11': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-12': {
              ai_answered: false,
              user_answered: false,
            },
            'GHG-13': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Greenhouse Gas Emissions & Climate',
          total: 16,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'PFAS-A1': {
              ai_answered: false,
              user_answered: false,
            },
            'PFAS-A2': {
              ai_answered: false,
              user_answered: false,
            },
            'PFAS-T1': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Per- and Polyfluoroalkyl Substances',
          total: 3,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'APP-1': {
              ai_answered: false,
              user_answered: false,
            },
            'APP-2': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: Cultural Appropriation',
          total: 2,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'COL-1': {
              ai_answered: false,
              user_answered: false,
            },
            'COL-2': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: Inclusive Colorways',
          total: 2,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'COP-1': {
              ai_answered: false,
              user_answered: false,
            },
            'COP-2': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: Inclusive Copy',
          total: 2,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'MKT-1': {
              ai_answered: false,
              user_answered: false,
            },
            'MKT-2': {
              ai_answered: false,
              user_answered: false,
            },
            'MKT-3': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: Marketing Diversity',
          total: 3,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'ISS-1': {
              ai_answered: false,
              user_answered: false,
            },
            'ISS-2': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: Inclusive Sizing',
          total: 2,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'INC-1': {
              ai_answered: false,
              user_answered: false,
            },
            'INC-2': {
              ai_answered: false,
              user_answered: false,
            },
            'INC-3': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Diversity & Inclusion: General',
          total: 3,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'PSA-1': {
              ai_answered: false,
              user_answered: false,
            },
            'PSA-2': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Product Sustainability & Preferred Attributes',
          total: 2,
        },
        {
          answered: 0,
          complete: false,
          questions: {
            'PKG-1': {
              ai_answered: false,
              user_answered: false,
            },
            'PKG-2': {
              ai_answered: false,
              user_answered: false,
            },
            'PKG-3': {
              ai_answered: false,
              user_answered: false,
            },
            'PKG-4': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Packaging - General',
          total: 4,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'APK-1': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-2': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-3': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-4': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-5': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-6': {
              ai_answered: false,
              user_answered: false,
            },
            'APK-7': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Packaging - Apparel',
          total: 7,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'PRD-1': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-2': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-3': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-4': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-5': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-6': {
              ai_answered: false,
              user_answered: false,
            },
            'PRD-7': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Product Care, Repair, Reuse & End-of-life',
          total: 7,
        },
        {
          answered: 0,
          complete: true,
          questions: {
            'CRP-1': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-2': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-3': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-4': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-5': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-6': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-7': {
              ai_answered: false,
              user_answered: false,
            },
            'CRP-8': {
              ai_answered: false,
              user_answered: false,
            },
          },
          review: 0,
          title: 'Core Practices',
          total: 8,
        },
      ],
    },
  });

  surveys.push({
    id: '004466f6-158a-417d-a1bf-3d82d1b4d9b7',
    name: 'rei_pia_2024',
    type: 'COMPLIANCE',
    description: "2024 version of REI's product impact assessment",
    created_at: '2024-03-01T19:55:09.562Z',
    updated_at: '2024-03-01T19:55:09.743Z',
    definition: {
      title: 'REI 2024 Product Impact Assessment',
      version: 2024,
      sections: {
        FR: {
          title: 'Flame Retardant (FR) Chemicals',
          prompt: '',
          component: '',
          follow_up: {
            'FR-1': {
              idx: 59,
              prompt:
                'The REI Product Impact Standards include the expectation that all camping shelters supplied to REI be free of prohibited flame retardant (FR) chemicals.\n(See REI’s Product Impact Standards for a list of prohibited FR chemicals.)\n\nDoes your brand have a formal policy/target in place regarding the use of FR chemicals in your products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'FR-2': {
              idx: 60,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'FR-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'FR-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'FR-3': {
              idx: 61,
              prompt: 'Does your brand have plans to transition away from the use of all flame retardants in your tents?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Tents'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Tents'] })",
          },
          category_idx: 7,
          section_type: 'Materials',
          category_description: '',
        },
        WL: {
          title: 'Wool',
          prompt: '',
          component: '',
          follow_up: {
            'WL-1': {
              idx: 64,
              prompt:
                'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin wool meet standards that safeguard the well-being of sheep in the wool supply chain and prohibit mulesing.\n\nDoes your brand have a formal policy/target in place regarding animal welfare in your wool supply chain?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'WL-2': {
              idx: 65,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'WL-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'WL-1').value = true",
              },
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Products that contain wool'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Products that contain wool'] })",
          },
          category_idx: 9,
          section_type: 'Materials',
          category_description: '',
        },
        AFL: {
          title: 'Animal Fur & Exotic Leather',
          prompt: '',
          component: '',
          follow_up: {
            'AFL-1': {
              idx: 66,
              prompt:
                'The REI Product Impact Standards include the expectation that products supplied to REI do not contain animal fur or exotic leather. (See REI’s Product Impact Standards for a definition of exotic leather.)\n\nDoes your brand have a formal policy/target in place regarding the use of animal fur and exotic leather in your products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'AFL-2': {
              idx: 67,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'AFL-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'AFL-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'AFL-3': {
              idx: 68,
              prompt:
                'Does your brand have a formal policy/target in place regarding the geographic origin of the leather used in your products (e.g., avoiding sourcing from regions undergoing deforestation, etc.)?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'AFL-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'AFL-1').value = true",
              },
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Apparel', 'Products that contain leather'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel','Products that contain leather'] })",
          },
          category_idx: 10,
          section_type: 'Materials',
          category_description: '',
        },
        APK: {
          title: 'Packaging - Apparel',
          prompt: '',
          component: '',
          follow_up: {
            'APK-1': {
              idx: 122,
              prompt:
                'REI’s Vendor Guide indicates that brands shipping non-white apparel items to REI should do so without individual polybags. Brands will be charged a $.01/unit polybag recycling fee for apparel items arriving in individual polybags at an REI receiving location. Please refer to REI’s Vendor Guide (available on the REI Partners Site) for more information.\n\nApproximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in individual polybags?',
              rubric: {
                score_map: {
                  '0%': 1,
                  '100%': 0,
                  '1-25%': 0.8,
                  '26-50%': 0.6,
                  '51-75%': 0.4,
                  '76-99%': 0.2,
                  Unknown: 0,
                },
              },
              options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'APK-2': {
              idx: 123,
              prompt:
                'Approximately what percentage of the apparel product units your brand shipped to REI during the past calendar year were packaged in a master polybag containing all units in each carton?',
              options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'APK-3': {
              idx: 124,
              prompt: 'If you ship apparel items to REI without individual polybags, how are they packaged?',
              options: ['Roll-packed', 'Folded and stacked', 'Flat packed', 'Other'],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%'],
                    operator: 'has',
                    question: 'APK-1',
                  },
                ],
                expression: "true in $map($lookup(sections.*.follow_up, 'APK-1').value, function($v) { $v in ['Unknown','0%','1-25%','26-50%','51-75%','76-99%'] })",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'APK-4': {
              idx: 125,
              prompt: 'Approximately what percentage of the apparel product units that you ship to REI during the coming year will be packaged in individual polybags?',
              rubric: {
                score_map: {
                  '0%': 1,
                  '100%': 0,
                  '1-25%': 0.8,
                  '26-50%': 0.6,
                  '51-75%': 0.4,
                  '76-99%': 0.2,
                  Unknown: 0,
                },
              },
              options: ['Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'APK-5': {
              idx: 126,
              prompt:
                'As of the Spring 2024 product season, have you implemented as your standard practice the shipment of non-white apparel products to REI without the use of individual polybags?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'APK-6': {
              idx: 127,
              prompt:
                'If your brand is unable to ship non-white apparel items to REI without the use of individual polybags, please describe the key factors that prevent you from doing so.',
              options: [],
              tooltip: '',
              component: 'textarea',
              dependency: {
                conditions: [
                  {
                    values: ['No'],
                    operator: '==',
                    question: 'APK-5',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'APK-5').value = false",
              },
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Apparel'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel'] })",
          },
          category_idx: 20,
          section_type: 'Product',
          category_description: '',
        },
        APP: {
          title: 'Diversity & Inclusion: Cultural Appropriation',
          prompt: '',
          component: '',
          follow_up: {
            'APP-1': {
              idx: 69,
              prompt:
                'As part of the REI Product Impact Standards, REI has established several expectations related to diversity and inclusion that we would like brand partners to implement. The following questions are intended to understand brand partners’ current state in implementing these practices.\n\nThe REI Product Impact Standards include the expectation that each brand partner has in place creative controls to prevent cultural appropriation: plagiarism, theft and/or inappropriate use of designs, patterns, forms, materials, words/names, etc. that are culturally meaningful to and/or originated from underrepresented communities. These creative controls should ensure that the development of products, promotions, and marketing used during annual cultural moments (e.g., Pride, Black History Month etc.) is shaped by members of the represented communities.\n\nWhich option below best describes how your brand is actively mitigating cultural appropriation, as of Spring 2024 product lines and marketing?',
              rubric: {
                score_map: {
                  'We do not currently have creative controls in place to address cultural appropriation': 0,
                  'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation': 1,
                  'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process': 0.5,
                },
              },
              options: [
                'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
                'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
                'We do not currently have creative controls in place to address cultural appropriation',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'APP-2': {
              idx: 70,
              prompt: 'Which creative controls is your brand currently using to prevent cultural appropriation?',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.125,
                  'Hiring BIPOC creatives or design collectives': 0.125,
                  'Philanthropy/grantmaking to Native/Indigenous causes': 0.125,
                  'Reviewing potential product concerns with our REI Merchandising and/or Inclusion Marketing contacts': 0.125,
                  'Clarity around source of product names that are derived from cultural traditions, places, or language': 0.125,
                  'Transparency about the source of a design’s inspiration (on product labeling, PI provided to REI, your website, etc.)': 0.125,
                  'Use of marketing channels (website, social media, catalogue, etc.) to elevate Native artists, issues impacting tribal communities, etc.': 0.125,
                  'Partnering with Native/Indigenous consultants or organizations (tribal organizations, nonprofits, etc.) to ensure appropriate use of cultural designs': 0.125,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: [
                      'We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation',
                      'We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process',
                    ],
                    operator: 'has',
                    question: 'APP-1',
                  },
                ],
                expression:
                  "true in $map($lookup(sections.*.follow_up, 'APP-1').value, function($v) { $v in ['We have successfully implemented creative controls, documented processes and policies to avoid cultural appropriation','We have some creative controls in place to identify and mitigate cultural appropriation in our design process, but do not have a formal policy or process'] })",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 11,
          section_type: 'D & I',
          category_description: '',
        },
        BPA: {
          title: 'Bisphenol A',
          prompt: '',
          component: '',
          follow_up: {
            'BPA-1': {
              idx: 54,
              prompt:
                'The REI Product Impact Standards include the expectation that products supplied to REI that are meant to come in direct contact with food or liquids for human consumption be free of Bisphenol A (BPA).\n\nDoes your brand have a formal policy/target in place regarding the use of BPA in your products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'BPA-2': {
              idx: 55,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'BPA-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'BPA-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Cookware', 'Water bottles, food containers, dinnerware or utensils'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Cookware','Water bottles, food containers, dinnerware or utensils'] })",
          },
          category_idx: 5,
          section_type: 'Materials',
          category_description: '',
        },
        COL: {
          title: 'Diversity & Inclusion: Inclusive Colorways',
          prompt: '',
          component: '',
          follow_up: {
            'COL-1': {
              idx: 76,
              prompt:
                'The REI Product Impact Standards include the expectation that all wearable products supplied to REI be available in colorways appropriate for a range of skin tones/complexions; and that product marketed as ‘Nude’ including those with embellishments and/or linings intended to give the impression of bare skin or to mimic skin tone, be available in a range of tones.\n\nWhich of the following describes the active creative controls your brand has in place to ensure colorways of wearable products are appropriate for a variety of skin tones/complexions?',
              rubric: {
                score_map: {
                  'We have creative controls in place': 1,
                  'We do NOT have creative controls in place': 0,
                },
              },
              options: ['We have creative controls in place', 'We do NOT have creative controls in place'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'COL-2': {
              idx: 77,
              prompt: 'Which of the following strategies is your brand currently using to address inclusion in its color offering?',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.125,
                  'Diverse pool of product testers': 0.125,
                  'Feedback from employee resource groups or similar': 0.125,
                  'Designer/design team education on inclusion topics': 0.125,
                  'Participating in communities of practice related to inclusive design': 0.125,
                  'Diversity/inclusion reviews within product development/creative process': 0.125,
                  'Testing to ensure the availability of colorways to complement a range of complexions': 0.125,
                  'Offering a range of tones within products marketed as ‘Nude’ or intended to mimic skin': 0.125,
                  'Offering a range of tones for product embellishments and/or linings intended to give the impression of bare skin': 0.125,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Apparel'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel'] })",
          },
          category_idx: 14,
          section_type: 'D & I',
          category_description: '',
        },
        COP: {
          title: 'Diversity & Inclusion: Inclusive Copy',
          prompt: '',
          component: '',
          follow_up: {
            'COP-1': {
              idx: 74,
              prompt:
                'The REI Product Impact Standards include the expectation that each brand partner has in place creative controls to prevent the use of language in naming conventions (as applied to product, collection, color, or design); product information; marketing assets, etc., that negatively impact underrepresented groups (e.g., by reinforcing stereotypes, utilizing slurs, coopting cultural language, etc.).\n\nDoes your brand currently have in place policies or creative controls related to inclusive product copy?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'COP-2': {
              idx: 75,
              prompt: 'Which of the following policies or creative controls do you utilize as it relates to inclusive product copy?',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.125,
                  'Diverse pool of product testers': 0.125,
                  'Feedback from employee resource groups or similar': 0.125,
                  'Designer/design team education on inclusion topics': 0.125,
                  'Diversity & inclusion guidance in my brand’s style guide': 0.125,
                  'Participating in communities of practice related to inclusive copy': 0.125,
                  'Diversity/inclusion reviews within product development/creative process': 0.125,
                  'Use of other diversity style guides (e.g., NABJ Style Guide, GLAAD Media Guide, etc.)': 0.125,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'COP-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'COP-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 13,
          section_type: 'D & I',
          category_description: '',
        },
        CRP: {
          title: 'Core Practices',
          prompt: '',
          component: '',
          follow_up: {
            'CRP-1': {
              idx: 135,
              prompt: 'Is your brand an active member of or participant in any of the following globally recognized sustainability forums?',
              rubric: {
                max_score: 1,
                score_map: {
                  'B Corp': 1,
                  Others: 1,
                  'bluesign®': 1,
                  'Textile Exchange': 1,
                  '1% for the Planet': 1,
                  'Fair Wear Foundation': 1,
                  'Leather Working Group': 1,
                  'Fair Labor Association': 1,
                  'The Microfibre Consortium': 1,
                  'Ethical Trading Initiative': 1,
                  'Fair Factories Clearinghouse': 1,
                  'Sustainable Apparel Coalition': 1,
                  'Science Based Targets Initiative': 1,
                  'Global Social Compliance Programme': 1,
                  'Green Chemistry & Commerce Council': 1,
                  'Social and Labor Convergence Program': 1,
                  'Business Social Compliance Initiative': 1,
                  'Zero Discharge of Hazardous Chemicals': 1,
                  'PeopleForBikes Sustainability Working Group': 1,
                  'Snowsports Industries America ClimateUnited': 1,
                  'Footwear Distributors & Retailers of America': 1,
                  'Outdoor Industry Association Climate Action Corps': 1,
                  'Change Climate (formerly known as Climate Neutral)': 1,
                  'International Labour Organization Better Work Programme': 1,
                  'Outdoor Industry Association Sustainability Working Group': 1,
                  'Retail Industry Leaders Association: Sustainability Workgroups': 1,
                  'American Apparel & Footwear Association: Social Responsibility or Environmental Committees': 1,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please list here',
                operator: 'has',
                component: 'textarea',
                comparison: 'Others',
                placeholder: '',
              },
            },
            'CRP-2': {
              idx: 136,
              prompt: 'Does your brand have an ongoing commitment to donating a specific portion of your sales or profits to philanthropic causes?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'CRP-3': {
              idx: 137,
              prompt:
                'Does your brand publish regular public-facing updates on your sustainability commitments and progress toward those commitments (e.g., annual sustainability report)?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'CRP-4': {
              idx: 138,
              prompt:
                '(Optional) We want to explore ways we can best convene and support you and other brands we work with to deliver more inclusive and culturally relevant offerings to our customer, and extend positive impacts to the broader community. What practices, information, or other resources would you be interested in?',
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
              tooltip: '',
              component: 'multi_select',
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
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
            },
            'CRP-6': {
              idx: 140,
              prompt: '(Optional) If there are any other general comments or questions you would like to share with REI regarding product impact, please enter them below.',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 22,
          section_type: 'Practices',
          category_description: '',
        },
        DHT: {
          title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
          prompt: '',
          component: '',
          follow_up: {
            'DHT-1': {
              idx: 80,
              prompt:
                'The REI Product Impact Standards has an expectation that each brand partner that produces headwear (helmets, hats, headbands, hoods, balaclavas, hijab, etc.) to have in place guidelines for ensuring an inclusive assortment for a variety of hair types, including higher-volume and textured hair.\n\nWhich of the below options best represents how your brand is approaching the Diverse Hair Type Inclusion expectation?',
              rubric: {
                score_map: {
                  Other: 0.5,
                  'We have not implemented guidelines': 0,
                  'We have successfully implemented guidelines': 1,
                },
              },
              options: ['We have successfully implemented guidelines', 'We have not implemented guidelines', 'Other'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Headwear'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Headwear'] })",
          },
          category_idx: 16,
          section_type: 'D & I',
          category_description: '',
        },
        DWN: {
          title: 'Down',
          prompt: '',
          component: '',
          follow_up: {
            'DWN-1': {
              idx: 62,
              prompt:
                'The REI Product Impact Standards include the expectation that all products supplied to REI that contain virgin down meet standards that safeguard the well-being of ducks and geese in the down supply chain and prohibit live-plucking and force-feeding.\n\nDoes your brand have a formal policy/target in place regarding animal welfare in your down supply chain?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'DWN-2': {
              idx: 63,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'DWN-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'DWN-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Products that contain down'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Products that contain down'] })",
          },
          category_idx: 8,
          section_type: 'Materials',
          category_description: '',
        },
        GEN: {
          title: 'Brand Information',
          prompt: '',
          component: '',
          follow_up: {
            'GEN-2': {
              idx: 9,
              prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
              options: ['0', '1', '2-5', '6-10', '11-25', '26-50', '51+'],
              tooltip:
                'Note: Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
              component: 'select',
              placeholder: '',
            },
            'GEN-3': {
              idx: 10,
              prompt:
                'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
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
              tooltip:
                'Note: This is not an exhaustive list of product categories sold at REI. Your selection below will determine whether you see questions in the online version of the assessment that are specifically related to each product category.',
              component: 'multi_select',
              placeholder: '',
            },
            'GEN-0:1': {
              idx: 0,
              prompt: 'What is your REI Vendor ID?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
            },
            'GEN-0:2': {
              idx: 1,
              prompt: 'What is your Vendor Name?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
            },
            'GEN-0:3': {
              idx: 2,
              prompt: 'For which brand(s) are you completing the assessment?',
              options: [],
              tooltip: '',
              component: 'multi_text',
              placeholder: '',
            },
            'GEN-1:1': {
              idx: 3,
              prompt: 'List the name, email, and title of the person completing this assessment.',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-1:2': {
              idx: 4,
              prompt: "List your brand's Product Sustainability Contact, if different from your response in the previous question",
              options: [],
              tooltip: 'Please include name, email, and title',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-1:3': {
              idx: 5,
              prompt: "List your brand's Diversity, Equity, & Inclusion (DEI) Contact, if different from your response in the previous question(s)",
              options: [],
              tooltip: 'Please include name, email, and title',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-1:4': {
              idx: 6,
              prompt: 'List any additional contacts for Product Sustainability',
              options: [],
              tooltip: 'Please include names, emails, and titles',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-1:5': {
              idx: 7,
              prompt: 'List any additional contacts for Diversity, Equity, & Inclusion (DEI)',
              options: [],
              tooltip: 'Please include names, emails, and titles',
              component: 'textarea',
              placeholder: '',
            },
            'GEN-1:6': {
              idx: 8,
              prompt: 'List any additional contacts that supported filling out this assessment',
              options: [],
              tooltip: 'Please include names, emails, and titles',
              component: 'textarea',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 0,
          section_type: 'Practices',
          category_description: '',
        },
        GHG: {
          title: 'GHG Emissions & Climate',
          prompt: '',
          component: '',
          follow_up: {
            'GHG-1': {
              idx: 32,
              prompt:
                'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions, set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.\n\nHas your brand measured its carbon footprint this year or within the last calendar year?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: 'Note: The term “carbon” is used here as a generally accepted shorthand for “greenhouse gas”.',
              component: 'yes_no',
              placeholder: '',
            },
            'GHG-2': {
              idx: 33,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              rubric: {
                score_map: {
                  No: 0,
                  'Yes, using the GHG Protocol': 1,
                  'Yes, using another GHG accounting standard': 0.5,
                },
              },
              options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard', 'No'],
              tooltip: '',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'If you used a different standard than the GHG Protocol, please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
                operator: 'has',
                component: 'textarea',
                comparison: 'Yes, using another GHG accounting standard',
                placeholder: '',
              },
            },
            'GHG-3': {
              idx: 34,
              prompt: 'Please indicate which components of your operations were included in your carbon footprint.',
              rubric: {
                max_score: 1,
                score_map: {
                  'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                  'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                  'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                  'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
                },
              },
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
            },
            'GHG-4': {
              idx: 35,
              prompt: "Has your brand's carbon footprint been verified by an indepenedent third-party?",
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to the verification document, if available:',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'GHG-5': {
              idx: 36,
              prompt: 'Does your brand report its carbon footprint publicly?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to your most recent public report:',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'GHG-6': {
              idx: 37,
              prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
              rubric: {
                score_map: {
                  No: 0,
                  'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.': 1,
                  'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.': 0.5,
                  'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.': 0.2,
                },
              },
              options: [
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                'No',
              ],
              tooltip: '',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
            },
            'GHG-7': {
              idx: 39,
              prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'GHG-8': {
              idx: 45,
              prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
              rubric: {
                score_map: {
                  No: 0,
                  'Yes, our target(s) has been approved by the SBTi': 1,
                  'No, but we’ve aligned our target(s) with the SBTi’s guidance': 0.5,
                  'No, but our target(s) is currently being evaluated by the SBTi for approval': 0.8,
                  'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets': 0.3,
                },
              },
              options: [
                'Yes, our target(s) has been approved by the SBTi',
                'No, but our target(s) is currently being evaluated by the SBTi for approval',
                'No, but we’ve aligned our target(s) with the SBTi’s guidance',
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
                'No',
              ],
              tooltip:
                'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5 degrees C above pre-industrial levels',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
            'GHG-9': {
              idx: 46,
              prompt: 'Has your brand established an emissions reduction action plan or roadmap that guides your efforts to achieve your reduction targets?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'GHG-10': {
              idx: 48,
              prompt:
                'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
              rubric: {
                score_map: {
                  No: 0,
                  'Yes, a 100% reduction': 1,
                  'Yes, a 1-25% reduction': 0.2,
                  'Yes, a 26-50% reduction': 0.4,
                  'Yes, a 51-75% reduction': 0.6,
                  'Yes, a 76-99% reduction': 0.8,
                },
              },
              options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            'GHG-11': {
              idx: 49,
              prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'GHG-12': {
              idx: 50,
              prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.2,
                  'Scope 1: Direct emissions from company vehicles & facilitie': 0.2,
                  'All or a portion of scope 3 emissions, including all the products you sell to REI': 0.2,
                  'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.2,
                  'A portion of scope 3 emissions, but not including those from all the products you sell to REI': 0.2,
                },
              },
              options: [
                'Scope 1: Direct emissions from company vehicles & facilitie',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
                'All or a portion of scope 3 emissions, including all the products you sell to REI',
                'Other',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-11',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
              },
              placeholder: '',
            },
            'GHG-13': {
              idx: 51,
              prompt:
                'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
              rubric: {
                score_map: {
                  No: 0,
                  'Yes, we’re Climate Neutral Certified': 1,
                  'Yes, we’re certified to another carbon/climate neutrality standard': 1,
                },
              },
              options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard', 'No'],
              tooltip: '',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-11',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-11').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, we’re certified to another carbon/climate neutrality standard',
                placeholder: '',
              },
            },
            'GHG-6A': {
              idx: 38,
              prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0,
                  'We use spend-based emissions factors': 0.5,
                  'We use material-based emissions factors': 1,
                },
              },
              options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: [
                      'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                      'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                      'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                    ],
                    operator: 'has',
                    question: 'GHG-6',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-1',
                  },
                ],
                expression:
                  "true in $map($lookup(sections.*.follow_up, 'GHG-6').value, function($v) { $v in ['Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.','Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.'] }) and $lookup(sections.*.follow_up, 'GHG-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe. Limit your response to 100 words or less.',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'GHG-7A': {
              idx: 40,
              prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
              rubric: {
                max_score: 1,
                score_map: {
                  'Scope 1: Direct emissions from company vehicles & facilities': 0.25,
                  'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)': 0.25,
                  'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use': 0.25,
                  'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)': 0.25,
                },
              },
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
            'GHG-7C': {
              idx: 44,
              prompt:
                'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
              rubric: {
                score_map: {
                  'Absolute emissions reduction': 1,
                  'Reduction in emissions intensity': 0,
                },
              },
              options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
              tooltip: '',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
            'GHG-9A': {
              idx: 47,
              prompt: 'What are the primary components of your emissions reduction action plan?',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.125,
                  'Energy efficiency in manufacturing': 0.125,
                  'Reduction in emissions from air freight': 0.125,
                  'Use of clean energy in product manufacturing': 0.125,
                  'Minimization of materials waste in manufacturing': 0.125,
                  'Use of low-carbon materials or ingredients in products': 0.125,
                  'Supporting customers in reducing emissions during product use': 0.125,
                  'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)': 0.125,
                  'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)': 0.125,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-9',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-9').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'GHG-7B:1': {
              idx: 41,
              prompt:
                'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat percent reduction are you aiming to achieve from your baseline year to your target year?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
            'GHG-7B:2': {
              idx: 42,
              prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your baseline year?',
              options: [],
              tooltip: '',
              component: 'number',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
            'GHG-7B:3': {
              idx: 43,
              prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your target year?',
              options: [],
              tooltip: '',
              component: 'number',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'GHG-7',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'GHG-7').value = true",
              },
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 3,
          section_type: 'Environment',
          category_description: '',
        },
        INC: {
          title: 'Diversity & Inclusion: General',
          prompt: '',
          component: '',
          follow_up: {
            'INC-1': {
              idx: 81,
              prompt:
                'This subset of questions is related to diversity, equity and inclusion practices at your organization, not limited to the product space. As REI seeks to progress a more inclusive outdoor industry, we are hoping to understand where brands are at.\n\nDoes your brand have a policy/policies in place regarding nondiscrimination as related to employment, customer service, grant-making or other areas?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'INC-2': {
              idx: 82,
              prompt: 'Does your policy explicitly prohibit discrimination based on both sexual orientation and gender identity?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'INC-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
              },
              placeholder: '',
            },
            'INC-3': {
              idx: 83,
              prompt: 'Please select one the following to describe the reach of your nondiscrimination policy.',
              rubric: {
                score_map: {
                  Other: 0,
                  'Policy varies by country': 0,
                  'Policy varies by US state': 0,
                  'Applies to all employees/customers regardless of location': 1,
                },
              },
              options: ['Applies to all employees/customers regardless of location', 'Policy varies by country', 'Policy varies by US state', 'Other'],
              tooltip: '',
              component: 'select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'INC-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'INC-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'INC-4': {
              idx: 84,
              prompt: "Does your brand have/plan to create product that is designed beyond the gender binary (i.e. not women or men's only)?",
              rubric: {
                score_map: {
                  No: 0,
                  Yes: 1,
                  Other: 0,
                },
              },
              options: ['Yes', 'No', 'Other'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'INC-5': {
              idx: 85,
              prompt: 'Does your brand have in place a policy or practice for pay equity across gender and race?',
              rubric: {
                score_map: {
                  No: 0,
                  Yes: 1,
                  Other: 0,
                },
              },
              options: ['Yes', 'No', 'Other'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'INC-6': {
              idx: 86,
              prompt: 'Does your brand have in place a policy for healthcare explicitly inclusive of the LGBTQ+ community?',
              rubric: {
                score_map: {
                  No: 0,
                  Yes: 1,
                  Other: 0,
                },
              },
              options: ['Yes', 'No', 'Other'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 17,
          section_type: 'D & I',
          category_description: '',
        },
        ISS: {
          title: 'Diversity & Inclusion: Inclusive Sizing',
          prompt: '',
          component: '',
          follow_up: {
            'ISS-1': {
              idx: 78,
              prompt:
                'The REI Product Impact Standard has an expectation that each brand partner that sells wearable products offered in a variety of sizes to provide REI at least one sample size outside the standard size range for marketing photography. \n\nAs a standard practice, does your brand currently send REI at least one sample size outside the standard size range for marketing photography of wearable products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'ISS-2': {
              idx: 79,
              prompt:
                'The REI Product Impact Standards has an expectation that all brand partners who sell wearable products offered in a variety of sizes maintain the same price within a style regardless of size. \n\nDoes your brand currently maintain the same price across wearable products offered in a variety of sizes regardless of size?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 15,
          section_type: 'D & I',
          category_description: '',
        },
        MFG: {
          title: 'Manufacturing Code of Conduct & Responsible Sourcing',
          prompt: '',
          component: '',
          follow_up: {
            'MFG-0': {
              idx: 11,
              prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'MFG-1': {
              idx: 12,
              prompt:
                'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.\n\nPlease indicate which of the following topics are included in your manufacturing code of conduct.',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.1,
                  Community: 0.1,
                  Environment: 0.1,
                  Compensation: 0.1,
                  Transparency: 0.1,
                  'Hours of Work': 0.1,
                  'Health & Safety': 0.1,
                  'Non-discrimination': 0.1,
                  'Harassment and Abuse': 0.1,
                  'Recruitment and Hiring': 0.1,
                  'Freedom of Association & Collective Bargaining': 0.1,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas.',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'MFG-2': {
              idx: 13,
              prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
              rubric: {
                max_score: 1,
                score_map: {
                  'Tier 4 (raw material suppliers)': 0.25,
                  'Tier 3 (raw material processors)': 0.25,
                  'Tier 1 (finished product manufacturers)': 0.25,
                  'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                },
              },
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
            },
            'MFG-3': {
              idx: 14,
              prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'MFG-4': {
              idx: 15,
              prompt:
                'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'MFG-5': {
              idx: 16,
              prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe. Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'MFG-7': {
              idx: 21,
              prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true",
              },
              placeholder: '',
            },
            'MFG-8': {
              idx: 22,
              prompt: 'Is your brand’s supplier list publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'MFG-9': {
              idx: 23,
              prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
              rubric: {
                max_score: 1,
                score_map: {
                  'Tier 4 (raw material suppliers)': 0.25,
                  'Tier 3 (raw material processors)': 0.25,
                  'Tier 1 (finished product manufacturers)': 0.25,
                  'Tier 2 (finished material/subcomponent manufacturers)': 0.25,
                },
              },
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-8',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-8').value = true",
              },
              placeholder: '',
            },
            'MFG-10': {
              idx: 24,
              prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'MFG-11': {
              idx: 25,
              prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'MFG-6:1': {
              idx: 17,
              prompt:
                'Approximately what percentage of your Tier 1 (finished product manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-5',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
              },
              placeholder: '',
            },
            'MFG-6:2': {
              idx: 18,
              prompt:
                'Approximately what percentage of your Tier 2 (finished material/subcomponent manufacturers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-5',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
              },
              placeholder: '',
            },
            'MFG-6:3': {
              idx: 19,
              prompt:
                'Approximately what percentage of your Tier 3 (raw material processors) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-5',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
              },
              placeholder: '',
            },
            'MFG-6:4': {
              idx: 20,
              prompt:
                'Approximately what percentage of your Tier 4 (raw material suppliers) supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: ['Not auditing', 'Unknown', '0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'],
              tooltip: 'Note: Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-0',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'MFG-5',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'MFG-0').value = true and $lookup(sections.*.follow_up, 'MFG-5').value = true",
              },
              placeholder: '',
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 1,
          section_type: 'Practices',
          category_description: '',
        },
        MKT: {
          title: 'Diversity & Inclusion: Marketing Diversity',
          prompt: '',
          component: '',
          follow_up: {
            'MKT-1': {
              idx: 71,
              prompt:
                'The REI Product Impact Standards include the expectation that each brand partner has in place guidelines for marketing assets, photo casting and production that ensure diverse and inclusive representation across race, age, gender identity/expression, body size and disability. Content supplied to REI by influencers and affiliate media, as well as photography, marketing copy, and other content, shall reflect the same inclusive representation.\n\nWhich option below best describes your brand’s status, as of Spring 2023 product lines and marketing, in addressing diverse and inclusive representation in its marketing and photo casting?',
              rubric: {
                score_map: {
                  'We have some practices in place, but do not yet have formal guidelines or targets in place': 0.5,
                  'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography': 0,
                  'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions': 1,
                },
              },
              options: [
                'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                'We have some practices in place, but do not yet have formal guidelines or targets in place',
                'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: "Describe how your brand plans to align with REI's expectation in this area.",
                operator: '==',
                component: 'textarea',
                comparison: 'We do not currently have guidelines or targets related to diversity and inclusion within our marketing or photography',
                placeholder: '',
              },
            },
            'MKT-2': {
              idx: 72,
              prompt: 'What strategies is your brand currently using as part of its guidelines?',
              rubric: {
                max_score: 1,
                score_map: {
                  Other: 0.125,
                  'Casting calls specific to diverse talent': 0.125,
                  'Designer/design team education on inclusion topics': 0.125,
                  'Outreach to/partnerships with diversity organizations': 0.125,
                  'Inclusive intake process (e.g., on casting questionnaire or portal)': 0.125,
                  'Representation targets (e.g., % representation of specific cohorts)': 0.125,
                  'Diversity/inclusion reviews within product development/creative process': 0.125,
                  '“Behind the camera” recruitment initiatives (photographers, producers, etc.)': 0.125,
                },
              },
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
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: [
                      'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                      'We have some practices in place, but do not yet have formal guidelines or targets in place',
                    ],
                    operator: 'has',
                    question: 'MKT-1',
                  },
                ],
                expression:
                  "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
            'MKT-3': {
              idx: 73,
              prompt: 'Which dimensions of diversity or other topics do your guidelines address?',
              rubric: {
                max_score: 1,
                score_map: {
                  Age: 0.125,
                  Race: 0.125,
                  Other: 0.125,
                  Gender: 0.125,
                  'LGBTQ+': 0.125,
                  'Body size': 0.125,
                  Disability: 0.125,
                  'Military status': 0.125,
                  'Faith tradition/religion': 0.125,
                },
              },
              options: ['Race', 'Gender', 'LGBTQ+', 'Disability', 'Military status', 'Faith tradition/religion', 'Body size', 'Age', 'Other'],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: [
                      'We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions',
                      'We have some practices in place, but do not yet have formal guidelines or targets in place',
                    ],
                    operator: 'has',
                    question: 'MKT-1',
                  },
                ],
                expression:
                  "true in $map($lookup(sections.*.follow_up, 'MKT-1').value, function($v) { $v in ['We have successfully implemented guidelines and targets to ensure inclusive representation across a range of identities/diversity dimensions','We have some practices in place, but do not yet have formal guidelines or targets in place'] })",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 12,
          section_type: 'D & I',
          category_description: '',
        },
        PKG: {
          title: 'Packaging - General',
          prompt: '',
          component: '',
          follow_up: {
            'PKG-2': {
              idx: 120,
              prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-3': {
              idx: 121,
              prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:1a': {
              idx: 108,
              prompt:
                'For the following questions, please indicate whether your brand has formal policies/targets in place regarding the use of more sustainable product packaging.\n\nDo you have a policy/target in place for "FSC certified packaging materials"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:1b': {
              idx: 109,
              prompt: 'Is your "FSC certified packaging materials" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:1a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:1a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:2a': {
              idx: 110,
              prompt: 'Do you have a policy/target in place for "Recycled packaging materials"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:2b': {
              idx: 111,
              prompt: 'Is your "Recycled packaging materials" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:2a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:2a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:3a': {
              idx: 112,
              prompt: 'Do you have a policy/target in place for "Recyclable packaging"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:3b': {
              idx: 113,
              prompt: 'Is your "Recyclable packaging" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:3a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:3a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:4a': {
              idx: 114,
              prompt: 'Do you have a policy/target in place for "Reduced packaging volume"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:4b': {
              idx: 115,
              prompt: 'Is your "Reduced packaging volume" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:4a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:4a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:5a': {
              idx: 116,
              prompt: 'Do you have a policy/target in place for "How2Recycle logo on packaging"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:5b': {
              idx: 117,
              prompt: 'Is your "How2Recycle logo on packaging" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:5a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:5a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PKG-1:6a': {
              idx: 118,
              prompt: 'Do you have a policy/target in place for "Primary plastic packaging elimination"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PKG-1:6b': {
              idx: 119,
              prompt: 'Is your "Primary plastic packaging elimination" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PKG-1:6a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PKG-1:6a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 19,
          section_type: 'Product',
          category_description: '',
        },
        PRD: {
          title: 'Product Care, Repair, Reuse & End-of-life',
          prompt: '',
          component: '',
          follow_up: {
            'PRD-1': {
              idx: 128,
              prompt: 'Does your brand provide customers with guidance for how to use and care for your product in an environmentally responsible manner?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PRD-2': {
              idx: 129,
              prompt: 'Does your brand offer a lifetime warranty for products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide a link to your warranty policy, if available',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PRD-3': {
              idx: 130,
              prompt: 'Does your brand provide product repair services to your customers?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PRD-4': {
              idx: 131,
              prompt: 'Are the repairs conducted in-house or through a third-party?',
              options: ['Conducted in-house', 'Conducted through a third-party'],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PRD-3',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PRD-3').value = true",
              },
              placeholder: '',
            },
            'PRD-5': {
              idx: 132,
              prompt: 'Does your brand sell used products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PRD-6': {
              idx: 133,
              prompt: 'Does your brand rent or lease products to your customers?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PRD-7': {
              idx: 134,
              prompt: 'Does your brand offer solutions for your customers to donate and/or recycle products at end-of-life?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 21,
          section_type: 'Product',
          category_description: '',
        },
        PSA: {
          title: 'Product Sustainability & Preferred Attributes',
          prompt: '',
          component: '',
          follow_up: {
            'PSA-1': {
              idx: 87,
              prompt: 'Does your brand utilize a formal methodology or tool to measure the sustainability of your materials and/or finished products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe. Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:1a': {
              idx: 88,
              prompt:
                "For the following questions, please indicate whether your brand has any policies or targets in place for any of REI's preferred sustainability attributes and whether those policies or targets are publicly available.\n\nDo you have a policy/target in place for bluesign®?",
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:1b': {
              idx: 89,
              prompt: 'Is your bluesign® policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:1a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:1a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:2a': {
              idx: 90,
              prompt: 'Do you have a policy/target in place for "Certified organic/organic ingredients"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:2b': {
              idx: 91,
              prompt: 'Is your "Certified organic/organic ingredients" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:2a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:2a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:3a': {
              idx: 92,
              prompt: 'Do you have a policy/target in place for "Climate Neutral Certified"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:3b': {
              idx: 93,
              prompt: 'Is your "Climate Neutral Certified" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:3a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:3a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:4a': {
              idx: 94,
              prompt: 'Do you have a policy/target in place for "Fair trade certification"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:4b': {
              idx: 95,
              prompt: 'Is your "Fair trade certification" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:4a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:4a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:5a': {
              idx: 96,
              prompt: 'Do you have a policy/target in place for "Forest Stewardship Council certification (FSC)"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:5b': {
              idx: 97,
              prompt: 'Is your "Forest Stewardship Council certification (FSC)" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:5a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:5a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:6a': {
              idx: 98,
              prompt: 'Do you have a policy/target in place for "Leather Working Group certification (LWG)"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:6b': {
              idx: 99,
              prompt: 'Is your "Leather Working Group certification (LWG)" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:6a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:6a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:7a': {
              idx: 100,
              prompt: 'Do you have a policy/target in place for "Organically grown cotton"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:7b': {
              idx: 101,
              prompt: 'Is your "Organically grown cotton" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:7a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:7a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:8a': {
              idx: 102,
              prompt: 'Do you have a policy/target in place for "Recycled materials"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:8b': {
              idx: 103,
              prompt: 'Is your "Recycled materials" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:8a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:8a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:9a': {
              idx: 104,
              prompt: 'Do you have a policy/target in place for "Responsibly sourced down"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:9b': {
              idx: 105,
              prompt: 'Is your "Responsibly sourced down" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:9a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:9a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'PSA-2:10a': {
              idx: 106,
              prompt: 'Do you have a policy/target in place for "Responsibly sourced wool"?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PSA-2:10b': {
              idx: 107,
              prompt: 'Is your "Responsibly sourced wool" policy/target publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'PSA-2:10a',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'PSA-2:10a').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 18,
          section_type: 'Product',
          category_description: '',
        },
        SUN: {
          title: 'Sunscreen Ingredients',
          prompt: '',
          component: '',
          follow_up: {
            'SUN-1': {
              idx: 56,
              prompt:
                'The REI Product Impact Standards include the expectation that sunscreens and formulated sun-protection products supplied to REI be free of oxybenzone and contain only active ingredients that are generally recognized as safe and effective.\n\nDoes your brand have a formal policy/target in place regarding the use of oxybenzone in your products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'SUN-2': {
              idx: 57,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'SUN-1',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'SUN-1').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'SUN-3': {
              idx: 58,
              prompt: 'Does your brand have a formal policy/target in place that includes avoiding the use of other active sunscreen ingredients?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please indicate which other active sunscreen ingredients your brand formally avoids using.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
                values: ['Sunscreens or other formulated sun-protection products'],
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression: "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Sunscreens or other formulated sun-protection products'] })",
          },
          category_idx: 6,
          section_type: 'Materials',
          category_description: '',
        },
        CHEM: {
          title: 'Restricted Substances List & Chemicals Management',
          prompt: '',
          component: '',
          follow_up: {
            'CHEM-0': {
              idx: 26,
              prompt:
                'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a Restricted Substances List (RSL) that specifies which substances are banned or restricted in products and that meets or exceeds all applicable regulatory requirements.\n\nDoes your brand have an RSL in place for the products you supply to REI?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip:
                'Note: Brands that sell products in categories regulated by the U.S. Food and Drug Administration (FDA) or U.S. Department of Agriculture (USDA) do not need to have a separate RSL for their products in these categories.',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: "Describe how your brand plans to align with REI's expectation in this area.",
                operator: '==',
                component: 'textarea',
                comparison: false,
                placeholder: '',
              },
            },
            'CHEM-1': {
              idx: 27,
              prompt: 'Does your brand have a means of verifying that products you supply to REI comply with your RSL?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please describe how your brand verifies that products you supply to REI comply with your RSL.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'CHEM-2': {
              idx: 28,
              prompt: 'Please indicate whether your brand’s chemicals management program consists of the following components that aid in verifying compliance with your RSL.',
              rubric: {
                max_score: 1,
                score_map: {
                  'An input-stream management system aimed at managing the chemistry and/or ingredients entering the manufacturing process.': 0.5,
                  'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL and/or other standards for managing chemicals or ingredients.': 0.5,
                },
              },
              options: [
                'A chemical testing program that tests materials, ingredients and/or products for compliance with your RSL and/or other standards for managing chemicals or ingredients.',
                'An input-stream management system aimed at managing the chemistry and/or ingredients entering the manufacturing process.',
              ],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
              },
              placeholder: '',
            },
            'CHEM-3': {
              idx: 29,
              prompt: 'Is your RSL aligned to an internationally recognized third-party RSL?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
              },
              placeholder: '',
            },
            'CHEM-4': {
              idx: 31,
              prompt: 'Is your brand’s RSL publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              dependency: {
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-0',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
            'CHEM-3A': {
              idx: 30,
              prompt: 'Please specify which third-party RSL(s).',
              options: ['American Apparel and Footwear Association (AAFA)', 'AFIRM', 'bluesign', 'ZDHC MSRL', 'REACH', 'OEKO-TEX', 'Other'],
              tooltip: '',
              component: 'multi_select',
              dependency: {
                and: true,
                conditions: [
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-0',
                  },
                  {
                    values: ['Yes'],
                    operator: '==',
                    question: 'CHEM-3',
                  },
                ],
                expression: "$lookup(sections.*.follow_up, 'CHEM-0').value = true and $lookup(sections.*.follow_up, 'CHEM-3').value = true",
              },
              placeholder: '',
              additional_context: {
                prompt: 'Please specify any additional third party RSL(s)',
                operator: 'has',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          category_idx: 2,
          section_type: 'Materials',
          category_description: '',
        },
        PFAS: {
          title: 'Per- and Polyfluoroalkyl Substances',
          prompt: '',
          component: '',
          follow_up: {
            'PFAS-1': {
              idx: 52,
              prompt:
                'The REI Product Impact Standards include the existing expectation that all apparel, footwear, packs, sleeping bags or tents supplied to REI be free of long-chain PFAS and that all ski wax and gear & clothing treatments supplied to REI be free of long-chain and short-chain PFAS.\n\nDoes your brand have a formal policy/target in place regarding the presence of PFAS in your products?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            'PFAS-2': {
              idx: 53,
              prompt: 'Is the policy/target publicly available?',
              rubric: {
                score_map: {
                  true: 1,
                  false: 0,
                },
              },
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
            },
          },
          image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
          dependency: {
            conditions: [
              {
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
                operator: 'has',
                question: 'GEN-3',
              },
            ],
            expression:
              "true in $map($lookup(sections.*.follow_up, 'GEN-3').value, function($v) { $v in ['Apparel','Accessories (textile-based)','Cookware','Footwear','Headwear','Other textile products','Packs','Ski wax','Sleeping bags','Tents','Treatments for gear and clothing'] })",
          },
          category_idx: 4,
          section_type: 'Materials',
          category_description: '',
        },
      },
      image_url: 'https://cold-public-assets.s3.amazonaws.com/images%2FReduce%20Packaging%20Footprint.png',
      intro_markdown: '',
    },
    progress: {
      total_score: 0,
      total_max_score: 87,
      total_review: 0,
      question_count: 113,
      percentage: 0,
      questions_answered: 0,
      sections: [
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Flame Retardant (FR) Chemicals',
          total: 3,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'FR-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'FR-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'FR-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Wool',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'WL-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'WL-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Animal Fur & Exotic Leather',
          total: 3,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'AFL-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'AFL-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'AFL-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Packaging - Apparel',
          total: 6,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'APK-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'APK-2': {
              user_answered: false,
              ai_answered: false,
            },
            'APK-3': {
              user_answered: false,
              ai_answered: false,
            },
            'APK-4': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'APK-5': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'APK-6': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Diversity & Inclusion: Cultural Appropriation',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'APP-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'APP-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Bisphenol A',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'BPA-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'BPA-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Diversity & Inclusion: Inclusive Colorways',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'COL-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'COL-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Diversity & Inclusion: Inclusive Copy',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'COP-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'COP-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Core Practices',
          total: 6,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'CRP-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CRP-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CRP-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CRP-4': {
              user_answered: false,
              ai_answered: false,
            },
            'CRP-5': {
              user_answered: false,
              ai_answered: false,
            },
            'CRP-6': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 1,
          title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
          total: 1,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'DHT-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Down',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'DWN-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'DWN-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          title: 'Brand Information',
          total: 11,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'GEN-2': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-3': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-0:1': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-0:2': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-0:3': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:1': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:2': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:3': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:4': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:5': {
              user_answered: false,
              ai_answered: false,
            },
            'GEN-1:6': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 17,
          title: 'GHG Emissions & Climate',
          total: 20,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'GHG-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-4': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-5': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-6': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-8': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-9': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-10': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-11': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-12': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-13': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-6A': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7A': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7C': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-9A': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7B:1': {
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7B:2': {
              user_answered: false,
              ai_answered: false,
            },
            'GHG-7B:3': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 6,
          title: 'Diversity & Inclusion: General',
          total: 6,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'INC-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'INC-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'INC-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'INC-4': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'INC-5': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'INC-6': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Diversity & Inclusion: Inclusive Sizing',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'ISS-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'ISS-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 11,
          title: 'Manufacturing Code of Conduct & Responsible Sourcing',
          total: 15,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'MFG-0': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-4': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-5': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-7': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-8': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-9': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-10': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-11': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MFG-6:1': {
              user_answered: false,
              ai_answered: false,
            },
            'MFG-6:2': {
              user_answered: false,
              ai_answered: false,
            },
            'MFG-6:3': {
              user_answered: false,
              ai_answered: false,
            },
            'MFG-6:4': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Diversity & Inclusion: Marketing Diversity',
          total: 3,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'MKT-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MKT-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'MKT-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 4,
          title: 'Packaging - General',
          total: 4,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'PKG-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PKG-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PKG-1:1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PKG-1:2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 6,
          title: 'Product Care, Repair, Reuse & End-of-life',
          total: 7,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'PRD-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PRD-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PRD-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PRD-4': {
              user_answered: false,
              ai_answered: false,
            },
            'PRD-5': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PRD-6': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PRD-7': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Product Sustainability & Preferred Attributes',
          total: 3,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'PSA-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PSA-2:1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PSA-2:2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 3,
          title: 'Sunscreen Ingredients',
          total: 3,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'SUN-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'SUN-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'SUN-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 5,
          title: 'Restricted Substances List & Chemicals Management',
          total: 6,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'CHEM-0': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CHEM-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CHEM-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CHEM-3': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CHEM-4': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'CHEM-3A': {
              user_answered: false,
              ai_answered: false,
            },
          },
        },
        {
          section_score: 0,
          section_max_score: 2,
          title: 'Per- and Polyfluoroalkyl Substances',
          total: 2,
          answered: 0,
          complete: false,
          review: 0,
          questions: {
            'PFAS-1': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
            'PFAS-2': {
              max_score: 1,
              score: 0,
              user_answered: false,
              ai_answered: false,
            },
          },
        },
      ],
    },
  });

  return surveys;
}

export function getCompliancePageSurveysMocksByName(name: string): SurveyPayloadType {
  const surveys = [];
  surveys.push({
    id: 'b5a544e8-c87e-48e2-9c92-d9352dcc2d33',
    name: 'rei_mfg_survey',
    type: 'TEST',
    description: "Introductory survey to gather information about a brand's manufacturing practices",
    created_at: '2024-01-17T17:36:53.231Z',
    updated_at: '2024-01-17T17:36:53.232Z',
    definition: {
      title: 'Manufacturing Code of Conduct',
      sections: {
        MFG: {
          title: 'Manufacturing Code of Conduct',
          prompt: '',
          component: null,
          follow_up: {
            'MFG-1': {
              idx: 0,
              prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: "Please describe how your brand plans to align with REI's expectation in this area.",
                operator: '==',
                component: 'textarea',
                comparison: false,
                placeholder: '',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-2': {
              idx: 1,
              prompt: 'Please indicate which of the following topics are included in your manufacturing code of conduct.',
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
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas',
                operator: '==',
                component: 'textarea',
                comparison: ['Other'],
                placeholder: '',
              },
              value: ['Transparency', 'Non-discrimination'],
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Transparency', 'Non-discrimination'],
              },
            },
            'MFG-3': {
              idx: 2,
              prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              value: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
              },
            },
            'MFG-4': {
              idx: 3,
              prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
                value: 'https://www.google.com',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-5': {
              idx: 4,
              prompt:
                'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-6': {
              idx: 5,
              prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please Describe',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
                value: 'We have a team of 10 people who do this',
              },
              value: true,
              skipped: false,
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-7': {
              idx: 6,
              prompt:
                'Approximately what percentage of your supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              based_on: 'MFG-6',
              component: 'textarea',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: '10%',
              },
            },
            'MFG-8': {
              idx: 7,
              prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
              options: [],
              tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'MFG-9': {
              idx: 8,
              prompt: 'Is your brand’s supplier list publicly available?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Provide the hyperlink',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'MFG-10': {
              idx: 9,
              prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
              options: [
                'Tier 1 (finished product manufacturers)',
                'Tier 2 (finished material/subcomponent manufacturers)',
                'Tier 3 (raw material processors)',
                'Tier 4 (raw material suppliers)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Tier 4 (raw material suppliers)'],
              },
            },
            'MFG-11': {
              idx: 10,
              prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'MFG-12': {
              idx: 11,
              prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Manufacturing Code of Conduct survey to the best of your ability. If you have any questions, please contact your REI Merchandising contact.',
    },
  });
  surveys.push({
    id: 'b122c540-f736-4940-b179-b95b2d26e4e6',
    name: 'rei_ghg_survey',
    type: 'TEST',
    description: '',
    created_at: '2024-01-17T17:48:36.402Z',
    updated_at: '2024-01-17T17:48:36.404Z',
    definition: {
      title: 'Greenhouse Gas Emissions & Climate',
      sections: {
        GHG: {
          title: 'Greenhouse Gas Emissions & Climate',
          prompt: '',
          component: null,
          follow_up: {
            'GHG-1': {
              idx: 0,
              prompt: 'Has your brand measured its carbon footprint this year or within the last calendar year?',
              options: [],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-2': {
              idx: 1,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: ['Yes, using the GHG Protocol', 'Yes, using another GHG accounting standard (please indicate below)', 'No'],
              tooltip: 'Note: The term carbon is used here as a generally accepted shorthand for greenhouse gas.',
              based_on: 'GHG-1',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'Please indicate which standard(s) you used. (Note: If entering multiple, separate using commas.)',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, using another GHG accounting standard (please indicate below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'Yes, using the GHG Protocol',
              },
            },
            'GHG-3': {
              idx: 2,
              prompt: 'Was your carbon footprint calculated using an internationally recognized greenhouse gas accounting standard (e.g., the GHG Protocol)?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Scope 1: Direct emissions from company vehicles & facilities'],
              },
            },
            'GHG-4': {
              idx: 3,
              prompt: "Has your brand 's carbon footprint been verified by an independent third-party?",
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to the verification document.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-5': {
              idx: 4,
              prompt: 'Does your brand report its carbon footprint publicly?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide the hyperlink to your most recent public report.',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-6': {
              idx: 5,
              prompt: 'Does your brand calculate the carbon emissions from individual products you sell?',
              options: [
                'Yes, we calculate the carbon emissions from every product we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, including those we sell to REI.',
                'Yes, we calculate the carbon emissions from a subset of the products we sell, but not including those we sell to REI.',
                'No',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['No'],
              },
            },
            'GHG-7': {
              idx: 7,
              prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: true,
              },
            },
            'GHG-8': {
              idx: 11,
              prompt: 'Has your emission reduction target(s) been approved by the Science Based Targets Initiative (SBTi) or an equivalent framework?',
              options: [
                'Yes, our target(s) has been approved by the SBTi',
                'No, but our target(s) is currently being evaluated by the SBTi for approval',
                'No, but we’ve aligned our target(s) with the SBTi’s guidance',
                'No, but we’ve aligned our target(s) with an equivalent framework for setting science-aligned reduction targets',
                'No',
              ],
              tooltip:
                'Note: REI considers a science-aligned target to be one that includes emissions from scopes 1, 2, and 3 and aligns with what the latest climate science indicates is necessary to limit global warming to 1.5oC above pre-industrial levels.',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: ['Yes, our target(s) has been approved by the SBTi'],
              },
            },
            'GHG-10': {
              idx: 13,
              prompt:
                'Did your brand’s carbon emissions over the previous year represent a measurable reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue) relative to the prior year or a previous baseline year?',
              options: ['Yes, a 1-25% reduction', 'Yes, a 26-50% reduction', 'Yes, a 51-75% reduction', 'Yes, a 76-99% reduction', 'Yes, a 100% reduction', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-11': {
              idx: 14,
              prompt: 'Does your brand generate and/or purchase carbon credits to “offset” all or a portion of your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-12': {
              idx: 15,
              prompt: 'Please indicate whether the carbon credits you generate and/or purchase account for and include the following components of your carbon footprint.',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                'A portion of scope 3 emissions, but not including those from all the products you sell to REI',
                'All or a portion of scope 3 emissions, including all the products you sell to REI',
                'Other',
              ],
              tooltip: 'Select all that apply.',
              based_on: 'GHG-11',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-13': {
              idx: 16,
              prompt:
                'Is your brand certified to a third-party standard that validates that you’ve purchased carbon credits sufficient to “offset” the relevant components of your carbon footprint (e.g., Climate Neutral Certified)?',
              options: ['Yes, we’re Climate Neutral Certified', 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)', 'No'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              additional_context: {
                prompt: 'If you are certified by another carbon/climate neutrality standard, please indicate which standard(s) your brand is certified to.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Yes, we’re certified to another carbon/climate neutrality standard (please describe below)',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-6A': {
              idx: 6,
              prompt: 'Please indicate whether your brand uses spend or material-based emissions factors to calculate your product carbon emissions.',
              options: ['We use spend-based emissions factors', 'We use material-based emissions factors', 'Other'],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: 'Limit your response to 100 words or less.',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7A': {
              idx: 8,
              prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
              options: [
                'Scope 1: Direct emissions from company vehicles & facilities',
                'Scope 2: Indirect emissions from purchased electricity, steam, heating & cooling for own use',
                'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                'Scope 3: Indirect emissions from all other relevant upstream and downstream sources (i.e., Categories 2-15)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-7C': {
              idx: 10,
              prompt:
                'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
              options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
              tooltip: '',
              component: 'select',
              placeholder: '',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'GHG-9A': {
              idx: 12,
              prompt: 'What are the primary components of your emissions reduction action plan?',
              options: [
                'Use of low-carbon materials or ingredients in products',
                'Use of clean energy in product manufacturing',
                'Use of clean energy to power operations (e.g., offices, distribution centers, etc.)',
                'Minimization of materials waste in manufacturing',
                'Energy efficiency in manufacturing',
                'Use of circular business models (e.g., selling used products, renting or leasing products, product subscription, product recycling, etc.)',
                'Supporting customers in reducing emissions during product use',
                'Other (please describe)',
              ],
              tooltip: 'Select all that apply.',
              component: 'multi_select',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: 'Other',
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description:
            'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions , set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Greenhouse Gas Emissions & Climate survey to the best of your ability. If you have any questions, please contact your REI Sustainability Manager.',
    },
  });
  surveys.push({
    id: 'e85c4fb2-12dd-4be0-9027-5117c993e07f',
    name: 'rei_pkg_survey',
    type: 'TEST',
    description: '',
    created_at: '2024-01-17T17:51:59.384Z',
    updated_at: '2024-01-17T17:51:59.386Z',
    definition: {
      title: 'Packaging - General',
      sections: {
        PKG: {
          title: 'Packaging - General',
          prompt: '',
          component: null,
          follow_up: {
            'PKG-1': {
              idx: 0,
              prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
              value: 'We have a team of 10 people who do this',
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: 'We have a team of 10 people who do this',
              },
            },
            'PKG-2': {
              idx: 1,
              prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                answer: false,
              },
            },
            'PKG-3': {
              idx: 2,
              prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
            'PKG-4': {
              idx: 3,
              prompt:
                'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                tooltip: '',
                operator: '==',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: '',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Packaging - General survey below. This survey is intended to help REI understand your brand’s current efforts to reduce the environmental impact of your product packaging. Please complete this survey by October 1, 2021.',
    },
  });
  switch (name) {
    case 'rei_mfg_survey':
      return surveys[0];
    case 'rei_ghg_survey':
      return surveys[1];
    case 'rei_pkg_survey':
      return surveys[2];
    default:
      return surveys[0];
  }
}

export function getAIAnsweredSurveyMock(): SurveyPayloadType {
  return {
    id: 'ca3ad2ed-619b-4ee0-834e-2e56c336dba8',
    name: 'rei_pkg_survey',
    type: 'REI',
    description: '',
    created_at: '2023-09-18T23:37:55.849Z',
    updated_at: '2023-09-18T23:37:55.959Z',
    definition: {
      title: 'Packaging - General',
      sections: {
        PKG: {
          title: 'Packaging - General',
          prompt: '',
          component: {},
          follow_up: {
            'PKG-1': {
              idx: 0,
              prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
              options: [],
              tooltip: '',
              component: 'textarea',
              placeholder: '',
              additional_context: {
                prompt: 'Please provide hyperlink(s) to any publicly available policies/targets related to the above packaging sustainability areas:',
                operator: 'has_any',
                tooltip: 'If entering multiple hyperlinks, separate using commas.',
                component: 'textarea',
                comparison: {
                  b: true,
                },
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: 'The answer is Yes because the company has a formal policy/target in place regarding the use of more sustainable product packaging.',
                answer: 'Yes',
              },
            },
            'PKG-2': {
              idx: 1,
              prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                operator: '==',
                tooltip: '',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: 'The answer is Yes because the company has a formal policy/target in place regarding the use of more sustainable product packaging.',
                answer: true,
              },
            },
            'PKG-3': {
              idx: 2,
              prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                operator: '==',
                tooltip: '',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: 'The answer is Yes because the company has a formal policy/target in place regarding the use of more sustainable product packaging.',
              },
            },
            'PKG-4': {
              idx: 3,
              prompt:
                'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              additional_context: {
                prompt: 'Please describe.',
                operator: '==',
                tooltip: '',
                component: 'textarea',
                comparison: true,
                placeholder: '',
              },
              ai_attempted: true,
              ai_response: {
                justification: 'The answer is Yes because the company has a formal policy/target in place regarding the use of more sustainable product packaging.',
                answer: false,
              },
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
          category_idx: 0,
          category_description: '',
        },
      },
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
      intro_markdown:
        'Please complete the REI Packaging - General survey below. This survey is intended to help REI understand your brand’s current efforts to reduce the environmental impact of your product packaging. Please complete this survey by October 1, 2021.',
    },
  };
}

export function getSurveyComplianceFlowSomeCompleteSurveyMock(name: string) {
  const survey = getSurveyFormDataByName(name) as ComplianceSurveyPayloadType;
  // loop through the sections and follow_ups and set some values to be completed
  if (survey) {
    const ghgSection = survey.definition.sections['GHG'];
    forEach(survey.progress.sections, (progressSection: ComplianceSurveySectionProgressType, index) => {
      if (progressSection.title === ghgSection.title) {
        progressSection.complete = false;
      } else {
        progressSection.complete = true;
      }
      forOwn(progressSection.questions, (question: ComplianceSurveyProgressQuestionType, questionKey) => {
        if (progressSection.title === ghgSection.title) {
          question.user_answered = false;
          question.ai_answered = true;
        } else {
          question.user_answered = true;
          question.ai_answered = true;
          progressSection.answered += 1;
        }
      });
      progressSection.answered = progressSection.answered - 1;
      progressSection.review = 1;
    });
    forOwn(survey.definition.sections, (section, sectionKey) => {
      forOwn(section.follow_up, (followUp, followUpKey) => {
        if (followUpKey === 'GHG-12' || followUpKey === 'GHG-13') {
          followUp.value = undefined;
        } else {
          followUp.value = true;
        }
      });
    });
    survey.progress.question_count = 87;
    survey.progress.questions_answered = 15;
    survey.progress.percentage = 0.95;
    survey.progress.total_review = 20;
    survey.progress.total_score = 95;
    survey.progress.total_max_score = 100;
  }
  return survey;
}

export function getSurveyAllOtherQuestionsAnsweredSurveyMock(name: string) {
  const survey = getSurveyFormDataByName(name) as ComplianceSurveyPayloadType;
  // loop through the sections and follow_ups and set some values to be completed
  if (survey) {
    const ghgSection = survey.definition.sections['GHG'];
    forEach(survey.progress.sections, (progressSection: ComplianceSurveySectionProgressType, index) => {
      if (progressSection.title === ghgSection.title) {
        progressSection.complete = false;
      } else {
        progressSection.complete = true;
      }
      forOwn(progressSection.questions, (question: ComplianceSurveyProgressQuestionType, questionKey) => {
        if (questionKey === 'GHG-13') {
          question.user_answered = false;
        } else {
          question.user_answered = true;
          progressSection.answered += 1;
        }
      });
    });
    forOwn(survey.definition.sections, (section, sectionKey) => {
      forOwn(section.follow_up, (followUp, followUpKey) => {
        if (followUpKey === 'GHG-13') {
          followUp.value = undefined;
        } else {
          followUp.value = true;
          survey.progress.questions_answered += 1;
        }
      });
      survey.progress.question_count += 1;
    });
    survey.progress.question_count = 87;
    survey.progress.questions_answered = 80;
    survey.progress.percentage = 0.98;
    survey.progress.total_review = 5;
    survey.progress.total_score = 95;
    survey.progress.total_max_score = 100;
  }
  return survey;
}
