export const getSurveyDataByName = (name: string) => {
  switch (name) {
    case 'qaalib_test':
      return getTestingSurveyData();
  }
}

export const getTestingSurveyData:any = () => {
  return {
    "id": "622fe082-a490-49a3-97f1-9cb511b53581",
    "name": "qaalib_test",
    "type": "survey",
    "description": "A survey that exercises lots of sections and components for Qaalib to test everything with the survey",
    "created_at": "2023-08-14T16:14:14.128Z",
    "updated_at": "2023-08-14T16:14:14.128Z",
    "definition": {
      "title": "Qaalib Test",
      "image_url": "https://images.unsplash.com/photo-1603437873662-dc1f44901825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80",
      "intro_markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n" +
        "\n" +
        "- Bullet 1\n" +
        "- Bullet 2\n" +
        "- Bullet 3",
      "sections": {
        "product": {
          "title": "Product",
          "prompt": "Does your company make a physical product?",
          "component": "yes_no",
          "follow_up": {
            "product:0": {
              "idx": 0,
              "prompt": "Is your product made of metal?",
              "options": [],
              "tooltip": "Select yes or no",
              "component": "yes_no",
              "placeholder": "",
              "value": null
            },
            "product:1": {
              "idx": 1,
              "prompt": "How much does your product cost, in dollars?",
              "options": [],
              "tooltip": "Enter the cost to your company to produce",
              "component": "currency",
              "placeholder": "45",
              "value": null
            },
            "product:2": {
              "idx": 2,
              "prompt": "What percent of your product is leather?",
              "options": [],
              "tooltip": "",
              "component": "percent_slider",
              "placeholder": "",
              "value": null
            },
            "product:3": {
              "idx": 3,
              "prompt": "How many factories make your product?",
              "options": [],
              "tooltip": "Choose the number across all countries",
              "component": "number",
              "placeholder": "2",
              "value": null
            }
          },
          "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "category_idx": 1,
          "category_description": "Questions about how your products are produced",
          "value": null
        },
        "facilities": {
          "title": "Facilities",
          "prompt": "Do you own or lease any facilities like offices or warehouses?",
          "component": "yes_no",
          "follow_up": {
            "facilities:0": {
              "idx": 0,
              "prompt": "What colors are your office carpets?",
              "options": [
                "Gray",
                "Black",
                "Orange",
                "Blue",
                "Purple"
              ],
              "tooltip": "If carpets are multiple colors choose all colors that apply",
              "component": "multi-select",
              "placeholder": "",
              "value": null
            }
          },
          "image_url": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          "category_idx": 2,
          "category_description": "Questions about your the facilities you own or lease",
          "value": null
        },
        "general": {
          "title": "General",
          "prompt": "",
          "component": null,
          "follow_up": {
            "general:0": {
              "idx": 0,
              "prompt": "Which regions do you sell your product into?",
              "options": [
                "North America",
                "South America",
                "Europe",
                "Asia",
                "Australia",
                "Africa"
              ],
              "tooltip": "",
              "component": "multi-select",
              "placeholder": "",
              "value": null
            },
            "general:1": {
              "idx": 1,
              "prompt": "What is your company's name?",
              "options": [],
              "tooltip": "Enter your company name",
              "component": "text",
              "placeholder": "Yourco",
              "value": null
            },
            "general:2": {
              "idx": 2,
              "prompt": "What is your favorite color of the primary colors?",
              "options": [
                "Red",
                "Blue",
                "Yellow"
              ],
              "tooltip": "Pick the one you like the most",
              "component": "select",
              "placeholder": "",
              "value": null
            }
          },
          "image_url": "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
          "category_idx": 0,
          "category_description": "General questions about your business",
          "value": null
        }
      }
    }
  }
}

export function getSurveySectionMock () {
  return getTestingSurveyData().definition.sections;
}

export function getSurveySectionScrollableMock () {
  const surveyData = getTestingSurveyData().definition.sections;

  const SECTIONS_TO_ADD = 16;
  for (let i = 1; i <= SECTIONS_TO_ADD; i++) {
    surveyData["newSection"+i] = {
        "title": "Product"+i,
        "prompt": "Does your company make a physical product?",
        "component": "yes_no",
        "follow_up": {},
        "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "category_idx": i,
        "category_description": "Questions about how your products are produced",
        "value": null
      }
  }
  return surveyData;
}
