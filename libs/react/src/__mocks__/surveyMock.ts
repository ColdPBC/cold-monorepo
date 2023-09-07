
export function getSurveySectionMock () {
  return [
    {
      "title": "Product",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [
        {
          "idx": 0,
          "key": "product:0",
          "prompt": "Is your product made of metal?",
          "options": [],
          "tooltip": "Select yes or no",
          "component": "yes_no",
          "placeholder": "",
          "value": null
        },
        {
          "idx": 1,
          "key": "product:1",
          "prompt": "How much does your product cost, in dollars?",
          "options": [],
          "tooltip": "Enter the cost to your company to produce",
          "component": "currency",
          "placeholder": "45",
          "value": null
        },
        {
          "idx": 2,
          "key": "product:2",
          "prompt": "What percent of your product is leather?",
          "options": [],
          "tooltip": "",
          "component": "percent_slider",
          "placeholder": "",
          "value": null
        },
        {
          "idx": 3,
          "key": "product:3",
          "prompt": "How many factories make your product?",
          "options": [],
          "tooltip": "Choose the number across all countries",
          "component": "number",
          "placeholder": "2",
          "value": null
        }
      ],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Facilities",
      "prompt": "Do you own or lease any facilities like offices or warehouses?",
      "component": "yes_no",
      "follow_up": [
        {
          "idx": 0,
          "key": "facilities:0",
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
      ],
      "image_url": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 2,
      "category_key": "facilities",
      "category_description": "Questions about your the facilities you own or lease",
      "value": null
    },
    {
      "title": "General",
      "prompt": "",
      "component": null,
      "follow_up": [
        {
          "idx": 0,
          "key": "general:0",
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
        {
          "idx": 1,
          "key": "general:1",
          "prompt": "What is your company's name?",
          "options": [],
          "tooltip": "Enter your company name",
          "component": "text",
          "placeholder": "Yourco",
          "value": null
        },
        {
          "idx": 2,
          "key": "general:2",
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
      ],
      "image_url": "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      "category_idx": 0,
      "category_key": "general",
      "category_description": "General questions about your business",
      "value": null
    }
  ]
}

export function getSurveySectionScrollableMock () {
  return [
    {
      "title": "Product1",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product1",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product2",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product2",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product3",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product3",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product4",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product4",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product5",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product5",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product6",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product6",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product7",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product7",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product8",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product8",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product9",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product9",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product10",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product10",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product11",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product11",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product12",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product12",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product13",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product13",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product14",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product14",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product15",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product15",
      "category_description": "Questions about how your products are produced",
      "value": null
    },
    {
      "title": "Product16",
      "prompt": "Does your company make a physical product?",
      "component": "yes_no",
      "follow_up": [],
      "image_url": "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "category_idx": 1,
      "category_key": "product16",
      "category_description": "Questions about how your products are produced",
      "value": null
    },

  ]
}
