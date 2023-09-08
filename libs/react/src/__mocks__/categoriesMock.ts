import {find} from 'lodash';
export function getCategoriesDataMock() {
  return {
    "categories": [
      {
        "category_key": "company_decarbonization",
        "category_name": "Company Decarbonization",
        "subcategories": [
          {
            "subcategory_key": "facilities",
            "subcategory_name": "Facilities",
            "journey_score": 25,

            "activities": [
              {
                "activity_key": "electricity_owned",
                "activity_description": "Electricity consumption at all company owned facilities",
                "footprint": [
                  {
                    "period": 2022,
                    "period_type": "year",
                    "value": 13.23
                  },
                  {
                    "period": 2023,
                    "period_type": "year",
                    "value": 11.4
                  },
                  {
                    "period": "2023-q4",
                    "period_type": "quarter",
                    "value": 3.2
                  }
                ]
              },
              {
                "activity_key": "fuel_owned",
                "activity_description": "Natural Gas, Propane, and Diesel consumption at all company owned facilities"
              },
              {
                "activity_key": "electricity_leased",
                "activity_description": "Electricity consumption at all company leased facilities",
                "footprint": [
                  {
                    "period": 2022,
                    "period_type": "year",
                    "value": 47
                  },
                  {
                    "period": 2023,
                    "period_type": "year",
                    "value": 11.4
                  },
                  {
                    "period": "2023-q4",
                    "period_type": "quarter",
                    "value": 3.2
                  }
                ]
              },
              {
                "activity_key": "fuel_leased",
                "activity_description": "Natural Gas, Propane, and Diesel consumption at all company leased facilities"
              }
            ]

          },
          {
            "journey_score": 12,
            "activities": [
              {
                "activity_key": "vehicle_fuel",
                "activity_description": "Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased",
                "footprint": [
                  {
                    "period": 2022,
                    "period_type": "year",
                    "value": 90
                  },
                  {
                    "period": 2023,
                    "period_type": "year",
                    "value": 11.4
                  },
                  {
                    "period": "2023-q4",
                    "period_type": "quarter",
                    "value": 3.2
                  }
                ]
              },
              {
                "activity_key": "vehicle_electricity",
                "activity_description": "Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased"
              },
              {
                "activity_key": "commuting",
                "activity_description": "Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.) "
              },
              {
                "activity_key": "air_travel",
                "activity_description": "Business-related air travel, domestic and international. "
              },
              {
                "activity_key": "other_travel",
                "activity_description": "Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc."
              }
            ],
            "subcategory_key": "travel",
            "subcategory_name": "Travel"
          },
          {
            "journey_score": 72,
            "activities": [
              {
                "activity_key": "machinery_fuel",
                "activity_description": "Forklifts, excavators, cranes, other heavy machinery.",
                "footprint": [
                  {
                    "period": 2022,
                    "period_type": "year",
                    "value": 22
                  },
                  {
                    "period": 2023,
                    "period_type": "year",
                    "value": 11.4
                  },
                  {
                    "period": "2023-q4",
                    "period_type": "quarter",
                    "value": 3.2
                  }
                ]
              },
              {
                "activity_key": "machinery_electricity",
                "activity_description": "Forklifts, excavators, cranes, other heavy machinery. "
              },
              {
                "activity_key": "cloud_computing",
                "activity_description": "Server & SaaS usage. "
              },
              {
                "activity_key": "professional_services",
                "activity_description": "Creative, marketing and communications, consultants, legal, etc. "
              },
              {
                "activity_key": "business_supplies",
                "activity_description": "Consumables and single-use items: Inks, papers, napkins & towels, etc."
              },
              {
                "activity_key": "business_equipment",
                "activity_description": "Printers, sinks & toilets, computers, printers, other electronic appliances. "
              },
              {
                "activity_key": "furniture",
                "activity_description": "Furniture for offices, company-owned or leased residences, and other worksites.  "
              }
            ],
            "subcategory_key": "operations",
            "subcategory_name": "Operations"
          },
          {
            "journey_score": 71,
            "activities": [
              {
                "activity_key": "manufacturing_energy",
                "activity_description": "Process energy (electric + heat) used for making products.",
                "footprint": [
                  {
                    "period": 2022,
                    "period_type": "year",
                    "value": 22
                  },
                  {
                    "period": 2023,
                    "period_type": "year",
                    "value": 11.4
                  },
                  {
                    "period": "2023-q4",
                    "period_type": "quarter",
                    "value": 3.2
                  }
                ]
              },
              {
                "activity_key": "materials",
                "activity_description": "Purchased raw materials and manufactured inputs."
              },
              {
                "activity_key": "engineering_and_innovation",
                "activity_description": "Design new products and services for environmental impact."
              },
              {
                "activity_key": "manufacturing_waste",
                "activity_description": "Reduce production-related materials waste. "
              },
              {
                "activity_key": "product_use",
                "activity_description": "Optimize product use impact through customer education and behavior change.  "
              },
              {
                "activity_key": "packaging_materials",
                "activity_description": "What raw materials + manufactured products are purchased for packaging. "
              },
              {
                "activity_key": "packaging_disposal",
                "activity_description": "Consumer disposal of packaging (recycling, composting, trash, etc.) "
              },
              {
                "activity_key": "upstream_shipping_and_freight",
                "activity_description": "Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea).  "
              },
              {
                "activity_key": "downstream_shipping_and_freight",
                "activity_description": "Movement of finished product to distributors, retailers, and customers by land, sea, or air."
              }
            ],
            "subcategory_key": "product",
            "subcategory_name": "Product"
          }
        ]
      },
      {
        "category_key": "employee_engagement",
        "category_name": "Employee Engagement",
        "subcategories": [
          {
            "journey_score": 100,
            "activities": [
              {
                "activity_key": "home",
                "activity_description": "Empower employees to reduce their carbon footprint at home, through energy efficiency, renewable energy, and other reduction opportunities."
              },
              {
                "activity_key": "transport_and_travel",
                "activity_description": "Reduce transport and travel-related emissions through public transportation, EVs, personal mobility devices, behavior change, and education. "
              },
              {
                "activity_key": "personal_finance",
                "activity_description": "Steward financial resources to maximize climate impact (401k, investing opportunities, debit/credit cards, etc.) "
              }
            ],
            "subcategory_key": "employee_footprint",
            "subcategory_name": "Employee Footprint"
          },
          {
            "journey_score": 33,
            "activities": [
              {
                "activity_key": "workplace",
                "activity_description": "Enable employees to become climate and environmental leaders in the office/workplace through education and other opportunities. "
              },
              {
                "activity_key": "community",
                "activity_description": "Activate employees for community environmental impact through relevant workshops & education opportunities on material, local issues.  "
              }
            ],
            "subcategory_key": "employee_activation",
            "subcategory_name": "Employee Activation"
          }
        ]
      },
      {
        "category_key": "climate_leadership",
        "category_name": "Climate Leadership",
        "subcategories": [
          {
            "journey_score": 66,
            "activities": [
              {
                "activity_key": "finance",
                "activity_description": "Climate friendly financial stewardship (banking and investments) and decision making. "
              },
              {
                "activity_key": "hr",
                "activity_description": "Drive impact and improve employee retention through strategic environmental personnel management. "
              },
              {
                "activity_key": "long-term_planning",
                "activity_description": "Ensure long-term impact through strategic business planning and executive-level governance. "
              },
              {
                "activity_key": "transparency",
                "activity_description": "Disclosure of environmental performance & stewardship. "
              },
              {
                "activity_key": "purchasing",
                "activity_description": "Ensure environmental impact is prioritized through supplier choice & product selection.  "
              },
              {
                "activity_key": "client_work",
                "activity_description": "Introducing environmentally friendly choices into work products for clients "
              },
              {
                "activity_key": "additional_environmental_issues",
                "activity_description": "Actions & goals on water, biodiversity, etc."
              }
            ],
            "subcategory_key": "internal_alignment",
            "subcategory_name": "Internal Alignment"
          },
          {
            "journey_score": 36,
            "activities": [
              {
                "activity_key": "collective_action_and_advocacy",
                "activity_description": "Non-financial contribution of time or influence to a group or cause that the company believes in"
              },
              {
                "activity_key": "philanthropy",
                "activity_description": "Financial contribution to mission-aligned group or cause."
              }
            ],
            "subcategory_key": "community_impact",
            "subcategory_name": "Community Impact"
          }
        ]
      }
    ]
  };
}

export function getFootprintDataMock() {
  return find(getCategoriesDataMock().categories,{'category_key':'company_decarbonization'} );
}

export function getFootprintDataMockTwoSubCats() {
  const data = find(getCategoriesDataMock().categories,{'category_key':'company_decarbonization'} );
  if (data?.subcategories) data.subcategories = data?.subcategories.slice(0, 2);

  return data;
}

export function getFootprintDataMockThreeSubCats() {
  const data = find(getCategoriesDataMock().categories,{'category_key':'company_decarbonization'} );
  if (data?.subcategories) data.subcategories = data?.subcategories.slice(0, 3);

  return data;
}

export function getFootprintDataMockFiveSubCats() {
  const data = find(getCategoriesDataMock().categories,{'category_key':'company_decarbonization'} );
  if (data?.subcategories) {
    data.subcategories.push({
      ...data.subcategories[0],
      subcategory_name: 'Private jets',
      subcategory_key: 'private-jets'
    });
  }

  return data;
}

export function getFootprintEmptyDataMock() {
  return {
    "subcategories": []
  };
}
