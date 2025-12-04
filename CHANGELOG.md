# [1.646.0]() (2025-05-21)


### Features

* Add a flex-none class to button in sustainability card ([b10d9bb]())
* Add a flex-none class to button in sustainability card ([8f7c28f]())
* Add navigation functionality to SustainabilityAttributeCard ([0fb48c9]())
* Remove unused imports from sustainability card components ([ea71e8a]())

## [1.645.4]() (2025-05-20)


### Bug Fixes

* update instanceStorage from 250 and 180 to 300 in flightcontrol.json ([e3cc4b4]())

## [1.645.3]() (2025-05-20)


### Bug Fixes

* increase instanceStorage from 200 to 250 in flightcontrol.json ([124484b]())

## [1.645.2]() (2025-05-20)


### Bug Fixes

* improve createIssue method signature and update label handling ([4b1c8dd]())

## [1.645.1]() (2025-05-20)


### Bug Fixes

* add organization and material emission factor relationships ([33ead36]())

# [1.645.0]() (2025-05-19)


### Features

* Add EPR Progress feature with UI components and GraphQL support ([a7e9dc9]())
* Add EPR route and simplify RegulatoryComplianceRoutes logic ([a2bd808]())
* Add new EPR menu item to seed data ([faaca3e]())
* Add new routing logic for 'showUploadsPage' flag ([2ebea6e]())
* Add or update data-chromatic attribute in key div elements ([1c500cc]())
* Adjust spacing in EPR Progress layout for better alignment ([20355e4]())
* Enhance scrollbar styling and add vertical scroll support. ([381064e]())
* Refactor data structure to nest `pro_name` under `metadata` ([f3d31f5]())
* Refactor EprSubmissionGraphQL to use camelCase naming ([4739ed6]())
* Refine layout and improve text overflow handling. ([97466b9]())
* Rename 'submissionDate' to 'submittedAt' in GraphQL query ([5247af0]())
* Rename GraphQL query to match naming conventions ([0cbd05d]())
* Rename variable from `epsSubmissions` to `eprSubmissions`. ([a2fbda7]())
* Update 'pro_name' type to allow undefined in EPR interface ([e1c2827]())
* Update placeholder text for undetermined due date ([e354cce]())

# [1.644.0]() (2025-05-14)


### Features

* Add metadata property to EprSubmission entity and schema ([13b5a86]())

# [1.643.0]() (2025-05-14)


### Features

* Add EPR Submissions module with controller, service, and tests ([4f2546c]())
* Add role-based access control to EPR submission creation ([149b45f]())
* Add validation to EPR submission creation ([2e67ee7]())
* Remove EPR Submissions module from the codebase ([a4827b5]())
* Update role restriction for EPR submissions creation ([f06b7c6]())

# [1.642.0]() (2025-05-12)


### Features

* Refactor document upload components to simplify logic. ([5b73451]())
* Set consistent button styling on documents and uploads pages ([02ab300]())
* Set default uploadType and reset file input after upload ([c0e19bd]())
* Update label text for DocumentUploadButton to "Upload" ([26e898d]())

# [1.641.0]() (2025-05-09)


### Features

* Add feature flag support for 'showUploadsPage' ([db9433b]())
* Add LaunchDarkly feature flags for new UI sections ([2efbd57]())
* Remove 'Documents' entry from sidebarMock and seed data ([f5aa22d]())
* Remove feature flag checks for new document upload UX ([72889a9]())
* Remove unused DocumentTypes import from documentDetailsSidebar ([b3d82c0]())

## [1.640.1]() (2025-05-07)


### Bug Fixes

* **suppliers:** update unique constraint name and comment out database queries ([8170466]())

# [1.640.0]() (2025-05-07)


### Features

* **epr:** add epr_submissions table and related indices to schema ([868687b]())

## [1.639.5]() (2025-04-28)


### Bug Fixes

* **linear:** update file status handling based on issue state in webhook processing ([015caec]())

## [1.639.4]() (2025-04-28)


### Bug Fixes

* **job.consumer:** set attempts to 1 for file upload job processing ([b20f799]())

## [1.639.3]() (2025-04-23)


### Bug Fixes

* **flightcontrol:** remove N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS and clean up unused configurations ([f44cb93]())

## [1.639.2]() (2025-04-23)


### Bug Fixes

* **flightcontrol:** remove N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS from configuration ([fbbc33e]())

## [1.639.1]() (2025-04-23)


### Bug Fixes

* **n8n:** update Dockerfile and configuration to enforce settings file permissions ([9921714]())

# [1.639.0]() (2025-04-22)


### Features

* **n8n:** add RDS CA certificate for secure database connections ([6aeb664]())

# [1.638.0]() (2025-04-22)


### Features

* **flightcontrol:** update n8n port to 5678 and add environment variables for configuration ([bf1891e]())

## [1.637.2]() (2025-04-22)


### Bug Fixes

* **linear, pinecone:** fix issue with creating linear ticket ([d4bcee4]())

## [1.637.1]() (2025-04-21)


### Bug Fixes

* **pinecone:** enhance persistEmbeddings to handle errors and update processing status ([e8930a3]())

# [1.637.0]() (2025-04-18)


### Features

* **flightcontrol:** update N8N_PORT to 5678 for service configuration ([08cef1c]())

# [1.636.0]() (2025-04-18)


### Features

* **flightcontrol:** change n8n port from 80 to 5678 for service configuration ([2afc86a]())

# [1.635.0]() (2025-04-18)


### Features

* **flightcontrol:** update n8n port to 80 for consistent service configuration ([a6c30fa]())

# [1.634.0]() (2025-04-18)


### Features

* **n8n:** update environment variables and enhance entrypoint script for PostgreSQL support ([e0021ea]())

# [1.633.0]() (2025-04-18)


### Features

* **n8n:** enhance entrypoint script to parse DATABASE_URL and set environment variables ([330e173]())

## [1.632.2]() (2025-04-18)


### Bug Fixes

* **flightcontrol:** update health check path to /healthz for improved service monitoring ([14b38df]())

## [1.632.1]() (2025-04-18)


### Bug Fixes

* **database:** update vector_records schema to allow nullable organization_file_id and enhance product upsert logic ([a492a4b]())

# [1.632.0]() (2025-04-17)


### Features

* **n8n:** add entrypoint script and task runners configuration for enhanced execution control ([b66da76]())

# [1.631.0]() (2025-04-17)


### Bug Fixes

* **controller:** refactor ComponentDefinitionsController for improved readability and maintainability ([55e7338]())
* **dependencies:** update Prisma and related packages to version 6.6.0 for improved compatibility and performance ([fb8d28b]())
* **docker:** update Traefik configuration and add n8n service with enhanced security settings ([45338c9]())
* **prisma:** integrate optimization extension and enhance logging for query events ([dd30430]())
* **s3:** enhance S3 client initialization with conditional credentials handling ([3605c72]())


### Features

* **n8n:** add Dockerfile and update docker-compose for n8n service with environment configurations ([fddbf58]())

## [1.630.1]() (2025-04-17)


### Bug Fixes

* **backbone:** update product retrieval logic to use findFirst and improve error handling ([a4ddfe5]())
* **database:** add unique constraints and indexes to products table for improved data integrity ([41c288f]())
* **database:** make organization_file_id column required in vector_records table ([aa3b143]())

# [1.630.0]() (2025-04-16)


### Features

* Refactor and expand operator handling in dataGridUtils ([3f3feed]())
* Refactor filter logic to use shared utility function ([410b237]())
* Refactor GraphQL filter creation for robustness and clarity ([e67ccef]())
* Refactor Product DataGrid filtering logic ([d3d30c6]())

# [1.629.0]() (2025-04-16)


### Features

* Enhance search filter in productsDataGrid component ([56f7747]())
* Update filter to use case-insensitive search for brandProductId ([d2e3a16]())
* Update quick filter placeholder and add custom width class ([12cd138]())

## [1.628.1]() (2025-04-16)


### Bug Fixes

* **package:** downgrade @exogee/graphweaver dependencies to version 2.12.2 to fix clientGeneratedId bug in the latest Graphweaver ([8911069]())

# [1.628.0]() (2025-04-15)


### Features

* Add saveColumnKey support to DocumentsTable component ([dbb2776]())
* Add support for saving column visibility to storage. ([1cd7759]())
* Add unique keys to SuppliersDataGrid components ([0d1e3c7]())
* Handle null values in column visibility restoration ([c8bf23b]())
* Remove unused twMerge import from documentsTable ([ec334aa]())

## [1.627.5]() (2025-04-15)


### Bug Fixes

* **backbone:** handle optional chaining for error response status ([04f8847]())

## [1.627.4]() (2025-04-15)


### Bug Fixes

* **package:** update mikro-orm dependencies to version 6.4.13 ([517ade6]())

## [1.627.3]() (2025-04-15)


### Bug Fixes

* **package:** update mikro-orm dependencies to version 6.4.13 ([7aa6804]())

## [1.627.2]() (2025-04-15)


### Bug Fixes

* **backbone:** improve number parsing and season code formatting ([070b7dd]())

## [1.627.1]() (2025-04-14)


### Bug Fixes

* add logger initialization for ColdProfile ([211a6a0]())

# [1.627.0]() (2025-04-14)


### Features

* Clean up unused imports and commented-out code ([9ed3959]())
* Fix typo in commented-out fileState reference ([4859b16]())
* Refactor documents page to use DocumentDetailsSidebarContainer ([b430d43]())
* Refactor product documents tab to include sidebar and state ([4a89a31]())
* Refactor product loading logic and enhance logging. ([b3e2167]())
* Remove unused `fileState` and update sidebar prop usage. ([eb6d25b]())

# [1.626.0]() (2025-04-11)


### Features

* add search to (Assurance) Documents page ([1a8d524]())

# [1.625.0]() (2025-04-11)


### Bug Fixes

* stop multiple sidebar re-rendering ([9a2c6ca]())
* stop multiple sidebar re-rendering ([#857](ssues/857)) ([a57b3ed]())


### Features

* Fix dependency order in sidebar useEffect dependency array ([22af827]())

# [1.624.0]() (2025-04-10)


### Features

* Add StatusChecklist to regulatory compliance details page ([63a6583]())
* Add StatusChecklist to regulatory compliance details page ([1e94e4f]())
* Refactor compliance card with reusable StatusChecklist ([9639d56]())
* Set padding for StatusChecklist in compliance detail card ([c47c10b]())

# [1.623.0]() (2025-04-07)


### Features

* Add data grid to Regulatory Compliance page ([3bc70ec]())
* Add YesNo enum for penalties column in regulatory table ([1986a82]())
* Enhance layout responsiveness for regulatory compliance pages ([1e556ec]())
* Refactor rows generation with useMemo for optimization ([e28d6c4]())
* Refactor sidebar filtering logic with useMemo. ([7f443c1]())
* Refactor sidebar item filtering for improved readability. ([5cd04e6]())
* Refactor variable naming in regulatoryCompliance.tsx ([5961855]())

# [1.622.0]() (2025-04-07)


### Features

* simply regulatory_compliance route logic ([#851](ssues/851)) ([2738a32]())
* simply route logic ([8c97327]())

# [1.621.0]() (2025-04-04)


### Features

* basic Regulatory Compliance details page ([e174544]())
* basic Regulatory Compliance details page ([#849](ssues/849)) ([c899b49]())

# [1.620.0]() (2025-04-04)


### Features

* new use regulations hook with some sample data ([5527a7a]())
* new use regulations hook with some sample data ([#848](ssues/848)) ([e9f290a]())

# [1.619.0]() (2025-04-04)


### Features

* Add "Regulatory Compliance" section to sidebar mock and seeds ([e534127]())
* Add breadcrumb for Regulatory Compliance Detail page ([e664ee0]())
* Add ColdRegulatoryComplianceIcon component ([bf9cace]())
* Add feature flag logic for regulatory compliance visibility ([e932aae]())
* Add Regulatory Compliance routes and pages ([160a135]())
* Rename flag to `showRegulationsPage` for consistency. ([11ce857]())

# [1.618.0]() (2025-03-27)


### Features

* **prisma:** add material_classification_activities model ([9d5e810]())
* **processor:** improve ecoinvent activity processing and classification ([3e3fdbf]())

# [1.617.0]() (2025-03-27)


### Features

* enhance ecoinvent activity processing and weight formatting ([757fed2]())
* **prisma:** update schema and migrations for material and emission factors ([4b0ce1b]())

## [1.616.2]() (2025-03-26)


### Bug Fixes

* **log:** change error log to warning for weight calculation failures ([554d79d]())

## [1.616.1]() (2025-03-26)


### Bug Fixes

* handle missing ecoinvent_activity_impacts in material emissions calculation ([0ae7af4]())

# [1.616.0]() (2025-03-26)


### Features

* **prisma:** add "reasoning" column to classifications tables ([34ce0ba]())
* **prisma:** add optional reasoning field to relevant models ([dd9c914]())

# [1.615.0]() (2025-03-26)


### Features

* **ecoinvent:** enhance activity matching and classification process ([73c500c]())

# [1.614.0]() (2025-03-25)


### Features

* **ecoinvent:** add calculated_weight_response to metadata in processor service ([96c8053]())

# [1.613.0]() (2025-03-25)


### Features

* add service for weight calculation in ecoinvent module ([17f5968]())
* **cold-api:** add weight calculation types for ecoinvent activities ([ddb025b]())

# [1.612.0]() (2025-03-25)


### Features

* Adjust emissions display precision to 3 decimal places ([5bcf3a9]())
* Fix weight value formatting in emissions factor view ([9d8d95a]())
* Increase weight precision to three decimal places ([4190814]())
* Remove unused classification tip display block ([ead7238]())

## [1.611.1]() (2025-03-25)


### Bug Fixes

* **app-module:** correct import path for EcoinventActivityModule ([4977f75]())

# [1.611.0]() (2025-03-24)


### Features

* update total CO2e calculation to prioritize 'climate change' indicator and sum impacts ([9c4c730]())

# [1.610.0]() (2025-03-24)


### Features

* add MaterialEcoinventClassification import to index.ts ([a68f23b]())

# [1.609.0]() (2025-03-24)


### Features

* add bpc query parameter to update method in ecoinvent_import.controller.ts ([7758c22]())
* add indicator_name field and update unique constraint in ecoinvent_activity_impacts table ([039d9f2]())
* add unique constraint and new column to ecoinvent_activity_impacts table ([8a6d0d1]())
* enhance EcoSpold file import to support bpc parameter and improve caching logic ([76d49b4]())
* improve error handling and logging in CSV import process ([2d29ef1]())
* update impact value calculation in classifyProduct method to sum all impact values ([c34957f]())

# [1.608.0]() (2025-03-24)


### Features

* add ecoinvent_activity_classifications column to material_classification table ([492d920]())
* add material_ecoinvent_classifications model and update related tables ([d23f1d3]())
* create material_ecoinvent_classifications table with foreign keys and unique constraints ([c231d1f]())
* enhance EcoinventActivityProcessorService to include description in classifications and automatic material classification matching logic, if missing ([656e4b9]())
* update material_ecoinvent_classifications table structure with new foreign key and unique constraints ([b10022e]())

# [1.607.0]() (2025-03-23)


### Features

* Improve emission factor formatting and description handling ([2da063f]())
* Refine number formatting and improve string handling ([2ed408c]())

# [1.606.0]() (2025-03-21)


### Features

* add total_co2e column to product and product_materials tables for enhanced carbon footprint tracking ([8b8bbb9]())
* enhance ecoinvent activity processing with caching and total CO2e calculation for product materials ([c3e423b]())
* implement ProductCarbonFootprintCalculator for calculating and breaking down carbon footprint of activities ([42636f0]())

# [1.605.0]() (2025-03-21)


### Features

* enhance ecoinvent activity processing with improved material classification and error handling ([4ee56bd]())

# [1.604.0]() (2025-03-21)


### Features

* enhance ecoinvent activity processing with new job queue and improved error handling ([1e4b914]())

# [1.603.0]() (2025-03-19)


### Features

* update OpenAI model to o3-mini and enhance logging for response handling ([2a690a1]())

# [1.602.0]() (2025-03-19)


### Features

* Handle empty emissions data arrays in error checks ([f051acb]())
* Refactor layout structure in emissions footprint component. ([4d2d295]())
* Refine logging for missing emissions data ([4c9328d]())

# [1.601.0]() (2025-03-19)


### Features

* improve OpenAI response handling with conditional schema processing and enhanced logging ([5038c0e]())

## [1.600.1]() (2025-03-19)


### Bug Fixes

* Fix metadata handling in BaseSidecar entity updates ([4dd3df6]())

# [1.600.0]() (2025-03-18)


### Features

* add database indices for improved query performance in ecoinvent schema ([1fc3b65]())

# [1.599.0]() (2025-03-17)


### Features

* enhance EcoSpold file validation and improve job handling in ecoinvent import ([9d8fcb4]())

# [1.598.0]() (2025-03-17)


### Features

* improve error handling and logging for EcoSpold file processing ([0635f01]())

# [1.597.0]() (2025-03-17)


### Features

* enhance EcoSpold file processing with improved error handling and logging ([f7a9a0f]())

# [1.596.0]() (2025-03-17)


### Bug Fixes

* add S3 upload python scripts for ecoinvent datasets and LCIA data ([90daa3e]())


### Features

* refactor impact category handling in ecoinvent upsert logic ([3a0335e]())

# [1.595.0]() (2025-03-17)


### Features

* add unique constraints and indexes for ecoinvent activities and impact categories ([515eb6f]())
* update ecoinvent impact category upsert logic and improve error handling ([047799e]())

# [1.594.0]() (2025-03-14)


### Features

* enhance ecoinvent import process with classification and impact handling ([4dfbc92]())
* update database schema for ecoinvent activities and impacts, adding new classifications and constraints ([a637db2]())

# [1.593.0]() (2025-03-11)


### Features

* Enhance export functionality with batching and progress tracking ([bb5919a]())

# [1.592.0]() (2025-03-11)


### Features

* Enable conditional rendering of the remove button in list items ([1c5c529]())
* Enhance ListItem component with unique item management and improved input handling ([adba01c]())
* Refactor signup form story for clarity and efficiency ([d3ee9bb]())
* Refactor story components to use dedicated render functions ([f28895d]())
* Update listitem story tests ([149f5d3]())
* Update Storybook docs configuration and story sorting ([fdf7150]())
* Update Storybook from v7 to v8 ([c8df453]())

# [1.591.0]() (2025-03-11)


### Features

* Add error handling and logging to EntityExport component ([cdbd0c5]())
* Add export functionality for products and materials grids ([64b3599]())
* Enable feature flag for DataGrid export button ([05f4664]())
* Refactor data grids for enhanced server-side functionalities ([401ddfe]())
* Refactor product data grid to include carbon footprint logic ([4f2af91]())

# [1.590.0]() (2025-03-11)


### Features

* add support for importing all locations in ecoinvent update endpoint ([3c8b0ed]())

## [1.589.2]() (2025-03-11)


### Bug Fixes

* update @prisma/client version from 5.6.0 to 6.4.1 in package.json and yarn.lock ([244a367]())

## [1.589.1]() (2025-03-10)


### Bug Fixes

* re-add Zod generator configuration for Prisma schema validation ([3c2f4de]())

# [1.589.0]() (2025-03-10)


### Features

* enhance ecoinvent import functionality with update endpoint and additional data fields ([2ea2e59]())

# [1.588.0]() (2025-03-10)


### Features

* add ecoinvent import and data models with migrations ([a889a7e]())
* add ecoinvent import module with CSV parsing and EcoSpold XML validation ([162f66c]())
* add ecoinvent-datum and ecoinvent-import to schema and entities ([e5d5f59]())

# [1.587.0]() (2025-03-07)


### Features

* Add CSV export options and reusable checkbox column config ([047cab6]())
* Remove print options to GridToolbarExport in CustomDataGridToolbar by default ([cb79671]())

## [1.586.3]() (2025-03-06)


### Bug Fixes

* handle weight assignment to ensure it is a number or null in BackboneService ([90cab93]())

## [1.586.2]() (2025-03-06)


### Bug Fixes

* ensure weight is stored as a number in BackboneService ([50cb9f4]())

## [1.586.1]() (2025-03-06)


### Bug Fixes

* improve error logging for product upsert failure in BackboneService ([82c5e87]())

# [1.586.0]() (2025-03-06)


### Features

* add pagination support to triggerIntegration method in organization integrations ([35c873b]())
* add unique constraints and new columns for materials and tag assignments ([d46ed35]())
* enhance BackboneService sync logic, add conversion factor handling, and improve product/material syncing ([7469407]())

# [1.585.0]() (2025-03-06)


### Features

* Add GraphQL query for component definitions and implement error handling in sidebar ([38c2466]())
* Handle errors at all levels in getGraphqlError utility ([44ee017]())
* Refactor sidebar item matching logic with recursion. ([c6dc2f8]())

# [1.584.0]() (2025-03-03)


### Features

* Add custom scrollbar styling for chatbot UI ([d327583]())
* Adjust padding logic and refine scrolling behavior ([6ce4de0]())
* Align pagination toolbar to the left and remove default right spacing ([e94dd75]())

## [1.583.1]() (2025-03-03)


### Bug Fixes

* handle optional classification type and improve error handling for classify response ([2616935]())

# [1.583.0]() (2025-03-03)


### Features

* Map document types to main categories and update UI labels. ([88d48ba]())

## [1.582.1]() (2025-02-28)


### Bug Fixes

* comment out platform event for AI_PROCESSING status in file upload handling ([8548047]())

# [1.582.0]() (2025-02-28)


### Bug Fixes

* handle inconsistent payload key for file in async message processing ([5942fc3]())
* handle optional compliance ID in job cache retrieval ([9e8b6d0]())
* improve error handling for encrypted PDFs in extraction service ([a96424c]())


### Features

* dynamically load pdfjs-dist for improved PDF text extraction ([44aa893]())
* enhance job failure handling and add binary content detection in classification process ([bd11c57]())

# [1.581.0]() (2025-02-27)


### Features

* Add rounded-none style to input component ([8a8336a]())
* Extract input handling logic into a separate function for clarity ([2a2b8ee]())
* Group references by file name and concatenate text in response ([340cfd8]())
* Refactor file input handling to allow re-selection. ([4b30473]())
* Refactor file upload logic into custom hook. ([65557c5]())

## [1.580.1]() (2025-02-27)


### Bug Fixes

* enhance failure logging to include job failure reason ([fc92e48]())

# [1.580.0]() (2025-02-27)


### Bug Fixes

* comment out PDF text extraction for debugging purposes ([afebb17]())


### Features

* add 'vectorize-file' event to MqttEventSchema ([eb93627]())
* enhance classification processor with progress tracking and error handling ([aea9021]())
* implement NotImplementedException for syncOrgFiles method ([09fd470]())
* update PDF extraction service to log image conversion progress and change type definition ([42f0163]())

# [1.579.0]() (2025-02-26)


### Features

* Add bulk edit functionality for supplied products ([1b3e416]())
* Refactor bulk edit modal to support multiple entity levels ([8471aac]())
* Remove unused pagination input and standardize export syntax ([0291190]())
* Simplify attribute selection logic in modal ([f08ee12]())

# [1.578.0]() (2025-02-26)


### Features

* Add AI response handling with OpenAI integration ([f40fd9c]())
* Add aiLoading prop to SustainabiliBuddyQueue component ([8626454]())
* Add error boundaries to SustainabiliBuddy components ([852306f]())
* Add gradient animations and improve loading indicators ([16c04b1]())
* Fix incorrect delay class names in gradient animation ([44351e7]())
* Refactor AI response handling to include default answer. ([06ccab3]())
* Refactor justification and references rendering logic. ([d46ee96]())
* Update animations and add utility classes for delays ([e3085f0]())

# [1.577.0]() (2025-02-26)


### Features

* add support for extracting and handling PDF text, update dependencies ([467ed80]())

# [1.576.0]() (2025-02-25)


### Features

* Add upload modal with file selection and upload functionality ([038b99f]())
* Refactor uploadingScreen to simplify file handling logic. ([ac42b93]())
* Remove toast messages from document upload component ([60ad934]())
* Update text label and fix error color reference ([8df5dfb]())

# [1.575.0]() (2025-02-25)


### Features

* Add SustainabiliBuddy conversational UI components ([d8960a7]())
* Set default margins for text elements in Tailwind config ([b17e14b]())

## [1.574.4]() (2025-02-24)


### Bug Fixes

* remove unnecessary condition in file processing status update ([39a41e8]())

## [1.574.3]() (2025-02-24)


### Bug Fixes

* improve MQTT connection log message to include client ID ([31deadc]())

## [1.574.2]() (2025-02-24)


### Bug Fixes

* handle excessive MQTT connection attempts with error logging ([56af389]())

## [1.574.1]() (2025-02-24)


### Bug Fixes

* enhance mqtt client handling and logging defaults ([95aaab4]())


### Reverts

* mistakenly added WeightUnit to product_materials ([d9d7bb9]())

# [1.574.0]() (2025-02-22)


### Features

* Add SustainabiliBuddyContainer component and integrate it ([b0eada6]())
* Add SustainabiliBuddyInput component and input enhancements ([83c6120]())
* Adjust layout for responsive design in SustainabiliBuddyContainer ([d1c0005]())
* Refactor prompt handling in SustainabiliBuddy components ([ca934a4]())
* Refactor queue state structure and adjust button styling ([7d24c7b]())
* Reset input field after handling Enter key press ([6a4ec4d]())
* Update gradient colors for SustainabiliBuddy components ([015f69b]())
* Update gradient colors in SustainabiliBuddy components ([4c5e19e]()), closes [#F7FF58](ssues/F7FF58)
* Update gradient colors in SustainabiliBuddyContainer ([6693a42]())

# [1.573.0]() (2025-02-21)


### Features

* Add document deletion functionality to UploadsPage ([3b6d28b]())
* Add file download functionality to uploads page ([3f0ec6c]())
* Fix delete action parameter in uploads page grid ([64916e3]())
* Refactor delete document modal into reusable component ([cb4d76a]())

# [1.572.0]() (2025-02-20)


### Features

* Add feature flag for SustainabiliBuddy component ([b01fce1]())
* Add SustainabiliBuddy component to DashboardLayout ([d776ffc]())
* Fix JSX attribute casing and add Transition for animations ([703ccde]())
* Refactor SustainabiliBuddyButton to remove Transition component ([babfc7a]())

## [1.571.1]() (2025-02-19)


### Bug Fixes

* correctly merge and update metadata in beforeUpdateHook ([6c959a1]())

# [1.571.0]() (2025-02-19)


### Features

* Fix conditional logic for product carbon footprint columns ([6d662a3]())
* Update feature flags for carbon footprint components ([42dbed5]())

# [1.570.0]() (2025-02-19)


### Features

* Add EmissionFactor interface and refactor EmissionsFactorBubble ([9c3db50]())
* Add support for toggling emission factor calculation logic ([89dc13b]())
* Add toggle detail panel with ChevronDownIcon in data grid ([935cd40]())
* Enhance DataGrid styling for pinned columns ([2ef59a1]())
* Fix emissions factor access in productBOMTab component ([f083282]())
* Fix typo in property name for emission factor filter ([296da1c]())
* Refactor emission factor handling to use updated interface ([e0a87e2]())
* Refactor emission factor logic to use aggregated factors. ([afa5c37]())
* Refactor emission factors display with improved formatting ([0af4a42]())
* Refactor emissions calculation type for clarity. ([100788c]())
* Refactor emissions data structure and remove unused components ([96ac858]())
* Refactor emissions factor rendering and data updates. ([18ff41f]())
* Refactor emissionsFactor handling across components. ([9fadcd5]())
* Refactor product materials rows generation with useMemo ([6d3f421]())
* Refactor: Rename 'emissionsFactor' to 'emissionFactor' ([b57d396]())
* Rename 'materialEmissionFactor' to 'materialEmissionFactors'. ([73eea7f]())
* Round weight values to 2 decimal places in components. ([aa5dbfa]())
* Simplify emissions factor assignment in product tab. ([7c844ac]())
* Simplify emissions factor usage in productBOMTab. ([c726206]())
* Simplify tip text for emissions factor correction. ([9fa8083]())
* Simplify weight display logic in component ([cbeb6f7]())
* Update background color for pinned data grid cells ([5873973]())

# [1.569.0]() (2025-02-19)


### Features

* add uuid dependency to cold-graphql package ([33f8b52]())

## [1.568.3]() (2025-02-19)


### Bug Fixes

* made metadata merge logic generic and moved it to base.sidecar so that all updates to metadata will behave the same ([6a02d25]())

## [1.568.2]() (2025-02-19)


### Bug Fixes

* clean up redundant logic across entity hooks ([f28866f]())

## [1.568.1]() (2025-02-19)


### Bug Fixes

* add material emissions and tagging functionalities ([6dad4cd]())
* fixed MQTT connection/publishing ([0da6e62]())

# [1.568.0]() (2025-02-19)


### Features

* Add `self-start` class to upload modal button ([419a24e]())
* Add drag-and-drop functionality with visual feedback ([d4501d6]())
* Remove unnecessary timeout property from toast message ([84a6ce4]())
* Update drag-and-drop styling in UploadModal ([36baeee]())

# [1.567.0]() (2025-02-18)


### Features

* update all hooks to mutate createdAt/updatedAt and call baseSidecar ([d375a60]())

# [1.566.0]() (2025-02-18)


### Bug Fixes

* add `value` field to `emission_factors` model and schema ([79faa1c]())


### Features

* add emission factor model and relationships ([e40b7ad]())
* add material emission factors and tag assignments ([0dc0c72]())
* add MaterialEmissionFactor entity to schema and PostgreSQL index ([7d83048]())
* add support for EmissionFactor entity ([89a7a4b]())

# [1.565.0]() (2025-02-18)


### Features

* Add support for effective start and end dates in files ([3d334b2]())
* Fix date comparison logic in document details sidebar. ([4ce99e7]())
* Fix metadata condition logic in document sidebar ([7cf3b60]())
* Only send metadata when dates or certificate number is changed to reduce payload size. ([e732b3c]())
* Optimize metadata sending in document details sidebar. ([a3bc170]())
* Refactor metadata update logic in document sidebar. ([d2e639e]())
* Refine metadata update logic in document sidebar. ([c5a4763]())
* Remove unnecessary spread operator from metadata update. ([ef29b89]())
* Update handling of effective dates in document sidebar ([74aa507]())

# [1.564.0]() (2025-02-18)


### Bug Fixes

* relocate MQTT publishToUI to end of function ([1c4de05]())


### Features

* add MQTT UI update on file extraction completion ([ff9350f]())

# [1.563.0]() (2025-02-18)


### Features

* Add spinner to AIProcessingDocumentsBanner ([e5be6a7]())

## [1.562.2]() (2025-02-18)


### Bug Fixes

* handle metadata parsing properly in organization-file hook ([26969dc]())

## [1.562.1]() (2025-02-18)


### Bug Fixes

* add metadata merge in beforeUpdateHook ([a6986a8]())

# [1.562.0]() (2025-02-14)


### Features

* Improve UploadModal customization and replace DocumentUploadButton ([ddb6cb9]())

# [1.561.0]() (2025-02-14)


### Features

* Add processingStatus field and integrate with file handling ([ecf8353]())
* Refactor `mqttMappings` and add URL mapping support ([d57d0cc]())

# [1.560.0]() (2025-02-14)


### Bug Fixes

* support for test team in linear to stop spamming slack ([ddd765c]())


### Features

* archive completed issues if in staging or development ([2b01a53]())

# [1.559.0]() (2025-02-14)


### Bug Fixes

* set organization type to any as workaround for type issue ([e641215]())


### Features

* add 'WebhookSecret' to compliance.enums ([da0ea4d]())
* add @linear/sdk dependency to project ([1ca5d4a]())
* add custom rawBody handling for Linear webhook requests ([2ec6be9]())
* add LinearController with incoming webhook support for file status updates ([5daf7b5]())
* add LinearModule to app module for modular functionality ([0555d66]())
* add linearSecret and linearWebhookId to organization model ([30becca]())
* add LinearService for managing Linear API integrations ([c71aa14]())
* add RabbitMQ message subscription for linear events in LinearRabbitService ([615ca56]())
* enhance classification processor with status updates and error handling ([28ae591]())
* enhance file upload handling with Linear webhook support and utility methods ([2bc575d]())
* enhance Linear service and controller for webhook handling and error reporting ([673ea74]())

# [1.558.0]() (2025-02-13)


### Features

* Add filtered select-all functionality to data grid ([99d45b2]())
* Fix syntax errors in clickSelectAll function logic ([c1d921f]())
* Optimize attribute sorting by wrapping it in useMemo ([6e4e56b]())

# [1.557.0]() (2025-02-13)


### Features

* Improve error handling and feedback for file deletion ([8713388]())

# [1.556.0]() (2025-02-13)


### Features

* use calculated weights on product-level sustainability attribute report ([3786eea]())

# [1.555.0]() (2025-02-12)


### Features

* show/use calculated weight on PCF tab ([8d3f785]())

# [1.554.0]() (2025-02-12)


### Features

* Enable new PCF UI feature flag in productsDataGrid ([7f6a11e]())

# [1.553.0]() (2025-02-11)


### Features

* add weightFactor to material classifications ([d55cef3]())

# [1.552.0]() (2025-02-11)


### Features

* Add support for missing material emissions handling ([9b67c13]())
* Use pluralize for materials count in MissingMaterialEmissionsCard. ([40d5b80]())

# [1.551.0]() (2025-02-11)


### Features

* add weight_factor, weight_factor_unit_of_measure, and width fields to materials model ([0a639b1]())
* add widthUnitOfMeasure field to materials schema and related entities ([f0e110c]())

# [1.550.0]() (2025-02-11)


### Features

* Add EmissionsFactorBubble component with Storybook examples ([d6a01e6]())
* Add EmissionsFactorDetailedExpandedView component and stories ([b9fe6dc]())
* Add link color tokens to cold_theme ([da39f90]())
* Remove redundant text-body class from emission factor bubble ([5968bf9]())

# [1.549.0]() (2025-02-11)


### Features

* Add queryParams to document upload axios request ([f291015]())
* Handle partial upload failures in upload modal. ([4edd280]())
* Improve upload failure messaging with specific file names ([13c7d6f]())
* Refactor queryParams and restore Confirm button functionality ([cb8559c]())

## [1.548.1]() (2025-02-10)


### Bug Fixes

* **organization.files.service:** correct file type for manual review status ([e6e8a2a]())

# [1.548.0]() (2025-02-10)


### Features

* update file upload handling to support processing status and file types ([ad2e53d]())

# [1.547.0]() (2025-02-10)


### Features

* Add material classification category to products data ([b08c47e]())
* Refactor emission display to improve UI styling. ([4f45600]())
* Simplify null/undefined check for classification. ([73f3302]())

# [1.546.0]() (2025-02-10)


### Bug Fixes

* update access control list to use read-only permissions so that it doesn't require org scoped query. ([d887bd7]())


### Features

* add materials relationship to organization-facility entity and schema ([fe1905d]())
* update Material entity to reference OrganizationFacility relationship ([ae24870]())

# [1.545.0]() (2025-02-07)


### Features

* Add carbon accounting tab to product details ([a9bfa37]())
* Adjust emissions_factor precision to one decimal place. ([6cd69a0]())
* Fix carbon accounting unit conversion and weight calculation. ([e120f07]())
* Format yield values to two decimal places if not null ([dd8b56f]())
* Refactor tabs configuration in ProductDetail component. ([b6bfe9d]())
* Remove unnecessary 'type' property from weight field definition ([660b940]())

# [1.544.0]() (2025-02-07)


### Features

* "Remove unnecessary width class from modal inner element ([8abf835]())
* `Adjust modal content styles to improve layout consistency` ([36a5439]())
* Add query parameters to upload request configuration ([aa5ed7c]())
* Add UploadModal component and integrate it into UploadsPage ([da5ca08]())
* Add UploadModal component and MainDocumentCategory enum ([10948a9]())
* Adjust upload modal layout styles for better responsiveness ([d0dd02a]())
* Fix indentation issues in UploadModal component ([094f1ac]())
* Reset state on modal open and comment out confirm button. ([16a6496]())
* Set default sorting by creation date in uploads table ([abaf9c4]())
* Update icon for Assurance Documents in upload modal ([9afbd98]())

## [1.543.2]() (2025-02-07)


### Bug Fixes

* update yarn install command and remove unnecessary npm uninstall steps ([eade4f9]())

## [1.543.1]() (2025-02-07)


### Bug Fixes

* update start commands and watch paths for platform services ([b492832]())

# [1.543.0]() (2025-02-06)


### Features

* Enable pagination in DataGrids and downgrade [@mui]() packages. ([1a37320]())
* Remove pagination from individual DataGrids and centralize it. ([75e00bd]())
* Replace DataGridPro with MuiDataGrid for consistency ([fa771ad]())
* Set custom column header height in ProductsDataGrid ([db521a4]())
* Upgrade to `@mui/x-data-grid-pro` and add required license key. ([9f06b7d]())

# [1.542.0]() (2025-02-06)


### Features

* extend ACL entity maps with material_classification ([868af28]())

# [1.541.0]() (2025-02-06)


### Features

* add foreign key and index for materials linking to organization facilities ([0484803]())

# [1.540.0]() (2025-02-05)


### Features

* Add error boundary to UploadsPage for improved error handling ([942505e]())
* Add support for fetching and displaying uploaded files ([e8e7daa]())
* Refactor status rendering logic and improve type handling ([46dc573]())
* Refactor type formatting using `formatScreamingSnakeCase` ([da96658]())
* Refactor uploads page file handling and status rendering. ([414b942]())
* Refactor uploadsPage renderDate and update cell styling ([d586723]())
* Simplify file type handling in uploadsPage. ([8d1a760]())
* Simplify value handling in uploadsPage column config ([af51433]())

# [1.539.0]() (2025-02-04)


### Bug Fixes

* Fix selection count to show total rows instead of filtered rows ([95d8a26]())


### Features

* Add filtering to editEntityAssociationsModal grid ([2136935]())
* Fix checkbox behavior and remove redundant filter reset logic ([de4068c]())
* Fix indeterminate checkbox logic in editEntityAssociationsModal ([7cf6b28]())
* Improve handling of selected rows in entity associations modal ([f96daa5]())
* Refactor row selection logic in EditEntityAssociationsModal ([0819e75]())
* Refactor selection logic in editEntityAssociationsModal. ([b55b48a]())
* Remove custom toolbar from EditEntityAssociationsModal. ([b2a8ed9]())
* Set consistent initial sorting for tables. ([ae4a29b]())
* Set initial sorting state in EditEntityAssociationsModal ([b6d8eb3]())
* Simplify header checkbox selection logic. ([9e0a0fc]())

# [1.538.0]() (2025-02-04)


### Bug Fixes

* Refactor DataGrid toolbar for improved customization. ([43d72ee]())


### Features

* Add support for custom quick filter props in DataGrid ([adb2766]())
* Prevent rendering toolbar when all options are disabled. ([a23b5ce]())
* Refactor DataGrid toolbar props handling. ([16f94bc]())

# [1.537.0]() (2025-02-04)


### Features

* **prisma:** add processing_status enum to organization_files and update pre-commit script ([a7ee098]())
* **prisma:** add processing_status field and index to organization_files model ([294d498]())

# [1.536.0]() (2025-02-04)


### Bug Fixes

* revert commit ([3a353b2]())


### Features

* add material and product tag relationships to Organization entity ([4df22ab]())
* add material and product tagging models to extend tagging capabilities ([b0f34f3]())
* add MaterialTag entity and schema with hooks in backend ([b26bb6d]())
* add MaterialTagAssignment entity with hooks and schema definition ([ca698f3]())
* add MaterialTagAssignment relationship to Material entity and schema ([3d7698b]())
* add ProductsTag entity with schema, hooks, and ACL integration ([5a1bea2]())
* add ProductTagAssignment entity with hooks and schema integration ([7b53f79]())
* add ProductTagAssignment relationship to Product entity and schema ([ddd9431]())
* add support for material and product tags ([036826d]())
* add unique constraints to tag models ([4e513b3]())
* create tagging models for materials and products ([22defb7]())
* migrate material categories and subcategories to tags ([e580360]())
* migrate product categories and subcategories to tags ([8b625d9]())

# [1.535.0]() (2025-01-31)


### Features

* Update carbon footprint route in components ([b1ea976]())

# [1.534.0]() (2025-01-31)


### Features

* Add useEffect to handle product updates in BOM tab ([baade4f]())
* Ensure selected material validity on product update ([531a3c1]())
* Make addToastMessage calls awaitable ([fa8f8f1]())
* Refactor product BOM tab to streamline state handling. ([68e408f]())
* Remove unnecessary refresh logic from BOM components ([d0d3e02]())
* Set selectedMaterial to undefined when material is removed ([99f4b7b]())

# [1.533.0]() (2025-01-30)


### Features

* create new uploads page ([3e193ed]())
* update sidebar with new items when FF is on ([9291535]())

# [1.532.0]() (2025-01-29)


### Features

* Refactor sidebar filtering logic for better flag handling ([7409605]())

# [1.531.0]() (2025-01-29)


### Features

* Update page title dynamically based on feature flag ([49984c9]())

## [1.530.1]() (2025-01-29)


### Bug Fixes

* handle new case of divide by zero ([52a5e19]())
* handle new case of divide by zero ([#763](ssues/763)) ([af4ec69]())

# [1.530.0]() (2025-01-28)


### Features

* Add dynamic product-supplier association editing ([85bd65b]())
* Log updates and add success toast in entity associations modal ([f1c9fff]())
* Refactor error handling and remove redundant button props. ([5820058]())
* Rename and update supplier removal logic ([6f12836]())

# [1.529.0]() (2025-01-28)


### Features

* Add 'kg' to PCF enum ([1d97d22]())

## [1.528.1]() (2025-01-28)


### Bug Fixes

* divide by products with a percent, not all products in category ([65fc556]())
* divide by products with a percent, not all products in category ([#759](ssues/759)) ([f218808]())

# [1.528.0]() (2025-01-28)


### Features

* Add support for adding new options in ComboBox ([82c6e25]())
* Add support for adding new options to ComboBox ([363353e]())

# [1.527.0]() (2025-01-28)


### Features

* Add ProductBOMTabSidebar to productBOMTab component ([8943cba]())
* Enable dynamic entity associations management ([756a10c]())

# [1.526.0]() (2025-01-28)


### Bug Fixes

* Refactor getSelectedMaterialId to ensure proper typing ([d613279]())


### Features

* Add BOM sidebar and editing functionality to product details ([246031d]())
* Add data-testid attributes to improve component testing ([4351881]())
* Enhance input error handling with conditional border styles ([b5afc37]())
* Refactor BOM sidebar state management and improve UX ([0e15e56]())
* Refactor BOM tab and sidebar state handling. ([af7defc]())
* Refactor ProductBOMTabSidebar and organize interfaces. ([102becc]())
* Refactor ProductBOMTabSidebar to remove redundant variable. ([241d1a6]())
* Refactor yield error logic into a separate function ([ff19695]())
* Remove unused GET_PRODUCT_BOM_DATA_FOR_SIDEBAR query ([4ad699d]())
* Set comboBox state when value prop changes ([68a405a]())

# [1.525.0]() (2025-01-23)


### Features

* Refactor Sidebar to include sticky Org Selector. ([002693b]())
* Update sidebar padding conditionally based on orgSelector ([4dcaa84]())

# [1.524.0]() (2025-01-23)


### Bug Fixes

* review feedback ([5bd2608]())


### Features

* ability to edit supplier details ([1e1a130]())

# [1.523.0]() (2025-01-23)


### Bug Fixes

* Rename "questionnaire" routes and paths to "assessment". ([1342703]())


### Features

* Update route to include dynamic complianceName parameter ([3c6fad4]())

# [1.522.0]() (2025-01-22)


### Bug Fixes

* add missing indexes to improve query performance ([b8f3a30]())


### Features

* Refactor sidebar and update navigation structure ([fb3ffd6]())
* Refactor sidebar logic to include feature flag check. ([ae92193]())
* Remove "Assessments" item from the sidebar. ([545269a]())
* Rename routes and navigation paths for consistency ([ef254da]())
* Update seed routes and reorder 'My Data' items ([d4a0c42]())

## [1.521.2]() (2025-01-22)


### Bug Fixes

* only give extra space for error when it's present ([06a479b]())

## [1.521.1]() (2025-01-22)


### Bug Fixes

* export enums module from nest library ([c65d9ef]())

# [1.521.0]() (2025-01-21)


### Bug Fixes

* comment out pcf hooks for this release ([4bcacdf]())


### Features

* add BackboneService for product synchronization and integration ([7124095]())
* add BackboneService integration to organization integrations ([ac5363e]())
* add comprehensive unit enums and schemas for utility library ([62911ee]())
* add indexes for materials and products tables, introduce PLM ID to products ([8230dcc]())
* enable frustration tracking in Datadog RUM settings ([b18a736]())
* enhance BackboneService with sync logic for products, materials, and suppliers ([29a2d13]())
* enhance MaterialHooks with product emission stats caching ([a381faa]())
* update Prisma schema with weight and plm_id fields, add migrations ([7e7db2a]())

# [1.520.0]() (2025-01-17)


### Features

* Add error handling and test IDs to input component ([32e0f77]())
* Refactor input components to improve optional prop handling ([2f7888b]())
* Refactor input error handling logic for consistency. ([5cc953d]())
* Remove unused Textarea import and fix optional chaining issue. ([8de946e]())
* Use `InputTypes.TextArea` for description fields. ([57da3c2]())

# [1.519.0]() (2025-01-17)


### Features

* add in Suppliers and finishing touches ([a31634a]())
* allow edit of text fields on Material ([aadbd86]())
* new component for TextInput ([427ca6a]())

# [1.518.0]() (2025-01-17)


### Features

* Add "showError" prop to input components for error control ([41ded43]())
* Add a validateName helper function for product name checks ([e42d280]())
* Add error message support for Input component ([041f595]())
* Add test IDs and refine error handling logic ([6153afe]())
* Add validation and error handling for ComboBox inputs ([ae62e14]())
* Add validation for material name and improve UI error handling ([d345afd]())
* Refactor conditional object assignments for clarity ([2875f37]())
* Refactor data handling with useMemo and useEntityData ([a4a1da5]())
* Refactor name validation in createMaterialPage component. ([1ca2017]())
* Refactor validation logic across creation pages. ([75448ba]())
* Refine UI layout and styling across create pages. ([1e00bee]())
* remove tier 2 filter. allow all suppliers able to supply materials ([14a30c8]())

# [1.517.0]() (2025-01-16)


### Features

* Add array type check for signed policy data validation ([a66a4b7]())
* Handle invalid Auth0 tokens and enhance error logging. ([d7d1e4f]())

# [1.516.0]() (2025-01-16)


### Features

* add unit enums and validation schemas ([c0c230d]())

## [1.515.1]() (2025-01-16)


### Bug Fixes

* **hooks:** simplify afterReadHook in product hooks to improve performance ([a8e1eb4]())

# [1.515.0]() (2025-01-15)


### Features

* Add "Create Product" functionality with UI and GraphQL mutation ([95e11d0]())
* Ensure form validation checks for trimmed input values. ([300073d]())
* Fix form validation to properly handle whitespace-only names. ([4e0bd23]())
* Refactor Sustainability Attributes card to use CTAs prop ([aa35f77]())

# [1.514.0]() (2025-01-15)


### Features

* add AutoComplete component using MUI Autocomplete ([995562c]())
* Refactor input placeholders and fix material classifications handling. ([8591166]())
* update createMaterialPage to improve state management and UI ([436e7e5]())
* Update filters and rename fields in createMaterialPage ([e10f852]())

# [1.513.0]() (2025-01-13)


### Features

* Refactor createSupplier form structure and validations. ([4ce56b2]())
* Refine GraphQL query with supplier-level filter ([5131185]())
* standardize supplier state property casing ([fd540d6]())
* update create supplier page logic and UI ([347e23b]())

# [1.512.0]() (2025-01-10)


### Bug Fixes

* correct filter model update placement in muiDataGrid ([f1b0939]())
* display 'Materials' tab for tier 2 suppliers ([cf42e8c]())
* handle update of material entity associations correctly ([5692152]())
* remove unnecessary `refreshData` prop from `ProductsSuppliedTab` ([ffc8a08]())
* remove unnecessary array wrapping for Materials tab ([7305240]())
* simplify and correct entity association update logic ([689ea82]())


### Features

* add 'data-testid' prop support for buttons ([2febe74]())
* add entity association editing functionality and update data handling logic ([b38d899]())
* add success toast message after updating associations ([cd6a28a]())
* correct tabs order for Materials and Products ([576d125]())
* update tab visibility logic for materials and products ([ef87e2c]())

# [1.511.0]() (2025-01-08)


### Features

* add persistent search functionality for data grids ([0ca0388]())
* add support for initializing quick filter values from org storage ([602d966]())
* add unique searchKey support for various DataGrid components ([0c39bf8]())
* enhance orgStorageUtils with additional utility functions ([7c92a1f]())

# [1.510.0]() (2025-01-07)


### Bug Fixes

* add missing punctuation to deleteEntityModal title ([1da934e]())


### Features

* add material deletion modal and refactor GraphQL mutations ([b52f708]())
* add useGraphqlSWRMutate hook and integrate into DeleteEntityModal ([aab6110]())
* export utility functions in mqttMappings ([1fa56d5]())
* replace DocumentDetailsMenu with EllipsisMenu across components and enhance delete modal styling ([1007395]())

# [1.509.0]() (2025-01-06)


### Bug Fixes

* comment out pcf hooks for this release ([243b447]())


### Features

* add indexes for materials and products tables, introduce PLM ID to products ([e2a89b9]())
* enhance MaterialHooks with product emission stats caching ([f5ab06d]())

# [1.508.0]() (2025-01-06)


### Features

* enable frustration tracking in Datadog RUM settings ([f4d74e0]())

# [1.507.0]() (2024-12-20)


### Bug Fixes

* update `isOrgKey` logic to include `organizationId` and adjust query mapping filtering ([b29cc33]())


### Features

* correct log message casing in coldMQTTProvider.tsx ([72071f5]())
* enhance MQTT mapping logic and add logging for GraphQL updates ([d524576]())

# [1.506.0]() (2024-12-20)


### Features

* add transparent background for DataGrid container ([42db4d8]())
* enable token refresh and localstorage caching for auth config ([f6c94ea]())
* handle loading state directly via MuiDataGrid ([8123ce0]())

## [1.505.1]() (2024-12-19)


### Bug Fixes

* reconstruct the full search query (not just the first term) ([9bbc4d6]())

# [1.505.0]() (2024-12-19)


### Features

* add core classification and sustainability attribute classification assignment types and mutations ([56b5347]())

# [1.504.0]() (2024-12-18)


### Features

* add core classifications and sustainability attribute classification assignment models ([2c8e40c]())

# [1.503.0]() (2024-12-17)


### Features

* use deep clone for files in product detail ([f1b67d9]())

## [1.502.1]() (2024-12-17)


### Bug Fixes

* correct parameter keys and logical comparison in backend code ([2dd2d58]())

# [1.502.0]() (2024-12-17)


### Features

* add caching mechanism for PCF emissions and adjust schema queries ([8608be5]())
* add emissions tracking via schema updates and new database view ([2b63f49]())
* implement cache_pcf_emissions query to enhance emission data processing ([84e874e]())
* rename `emissions` to `emissionStats` and update schema and entity definitions ([f991a69]())

# [1.501.0]() (2024-12-16)


### Features

* show classification on materials detail page ([2b11f16]())

## [1.500.1]() (2024-12-16)


### Bug Fixes

* update default port configurations for cold-api environments ([49e0c8a]())

# [1.500.0]() (2024-12-16)


### Features

* filter RDS and RWS material reports ([b0fa674]())
* filter RDS and RWS material reports ([#717](ssues/717)) ([5e7ba2c]())

# [1.499.0]() (2024-12-16)


### Features

* add query for PCF emissions by product ([12ac3f6]())

# [1.498.0]() (2024-12-15)


### Features

* enhance filter capabilities and add emissions field ([ca3ad44]())

# [1.497.0]() (2024-12-15)


### Features

* bump graphweaver version to re-introduce _or / _and operators due to bug in graphweaver ([71da272]())

# [1.496.0]() (2024-12-15)


### Features

* add support for emissions tracking in product schema and operations ([80b4178]())

# [1.495.0]() (2024-12-15)


### Features

* implement organization-product-material-emissions entity and related hooks ([6f1defd]())

# [1.494.0]() (2024-12-15)


### Bug Fixes

* remove unused imports and streamline secret retrieval logic ([ea51711]())


### Features

* integrate AWS KMS service with encryption/decryption support ([7d431f5]())

## [1.493.1]() (2024-12-15)


### Bug Fixes

* **cold-platform:** update project configurations, enable dynamic module setups, and improve integration service logic ([35835af]())

# [1.493.0]() (2024-12-13)


### Features

* add product footprint to product data grid ([cbdf20c]())
* add product footprint to product data grid ([#714](ssues/714)) ([c3134ed]())

## [1.492.1]() (2024-12-12)


### Bug Fixes

* add missing material classifications script ([0f72cf5]())

# [1.492.0]() (2024-12-12)


### Bug Fixes

* remove unused supplier prop from bulkEditMaterialAttributesModal and related components ([96eae28]())


### Features

* add bulk editing for sustainability attributes in materials ([11e4be8]())

# [1.491.0]() (2024-12-12)


### Features

* add core material types model, relation to materials, and Climatiq entity types ([c2aa1dd]())

# [1.490.0]() (2024-12-11)


### Features

* add bulk edit functionality for sustainability attributes ([0a5c2f2]())
* enhance bulk sustainability attribute management with batch operations ([3b039ae]())
* improve pluralization handling in bulk edit modal ([193d96c]())
* remove unused `attributeAssuranceIds` references ([f58229e]())

# [1.489.0]() (2024-12-06)


### Features

* add links to material/product's supplier ([cd699a9]())
* add links to material/product's supplier ([#708](ssues/708)) ([a520c3c]())
* add products to supplier detail page ([3cb8a43]())

## [1.488.2]() (2024-12-05)


### Bug Fixes

* address TypeScript error in organization files controller ([1551603]())

## [1.488.1]() (2024-12-05)


### Bug Fixes

* implement changes required by latest version of langchain ([eb9bd2f]())

# [1.488.0]() (2024-12-05)


### Features

* update materials table schema and fix description typo ([d34a2bd]())

# [1.487.0]() (2024-12-04)


### Features

* add dropdown as option on card ([4e40df9]())
* allow graphs to pivot between category and subcategory ([9aa8103]())

# [1.486.0]() (2024-12-03)


### Bug Fixes

* **cold-platform-climatiq:** add tracer initialization and update logger configuration ([9c1f42a]())
* enhance error handling in AppService initialization ([5001abb]())
* update climatiq_activities to fix typos and modify column types ([835aa94]())


### Features

* add ClimatiqController and sync sector categories functionality ([e702ba8]())
* add CountriesService with province, region, and country lookup functionalities ([29f4dc7]())

# [1.485.0]() (2024-12-03)


### Features

* create new By Product tab component for SustainabilityAttributePage ([ab153ce]())
* new donut chart for averages ([893c491]())

## [1.484.2]() (2024-12-02)


### Bug Fixes

* aws sso bug causing hourly login requests ([025c9a0]())
* remove deprecated search query fields from GraphQL types ([cd07e17]())

## [1.484.1]() (2024-12-02)


### Bug Fixes

* remove unnecessary import in sustainability-attribute schema file ([f03eee7]())

# [1.484.0]() (2024-12-02)


### Bug Fixes

* missing _or and _and filters in GraphQL ([0f86db3]())


### Features

* add gender to products and introduce climatiq_actvities model ([36ee259]())

# [1.483.0]() (2024-11-21)


### Features

* new product carbon footprint graphs ([8794498]())

# [1.482.0]() (2024-11-20)


### Features

* add emissions factor to materials and weight to product materials ([bc5e828]())
* add emissionsFactor to Material entity and schema ([992b220]())
* add weight property to ProductMaterial entity and schema ([918a02d]())

# [1.481.0]() (2024-11-18)


### Features

* add keen material schema and enhance product logging ([1422c8a]())

## [1.480.1]() (2024-11-15)


### Bug Fixes

* graphql needs to have variables in key to know new page is new query ([2446f8c]())

# [1.480.0]() (2024-11-15)


### Features

* new graphs for sustainability reporting page ([940cfa0]())

# [1.479.0]() (2024-11-15)


### Bug Fixes

* enhance error logging and fix file categorization in upload process ([8b5a37d]())
* improve file upload error handling and logging ([2db1f97]())
* streamline material and supplier processing in organization service ([01d434e]())


### Features

* add CSV support to PLM import tool and improve file handling ([b6561dc]())
* add file import functionality to OrganizationFiles ([0720e50]())
* add Keen PLM schema and reorganize schema files ([0afbff8]())
* add new fields to materials and product_materials tables ([525af66]())
* add supplier creation and partial name search in SuppliersRepository ([4749978]())
* enhance product and material processing logic ([c4cdc37]())

## [1.478.1]() (2024-11-14)


### Bug Fixes

* allow tier 1 supplier to be null ([2ae3443]())
* allow tier 1 supplier to be null ([#685](ssues/685)) ([5876bb5]())

# [1.478.0]() (2024-11-14)


### Features

* new graph component ([5bbd4dd]())

# [1.477.0]() (2024-11-14)


### Features

* new hook to fetch and process entities ([be309b6]())

# [1.476.0]() (2024-11-14)


### Features

* add image to sustainability attribute detail page ([bc82581]())

## [1.475.1]() (2024-11-14)


### Bug Fixes

* make sure we always get the entity for the right level (and not just a random related entity) ([7327f63]())

# [1.475.0]() (2024-11-13)


### Bug Fixes

* enhance classification logic and schema ([b281c88]())
* **pinecone.service:** handle document processing and adjust content length validation ([a29c2f2]())
* update description for supplier name field ([dbf438f]())


### Features

* add content length check for PDF extraction fallback to image conversion ([60e4348]())
* add supplier agreement and statement extraction prompts ([1d88573]())
* add SUPPLIER_STATEMENT and SUPPLIER_AGREEMENT to file_types enum ([93da2d8]())
* designate ColdRabbitModule as a global module ([033100b]())
* enhance ExtractionService with new schemas and improved matching logic ([8da8400]())
* enhance module exports ([4259d78]())
* integrate redactor service into worker logger for improved logging security ([c63d27b]())

# [1.474.0]() (2024-11-13)


### Features

* new (very basic) sustainability attribute page ([e64b318]())

# [1.473.0]() (2024-11-13)


### Features

* made header/save button sticky while interior content is scrollable ([23b20de]())
* new selector for materials ([c0760d6]())

# [1.472.0]() (2024-11-12)


### Features

* integrate new EntitySelect into component ([5b5a93d]())

# [1.471.0]() (2024-11-08)


### Features

* optimize docker build and configuration ([8aae9de]())

## [1.470.6]() (2024-11-07)


### Bug Fixes

* design feedback ([cb67f13]())
* make sure DocumentsTableColumn updates when Sustainability Attribute changes ([1cbf708]())

## [1.470.5]() (2024-11-06)


### Bug Fixes

* major bug throwing 500s without logs ([1ce0442]())

## [1.470.4]() (2024-11-06)


### Bug Fixes

* issue with tracer.ts ([4eb5c0c]())

## [1.470.3]() (2024-11-06)


### Bug Fixes

* update traceService reference to use base class ([e33e301]())

## [1.470.2]() (2024-11-06)


### Bug Fixes

* resolve circular dependency by adding EventService to library for handling platform and integration events ([5b04441]())
* resolve circular dependency by adding EventService to library for handling platform and integration events ([b4cbd21]())

## [1.470.1]() (2024-11-05)


### Reverts

* Revert "fix: circular dependencies between nest library and API and openAI" ([583bbae]())

# [1.470.0]() (2024-11-05)


### Features

* integrate OpenTelemetry and update dependencies ([50eeed0]())

## [1.469.14]() (2024-11-05)


### Bug Fixes

* circular dependencies between nest library and API and openAI ([09ae18b]())

## [1.469.13]() (2024-11-05)


### Bug Fixes

* remove redundant workspace focus in docker build ([03e23ea]())

## [1.469.12]() (2024-11-05)


### Bug Fixes

* remove production flag from yarn workspaces focus ([8b7dd67]())

## [1.469.11]() (2024-11-05)


### Bug Fixes

* increase EC2 instance storage in flightcontrol.json ([41a7ee8]())

## [1.469.10]() (2024-11-05)


### Bug Fixes

* disable importHelpers in TypeScript configuration ([e450533]())
* **dockerfile:** remove debug echo statement ([506a056]())

## [1.469.9]() (2024-11-05)


### Bug Fixes

* update instance storage size and yarn version ([3b7841a]())

## [1.469.8]() (2024-11-05)


### Bug Fixes

* add tslib dependency to package.json ([2b2204f]())

## [1.469.7]() (2024-11-05)


### Bug Fixes

* update Dockerfile to run yarn without workspaces focus ([b4c1fba]())

## [1.469.6]() (2024-11-05)


### Bug Fixes

* update Dockerfile commands for consistency ([cd3fe6d]())

## [1.469.5]() (2024-11-05)


### Bug Fixes

* correct paths in Dockerfiles for listing built files ([87c95a2]())

## [1.469.4]() (2024-11-05)


### Bug Fixes

* **docker:** reorganize list commands to initial build stage ([462af12]())

## [1.469.3]() (2024-11-05)


### Bug Fixes

* update Dockerfiles with essential build steps and environment configurations ([764688f]())

## [1.469.2]() (2024-11-04)


### Bug Fixes

* **worker:** ensure DD_ENV is set only if not already defined ([9de87d8]())

## [1.469.1]() (2024-11-04)


### Bug Fixes

* update yarn.lock to avoid chromatic build failures ([29a4b44]())
* update yarn.lock to avoid chromatic build failures ([#669](ssues/669)) ([943de71]())

# [1.469.0]() (2024-11-04)


### Features

* add AWS SSO credential provider to dependencies ([079a65a]())

## [1.468.3]() (2024-11-04)


### Bug Fixes

* remove package.lock ([8124c8f]())
* show dir listing ([5290b0d]())

## [1.468.2]() (2024-11-04)


### Bug Fixes

* dockerfile ([42f60d9]())

## [1.468.1]() (2024-11-03)


### Bug Fixes

* correct log message and uncomment build command in dockerfile ([f3598db]())

# [1.468.0]() (2024-11-03)


### Features

* include app's src directory in Dockerfile ([eaaaf5e]())

## [1.467.20]() (2024-11-03)


### Bug Fixes

* correct yarn sync command and update Dockerfile for Datadog and Yarn support ([27c221e]())

## [1.467.19]() (2024-11-03)


### Bug Fixes

* update build configuration for cold-graphql ([947a5f4]())

## [1.467.18]() (2024-11-03)


### Bug Fixes

* migrate graphql to use YARN ([57d87c0]())

## [1.467.17]() (2024-11-02)


### Bug Fixes

* **dockerfile:** update directories listing paths for DD_SERVICE ([b52b9a1]())

## [1.467.16]() (2024-11-02)


### Bug Fixes

* ensure apps directory exists before copying files ([e0c8df2]())

## [1.467.15]() (2024-11-02)


### Bug Fixes

* update Dockerfile commands and paths for consistent structure ([2c7e260]())

## [1.467.14]() (2024-11-02)


### Bug Fixes

* **dockerfile:** correct node_modules copy path in Dockerfiles ([efa6175]())

## [1.467.13]() (2024-11-02)


### Bug Fixes

* update directory listing commands in Dockerfiles ([553e92b]())

## [1.467.12]() (2024-11-02)


### Bug Fixes

* correct destination paths in Dockerfiles ([0747832]())

## [1.467.11]() (2024-11-02)


### Bug Fixes

* update Dockerfiles to use absolute path for node app ([225e2b5]())

## [1.467.10]() (2024-11-02)


### Bug Fixes

* update watch paths in flightcontrol.json ([c961564]())

## [1.467.9]() (2024-11-02)


### Bug Fixes

* update Dockerfile paths to correct directory structure ([1ff959a]())

## [1.467.8]() (2024-11-02)


### Bug Fixes

* add directory listing for debugging in Dockerfiles ([0a974c1]())

## [1.467.7]() (2024-11-02)


### Bug Fixes

* replace yarn dlx nx@latest run with node main.js in docker CMD ([0e1eacc]())

## [1.467.6]() (2024-11-02)


### Bug Fixes

* update Dockerfiles with package uninstalls and repository URL updates ([537a63f]())

## [1.467.5]() (2024-11-02)


### Bug Fixes

* unify Dockerfile ADD paths across different services ([d7d416d]())

## [1.467.4]() (2024-11-02)


### Bug Fixes

* update Dockerfiles to include webpack.config.js ([ee8234a]())

## [1.467.3]() (2024-11-02)


### Bug Fixes

* update instance storage in flightcontrol.json ([d51ba28]())

## [1.467.2]() (2024-11-02)


### Bug Fixes

* **dockerfile:** correct assets directory path ([4d52a6e]())

## [1.467.1]() (2024-11-02)


### Bug Fixes

* update Docker CMD to use env-specific serve command ([97cbd42]())

# [1.467.0]() (2024-11-02)


### Features

* update Dockerfile to uninstall yarn and pnpm, and change app start command ([2f159be]())

## [1.466.2]() (2024-11-02)


### Bug Fixes

* remove configuration for cold-graphql-ui in production and staging ([9bd4c48]())

## [1.466.1]() (2024-11-02)


### Bug Fixes

* comment out unnecessary production focus step in Dockerfile ([aac956d]())

# [1.466.0]() (2024-11-02)


### Features

* add Puppeteer dependencies and update corepack in Dockerfiles ([b929220]())

## [1.465.3]() (2024-11-02)

## [1.465.2]() (2024-11-02)


### Bug Fixes

* update database migration and seeding commands in Dockerfiles ([63f8478]())

## [1.465.1]() (2024-11-02)


### Bug Fixes

* update Dockerfiles and code for consistency and enhancements ([907ae82]())

# [1.465.0]() (2024-11-02)


### Bug Fixes

* add missing newline at end of flightcontrol.json file ([3cb925d]())
* add missing newline at end of package.json ([73bdb1b]())
* add missing workspaces property and update some dependencies versions ([7ad9e27]())
* add newline at end of package.json ([6a7c737]())
* normalize indentation in package.json ([5a4cf93]())
* remove unused Rollup alias plugin in Vite configs ([cf0a20f]())


### Features

* extend tsconfig and update nx settings ([37b72dc]())

# [1.464.0]() (2024-11-01)


### Features

* add ability to edit sustainability attributes for supplier ([b481076]())

# [1.463.0]() (2024-11-01)


### Features

* add support for setting runtime environment for DD to pick up ([2e0b3c7]())

## [1.462.1]() (2024-11-01)


### Bug Fixes

* update module-federation dependencies ([2a78402]())

# [1.462.0]() (2024-11-01)


### Features

* add ability to edit sustainability attributes on material page ([279b8b6]())
* new materials supplied tab ([355bda3]())

## [1.461.1]() (2024-11-01)


### Bug Fixes

* remove attributes that aren't in GraphQL generated type ([101ff01]())

# [1.461.0]() (2024-11-01)


### Bug Fixes

* replace 'Product Detail' with actual product name ([3604811]())
* replace 'Product Detail' with actual product name ([#664](ssues/664)) ([ed709b6]())


### Features

* add basic navigation to now empty SupplierDetail component behind FF ([5ddecd9]())
* add new details card ([7649acf]())
* add SupplierSustainabilityAttributesCard ([d1c5bab]())
* navigate to new SupplierDetail page from Suppliers data grid ([29a4538]())
* query for supplier on SupplierDetail and present breadcrumbs, name ([619b38d]())

## [1.460.2]() (2024-11-01)


### Bug Fixes

* update Dockerfile to use yarn and corepack for package management ([f220ca7]())

## [1.460.1]() (2024-11-01)


### Bug Fixes

* **dockerfile:** correct source path for app files in Dockerfile ([731f77c]())

# [1.460.0]() (2024-11-01)


### Features

* update Dockerfiles to use yarn dlx instead of npx for running nx commands and add global dependencies ([84eaf99]())

## [1.459.4]() (2024-11-01)


### Bug Fixes

* use npx for nx commands in Dockerfiles ([a769d53]())

## [1.459.3]() (2024-10-31)


### Bug Fixes

* update docker CMD and add file change grouping in updateVersion.mjs ([95b1aa6]())

## [1.459.2]() (2024-10-31)


### Bug Fixes

* stop querying for description ([54943af]())

## [1.459.1]() (2024-10-31)


### Bug Fixes

* hide description until graphql backend is fixed ([50c2fb3]())

# [1.459.0]() (2024-10-31)


### Features

* Refactor worker and logger classes to enhance functionality and readability ([83c6d31]())

# [1.458.0]() (2024-10-31)


### Bug Fixes

* sneak in a small piece of unrelated design feedback ([0617d3d]())


### Features

* new component to edit/update the product-level attributes for a product ([ec74752]())

# [1.457.0]() (2024-10-31)


### Features

* update nested services configuration and add OpenTelemetry dependency ([d2d8b87]())

## [1.456.2]() (2024-10-31)


### Bug Fixes

* update dockerfile path and use dynamic service variable ([43ac413]())

## [1.456.1]() (2024-10-30)


### Bug Fixes

* update package.json and pre-commit script ([6250a73]())

# [1.456.0]() (2024-10-30)


### Features

* add new fields to organization_facilities and related schema ([b35df51]())

# [1.455.0]() (2024-10-30)


### Features

* allow users to navigate to materials details page from Materials datagrid ([e2cbc5d]())

# [1.454.0]() (2024-10-30)


### Bug Fixes

* entity name, not attribute name! ([fa56fc7]())


### Features

* add basic expanded view ([0d7b25b]())
* add basic navigation to now empty MaterialDetail component behind FF ([b50ceb8]())
* add basic two-column expanded state ([01def45]())
* add details card ([4a3b188]())
* add in supplier name to table ([fba3263]())
* add MaterialSustainabilityAttributesCard ([2b37f9a]())
* add scrolling to show expanded card ([24462fe]())
* basic unexpanded cards with entity name as bubble ([98fe6b5]())
* query for material on MaterialPage and present breadcrumbs, name ([358e195]())

# [1.453.0]() (2024-10-30)


### Bug Fixes

* bump version to 1.453.1 ([201d5a1]())
* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make material fields optional ([d3f06b3]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())
* update sustainability attribute names and add material ID fields** ([b136500]())

# [1.453.0]() (2024-10-30)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make material fields optional ([d3f06b3]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())
* update sustainability attribute names and add material ID fields** ([b136500]())

# [1.453.0]() (2024-10-30)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())
* update sustainability attribute names and add material ID fields** ([b136500]())

# [1.453.0]() (2024-10-29)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-29)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-29)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* new sustainability attribute select proof of concept ([1d6357d]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-28)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* SustainabilityPage story needs ...GraphQL type ([aa558ac]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* clean up Sustainability Attribute lists on data grids (COLD-1186) ([8d03f6d]())
* enhance product BOM tab with material category filtering ([24bb440]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-25)


### Bug Fixes

* expiring message updates from Liz ([e8f6724]())
* improve color setting on new icons ([0440c38]())
* issues with dockerfiles ([3dc7d23]())
* make sure that enum value is 2 words ([982df2f]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* enhance product BOM tab with material category filtering ([24bb440]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-25)


### Bug Fixes

* issues with dockerfiles ([3dc7d23]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* enhance product BOM tab with material category filtering ([24bb440]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

# [1.453.0]() (2024-10-25)


### Bug Fixes

* issues with dockerfiles ([3dc7d23]())
* remove redundant renderCell properties in productsDataGrid ([69a6134]())
* update Dockerfile RUN commands to list correct directories ([b55c6d2]())
* update material name rendering ([e2799e9]())
* update property names in productsDataGrid component ([c744408]())


### Features

* enhance product BOM tab with material category filtering ([24bb440]())
* update productsDataGrid to include productCategory and productSubcategory fields ([684a6d3]())

## [1.452.2]() (2024-10-25)


### Bug Fixes

* issues with dockerfiles ([3dc7d23]())

## [1.452.1]() (2024-10-25)


### Bug Fixes

* update Dockerfiles to include environment variables for observability ([1b05944]())

# [1.452.0]() (2024-10-25)


### Bug Fixes

* update image border radius in sustainabilityAttributeColumn ([fe8d266]())


### Features

* enhance documents table with sustainability attribute visual enhancements ([524a6d8]())

# [1.451.0]() (2024-10-25)


### Features

* add info icon with popover explaining Inactive ([4aae144]())
* add new ColdUnknownIcon ([3b265a2]())
* handle MISSING_DATE in SustainabilityAttributeLogoWithStatus ([f7aafaa]())

## [1.450.2]() (2024-10-24)


### Bug Fixes

* update pnpm version, add lockfile, and correct environment variables ([c26a511]())

## [1.450.1]() (2024-10-24)


### Bug Fixes

* correct Dockerfile production build command ([3bb9521]())

# [1.450.0]() (2024-10-24)


### Bug Fixes

* update environment variable checks for AWS credentials ([61212e1]())


### Features

* add Git commit SHA and repository URL to environment variables for tracing ([7663114]())

# [1.449.0]() (2024-10-24)


### Features

* add manage columns functionality to product BOM Tab ([529653a]())
* add material category and subcategory fields ([129adc9]())
* add yield and unit of measure fields to product materials ([f0feb9e]())
* streamline toolbar implementation in data grids ([b81fca4]())

# [1.448.0]() (2024-10-24)


### Features

* add product documents tab and utility function for parsing product details ([bbd60b3]())
* enhance product details with documents and product integration ([880894d]())

## [1.447.1]() (2024-10-24)


### Bug Fixes

* remove redundant git operations in Dockerfiles ([fbf5b72]())

# [1.447.0]() (2024-10-24)


### Bug Fixes

* **health.module:** add missing HealthService provider to module configuration ([8c26ecf]())


### Features

* add category and subCategory fields to materials data grid ([c5ea3a2]())
* sort unique categories and subcategories ([ae4b4a6]())
* update material fields to use new naming conventions ([2751d11]())

## [1.446.3]() (2024-10-24)


### Bug Fixes

* **health.module:** add missing HealthService provider to module configuration ([8c26ecf]())

## [1.446.2]() (2024-10-24)


### Bug Fixes

* remove unused imports and health check endpoint ([1573fc5]())

## [1.446.1]() (2024-10-24)


### Bug Fixes

* replace string status in health check with HttpStatusCode enum ([7e2956d]())

# [1.446.0]() (2024-10-23)


### Features

* add health check endpoint and increase EC2 instance storage ([691f235]())

# [1.445.0]() (2024-10-23)


### Features

* add startCommand to flight control configurations ([e944c61]())

## [1.444.3]() (2024-10-23)


### Bug Fixes

* change buildType from docker to nixpacks and update buildCommand ([6280ec3]())

## [1.444.2]() (2024-10-23)


### Bug Fixes

* update build commands by removing redundant `.git` suffix and correct staging build command ([f1fd1a3]())

## [1.444.1]() (2024-10-23)


### Bug Fixes

* update build commands to use nx for production builds ([fdfc1a5]())
* update organizationId structure in create pages ([34a4641]())

# [1.444.0]() (2024-10-23)


### Features

* update build configuration to use Nixpacks ([2b428cf]())

## [1.443.1]() (2024-10-23)


### Bug Fixes

* update DD_GIT_REPOSITORY_URL to use hardcoded GitHub URL ([640998a]())

# [1.443.0]() (2024-10-23)


### Features

* create a card component for the left side of the summary page (Details) ([fba8250]())
* new atom for DetailsItem ([0d4e4fd]())
* new component for details tab, and plug it into detail page ([2eb6cea]())
* new component right hand side of summary page (Sustainability Attributes) ([74abf9a]())

# [1.442.0]() (2024-10-23)


### Bug Fixes

* improve browser launch initialization in Excel conversion service ([c9da90e]())
* update build configurations and instance settings ([959986c]())


### Features

* add environment variables for DD_GIT_REPOSITORY_URL and DD_GIT_COMMIT_SHA in Dockerfiles ([7b36c35]())

## [1.441.1]() (2024-10-23)


### Bug Fixes

* add missing organization_id to upsert operations in materials.service.ts ([7f1d537]())
* **products.service:** ensure organization_id is included in upsert operations ([c7398f5]())

# [1.441.0]() (2024-10-23)


### Features

* enrich supplier and material data schemas to include additional fields. ([521b82d]())

# [1.440.0]() (2024-10-23)


### Features

* add ProductBOMTab to product detail page ([8906382]())

## [1.439.3]() (2024-10-23)


### Bug Fixes

* **logger:** handle undefined meta and optionalParams values correctly ([b0c98d1]())

## [1.439.2]() (2024-10-22)


### Bug Fixes

* handle undefined optionalParams in logger service ([cd9fae9]())

## [1.439.1]() (2024-10-22)


### Bug Fixes

* ensure optionalParams is handled correctly in logger service ([5b77c6f]())

# [1.439.0]() (2024-10-22)


### Bug Fixes

* add data-testid attribute and minor style tweaks ([06ce839]())


### Features

* replace custom tab components with shared Tabs component ([8c05e46]())

## [1.438.7]() (2024-10-22)


### Bug Fixes

* remove unnecessary .git copying in Dockerfile ([af04ee2]())

## [1.438.6]() (2024-10-22)


### Bug Fixes

* update date fields to allow null and undefined values in compliance response repository ([c9ed067]())

## [1.438.5]() (2024-10-22)


### Bug Fixes

* update e2e_test workflow trigger condition ([e6be5df]())

## [1.438.4]() (2024-10-22)


### Bug Fixes

* **docker:** remove .git directory from Dockerfile copies ([51f86e5]())

## [1.438.3]() (2024-10-22)


### Bug Fixes

* handle stringified meta in logger ([dde7669]())
* include .git directory in Dockerfiles and update .dockerignore ([7cc045d]())
* update e2e_test.yml for improved workflows ([4c4016b]())

## [1.438.2]() (2024-10-22)


### Bug Fixes

* simplify compliance section groups repository methods ([e4aa895]())

## [1.438.1]() (2024-10-22)


### Bug Fixes

* tailwinds doesn't support string interpolation ([fca754e]())
* tailwinds doesn't support string interpolation [follow up for COLD-1120] ([#632](ssues/632)) ([7af4ebe]())

# [1.438.0]() (2024-10-22)


### Features

* add foreign key constraints and make date fields optional in Prisma schema and migrations ([e3c148b]())

# [1.437.0]() (2024-10-22)


### Bug Fixes

* include organizationId in supplier and material creation ([e8e5fd1]())


### Features

* update breadcrumbs to use ChevronRightIcon ([d4ace43]())

## [1.436.1]() (2024-10-22)


### Bug Fixes

* make dates optional ([170cc7c]())

# [1.436.0]() (2024-10-22)


### Features

* add subtitle support to MainContent component ([f014971]())
* centralize title rendering in MainContent component ([8ebeb75]())
* enhance ProductDetail with GraphQL integration and tabs component ([19ac907]())

## [1.435.1]() (2024-10-22)


### Bug Fixes

* update axios to v1.7.7 ([097aeb3]())

# [1.435.0]() (2024-10-21)


### Bug Fixes

* add unique key to SustainabilityAttributeLogoWithStatus component ([effa83f]())
* fix casing issues in SVG attribute names ([b6ddc9d]())


### Features

* add product detail page and row click navigation ([4c5e8ac]())
* add Storybook entry for ProductDetail page ([f9dd084]())

## [1.434.1]() (2024-10-21)


### Bug Fixes

* **schemas:** update transform logic for peak_design_schema ([aad8e87]())

# [1.434.0]() (2024-10-21)


### Features

* add schema validated data ingestion tool ([45075e4]())

# [1.433.0]() (2024-10-21)


### Bug Fixes

* **prisma:** make organization_id required in material_suppliers and product_materials ([ecd5933]())


### Features

* add organization_id to material_suppliers and product_materials, add brand_product_sku to products ([775ce2b]())

# [1.432.0]() (2024-10-18)


### Features

* add feature flag for entity sustainability attributes ([2221fcb]())
* enhance sustainability attributes mapping for data grids ([2eec604]())

## [1.431.2]() (2024-10-17)


### Bug Fixes

* adjust column minWidth for better readability ([2e572cb]())

## [1.431.1]() (2024-10-16)


### Bug Fixes

* remove unused styleCode field from product interfaces and mocks ([2366083]())

# [1.431.0]() (2024-10-16)


### Features

* upgrade Sustainability Attribute column on suppliers page ([532220d]())

# [1.430.0]() (2024-10-16)


### Bug Fixes

* simplify category and subcategory text generation ([893c613]())
* use break-words instead of truncate for descriptions ([0e4f43b]())


### Features

* enhance products data grid display ([b137807]())
* enhance ProductsDataGrid component with additional product fields ([e5025ec]())

## [1.429.1]() (2024-10-16)


### Bug Fixes

* remove deprecated `productCategoryHeirarchy` field from product mock and interface ([4117afe]())
* remove unused productCategoryHierarchy field from GraphQL query ([8f60c2d]())

# [1.429.0]() (2024-10-16)


### Features

* update products table and schema to include category and subcat… ([#617](ssues/617)) ([18bd457]())
* update products table and schema to include category and subcategory fields ([aff7054]())

## [1.428.1]() (2024-10-16)


### Bug Fixes

* update defaultPrivacyLevel to 'allow' ([a745178]())

# [1.428.0]() (2024-10-16)


### Features

* add new product fields and indexes to schema ([64ca510]())

# [1.427.0]() (2024-10-16)


### Bug Fixes

* set row height explicitly on MaterialsDataGrid and roll back changes to base component ([be2cda6]())


### Features

* connect new component to Materials data grid & page ([158209c]())
* little component for the overflow item ([72ca393]())
* SustainabilityAttributeColumnList component ([f8892f7]())

## [1.426.1]() (2024-10-16)


### Bug Fixes

* set supplier field to true in organization facility initialization ([36031c3]())

# [1.426.0]() (2024-10-16)


### Bug Fixes

* prevent unnecessary state update on value change ([23f44e2]())


### Features

* add ability to click into input to open dropdown ([d10dbfa]())
* clear input when searching to avoid having to clear the whole text ([076fef6]())
* enforce minimum height for options in the dropdown ([d9ad012]())

## [1.425.2]() (2024-10-16)


### Bug Fixes

* improve supplier ID setting logic in extraction service ([deb790a]())

## [1.425.1]() (2024-10-16)


### Bug Fixes

* enhance supplier linking and classification logic ([f09d4bc]())

# [1.425.0]() (2024-10-15)


### Features

* add error boundaries to ProductsPage and ProductsDataGrid ([0664afc]())

# [1.424.0]() (2024-10-15)


### Bug Fixes

* adjust padding in DataGridCellHoverPopoverWrap ([87b39ad]())
* ensure unique sustainability attributes in productsDataGrid component ([6fd27cb]())
* handle null organizationFacility.name in productsDataGrid ([e3619f2]())
* replace DataGridCellHoverPopoverWrap with DataGridCellHoverPopover and adjust column properties ([4b30454]())


### Features

* add product routes and products page with data grid ([837cead]())
* conditionally display Products page and sidebar item based on feature flag ([caade65]())
* enhance product mock data with materials and attribute assurances ([1d2c8aa]())
* ensure accurate truncation check ([eb2ce0b]())
* ensure ResizeObserver initializes only when values array is not empty ([8212656]())

# [1.423.0]() (2024-10-15)


### Bug Fixes

* use 'contentClassName' ([f7ee183]())


### Features

* new component SustainabilityAttributeLogoWithStatus ([19ef794]())

## [1.422.5]() (2024-10-15)


### Bug Fixes

* **base.sidecar.ts:** ensure organization ID is set correctly for non-admin users ([c1194cb]())

## [1.422.4]() (2024-10-15)


### Bug Fixes

* prevent organization ID overwrite by cold admin ([70c9279]())

## [1.422.3]() (2024-10-15)


### Bug Fixes

* update classification service and enums for sustainability attributes ([19bd9a8]())

## [1.422.2]() (2024-10-15)


### Bug Fixes

* add table name in create_sidecar generator ([cb5deec]())
* check if table is scoped to organization_id and add parameter if so ([03143e6]())

## [1.422.1]() (2024-10-11)


### Bug Fixes

* fix imports after moving AttributeAssurance and SustainabilityAttribute into Interfaces ([bd8defa]())

# [1.422.0]() (2024-10-11)


### Bug Fixes

* adjust column width and responsiveness for DataGrid components ([a8481cd]())
* improve text truncation logic by adding debug logs and refactoring ([50224de]())
* remove redundant text from datagrid cell hover popover ([334d0d7]())
* replace Popover with Tooltip for cell hover interaction ([32fc097]())
* sort values in datagridCellHoverPopover component ([7d5b6e4]())
* update hover handling logic for popover visibility ([b79e2e3]())
* update popover resizing logic and style adjustments ([615eb91]())


### Features

* add width and resizable properties to DataGrid columns ([132a4e2]())
* enhance suppliers mock data and remove unused import from story ([f7e3092]())
* replace hardcoded cell rendering with DataGridCellHoverPopover component ([3989580]())

# [1.421.0]() (2024-10-11)


### Features

* add AttributeAssuranceGraph to SustainabilityAttributeCard ([af53f72]())
* create new AttributeAssuranceGraph component ([3d30b5e]())

# [1.420.0]() (2024-10-10)


### Features

* add before read hook documentation to base sidecar entity ([18c9a58]())

## [1.419.2]() (2024-10-10)


### Bug Fixes

* correct README.md formatting issues ([705f1ad]())

## [1.419.1]() (2024-10-10)


### Bug Fixes

* acl type issues ([dde6295]())

# [1.419.0]() (2024-10-10)


### Features

* implement ID generation and MQTT messaging on create/update/delete on all entities ([afce367]())

## [1.418.2]() (2024-10-10)


### Bug Fixes

* add seeds directory to list of files that trigger a new deployment of the Cold API ([de44c32]())

## [1.418.1]() (2024-10-10)


### Bug Fixes

* update access control imports and adjust hook methods formatting ([3c7b2ff]())

# [1.418.0]() (2024-10-10)


### Bug Fixes

* add includeNullOrgs to sustainability_attributes entity ([fbf17b2]())
* add new hook classes for various entities ([e3b531f]())
* **create_sidecar.ts:** update GenerateSideCarClass to include additional parameter ([8eeeeed]())
* remove commented-out console.log from winston config ([0baf51b]())


### Features

* add default lifecycle hooks for entity operations ([dc53318]())
* enhance entity hooks generator to support optional base car hooks ([1c85860]())

# [1.417.0]() (2024-10-10)


### Features

* add upcCode fields and refactor ACL policies ([24b24e7]())

## [1.416.2]() (2024-10-10)


### Bug Fixes

* update ACL policies to correctly scope organization IDs ([c888b8d]())

## [1.416.1]() (2024-10-09)


### Bug Fixes

* update logic for finding Tier 2 and Used By suppliers, and let Used By be plural, structured in bubbles ([4e04e27]())

# [1.416.0]() (2024-10-09)


### Bug Fixes

* **design feedback:** don't bold the entity count (e.g. '2 Materials') ([8015fdc]())
* **styling:** make sure that items fill the available space and are left justified when they are few and/or narrow ([a1ac114]())


### Features

* add cards, move Empty state strings back to the tab, etc. (sorry it's not more organized) ([978ab8e]())
* create new sustainabilityAttributeCard component ([8018ef1]())

## [1.415.3]() (2024-10-09)


### Bug Fixes

* issue preventing attribute assurance from being created ([12c1987]())

## [1.415.2]() (2024-10-09)


### Bug Fixes

* simplify metadata assignment in DocumentDetailsSidebar ([0febfd6]())
* update and delete metadata and assurances conditionally ([5dbd6c1]())

## [1.415.1]() (2024-10-09)


### Bug Fixes

* update file type check and optimize save button logic ([ad539cb]())

# [1.415.0]() (2024-10-09)


### Features

* register new queue for file classification in chat module ([0658df5]())

## [1.414.5]() (2024-10-08)


### Bug Fixes

* move `isImage` function to utility module ([2d35030]())

## [1.414.4]() (2024-10-08)


### Bug Fixes

* omit 'extraction_schema' from classification in metadata and refine queue conditionals ([3161f70]())

## [1.414.3]() (2024-10-08)


### Bug Fixes

* enhance content classification rules ([b3e723c]())

## [1.414.2]() (2024-10-08)


### Bug Fixes

* correct metadata classification and add extraction details ([fe6908b]())

## [1.414.1]() (2024-10-08)


### Bug Fixes

* rework classification and extraction services to address REDIS OOM error ([a5591c5]())

# [1.414.0]() (2024-10-08)


### Bug Fixes

* comment out navigation on row click until supplier detail page is ready ([f1999e1]())
* update placeholder text and label for tier input ([5fcfc89]())


### Features

* add feature flag checks for supplier page routes and buttons ([0eedd3f]())
* add id prop and test attributes to ComboBox component ([c03ad00]())
* add new GraphQL queries and update mocks ([a27e3ac]())
* add SupplierRoutes and CreateSupplierPage ([e2b0627]())
* add support for 'attributes' in setCreateModalType ([0df9cc7]())
* ensure supplier list updates on creation ([4fd831a]())
* move loading spinner to header component ([551fb98]())
* rename Material components to Entity components and update interfaces ([93d903c]())

## [1.413.1]() (2024-10-08)


### Bug Fixes

* remove redundant file status check in onRowClick ([64524eb]())

# [1.413.0]() (2024-10-07)


### Features

* add tabs and an empty state for each to sustainability page ([00e465c]())
* create new empty state component with header and body ([1633b71]())

## [1.412.1]() (2024-10-07)


### Bug Fixes

* return additional data in pinecone service and handle image extensions case-insensitively ([5108a9f]())

# [1.412.0]() (2024-10-07)


### Features

* enhance suppliers data grid with products info ([60199cf]())

# [1.411.0]() (2024-10-07)


### Features

* update classification rules for document extraction ([9605762]())

## [1.410.1]() (2024-10-07)


### Bug Fixes

* reorganize schema fields and correct supplier data handling ([7e32913]())

# [1.410.0]() (2024-10-05)


### Bug Fixes

* remove unique constraint on organization_id and style_code ([bbaf7f8]())


### Features

* add MaterialsService for processing materials via OpenAI API ([fd6690e]())
* add new dependencies and update scripts for GraphQL and package manager ([ca44e3a]())
* add new schemas for Bill of Materials and Purchase Orders ([5bb2a98]())
* add products schema, module, and service with OpenAI integration for processing product data ([dbca6e3]())
* add supplier extraction and processing module ([2fb67db]())
* create EntitiesModule with queues for materials, products, and suppliers ([b81b6f9]())

# [1.409.0]() (2024-10-04)


### Bug Fixes

* adjust Input label styles for better alignment ([6bd4eb0]())
* improve header checkbox selection logic in AddToCreateMaterialModal ([73393de]())
* update default sort order for material tables ([0749dd6]())


### Features

* add default sorting to material tables ([f0c5162]())
* add error boundaries to material components ([1de4303]())
* add material creation functionality ([cb0402f]())
* add missing product ID and correct variable naming ([744a3a4]())
* add toolbar quick filter to various material components ([2d71067]())
* adjust padding in comboBox component ([138fc0e]())
* conditionally render 'Add New' button on materials page ([1cd3c82]())
* consolidate add and create material modals, integrate add products feature ([828bef5]())
* disable cancel button when save button is loading ([035f0a1]())
* enhance Modal component and improve product/attribute addition logic ([e9bbee3]())
* export DEFAULT_PAGE constant and update navigation routes ([02d77e1]())
* extract Breadcrumbs component to separate file ([a5f41a4]())
* improve material modal and table value formatting ([8546867]())
* remove 'type' column from material modals and tables ([4ae7f16]())
* remove defaultPage parameter from MaterialRoutes ([8cb7872]())
* remove row click navigation in MaterialsDataGrid component ([097a8fe]())
* reorganize createMaterialPage component directory ([b815ebe]())
* update AddToCreateMaterialModal for checkbox functionality and cleanup ([1377bb6]())
* update material routes to conditionally render based on feature flags ([81a2438]())
* update route conditions for material pages ([cfa0315]())
* update text styles for input component ([5b8fb9a]())

## [1.408.1]() (2024-10-04)


### Bug Fixes

* fix more spots ([d2faebc]())
* navigate to /questionnaires/... instead of /compliance/... ([3778bd3]())

# [1.408.0]() (2024-10-04)


### Features

* add unique constraints and indexes to various tables ([d4f5a24]())

# [1.407.0]() (2024-10-04)


### Features

* add GraphQL service to Docker setup ([e8f1239]())

# [1.406.0]() (2024-10-04)


### Features

* add custom response handler for document upload ([1f74ea5]())
* enhance document upload notifications ([eee298e]())

# [1.405.0]() (2024-10-04)


### Features

* add new (extremely basic) Sustainability page ([7df260a]())
* add new ColdSustainabilityIcon ([84ac0a4]())
* add new Sustainability sidebar item that navigates to sustainability page ([b50819a]())


### Reverts

* roll back sustainabilityAttributeCard (was intended for a future PR) ([b26bc3b]())

# [1.404.0]() (2024-10-03)


### Bug Fixes

* remove padding since icon is already 24p x 24p ([c36e4cd]())


### Features

* add 2 new icons - questionnaire and chart ([03a7503]())
* update sidebar and routes ([cde4d33]())

# [1.403.0]() (2024-10-02)


### Bug Fixes

* add back sorting by display name ([481ae00]())
* default to Cold Climate from the get-go ([4b47dc5]())


### Features

* new parameter on combobox component to define dropdown direction (up or down) ([bc48987]())

# [1.402.0]() (2024-10-02)


### Features

* add supplier relation to products model ([f6288b7]())

## [1.401.1]() (2024-10-02)


### Bug Fixes

* filter suppliers by tier in suppliersDataGrid ([f564cd4]())

# [1.401.0]() (2024-10-02)


### Features

* update entity defaults and migrate to CUIDs ([8a701d2]())

## [1.400.6]() (2024-10-02)


### Bug Fixes

* make certain GraphQL fields optional ([b10235e]())

## [1.400.5]() (2024-10-02)


### Bug Fixes

* make created_at, updated_at, and deleted fields optional ([5668a72]())

## [1.400.4]() (2024-10-02)


### Bug Fixes

* streamline entity default settings via utility functions ([42e359a]())

## [1.400.3]() (2024-10-02)


### Bug Fixes

* set administrator role name in backend initialization ([01bb5b8]())

## [1.400.2]() (2024-10-02)


### Bug Fixes

* **logger:** update winston config version to 1.1.1 ([0523e7c]())

## [1.400.1]() (2024-10-02)


### Bug Fixes

* bug creating facilities ([55b94a7]())

# [1.400.0]() (2024-10-02)


### Features

* add logo url to sustainability attributes ([#580](ssues/580)) ([a670332]())
* add logo_url to sustainability_attributes table ([0a69291]())

## [1.399.5]() (2024-10-01)


### Bug Fixes

* update ProtectedRoute authentication handling to show spinner on logging out ([bbd6baf]())

## [1.399.4]() (2024-10-01)


### Bug Fixes

* undefined organization compliance during create ([4cdcec7]())

## [1.399.3]() (2024-10-01)


### Bug Fixes

* enhance error logging with file context ([211d358]())

## [1.399.2]() (2024-09-30)


### Bug Fixes

* issue related to encrypted PDFs ([c16b6ca]())

## [1.399.1]() (2024-09-30)


### Bug Fixes

* correct argument passed to logError function ([6301f87]())
* handle Axios error correctly in error property ([4a5247f]())
* improve error handling and UI/UX feedback ([65929d2]())
* update auth0AddOn parameters and remove NewSideBar story ([96d18ef]())
* update logout function to include returnTo parameter ([9f8e87e]())

# [1.399.0]() (2024-09-28)


### Bug Fixes

* display object value as is without conversion to lower case and upper case ([3c257c5]())
* refactor getActiveTabElement to use tabs array element ([d8c8049]())


### Features

* add custom width class to MainContent in MaterialsPage ([36a4e7f]())
* **icons:** Update ColdSuppliersNavIcon and ColdMaterialsNavIcon ([d6be0cf]())
* update DataGrid components with unified row and column header height ([5302348]())

## [1.398.2]() (2024-09-26)


### Bug Fixes

* use lodash set for organization compliance properties ([99f412d]())

## [1.398.1]() (2024-09-24)


### Bug Fixes

* correct async handling for file upload mutations ([1d8abd0]())

# [1.398.0]() (2024-09-24)


### Bug Fixes

* update icon import path and wrap ComboBox in a div for width constraint ([cd8348f]())


### Features

* add logging to useGraphQLSWR for query success and error ([fa26cdf]())
* add return type in SWRResponse ([a2eb395]())
* add visibility flag to documents query ([00b6198]())

# [1.397.0]() (2024-09-24)


### Bug Fixes

* hide generated image files by default ([6566add]())


### Features

* integrate PrismaService and handle upload failures ([7d7443a]())

# [1.396.0]() (2024-09-23)


### Bug Fixes

* correct variable assignment for extraction name and schema ([8643c42]())
* refactor schemas to use modular schema patterns ([a473c28]())


### Features

* **app:** extend stall timeout (temporarily till we can implement a more robust solution) ([2b692f1]())

# [1.395.0]() (2024-09-23)


### Features

* add certificate number handling in document details ([a11f3fe]())
* simplify document state type in DocumentsAddAssuranceModal ([cb20e8b]())
* update document table and page layout for better UI ([472f811]())

# [1.394.0]() (2024-09-21)


### Bug Fixes

* adjust date calculation and include expiration date in file records ([660b940]())
* adjust day count calculation in document status display ([89ff433]())
* ensure document sidebar is properly layered in the UI ([dfac365]())
* replace getDateIrrespectiveOfTimeZone with addTZOffset and removeTZOffset ([919a67a]())


### Features

* correct date formatting in DocumentsTable component ([00c63b4]())
* handle non-ISO date strings with local timezone in documents ([46af39e]())
* set default sorting to documentsTable and update filesMock date ([ed8a410]())
* update spacing and dimensions in DocumentsTable ([c1124d7]())

## [1.393.4]() (2024-09-20)


### Bug Fixes

* update instance storage in flightcontrol platform json ([86117a4]())

## [1.393.3]() (2024-09-20)


### Bug Fixes

* update test results classification case in extraction service ([1104dcc]())

## [1.393.2]() (2024-09-20)


### Bug Fixes

* **organization.files.service:** always send metrics and event data regardless of organization type ([720a3b5]())

## [1.393.1]() (2024-09-20)


### Bug Fixes

* Update file metadata on failure ([f502f66]())

# [1.393.0]() (2024-09-20)


### Features

* add pnpm lockfile to cold-graphql app ([d28a1ca]())

# [1.392.0]() (2024-09-20)


### Bug Fixes

* adjust padding and add animation to uploaded file status display ([4154187]())
* remove throttling logic from SWR mutation calls ([31fe415]())


### Features

* enhance ColdMQTTProvider with graphql query mappings for SWR key ([f9f1a1b]())
* enhance documentsTable item display with capitalization and styling ([2156e6a]())
* enhance toast messages to support customizable content and positioning ([e605aa9]())
* highlight processing status in documents table ([3b96925]())
* throttle SWR mutate calls in coldMQTTProvider ([a8801bc]())

## [1.391.11]() (2024-09-20)


### Bug Fixes

* remove unused enum test_changes from Prisma schema ([ccad4fc]())

## [1.391.10]() (2024-09-20)


### Bug Fixes

* remove pnpm sync check for schema.prisma in pre-commit hook ([00ce4ca]())
* update database connection details for import script ([7522e0e]())

## [1.391.9]() (2024-09-20)


### Bug Fixes

* update import command and add pre-commit hooks ([fb35086]())

## [1.391.8]() (2024-09-20)


### Bug Fixes

* hardcode database username in migration workflow ([49196f2]())

## [1.391.7]() (2024-09-20)


### Bug Fixes

* update database migration workflow ([8314e89]())

## [1.391.6]() (2024-09-20)


### Bug Fixes

* set PGSSLMODE in GitHub Actions workflow for database migrations ([48d05a0]())

## [1.391.5]() (2024-09-20)


### Bug Fixes

* correct database environment variable handling ([73d1c0d]())

## [1.391.4]() (2024-09-20)


### Bug Fixes

* correct syntax in GitHub Actions workflow ([d0e7356]())

## [1.391.3]() (2024-09-20)


### Bug Fixes

* **pnpm-lock:** update dependency versions and remove redundant entries ([fdfc23a]())
* **workflow:** remove redundant DATABASE_URL parsing step ([09944f3]())

## [1.391.2]() (2024-09-20)


### Bug Fixes

* remove duplicate hooks and constructor definitions ([0f71004]())

## [1.391.1]() (2024-09-20)


### Bug Fixes

* enhance database config output and add caching to GitHub workflow ([ef764b8]())

# [1.391.0]() (2024-09-20)


### Features

* add BRANCH_NAME environment variable to workflow ([79a497f]())

## [1.390.1]() (2024-09-20)


### Bug Fixes

* update workflow to set DATABASE_URL for different environments ([dbdcc1f]())
* **workflow:** remove DATABASE_URL declaration from migrate-database.yml ([2acf128]())

# [1.390.0]() (2024-09-19)


### Bug Fixes

* improve error handling and messaging in classifyContent method ([b66546e]())
* improve metadata update and error handling for file extraction ([cf8d8dc]())


### Features

* extend MQTT validation schemas with new resource and event types ([04e64e1]())

# [1.389.0]() (2024-09-19)


### Features

* improve document type display formatting ([a7c5c53]())
* replace enums with schema enum lookup for file types ([70a7150]())

## [1.388.1]() (2024-09-19)


### Bug Fixes

* **mqtt:** ensure MQTT client reconnects if not connected ([2094c91]())
* **organization.files:** correct filename encoding handling in S3 upload process ([c2de01f]())

# [1.388.0]() (2024-09-19)


### Features

* update OrganizationFilesType enum ([b57444c]())

# [1.387.0]() (2024-09-19)


### Bug Fixes

* update organization file types and ordering ([63422ec]())


### Features

* integrate GraphQL for materials data and revamp UI for materials page ([61fa096]())
* update valueFormatter and remove unused button code ([1715847]())

# [1.386.0]() (2024-09-19)


### Features

* Add new document types ([#565](ssues/565)) ([351a2c2]())

# [1.385.0]() (2024-09-19)


### Features

* enhance file classification and upload handling ([c21f42e]())
* enhance file classification and upload handling ([384b3a4]())


### Reverts

* Revert "chore: update dependencies in yarn.lock and package.json" ([f409c29]())
* Revert "feat: enhance file classification and upload handling" ([aa67fd1]())

# [1.384.0]() (2024-09-19)


### Features

* add Oeko-Tex Standard 100 sustainability attribute ([46b49e1]())
* add Oeko-Tex Standard 100 to Sustainability Attributes ([#564](ssues/564)) ([22efd60]())

# [1.383.0]() (2024-09-19)


### Bug Fixes

* simplify file state comparison logic ([4cd84ce]())


### Features

* enhance document sidebar assurances handling ([8fcf104]())

# [1.382.0]() (2024-09-18)


### Features

* enhance logging and update entity schema ([bc1c203]())

# [1.381.0]() (2024-09-18)


### Bug Fixes

* fix code indentation in job.consumer.ts ([d053d1d]())


### Features

* integrate MQTT for file updates and classifications ([56d8f2c]())

## [1.380.1]() (2024-09-18)


### Bug Fixes

* streamline logic for extracting file dates ([d190181]())

# [1.380.0]() (2024-09-18)


### Features

* Add unique constraint on `organization_id` and `name` in `materials` table ([c6dbac8]())

# [1.379.0]() (2024-09-18)


### Bug Fixes

* enhance document update logic in modals and sidebars ([843f8a4]())
* update default sustainability attribute to 'None' ([2707ab4]())


### Features

* centralize effective date retrieval logic in utility functions ([87c7585]())
* simplify assurance workflow and streamline date handling in documentsTable ([571a6e4]())

# [1.378.0]() (2024-09-17)


### Bug Fixes

* remove unused imports in seed file ([d0e4fb9]())


### Features

* update seed script for sustainability attributes ([074386d]())

## [1.377.1]() (2024-09-17)


### Bug Fixes

* update classification service to handle unmatched attributes scenario ([da5daf2]())

# [1.377.0]() (2024-09-17)


### Features

* add handling for files without sustainability attributes ([665d55a]())

## [1.376.1]() (2024-09-17)


### Bug Fixes

* update barrelsby command directory path ([d0ff848]())

# [1.376.0]() (2024-09-17)


### Features

* remove classification schema ([0889d03]())
* update types with optional fields and new enums ([97e26e4]())

## [1.375.1]() (2024-09-17)


### Bug Fixes

* make sustainabilityAttribute required in attributeAssurances ([ffa46e9]())

# [1.375.0]() (2024-09-17)


### Features

* add pagination support to fetch all sustainability attributes ([cbc9492]())

## [1.374.2]() (2024-09-17)


### Bug Fixes

* add nullable metadata to Product and make fields optional in AttributeAssurance ([95434c1]())

## [1.374.1]() (2024-09-16)


### Bug Fixes

* **schema:** remove unique constraint from attribute assurances ([274a888]())

# [1.374.0]() (2024-09-16)


### Features

* add unique constraints and modify data extraction logic ([a368756]())

## [1.373.1]() (2024-09-16)


### Bug Fixes

* display percentage with no decimal places ([ea92139]())
* improve sustainability attribute handling and validation ([d6f58a3]())
* update default value for sustainabilityAttribute and related checks ([a64e029]())
* update placeholder text for sustainability attribute selection ([0594578]())

# [1.373.0]() (2024-09-13)


### Bug Fixes

* update webpack config to add entry point and source maps ([3ee8f39]())


### Features

* add enum values and columns to products table ([a9b25cb]())
* add seeding for sustainability attributes ([ad82c3a]())
* add sustainability attributes seeding and refactor compliance dependency chains ([efe468f]())

# [1.372.0]() (2024-09-13)


### Bug Fixes

* change fileTypes to array and adjust ordering logic ([c0834dd]())
* conditionally render DocumentsAddAssuranceModal based on addAssuranceFile state ([d2aa369]())
* improve handling of entity selection and assurance updates in documents modal and sidebar ([ea8d9f9]())


### Features

* add ability to add assurance to documents ([cb01e4d]())
* update ColdApolloProvider with default options for ApolloClient ([54bf927]())
* update document handling and assurance associations ([faea982]())
* update logging in DocumentsPage ([5b7857d]())

## [1.371.6]() (2024-09-12)


### Bug Fixes

* **mqtt-service:** add null check for IoT endpoint in getResolvedSecrets ([76d6ef9]())

## [1.371.5]() (2024-09-12)


### Bug Fixes

* **acl_policies:** update cold:admin policy to use context ([a9d0365]())

## [1.371.4]() (2024-09-12)


### Bug Fixes

* restructure addUserToContext logic and enable admin role setting ([9c1cd0b]())

## [1.371.3]() (2024-09-12)


### Bug Fixes

* refactor entity hooks and improve secret handling ([8c196ab]())

## [1.371.2]() (2024-09-12)


### Bug Fixes

* update flightcontrol.json configuration ([5df8ef3]())

## [1.371.1]() (2024-09-12)


### Bug Fixes

* handle missing secret error with logging and return null ([88e831c]())

# [1.371.0]() (2024-09-12)


### Features

* Add secrets service and update timestamp management ([172dd07]())

# [1.370.0]() (2024-09-11)


### Features

* add sustainability attribute relation to attribute assurances ([cd4b208]())

# [1.369.0]() (2024-09-11)


### Bug Fixes

* add error boundaries to document tables and clean up documents page ([eb4541b]())
* add organization filter to GET_ALL_FILES query ([af87d45]())
* update IDs and improve state handling for document components ([5757143]())


### Features

* add DocumentsHeaderTypes with file categorization in documentsPage ([1ba26f0]())
* add DocumentSuppliersTable and enhance ColdApolloProvider with useEffect ([b6e8caa]())
* update document header types and enhance documents table ([2ace82f]())
* update documentsTable component styles and column definitions ([ee3560d]())

# [1.368.0]() (2024-09-11)


### Features

* add relations to attribute_assurances and clean up hooks ([2854d83]())
* add sustainability attribute relation to attribute assurances ([275267d]())

# [1.367.0]() (2024-09-11)


### Features

* integrate PolicyDefinitionHooks for entity lifecycle management ([4de9ecb]())

## [1.366.1]() (2024-09-11)


### Bug Fixes

* correct acl policies for 'cold:admin' role ([9a48f5e]())

# [1.366.0]() (2024-09-11)


### Features

* drop `organization_attributes` table and associated columns ([7c83a57]())

# [1.365.0]() (2024-09-10)


### Features

* update logging and remove unused imports ([4b12bf2]())

# [1.364.0]() (2024-09-10)


### Features

* add new dependencies for aws-sdk, mqtt, cuid2, and zod ([fe599a3]())

## [1.363.1]() (2024-09-10)


### Bug Fixes

* refactor spacing and add additional metrics and events in compliance service ([1603a18]())

# [1.363.0]() (2024-09-09)


### Features

* add logger module for backend ([49f9946]())

## [1.362.1]() (2024-09-09)


### Bug Fixes

* **backend:** replace ConsoleLogger with WorkerLogger for hook files ([fb5b179]())

# [1.362.0]() (2024-09-09)


### Features

* Add PostgreSQL entities and schema imports ([c719b5f]())

## [1.361.1]() (2024-09-09)


### Bug Fixes

* correct tsconfig, package script, and database config, and rename generator script ([3cd314b]())

# [1.361.0]() (2024-09-09)


### Features

* Extend tsconfig and implement custom logger service ([d1b14f2]())

# [1.360.0]() (2024-09-08)


### Features

* add entity hooks for various models ([ed0b316]())

# [1.359.0]() (2024-09-07)


### Features

* add ACL entity maps for cold-graphql module ([12493e8]())

## [1.358.1]() (2024-09-06)


### Bug Fixes

* remove unused imports and clean up import paths ([b80a2ba]())

# [1.358.0]() (2024-09-06)


### Bug Fixes

* simplify VITE_GRAPHQL_URL configurations in flightcontrol.json ([9450641]())


### Features

* add Apollo Client integration for improved GraphQL handling ([79d5763]())
* add variables parameter to useGraphQLSWR hook ([dd7287f]())
* update Mock Service Worker and refactor API handlers ([6d447e7]())

# [1.357.0]() (2024-09-06)


### Features

* apply access control lists to multiple entities ([225c914]())

# [1.356.0]() (2024-09-06)


### Features

* add metadata to organization entity and schema, update access control for vector records ([44d8960]())

## [1.355.1]() (2024-09-06)


### Bug Fixes

* **prisma-migration.ts:** remove unnecessary ACL annotation ([c72b6e3]())

# [1.355.0]() (2024-09-05)


### Features

* update database schema for attribute assurances ([2436551]())

# [1.354.0]() (2024-09-05)


### Bug Fixes

* allow creation without compliance_defnition_id ([c120f55]())
* change ECS cluster instance size to t2.medium ([aabffe6]())
* correct log level and data format for billing page ([0e50dcf]())
* update VITE_STRIPE_INTEGRATION_URL values ([97e19cd]())


### Features

* add assurance changes to graphQL ([7491beb]())
* add BillingPage component and route ([a219564]())
* add buildType attribute to flight control platform configurations ([f88b0ad]())
* add cold-platform-stripe application ([17095d5]())
* add supplier tier column to organization facilities table ([75163ed]())
* enhance AppService with logging and extend BaseWorker ([eb754cd]())
* integrate Stripe embedded checkout on the Billing page ([b28cc12]())
* refactor and expand Stripe service functionality ([f542830]())

## [1.353.2]() (2024-09-05)


### Bug Fixes

* change ECS cluster instance size to t2.medium ([04c21dc]())

## [1.353.1]() (2024-09-05)


### Bug Fixes

* update VITE_STRIPE_INTEGRATION_URL values ([ae6d77b]())

# [1.353.0]() (2024-09-05)


### Features

* add buildType attribute to flight control platform configurations ([4113e44]())

# [1.352.0]() (2024-09-05)


### Bug Fixes

* correct log level and data format for billing page ([a2dbf4d]())


### Features

* add BillingPage component and route ([db84530]())
* add cold-platform-stripe application ([c256d1c]())
* enhance AppService with logging and extend BaseWorker ([9b8fbb0]())
* integrate Stripe embedded checkout on the Billing page ([80fe74c]())
* refactor and expand Stripe service functionality ([f774764]())

## [1.351.6]() (2024-09-05)


### Bug Fixes

* rename organization_files_id to organization_file_id ([9826201]())

## [1.351.5]() (2024-09-04)


### Bug Fixes

* allow creation without compliance_defnition_id ([44bbd60]())

## [1.351.4]() (2024-09-04)


### Bug Fixes

* **prisma:** correct field naming inconsistencies in organization relationships ([8e56548]())

## [1.351.3]() (2024-09-04)


### Bug Fixes

* correct organization files field naming and validation logic ([eeddbc0]())

## [1.351.2]() (2024-08-30)


### Bug Fixes

* **flightcontrol:** remove obsolete domain field from cold-api-ec2 configuration ([3fcf50d]())
* remove obsolete domain field from flightcontrol.json ([a886cdb]())

## [1.351.1]() (2024-08-30)


### Bug Fixes

* update API service IDs for production and staging environments ([b4eee63]())

# [1.351.0]() (2024-08-30)


### Bug Fixes

* correctly parse and use database URL for connection ([6193da5]())


### Features

* add access control lists to entities ([2b4bbbe]())
* add public_acl policy for user roles ([046ae6b]())
* update maxAliases limit and auth setup in backend configuration ([0427aaf]())

# [1.350.0]() (2024-08-29)


### Features

* update flightcontrol configurations for cold-api deployment ([44f8063]())

# [1.349.0]() (2024-08-29)


### Features

* add new configurations for cold-graphql and cold-graphql-ui in flightcontrol.json ([9c3891e]())

# [1.348.0]() (2024-08-29)


### Features

* add buildType field to flightcontrol.json ([2d3ec62]())

## [1.347.4]() (2024-08-29)


### Bug Fixes

* **flightcontrol.json:** update build setup to use custom Docker configuration ([a887877]())

## [1.347.3]() (2024-08-29)


### Bug Fixes

* update dependencies in pnpm-lock.yaml to latest versions ([af27116]())

## [1.347.2]() (2024-08-29)


### Bug Fixes

* update dependencies and adjust OrganizationFacility entity formatting ([43bf795]())

## [1.347.1]() (2024-08-29)


### Bug Fixes

* **config:** update build commands to improve build process efficiency ([5b79eed]())

# [1.347.0]() (2024-08-29)


### Features

* update backend and frontend dependencies, remove unused code ([fa70148]())

## [1.346.7]() (2024-08-29)


### Bug Fixes

* **nx.json:** remove redundant build dependency ([77ba8cf]())

## [1.346.6]() (2024-08-29)


### Bug Fixes

* increase EC2 instance storage from 60 to 120 in flightcontrol.json ([73e1700]())

## [1.346.5]() (2024-08-29)


### Bug Fixes

* remove unnecessary watch paths from flightcontrol.json ([89ca277]())

## [1.346.4]() (2024-08-29)


### Bug Fixes

* **database.config.ts:** correct regex pattern for PostgreSQL URL parsing ([d3801a4]())

## [1.346.3]() (2024-08-29)


### Bug Fixes

* Update configuration to support Dockerfile environment variable injection ([48ab0f5]())

## [1.346.2]() (2024-08-29)


### Bug Fixes

* update watchPaths in flightcontrol.json ([9c25924]())

## [1.346.1]() (2024-08-29)


### Bug Fixes

* update watch paths in flightcontrol.json ([94a6c76]())

# [1.346.0]() (2024-08-29)


### Features

* update flight control configuration for watch paths and environment variables ([4c4bba8]())

# [1.345.0]() (2024-08-29)


### Features

* update flight control configuration for watch paths and environment variables ([3bda7ca]())

## [1.344.5]() (2024-08-29)


### Bug Fixes

* reduce memory allocation for multiple services ([baf671c]())

## [1.344.4]() (2024-08-29)


### Bug Fixes

* adjust resource allocations and scaling parameters in flightcontrol.json ([7ea802b]())

## [1.344.3]() (2024-08-29)


### Bug Fixes

* update instanceStorage for CI ([86c108e]())

## [1.344.2]() (2024-08-28)


### Bug Fixes

* update build and start commands in flightcontrol.json ([6896a90]())

## [1.344.1]() (2024-08-28)


### Bug Fixes

* remove ApplyAccessControlList annotation and update imports ([ea67c08]())

# [1.344.0]() (2024-08-28)


### Features

* update resource allocations and config settings ([a2f2c73]())

# [1.343.0]() (2024-08-28)


### Features

* add ACL and modify entities ([ca53cce]())

## [1.342.1]() (2024-08-28)


### Bug Fixes

* update introspection configuration and clean up imports ([7a67f32]())

# [1.342.0]() (2024-08-28)


### Features

* setup backend with Graphweaver and AuthZero ([868c359]())

## [1.341.8]() (2024-08-28)


### Bug Fixes

* add debugging commands to build and start scripts ([9b2f0be]())

## [1.341.7]() (2024-08-28)


### Bug Fixes

* update build and start commands for debugging ([88abbf1]())

## [1.341.6]() (2024-08-28)


### Bug Fixes

* update install command to enable corepack for pnpm ([373649a]())

## [1.341.5]() (2024-08-28)


### Bug Fixes

* update flightcontrol.json with correct paths and build commands ([d10d3c5]())

## [1.341.4]() (2024-08-28)


### Bug Fixes

* add basePath to cold-api in flightcontrol.json ([42edc73]())

## [1.341.3]() (2024-08-28)


### Bug Fixes

* update install and base path in flightcontrol.json and clean dependencies in package.json ([5e2378b]())

## [1.341.2]() (2024-08-28)


### Bug Fixes

* update install command and add new environment variables ([db5ab42]())

## [1.341.1]() (2024-08-28)


### Bug Fixes

* update EC2 instance sizes in flightcontrol configuration ([443c374]())

# [1.341.0]() (2024-08-28)


### Bug Fixes

* update EC2 instance sizes in flightcontrol configuration ([e8bbb5c]())
* update flight control configuration ([5f0e34f]())


### Features

* add new npm commands for install, build, and start in flightcontrol.json ([50d5d75]())
* configure instance size for CI in flightcontrol.json ([7dc1a01]())

## [1.340.3]() (2024-08-28)


### Bug Fixes

* enable vertical scrolling on documents page ([184cf0d]())

## [1.340.2]() (2024-08-28)


### Bug Fixes

* handle undefined borderRadius and add TODO comment ([3010a19]())

## [1.340.1]() (2024-08-28)


### Bug Fixes

* **tsconfig:** update exclude patterns to exclude react library files ([94f51ec]())

# [1.340.0]() (2024-08-28)


### Features

* remove cold-graphql configuration ([fc64c92]())

## [1.339.1]() (2024-08-28)


### Bug Fixes

* update flightcontrol target and commands ([b3dd0c5]())

# [1.339.0]() (2024-08-28)


### Features

* update flight control configuration for cold-graphql ([a94a77a]())

## [1.338.2]() (2024-08-28)


### Bug Fixes

* adjust instance configurations and resource allocations ([85506af]())

## [1.338.1]() (2024-08-27)


### Bug Fixes

* correct service name and update configuration paths ([75557f9]())

# [1.338.0]() (2024-08-27)


### Features

* add XLSX file extraction service with PDF conversion and upload to S3 ([e6616e0]())

## [1.337.4]() (2024-08-26)


### Bug Fixes

* **pinecone.service:** add null checks and improve error handling in uploadData method ([ed83d18]())

## [1.337.3]() (2024-08-24)


### Bug Fixes

* refine date extraction and schema descriptions ([338a8c2]())

## [1.337.2]() (2024-08-24)


### Bug Fixes

* enhance file classification in chat service ([9ef04da]())
* handle date parsing errors and refine response format ([f7723f9]())
* improve file processing for various content types ([e530de1]())

## [1.337.1]() (2024-08-24)


### Bug Fixes

* **chat.service:** add missing await for async operations ([30ece5a]())

# [1.337.0]() (2024-08-24)


### Bug Fixes

* **crawler:** update method calls to getIndexDetails and getIndex ([28bd3c1]())
* **events:** refactor sendIntegrationEvent to simplify orgId handling ([f78b06c]())
* include organization in compliance service requests ([4312065]())
* include organization in integration events ([8d96856]())
* **job.consumer:** remove unnecessary organization name parameter in deleteFileJob ([7965574]())
* **organization.controller:** simplify organization deletion logic ([75a8e16]())
* **organization.service:** correct parameter passed to sendIntegrationEvent function ([8858695]())
* update index retrieval and add document classification methods ([be1bb11]())
* update organization handling in Rabbit service ([f535a89]())
* use correct variable name for organization in integrations service ([e03c4ee]())


### Features

* add classification endpoints to trigger extraction on existing files ([cbe9be4]())
* enhance activation process with organization data ([b41827c]())
* enhance classification and extraction with organization context ([f313349]())

# [1.336.0]() (2024-08-23)


### Bug Fixes

* correct uploadStreamToS3 function parameter type ([b32d07b]())
* ensure orgId parameter starts with 'org_' in org-user-interceptor service ([7f3fbef]())
* **logging:** initialize DarklyService during onModuleInit ([6b58460]())


### Features

* add bluesign schema for certificate extraction ([d6b0900]())
* add classification schema for document extraction ([75f14c4]())
* add default extraction schema for unknown document types ([4ea7591]())
* add default platform integrations on organization creation ([8eab6f2]())
* add default policy schema for extraction module ([fe4abc1]())
* add default statement schema for document extraction ([3a821c0]())
* add default test schema for extraction ([b3d74df]())
* add ExtractionModule to AppModule ([476b8f8]())
* add ExtractionModule to cold-platform-openai app ([122dd7f]())
* add ExtractionModule to CrawlerModule ([5f6b759]())
* add ExtractionService for AI-based content classification and data extraction ([41f8a75]())
* add global.schema.ts for extraction module ([4135a2f]())
* add Integrations enum value ([4267bdd]())
* add interceptor to organization files controller and adjust delete test orgs logic ([a37059c]())
* add intertek.schema.ts to facility extraction from test documents ([d87d2bf]())
* add metadata column to organization_files table ([fbbc309]())
* add schema for default certificate ([e69b97b]())
* add schema for TUV Rheinland documents ([71fd8b8]())
* add SGS schema for test document extraction ([02af502]())
* add wrap schema definition for certificate extraction ([a8aff80]())
* enhance PDF handling in langchain loader service ([3eb199c]())
* integrate ExtractionService and S3Service for PDF content handling ([489c250]())

# [1.335.0]() (2024-08-20)


### Bug Fixes

* replace logError with logBrowser, adjust compliance set loading background ([0d8c356]())
* replace logError with logBrowser, adjust compliance set loading background ([5e0925b]())



### Features

* add supplier removal functionality for materials ([7787e8a]())

## [1.334.4]() (2024-08-19)


### Bug Fixes

* remove sensitive payload logging and correct metrics field name ([a5a856b]())

## [1.334.3]() (2024-08-19)


### Bug Fixes

* update tag attributes in chat service ([e273bb6]())

## [1.334.2]() (2024-08-19)


### Bug Fixes

* improve compliance retrieval and creation logic to handle missing compliance definitions ([163419b]())

## [1.334.1]() (2024-08-19)


### Bug Fixes

* correct metrics increment and alert source type handling ([1ab4ad7]())
* simplify job processing logic in job.consumer.ts ([a209cf7]())

# [1.334.0]() (2024-08-19)


### Bug Fixes

* update compliance activation endpoints and improve UI scrolling ([f434fcf]())


### Features

* add data-chromatic attribute to newsItem component ([cc60ec4]())
* Delete complianceOverview components and redundant logic ([07248e7]())
* Refactor compliance data fetching in ComplianceQuestionnaire ([d2d8dac]())
* Refactor compliance-related components to streamline data retrieval ([146ad7f]())
* Remove assessments context and related components ([0e0f551]())
* Remove compliance wizard lair and related components ([3b9e4f9]())

# [1.333.0]() (2024-08-16)


### Bug Fixes

* **chat.service:** correct log message to include section and item keys ([5046aa7]())
* **mqtt.validator.service:** adjust user field validation in MqttUIPayloadSchema to allow any type values ([76437fb]())
* replace `any` type with `IRequest` in ComplianceSectionsController ([b06c757]())
* update IRequest type for compliance question bookmark controller methods ([5f0b1c1]())
* update Request type to IRequest in EventService ([0a02f75]())


### Features

* add DD_ENV environment variable to development run configuration ([d280b22]())
* add delete supplier material endpoint ([425e2e1]())
* add deleteSupplierMaterial method to materials.service ([18f0824]())
* add IRequest interface for request handling ([9f28fcc]())
* add method to remove material supplier from organization ([509f3d1]())
* export request.interface in primitives interfaces ([17eaca7]())
* replace `any` with `IRequest` in policy services and controller ([1050074]())
* update compliance section groups to use IRequest interface ([c6a4009]())
* update IRequest type for compliance response controllers ([28be455]())
* update organization claims controller to use IRequest interface ([ab9aa5d]())
* update request type to IRequest in invitations service and controller ([5bcf82b]())
* update request type to IRequest in news service methods ([567de89]())
* update request type usage in organization compliance notes ([ed4a301]())

# [1.332.0]() (2024-08-16)


### Features

* add deleteSupplierMaterial method to materials.service ([446f8f6]())

# [1.331.0]() (2024-08-16)


### Features

* add unique constraint for material_suppliers on material_id and supplier_id ([d565342]())

# [1.330.0]() (2024-08-16)


### Features

* Add metric collection to compliance note operations ([ccc4528]())
* add metrics and event logging for compliance question bookmarks ([ae76b2c]())
* Add metrics and events tracking for file operations ([7a56376]())
* add metrics logging for AI responses creation ([5b927b8]())
* add metrics logging to claims_repository methods ([43f32bf]())
* add metrics tracking for compliance responses repository ([6506629]())
* add metrics tracking to organization compliance operations ([f8ee5f1]())
* add sendMetrics method to worker class ([e398b24]())
* enhance organization compliance status creation with metrics tracking ([5d7094a]())
* update organization claims view ([ca5df70]())

# [1.329.0]() (2024-08-15)


### Features

* add functionality to associate suppliers to materials ([339edb3]())
* add POST handler for supplier materials in mock API ([35d3f02]())
* add supplier action column to MaterialDetail component ([83ad4d0]())

## [1.328.1]() (2024-08-15)


### Bug Fixes

* adjust layout, routing, and button properties for enhanced functionality ([d802086]())

# [1.328.0]() (2024-08-14)


### Bug Fixes

* allow `text` to be either string array or string in compliance interface ([a3baa59]())
* handle non-array text properly in AiReferenceDropdown ([780c4aa]())
* remove unnecessary tab condition check ([7e2999a]())
* remove unused import in aiReferenceDropdown.tsx ([107753a]())


### Features

* add material detail mock and handler APIs ([708ea59]())
* Add Material Detail Sidebar and MuiDataGrid components and refine materials data management ([1c9f60c]())
* add MaterialDetail page and remove flag for MaterialsPage route ([8a01ece]())
* dynamically update tabs based on compliance name ([c4eeb41]())
* update routes for materials and suppliers ([66537d8]())

## [1.327.1]() (2024-08-13)


### Bug Fixes

* typecast routing_key to string in organization integrations service ([18c7019]())

# [1.327.0]() (2024-08-13)


### Bug Fixes

* **app.module:** replace CertificationsModule with ClaimsModule ([d8b3ce5]())
* **claims_repository:** correct id prefix and error messages for createClaim method ([7aca483]())
* correct method and parameter names in claims service ([c0a1502]())
* correct module and service references in ClaimsModule ([1137280]())
* improve validation for optional fields in organization claims ([3855b52]())
* **prisma:** correct field name for organization_claims in schema ([a6a6421]())
* rename certification_claim to organization_claims to correct schema field name ([bd92159]())
* update organization claims endpoint path ([2447cbc]())


### Features

* add claims service for handling certification operations ([7026088]())
* Add custom comparator and filter operators for DataGrid ([b1c1458]())
* Add materials page with data grid and related components ([97705e9]())
* add OrganizationClaimsModule to cold-api project ([550310c]())
* add unique constraint to claims table and create various indexes ([d61c199]())
* **claims:** refactor ClaimsController to use correct ClaimsService reference ([f6816d1]())
* Enable Materials Page with Feature Toggle ([616f173]())
* export claims module in nest library ([1f5c4cc]())
* remove certification_types enum ([e04278c]())
* remove CertificationsService from cold-api ([f372b39]())
* rename and restructure claims tables ([48405c9]())
* Rename supplier comparator and adjust DataGrid styling. ([88f93ee]())
* update claim structure and rename indexes ([d8747a1]())
* Update documentsPage component to ignore Chromatic UI testing ([0e483fd]())
* update OpenAPI examples and survey structure ([5252586]())

# [1.326.0]() (2024-08-08)


### Features

* Add custom comparator and filter operators for DataGrid ([2fbe814]())
* Add materials page with data grid and related components ([5f23586]())
* Enable Materials Page with Feature Toggle ([e44bb91]())
* Rename supplier comparator and adjust DataGrid styling. ([726bb8e]())
* Update documentsPage component to ignore Chromatic UI testing ([7561339]())

# [1.325.0]() (2024-08-07)


### Features

* Add materials interface and update document details sidebar ([357512c]())
* Refactor and add claims to document details sidebar ([c6a3501]())
* Refactor and update document details components. ([cfc180e]())

## [1.324.2]() (2024-08-06)


### Bug Fixes

* update material repository and schema to handle supplier relations and errors ([c5cf196]())

## [1.324.1]() (2024-08-06)


### Bug Fixes

* enhance materials repository to include detailed supplier and material selection ([d4dafde]())

# [1.324.0]() (2024-08-06)


### Bug Fixes

* add missing createSupplierMaterial method in materials.service ([b4a752b]())
* enhance materials controller with authentication, roles, and error handling ([a7f7fd1]())
* update route parameter name for file update endpoint ([2a7e9b7]())
* validate material and supplier existence before creating material_suppliers ([e594d81]())


### Features

* update OpenAPI schema examples and add new paths for organization files ([18ada17]())

# [1.323.0]() (2024-08-06)


### Features

* enhance organization file service to include materials and products ([119d4a3]())

## [1.322.1]() (2024-08-06)


### Bug Fixes

* include 'facility' in organization files service ([e364ff1]())

# [1.322.0]() (2024-08-05)


### Features

* create views for organization claims, suppliers, and compliance responses ([aed4677]())

# [1.321.0]() (2024-08-05)


### Features

* Add document download functionality ([9ec05a3]())

# [1.320.0]() (2024-08-05)


### Features

* Add estimated_score to compliance mock and interfaces ([47d793a]())
* Update ai_score to estimated_score in SpiderChart ([68054d8]())

# [1.319.0]() (2024-08-05)


### Features

* Add compliance activation and loading state handling ([be9fe74]())

# [1.318.0]() (2024-08-05)


### Features

* Add delete document functionality ([ff82d33]())
* Add deleteFile prop to DocumentDetailsSidebar ([4528ad6]())
* Add DocumentDetailsMenu component to document details sidebar ([0b605e7]())
* Refactor sidebar focus and hover styles. ([a3b4686]())

# [1.317.0]() (2024-08-05)


### Features

* Add document upload button to Documents page ([265428a]())

# [1.316.0]() (2024-08-03)


### Bug Fixes

* correct command used for generating signed URL in S3 service ([d895698]())
* update API tags in organization.files.controller.ts ([a0d5622]())


### Features

* add customizable expiration time for signed URL generation ([32c473d]())
* add endpoint to get file URL in organization files controller ([bd6a5d1]())
* add getUrl method to organization.files.service ([e8e946d]())
* add MaterialsRepository to MaterialsModule ([9a52663]())
* **materials:** update controller to handle organization and supplier contexts ([465a240]())

# [1.315.0]() (2024-08-03)


### Bug Fixes

* add validation for compliance definition during organization compliance creation ([ca6d310]())
* allow nullable dates in organization files update method ([940b230]())
* **compliance-question-bookmarks:** add null checks for compliance questions ([d374b15]())
* correct import path for ProductsRepository ([a8cd156]())
* handle missing compliance definition name in section groups creation ([513693d]())
* handle missing compliance_definition_id in questions ([0529cea]())
* **organization.service:** disable dynamic-org-white-list synchronization ([2decdef]())
* **products.repository:** correct organization field used in queries ([40d7c6f]())
* remove unnecessary check for Organization Facility ID ([87b0292]())
* resolve compliance definition ID from name if not provided ([5cf949d]())
* update compliance claims repository to use organization_id instead of organization_name ([666498f]())
* update compliance claims repository to use organization_id instead of organization_name ([8e7ed60]())
* update Prisma schema with optimized indices and model relationships ([1d2a898]())


### Features

* add materials repository and module ([0079e87]())
* add MaterialsModule to organization module ([b90388d]())
* add multiple indexes to enhance query performance in various tables ([85be564]())
* add new Material and MaterialSupplier enums to compliance enums list ([e860df3]())
* include additional fields in supplier repository select ([59068d7]())
* update database schema for GraphQL compliance ([c397b6f]())
* update product and material models ([c84b4f0]())
* update product and material models ([b887ce6]())
* update schema to support GraphQL implementation ([41c2272]())

# [1.314.0]() (2024-08-02)


### Bug Fixes

* update SQL view for compliance responses ([5f689a5]())


### Features

* add materials repository and module ([0079e87]())
* add MaterialsModule to organization module ([b90388d]())
* add new Material and MaterialSupplier enums to compliance enums list ([e860df3]())

# [1.314.0-cold-919.2]() (2024-08-03)


## Bug Fixes

* add validation for compliance definition during organization compliance creation ([ca6d310]())
* allow nullable dates in organization files update method ([940b230]())
* **compliance-question-bookmarks:** add null checks for compliance questions ([d374b15]())
* handle missing compliance definition name in section groups creation ([513693d]())
* handle missing compliance_definition_id in questions ([0529cea]())
* **organization.service:** disable dynamic-org-white-list synchronization ([2decdef]())
* **products.repository:** correct organization field used in queries ([40d7c6f]())
* resolve compliance definition ID from name if not provided ([5cf949d]())
* update compliance claims repository to use organization_id instead of organization_name ([666498f]())
* update compliance claims repository to use organization_id instead of organization_name ([8e7ed60]())
* update Prisma schema with optimized indices and model relationships ([1d2a898]())


### Features

* add multiple indexes to enhance query performance in various tables ([85be564]())
* update database schema for GraphQL compliance ([c397b6f]())
* update product and material models ([c84b4f0]())
* update schema to support GraphQL implementation ([41c2272]())

# [1.314.0-cold-919.1]() (2024-07-31)

* Enhance popper behavior in DocumentDetailsSidebar ([2095f96]())
* Refactor route structure and add feature toggle for documents ([4367af9]())
* Refactor routes and document handling, update layouts ([19674fa]())
* Shrink close and ellipsis icons in sidebar. ([7207100]())
* Update dashboard layout, organization files, and document page ([40d7895]())
* Update documents routing and add MUI date picker ([ac6e03b]())

## [1.313.4]() (2024-07-30)



### Bug Fixes

* add estimated_score to compliance responses ([fd80249]())

## [1.313.3]() (2024-07-30)


### Bug Fixes

* **scoring:** correct score calculation logic for AI and org responses ([2598a70]())

## [1.313.2]() (2024-07-30)


### Bug Fixes

* update file patch endpoint to include file ID ([2d8cdd3]())

## [1.313.1]() (2024-07-30)


### Bug Fixes

* make 'country' field optional in organization_facilities ([df86033]())

# [1.313.0]() (2024-07-30)


### Features

* Add delete supplier functionality ([38c6aa4]())

# [1.312.0]() (2024-07-30)


### Features

* Add save functionality to supplier details page ([674e7f7]())
* Refactor toaster component implementation and usage. ([591c553]())

## [1.311.1]() (2024-07-30)


### Bug Fixes

* **prisma.service:** enhance error logging with Datadog integration and remove redundant log handlers ([4e48aa1]())

# [1.311.0]() (2024-07-26)


### Features

* add file update functionality in organization files module ([cc0f9f9]())

# [1.310.0]() (2024-07-26)


### Features

* Add error boundary to SupplierDetail component ([6c41258]())
* Add padding to supplier detail sidebar ([b39a6fa]())
* Add Storybook story for SupplierDetailSidebar component ([56a9bf6]())
* Add supplier detail page and data grid components ([75f3f77]())
* Disable column menu in supplier documents table ([1c15f94]())
* Fix enum reference for CertificationStatus and add Storybook ([4d9e70b]())
* Refactor Supplier Components and Implement New Logic ([4fd44ef]())
* Remove deprecated ClaimType enum ([5e9c02d]())
* Remove unimplemented onRowClick handler ([ffaceb0]())
* Rename and style supplierDetailSidebar component ([849cc3e]())

## [1.309.1]() (2024-07-26)


### Bug Fixes

* **seeds:** conditionally upsert compliance definitions based on environment ([842fbc8]())

# [1.309.0]() (2024-07-26)


### Features

* add facility delete and patch endpoints to openapi.json and update sample survey schema examples ([5786261]())
* add update and delete methods to facilities service ([4086956]())
* enhance FacilitiesController with delete and update actions ([a24abb1]())

## [1.308.1]() (2024-07-25)


### Bug Fixes

* **compliance:** comment out schema validation in create and update methods ([9d03874]())
* enhance validation and error handling in createCertificationClaim method ([4f12d82]())

# [1.308.0]() (2024-07-25)


### Features

* Navigate to home on organization selection ([c05e4b0]())
* Sort organizations alphabetically in selector ([6bf52d1]())

## [1.307.1]() (2024-07-24)


### Bug Fixes

* **suppliers.repository.ts:** correct property name from organization_file_type to type ([04e2560]())

# [1.307.0]() (2024-07-24)


### Features

* add organization_file_type to suppliers repository ([5d57e76]())

# [1.306.0]() (2024-07-24)


### Features

* Add autoHeight property to suppliersDataGrid ([7c14838]())
* Add custom no-rows overlay to MUI DataGrid ([f7c961b]())
* Add Suppliers interface and update SuppliersDataGrid ([59f388f]())
* Refactor supplier components and update certification handling ([a30bcd2]())
* Refactor suppliersDataGrid to use mock data ([535f8b5]())
* Update UI with new icons and MUI integration ([6fa8ea7]())

## [1.305.1]() (2024-07-24)


### Bug Fixes

* improve error handling and add new field to supplier query ([010aec2]())

# [1.305.0]() (2024-07-24)


### Features

* add effective date fields to supplier repository ([4969236]())
* extend organization files service to include effective dates ([807b242]())

# [1.304.0]() (2024-07-24)


### Features

* Add effective start and end dates to organization_files ([93642b1]())
* Add extended file details to organization files API ([46af359]())

# [1.303.0]() (2024-07-24)


### Features

* Add certification id to claims controller ([71987e9]())
* Add file validation and handling conflict exceptions in ComplianceCertificationsClaimsRepository ([48a5ad8]())
* Add file validation and handling conflict exceptions in ComplianceCertificationsClaimsRepository ([0ce4db3]())
* Add getClaimNames and getClaimList methods in suppliers.controller ([37e307d]())
* Add SQL views and modify prisma schema ([8196715]())
* Enhance suppliers.repository and suppliers.service ([f5ab365]())

# [1.302.0]() (2024-07-22)


### Bug Fixes

* commonJS error in running seed scripts ([7dcb677]())


### Features

* Update `esbuild` packages to v0.20.2 ([a702ad0]())

## [1.301.1]() (2024-07-22)


### Bug Fixes

* issues with OpenAPI spec ([a14a215]())

# [1.301.0]() (2024-07-22)


### Bug Fixes

* incorrect entry in controller array ([5b92440]())


### Features

* Update providers and exports in ClaimsModule ([f1a3cfc]())

# [1.300.0]() (2024-07-22)


### Bug Fixes

* add null check for additional_context in chat service ([35dd286]())
* add role restrictions to update and remove certifications ([81c2ccd]())
* Update certifications.repository.ts to improve error handling ([433e822]())


### Features

* add '[@ogma]()' packages and update related config files ([1172994]())
* Add 'Claims' to compliance enums ([122eace]())
* Add Certification entity ([52cc105]())
* Add Certifications controller ([9c6cce3]())
* Add Certifications module ([9dd715c]())
* Add Certifications Repository in Nest Library ([640fa29]())
* Add CertificationsModule to AppModule ([37c7078]())
* add CertificationsService to handle certifications ([7d6ca57]())
* Add claims service in certifications module ([459c1a1]())
* Add ClaimsModule in certifications ([d5c387a]())
* Add ClaimsModule to CertificationsModule ([fecb181]())
* Add Compliance Certification Repository for Nest App ([9fd1745]())
* Add ComplianceCertificationClaimsRepository ([2340f8a]())
* Add dev mode to worker log service ([521a1c7]())
* Add logging exports to nest lib index ([14edbcd]())
* Add new claims controller in certifications module ([74de42b]())
* Add SuppliersModule in resources ([60e56f2]())
* Add SuppliersModule to Organization module ([cb5a5e4]())
* Add SuppliersRepository in nest lib ([ae8aba0]())
* Added DTOs for creating and updating Certifications ([3e0c98a]())
* Added guards, interceptors, and decorators in certifications controller ([f6dc566]())
* Added new SuppliersController for organization suppliers ([2724ea9]())
* Create new Suppliers Service in organizations module ([4b3ba06]())
* Enhance claims controller with guards, interceptors, filters, and role permissions ([a08b055]())
* Modify certifications schema and add unique migration ([a5b454a]())
* Refactor CertificationsService to use CertificationRepository ([edee10a]())
* Remove certification-related entities and DTOs ([3b0d864]())
* Remove unnecessary fields from schema and migration ([4756c94]())
* Update certifications module in cold-api ([69e1181]())
* update claims service operations ([1ed9f95]())
* Update prisma schema and migrations for claim dates and data types ([daf88bf]())
* Update roles in certifications.controller ([d04e6ee]())

# [1.299.0]() (2024-07-18)



### Features

* Update code for handling compliance section updates ([49fbccf]())

## [1.298.2]() (2024-07-18)



### Bug Fixes

* add checking for organization compliance in compliance-definitions repository ([5c19b12]())
* add checking for organization compliance in compliance-definitions repository ([#503](ssues/503)) ([37bf7eb]())

## [1.298.1]() (2024-07-18)


### Bug Fixes

* create question / dependency chain flow ([e90c89b]())

# [1.298.0]() (2024-07-18)


### Features

* Replace home route with compliance route ([1e984f5]())

# [1.297.0]() (2024-07-18)


### Features

* Sort compliance sets by title ([f7fcc5c]())

# [1.296.0]() (2024-07-17)


### Features

* Add CreateProductDto class ([1f5f96c]())
* Add new Product entity file ([8b1622f]())
* add ProductsController in the organizations module ([04be8ca]())
* Add ProductsRepository in organizations ([ae326c6]())
* add ProductsService to platform modules ([3f92816]())
* Add UpdateProductDto in products module ([d295e32]())
* Added new compliance types to utility enums ([83d8f77]())
* Added new Products module ([2ac4207]())
* Extend PrismaClient and enhance PrismaService ([43b3eea]())
* Migrate organization suppliers to view ([e4a8c06]())
* Moved ProductsRepository under compliance module ([40e813a]())
* Update Prisma migration to remove organization suppliers and related columns ([301f9b5]())

# [1.296.0-cold-902.1]() (2024-07-17)


### Features

* Add CreateProductDto class ([1f5f96c]())
* Add new Product entity file ([8b1622f]())
* add ProductsController in the organizations module ([04be8ca]())
* Add ProductsRepository in organizations ([ae326c6]())
* add ProductsService to platform modules ([3f92816]())
* Add UpdateProductDto in products module ([d295e32]())
* Added new compliance types to utility enums ([83d8f77]())
* Added new Products module ([2ac4207]())
* Migrate organization suppliers to view ([e4a8c06]())
* Update Prisma migration to remove organization suppliers and related columns ([301f9b5]())

# [1.295.0]() (2024-07-17)


### Features

* Update organization compliance response Rabbit processing ([19bf2d6]())

## [1.294.1]() (2024-07-16)


### Bug Fixes

* Deprecate compliance-definitions.findOrgCompliances() method and comment out cache set functionality ([2b30bd4]())

# [1.294.0]() (2024-07-16)


### Features

* add bpc query parameter to getComplianceResponsesCounts ([e37ebb6]())
* Add new SQL view for compliance response ([5b3f8f3]())
* Add supplier boolean to organization_facilities table ([0190a3c]())
* Adjust getContext sensitivity in chat controller ([1ff2cbe]())
* Drop compliance_responses table in Prisma ([176a3c5]())
* Improve chat service error handling and question retrievals ([178eaed]())

# [1.293.0]() (2024-07-16)



### Features

* Add initial supplier product certification models ([9fc9093]())

# [1.292.0]() (2024-07-15)



### Features

* Add 'Suppliers' component to seed definitions ([b8509f1]())
* Add Suppliers page and associated icon ([c79d01f]())



# [1.291.0]() (2024-07-12)


### Bug Fixes

* Add unique key to SideBarCollapse items ([8a05a83]())


### Features

* Add class-validator to complianceManager ([fd3daa6]())
* Add key prop to tab in QuestionnaireDetailSidebar ([0e92ef0]())
* Add summary field to compliance questions ([43d3461]())
* Change scrolling behavior to 'instant' in questionnaire ([cd3b52f]())
* Update logging placement and conditions in questionnaire components ([2d1344b]())

# [1.290.0]() (2024-07-11)


### Features

* Update cache settings in organization_compliance_responses controller ([1af1ff0]())

# [1.289.0]() (2024-07-11)


### Features

* Add error handling for Axios requests in components ([723d992]())
* Exclude compliance sections and section groups with max_score of 0 ([a59b74f]())
* Increase minimum and maximum width of ratio div ([80f5497]())
* Refactor compliance manager components and improve error handling ([5ecb022]())
* Update alignment in complianceManagerPreviewDetailGraphCard ([0bc525a]())
* Update calculation and tooltip display in SpiderChart ([1ee89c8]())
* Update lodash utilization and numeric formatting ([7aa378a]())
* Update score formatting in SpiderChart component ([7916641]())
* Update spider chart component in compliance manager ([2f7ea79]())
* Update text class in questionnaire components ([3a784ca]())

# [1.288.0]() (2024-07-11)


### Features

* Implement cascade deletion and enforce non-empty check ([b7bf58d]())

# [1.287.0]() (2024-07-11)


### Bug Fixes

* not storing answer if false ([0f935f5]())


### Features

* Add NotFoundException for non-existing compliance questions ([a1eafe5]())

# [1.286.0]() (2024-07-10)


### Features

* Implement smooth scrolling for questionnaire questions ([58a2b60]())
* Remove unused intersection observer in questionnaire container ([a93741d]())

# [1.285.0]() (2024-07-10)


### Features

* Add overflow auto property to div elements ([422002b]())
* Update CSS classes in questionnaire components ([80b7306]())
* Update padding in QuestionnaireContainer ([b3901f5]())

# [1.284.0]() (2024-07-10)


### Features

* Add 'bpc' query parameter to organization_compliance_responses controller ([bb3bd8c]())

# [1.283.0]() (2024-07-10)


### Features

* Add scoring and target functionality to Compliance Manager ([c4b1f4f]())
* Enforce integer display for scores in compliance manager components ([b3682c9]())
* Return null for empty SpiderChart ([62e0801]())
* Update conditions to display JourneyOverviewCard ([a76c73b]())
* Update sidebar and compliance manager components ([2fa8625]())

## [1.282.3]() (2024-07-09)


### Bug Fixes

* add auto-creation of organization compliance in repository ([a40aa87]())

## [1.282.2]() (2024-07-06)


### Bug Fixes

* update scoring service answer logic ([bbacb4b]())

## [1.282.1]() (2024-07-06)


### Bug Fixes

* bug causing dependency chain seeds to fail ([95ef041]())
* modified user_answered property in scoring.service.ts ([80f8819]())
* Update prisma seed files for compliance section and question ([c6c3856]())

# [1.282.0]() (2024-07-05)


### Features

* Add bpc option to ComplianceResponseOptions ([78653bb]())
* Added 'bpc' query param to findAllComplianceResponses in organization_compliance_responses.controller ([213456f]())
* Increase default data retrieval limit in Compliance Response service ([8ab0e72]())
* toggle compliance definition visibility ([8d6380b]())
* update 'not_started' count calculation in scoring.service ([020dd8c]())
* Update relations in prisma schema to cascade on delete ([3989fcf]())

# [1.281.0]() (2024-07-05)


### Features

* Add mock data for Compliance Questionnaire ([272e808]())
* Remove spinner from compliance components ([100ac8c]())

# [1.280.0]() (2024-07-05)


### Features

* Remove 'Documents' tab from Compliance Manager ([0470413]())
* Remove 'Preview' tab from Compliance Manager ([6775cba]())
* Remove GuidanceButton component ([10ff81a]())

# [1.279.0]() (2024-07-04)


### Features

* Add support for survey override in compliance model seeding ([33133da]())

# [1.278.0]() (2024-07-03)


### Features

* Updated options attribute in compliance-responses.repository ([efafee6]())

# [1.277.0]() (2024-07-03)


### Features

* Update Prisma schema to cascade delete on organization compliance relations ([4fd4176]())

# [1.276.0]() (2024-07-03)


### Features

* add bpc parameter to getAllByOrg method in compliance-definitions service ([41b43e2]())
* add bpc query parameter to allow for forcing cache to refresh ([c34f2b2]())
* add caching and timing to compliance response repository ([3f19a09]())
* Update getComplianceDefinitionsByOrgId function in compliance-definitions repository ([eaa6fe3]())

# [1.275.0]() (2024-07-03)


### Bug Fixes

* update error logging condition in compliance-responses repository ([40fe499]())


### Features

* Add dynamic compliance count cache disabling ([30ae6a7]())

# [1.274.0]() (2024-07-02)


### Features

* Add visible column to organization_compliance table ([39c24b4]())

# [1.273.0]() (2024-07-02)


### Features

* Add error logging to seedComplianceModels function in Prisma ([43c89e7]())
* add getAll() function to compliance-definitions controller ([818f111]())
* Add new function to getComplianceDefinitions and update visibility ([f331aed]())
* Add new getAll compliance method and rename old method ([967be5c]())
* Add visibility filter to organization-compliance repository ([f9930de]())
* Add visibility to compliance responses ([943a358]())
* Add visible field to schema in Prisma ([1caf715]())

# [1.272.0]() (2024-07-02)


### Features

* Add scoring function to compliance questionnaire ([a71a702]())
* Add scoring functionality to questionnaire components ([09b1276]())

# [1.271.0]() (2024-07-01)


### Features

* Add getComplianceMockByName handler ([4d481d9]())
* Refactor compliance data fetching and image URL setting ([27ac869]())
* Update compliance mocking and calls with a new structure ([2485c8a]())
* Update feature flag in compliance component ([025e4dd]())

## [1.270.2]() (2024-07-01)


### Bug Fixes

* issue preventing compliance page from rendering ([aa5f6f2]())

## [1.270.1]() (2024-06-28)


### Bug Fixes

* update compliance definition list repository to trigger the cached counts if none exist. ([62c3859]())

# [1.270.0]() (2024-06-28)


### Features

* add ColdCacheInterceptor to cache module and implement trackBy method ([bf1ea9e]())
* Add total questions and progress to scoring service ([5005ee0]())
* enhance ComplianceResponsesRepository functions ([08188aa]())
* Expand ComplianceDefinitionsRepository methods ([7c71ccc]())
* Export cache interceptor in cache index ([81bcde7]())
* update compliance-definitions.controller.ts ([ffd5137]())
* Update ComplianceDefinitionsService to use DefinitionsRepository ([0b7546a]())
* Update methods in Organization Compliance Repository ([2ecc5da]())

# [1.269.0]() (2024-06-28)


### Features

* initial work for handling array ai responses ([4281c11]())
* Refactor AI details handling in Questionnaire ([4aa2798]())

# [1.268.0]() (2024-06-28)


### Features

* Add Interceptors to Organization Compliance Responses Controller ([1758b04]())
* Add OrgUserInterceptor decorator to organization compliance controller ([c2621c3]())
* Add OrgUserInterceptor to organization compliance controller ([de2f4ee]())
* Add statuses in organization-compliance repository ([d73d13e]())
* Added CacheInterceptor to ComplianceDefinitionsController ([9078fa9]())
* Improve error handling in chat service and optimize cache operations ([f1e9e78]())
* Use interceptor in OrganizationComplianceAiResponseFiles controller ([6dc03d8]())

# [1.267.0]() (2024-06-28)


### Features

* Add 'statuses' to compliance mock and refactor code ([59a4885]())
* Refactor compliance manager overview for better data handling ([87525f3]())
* Refactor logging and context usage in Compliance Manager components ([f5da2f4]())
* Update compliance document modal and add image URLs to compliance mock ([6400431]())
* Update logging in coldMQTTProvider ([c1f89a1]())

# [1.266.0]() (2024-06-27)


### Features

* add cache service in compliance response repository ([d83439d]())

## [1.265.1]() (2024-06-27)


### Bug Fixes

* error being throw while scoring comliance sets ([d35ee9b]())

# [1.265.0]() (2024-06-27)


### Features

* Add placeholder questions to questionnaire section ([a884c53]())
* Move loading spinner inside questionnaire section ([e550f8b]())

# [1.264.0]() (2024-06-27)


### Features

* Update sidebar styles ([d927021]())

# [1.263.0]() (2024-06-26)


### Features

* Add authentication and roles guards to controllers ([ec851b7]())

# [1.263.0-COLD-858.1]() (2024-06-26)


### Features

* Add authentication and roles guards to controllers ([ec851b7]())

# [1.262.0]() (2024-06-25)


### Features

* Add spinner to compliance counts during validation ([1f2bb9d]())
* Enhance data validation and modify data fetch interval ([9062e8f]())
* Refactor logging and question list fetching handling ([ad0f2a8]())
* Update handling of undefined data and modify mocks ([efc255f]())
* Update MQTT logic and improve compliance manager interactions ([7893abf]())
* Update ordering logic for compliance questions ([baa3fe5]())

# [1.261.0]() (2024-06-24)


### Features

* Add timer to clear delay in questionnaire components ([30ffa83]())
* Refactor search parameter removal in Questionnaire components ([957b6dd]())
* Update navigation and improve progress bar interaction ([07265ee]())

# [1.260.0]() (2024-06-24)


### Features

* Add condition for 'collapseOpen' in useEffect ([e7e70fc]())
* Add spinner to ComplianceProgressStatusItem component ([281b33d]())
* Refactor fetching and handling of compliance counts ([5674539]())

# [1.259.0]() (2024-06-21)


### Bug Fixes

* issue with filtering not working ([1905893]())


### Features

* Add access control and refactoring in organizations.mqtt.service ([dbfe001]())
* Add compliance responses count endpoint ([f4758d0]())
* Add onlyCounts option to ComplianceResponsesRepository ([2b240c8]())
* Update ComplianceSectionGroupsRepository with ScoringService and response inclusion ([7d9ca40]())

# [1.258.0]() (2024-06-20)


### Features

* Enhance crawling service with priority settings and logging optimizations ([99bb43b]())

# [1.257.0]() (2024-06-20)


### Features

* Add section title to logBrowser in Compliance Manager Overview ([d48b28a]())
* Optimize complianceManagerOverviewSection component ([3358949]())
* Refactor compliance manager and section components ([d5faa2e]())
* Remove redundant logging parameters ([9681060]())
* Remove unnecessary logging and state in coldMQTTProvider ([b733db3]())
* Update browser log messages in questionnaire components ([c0d6153]())
* Update logging in ComplianceQuestionnaire component ([693d83e]())

# [1.256.0]() (2024-06-20)


### Features

* Add namespace deletion and URL filtering in crawler ([602731c]())

# [1.255.0]() (2024-06-18)


### Features

* Improve URL cleaning and handling in crawler ([21a752e]())

# [1.254.0]() (2024-06-18)


### Features

* Hide "Documents Referenced" if no references exist ([f37e8a0]())
* Implement ordering for questionnaire questions ([eba995b]())

# [1.253.0]() (2024-06-18)


### Features

* Pass options parameter to scoreComplianceResponse and add dependencies to return object ([c6fd305]())

# [1.252.0]() (2024-06-18)


### Features

* Update scoring service and compliance responses repository ([ccc66dd]())

# [1.251.0]() (2024-06-18)


### Features

* Add deletion of 'web' type vector records in Pinecone service ([c0d6270]())

# [1.250.0]() (2024-06-18)


### Bug Fixes

* update fixes for questionnaire ([#465](ssues/465)) ([0d5c63b]())


### Features

* Update logging and handle exception in removeWebVectors ([1bdf121]())
* Update order of condition checks in complianceManagerOverviewSection ([615a3b2]())

# [1.249.0]() (2024-06-18)


### Features

* Refactor section sorting in questionnaireContainer ([424d948]())

# [1.248.0]() (2024-06-18)


### Features

* Add AI response deletion and web crawling enhancements ([7d0209e]())
* Add Organizations Repository to Compliance Repository module ([175ab64]())
* Enhanced compliance response functionality and indexing ([a9c419a]())
* Grant all roles access to specific organization compliance responses endpoints ([48d5b3b]())
* Refactor complianceManager and questionnaireQuestionItem components ([e2a2805]())
* Refactor questionnaire update method ([47b650c]())
* Update MQTT query getComplianceQuestionsList() to use getScoredComplianceQuestionBySection() ([4de4023]())
* Update questionnaireQuestionItem component ([89fe672]())

# [1.247.0]() (2024-06-18)

### Features

* Optimize section groups ordering in Questionnaire ([3142636]())
* Refactor data retrieval for compliance question count ([7174f18]())
* Refine scrolling condition in questionnaire section ([890f602]())
* Update Compliance Manager MQTT Mock ([6400750]())
* Update handling of undefined states in questionnaire ([9d2372a]())
* Update MQTT topic in mock ([562db85]())
* Update to use ComplianceSidebarPayload and Questions ([66edc14]())

# [1.246.0]() (2024-06-17)


### Features

* Add error boundaries to questionnaire components ([a0dc8c3]())
* Add survey response handlers and ComplianceComponentType enum ([d290ff4]())
* Ignore chromatic in sidebar and remove WithSectionSelection story ([c8cbcff]())
* Increase timeout in questionnaireQuestionSection ([75199a0]())
* Update div styling and remove Spinner component ([1e83fcc]())

# [1.245.0]() (2024-06-16)


### Features

* Add functions for embedding and loading web documents ([75ad7f5]())
* add getWebFileContent method to LangchainLoaderService ([4cfc143]())
* Extend CrawlerConsumer to handle file persistence and addition of services ([933b903]())
* Update crawler controller to fetch website data from company ([5d68093]())

# [1.244.0]() (2024-06-15)


### Features

* Add function to check equality between AI response and compliance answer ([0ece33a]())
* Rename AiDocumentReferenceDropdown and refine its functionality ([e2d7ccd]())

# [1.243.0]() (2024-06-15)


### Features

* Enhance the validation logic for question answers ([3214518]())

# [1.242.0]() (2024-06-15)


### Features

* Handle empty compliance responses in survey utils ([a00dc29]())

# [1.241.0]() (2024-06-15)


### Features

* Update RPC message processing in organizations_compliance_responses.rabbit ([e1968e3]())

# [1.240.0]() (2024-06-15)


### Features

* Add initial creation of organization compliance in compliance-section-groups repository ([fb97713]())

# [1.239.0]() (2024-06-15)


### Features

* Update MQTT topic in complianceManager ([b2aeeed]())

# [1.238.0]() (2024-06-15)


### Features

* add link to questionnaire from the compliance management page ([adb1276]())
* Add specific component routing and enhance exception handling ([0bc4728]())
* added container id to scroll in question container ([ffdffa8]())
* added save button to notes ([93b0b29]())
* handle glow overlayed on ai justification ([0231bfb]())
* handle scrolling to section and question ([4ab389c]())
* more changes ([a586945]())
* more styling and code changes ([3d05f9b]())
* questionnaire page, left sidebar and container ([d24d31c]())
* Remove unused hook, update surveyUtils, improve dashboard layout ([aae1153]())
* updates for questionnaire container ([5575f3c]())

# [1.237.0]() (2024-06-14)


### Features

* Update Pinecone service functionality ([9862b2f]())

# [1.236.0]() (2024-06-14)


### Bug Fixes

* change organization_compliance_question_bookmarks to false in Prisma extensions ([6de5313]())
* Dependency injection issue ([49e89cf]())
* update incorrect param name in organization_compliance_responses.controller ([dde738d]())


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1]())
* Add additional exports to Nest module ([c4d7482]())
* Add ComplianceNoteFilesRepository ([33d32ca]())
* Add ComplianceNoteLinksRepository ([77c3613]())
* Add ComplianceNotesRepository with CRUD operations ([2ed81fd]())
* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee]())
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c]())
* Add FilteringModule to ScoringModule in nest library ([ffd3292]())
* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725]())
* add metadata field to compliance notes table ([ff559f6]())
* Add method to get scored compliance question by ID ([adcac13]())
* Add new compliance note related repositories ([870ec8b]())
* Add new FilteringService and module in compliance lib ([140e7c9]())
* add notes endpoints ([c171eb2]())
* add options parameter to scoring methods in scoring.service ([09d32ed]())
* Add OrganizationComplianceNotesModule to organization_compliance.module ([50f1bc9]())
* Add rubric to compliance responses repository ([6ead069]())
* Add unique constraint to email and compliance_question_id in Prisma schema ([b401d9a]())
* Added 'responses' parameter to organization compliance responses controller ([c8109ef]())
* added `forwardRef` in scoring.module.ts ([24b09a4]())
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920]())
* Added component attribute to compliance responses repository ([e704fe8]())
* Added new enum to compliance ([2dafdc9]())
* Added Qodana configuration file and its output ([f29f287]())
* Enhance compliance question bookmark repository code ([cf49e82]())
* Enhance filtering functionality in Filtering Service ([08ccb82]())
* Enhance logging configuration for development environment in Prisma extensions ([15c6c10]())
* enhance OrganizationComplianceNotesService ([d8f5fe7]())
* enhance scoring service in the compliance module ([e44bdd1]())
* Expand compliance responses repository logic ([2daae9a]())
* Handle NotFoundException in compliance-ai-responses.repository ([629c5d6]())
* Import and utilize ComplianceDataModule in NestModule ([aa15a97]())
* Integrate FilteringService into chat.service.ts ([d0f5d2c]())
* Refactor compliance response repository to use organization object ([94e88fd]())
* Refactor compliance responses handling ([2ee30f4]())
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7]())
* Refactor organization compliance response service ([0fe23d0]())
* Update ComplianceQuestionsRepository ([924a7e5]())
* Update deletion criteria in compliance question bookmarks repository ([22d82f9]())
* Update examples and sections in openapi JSON schema ([f903678]())
* Update filtering.service in nest lib for compliance filtering ([cdcb17b]())
* Update methods in compliance-question-bookmarks service ([8af1446]())
* Update organization compliance notes controller ([a351ba5]())
* Update organization compliance responses controller ([c0cb6c9]())
* Update organization compliance responses controller ([0fb3772]())
* Update OrganizationComplianceBookmarks module and service ([3bebd69]())
* update scoring service to include score map and delete rubric [COLD-805] ([5372389]())
* updated function name in organization_compliance_responses.service ([b6c1c77]())

# [1.236.0-cold-803.15]() (2024-06-14)


### Features

* Refactor compliance responses handling ([2ee30f4]())

# [1.236.0-COLD-710.3]() (2024-06-14)


### Bug Fixes

* update incorrect param name in organization_compliance_responses.controller ([dde738d]())


### Features

* Add ComplianceNoteFilesRepository ([33d32ca]())
* Add ComplianceNoteLinksRepository ([77c3613]())
* Add ComplianceNotesRepository with CRUD operations ([2ed81fd]())
* add metadata field to compliance notes table ([ff559f6]())
* Add new compliance note related repositories ([870ec8b]())
* add notes endpoints ([c171eb2]())
* Add OrganizationComplianceNotesModule to organization_compliance.module ([50f1bc9]())
* Enhance logging configuration for development environment in Prisma extensions ([15c6c10]())
* enhance OrganizationComplianceNotesService ([d8f5fe7]())
* more changes ([a586945]())
* Update methods in compliance-question-bookmarks service ([8af1446]())
* Update organization compliance notes controller ([a351ba5]())

# [1.236.0-COLD-710.2]() (2024-06-14)


### Bug Fixes

* change organization_compliance_question_bookmarks to false in Prisma extensions ([6de5313]())


### Features

* Add unique constraint to email and compliance_question_id in Prisma schema ([b401d9a]())
* Expand compliance responses repository logic ([2daae9a]())
* Handle NotFoundException in compliance-ai-responses.repository ([629c5d6]())
* Update deletion criteria in compliance question bookmarks repository ([22d82f9]())

# [1.236.0-COLD-710.1]() (2024-06-13)


### Bug Fixes

* Dependency injection issue ([49e89cf]())


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1]())
* Add additional exports to Nest module ([c4d7482]())
* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee]())
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c]())
* Add FilteringModule to ScoringModule in nest library ([ffd3292]())
* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725]())
* add link to questionnaire from the compliance management page ([adb1276]())
* Add method to get scored compliance question by ID ([adcac13]())
* Add new FilteringService and module in compliance lib ([140e7c9]())
* add options parameter to scoring methods in scoring.service ([09d32ed]())
* Add rubric to compliance responses repository ([6ead069]())
* Add specific component routing and enhance exception handling ([0bc4728]())
* Added 'responses' parameter to organization compliance responses controller ([c8109ef]())
* added `forwardRef` in scoring.module.ts ([24b09a4]())
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920]())
* Added component attribute to compliance responses repository ([e704fe8]())
* added container id to scroll in question container ([ffdffa8]())
* Added new enum to compliance ([2dafdc9]())
* Added Qodana configuration file and its output ([f29f287]())
* added save button to notes ([93b0b29]())
* Enhance compliance question bookmark repository code ([cf49e82]())
* Enhance filtering functionality in Filtering Service ([08ccb82]())
* enhance scoring service in the compliance module ([e44bdd1]())
* handle glow overlayed on ai justification ([0231bfb]())
* handle scrolling to section and question ([4ab389c]())
* Import and utilize ComplianceDataModule in NestModule ([aa15a97]())
* Integrate FilteringService into chat.service.ts ([d0f5d2c]())
* more styling and code changes ([3d05f9b]())
* questionnaire page, left sidebar and container ([d24d31c]())
* Refactor compliance response repository to use organization object ([94e88fd]())
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7]())
* Refactor organization compliance response service ([0fe23d0]())
* Update ComplianceQuestionsRepository ([924a7e5]())
* Update examples and sections in openapi JSON schema ([f903678]())
* Update filtering.service in nest lib for compliance filtering ([cdcb17b]())
* Update organization compliance responses controller ([c0cb6c9]())
* Update organization compliance responses controller ([0fb3772]())
* Update OrganizationComplianceBookmarks module and service ([3bebd69]())
* update scoring service to include score map and delete rubric [COLD-805] ([5372389]())
* updated function name in organization_compliance_responses.service ([b6c1c77]())
* updates for questionnaire container ([5575f3c]())

# [1.236.0-cold-803.11]() (2024-06-13)


### Features

* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725]())
* Add method to get scored compliance question by ID ([adcac13]())
* Update organization compliance responses controller ([c0cb6c9]())

# [1.236.0-cold-803.10]() (2024-06-13)


### Features

* updated function name in organization_compliance_responses.service ([b6c1c77]())

# [1.236.0-cold-803.9]() (2024-06-13)


### Features

* Added Qodana configuration file and its output ([f29f287]())

# [1.236.0-cold-803.8]() (2024-06-13)


### Features

* update scoring service to include score map and delete rubric [COLD-805] ([5372389]())

# [1.236.0-cold-803.7]() (2024-06-13)


### Features

* Added component attribute to compliance responses repository ([e704fe8]())

# [1.236.0-cold-803.6]() (2024-06-13)


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1]())
* added `forwardRef` in scoring.module.ts ([24b09a4]())
* enhance scoring service in the compliance module ([e44bdd1]())
* Update examples and sections in openapi JSON schema ([f903678]())

# [1.236.0-cold-803.5]() (2024-06-12)


### Features

* Add additional exports to Nest module ([c4d7482]())
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c]())
* Add rubric to compliance responses repository ([6ead069]())
* Enhance compliance question bookmark repository code ([cf49e82]())
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7]())
* Update filtering.service in nest lib for compliance filtering ([cdcb17b]())

# [1.236.0-cold-803.4]() (2024-06-12)


### Features

* Update OrganizationComplianceBookmarks module and service ([3bebd69]())

# [1.236.0-cold-803.3]() (2024-06-12)


### Features

* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee]())
* Added 'responses' parameter to organization compliance responses controller ([c8109ef]())
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920]())
* Added new enum to compliance ([2dafdc9]())

# [1.236.0-cold-803.2]() (2024-06-12)


### Bug Fixes

* Dependency injection issue ([49e89cf]())


### Features

* Add FilteringModule to ScoringModule in nest library ([ffd3292]())
* add options parameter to scoring methods in scoring.service ([09d32ed]())
* Enhance filtering functionality in Filtering Service ([08ccb82]())
* Integrate FilteringService into chat.service.ts ([d0f5d2c]())
* Refactor compliance response repository to use organization object ([94e88fd]())
* Refactor organization compliance response service ([0fe23d0]())
* Update organization compliance responses controller ([0fb3772]())

# [1.236.0-cold-803.1]() (2024-06-11)


### Features

* Add new FilteringService and module in compliance lib ([140e7c9]())
* Import and utilize ComplianceDataModule in NestModule ([aa15a97]())
* Update ComplianceQuestionsRepository ([924a7e5]())

# [1.235.0]() (2024-06-10)


### Features

* Update 'app.module.ts' and 'rabbit.service.ts' and remove unused service configurations ([576be93]())

# [1.234.0]() (2024-06-10)


### Features

* update emission ID generation and handle estimate data absence ([56a2de4]())

## [1.233.1]() (2024-06-10)


### Bug Fixes

* update import path and variable in compliance_definitions ([#445](ssues/445)) ([58b86e8]())

# [1.233.0]() (2024-06-10)


### Bug Fixes

* ensure non-null and non-empty ai_response answer in survey filter service ([365a693]())


### Features

* Add exception for missing website parameter in crawler controller ([ec96e07]())
* Add methods to score compliance questions ([f300469]())
* Add new column to organization_files table ([ec55a5c]())
* Add new fields to Prisma schema file ([f14c1df]())
* Add openai_vector_file_status column to organization_files ([ea22d86]())
* Add scoring to compliance responses and add additional flags ([26730d1]())
* Enhance OrganizationComplianceNotesController routing and functionality ([c262bfb]())
* Ignore typescript error and update chat controller ([343d64f]())
* Implement compliance scoring and assessment system ([28bf205]())
* Improve chat functionality and context handling in OpenAI ([e23674d]())
* integrate ColdRabbitModule and EventsModule in app.module ([f783475]())
* Reduce getContext proportion in chat.controller ([f760b84]())
* Update exports in Crawler module ([f181859]())
* Update minScore default value in getContext function in Pinecone service ([10b9a94]())
* Update OpenAI integration to use vector stores ([c7d1633]())
* update Organization Compliance Service to include AI activation ([fe1eb56]())
* Update reference properties in assistant tools ([5df0d90]())
* Update the endpoint for activating AI in organization compliance ([5d3b3b7]())
* Update typescript compile options in tsconfig files ([b3344b6]())
* Updated openapi.json with compliance related changes ([843de6a]())

# [1.233.0-cold-810.1]() (2024-06-05)


### Features

* Add methods to score compliance questions ([f300469]())
* Implement compliance scoring and assessment system ([28bf205]())

# [1.233.0-cold-810.1]() (2024-06-05)


### Features

* Implement compliance scoring and assessment system ([28bf205]())

# [1.232.0]() (2024-06-05)


### Features

* Updated code to generate CUID2 using GuidPrefixes enum ([19d8dc7]())

# [1.231.0]() (2024-06-03)


### Features

* Add async cache rebuild methods in surveys service ([4f1b91b]())
* Update importSurveyStructure method in ComplianceDefinitions service ([13294e8]())

# [1.230.0]() (2024-06-02)


### Features

* Added Prisma extension for soft delete ([c05cd7a]())

# [1.229.0]() (2024-06-02)


### Features

* Conditionally run seeding commands in main.ts based on environment variable ([f44e062]())

# [1.228.0]() (2024-06-02)


### Bug Fixes

* ensure job timestamps do not cause errors due to undefined values ([d7267a0]())
* prevent deletion of assistants with no name in controller ([d8bd1e3]())


### Features

* Add advanced compliance response operations to controller ([2abd232]())
* Add Compliance AI Response Files Repository with CRUD operations ([3161f2f]())
* Add compliance section groups repository ([f8a3922]())
* Add ComplianceDefinitionsRepository with fetch and delete methods ([cba8759]())
* Add ComplianceQuestionsExtendedDto class ([cb4771a]())
* Add ComplianceRepositoryModule to compliance-definitions.module imports ([2b88446]())
* Add ComplianceSectionGroupsExtendedDto in compliance_section_groups ([b21f4f6]())
* Add ComplianceSectionGroupsModule and Controller in compliance definitions ([48a113d]())
* Add ComplianceSectionGroupsService in cold-api ([9910032]())
* Add ComplianceSections controller for compliance module ([4950cc5]())
* Add ComplianceSectionsExtendedDto ([0a1800e]())
* Add ComplianceSectionsService in cold-api ([d357dec]())
* Add createAiResponses method to compliance-ai-responses.repository.ts and relocate file to new directory ([7fa0955]())
* Add enableShutdownHooks function in Prisma service ([48f23fd]())
* Add endpoint to fetch all compliance responses ([a77c59a]())
* Add endpoints for compliance definitions and their operations in `compliance-definitions.controller.ts` ([2e57532]())
* Add exception handling for missing OpenAI Service Definition ([7af34e5]())
* add fallback for unspecified NODE_ENV in Freeplay service ([0b70d17]())
* Add improvements to ComplianceResponsesRepository ([5e37c89]())
* add job existence check in shouldContinueCrawling method ([2b1f924]())
* Add method to fetch all Compliance Responses by Compliance ([b24da3b]())
* add MqttService and ComplianceSectionsCacheRepository to JobConsumer in cold-platform-openai ([3840655]())
* Add new ComplianceQuestionsController with CRUD operations ([a8f4fba]())
* add openApiYml script to package.json and fix openApi script ([929aad4]())
* Add option to get compliance responses by organization name or id ([5a1f517]())
* Add OrganizationsRepository for managing organizations ([df4cc52]())
* Add soft delete support to various tables in prisma schema ([994c12d]())
* Add user parameter to updateSection method in ComplianceSections repository ([bc04e53]())
* add user to getFilteredSectionsList function for logging ([bf68a03]())
* Add yaml and json document URLs to Swagger config module ([4d419d6]())
* Added new extended Prisma client to enable soft-delete ([489c970]())
* Deleted compliance_questions controller and service, added ComplianceSet module ([00882f0]())
* Enhance compliance AI response repository ([07d4a77]())
* Enhance compliance section repository operations ([52a6d91]())
* Enhance error handling and data validity in Pinecone service ([52e6b47]())
* Enhance security and swagger documentation in ComplianceSectionGroups controller ([b4004b8]())
* Enhanced ComplianceQuestionsRepository with additional methods and updated existing methods ([6ce12d5]())
* Expand ComplianceAiResponsesRepository with update, get and delete methods ([4f3ed3b]())
* Handle file not found error in langchain loader service ([e74d3d2]())
* Handle unknown component in survey section item ([bc322b3]())
* implement ComplianceSectionsRepository, refactor injectSurvey method to use name & add findSections method ([769d437]())
* Implement organization compliance statuses functionality ([20d858c]())
* Improve logging for expired tokens and reduce token cache ttl ([23b01ac]())
* Improve organization identifier handling in compliance AI response file repository ([3f5f5c4]())
* Remove ComplianceSectionGroupsRepository file ([b168915]())
* Remove entity and relations for compliance and organization modules ([6cec382]())
* Update environment variables for development configuration ([e4412b4]())
* Update OpenAPI decorator to generate comprehensive mock data ([1f45bd9]())
* Update org-user-interceptor to handle organization name ([e854bdf]())
* Update organization.controller in API for improved routing and footprint service integration ([bf483e2]())
* update OrganizationCompliance route and add user role guard ([4bd0cf8]())
* Update parameter list in complianceSectionsService's update method ([5738627]())
* update typecasting in xls.loader ([f8d9de4]())
* Update TypeScript configuration in cold-platform-openai ([80dcc82]())
* Updated openapi specification ([c5a519c]())
* Updated services, controller, and module for AI Compliance Responses ([90b6276]())
* Use filtered question list in organization compliance responses module ([2c90c77]())

# [1.227.0]() (2024-05-24)


### Features

* add opacity and brigthness animation to ai question processing ([ec9945f]())
* dont change status when overview modal is open and handle AI progress when running ([acd13ef]())
* send publish method to get new questions when ai has updates ([8d236e5]())

## [1.226.1]() (2024-05-24)


### Bug Fixes

* question joins ([9162413]())

# [1.226.0]() (2024-05-23)


### Bug Fixes

* fix loader incorrectly appearing when no documents are uploaded ([0323477]())


### Features

* add error boundary to compliance manager components ([b969f1d]())
* changes to handle ai status updates ([bebe404]())
* changes to handle different flow guide and manager states ([21becc0]())
* handle document upload ([bda8d4b]())
* handle new compliance MQTT data ([baf5a57]())
* handle user submitted status ([95b421a]())
* initial changes ([e157f6e]())
* update api reply topic to send to correct one ([b791fa1]())

## [1.225.2]() (2024-05-21)


### Bug Fixes

* final issue with incorrect counts ([#437](ssues/437)) ([1cd1d0b]())
* properly process array values in dependency filter ([581d8a9]())

## [1.225.1]() (2024-05-21)


### Bug Fixes

* issue causing inaccurate results from being returned ([99b7330]())

# [1.225.0]() (2024-05-21)


### Features

* add visible filter to compliance page ([0f20977]())
* also filter on new compliance page ([a43e8c7]())

# [1.224.0]() (2024-05-21)


### Features

* handle new api data structures ([1114ff5]())
* handle spacing when section group collapse is closed ([c2ff708]())
* pass in organization id to question list for filtering ([25b387b]())

## [1.223.1]() (2024-05-21)


### Bug Fixes

* getQuestionList was not filtering on orgId in joins ([501fc20]())

# [1.223.0]() (2024-05-15)


### Features

* Add ComplianceSectionsCacheRepository and implement getFilteredSectionList in organizations.mqtt.service ([2219c30]())
* Add methods to create, update compliance questions in repository ([a85e31d]())
* Added a ComplianceSectionsCacheRepository to manage compliance sections data ([d49e3ce]())

# [1.222.0]() (2024-05-15)


### Bug Fixes

* place new compliance flow behind feature flag ([c49173d]())


### Features

* Add code to create compliance question dependency chains. ([90a6e30]())
* Add code to create compliance question dependency chains. ([ab5e3b8]())
* Add compliance export to nest library index ([00cd102]())
* Add compliance services and repositories to chat module ([ca87b5e]())
* Add ComplianceAiResponsesRepository and its spec test ([bc109b8]())
* add ComplianceModule to app.module in cold-platform-openai ([9ca5299]())
* Add ComplianceResponsesRepository and associated spec file ([d423126]())
* Add ComplianceSectionService and corresponding unit test ([4ccc638]())
* Add dependency filter to compliance sections repository ([3774964]())
* Add new types for compliance responses in the compliance repository ([c6d434c]())
* Add optional secrets parameter in ColdCacheModule forRootAsync method and fallback to using SecretsService if not provided ([b821e5d]())
* Added new type definition for compliance status handling ([702aefb]())
* Extend compliance module for new features. Add PrismaModule, ColdCacheModule, ComplianceAiResponsesRepository and ComplianceResponsesRepository to ComplianceModule. ([bbd7dec]())
* Implemented compliance sections and responses repositories in chat service ([002cbde]())
* Modify 'value' column in 'organization_compliance_responses' to JSONB type ([6a44ee4]())
* refactor dependency chain relations for compliance sections and questions ([bdbcd4d]())
* Split compliance dependency chains into distinct tables ([73593d2]())
* Update ComplianceQuestionsRepository to include calculation of metrics ([a95b1ed]())
* Upgrade ComplianceSectionsRepository with caching functionality ([41c9ec3]())

# [1.219.0-cold-790.4]() (2024-05-15)


### Bug Fixes

* place new compliance flow behind feature flag ([c49173d]())


### Features

* Add compliance services and repositories to chat module ([ca87b5e]())
* Add ComplianceAiResponsesRepository and its spec test ([bc109b8]())
* add ComplianceModule to app.module in cold-platform-openai ([9ca5299]())
* Add ComplianceResponsesRepository and associated spec file ([d423126]())
* Add ComplianceSectionService and corresponding unit test ([4ccc638]())
* Add new types for compliance responses in the compliance repository ([c6d434c]())
* Add optional secrets parameter in ColdCacheModule forRootAsync method and fallback to using SecretsService if not provided ([b821e5d]())
* Added new type definition for compliance status handling ([702aefb]())
* Extend compliance module for new features. Add PrismaModule, ColdCacheModule, ComplianceAiResponsesRepository and ComplianceResponsesRepository to ComplianceModule. ([bbd7dec]())
* Implemented compliance sections and responses repositories in chat service ([002cbde]())
* Upgrade ComplianceSectionsRepository with caching functionality ([41c9ec3]())

# [1.219.0-cold-790.3]() (2024-05-14)


### Features

* Add additional data checks and error handling in compliance model seeding ([240e4b9]())
* Add code to create compliance question dependency chains. ([90a6e30]())
* Add code to create compliance question dependency chains. ([ab5e3b8]())
* Add compliance export to nest library index ([00cd102]())
* Add dependency filter to compliance sections repository ([3774964]())
* Modify 'value' column in 'organization_compliance_responses' to JSONB type ([6a44ee4]())
* refactor dependency chain relations for compliance sections and questions ([bdbcd4d]())
* Split compliance dependency chains into distinct tables ([73593d2]())
* Update ComplianceQuestionsRepository to include calculation of metrics ([a95b1ed]())

# [1.219.0-cold-790.2]() (2024-05-12)


### Features

* add util to get term string ([6fd5076]())
* handle mqtt mocks in storybook ([5777583]())
* handle section groups, sections and questions using MQTT ([60b7f9f]())
* initial work for compliance manager page ([910001e]())
* remove and update inverted and filed icons ([d57a4b7]())
* remove old survey code ([e2a4538]())
* update application layout for the new management page ([87501d9]())
* update handling of due date and term in compliance definition and not survey definition ([fab5aea]())

## [1.220.1]() (2024-05-14)


### Bug Fixes

* place new compliance flow behind feature flag ([2c26d71]())

# [1.220.0]() (2024-05-13)


### Bug Fixes

* correct typo in compliance_definition_name column in compliance_dependency_chains table ([90aa02b]())


### Features

* Add additional data checks and error handling in compliance model seeding ([240e4b9]())
* Add compliance_dependency_chains model to Prisma schema and integrate it with existing models ([69e6406]())
* Add ComplianceRepositoryModule to OrganizationComplianceResponsesModule imports ([3369515]())
* Add dependencies filtering to getQuestionList function ([10ae00d]())
* Added compliance dependency chain models in database migration ([5c4976e]())
* Implement building of dependency chains in compliance model seeding ([2d7e611]())

# [1.219.0]() (2024-05-12)


### Bug Fixes

* Add auto-increment function to "compliance_responses" table in Prisma migration ([aa399b6]())
* Alter table to change 'answer' column type to JSONB in 'organization_compliance_ai_responses' ([3d5bee7]())
* change queries in the compliance repository for MQTT API ([ede5951]())
* correct typo in compliance_definition_name column in compliance_dependency_chains table ([90aa02b]())
* fix issue where complianceQuestionListByOrgIdCompNameKey failed to return questions ([95bdd33]())
* Make 'answer' column in 'organization_compliance_ai_responses' table nullable ([b85df35]())
* Make AI response ID optional in organization compliance responses table ([c6f35ec]())
* Removed invalid unique key from compliance responses database table ([4678d9c]())
* set 'references' and 'sources' columns in 'organization_compliance_ai_responses' table to optional ([3b8939e]())
* update Amazon surveys list in seed_compliance_definitions.ts ([da5cb96]())


### Features

* Add additional context field to organization_compliance_responses and organization_compliance_ai_responses in Prisma schema ([5d7776d]())
* Add compliance flow handling in Rabbit service ([b6edc6d]())
* Add compliance processing to chat service in cold platform openai ([fc6a3a0]())
* Add compliance_dependency_chains model to Prisma schema and integrate it with existing models ([69e6406]())
* Add compliance_responses table with necessary fields, indices, and foreign key constraints. Added column to organization_compliance_responses table. ([dea7845]())
* Add ComplianceRepositoryModule with repositories for managing compliance data ([981ac5a]())
* Add createComplianceSession method and ICFPSession interface to freeplay service ([76e1b95]())
* Add createComplianceSession method and ICFPSession interface to freeplay service ([8068bc4]())
* Add MQTT (socket API) service and RabbitMQ service to organizations module ([c359f5b]())
* Add MqttModule and MqttService to ChatModule ([562bc2e]())
* Add optional survey_definition to ComplianceDefinition schema ([9753054]())
* Add optional survey_definition to ComplianceDefinition schema ([3ac4cae]())
* Add OrganizationComplianceResponseRabbit and MqttModule to OrganizationComplianceResponsesModule ([5578539]())
* Add OrganizationComplianceResponseRabbit for organization compliance response message handling ([90f89a1]())
* Add unique composite key to organization_compliance_ai_response_files table ([e42ad95]())
* Add unique constraint to compliance_questions table in Prisma migration ([7b07d15]())
* add unique constraint to organization_compliance_responses in prisma migrations ([7536133]())
* Add unique key to organization compliance AI responses table ([513747b]())
* Added compliance dependency chain models in database migration ([5c4976e]())
* Added models for compliance responses and AI responses in schema.prisma ([dc92c25]())
* Enable ComplianceRepository export in MqttModule ([5098ecc]())
* Enhance MQTT service with replyTo function and packet details in onMessage callback ([5042c78]())
* Extend MQTT validator schemas and create new compliance schemas for various payload types ([b5270e2]())
* Implement building of dependency chains in compliance model seeding ([2d7e611]())
* Implement ComplianceRepository with methods for compliance data retrieval ([72c179d]())
* include organization_compliance_status in getOrgComplianceStatusGroups() ([acf2857]())
* migration script to add additional_context column to compliance_response models ([19d843a]())
* Update service exports and remove MQTT Consumer ([10786ef]())

# [1.219.0-cold-789.6]() (2024-05-12)


### Features

* Add ComplianceModule with repositories for managing compliance data ([981ac5a]())

# [1.219.0-cold-789.5]() (2024-05-10)


### Bug Fixes

* fix issue where complianceQuestionListByOrgIdCompNameKey failed to return questions ([95bdd33]())


### Features

* Add additional context field to organization_compliance_responses and organization_compliance_ai_responses in Prisma schema ([5d7776d]())
* Add compliance flow handling in Rabbit service ([b6edc6d]())
* Add compliance processing to chat service in cold platform openai ([fc6a3a0]())
* Add createComplianceSession method and ICFPSession interface to freeplay service ([76e1b95]())
* Add createComplianceSession method and ICFPSession interface to freeplay service ([8068bc4]())
* Add MqttModule and MqttService to ChatModule ([562bc2e]())
* Add optional survey_definition to ComplianceDefinition schema ([9753054]())
* Add optional survey_definition to ComplianceDefinition schema ([3ac4cae]())
* Add OrganizationComplianceResponseRabbit and MqttModule to OrganizationComplianceResponsesModule ([5578539]())
* Add OrganizationComplianceResponseRabbit for organization compliance response message handling ([90f89a1]())
* Enable ComplianceRepository export in MqttModule ([5098ecc]())
* migration script to add additional_context column to compliance_response models ([19d843a]())

# [1.219.0-cold-789.4]() (2024-05-08)


### Features

* include organization_compliance_status in getOrgComplianceStatusGroups() ([acf2857]())

# [1.219.0-cold-789.3]() (2024-05-08)


### Bug Fixes

* change queries in the compliance repository for MQTT API ([ede5951]())

# [1.219.0-cold-789.2]() (2024-05-08)


### Features

* Update service exports and remove MQTT Consumer ([10786ef]())

# [1.219.0-cold-789.1]() (2024-05-08)


### Bug Fixes

* Add auto-increment function to "compliance_responses" table in Prisma migration ([aa399b6]())
* Alter table to change 'answer' column type to JSONB in 'organization_compliance_ai_responses' ([3d5bee7]())
* Make 'answer' column in 'organization_compliance_ai_responses' table nullable ([b85df35]())
* Make AI response ID optional in organization compliance responses table ([c6f35ec]())
* Removed invalid unique key from compliance responses database table ([4678d9c]())
* set 'references' and 'sources' columns in 'organization_compliance_ai_responses' table to optional ([3b8939e]())
* update Amazon surveys list in seed_compliance_definitions.ts ([da5cb96]())


### Features

* Add compliance_responses table with necessary fields, indices, and foreign key constraints. Added column to organization_compliance_responses table. ([dea7845]())
* Add MQTT (socket API) service and RabbitMQ service to organizations module ([c359f5b]())
* Add unique composite key to organization_compliance_ai_response_files table ([e42ad95]())
* Add unique constraint to compliance_questions table in Prisma migration ([7b07d15]())
* add unique constraint to organization_compliance_responses in prisma migrations ([7536133]())
* Add unique key to organization compliance AI responses table ([513747b]())
* Added models for compliance responses and AI responses in schema.prisma ([dc92c25]())
* Enhance MQTT service with replyTo function and packet details in onMessage callback ([5042c78]())
* Extend MQTT validator schemas and create new compliance schemas for various payload types ([b5270e2]())
* Implement ComplianceRepository with methods for compliance data retrieval ([72c179d]())

# [1.218.0]() (2024-05-07)


### Features

* update handling of due date and term in compliance definition and not survey definition ([fab5aea]())

# [1.219.0-COLD-711.2]() (2024-05-09)


### Features

* handle mqtt mocks in storybook ([5777583]())

# [1.219.0-COLD-711.1]() (2024-05-09)


### Features

* handle section groups, sections and questions using MQTT ([60b7f9f]())
* initial work for compliance manager page ([910001e]())
* remove old survey code ([e2a4538]())
* update application layout for the new management page ([87501d9]())

# [1.213.0-COLD-711.3]() (2024-05-09)


### Features

* update application layout for the new management page ([87501d9]())

# [1.213.0-COLD-711.2]() (2024-05-08)


### Features

* handle section groups, sections and questions using MQTT ([60b7f9f]())

# [1.213.0-COLD-711.1]() (2024-05-03)


### Features

* initial work for compliance manager page ([910001e]())
* remove old survey code ([e2a4538]())

# [1.212.0]() (2024-04-29)


### Features

* added feature flag toggling to go back to old design and fixed issue with linking for sidebar not navigating on click ([2e9f07a]())
* handle transitions and when sub menu item is selected ([8267d8f]())
* initial changes to the sidebar and application layout ([5d34714]())
* truncate the dropdown for the nav bar ([2544c86]())

## [1.211.2]() (2024-04-29)


### Bug Fixes

* add shadow db env variable ([dc87dda]())

## [1.211.1]() (2024-04-29)


### Bug Fixes

* add patch route for organizations ([130ea99]())

# [1.211.0]() (2024-04-25)


### Features

* show up icon when showing activities ([b0398d7]())

## [1.210.4]() (2024-04-25)


### Bug Fixes

* correct percent answered in compliance page ([1646d02]())

## [1.210.4-COLD-764.1]() (2024-04-25)


### Bug Fixes

* correct percent answered in compliance page ([1646d02]())

## [1.210.3]() (2024-04-25)


### Bug Fixes

* make sure to use org compliances when available ([5e66c8d]())

## [1.210.2]() (2024-04-25)


### Bug Fixes

* keep 80px image when feature flag is off ([b350ae7]())

## [1.210.1]() (2024-04-25)


### Bug Fixes

* add overridden surveys to compliance_definition ([5852655]())

# [1.210.0]() (2024-04-24)


### Features

* increase svg size in compliance wizard ([0bca7e6]())
* put logo background color behind feature flag ([250eaa1]())
* set logo size to 120 px ([a33db91]())

# [1.210.0-COLD-762.1]() (2024-04-24)


### Features

* increase svg size in compliance wizard ([0bca7e6]())
* put logo background color behind feature flag ([250eaa1]())

## [1.209.1]() (2024-04-24)


### Bug Fixes

* return 404 when survey name is not found ([27c4b87]())

# [1.209.0]() (2024-04-24)


### Bug Fixes

* bug where a session might not be available ([f32d1d4]())


### Features

* freeplay improvements ([d40c921]())

## [1.208.3]() (2024-04-24)


### Bug Fixes

* org compliances bug ([c126461]())


## [1.208.2]() (2024-04-24)


### Bug Fixes

* org compliances bug ([ac0f4e6]())

## [1.208.1]() (2024-04-23)



### Bug Fixes

* org compliances bug ([cb616ed]())

* org compliances bug ([#407](ssues/407)) ([6cc3dad]())

# [1.208.0]() (2024-04-23)


### Features

* add gray background for logo ([3107b47]())

## [1.207.1]() (2024-04-23)


### Bug Fixes

* survey status bug ([45c3074]())

# [1.207.0]() (2024-04-23)


### Features

* add subcategory_labels to emission scopes ([8142328]())
* add subcategory_labels to emission scopes ([3fb468e]())

# [1.206.0]() (2024-04-23)


### Features

* format tooltip tonnes label and added tco2e to the end of each item ([6fbf2d0]())
* remove tc02e from the tooltip ([cd8d835]())

# [1.205.0]() (2024-04-22)


### Bug Fixes

* add statuses to response ([96505bd]())


### Features

* add new orgSurveyStatus route ([463d7a8]())
* add new orgSurveyStatus route ([#403](ssues/403)) ([f4fa4c3]())

# [1.204.0]() (2024-04-22)


### Features

* create new compliance page ([5c4fd2c]())
* initial changes ([4fbf0c0]())
* remove height setting for image ([665a5a2]())

# [1.203.0]() (2024-04-22)


### Bug Fixes

* register bar controller for bar chart ([bb88aea]())


### Features

* add formatting to tonnes and percents ([fb940a5]())
* add regression and tooltip to bar chart ([fa8f581]())
* add white border to select ([3e9dada]())
* correct image styling and tootlip handling ([2fbeed0]())
* correct regression bar, added tooltip to bar chart ([7a78fab]())
* correct text ([e56cbfa]())
* donut chart hover updates and dropdown with other activities row ([16ca9f9]())
* fix data label issue not appearing sometimes ([54b4811]())
* fix dropdown changes height on hover ([b52ae5f]())
* fix table width ([1b89ef5]())
* initial changes ([f812d98]())

# [1.203.0-COLD-744.1]() (2024-04-22)


### Features

* add regression and tooltip to bar chart ([fa8f581]())
* add white border to select ([3e9dada]())
* correct image styling and tootlip handling ([2fbeed0]())
* correct regression bar, added tooltip to bar chart ([7a78fab]())
* donut chart hover updates and dropdown with other activities row ([16ca9f9]())
* fix data label issue not appearing sometimes ([54b4811]())
* fix table width ([1b89ef5]())
* initial changes ([f812d98]())

# [1.202.0]() (2024-04-19)


### Bug Fixes

* add surveys_override to request body ([6610d7a]())
* specifically check for empty surveys_override array. ([81e9502]())


### Features

* add surveys_override to organization_compliances table ([4c67128]())
* add surveys_override to organization_compliances table ([#396](ssues/396)) ([742f30e]())
* return surveys_override if present otherwise return surveys array ([94ab318]())

## [1.201.9]() (2024-04-19)


### Bug Fixes

* update ui staging to still hit localhost for the API ([9d4009b]())

## [1.201.8]() (2024-04-19)


### Bug Fixes

* bugs in question routes ([e2f40f4]())

## [1.201.7]() (2024-04-19)


### Bug Fixes

* bug causing OOM due to retrieving too many vectors in DB. ([78ebc82]())

## [1.201.6]() (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([95c5d37]())

## [1.201.5]() (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([1354439]())

## [1.201.4]() (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([cf5d8f7]())

## [1.201.3]() (2024-04-18)


### Bug Fixes

* partial fix for files with invalid unicode characters causing app to crash. ([02bda42]())

## [1.201.2]() (2024-04-18)


### Bug Fixes

* improved file injection process ([02c6f25]())

## [1.201.1]() (2024-04-18)


### Bug Fixes

* 502 issues ([3a8ca10]())

# [1.201.0]() (2024-04-16)


### Features

* search document repository ([aa160aa]())

# [1.200.0]() (2024-04-16)

### Features

* search document repository ([df764fa]())

# [1.199.0]() (2024-04-15)

### Features

* add keep previous to application swr config ([0005d5c]())

# [1.198.0]() (2024-04-15)

### Features

* add feature flag to control throttling ([d685382]())

## [1.197.1]() (2024-04-13)

### Bug Fixes

* null items in reference array ([b6ef905]())

# [1.197.0]() (2024-04-13)

### Features

* add crawler service ([c5e3d78]())

# [1.196.0]() (2024-04-12)

### Bug Fixes

* cors issue ([bad0954]())

### Features

* add crawler service ([36d5954]())

## [1.195.1]() (2024-04-12)

### Bug Fixes

* make sure the AI response is captured in Freeplay ([6911040]())

# [1.195.0]() (2024-04-12)

### Features

* show scopes percentage to 2 decimal points ([e1ad7fe]())

# [1.194.0]() (2024-04-11)

### Bug Fixes

* fix showing faciility selector when a single year ([72751f7]())

### Features

* add learn more button to emissions overview card ([a6fe296]())
* added sorting to year data for charts and updated stories ([41835bc]())
* handle single year emissions ([767b1a0]())
* remove header from emissions scope card ([f1623d4]())
* update provider to use single year emissions ([426a76a]())

# [1.193.0]() (2024-04-11)

### Features

* add progress bar for assessments for compliances that are score based ([068da70]())
* use correct data fields ([4fae29d]())

# [1.192.0]() (2024-04-11)

### Features

* add throttle to swr mutates from MQTT messages to 10 per minute ([6991fea]())
* added loading and disabling for automate button when kicked off ([9fa8325]())
* adding keep previous data to compliance set survey call to prevent undefined during revalidation ([2d261d5]())

## [1.191.4]() (2024-04-10)

### Bug Fixes

* use correct field for question summary ([e839520]())

## [1.191.4-cold-667.1]() (2024-04-10)

### Bug Fixes

* use correct field for question summary ([e839520]())

## [1.191.3]() (2024-04-10)

### Bug Fixes

* delete env file for api ([8ce64df]())
* use different env variable for CORS resolution ([7d5a990]())

## [1.191.2]() (2024-04-10)

### Bug Fixes

* delete env.staging file ([7bc1e2f]())

## [1.191.1]() (2024-04-09)

### Bug Fixes

* add ghg_subcategory to unique key due to duplicates ([f9bbcfc]())

# [1.191.0]() (2024-04-09)

### Features

* added bar highlighting and other changes when a year/bar is selected ([49cec73]())
* update endpoint and emissions payload type ([aa725cd]())

# [1.190.0]() (2024-04-09)

### Features

* added logging to emission charts ([a8c3594]())
* carbon footprint updates based on design ([3ff67c9]())
* emission carb footprint changes ([3482a06]())
* making code more reusable ([515f1a0]())
* more changes for the scope cahrt ([d1f56e2]())

# [1.189.0]() (2024-04-09)

### Features

* update the language of our authentication errors ([27690b9]())
* update the language of our authentication errors ([#383](ssues/383)) ([9e29e32]())

# [1.188.0-cold-708.1]() (2024-04-09)

### Features

* update the language of our authentication errors ([27690b9]())

# [1.187.0]() (2024-04-05)

### Features

* add ghg sub-scopes ([faa206f]())
* add ghg sub-scopes ([5a9433a]())

# [1.186.0]() (2024-04-05)

### Bug Fixes

* updated swagger decorators ([3ab05fe]())

### Features

* add emission_scopes routes ([9bdc5a5]())
* add ghg sub-scopes ([faa206f]())
* add ghg sub-scopes ([5a9433a]())

## [1.185.2]() (2024-04-04)

### Bug Fixes

* 204 issue ([441030e]())

## [1.185.1]() (2024-04-04)

### Bug Fixes

* intermittent 502 errors ([8ad9392]())

# [1.185.0]() (2024-04-03)

### Features

* updates to logging to be more leaner ([81dbde9]())
* updates to logging to be more leaner ([#370](ssues/370)) ([e6db07e]())

## [1.184.3]() (2024-04-03)

### Bug Fixes

* possible null reference ([2621cb6]())
* update FP session to contain relevant metadata ([3546471]())

## [1.184.2]() (2024-04-03)

### Bug Fixes

* attempt to address additional_context issue ([1c6afb7]())

## [1.184.1]() (2024-04-03)

### Bug Fixes

* issues with formatting ([86e6442]())

# [1.184.0]() (2024-04-03)

### Bug Fixes

* clean up context prompt ([7cb0b64]())

### Features

* check if the ai response is valid before showing ai icon ([813d1e6]())

## [1.183.3]() (2024-04-03)

### Bug Fixes

* troubleshoot flightcontrol e2e test support ([00ee219]())

## [1.183.2]() (2024-04-03)

### Bug Fixes

* add logging, comments, and response validation for selects and yes_no ([2513f19]())

## [1.183.1]() (2024-04-02)

### Bug Fixes

* get fP api key from config ([4541eb3]())

# [1.183.0]() (2024-04-02)

### Bug Fixes

* incorrect rabbit payload ([97dcfc1]())

### Features

* implement freeplay integration ([13a17e3]())
* implement freeplay integration ([5449082]())

# [1.182.0]() (2024-04-02)

### Features

* update logging to be lean for large data from the API ([60d4ce4]())

# [1.181.0]() (2024-04-02)

### Features

* handle when the answer is undefined, instead of checking if the value exists or not ([46fcad2]())
* have 'yes' and 'no' be used as true for ai responses ([7bb21ca]())
* have 'yes' and 'no' be used as true for ai responses ([#366](ssues/366)) ([dae713b]())

## [1.180.12]() (2024-04-02)

### Bug Fixes

* add log entry when section is done and when survey is complete ([209cb1f]())

## [1.180.11]() (2024-04-02)

### Bug Fixes

* logging issue ([906f8e1]())

## [1.180.10]() (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([51703fc]())

## [1.180.9]() (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([1fd5cf9]())

## [1.180.8]() (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([c896d34]())

## [1.180.7]() (2024-04-02)

### Bug Fixes

* incorrectly sets ai_answered: false when yes_no answer is false ([c82f2e7]())
* incorrectly sets ai_answered: false when yes_no answer is false ([#352](ssues/352)) ([f2aacaf]())

## [1.180.6]() (2024-04-02)

### Bug Fixes

* add tooltip to question.prompt ([3c76506]())

## [1.180.5]() (2024-04-02)

### Bug Fixes

* add tooltip to question.prompt ([9f4fa22]())

## [1.180.4]() (2024-04-01)

### Bug Fixes

* prompt bug ([af91500]())

## [1.180.3]() (2024-04-01)

### Bug Fixes

* prompt bug ([0284ded]())

## [1.180.2]() (2024-04-01)

### Bug Fixes

* bug that would prevent updated flag values getting passed to prompt service ([eab4854]())

## [1.180.1]() (2024-04-01)

### Bug Fixes

* logging question key ([4f7815a]())

# [1.180.0]() (2024-04-01)

### Bug Fixes

* moved openai tools out from under langchain folder ([a7d04ea]())
* remove unused params ([fe0f071]())
* using wrong model flag name ([4cd5e67]())

### Features

* refactor to remove langchain from calling openai ([2e6ed61]())
* store links between files and vector records ([9476c0b]())

## [1.179.6]() (2024-03-29)

### Bug Fixes

* increase instance count ([69bca25]())

## [1.179.5]() (2024-03-29)

### Bug Fixes

* missing complete prompt ([a2ac57a]())

## [1.179.4]() (2024-03-29)

### Bug Fixes

* incorrect kind value ([d11ec9a]())

## [1.179.3]() (2024-03-29)

### Bug Fixes

* add sleeps to prevent rate limiter ([daa6368]())
* centralize prompt processing ([f0a8fca]())

## [1.179.2]() (2024-03-28)

### Bug Fixes

* create index prior to running ([f94e486]())

## [1.179.1]() (2024-03-28)

### Bug Fixes

* disable assistant creation if Rag flag is on ([88a6d43]())
* disable assistant creation if Rag flag is on ([#358](ssues/358)) ([2e4b444]())

# [1.179.0]() (2024-03-28)

### Features

* use the corresponding question (question summary) when it's available ([ba9d2c5]())
* use the corresponding question (question summary) when it's available ([#357](ssues/357)) ([b3c9aa3]())

# [1.178.0]() (2024-03-28)

### Bug Fixes

* check if assistant still exists ([45601f8]())
* delete jobs from cache ([0aae188]())
* dependency resolution ([cf88f56]())
* remove unused custom loaders ([5a95589]())
* tsconfig issues ([ab0e1ce]())

### Features

* add additional file types ([e231584]())
* add chat module ([69f0dac]())
* add langchain module ([b38b94f]())
* add listObjects method ([c86f14d]())
* add package deps ([97c8b2e]())
* add pdf, xls, word loaders ([1f47517]())
* add pinecone module ([64b4ff3]())
* adding chat components ([0bdf526]())
* get/set checksum cache to prevent dupes from being added to the index ([e25d1d9]())
* improved documents in response ([b1e3412]())
* initial support for RAG ([dc65a47]())

# [1.176.0-cold-657.5]() (2024-03-28)

### Bug Fixes

* tsconfig issues ([ab0e1ce]())

### Features

* improved documents in response ([b1e3412]())

# [1.176.0-cold-657.4]() (2024-03-28)

### Features

* initial support for RAG ([dc65a47]())

# [1.176.0-cold-657.3]() (2024-03-27)

### Features

* adding chat components ([0bdf526]())

# [1.176.0-cold-657.2]() (2024-03-27)

### Bug Fixes

* check if assistant still exists ([45601f8]())
* delete jobs from cache ([0aae188]())
* remove unused custom loaders ([5a95589]())

### Features

* add additional file types ([e231584]())
* get/set checksum cache to prevent dupes from being added to the index ([e25d1d9]())

# [1.176.0-cold-657.1]() (2024-03-26)

### Bug Fixes

* dependency resolution ([cf88f56]())

### Features

* add chat module ([69f0dac]())
* add langchain module ([b38b94f]())
* add listObjects method ([c86f14d]())
* add package deps ([97c8b2e]())
* add pdf, xls, word loaders ([1f47517]())
* add pinecone module ([64b4ff3]())

# [1.175.0]() (2024-03-25)

### Features

* add launchdarkly for compliance markdown ([4053024]())
* handle mulit context checking and setting ([942b98d]())

# [1.174.0]() (2024-03-25)

### Features

* add response validator to justification ([f08b4c3]())

## [1.173.1]() (2024-03-23)

### Bug Fixes

* rename missed location > facility ([32da050]())
* rename missed location > facility ([52dfff8]())

# [1.173.0]() (2024-03-23)

### Bug Fixes

* add missing migrations ([b2e1e4d]())
* rename locations to facilities ([7327c3c]())

### Features

* create facilities resource ([de6c960]())
* create organization_facilities model ([4bf6813]())
* create organization_facilities model ([65e31d1]())
* create organization_facilities model ([4c6edaf]())
* emission_scopes model ([07aa574]())
* support mass deleting orgs ([75cc450]())

## [1.172.1]() (2024-03-23)

### Bug Fixes

* bug counting questions with `null` as answer ([8d2cce2]())

# [1.172.0]() (2024-03-23)

### Features

* emission_scopes model ([24bf372]())

# [1.170.0-cold-650.1]() (2024-03-22)

# [1.171.0]() (2024-03-22)

### Features

* emission_scopes model ([24bf372]())
* add cookie to set 5 min expiration when users start the automation ([85abae0]())

# [1.170.0]() (2024-03-22)

### Features

* update util function with missing operators and reuse it in the old survey questionnaire ([9913391]())

# [1.169.0]() (2024-03-21)

### Features

* add question number to saved and regular questionnaire ([4fa114c]())

# [1.168.0]() (2024-03-21)

### Bug Fixes

* correct subcategory journey preview story ([53c12d3]())

### Features

* handle local storage for expanded sections ([107c803]())
* remove percent slider unnecessary try catch when parsing int ([1f069ae]())
* update dismissible to use org partitioned local storage ([a71be34]())

## [1.167.3]() (2024-03-21)

### Bug Fixes

* remove SurveyUpdate interceptor from update ([000ecb4]())

## [1.167.2]() (2024-03-20)

### Bug Fixes

* issue that could result in AI responses not being returned ([d96e71d]())

## [1.167.1]() (2024-03-20)

### Bug Fixes

* route to return all survey results for an org. ([3a17571]())
* route to return all survey results for an org. ([919d05e]())

# [1.167.0]() (2024-03-20)

### Features

* make assistant instructions configurable from launch darkly ([9c16e88]())

## [1.166.1]() (2024-03-20)

### Bug Fixes

* bug with `GET /surveys` route. Was returning empty array now returns all survey definitions. ([097621a]())
* deprecate old survey routes ([3eaefcd]())

* route to return all survey results for an org. ([919d05e]())
* store job data in cache so that it can be used to cancel previous jobs ([93d8811]())
* survey data bugs ([5074dd6]())

## [1.166.1-cold-647.1]() (2024-03-20)

### Bug Fixes

* store job data in cache so that it can be used to cancel previous jobs ([93d8811]())
* survey data bugs ([5074dd6]())

# [1.166.0]() (2024-03-19)

### Features

* navigate to regular questionnaire when the last saved question is unbookmarked ([854d4dd]())

# [1.166.0-COLD-642.1]() (2024-03-18)

### Features

* navigate to regular questionnaire when the last saved question is unbookmarked ([854d4dd]())

## [1.165.1]() (2024-03-18)

### Bug Fixes

* update percent slider to handle non number and out of range (<0 or >100) values ([9609db6]())

# [1.165.0]() (2024-03-18)

### Features

* add support for compliance key for multiple compliance sets and impersonating orgs ([b2d80cc]())

# [1.164.0]() (2024-03-18)

### Features

* add saved survey questionnaire handling ([54298db]())
* check for saved questions only in the saved questions section ([d2a7e35]())

## [1.163.1]() (2024-03-15)

### Bug Fixes

* make sure logo doesn't bleed over the bounding area ([9525479]())

# [1.163.0]() (2024-03-13)

### Features

* make base prompt configurable via darkly ([90bd510]())
* make base prompt configurable via darkly ([9e1c241]())
* make component prompts configurable via darkly ([7e1d978]())
* make tools configurable via darkly ([9bba0e6]())
* update delete assistant function ([20071d0]())

## [1.162.1]() (2024-03-13)

### Bug Fixes

* bug in policies throwing 500 error ([af83962]())

# [1.162.0]() (2024-03-13)

### Features

* resolve issue with list item input when values already provided ([58bba97]())
* update list item input design ([db19d00]())

## [1.161.1]() (2024-03-13)

### Bug Fixes

* allow select when value provided is a string ([b3675fa]())
* dont show selected options when the value is not an array ([93faf3d]())

## [1.161.1-COLD-621.1]() (2024-03-13)

### Bug Fixes

* allow select when value provided is a string ([b3675fa]())

# [1.161.0]() (2024-03-13)

### Bug Fixes

* remove broken test ([c5efc76]())
* Remove journey module on subcategory actions list page ([f4cf554]())

### Features

* Update AI message look and feel and add it for additional context ([5dd8798]())

# [1.160.0]() (2024-03-13)

### Features

* show ai icon if question is ai answered ([fd2a17e]())

## [1.159.1]() (2024-03-12)

### Bug Fixes

* bug that deleted survey rather than survey data ([b3b8734]())

# [1.159.0]() (2024-03-12)

### Bug Fixes

* Fix test related to Assessments ([7b12ec7]())
* properly support multiple urls in OrgSWR ([6b8cc3a]())

### Features

* Finish adjustment of Journey component to Assessment component and add stories ([0827305]())
* set up assessments page to use compliance info ([1641b5b]())

# [1.158.0]() (2024-03-12)

### Features

* mqtt updates ([59acc3b]())

# [1.158.0-COLD-573.1]() (2024-03-11)

### Features

* mqtt updates ([59acc3b]())

# [1.157.0]() (2024-03-11)

### Bug Fixes

* properly support multiple urls in OrgSWR ([6b8cc3a]())

### Features

* Finish adjustment of Journey component to Assessment component and add stories ([0827305]())
* set up assessments page to use compliance info ([1641b5b]())

# [1.155.0-cold-522.1]() (2024-03-08)

### Bug Fixes

* properly support multiple urls in OrgSWR ([6b8cc3a]())

### Features

* set up assessments page to use compliance info ([1641b5b]())

# [1.154.0]() (2024-03-07)

### Features

* increase robustness of next steps module ([0ffd364]())

# [1.153.0]() (2024-03-07)

### Features

* one more for move to 2023 for footprinting year ([2664cdd]())

# [1.152.0]() (2024-03-07)

### Features

* move to 2023 for footprinting year ([e772b4c]())
* move to 2023 for footprinting year ([#325](ssues/325)) ([53c9e06]())

# [1.151.0]() (2024-03-07)

### Features

* show next actions and emissions charts again, but put emissions chart behind a flag ([b6e660c]())

## [1.150.1]() (2024-03-07)

### Bug Fixes

* tweak prompts ([c5bdd42]())

# [1.150.0]() (2024-03-07)

### Features

* add spinner and disable button when uploading ([722edee]())
* add timeout to axiosfetcher options ([dee7ae1]())

# [1.149.0]() (2024-03-06)

### Features

* add spinner and disable button when uploading ([722edee]())
* handle when survey is different than response from the API ([76ed8af]())
* remove prevention of submission of additional context if no answer provided ([3d8e47f]())
* sort survey sections by category and then idx ([4f755a4]())

# [1.149.0-COLD-595.2]() (2024-03-06)

### Features

* handle when survey is different than response from the API ([76ed8af]())
* sort survey sections by category and then idx ([4f755a4]())

# [1.149.0-COLD-595.1]() (2024-03-06)

### Features

* remove prevention of submission of additional context if no answer provided ([3d8e47f]())

# [1.148.0]() (2024-03-06)

### Features

* add scroll bar when left nav items are too high ([e8f8596]())

# [1.148.0-COLD-587.1]() (2024-03-06)

### Features

* add scroll bar when left nav items are too high ([e8f8596]())

## [1.147.1]() (2024-03-06)

### Bug Fixes

* only show surveys for activated compliances ([65eddb5]())

# [1.147.0]() (2024-03-06)

### Features

* if any questions are answered show the questionnaire ([aafd774]())

# [1.146.0]() (2024-03-06)

### Bug Fixes

* reduce spacing in wizard top cards ([eb46f48]())

### Features

* show compliances with next steps module ([dee174b]())

# [1.146.0-cold-583.1]() (2024-03-06)

### Bug Fixes

* reduce spacing in wizard top cards ([eb46f48]())

### Features

* show compliances with next steps module ([dee174b]())

# [1.145.0]() (2024-03-06)

### Features

* add and use active key to local storage ([a6cda28]())
* allow ai answer array to answer single select option ([e4e6e83]())
* handle collapse free form ([affe944]())

# [1.144.0]() (2024-03-06)

### Bug Fixes

* improve look and feel of long questions (COLD-572) ([500f239]())
* swap users and account settings ([89ac8e7]())
* update copy (COLD-550) ([33b2817]())

### Features

* align look and feel of progress bars (COLD-580) ([5c18905]())
* improve look and feel of AI box ([b8b6abf]())
* more tweaks for look and feel of assessment cards (COLD-580) ([7a9d5ef]())
* some copy tweaks (COLD-545) ([a83bd0c]())

# [1.143.0-cold-544.1]() (2024-03-06)

### Bug Fixes

* improve look and feel of long questions (COLD-572) ([500f239]())
* swap users and account settings ([89ac8e7]())
* update copy (COLD-550) ([33b2817]())

# [1.143.0]() (2024-03-06)

### Features

* align look and feel of progress bars (COLD-580) ([5c18905]())
* improve look and feel of AI box ([b8b6abf]())
* more tweaks for look and feel of assessment cards (COLD-580) ([7a9d5ef]())
* some copy tweaks (COLD-545) ([a83bd0c]())
* make the assessments page empty for right now ([d22020b]())
* update text of card when it's not populated with data ([9f34cd5]())

# [1.142.0]() (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([4b04ad4]())

### Features

* underline text on hover for compliance question ([3b8bf5c]())

## [1.141.3]() (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([3c40731]())

## [1.141.2]() (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([a671531]())

## [1.141.1]() (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([47f68cf]())

# [1.141.0]() (2024-03-05)

### Features

* sort api response ([436ad9b]())

## [1.140.3]() (2024-03-05)

### Bug Fixes

* strip rubric from the survey ([f1d7c21]())

## [1.140.2]() (2024-03-05)

### Bug Fixes

* compliance filtering issue ([7e62721]())

## [1.140.1]() (2024-03-05)

### Bug Fixes

* create thread on each section and run all sections in parallel ([86c7c35]())
* darkly initilization issue ([66a90b7]())
* make gpt model configured via darkly ([99c1750]())
* request size issue ([3d36621]())
* tls issue with redis ([12f398d]())

# [1.140.0]() (2024-03-05)

### Features

* remove multiply 100 from assessments preview percentage ([00aa1ad]())

# [1.139.0]() (2024-03-05)

### Features

* use subtract icon section that has completed ([70d41ec]())

# [1.138.0]() (2024-03-05)

### Features

* add index to question number ([7dc78ca]())
* do not send progress as well as definition ([6b4406e]())
* sections not complete, dont show checkmark ([6bed2f2]())

## [1.137.1]() (2024-03-05)

### Bug Fixes

* temporarily remove caching for getting an org survey ([ebcc8f9]())
* temporarily remove caching for getting an org survey ([#311](ssues/311)) ([fb18eff]())

# [1.137.0]() (2024-03-05)

### Features

* add line clamp for section names ([0b3e32c]())

# [1.136.0]() (2024-03-05)

### Features

* remove check to take user to processing ([ff69f06]())
* use question index instead of idx for question number in a section ([370f5f2]())

# [1.135.0]() (2024-03-05)

### Features

* if there are any attempted ai questions, then go to questionnaire ([e362c52]())

# [1.134.0]() (2024-03-05)

### Features

* category issue ([7400d7a]())
* fix issue ([7863418]())

# [1.133.0]() (2024-03-05)

### Features

* make change to survey progress to be put out of definition structure ([18dc398]())

# [1.133.0-COLD-542.1]() (2024-03-05)

### Features

* make change to survey progress to be put out of definition structure ([18dc398]())

# [1.132.0]() (2024-03-05)

### Features

* add error boundary to compliance assessments ([ff16930]())
* add small card outline to progress card ([e06d6d0]())
* create new compliance assessments preview card ([daa4ccf]())
* update progress card percentage to fixed 0 decimal points ([3f585d2]())
* update survey mutating ([55c1200]())
* use progress for compliance progress and assessments preview card ([52de3ae]())
* use survey progress total score and max score for assessments preview card ([4f33be1]())

# [1.131.0]() (2024-03-05)

### Features

* allow input value to be submitted with list ([e89f3e9]())

## [1.130.3]() (2024-03-05)

### Bug Fixes

* trying to debug build issues ([dc7a226]())

## [1.130.2]() (2024-03-05)

### Bug Fixes

* trying to debug build issues ([c84d2dc]())

## [1.130.1]() (2024-03-05)

### Bug Fixes

* issues caused by other refactoring ([68fcccd]())

# [1.130.0]() (2024-03-04)

### Bug Fixes

* revert to including `definition` object ([3442d2c]())

### Features

* update progress object to add: ([666f8c1]())

# [1.129.0]() (2024-03-04)

### Features

* add error boundary for compliance flow ([8d3af39]())

# [1.128.0]() (2024-03-04)

### Features

* include max score in survey response ([156fe47]())

# [1.127.0]() (2024-03-04)

### Features

* home page update for rei compliance mvp ([52df416]())
* update compliance_definitions/organization to organizations ([7b5caed]())

## [1.126.1]() (2024-03-04)

### Bug Fixes

* s3 bug related to file uploads ([588ec12]())
* s3 bug related to file uploads ([5785029]())

# [1.126.0]() (2024-03-04)

### Features

* use plus and subtract icons for compliance survey nav ([5532389]())

# [1.125.0]() (2024-03-04)

### Features

* create compliance progress card ([90bf66a]())

# [1.124.0]() (2024-03-04)

### Features

* compliance survey questionnaire ([ee48487]())
* created custom checkbox icon ([01217fc]())
* handle last question of the survey answered ([a031b4c]())
* on submit close survey ([bcc2da4]())
* revert small checkbox icon ([5e84335]())
* set category opened when navigated to section ([914da20]())
* show highlighted background for section when selected ([d45facb]())

## [1.123.3]() (2024-03-04)

### Bug Fixes

* add logging and simplify file uploads ([296b014]())

## [1.123.2]() (2024-03-04)

### Bug Fixes

* add missing 'await' that was causing members to not be returned ([263a51d]())

## [1.123.1]() (2024-03-04)

### Bug Fixes

* bug preventing progress from being added to survey ([04f0da0]())
* refactor compliances ([a3dadc4]())

# [1.123.0]() (2024-03-01)

### Features

* Change POST to PUT to start ai processing ([49108b2]())
* update compliance page to activate and go to wizard ([1a055f3]())

## [1.122.2]() (2024-03-01)

### Bug Fixes

* survey dependency bug ([fd5bb65]())>>>>>>> main

## [1.122.1]() (2024-03-01)

### Bug Fixes

* survey dependency bug ([18b074c]())

# [1.122.0]() (2024-03-01)

### Bug Fixes

* send definition rather than whole survey ([c21e376]())

### Features

* add scoring service ([b2822c2]())

## [1.121.1]() (2024-02-29)

### Bug Fixes

* add missing dependency ([cb7e395]())

# [1.121.0]() (2024-02-29)

### Bug Fixes

* update /settings/user to /settings/users ([8f02a47]())

### Features

* added checkbox input type ([4c0cbe0]())
* created list item input component, added plus and subtract icons ([2a5dae1]())
* has any operator to check if the value array has any of the comparison array values ([231de0e]())
* point assessments to old journey page ([5f41bb2]())
* put list on top of list item input, prevent submission of empty values and empty list ([70a88f3]())
* remove company info from sidebar ([21581ee]())
* update form input number, currency styling ([d03e513]())
* update icons to use color prop ([41f133f]())
* updated styling for default input types ([4482218]())

# [1.120.0]() (2024-02-29)

### Features

* add array comparison, has and in opertators ([4a4d349]())

# [1.119.0]() (2024-02-29)

### Features

* add progress array to response ([f11989c]())

* add survey filter class ([f53ad9a]())

# [1.118.0]() (2024-02-27)

### Features

* added processing step to compliance flow ([be0a790]())

# [1.117.0]() (2024-02-27)

### Features

* adding multifetcher with mutliple urls ([3db8f97]())
* handle maintaining user progress ([ceb7af8]())
* have step stories use rei 2 compliance data ([67f28cc]())

## [1.116.1]() (2024-02-22)

### Bug Fixes

* bug throwing 'no organizations found in DB...' error ([51111cf]())
* possible null reference ([747aac6]())
* this should default to openai ([4e93cd2]())

# [1.116.0]() (2024-02-22)

### Features

* create documents upload wizard ([318a259]())
* Handle documents upload in document uploads step ([dee0457]())
* made updates to reuse functions for document upload ([f9398c0]())

# [1.116.0-COLD-498.1]() (2024-02-22)

### Features

* create documents upload wizard ([318a259]())

# [1.115.0]() (2024-02-22)

### Features

* added automate compliance flow step ([a24d563]())
* added new compliance lair base for steps that have the same layout ([c914541]())
* correct post requests to compliance endpoint ([5406c18]())
* remove open ai fetcher ([0b633b2]())
* remove VITE_OPENAI_URL references ([43f6678]())
* updated storybook mock provider to have wizard context ([f7a9b92]())

# [1.115.0-COLD-499.2]() (2024-02-21)

### Features

* added new compliance lair base for steps that have the same layout ([c914541]())
* updated storybook mock provider to have wizard context ([f7a9b92]())

# [1.115.0-COLD-499.1]() (2024-02-20)

### Features

* added automate compliance flow step ([a24d563]())
* correct post requests to compliance endpoint ([5406c18]())

## [1.114.2]() (2024-02-20)

### Bug Fixes

* make organization files a module ([d58fa9b]())

## [1.114.1]() (2024-02-20)

### Bug Fixes

* inconsistent AWS credentials object ([5b261df]())

# [1.114.0]() (2024-02-15)

### Features

* created wizard flow with compliance sets ([9ed0c55]())
* removed next and previous buttons from compliance wizard, renamed automation to progress route ([b729fcc]())

# [1.114.0-COLD-497.1]() (2024-02-15)

### Features

* created wizard flow with compliance sets ([9ed0c55]())

# [1.113.0]() (2024-02-15)

### Features

* correct actions route reference ([ae09760]())
* Made updates for tests ([11fbb46]())
* point footprint links to reports/carbon_footprint page ([d6e74c3]())
* remove management from account and user management sidebar items ([535f1a3]())
* update settings pages with correct titles ([ecd9e42]())
* updated nav for REI compliance mvp ([165b3ac]())

## [1.112.1]() (2024-02-14)

### Bug Fixes

* fix user undefined error and throw error when they occur during updating team member ([2dd6e48]())

## [1.112.1-COLD-508.1]() (2024-02-14)

### Bug Fixes

* fix user undefined error and throw error when they occur during updating team member ([2dd6e48]())

# [1.112.0]() (2024-02-13)

### Features

* remove initial survey check on application and dependencies ([24afcbf]())

# [1.111.0]() (2024-02-13)

### Features

* added new document upload flag and put journry page and modules behind compliance flag ([42a8d0c]())

## [1.110.1]() (2024-02-12)

### Bug Fixes

* get rediscloud_url from secrets ([29e636d]())
* only the service key should be passed not the entire package.json file ([ffec5cc]())
* pass initialized config service ([ee1e8a7]())

# [1.110.0]() (2024-02-12)

### Features

* add document list table to component seed definitions ([6875554]())

## [1.109.2]() (2024-02-12)

### Bug Fixes

* add ability to override aws_profile via env variable ([87ab217]())

## [1.109.1]() (2024-02-11)

### Bug Fixes

* broken LD initialization ([4d60573]())

# [1.109.0]() (2024-02-11)

### Bug Fixes

* add survey id key ([ccd1470]())
* add survey id key ([5e55796]())
* get var from config ([69aa610]())
* inject prisma client ([2b803fe]())
* remove redundant modue ([3fe7901]())
* throw if DD_SERVICE || NODE_ENV not set ([efe91fd]())
* update configuration module to load vars from config ([cf204ec]())
* update mqtt service to load vars from config ([da654d1]())
* update token service to load vars from config ([03d6e57]())
* use AWS creds from env vars if running in FC ([4a40fd7]())
* use loaded secrets ([22b69a7]())

### Features

* add delete surveys route ([66b3aa4]())

## [1.108.1]() (2024-02-09)

### Bug Fixes

* add configuration.module ([c5a4fdb]())

# [1.108.0]() (2024-02-09)

### Features

* get access token only when the organization and user is authenticated ([67d687d]())
* use mqtt url env variable ([8ba7d71]())

## [1.107.1]() (2024-02-08)

### Bug Fixes

* correct action patch ([3968838]())
* fix action typing issue ([7898eac]())

# [1.107.0]() (2024-02-07)

### Features

* dont display next actions module if there are no actions ([a6b294c]())

# [1.106.0]() (2024-02-07)

### Bug Fixes

* set max-h and max-w for logo in complianceOverviewCard.tsx ([54aded3]())

### Features

* added orgcompliance return type to getOrganizationComplianceMockByName function ([adfd27f]())

## [1.105.1-cold-487.1]() (2024-02-06)

### Bug Fixes

* set max-h and max-w for logo in complianceOverviewCard.tsx ([54aded3]())

# [1.105.0]() (2024-02-06)

### Bug Fixes

* correct storybook changes ([580a399]())

### Features

* add new compliance module to tests ([0b2e4ff]())
* add next steps to interaction tests ([6c45c2f]())
* Added addtional context to interaction tests ([d02ea4e]())
* Added more interaction tests ([786bf3e]())
* code improvement ([4b5f415]())
* correct test errors ([282da7a]())
* increase z index of taoaster so it appears over a takeover ([5c8f65e]())
* make codebase improvements ([61564bf]())
* remove console log ([554f9c5]())
* remove unneeded build storybook step ([afbb03c]())
* setup interaction tests ([a15c1da]())
* update footprint empty data msw handlers to pass tests ([3ce471f]())
* update to action detail ([c4661f6]())
* Update yaml to run storybook tests ([560f197]())
* updated application story to add document, compliance and settings tests ([9670f66]())
* use takeover for initial loading to not show guidance button ([80324d0]())
* use takeover for signup page ([c299ca2]())

## [1.104.3]() (2024-02-06)

### Bug Fixes

* broken migrations due to search and replace bug ([b3cad19]())

## [1.104.2]() (2024-02-06)

### Bug Fixes

* broken import statements ([02e94e6]())

## [1.104.1]() (2024-02-06)

### Bug Fixes

* switch to configService ([bc6d6b6]())

# [1.104.0]() (2024-02-06)

### Bug Fixes

* add module exports ([2eee8fb]())
* clean up import ([8863b82]())
* clean up location schema ([7babfa5]())
* cleanup code, move prompts to class ([cfe4120]())
* get config settings from LD ([4a91b8c]())
* implement file service ([1d5574b]())
* implement re-usable service to broadcast rabbit to all integrations ([be21f09]())
* issue that would block redis jobs ([22f4f6c]())
* issue that would block redis jobs ([8ff1e74]())
* make mqtt global ([378e4f3]())
* moved prompts to class ([bca4d28]())
* nack() messages when event is not supported by service ([66bbd5c]())
* null reference error ([11c8d0b]())
* re-organize organization modules ([d7f8076]())
* return instance to support non DI implementations ([41e64c1]())

### Features

* add secrets manager module ([2c45d05]())
* add secrets manager module ([bcf2a94]())
* implement MQTT on all CRUD updates across all resources ([6a58144]())

# [1.103.0]() (2024-02-05)

### Features

* add logging for seeding components ([2831821]())
* add seed components file ([6947106]())
* code improvement ([3e6821c]())
* correct component definition data ([2fc08fc]())
* reuse and rename seed form defitnitions to component definitions ([9d50887]())

## [1.102.1]() (2024-02-05)

### Bug Fixes

* return survey definition correctly even if name is updated ([c01ec8b]())
* return survey definition correctly even if name is updated ([#256](ssues/256)) ([6ce3e2a]())

# [1.102.0]() (2024-02-01)

# [1.97.0-cold-475.1]() (2024-02-02)

### Bug Fixes

* get config settings from LD ([4a91b8c]())
* implement re-usable service to broadcast rabbit to all integrations ([be21f09]())
* nack() messages when event is not supported by service ([66bbd5c]())
* null reference error ([11c8d0b]())
* return instance to support non DI implementations ([41e64c1]())

### Features

* removed hardcoded REI compliance references and other changes ([3072e77]())

# [1.101.0]() (2024-01-27)

### Features

* added scrollbar when overflows and auto margin for survey question flex tiem ([fcf4281]())

# [1.100.0]() (2024-01-26)

### Features

* change user-facing journey modules to gap assessments for demo-ing ([f0803b1]())
* change user-facing journey modules to gap assessments for demo-ing ([#247](ssues/247)) ([a23d514]())

# [1.99.0]() (2024-01-26)

### Bug Fixes

* change empty string to null based on recommendation ([826c032]())

### Features

* remove COMPLIANCE type questions from next steps module and improve formatting when module is empty ([c80dc1b]())
* remove COMPLIANCE type surveys from next steps module and imp… ([#246](ssues/246)) ([88577df]())

# [1.98.0]() (2024-01-25)

### Features

* make updates to action detail page and handle links to subcategory actions that dont exist ([8ea811c]())

# [1.97.0]() (2024-01-25)

### Features

* Limit surveys in next steps to 3 ([1659167]())

## [1.96.1]() (2024-01-24)

### Bug Fixes

* issue that would block redis jobs ([22f4f6c]())
* issue that would block redis jobs ([8ff1e74]())
* openAI improvements ([317bdf4]())

# [1.96.0]() (2024-01-23)

### Features

* added VITE_MQTT_URL to env variables and made fixes to resolve console errors ([9954052]())
* resolve unexpected chromatic changes ([4c66292]())

# [1.95.0]() (2024-01-23)

### Features

* added survey data validation before submitting ([2ae1758]())

# [1.94.0]() (2024-01-23)

### Bug Fixes

* resolve txt input bug ([3805434]())

### Features

* added specific typing to additionalContextQuestion ([e520daa]())
* fix survey question container error ([b13abee]())

# [1.93.0]() (2024-01-22)

### Bug Fixes

* fix select option bug where it cant deal with undefined values ([2c6c011]())

### Features

* check component before submitting ([c5acfea]())

## [1.92.1]() (2024-01-22)

### Bug Fixes

* remove hash from files and comment cache in compliances ([623ee6b]())

# [1.92.0]() (2024-01-22)

### Bug Fixes

* add specific types for ai response answer ([4e9eef9]())

### Features

* fix typing issue ([c3ec93f]())

# [1.91.0]() (2024-01-22)

### Features

* added check for component type ([0589da0]())
* added select option checks and skip addtional context ai response ([e709eb1]())

## [1.90.9]() (2024-01-22)

### Bug Fixes

* fix compliance caching ([106bb18]())
* openAI hangups ([4abe96d]())

## [1.90.8]() (2024-01-22)

### Bug Fixes

* cache ([8aa1e80]())

## [1.90.7]() (2024-01-22)

### Bug Fixes

* missing await ([c793f10]())

## [1.90.6]() (2024-01-22)

### Bug Fixes

* processing async rabbit ([5c11618]())

## [1.90.5]() (2024-01-22)

### Bug Fixes

* nested data object ([1f876c7]())

## [1.90.4]() (2024-01-22)

### Bug Fixes

* incorrect role for compliances ([2728766]())

## [1.90.3]() (2024-01-22)

### Bug Fixes

* stream bug ([ffa7466]())

## [1.90.2]() (2024-01-22)

### Bug Fixes

* stream bug ([a0e4569]())

## [1.90.1]() (2024-01-22)

### Bug Fixes

* util.inspect bug? ([e04d10b]())

# [1.90.0]() (2024-01-22)

### Features

* added keys to compliance overview nad detail page elements ([540c4cf]())
* adding MQTT and more updates to compliance handling ([36a7986]())
* compliance page updates ([9ab491e]())
* Create compliance overview and detail page. ([a057afc]())
* handle compliance page error boundary and added check for documents list array type ([dba6b09]())
* more compliance updates ([230d61a]())
* more updates to MQTT and compliance detail page ([77793a2]())
* use env variable to environment ([7b51932]())

# [1.89.0]() (2024-01-22)

### Features

* added keys to compliance overview nad detail page elements ([540c4cf]())
* adding MQTT and more updates to compliance handling ([36a7986]())
* compliance page updates ([9ab491e]())
* Create compliance overview and detail page. ([a057afc]())
* more compliance updates ([230d61a]())

# [1.89.0-COLD-462.1]() (2024-01-22)

### Features

* adding MQTT and more updates to compliance handling ([36a7986]())
* compliance page updates ([9ab491e]())
* Create compliance overview and detail page. ([a057afc]())
* more compliance updates ([230d61a]())

## [1.88.7]() (2024-01-21)

### Bug Fixes

* fix null reference issues ([5ebb1a2]())

## [1.88.6]() (2024-01-21)

### Bug Fixes

* fix null reference issues ([6542f33]())

## [1.88.5]() (2024-01-21)

### Bug Fixes

* add missing files!! ([d4a6147]())

## [1.88.4]() (2024-01-21)

### Bug Fixes

* remove extra COMPLIANCE entry ([d92a964]())

## [1.88.3]() (2024-01-21)

### Bug Fixes

* remove extra COMPLIANCE entry ([d683a4e]())

## [1.88.2]() (2024-01-21)

### Bug Fixes

* refactor files and createAssistant to work with new process ([be8d40e]())

## [1.88.1]() (2024-01-21)

### Bug Fixes

* standardize survey responses ([a54a34e]())

# [1.88.0]() (2024-01-21)

### Bug Fixes

* add compliance survey type ([22159f0]())
* mqttProvider ([98fd6ff]())

### Features

* add ld flag and removed button from table mock ([270f2af]())
* add openai url env variable ([225aa51]())
* added open api url to flightcontrol json ([85761b8]())
* create upload page and mqtt to wss connection handling ([9e6d572]())
* removed fc file changes ([10f701c]())
* updates to upload page ([704fa75]())
* Upload initial code ([4d8e276]())

## [1.87.3]() (2024-01-20)

### Bug Fixes

* implement full e2e processing between api/openai ([43f70a2]())

## [1.87.2]() (2024-01-20)

### Bug Fixes

* implement org compliances ([3b46b52]())

## [1.87.1]() (2024-01-19)

### Bug Fixes

* implement compliance definitions ([3b08fa2]())

# [1.87.0]() (2024-01-19)

### Bug Fixes

* make response consistant ([dc68e28]())
* prevent duplicate integrations ([96b2a9c]())
* remove cold admin only restriction on surveys ([aab8f6f]())
* remove cold admin only restriction on surveys ([#231](ssues/231)) ([2eae370]())

### Features

* set section value to null if the section is skipped on submit ([d83001a]())
* submit on last section if it is unanswered or is wanted to be jumped over by answering 'No' ([d3006e0]())

## [1.86.5]() (2024-01-19)

### Bug Fixes

* add missing 'all files' endpoint ([074a867]())
* linking file with asssistant ([dbde396]())

## [1.86.4]() (2024-01-19)

### Bug Fixes

* issue with empty arrays ([281c709]())

## [1.86.3]() (2024-01-19)

### Bug Fixes

* inability to download files ([e07e848]())

## [1.86.2]() (2024-01-19)

### Bug Fixes

* return proper error when integration not found ([c35f413]())

## [1.86.1]() (2024-01-19)

### Bug Fixes

* fixing migration issues ([13993fd]())

# [1.86.0]() (2024-01-19)

### Features

* add compliance modules ([f5c937c]())

# [1.85.0]() (2024-01-19)

### Bug Fixes

* move user-interceptor to library ([1993742]())
* move user-interceptor to library ([f37df07]())
* standardize service package.json ([224aa81]())

### Features

* add openAI files controller ([7be70ed]())

# [1.84.0]() (2024-01-18)

### Features

* Added hardcoded txt to ai justification ([6947e5f]())
* handle survey ai answers ([9811e24]())

## [1.83.13]() (2024-01-18)

### Bug Fixes

* typo in package.json ([1fc1f1b]())

## [1.83.12]() (2024-01-18)

### Bug Fixes

* add compliances ([40f53f8]())
* add compliances ([52e17e7]())

## [1.83.11]() (2024-01-17)

### Bug Fixes

* fix cert issue ([bc4bc1b]())

## [1.83.10]() (2024-01-17)

### Bug Fixes

* change env vars ([b2760b5]())

## [1.83.9]() (2024-01-16)

### Bug Fixes

* add file handling for openAI ([a11f663]())

## [1.83.8]() (2024-01-12)

### Bug Fixes

* add onQueueFailed subscription ([7a5e904]())

## [1.83.7]() (2024-01-11)

### Bug Fixes

* update version in package.jsons ([53079a8]())

## [1.83.6]() (2024-01-10)

### Bug Fixes

* missing service, version in logs ([2638cda]())

## [1.83.5]() (2024-01-10)

### Bug Fixes

* missing service, version in logs ([5f68626]())

## [1.83.4]() (2024-01-09)

### Bug Fixes

* move bayou URL to envVar ([4cd74b0]())

## [1.83.3]() (2024-01-09)

### Bug Fixes

* store utility bills ([39b96d7]())

## [1.83.2]() (2024-01-09)

### Bug Fixes

* isColdAdmin check failing in staging? ([9c6796b]())

## [1.83.1]() (2024-01-09)

### Bug Fixes

* add jobs to redis on rabbit failure ([062eb88]())

# [1.83.0]() (2024-01-09)

### Features

* add location model and new routes ([234279a]())

## [1.82.1]() (2024-01-03)

### Bug Fixes

* new bill webhooks ([33d6bd3]())

# [1.82.0]() (2024-01-03)

### Features

* add create customer to bayou service ([d4eab7e]())

# [1.81.0]() (2024-01-02)

### Features

* add create customer to bayou service ([266518d]())

# [1.80.0]() (2024-01-02)

### Features

* add create customer to bayou service ([eeb49df]())

## [1.79.7]() (2024-01-01)

### Bug Fixes

* let service_definitions consumer process both RPC and ASYNC messages ([752a5c4]())
* skip record if service definition doesn't exist ([16208c9]())

## [1.79.6]() (2024-01-01)

### Bug Fixes

* add redis job queues ([dfccb48]())

## [1.79.5]() (2024-01-01)

### Bug Fixes

* add redis job queues ([c77ec1b]())
* return 202 (accepted) ([727f5fe]())

## [1.79.4]() (2023-12-30)

### Bug Fixes

* coerce date to UTC ([a972cec]())

## [1.79.3]() (2023-12-30)

### Bug Fixes

* troubleshoot tracer ([0e43322]())

## [1.79.2]() (2023-12-30)

### Bug Fixes

* troubleshoot tracer ([703337b]())

## [1.79.1]() (2023-12-30)

### Bug Fixes

* add domain entry for bayou.coldclimate.online and .com ([47326f1]())

# [1.79.0]() (2023-12-30)

### Features

* add bayou webhook payload validation ([2bd110a]())

## [1.78.7]() (2023-12-30)

### Bug Fixes

* fix disconnect issue? ([637097c]())

## [1.78.6]() (2023-12-30)

### Bug Fixes

* fix dd trace module ([a79b307]())

## [1.78.5]() (2023-12-29)

### Bug Fixes

* clean up cron/darkly/nest/rabbit modules ([1495817]())
* comment out cron module ([43b98c1]())

## [1.78.4]() (2023-12-29)

### Bug Fixes

* remove unnecesary configs ([b5c6f60]())

## [1.78.3]() (2023-12-29)

### Bug Fixes

* move tracer to lib ([0699e53]())

## [1.78.2]() (2023-12-29)

### Bug Fixes

* add index to repo ([24b9ca0]())

## [1.78.1]() (2023-12-29)

### Bug Fixes

* add statuscode to logs ([f893973]())

# [1.78.0]() (2023-12-23)

### Bug Fixes

* add service, version tags to initialization logs ([b059c88]())
* implement dynamic flag ([e61d2e6]())
* log health requests based on feature flag ([0a80ca7]())

### Features

* add json flag subscription functions ([2e3dbcc]())
* implement cron service ([f3011d3]())
* implement darkly streaming ([6839740]())
* implement darkly streaming ([731fd49]())
* load nest modules based on feature flags ([496ef3f]())

## [1.77.8]() (2023-12-22)

### Bug Fixes

* add override keyword to onModuleInit ([d962a1c]())

## [1.77.7]() (2023-12-22)

### Bug Fixes

* remove health prefix from climatiq ([fc572fe]())

## [1.77.6]() (2023-12-22)

### Bug Fixes

* logging in platform services ([f9348dc]())

## [1.77.5]() (2023-12-21)

### Bug Fixes

* primsa init issue with services that don't rely on the database ([57ea718]())

## [1.77.4]() (2023-12-21)

### Bug Fixes

* nagging little bugs ([7df55c9]())

## [1.77.3]() (2023-12-21)

### Bug Fixes

* logging interceptor not respecting ENABLE_HEALTH_LOGS flag ([e0a65da]())

## [1.77.2]() (2023-12-21)

### Bug Fixes

* add undefined/null orgId check before checking for cold:Admin ([04b4d05]())

## [1.77.1]() (2023-12-21)

### Bug Fixes

* remove auth0 types ([ae0e422]())
* remove auth0 types ([#209](ssues/209)) ([657a4d0]())

# [1.77.0]() (2023-12-21)

### Bug Fixes

* implement nest library ([9b1820e]())
* path resolution in test ([a395790]())
* remove database_url from platform preview apps ([0e83756]())

### Features

* add bayou microservice ([8d7506b]())

## [1.76.5]() (2023-12-21)

### Bug Fixes

* make prisma module global ([b4df262]())
* make prisma module global ([#208](ssues/208)) ([029c40e]())

## [1.76.4]() (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([1b0ab6e]())
* add bayou service to preview block ([e4b7fb5]())
* add manual deploy for preview ([a35dd2c]())
* allow all roles on org scoped requests ([2f435a8]())
* remove database_url from platform preview apps ([7d2e709]())

## [1.76.4-cold-447.4]() (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([1b0ab6e]())

## [1.76.4-cold-447.3]() (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([e4b7fb5]())

## [1.76.4-cold-447.2]() (2023-12-21)

### Bug Fixes

* remove database_url from platform preview apps ([7d2e709]())

## [1.76.4-cold-447.1]() (2023-12-21)

### Bug Fixes

* allow all roles on org scoped requests ([2f435a8]())

## [1.76.3]() (2023-12-21)

### Bug Fixes

* published_at validation bug ([f8b814f]())

## [1.76.2]() (2023-12-21)

### Bug Fixes

* role bug ([baf80ed]())

## [1.76.1]() (2023-12-19)

### Bug Fixes

* switch service to register via publish rather than RPC ([93ec04d]())

# [1.76.0]() (2023-12-15)

### Features

* added sorting and not showing the module if there are no steps ([ec04e13]())
* Create next steps module ([6bd6f8f]())
* Update typing ([71ad0c9]())

## [1.75.1]() (2023-12-14)

### Bug Fixes

* prevent redactor from mutating object ([4cbcd8d]())

# [1.75.0]() (2023-12-13)

### Bug Fixes

* Configure Traefik proxy and extend docker-compose ([80981c7]())
* Configure Traefik proxy and extend docker-compose ([24bef3b]())
* custom action in Datadog workflows ([5fcd777]())
* error handling in organization.service ([dfc4853]())
* fix datadog service build ([989dc0e]())
* fix github actions workflow ([0d21148]())
* Implement RabbitMQ context check in interceptors and guards ([6e6e58d]())
* Integrate AMQP Connection into ColdRabbitService and AppModule ([6c12c2a]())
* issue caused by merge conflicts. ([7da35ae]())
* Refactor RabbitMQ integration in ColdRabbitModule ([44ecc12]())
* Update auth0 module dependencies and initialization ([f594bee]())
* Update Datadog workflows and add new OpenAI service workflow ([9640ca6]())
* Update main.ts to modify AppModule import path ([a374888]())

### Features

* Add integration service types to "service_definitions" ([291329c]())
* Add RabbitMQ module and update AWS SDK dependency versions ([dafcb7b]())
* Add RabbitMQ module and update AWS SDK dependency versions ([e9f711d]())
* Add service_definitions model to Prisma schema ([745176f]())
* Add unique index on `name` in `service_definitions` ([ccd0302]())
* Added addtional context to surveys ([9c2e425]())
* Create "service_definitions" model in database ([ddd6205]())
* Initialize Climatiq and RabbitMQ services ([6c90b26]())
* Update AppModule and add BayouService in Climatiq app ([7e3a45b]())
* update to survey input styling and improved logic ([dca46f5]())

# [1.74.0-cold-000-climatiq.1]() (2023-12-10)

### Features

* Add RabbitMQ module and update AWS SDK dependency versions ([e9f711d]())
* Initialize Climatiq and RabbitMQ services ([6c90b26]())

## [1.73.10]() (2023-12-08)

### Bug Fixes

* surveys issue ([9047c57]())
* surveys issue ([3c5701b]())

## [1.73.9]() (2023-12-08)

### Bug Fixes

* barrel file issue ([d8234d6]())

## [1.73.8]() (2023-12-08)

### Bug Fixes

* barrel file issue ([48c3fc9]())
* barrel file issue ([6ef74f1]())

## [1.73.7]() (2023-12-08)

### Bug Fixes

* barrel file issue ([a793020]())

## [1.73.6]() (2023-12-08)

### Bug Fixes

* barrel file issue ([16723c4]())

## [1.73.5]() (2023-12-08)

### Bug Fixes

* barrel file issue ([4f46731]())

## [1.73.4]() (2023-12-08)

### Bug Fixes

* disable cache ([b4b5daa]())

## [1.73.3]() (2023-12-08)

### Bug Fixes

* update VITE_DD_SERVICE ([69a5197]())

## [1.73.2]() (2023-12-08)

### Bug Fixes

* refactor authentication / caching ([52a5129]())

## [1.73.1]() (2023-12-06)

### Bug Fixes

* versioning ([35cd479]())

# [1.73.0]() (2023-12-06)

### Bug Fixes

* migrate to config service ([2d359d3]())
* missing env vars ([0b8abb9]())

### Features

* add openai service scaffolding ([7146d07]())
* reduce instance counts ([c718c1c]())

## [1.72.12-cold-000007-test-issue.1](st-issue.1) (2023-12-05)

### Bug Fixes

* migrate to config service ([2d359d3]())

## [1.72.11]() (2023-12-02)

### Bug Fixes

* return object instead of throwing ([731dd10]())
* typo in log message ([3d945c1]())

## [1.72.10]() (2023-12-01)

### Bug Fixes

* don't tear down db unless in CI ([70914de]())
* minor issues ([982f657]())
* redactor issue ([34e89c5]())
* remove vite_auth0_client_id ([4ef5b5d]())

## [1.72.9]() (2023-12-01)

### Bug Fixes

* add additional telemetry ([a527748]())

## [1.72.8]() (2023-12-01)

### Bug Fixes

* remove max depth ([8dd8939]())

## [1.72.7]() (2023-11-30)

## [1.72.7-cold-000005.2]() (2023-11-30)

### Bug Fixes

* redactor issue ([34e89c5]())

## [1.72.7-cold-000005.1]() (2023-11-30)

### Bug Fixes

* health check logs ([fc6299d]())
* minor issues ([982f657]())

## [1.72.6]() (2023-11-29)

### Bug Fixes

* add circuit breaker to redactor ([e33d242]())

## [1.72.5]() (2023-11-29)

### Bug Fixes

* debug log error ([69a7585]())

## [1.72.4]() (2023-11-29)

### Bug Fixes

* only run on pr ([3f84d91]())

## [1.72.3]() (2023-11-29)

### Bug Fixes

* update deploy hook ([2c43937]())

## [1.72.2]() (2023-11-29)

### Bug Fixes

* add lodash.set ([d1f4a5e]())
* add lodash.set ([4743986]())
* remove lodash dep ([ac66049]())

## [1.72.2-cold-0004.3]() (2023-11-29)

### Bug Fixes

* remove lodash dep ([ac66049]())

## [1.72.2-cold-0004.2]() (2023-11-29)

### Bug Fixes

* add lodash.set ([d1f4a5e]())

## [1.72.2-cold-0004.1]() (2023-11-29)

### Bug Fixes

* add lodash.set ([4743986]())

## [1.72.1]() (2023-11-29)

### Bug Fixes

* error in logger ([80db42c]())

# [1.72.0]() (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f]())
* broken version ([98be095]())
* broken version ([5b05bb9]())
* build ([0bb1e0a]())
* build ([a872027]())
* cancel dupe actions ([9b90935]())
* dont version on PR ([6486568]())
* update cancel action version ([ab7eccd]())

### Features

* cancel outdated actions ([76b9d59]())

# [1.72.0-cold-0002.2]() (2023-11-29)

### Bug Fixes

* update cancel action version ([ab7eccd]())

# [1.72.0-cold-0002.1]() (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f]())
* broken version ([98be095]())
* broken version ([5b05bb9]())
* build ([0bb1e0a]())
* build ([a872027]())
* cancel dupe actions ([9b90935]())
* dont version on PR ([6486568]())

### Features

* cancel outdated actions ([76b9d59]())

## [1.71.1-cold-0001.3]() (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f]())
* broken version ([98be095]())
* broken version ([5b05bb9]())
* build ([0bb1e0a]())
* cancel dupe actions ([9b90935]())

## [1.71.1-cold-0001.3]() (2023-11-29)

### Bug Fixes

* broken version ([5b05bb9]())
* build ([0bb1e0a]())
* cancel dupe actions ([9b90935]())

## [1.71.1-cold-0001.3]() (2023-11-29)

### Bug Fixes

* build ([0bb1e0a]())
* cancel dupe actions ([9b90935]())

## [1.71.1-cold-0001.3]() (2023-11-29)

### Bug Fixes

* build ([0bb1e0a]())

## [1.71.1-cold-0001.2]() (2023-11-29)

### Bug Fixes

* build ([a872027]())

## [1.71.1-cold-0001.1]() (2023-11-29)

### Bug Fixes

* dont version on PR ([6486568]())

# [1.71.0]() (2023-11-29)

### Bug Fixes

* add tests ([4bd8c64]())
* add tests ([3f7ad98]())
* consolidate deploy steps ([4ece12c]())
* correct sidebar styling after flowbite react update ([326a25c]())
* improve build ([ec25746]())
* issue causing 404 when accessing apiDocs or health endpoint ([6de58db]())
* move authorization/guards/filters to lib ([93b7457]())
* move cron module and objectUtils to lib ([c8ca863]())
* move schemas to validation library ([8fe55c4]())
* move schemas to validation library ([fdd0422]())
* rename path alias ([f43bedf]())
* rename path alias ([361ac7b]())
* rename path alias ([c2ee1c4]())
* rename path alias ([4ee0ee5]())
* resolve react types mismatch ([08c77dc]())
* unhandled error case ([b73b06d]())
* unhandled error case ([39398f0]())
* update yarn lock and react types ([fc66157]())
* use faster stringify ([64e51c3]())

### Features

* add api codebase to monorepo ([b4923d6]())
* add dockerfiles ([3d26a88]())
* add functioning api to monorepo ([1f45cc9]())
* add openai service ([7457661]())
* add shared nest lib to monorepo ([941b3a5]())
* fix ui build issues ([affe153]())
* resolve typing issue ([064234e]())
* resolve ui build errors ([0d266d2]())

# [1.71.0-staging.3](staging.2...v1.71.0-staging.3) (2023-11-28)

### Bug Fixes

* consolidate deploy steps ([4ece12c]())

# [1.71.0-staging.2](staging.1...v1.71.0-staging.2) (2023-11-28)

### Bug Fixes

* correct sidebar styling after flowbite react update ([326a25c]())
* update yarn lock and react types ([fc66157]())

### Features

* fix ui build issues ([affe153]())

# [1.71.0-staging.1](staging.1) (2023-11-27)

### Bug Fixes

* add tests ([4bd8c64]())
* add tests ([3f7ad98]())
* issue causing 404 when accessing apiDocs or health endpoint ([6de58db]())
* move authorization/guards/filters to lib ([93b7457]())
* move cron module and objectUtils to lib ([c8ca863]())
* move schemas to validation library ([8fe55c4]())
* move schemas to validation library ([fdd0422]())
* rename path alias ([f43bedf]())
* rename path alias ([361ac7b]())
* rename path alias ([c2ee1c4]())
* rename path alias ([4ee0ee5]())
* resolve react types mismatch ([08c77dc]())
* unhandled error case ([b73b06d]())
* unhandled error case ([39398f0]())
* use faster stringify ([64e51c3]())

### Features

* add api codebase to monorepo ([b4923d6]())
* add dockerfiles ([3d26a88]())
* add functioning api to monorepo ([1f45cc9]())
* add openai service ([7457661]())
* add shared nest lib to monorepo ([941b3a5]())
* resolve typing issue ([064234e]())
* resolve ui build errors ([0d266d2]())

# [1.70.0]() (2023-11-22)

### Features

* filter out /categories errors when they are are a 404 ([c9a16a8]())

# [1.69.0]() (2023-11-22)

### Bug Fixes

* revert max height styling for sections progress ([7ea6614]())

### Features

* added max height restriction and correct background image styling ([843bc08]())
* set max height to 100px or viewport - 122px ([09dcdf6]())

# [1.68.0]() (2023-11-16)

### Features

* add response interceptor for axios to log error in datadogrum ([7c55229]())
* added context object to add error to have more info when investigating ([4d924a8]())

# [1.67.0]() (2023-11-14)

### Bug Fixes

* remove surveys incomplete from mocks for cold admin story ([84b1f62]())

### Features

* add cookie to session storage ([8a134e1]())
* create organization selector on sidebar for cold admins ([97e29b4]())
* reduce font size and dropdown width ([e58f72d]())

# [1.66.0]() (2023-11-14)

### Features

* Remove invite member when user is company:member ([e3f3708]())

# [1.65.0]() (2023-11-13)

### Features

* Created markdown component ([90cf17c]())
* remove unneeded color specification on prose sm custom styling ([77869e6]())
* update small story ([d5d981a]())

# [1.64.0]() (2023-11-03)

### Features

* add user to dd rum to help track users running into errors ([b161fdc]())
* use cold climate claims object for logging ([d09aaa0]())

# [1.63.0]() (2023-11-03)

### Features

* update policy content endpoint ([64c9a1f]())

# [1.62.0]() (2023-11-03)

### Features

* add team member actions ([bc15a6c]())
* Add team member actions back to table for each row ([211abff]())
* Added error message for expired invitation link ([efb96a1]())
* allow roles to be filtered based on role ([5e84596]())
* revert handler changes ([fe00f56]())

# [1.61.0]() (2023-11-02)

### Features

* add 2nd decimal number if needed ([6597f1b]())
* format tonnes to have thousand comma ([2260929]())
* one decimal point ([cde84f7]())
* remove trailing zeroes ([87ba77e]())

# [1.60.0]() (2023-11-01)

### Bug Fixes

* fix build issues ([fc1081b]())

### Features

* check if auth0 or organization data is loading ([e37f9aa]())
* moved table to teammembersettings component ([ae6775b]())
* refactor team member table to own component ([3826928]())

# [1.59.0]() (2023-11-01)

### Bug Fixes

* Make signup page responsive ([f9bc168]())

### Features

* allow flex col to allow stretching. Set max height to avoid image repeating ([a2f0cd4]())

# [1.58.0]() (2023-10-31)

### Features

* add max height and set overflow to auto to only show scrollbar if the list exceeds the height ([62c4350]())
* add overflow and remove overflow ([89e5748]())

# [1.57.0]() (2023-10-27)

### Features

* add SWR error to pages components ([3a70bca]())
* add swrerror logging to molecules ([2d35a77]())
* added more components with auth0error logging ([ca6f19c]())
* Added swr error to organism component ([6d35ff8]())
* setup data dog rum logging functionality ([7bb4c01]())

# [1.56.0]() (2023-10-27)

### Features

* reduce action item image height ([c670e33]())
* remove image height restriction and updated actions overview mock ([8823414]())
* remove progress bar if the action is not ready to execute and all the surveys are not completed ([656adc4]())
* update style of action item progress par ([f863d8c]())
* Updates to action mock and minimum image height ([d711060]())
* use fixed height div to fill in for missing progress bar ([d9b8053]())

# [1.55.0]() (2023-10-27)

### Features

* created util to get username ([17925a8]())
* Update step detail dropdown to specific width ([17b1a94]())
* Update steward to use first and last name. Use name if these dont exist ([c3229af]())
* Updated getusername to formatusername ([f6f4067]())

# [1.54.0]() (2023-10-27)

### Bug Fixes

* remove extra period ([3f00bf5]())
* update to svg attributes to fix console errors ([126f549]())

### Features

* Updated completed banner text ([8943d8f]())

# [1.53.0]() (2023-10-27)

### Features

* Switch overview and step description in step detail ([d310c5a]())

## [1.52.1]() (2023-10-26)

### Bug Fixes

* Team member table doesn't have Members / Invites dropdown ([99f7708]())
* Team member table doesn't have Members / Invites dropdown ([#120](ssues/120)) ([e4992c3]())

# [1.52.0]() (2023-10-25)

### Bug Fixes

* remove callback ([05b2d57]())

### Features

* add useorgswr to team member table ([3d76f46]())
* changed getAPIUrl to getOrgSpecificUrl ([9ce527c]())
* created use swr and auth0 wrapper ([39ba2af]())
* remove coldclimate org id references ([520c791]())
* remove index ts from prebuild ([8c691d7]())
* remove old code from bad merge ([a717140]())
* remove usefetchorg no longer used ([54c11d6]())
* Useorgswr instead of swr when fetching organization data ([49a0438]())

## [1.51.2]() (2023-10-25)

### Bug Fixes

* Handle auth0 error with error page ([ee475f1]())
* Set new mock data to last month to avoid switching from 4 and 5 weeks ([172991c]())

## [1.51.1]() (2023-10-25)

### Bug Fixes

* Update image handling to fit cover container ([95ba7c8]())

# [1.51.0]() (2023-10-23)

### Bug Fixes

* Handle action type change to fix build ([fdeb6b9]())

### Features

* added back revalidate false on mutate action ([e18ada5]())
* Better handle action related items SWR cache update ([8ff1cbf]())
* do not show category description if it does not exist ([a231dcb]())
* reload actions when the search params are updated ([3e9d009]())
* update checkbox return type ([2d05e15]())
* Update mock to dynamic date and not static ([50173eb]())
* update process description padding ([fbfee15]())
* updated action detail objective and process description styling ([5906e24]())

## [1.50.1]() (2023-10-23)

### Bug Fixes

* Invite member button on settings page does not send invitation t… ([#114](ssues/114)) ([96392fe]())
* Invite member button on settings page does not send invitation to new user ([82e24bd]())

### Reverts

* Revert "Auxiliary commit to revert individual files from 5ab276832fd7b6299dd8fa043118927ffa5a4588" ([44e440f]())
* Revert "Auxiliary commit to revert individual files from 1156ece27c8484c892aaf9cef8b8429b128ee31a" ([7c0fffd]())

# [1.50.0]() (2023-10-19)

### Features

* add form section component to error boundary handling ([f2150fd]())
* Create error boundary ([4cf6aec]())
* Render fallback to avoid dependency when initially rendering ([3903dc1]())

# [1.49.0]() (2023-10-19)

### Features

* handle survey and action open at the same time ([3d599f6]())

# [1.48.0]() (2023-10-18)

### Bug Fixes

* remove unused code ([f6f5d25]())
* Updating first or last name in Settings does not show updated name ([5cae7f6]())
* Updating first or last name in Settings does not show updated name ([#110](ssues/110)) ([6f2d242]())

### Features

* Update sidebar to be dynamic based on a company's actions ([6f1ee7b]())
* Update sidebar to be dynamic based on a company's actions ([#111](ssues/111)) ([ac50424]())
* update user select dropdown ([2fb56c4]())

# [1.47.0]() (2023-10-17)

### Bug Fixes

* resolve conflicts ([87c1d26]())

### Features

* add action detail progress ([0a6cf50]())
* Patch action with updated action settings ([03fec88]())
* removed hard width restrictions for action detail progress ([0889163]())

# [1.46.0]() (2023-10-16)

### Features

* Patch action with updated action settings ([cbd2ffa]())
* Patch action with updated action settings ([#106](ssues/106)) ([5544b1b]())

## [1.45.1]() (2023-10-16)

### Bug Fixes

* Put next actions card behind a feature flag ([87b908b]())
* Put next actions card behind a feature flag ([#108](ssues/108)) ([64e2181]())

# [1.45.0]() (2023-10-14)

### Bug Fixes

* corrected story arguments ([3ca581a]())

### Features

* added sub category detail card to action list page ([e954a29]())
* update subcategory actions list ([cb45421]())

# [1.44.0]() (2023-10-13)

### Features

* Use UserSelectDropdown inside stepDetailAssigneeSelector ([db61698]())
* Use UserSelectDropdown inside stepDetailAssigneeSelector ([#102](ssues/102)) ([7dbee04]())

# [1.43.0]() (2023-10-13)

### Features

* create action detail progress component ([6037284]())
* Updated button text to be in the center ([6ea2445]())

# [1.42.0]() (2023-10-13)

### Features

* create SubcategoryActionDetailsCard component ([f24608a]())

# [1.41.0]() (2023-10-12)

### Bug Fixes

* fix type errors after flowbite update ([7e55bf1]())
* fix type errors after flowbite update ([#99](ssues/99)) ([fc5c4ee]())

### Features

* Create ActionsDetail Page ([cca244c]())

# [1.40.0]() (2023-10-12)

### Bug Fixes

* remove old cookie handling ([c75687d]())

### Features

* added cursor pointer on assignee select ([2289f0c]())
* allow whole step detail button to open dropdown ([5888954]())
* Created stepdetails and assigneeselector component ([a19fb5d]())
* Minor tweaks ([56179c0]())
* remove restrict width for up down icon ([6ebc098]())
* Update to step detail work ([3b3ad2d]())

# [1.39.0]() (2023-10-11)

### Bug Fixes

* Add FootprintOverviewDetail interface back ([2b455ec]())
* Add FootprintOverviewDetail interface back ([#98](ssues/98)) ([d74a253]())

### Features

* Create subcategory footprint card variant ([bd5c9a4]())
* Create subcategory footprint card variant ([#89](ssues/89)) ([6a7b0da]())
* Removed use of cookie to store accesstoken and cleaned up runtime console errors ([22b8793]())
* updated fom-definitions to components api call ([a9fb52a]())

# [1.38.0]() (2023-10-05)

### Features

* Create page with right column content for Qaalib to bring home … ([#88](ssues/88)) ([56f298d]())
* Create page with right column content for Qaalib to bring home page with center ([b534e7b]())

# [1.37.0]() (2023-10-05)

### Bug Fixes

* fixed build issue ([94050d4]())

### Features

* adjusted width ([6008032]())
* Created subcategoryactionsoverviecard component ([5e28591]())

# [1.36.0]() (2023-10-05)

### Bug Fixes

* build fix ([7fe3844]())

### Features

* Added button font to theme and update action item code ([4a6d396]())
* added ellipsis ([d7eae3b]())
* created actionitem component ([a7cc427]())
* Update action types ([728a22f]())

# [1.35.0]() (2023-10-04)

### Features

* Create SubcategoryActionsList page ([49e65e3]())
* Create SubcategoryActionsList page ([#84](ssues/84)) ([13da2df]())

## [1.34.2]() (2023-10-04)

### Bug Fixes

* Too much space above chart in footprint overview vertical variant ([380be56]())
* Too much space above chart in footprint overview vertical variant ([#83](ssues/83)) ([771cbee]())

## [1.34.1]() (2023-10-03)

### Bug Fixes

* Consume new members data structure ([b6acc25]())
* Consume new members data structure ([#81](ssues/81)) ([f66695e]())

# [1.34.0]() (2023-10-03)

### Bug Fixes

* Make trailblazer chip full width in journey details ([1342457]())

### Features

* Create NewsCard and NewsItem components ([ddf2173]())
* Create NewsCard and NewsItem components ([#79](ssues/79)) ([507f72e]())

# [1.33.0]() (2023-10-03)

### Bug Fixes

* Added submitted to journeymock to support ([28b5886]())

### Features

* go to last survey question answered ([e1ae0e5]())

# [1.32.0]() (2023-10-02)

### Features

* removed auth0 invitation params from returnto auth0 app state ([5262d92]())

# [1.31.0]() (2023-09-29)

### Features

* Remove mutating journey overview swr call if not in the specific survey ([1cf447c]())
* Removed journey_overview dependency ([70041ef]())

## [1.30.2]() (2023-09-29)

### Bug Fixes

* make sure survey is submitted before checking survey completion ([e147399]())
* mutate with current survey data ([4c0b0ab]())

## [1.30.1]() (2023-09-29)

### Bug Fixes

* make survey more responsive ([ee0f096]())

# [1.30.0]() (2023-09-29)

### Features

* Added last page ([02e8b9e]())

## [1.29.1]() (2023-09-28)

### Bug Fixes

* Missing signed policy data ([ae102ad]())

# [1.29.0]() (2023-09-28)

### Features

* add check for initial survey completion ([8bfc2a8]())

# [1.28.0]() (2023-09-28)

### Features

* skipped submit handling ([b290882]())
* Use new survey data as source of truth to ensure correct submission ([d87107c]())

# [1.27.0]() (2023-09-28)

### Features

* adjust height for select components, updated surveyintro style ([ceef0dd]())
* updated style for intro paragraph text ([7d27ffb]())

## [1.26.2]() (2023-09-28)

### Bug Fixes

* handle all footprint null values ([e621d56]())
* handle all footprint null values ([#68](ssues/68)) ([9990398]())

## [1.26.1]() (2023-09-28)

### Bug Fixes

* Fix usage of data on settings page ([2693660]())
* Fix usage of data on settings page ([#66](ssues/66)) ([242593b]())

# [1.26.0]() (2023-09-28)

### Features

* Create TemperatureCheckCard ([2bfc5d3]())
* Create TemperatureCheckCard ([#58](ssues/58)) ([6dedba0]())

# [1.25.0]() (2023-09-27)

### Features

* add query param when redirecting back to application ([1021042]())

# [1.24.0]() (2023-09-27)

### Features

* added todo comment to handle submitted in the future ([d90a511]())
* submitted to true in survey definition ([e2ab1e3]())

# [1.23.0]() (2023-09-27)

### Bug Fixes

* build failing after merge ([f506fa6]())

### Features

* button change ([a30a29e]())
* sign tos and privacy individually, added more stories ([22f0b26]())
* signup form handling ([4bed6dc]())
* updated button children code ([193ef4b]())

# [1.22.0]() (2023-09-27)

### Bug Fixes

* Corrected unintended top offset styling ([0f26f17]())

### Features

* Added support to only show the animation after moving from previous section to the next ([a14d342]())

# [1.21.0]() (2023-09-27)

### Features

* Build UserSettings component ([a8aa99a]())

# [1.20.0]() (2023-09-27)

### Features

* remove ability to close survey during journey_overview survey ([dcfa3b3]())
* Updated dismiss button label to capitalized ([42e41cf]())

# [1.19.0]() (2023-09-27)

### Features

* added actions flag to footprintdetail and subcatjourneyprev ([2762da9]())
* Added showactions261 flag ([dbb9955]())

# [1.18.0]() (2023-09-27)

### Bug Fixes

* Fix gradient on climate journey chart ([e60b379]())
* Fix gradient on climate journey chart ([#40](ssues/40)) ([3b89374]())
* remove useCreateGradient imports ([2804ed2]())
* remove useCreateGradient imports ([#56](ssues/56)) ([a73a276]())

### Features

* Highlight sidebar item when users navigate ([c41f530]())

## [1.17.2]() (2023-09-26)

### Bug Fixes

* Don't show footprint detail card if the footprint data is null ([ebed3e8]())
* Don't show footprint detail card if the footprint data is null ([#39](ssues/39)) ([56bf6bb]())

## [1.17.1]() (2023-09-26)

### Bug Fixes

* merge api and auth0 user upon signup, do not load until coldpbc cookie is defined ([64d9363]())

# [1.17.0]() (2023-09-25)

### Features

* remove query params on survey close ([0aa804a]())
* removed the query params after submitting survey ([a333a96]())

# [1.16.0]() (2023-09-23)

### Bug Fixes

* redirect to / if last route was logout ([4fffc4d]())
* revert axios fetcher to return an error ([822d1fd]())
* syncing cookie issue, update routing logic, fix signup issue with user data not being updated ([04c6dec]())

### Features

* more updates ([55b3cbe]())
* signup page and authentication routes ([914d389]())
* signup, login and logout routes ([fa6e6f2]())

# [1.15.0]() (2023-09-20)

### Features

* Add journey route and page ([bc05774]())
* Add journey route and page ([#37](ssues/37)) ([c791bec]())

# [1.14.0]() (2023-09-20)

### Bug Fixes

* Fix navigating to empty category section, fixed sorting ([c310477]())

### Features

* addd select all that apply message to multi select ([2729732]())
* created Survey file and surveyName query param ([dd88453]())
* Transition for sections ([6163911]())
* Update to survey code to use smaller image, go to first follow up if the category has no prompt and updated styles ([e07fa18]())
* Updated patch to put method and added transition to background images ([fb517d2]())

# [1.13.0]() (2023-09-19)

### Features

* Add GuidanceButton ([36f9bd4]())
* Add GuidanceButton ([#33](ssues/33)) ([01f3748]())

# [1.12.0]() (2023-09-19)

### Features

* Add footprint page and route ([cdc71c1]())
* Add footprint page and route ([#31](ssues/31)) ([cea1ad5]())

# [1.11.0]() (2023-09-18)

### Bug Fixes

* build fix ([ad77c66]())
* corrected build error ([5121eec]())
* remove empty user type file ([1b6853f]())

### Features

* created signup form component ([3277c0d]())
* Update tos and privacy text ([13873b8]())
* Updated takeover component ([168c074]())
* Updated takeover to better handle logo or title ([aa7cd4d]())

# [1.10.0]() (2023-09-16)

### Bug Fixes

* build fix ([cfd5b47]())
* refactored for survey data changes ([b759b24]())

### Features

* added storybook scripts and moved component to molecules folder ([d9c34a1]())
* better skip handling , added form-data endpoint ([ab9bc47]())
* Support survey form data endpoint change ([917cd9e]())

## [1.9.1]() (2023-09-15)

### Bug Fixes

* update rum injection ([46829fe]())

# [1.9.0]() (2023-09-15)

### Bug Fixes

* correct section progress dependents ([29434f5]())

### Features

* removed ability to go to section after clicking ([9cdbbfa]())

# [1.8.0]() (2023-09-14)

### Features

* Survey Right Nav component ([cfd24db]())

# [1.7.0]() (2023-09-14)

### Features

* Add footprint details chart + card ([672d1f8]())

# [1.7.0-cold-205-create-footprintdetailcard-component.1]() (2023-09-13)

### Features

* Add footprint details chart + card ([672d1f8]())

# [1.6.0]() (2023-09-13)

### Bug Fixes

* kickoff chromatic deploy ([bbd3dd9]())
* removed unnecessary code ([f2ff907]())
* to kickoff chromatic build ([aaca346]())

### Features

* created surveyintro component ([e02e7ee]())
* update to better match font ([25e4951]())
* update to use surveyDataMock file ([d5d0636]())

# [1.6.0-COLD-129.5]() (2023-09-13)

### Bug Fixes

* kickoff chromatic deploy ([bbd3dd9]())

# [1.6.0-COLD-129.4]() (2023-09-12)

### Bug Fixes

* to kickoff chromatic build ([aaca346]())

# [1.6.0-COLD-129.3]() (2023-09-12)

### Bug Fixes

* removed unnecessary code ([f2ff907]())

# [1.6.0-COLD-129.2]() (2023-09-12)

### Features

* update to better match font ([25e4951]())

# [1.6.0-COLD-129.1]() (2023-09-12)

### Features

* created surveyintro component ([e02e7ee]())
* update to use surveyDataMock file ([d5d0636]())

# [1.5.0]() (2023-09-12)

### Bug Fixes

* some bugs fixed ([cd5a657]())

### Features

* Updated survey components to use new survey data structure ([87d92be]())
* updated SurveyLeftNav ([9c4273b]())

# [1.5.0-cold-226-update-retool-to-key-the-categories-and-the-questions-in-the.1](s-and-the-questions-in-the.1) (2023-09-12)

### Bug Fixes

* some bugs fixed ([cd5a657]())

### Features

* Updated survey components to use new survey data structure ([87d92be]())
* updated SurveyLeftNav ([9c4273b]())

## [1.4.1]() (2023-09-12)

### Bug Fixes

* ts-ignore not being honored ([2867465]())

# [1.4.0]() (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a]())
* Add empty state for Journey Chart and Card ([#21](ssues/21)) ([7ee0aa7]())

# [1.4.0-cold-117-create-journeyoverviewcard.1]() (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a]())

# [1.4.0-cold-117-create-journeyoverviewcard.1]() (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a]())

# [1.4.0-cold-117-create-journeyoverviewcard.1]() (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([2f26da2]())

# [1.3.0]() (2023-09-11)

### Features

* COLD-193, COLD-116 ([ba0a14a]())

# [1.3.0-cold-116-create-footprintoverviewcard.1]() (2023-09-11)

### Features

* COLD-193, COLD-116 ([ba0a14a]())

# [1.2.0-cold-116-create-footprintoverviewcard.1]() (2023-09-08)

### Features

* COLD-193, COLD-116 ([ba0a14a]())

# [1.1.0]() (2023-09-07)

### Bug Fixes

* Added back addons for the cookie, auth0 and launchadarkly ([b10b951]())
* build fix ([47b483d]())
* fix build ([1ca2e6b]())
* resolve lottie react ([0332a3a]())
* Set lottie svg width and height ([026dd6f]())
* update to application to trigger chromatic build ([c8e7005]())

### Features

* survey question container component ([78384af]())
* update to chromatic deploy ([3610579]())

# [1.1.0-COLD-230-1.2]() (2023-09-07)

### Bug Fixes

* Added back addons for the cookie, auth0 and launchadarkly ([b10b951]())

# [1.1.0-COLD-230-1.1]() (2023-09-07)

### Bug Fixes

* build fix ([47b483d]())
* fix build ([1ca2e6b]())
* resolve lottie react ([0332a3a]())
* update to application to trigger chromatic build ([c8e7005]())

### Features

* survey question container component ([78384af]())
* update to chromatic deploy ([3610579]())

# [1.1.0-COLD-230.1]() (2023-09-07)

### Bug Fixes

* fix build ([1ca2e6b]())
* resolve lottie react ([0332a3a]())

### Features

* survey question container component ([78384af]())

## [1.0.1]() (2023-09-07)

### Bug Fixes

* add mockServiceWorker.js ([4ab5b50]())
* issues causing invalid URI error ([5b7e457]())
* storybook issues ([d9a59ba]())

# 1.0.0 (2023-09-06)

### Bug Fixes

* add barrel files to gitignore ([fc850b3]())
* add config settings to repo ([88db67f]())
* got the damned thing to build ([2102376]())
* got the styles working ([d12aa21]())
* initial commit ([bda4174]())
