export const categoryPutExample = {
  definition: {
    categories: {
      climate_leadership: {
        idx: 2,
        category_name: 'Climate Leadership',
        subcategories: {
          community_impact: {
            idx: 1,
            activities: {
              philanthropy: {
                activity_name: 'Philanthropy',
                activity_description: 'Financial contribution to mission-aligned group or cause',
              },
              collective_action_and_advocacy: {
                activity_name: 'Collective Action And Advocacy',
                activity_description: 'Non-financial contribution of time or influence to a group or cause that the company believes in',
              },
            },
            journey_score: null,
            subcategory_name: 'Community Impact',
          },
          internal_alignment: {
            idx: 0,
            activities: {
              hr: {
                activity_name: 'HR',
                activity_description: 'Drive impact and improve employee retention through strategic environmental personnel management',
              },
              finance: {
                activity_name: 'Finance',
                activity_description: 'Climate friendly financial stewardship (banking and investments) and decision making',
              },
              purchasing: {
                activity_name: 'Purchasing',
                activity_description: 'Ensure environmental impact is prioritized through supplier choice & product selection',
              },
              client_work: {
                activity_name: 'Client Work',
                activity_description: 'Introducing environmentally friendly choices into work products for clients',
              },
              transparency: {
                activity_name: 'Transparency',
                activity_description: 'Disclosure of environmental performance & stewardship',
              },
              'long-term_planning': {
                activity_name: 'Long Term Planning',
                activity_description: 'Ensure long-term impact through strategic business planning and executive-level governance',
              },
              additional_environmental_issues: {
                activity_name: 'Additional Environmental Issues',
                activity_description: 'Actions & goals on water, biodiversity, etc.',
              },
            },
            journey_score: null,
            subcategory_name: 'Internal Alignment',
          },
        },
      },
      employee_engagement: {
        idx: 1,
        category_name: 'Employee Engagement',
        subcategories: {
          employee_footprint: {
            idx: 0,
            activities: {
              home: {
                activity_name: 'Home',
                activity_description: 'Empower employees to reduce their carbon footprint at home, through energy efficiency, renewable energy, and other reduction opportunities',
              },
              personal_finance: {
                activity_name: 'Personal Finance',
                activity_description: 'Steward financial resources to maximize climate impact (401k, investing opportunities, debit/credit cards, etc.)',
              },
              transport_and_travel: {
                activity_name: 'Transport & Travel',
                activity_description: 'Reduce transport and travel-related emissions through public transportation, EVs, personal mobility devices, behavior change, and education',
              },
            },
            journey_score: null,
            subcategory_name: 'Employee Footprint',
          },
          employee_activation: {
            idx: 1,
            activities: {
              community: {
                activity_name: 'Community',
                activity_description: 'Activate employees for community environmental impact through relevant workshops & education opportunities on material, local issues',
              },
              workplace: {
                activity_name: 'Workplace',
                activity_description: 'Enable employees to become climate and environmental leaders in the office/workplace through education and other opportunities',
              },
            },
            journey_score: null,
            subcategory_name: 'Employee Activation',
          },
        },
      },
      company_decarbonization: {
        idx: 0,
        category_name: 'Company Decarbonization',
        subcategories: {
          travel: {
            idx: 1,
            activities: {
              commuting: {
                activity_name: 'Commuting',
                activity_description: 'Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.)',
              },
              air_travel: {
                activity_name: 'Air Travel',
                activity_description: 'Business-related air travel, domestic and international',
              },
              other_travel: {
                activity_name: 'Other Travel',
                activity_description: 'Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc.',
              },
              vehicle_fuel: {
                activity_name: 'Vehicle Fuel',
                activity_description: 'Fuel for Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
              },
              vehicle_electricity: {
                activity_name: 'Vehicle Electricity',
                activity_description: 'Electricity for Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
              },
            },
            journey_score: null,
            subcategory_name: 'Travel',
          },
          product: {
            idx: 3,
            activities: {
              materials: {
                activity_name: 'Materials',
                activity_description: 'Purchased raw materials and manufactured inputs',
              },
              product_use: {
                activity_name: 'Product Use',
                activity_description: 'Optimize product use impact through customer education and behavior change',
              },
              packaging_disposal: {
                activity_name: 'Packaging Disposal',
                activity_description: 'Consumer disposal of packaging (recycling, composting, trash, etc.)',
              },
              manufacturing_waste: {
                activity_name: 'Manufacturing Waste',
                activity_description: 'Reduce production-related materials waste',
              },
              packaging_materials: {
                activity_name: 'Packaging Materials',
                activity_description: 'What raw materials + manufactured products are purchased for packaging',
              },
              manufacturing_energy: {
                activity_name: 'Manufacturing Energy',
                activity_description: 'Process energy (electric + heat) used for making products',
              },
              engineering_and_innovation: {
                activity_name: 'Engineering & Innovation',
                activity_description: 'Design new products and services for environmental impact',
              },
              upstream_shipping_and_freight: {
                activity_name: 'Upstream Shipping & Freight',
                activity_description: 'Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea)',
              },
              downstream_shipping_and_freight: {
                activity_name: 'Downstream Shipping & Freight',
                activity_description: 'Movement of finished product to distributors, retailers, and customers by land, sea, or air',
              },
            },
            journey_score: null,
            subcategory_name: 'Product',
          },
          facilities: {
            idx: 0,
            activities: {
              fuel_owned: {
                activity_name: 'Fuel at Owned',
                activity_description: 'Natural Gas, Propane, and Diesel consumption at all company owned facilities',
              },
              fuel_leased: {
                activity_name: 'Fuel at Leased',
                activity_description: 'Natural Gas, Propane, and Diesel consumption at all company leased facilities',
              },
              electricity_owned: {
                activity_name: 'Electricity at Owned',
                activity_description: 'Electricity consumption at all company owned facilities',
              },
              electricity_leased: {
                activity_name: 'Electricity at Leased',
                activity_description: 'Electricity consumption at all company leased facilities',
              },
            },
            journey_score: null,
            subcategory_name: 'Facilities',
          },
          operations: {
            idx: 2,
            activities: {
              furniture: {
                activity_name: 'Furniture',
                activity_description: 'Furniture for offices, company-owned or leased residences, and other worksites',
              },
              machinery_fuel: {
                activity_name: 'Machinery Fuel',
                activity_description: 'Fuel for forklifts, excavators, cranes, other heavy machinery',
              },
              cloud_computing: {
                activity_name: 'Cloud Computing',
                activity_description: 'Server & SaaS usage. ',
              },
              business_supplies: {
                activity_name: 'Business Supplies',
                activity_description: 'Consumables and single-use items: Inks, papers, napkins & towels, etc.',
              },
              business_equipment: {
                activity_name: 'Business Equipment',
                activity_description: 'Printers, sinks & toilets, computers, printers, other electronic appliances',
              },
              machinery_electricity: {
                activity_name: 'Machinery Electricity',
                activity_description: 'Electricity for forklifts, excavators, cranes, other heavy machinery',
              },
              professional_services: {
                activity_name: 'Professional Services',
                activity_description: 'Creative, marketing and communications, consultants, legal, etc.',
              },
            },
            journey_score: null,
            subcategory_name: 'Operations',
          },
        },
        weighted_journey_score: null,
      },
    },
    cold_score: null,
  },
};
