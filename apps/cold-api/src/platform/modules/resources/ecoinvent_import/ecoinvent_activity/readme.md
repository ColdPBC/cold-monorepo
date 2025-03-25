# Ecoinvent Activity Processor Service

This service (`EcoinventActivityProcessorService`) is a NestJS worker class designed to manage and automate the association of materials and products with environmental impact data derived from the Ecoinvent database.

## Key Functionalities:

### Initialization (`onModuleInit`)
- ⚙️ **Purpose**: Initializes the service by fetching Ecoinvent classifications from the database.
- 🔍 **Operation**: Queries the `ecoinvent_classifications` table (via Prisma) for entries under the `ISIC rev.4 ecoinvent` system. These classifications are foundational references for subsequent matching processes.

### Function: `findEcoinventClassifications`
- 🛠️ **Job Processed**: `match_material_and_ecoinvent_classifications`
- 🎯 **Purpose**: Matches material classifications with relevant Ecoinvent classifications using AI.
- 📌 **Operation**:
	- 📂 Retrieves material classifications from the `material_classification` table.
	- 🤖 Uses OpenAI's GPT-4o to intelligently select relevant Ecoinvent classifications.
	- 💾 Stores matched pairs in the `material_ecoinvent_classifications` table, creating persistent relationships between material classifications and corresponding environmental impact references.

### Function: `classifyMaterial`
- 📦 **Purpose**: Dynamically classifies a material based on its description or name.
- 📌 **Operation**:
	- 📋 Queries existing material classifications from the `material_classification` table.
	- 🧠 Utilizes OpenAI's GPT-4o to select the most appropriate classification.
	- 📝 Updates the `materials` table with the newly assigned classification, ensuring accurate and standardized categorization of materials for further environmental impact analysis.

### Function: `classifyProduct`
- 📊 **Job Processed**: `classify_product`
- 🌍 **Purpose**: Calculates the carbon footprint of a product by associating product materials with relevant Ecoinvent activities.
- 📌 **Operation**:
	- 📚 Retrieves product materials and associated classifications from the `product_materials` and `materials` tables.
	- 🤖 Uses OpenAI to filter Ecoinvent activities specifically related to material lifecycle stages.
	- 🌱 Stores calculated emission factors (CO₂ equivalents) for each material-activity pair in the `emission_factors` table.
	- 🔗 Records associations between materials, emission factors, and Ecoinvent activities in the `material_emission_factors` table for accurate environmental impact tracking.
	- 🧮 Updates each material's total CO₂e in the `product_materials` table.
	- 📈 Aggregates and records total emissions for the product in the `products` table, ensuring accurate carbon footprint data.

### Function: `defaultProcessor`
- ⚠️ **Job Processed**: Any unhandled job (`*`)
- 🛑 **Purpose**: Provides a fallback mechanism for processing jobs that don't match predefined handlers.
- 📌 **Operation**:
	- 📝 Logs job reception and retrieves relevant Ecoinvent classifications and product materials.
	- 🕒 Currently serves as a placeholder for additional custom logic implementation.

## Database Integration:
- 📂 **ecoinvent_classifications**: Stores standardized classifications from Ecoinvent.
- 📁 **material_classification**: Contains predefined categories for classifying materials.
- 🗃️ **material_ecoinvent_classifications**: Associates materials with Ecoinvent classifications, enabling consistent environmental impact mapping.
- 📦 **materials**: Stores individual materials and their assigned classifications.
- 📑 **product_materials**: Maintains details of materials used in products, including quantities and calculated emissions.
- 📊 **emission_factors**: Holds emission values derived from Ecoinvent activities, critical for carbon footprint calculations.
- 🔗 **material_emission_factors**: Links materials with specific emission factors and activities, establishing traceable environmental impact data.
- 🛍️ **products**: Stores comprehensive product-level data, including total calculated CO₂ emissions.

## Error Handling & Logging:
- 🚨 Comprehensive logging and structured error handling for robust processing and simplified debugging.

## Dependencies:
- 🛠️ NestJS
- 🐂 Bull Queue (`@nestjs/bull`)
- 🗄️ Prisma ORM
- 🤖 OpenAI GPT-4o for AI-driven classification
- 🔧 Lodash for data manipulation

## Use Cases:
- 🌿 Automated environmental impact assessments.
- 📑 Sustainability reporting and compliance management.
- 🌍 Lifecycle analysis and carbon footprint quantification.

This processor significantly simplifies sustainability management tasks, enabling accurate, automated classification and environmental impact calculations.

