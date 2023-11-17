import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
// Add new category_definition row data to the seeds array
const seeds: Array<{
  name: string;
  description: string;
  definition: any;
}> = [
  {
    name: 'taxonomy',
    description: '2023 Taxonomy',
    definition: {
      cold_score: null,
      categories: {
        company_decarbonization: {
          category_name: 'Company Decarbonization',
          idx: 0,
          weighted_journey_score: null,
          subcategories: {
            facilities: {
              subcategory_name: 'Facilities',
              idx: 0,
              journey_score: null,
              activities: {
                electricity_owned: {
                  activity_description: 'Electricity consumption at all company owned facilities',
                  activity_name: 'Electricity at Owned',
                },
                fuel_owned: {
                  activity_description: 'Natural Gas, Propane, and Diesel consumption at all company owned facilities',
                  activity_name: 'Fuel at Owned',
                },
                electricity_leased: {
                  activity_description: 'Electricity consumption at all company leased facilities',
                  activity_name: 'Electricity at Leased',
                },
                fuel_leased: {
                  activity_description: 'Natural Gas, Propane, and Diesel consumption at all company leased facilities',
                  activity_name: 'Fuel at Leased',
                },
              },
            },
            travel: {
              journey_score: null,
              idx: 1,
              activities: {
                vehicle_fuel: {
                  activity_description: 'Fuel for Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
                  activity_name: 'Vehicle Fuel',
                },
                vehicle_electricity: {
                  activity_description: 'Electricity for Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
                  activity_name: 'Vehicle Electricity',
                },
                commuting: {
                  activity_description: 'Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.)',
                  activity_name: 'Commuting',
                },
                air_travel: {
                  activity_description: 'Business-related air travel, domestic and international',
                  activity_name: 'Air Travel',
                },
                other_travel: {
                  activity_description: 'Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc.',
                  activity_name: 'Other Travel',
                },
              },
              subcategory_name: 'Travel',
            },
            operations: {
              journey_score: null,
              idx: 2,
              activities: {
                machinery_fuel: {
                  activity_description: 'Fuel for forklifts, excavators, cranes, other heavy machinery',
                  activity_name: 'Machinery Fuel',
                },
                machinery_electricity: {
                  activity_description: 'Electricity for forklifts, excavators, cranes, other heavy machinery',
                  activity_name: 'Machinery Electricity',
                },
                cloud_computing: {
                  activity_description: 'Server & SaaS usage. ',
                  activity_name: 'Cloud Computing',
                },
                professional_services: {
                  activity_description: 'Creative, marketing and communications, consultants, legal, etc.',
                  activity_name: 'Professional Services',
                },
                business_supplies: {
                  activity_description: 'Consumables and single-use items: Inks, papers, napkins & towels, etc.',
                  activity_name: 'Business Supplies',
                },
                business_equipment: {
                  activity_description: 'Printers, sinks & toilets, computers, printers, other electronic appliances',
                  activity_name: 'Business Equipment',
                },
                furniture: {
                  activity_description: 'Furniture for offices, company-owned or leased residences, and other worksites',
                  activity_name: 'Furniture',
                },
              },
              subcategory_name: 'Operations',
            },
            product: {
              journey_score: null,
              idx: 3,
              activities: {
                manufacturing_energy: {
                  activity_description: 'Process energy (electric + heat) used for making products',
                  activity_name: 'Manufacturing Energy',
                },
                materials: {
                  activity_description: 'Purchased raw materials and manufactured inputs',
                  activity_name: 'Materials',
                },
                engineering_and_innovation: {
                  activity_description: 'Design new products and services for environmental impact',
                  activity_name: 'Engineering & Innovation',
                },
                manufacturing_waste: {
                  activity_description: 'Reduce production-related materials waste',
                  activity_name: 'Manufacturing Waste',
                },
                product_use: {
                  activity_description: 'Optimize product use impact through customer education and behavior change',
                  activity_name: 'Product Use',
                },
                packaging_materials: {
                  activity_description: 'What raw materials + manufactured products are purchased for packaging',
                  activity_name: 'Packaging Materials',
                },
                packaging_disposal: {
                  activity_description: 'Consumer disposal of packaging (recycling, composting, trash, etc.)',
                  activity_name: 'Packaging Disposal',
                },
                upstream_shipping_and_freight: {
                  activity_description: 'Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea)',
                  activity_name: 'Upstream Shipping & Freight',
                },
                downstream_shipping_and_freight: {
                  activity_description: 'Movement of finished product to distributors, retailers, and customers by land, sea, or air',
                  activity_name: 'Downstream Shipping & Freight',
                },
              },
              subcategory_name: 'Product',
            },
          },
        },
        employee_engagement: {
          category_name: 'Employee Engagement',
          idx: 1,
          subcategories: {
            employee_footprint: {
              journey_score: null,
              idx: 0,
              activities: {
                home: {
                  activity_description:
                    'Empower employees to reduce their carbon footprint at home, through energy efficiency, renewable energy, and other reduction opportunities',
                  activity_name: 'Home',
                },
                transport_and_travel: {
                  activity_description:
                    'Reduce transport and travel-related emissions through public transportation, EVs, personal mobility devices, behavior change, and education',
                  activity_name: 'Transport & Travel',
                },
                personal_finance: {
                  activity_description: 'Steward financial resources to maximize climate impact (401k, investing opportunities, debit/credit cards, etc.)',
                  activity_name: 'Personal Finance',
                },
              },
              subcategory_name: 'Employee Footprint',
            },
            employee_activation: {
              journey_score: null,
              idx: 1,
              activities: {
                workplace: {
                  activity_description: 'Enable employees to become climate and environmental leaders in the office/workplace through education and other opportunities',
                  activity_name: 'Workplace',
                },
                community: {
                  activity_description: 'Activate employees for community environmental impact through relevant workshops & education opportunities on material, local issues',
                  activity_name: 'Community',
                },
              },
              subcategory_name: 'Employee Activation',
            },
          },
        },
        climate_leadership: {
          category_name: 'Climate Leadership',
          idx: 2,
          subcategories: {
            internal_alignment: {
              journey_score: null,
              idx: 0,
              activities: {
                finance: {
                  activity_description: 'Climate friendly financial stewardship (banking and investments) and decision making',
                  activity_name: 'Finance',
                },
                hr: {
                  activity_description: 'Drive impact and improve employee retention through strategic environmental personnel management',
                  activity_name: 'HR',
                },
                'long-term_planning': {
                  activity_description: 'Ensure long-term impact through strategic business planning and executive-level governance',
                  activity_name: 'Long Term Planning',
                },
                transparency: {
                  activity_description: 'Disclosure of environmental performance & stewardship',
                  activity_name: 'Transparency',
                },
                purchasing: {
                  activity_description: 'Ensure environmental impact is prioritized through supplier choice & product selection',
                  activity_name: 'Purchasing',
                },
                client_work: {
                  activity_description: 'Introducing environmentally friendly choices into work products for clients',
                  activity_name: 'Client Work',
                },
                additional_environmental_issues: {
                  activity_description: 'Actions & goals on water, biodiversity, etc.',
                  activity_name: 'Additional Environmental Issues',
                },
              },
              subcategory_name: 'Internal Alignment',
            },
            community_impact: {
              journey_score: null,
              idx: 1,
              activities: {
                collective_action_and_advocacy: {
                  activity_description: 'Non-financial contribution of time or influence to a group or cause that the company believes in',
                  activity_name: 'Collective Action And Advocacy',
                },
                philanthropy: {
                  activity_description: 'Financial contribution to mission-aligned group or cause',
                  activity_name: 'Philanthropy',
                },
              },
              subcategory_name: 'Community Impact',
            },
          },
        },
      },
    },
  },
];

export async function seedCategoryDefinitions() {
  await prisma.$connect();

  console.log(`Seeding category_definitions...`);
  let count = 0;

  await Promise.all(
    seeds.map(async (seed: any) => {
      const result = await prisma.category_definitions
        .upsert({
          where: { name: seed.name },
          update: seed,
          create: {
            id: v4(),
            created_at: new Date(),
            ...seed,
          },
        })
        .catch(error => {
          console.error(error);
        });
      count++;

      console.log(`🌱 Seeded (${count} of ${seeds.length}): ${seed.name} 🌱`, result);
    }),
  );

  console.log(`${count} category_definitions seeded!`);

  await prisma.$disconnect();
}
