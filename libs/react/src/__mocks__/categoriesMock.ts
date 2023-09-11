export function getCategoriesDataMock():any {
  return {
    "categories": {
      "company_decarbonization": {
        "category_name": "Company Decarbonization",
        "idx": 0,
        "subcategories": {
          "facilities": {
            "subcategory_name": "Facilities",
            "idx": 0,
            "journey_score": 25,
            "activities": {
              "electricity_owned": {
                "activity_description": "Electricity consumption at all company owned facilities",
                "footprint": {
                  "2022": {
                    "period_type": "year",
                    "value": 13.23
                  },
                  "2023": {
                    "period_type": "year",
                    "value": 11.4
                  },
                  "2023-q4": {
                    "period_type": "quarter",
                    "value": 3.2
                  }
                },
                "activity_name": "Electricity Owned"
              },
              "fuel_owned": {
                "activity_description": "Natural Gas, Propane, and Diesel consumption at all company owned facilities",
                "activity_name": "Fuel Owned"
              },
              "electricity_leased": {
                "activity_description": "Electricity consumption at all company leased facilities",
                "footprint": {
                  "2022": {
                    "period_type": "year",
                    "value": 47
                  },
                  "2023": {
                    "period_type": "year",
                    "value": 11.4
                  },
                  "2023-q4": {
                    "period_type": "quarter",
                    "value": 3.2
                  }
                },
                "activity_name": "Electricity Leased"
              },
              "fuel_leased": {
                "activity_description": "Natural Gas, Propane, and Diesel consumption at all company leased facilities",
                "activity_name": "Fuel Leased"
              }
            }
          },
          "travel": {
            "journey_score": 12,
            "idx": 1,
            "activities": {
              "vehicle_fuel": {
                "activity_description": "Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased",
                "footprint": {
                  "2022": {
                    "period_type": "year",
                    "value": 90
                  },
                  "2023": {
                    "period_type": "year",
                    "value": 11.4
                  },
                  "2023-q4": {
                    "period_type": "quarter",
                    "value": 3.2
                  }
                },
                "activity_name": "Vehicle Fuel"
              },
              "vehicle_electricity": {
                "activity_description": "Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased",
                "activity_name": "Vehicle Electricity"
              },
              "commuting": {
                "activity_description": "Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.) ",
                "activity_name": "Commuting"
              },
              "air_travel": {
                "activity_description": "Business-related air travel, domestic and international. ",
                "activity_name": "Air Travel"
              },
              "other_travel": {
                "activity_description": "Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc.",
                "activity_name": "Other Travel"
              }
            },
            "subcategory_name": "Travel"
          },
          "operations": {
            "journey_score": 72,
            "idx": 2,
            "activities": {
              "machinery_fuel": {
                "activity_description": "Forklifts, excavators, cranes, other heavy machinery.",
                "footprint": {
                  "2022": {
                    "period_type": "year",
                    "value": 22
                  },
                  "2023": {
                    "period_type": "year",
                    "value": 11.4
                  },
                  "2023-q4": {
                    "period_type": "quarter",
                    "value": 3.2
                  }
                },
                "activity_name": "Machinery Fuel"
              },
              "machinery_electricity": {
                "activity_description": "Forklifts, excavators, cranes, other heavy machinery. ",
                "activity_name": "Machinery Electricity"
              },
              "cloud_computing": {
                "activity_description": "Server & SaaS usage. ",
                "activity_name": "Cloud Computing"
              },
              "professional_services": {
                "activity_description": "Creative, marketing and communications, consultants, legal, etc. ",
                "activity_name": "Professional Services"
              },
              "business_supplies": {
                "activity_description": "Consumables and single-use items: Inks, papers, napkins & towels, etc.",
                "activity_name": "Business Supplies"
              },
              "business_equipment": {
                "activity_description": "Printers, sinks & toilets, computers, printers, other electronic appliances. ",
                "activity_name": "Business Equipment"
              },
              "furniture": {
                "activity_description": "Furniture for offices, company-owned or leased residences, and other worksites.  ",
                "activity_name": "Furniture"
              }
            },
            "subcategory_name": "Operations"
          },
          "product": {
            "journey_score": 71,
            "idx":3,
            "activities": {
              "manufacturing_energy": {
                "activity_description": "Process energy (electric + heat) used for making products.",
                "footprint": {
                  "2022": {
                    "period_type": "year",
                    "value": 22
                  },
                  "2023": {
                    "period_type": "year",
                    "value": 11.4
                  },
                  "2023-q4": {
                    "period_type": "quarter",
                    "value": 3.2
                  }
                },
                "activity_name": "Manufacturing Energy"
              },
              "materials": {
                "activity_description": "Purchased raw materials and manufactured inputs.",
                "activity_name": "Materials"
              },
              "engineering_and_innovation": {
                "activity_description": "Design new products and services for environmental impact.",
                "activity_name": "Engineering And Innovation"
              },
              "manufacturing_waste": {
                "activity_description": "Reduce production-related materials waste. ",
                "activity_name": "Manufacturing Waste"
              },
              "product_use": {
                "activity_description": "Optimize product use impact through customer education and behavior change.  ",
                "activity_name": "Product Use"
              },
              "packaging_materials": {
                "activity_description": "What raw materials + manufactured products are purchased for packaging. ",
                "activity_name": "Packaging Materials"
              },
              "packaging_disposal": {
                "activity_description": "Consumer disposal of packaging (recycling, composting, trash, etc.) ",
                "activity_name": "Packaging Disposal"
              },
              "upstream_shipping_and_freight": {
                "activity_description": "Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea).  ",
                "activity_name": "Upstream Shipping And Freight"
              },
              "downstream_shipping_and_freight": {
                "activity_description": "Movement of finished product to distributors, retailers, and customers by land, sea, or air.",
                "activity_name": "Downstream Shipping And Freight"
              }
            },
            "subcategory_name": "Product"
          }
        }
      },
      "employee_engagement": {
        "category_name": "Employee Engagement",
        "idx": 1,
        "subcategories": {
          "employee_footprint": {
            "journey_score": 100,
            "idx":0,
            "activities": {
              "home": {
                "activity_description": "Empower employees to reduce their carbon footprint at home, through energy efficiency, renewable energy, and other reduction opportunities.",
                "activity_name": "Home"
              },
              "transport_and_travel": {
                "activity_description": "Reduce transport and travel-related emissions through public transportation, EVs, personal mobility devices, behavior change, and education. ",
                "activity_name": "Transport And Travel"
              },
              "personal_finance": {
                "activity_description": "Steward financial resources to maximize climate impact (401k, investing opportunities, debit/credit cards, etc.) ",
                "activity_name": "Personal Finance"
              }
            },
            "subcategory_name": "Employee Footprint"
          },
          "employee_activation": {
            "journey_score": 33,
            "idx":1,
            "activities": {
              "workplace": {
                "activity_description": "Enable employees to become climate and environmental leaders in the office/workplace through education and other opportunities. ",
                "activity_name": "Workplace"
              },
              "community": {
                "activity_description": "Activate employees for community environmental impact through relevant workshops & education opportunities on material, local issues.  ",
                "activity_name": "Community"
              }
            },
            "subcategory_name": "Employee Activation"
          }
        }
      },
      "climate_leadership": {
        "category_name": "Climate Leadership",
        "idx": 2,
        "subcategories": {
          "internal_alignment": {
            "journey_score": 66,
            "idx":0,
            "activities": {
              "finance": {
                "activity_description": "Climate friendly financial stewardship (banking and investments) and decision making. ",
                "activity_name": "Finance"
              },
              "hr": {
                "activity_description": "Drive impact and improve employee retention through strategic environmental personnel management. ",
                "activity_name": "Hr"
              },
              "long-term_planning": {
                "activity_description": "Ensure long-term impact through strategic business planning and executive-level governance. ",
                "activity_name": "Long Term Planning"
              },
              "transparency": {
                "activity_description": "Disclosure of environmental performance & stewardship. ",
                "activity_name": "Transparency"
              },
              "purchasing": {
                "activity_description": "Ensure environmental impact is prioritized through supplier choice & product selection.  ",
                "activity_name": "Purchasing"
              },
              "client_work": {
                "activity_description": "Introducing environmentally friendly choices into work products for clients ",
                "activity_name": "Client Work"
              },
              "additional_environmental_issues": {
                "activity_description": "Actions & goals on water, biodiversity, etc.",
                "activity_name": "Additional Environmental Issues"
              }
            },
            "subcategory_name": "Internal Alignment"
          },
          "community_impact": {
            "journey_score": 36,
            "idx":1,
            "activities": {
              "collective_action_and_advocacy": {
                "activity_description": "Non-financial contribution of time or influence to a group or cause that the company believes in",
                "activity_name": "Collective Action And Advocacy"
              },
              "philanthropy": {
                "activity_description": "Financial contribution to mission-aligned group or cause.",
                "activity_name": "Philanthropy"
              }
            },
            "subcategory_name": "Community Impact"
          }
        }
      }
    }
  };
}

export function getFootprintDataMock() {
  return getCategoriesDataMock().categories.company_decarbonization;
}

export function getFootprintDataMockTwoSubCats() {
  const data = getCategoriesDataMock().categories.company_decarbonization;
  if (data?.subcategories) {
    data.subcategories.product = undefined;
    data.subcategories.operations = undefined;
  }

  return data;
}

export function getFootprintDataMockThreeSubCats() {
  const data = getCategoriesDataMock().categories.company_decarbonization;
  if (data?.subcategories) {
    data.subcategories.product = undefined;
  }
  return data;
}

export function getFootprintDataMockFiveSubCats() {
  const data = getCategoriesDataMock().categories.company_decarbonization;
  if (data?.subcategories) {
    data.subcategories["private-jets"] = {
      ...data.subcategories[0],
      subcategory_name: 'Private jets',
    }
  }
  return data;
}

export function getFootprintEmptyDataMock() {
  return {
    "subcategories": {}
  };
}
