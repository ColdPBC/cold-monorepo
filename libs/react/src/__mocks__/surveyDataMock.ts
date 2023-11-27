import { SurveyPayloadType, SurveySectionType } from '@coldpbc/interfaces';

export const getSurveyFormDataByName = (name: string): SurveyPayloadType => {
  switch (name) {
    default:
    case 'qaalib_test':
      return getTestingSurveyFormDefinitionData();
    case 'journey_overview':
      return getJourneyOverviewMock();
  }
};

export const getTestingSurveyFormDefinitionData = (): SurveyPayloadType => {
  return {
    id: '622fe082-a490-49a3-97f1-9cb511b53581',
    name: 'qaalib_test',
    type: 'survey',
    description:
      'A survey that exercises lots of sections and components for Qaalib to test everything with the survey',
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
          category_description:
            'Questions about how your products are produced',
        },
        facilities: {
          title: 'Facilities',
          prompt:
            'Do you own or lease any facilities like offices or warehouses?',
          component: 'yes_no',
          follow_up: {
            'facilities:0': {
              idx: 0,
              prompt: 'What colors are your office carpets?',
              options: ['Gray', 'Black', 'Orange', 'Blue', 'Purple'],
              tooltip:
                'If carpets are multiple colors choose all colors that apply',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          category_idx: 2,
          category_description:
            'Questions about your the facilities you own or lease',
        },
        general: {
          title: 'General',
          prompt: '',
          component: null,
          follow_up: {
            'general:0': {
              idx: 0,
              prompt: 'Which regions do you sell your product into?',
              options: [
                'North America',
                'South America',
                'Europe',
                'Asia',
                'Australia',
                'Africa',
              ],
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
    description:
      'Introductory survey to understand where an organization currently stands with climate',
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
              prompt:
                'How many employees did your company have as of the end of last calendar year?',
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
              prompt:
                'How quickly do you expect your company to grow over the next five years?',
              options: [
                'Light (e.g. < 5% Year-over-Year)',
                'Moderate (e.g. 5-15% Year-over-year)',
                'Aggressive (e.g. > 15% Year-over-Year)',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
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
              prompt:
                'Have you conducted LCAs (life-cycle analyses) to determine the environmental impact of your products?',
              options: [
                'Yes, for all products',
                'Yes, for some products',
                'No',
              ],
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
              prompt:
                'Do you import any freight into countries where you manufacture or sell your product(s)?',
              options: [],
              tooltip:
                'Freight includes all raw materials, secondary goods, or final products you import into a country where you manufacture and/or sell your product',
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
              options: [
                'Water',
                'Electricity',
                'Gas',
                'Waste',
                'None of these',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            maufacturing_utility_reduction: {
              idx: 2,
              prompt:
                'Do you have reduction targets per unit of output in place for any of the following?',
              options: [
                'Water',
                'Electricity',
                'Gas',
                'Waste',
                'None of these',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Product.png',
          category_idx: 4,
          category_description:
            'Information about products your company makes or distributes',
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Vehicles.png',
          category_idx: 3,
          category_description:
            'Information about vehicles your company owns or leases',
        },
        employees: {
          title: 'Employees',
          prompt: '',
          component: null,
          follow_up: {
            food_education: {
              idx: 1,
              prompt:
                'Do you educate employees on the environmental impact of foods consumed at company facilities and at home?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_benefits: {
              idx: 0,
              prompt:
                'What climate-friendly benefits do you offer to your employees?',
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
              options: [
                'Climate education',
                'Local environmental leadership experiences',
                'Paid volunteering opportunities with mission-aligned NGOs or community organizations',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Employees.png',
          category_idx: 7,
          category_description:
            'Information about benefits you provide to your employees and how you engage them on climate',
        },
        machinery: {
          title: 'Machinery',
          prompt: 'Does your company own or lease industrial machinery?',
          component: 'yes_no',
          follow_up: {
            machine_energy: {
              idx: 0,
              prompt:
                'Do you monitor and record industrial machinery energy use in order to optimize energy performance and conservation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Machinery.png',
          category_idx: 5,
          category_description:
            'Information about industrial machinery used in your operations',
        },
        facilities: {
          title: 'Facilities',
          prompt: 'Does your company own or lease any facilities?',
          component: 'yes_no',
          follow_up: {
            gas_monitoring: {
              idx: 4,
              prompt:
                'At which of your facilities do you monitor and record gas use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            waste_education: {
              idx: 7,
              prompt:
                'Do you educate employees to properly dispose of waste at all offices and facilities?',
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
              prompt:
                'Do you offer the following waste diversion receptacles at some or all of your facilities?',
              options: [
                'Electronic waste',
                'Compost / organics',
                'Paper and cardboard recycling',
                'Glass, aluminum, and plastics recycling',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            renewable_estimate: {
              idx: 1,
              prompt:
                'How much of your electricity came from renewable electricity generated on-site at your facilities? ',
              options: ['All', 'Some', 'None'],
              tooltip:
                '(i.e. if you own, you installed your own solar panels; if you lease, your landlord has installed solar panels)',
              component: 'select',
              placeholder: '',
            },
            renewable_purchased: {
              idx: 2,
              prompt:
                'How much of your electricity was renewable electricity you purchased from your utility provider?',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            electricity_monitoring: {
              idx: 3,
              prompt:
                'At which of your facilities do you monitor and record electricity use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            facilities_actions_taken: {
              idx: 5,
              prompt:
                "Which of the following actions have you taken to improve your climate impact at any of your organization's facilities?",
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Facilities.png',
          category_idx: 1,
          category_description:
            'Information about any facilities your company manages',
        },
        purchasing: {
          title: 'Office Purchasing',
          prompt: '',
          component: null,
          follow_up: {
            reusable_water: {
              idx: 3,
              prompt:
                'Have you eliminated bottled water in office and do you provide filtered water stations and reusable glasses?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            used_donations: {
              idx: 6,
              prompt:
                'Do you donate any unused office supplies, equipment, or furniture to local organizations?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            paper_purchasing: {
              idx: 1,
              prompt:
                'Do you purchase only certified deforestation-free or 100% post-consumer recycled paper & paper products (towels & napkins, etc.)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            energystar_equipment: {
              idx: 5,
              prompt:
                'Do you purchase EnergyStar top performing for all digital equipment?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            double_sided_printing: {
              idx: 2,
              prompt:
                'Have you implemented a policy to minimize printing and require double-sided printing?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            eco_friendly_cleaning: {
              idx: 4,
              prompt:
                'Do you require custodial staff to use only non-toxic and environmentally-friendly cleaning supplies?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            environmental_purchasing: {
              idx: 0,
              prompt:
                'Have you written and implemented an environmentally preferred purchasing policy?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Purchasing.png',
          category_idx: 6,
          category_description:
            "Information about your company's purchasing decisions and policies",
        },
        commuting_travel: {
          title: 'Commuting & Travel',
          prompt: '',
          component: null,
          follow_up: {
            commute_drive: {
              idx: 2,
              prompt:
                'Approximately how many employees drive to work when commuting?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_wfh: {
              idx: 1,
              prompt:
                'Approximately how many days per week are work-from-home days across all employees, on average?',
              options: ['One', 'Two', 'Three', 'Four'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            business_travel: {
              idx: 3,
              prompt:
                'Roughly how many employees regularly travel for business?',
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/CommutingTravel.png',
          category_idx: 2,
          category_description:
            "Information about your employee's commuting and business travel habits",
        },
        climate_leadership: {
          title: 'Climate Leadership',
          prompt: '',
          component: null,
          follow_up: {
            ghg_target: {
              idx: 2,
              prompt:
                'Has your organization set a company-wide GHG emissions reduction target?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            cost_of_carbon: {
              idx: 1,
              prompt:
                'Do you incorporate the cost of carbon into financial accounting and decision making?',
              options: [
                'No',
                'We implement a shadow or proxy price on carbon',
                'We implement an internal price on carbon aligned with or higher than the social cost of carbon',
              ],
              tooltip:
                'Carbon prices help businesses to assess the climate-related externalities of doing business. Externalities, in this case, refer to the social and environmental cost of greenhouse gas emissions associated with key business activities that are otherwise not included or reflected in company balance sheets or transaction analyses. Companies implement a "shadow or proxy price on carbon" to help them better understand their company\'s social and environmental impact or to project potential impacts to the bottom-line under scenarios where regulators adopt or strengthen carbon tax policies. Implementing an "internal price on carbon" typically involves incorporating the cost of climate-related externalities into departmental balance sheets or cost-benefit analyses, which directly affects bottom-line decision making.',
              component: 'select',
              placeholder: '',
            },
            vendor_screening: {
              idx: 6,
              prompt:
                'Do you have a screening policy to evaluate and support supplier/vendor climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_disclosure: {
              idx: 5,
              prompt:
                'Do you publicly disclose any of your environmental performance or impact?',
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
              prompt:
                'Do you screen potential banking & financial partners for climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_hr_decisions: {
              idx: 3,
              prompt:
                'Do you consider environmental issues in HR-related matters such as recruitment or compensation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_company_decisions: {
              idx: 4,
              prompt:
                'Does your board consider environmental impact as a part of company decision making?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/ClimateLeadership.png',
          category_idx: 8,
          category_description:
            'Efforts your company makes to bring climate to the forefront of decision making',
        },
      },
      image_url:
        'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
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
    description:
      'Introductory survey to understand where an organization currently stands with climate',
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
              prompt:
                'How many employees did your company have as of the end of last calendar year?',
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
              prompt:
                'How quickly do you expect your company to grow over the next five years?',
              options: [
                'Light (e.g. < 5% Year-over-Year)',
                'Moderate (e.g. 5-15% Year-over-year)',
                'Aggressive (e.g. > 15% Year-over-Year)',
              ],
              tooltip: '',
              component: 'select',
              placeholder: '',
              value: null,
              skipped: true,
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
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
              prompt:
                'Have you conducted LCAs (life-cycle analyses) to determine the environmental impact of your products?',
              options: [
                'Yes, for all products',
                'Yes, for some products',
                'No',
              ],
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
              prompt:
                'Do you import any freight into countries where you manufacture or sell your product(s)?',
              options: [],
              tooltip:
                'Freight includes all raw materials, secondary goods, or final products you import into a country where you manufacture and/or sell your product',
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
              options: [
                'Water',
                'Electricity',
                'Gas',
                'Waste',
                'None of these',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            maufacturing_utility_reduction: {
              idx: 2,
              prompt:
                'Do you have reduction targets per unit of output in place for any of the following?',
              options: [
                'Water',
                'Electricity',
                'Gas',
                'Waste',
                'None of these',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Product.png',
          category_idx: 4,
          category_description:
            'Information about products your company makes or distributes',
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Vehicles.png',
          category_idx: 3,
          category_description:
            'Information about vehicles your company owns or leases',
        },
        employees: {
          title: 'Employees',
          prompt: '',
          component: null,
          follow_up: {
            food_education: {
              idx: 1,
              prompt:
                'Do you educate employees on the environmental impact of foods consumed at company facilities and at home?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_benefits: {
              idx: 0,
              prompt:
                'What climate-friendly benefits do you offer to your employees?',
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
              options: [
                'Climate education',
                'Local environmental leadership experiences',
                'Paid volunteering opportunities with mission-aligned NGOs or community organizations',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Employees.png',
          category_idx: 7,
          category_description:
            'Information about benefits you provide to your employees and how you engage them on climate',
        },
        machinery: {
          title: 'Machinery',
          prompt: 'Does your company own or lease industrial machinery?',
          component: 'yes_no',
          follow_up: {
            machine_energy: {
              idx: 0,
              prompt:
                'Do you monitor and record industrial machinery energy use in order to optimize energy performance and conservation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Machinery.png',
          category_idx: 5,
          category_description:
            'Information about industrial machinery used in your operations',
        },
        facilities: {
          title: 'Facilities',
          prompt: 'Does your company own or lease any facilities?',
          component: 'yes_no',
          follow_up: {
            gas_monitoring: {
              idx: 4,
              prompt:
                'At which of your facilities do you monitor and record gas use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            waste_education: {
              idx: 7,
              prompt:
                'Do you educate employees to properly dispose of waste at all offices and facilities?',
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
              prompt:
                'Do you offer the following waste diversion receptacles at some or all of your facilities?',
              options: [
                'Electronic waste',
                'Compost / organics',
                'Paper and cardboard recycling',
                'Glass, aluminum, and plastics recycling',
              ],
              tooltip: '',
              component: 'multi_select',
              placeholder: '',
            },
            renewable_estimate: {
              idx: 1,
              prompt:
                'How much of your electricity came from renewable electricity generated on-site at your facilities? ',
              options: ['All', 'Some', 'None'],
              tooltip:
                '(i.e. if you own, you installed your own solar panels; if you lease, your landlord has installed solar panels)',
              component: 'select',
              placeholder: '',
            },
            renewable_purchased: {
              idx: 2,
              prompt:
                'How much of your electricity was renewable electricity you purchased from your utility provider?',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            electricity_monitoring: {
              idx: 3,
              prompt:
                'At which of your facilities do you monitor and record electricity use? ',
              options: ['All', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            facilities_actions_taken: {
              idx: 5,
              prompt:
                "Which of the following actions have you taken to improve your climate impact at any of your organization's facilities?",
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Facilities.png',
          category_idx: 1,
          category_description:
            'Information about any facilities your company manages',
        },
        purchasing: {
          title: 'Office Purchasing',
          prompt: '',
          component: null,
          follow_up: {
            reusable_water: {
              idx: 3,
              prompt:
                'Have you eliminated bottled water in office and do you provide filtered water stations and reusable glasses?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            used_donations: {
              idx: 6,
              prompt:
                'Do you donate any unused office supplies, equipment, or furniture to local organizations?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            paper_purchasing: {
              idx: 1,
              prompt:
                'Do you purchase only certified deforestation-free or 100% post-consumer recycled paper & paper products (towels & napkins, etc.)?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            energystar_equipment: {
              idx: 5,
              prompt:
                'Do you purchase EnergyStar top performing for all digital equipment?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            double_sided_printing: {
              idx: 2,
              prompt:
                'Have you implemented a policy to minimize printing and require double-sided printing?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            eco_friendly_cleaning: {
              idx: 4,
              prompt:
                'Do you require custodial staff to use only non-toxic and environmentally-friendly cleaning supplies?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            environmental_purchasing: {
              idx: 0,
              prompt:
                'Have you written and implemented an environmentally preferred purchasing policy?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/Purchasing.png',
          category_idx: 6,
          category_description:
            "Information about your company's purchasing decisions and policies",
        },
        commuting_travel: {
          title: 'Commuting & Travel',
          prompt: '',
          component: null,
          follow_up: {
            commute_drive: {
              idx: 2,
              prompt:
                'Approximately how many employees drive to work when commuting?',
              options: ['All', 'Most', 'Some', 'None'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            workforce_wfh: {
              idx: 1,
              prompt:
                'Approximately how many days per week are work-from-home days across all employees, on average?',
              options: ['One', 'Two', 'Three', 'Four'],
              tooltip: '',
              component: 'select',
              placeholder: '',
            },
            business_travel: {
              idx: 3,
              prompt:
                'Roughly how many employees regularly travel for business?',
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
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/CommutingTravel.png',
          category_idx: 2,
          category_description:
            "Information about your employee's commuting and business travel habits",
        },
        climate_leadership: {
          title: 'Climate Leadership',
          prompt: '',
          component: null,
          follow_up: {
            ghg_target: {
              idx: 2,
              prompt:
                'Has your organization set a company-wide GHG emissions reduction target?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            cost_of_carbon: {
              idx: 1,
              prompt:
                'Do you incorporate the cost of carbon into financial accounting and decision making?',
              options: [
                'No',
                'We implement a shadow or proxy price on carbon',
                'We implement an internal price on carbon aligned with or higher than the social cost of carbon',
              ],
              tooltip:
                'Carbon prices help businesses to assess the climate-related externalities of doing business. Externalities, in this case, refer to the social and environmental cost of greenhouse gas emissions associated with key business activities that are otherwise not included or reflected in company balance sheets or transaction analyses. Companies implement a "shadow or proxy price on carbon" to help them better understand their company\'s social and environmental impact or to project potential impacts to the bottom-line under scenarios where regulators adopt or strengthen carbon tax policies. Implementing an "internal price on carbon" typically involves incorporating the cost of climate-related externalities into departmental balance sheets or cost-benefit analyses, which directly affects bottom-line decision making.',
              component: 'select',
              placeholder: '',
            },
            vendor_screening: {
              idx: 6,
              prompt:
                'Do you have a screening policy to evaluate and support supplier/vendor climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_disclosure: {
              idx: 5,
              prompt:
                'Do you publicly disclose any of your environmental performance or impact?',
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
              prompt:
                'Do you screen potential banking & financial partners for climate impact?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_hr_decisions: {
              idx: 3,
              prompt:
                'Do you consider environmental issues in HR-related matters such as recruitment or compensation?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
            climate_company_decisions: {
              idx: 4,
              prompt:
                'Does your board consider environmental impact as a part of company decision making?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
            },
          },
          image_url:
            'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/ClimateLeadership.png',
          category_idx: 8,
          category_description:
            'Efforts your company makes to bring climate to the forefront of decision making',
        },
      },
      image_url:
        'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
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
