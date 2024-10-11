# [1.421.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.420.0...v1.421.0) (2024-10-11)


### Features

* add AttributeAssuranceGraph to SustainabilityAttributeCard ([af53f72](https://github.com/ColdPBC/cold-monorepo/commit/af53f721aaf93279fa52246d7e4fc59f2bf291c6))
* create new AttributeAssuranceGraph component ([3d30b5e](https://github.com/ColdPBC/cold-monorepo/commit/3d30b5e3d520f896672609d81222ca700e9d0079))

# [1.420.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.419.2...v1.420.0) (2024-10-10)


### Features

* add before read hook documentation to base sidecar entity ([18c9a58](https://github.com/ColdPBC/cold-monorepo/commit/18c9a5868127473415356f2d0007ed70bdabf3f9))

## [1.419.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.419.1...v1.419.2) (2024-10-10)


### Bug Fixes

* correct README.md formatting issues ([705f1ad](https://github.com/ColdPBC/cold-monorepo/commit/705f1ad26ab6b22111b945d31458f1b3c0c9badc))

## [1.419.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.419.0...v1.419.1) (2024-10-10)


### Bug Fixes

* acl type issues ([dde6295](https://github.com/ColdPBC/cold-monorepo/commit/dde62954d127fa48c50e42a4284737b8976db931))

# [1.419.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.418.2...v1.419.0) (2024-10-10)


### Features

* implement ID generation and MQTT messaging on create/update/delete on all entities ([afce367](https://github.com/ColdPBC/cold-monorepo/commit/afce3678dc819a535481b5df172a7b30e5dddb65))

## [1.418.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.418.1...v1.418.2) (2024-10-10)


### Bug Fixes

* add seeds directory to list of files that trigger a new deployment of the Cold API ([de44c32](https://github.com/ColdPBC/cold-monorepo/commit/de44c32f464086d21e330625ea803ffe1c66d623))

## [1.418.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.418.0...v1.418.1) (2024-10-10)


### Bug Fixes

* update access control imports and adjust hook methods formatting ([3c7b2ff](https://github.com/ColdPBC/cold-monorepo/commit/3c7b2ff1b5120e61960e17717114049ba50bfece))

# [1.418.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.417.0...v1.418.0) (2024-10-10)


### Bug Fixes

* add includeNullOrgs to sustainability_attributes entity ([fbf17b2](https://github.com/ColdPBC/cold-monorepo/commit/fbf17b2982be2cd5f5e03014d468dad0a8570b3f))
* add new hook classes for various entities ([e3b531f](https://github.com/ColdPBC/cold-monorepo/commit/e3b531f5482021f096e51bdd80affbdff38aa101))
* **create_sidecar.ts:** update GenerateSideCarClass to include additional parameter ([8eeeeed](https://github.com/ColdPBC/cold-monorepo/commit/8eeeeed0c2615610c998d1d0873310904cc2289c))
* remove commented-out console.log from winston config ([0baf51b](https://github.com/ColdPBC/cold-monorepo/commit/0baf51b1df941bd83a3bbf811ccda66166cdbc06))


### Features

* add default lifecycle hooks for entity operations ([dc53318](https://github.com/ColdPBC/cold-monorepo/commit/dc53318cc41d47c8bdfff67ff61d1e01e1ef3bb8))
* enhance entity hooks generator to support optional base car hooks ([1c85860](https://github.com/ColdPBC/cold-monorepo/commit/1c8586011c543baa54270174974cb148881c3961))

# [1.417.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.416.2...v1.417.0) (2024-10-10)


### Features

* add upcCode fields and refactor ACL policies ([24b24e7](https://github.com/ColdPBC/cold-monorepo/commit/24b24e7ce7df4e8f20aa23837ded1ed91c08f80d))

## [1.416.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.416.1...v1.416.2) (2024-10-10)


### Bug Fixes

* update ACL policies to correctly scope organization IDs ([c888b8d](https://github.com/ColdPBC/cold-monorepo/commit/c888b8d7c2f4e20c3375bda32ddf5cf660721e74))

## [1.416.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.416.0...v1.416.1) (2024-10-09)


### Bug Fixes

* update logic for finding Tier 2 and Used By suppliers, and let Used By be plural, structured in bubbles ([4e04e27](https://github.com/ColdPBC/cold-monorepo/commit/4e04e2743a5a9c7a169d728c08a52077060e79cb))

# [1.416.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.415.3...v1.416.0) (2024-10-09)


### Bug Fixes

* **design feedback:** don't bold the entity count (e.g. '2 Materials') ([8015fdc](https://github.com/ColdPBC/cold-monorepo/commit/8015fdc24b70ad125e962cadfe8b785ea81587c1))
* **styling:** make sure that items fill the available space and are left justified when they are few and/or narrow ([a1ac114](https://github.com/ColdPBC/cold-monorepo/commit/a1ac114c7305161d2c39cc37ec83c3d5229bd11a))


### Features

* add cards, move Empty state strings back to the tab, etc. (sorry it's not more organized) ([978ab8e](https://github.com/ColdPBC/cold-monorepo/commit/978ab8e50bada4b3517cca6ed58750240f4f52c5))
* create new sustainabilityAttributeCard component ([8018ef1](https://github.com/ColdPBC/cold-monorepo/commit/8018ef1116e989c922067e6e76e0e1c4d618e3d2))

## [1.415.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.415.2...v1.415.3) (2024-10-09)


### Bug Fixes

* issue preventing attribute assurance from being created ([12c1987](https://github.com/ColdPBC/cold-monorepo/commit/12c1987ae071b6a1782b5749dad9401984811044))

## [1.415.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.415.1...v1.415.2) (2024-10-09)


### Bug Fixes

* simplify metadata assignment in DocumentDetailsSidebar ([0febfd6](https://github.com/ColdPBC/cold-monorepo/commit/0febfd65a714222c916769b9a02a567f6e4cf5b8))
* update and delete metadata and assurances conditionally ([5dbd6c1](https://github.com/ColdPBC/cold-monorepo/commit/5dbd6c1ae81b986b1836ab85ac7f48f13806190f))

## [1.415.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.415.0...v1.415.1) (2024-10-09)


### Bug Fixes

* update file type check and optimize save button logic ([ad539cb](https://github.com/ColdPBC/cold-monorepo/commit/ad539cb3871aea0476289630b1918c02c5af1531))

# [1.415.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.5...v1.415.0) (2024-10-09)


### Features

* register new queue for file classification in chat module ([0658df5](https://github.com/ColdPBC/cold-monorepo/commit/0658df501e497ce2bcbefd425c8d6b4b36583c05))

## [1.414.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.4...v1.414.5) (2024-10-08)


### Bug Fixes

* move `isImage` function to utility module ([2d35030](https://github.com/ColdPBC/cold-monorepo/commit/2d35030cd1287193ff20ad7d23a1a34312b7ede1))

## [1.414.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.3...v1.414.4) (2024-10-08)


### Bug Fixes

* omit 'extraction_schema' from classification in metadata and refine queue conditionals ([3161f70](https://github.com/ColdPBC/cold-monorepo/commit/3161f709986c5a08dc7cf1394813ae2d4221dda4))

## [1.414.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.2...v1.414.3) (2024-10-08)


### Bug Fixes

* enhance content classification rules ([b3e723c](https://github.com/ColdPBC/cold-monorepo/commit/b3e723c18f576c1ae3b232e4f56a94604e93f555))

## [1.414.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.1...v1.414.2) (2024-10-08)


### Bug Fixes

* correct metadata classification and add extraction details ([fe6908b](https://github.com/ColdPBC/cold-monorepo/commit/fe6908bc3ec61f2ffa65b0cdb0576e0bad2bc7c7))

## [1.414.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.414.0...v1.414.1) (2024-10-08)


### Bug Fixes

* rework classification and extraction services to address REDIS OOM error ([a5591c5](https://github.com/ColdPBC/cold-monorepo/commit/a5591c5e964ced3707c787e283a7e6bcbb8718b5))

# [1.414.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.413.1...v1.414.0) (2024-10-08)


### Bug Fixes

* comment out navigation on row click until supplier detail page is ready ([f1999e1](https://github.com/ColdPBC/cold-monorepo/commit/f1999e16444165ca877ac469c4adfa251a1eef9a))
* update placeholder text and label for tier input ([5fcfc89](https://github.com/ColdPBC/cold-monorepo/commit/5fcfc89e935424f262adc956a09c811450f2072e))


### Features

* add feature flag checks for supplier page routes and buttons ([0eedd3f](https://github.com/ColdPBC/cold-monorepo/commit/0eedd3ff4cb022afda59ed123002f75f704139ea))
* add id prop and test attributes to ComboBox component ([c03ad00](https://github.com/ColdPBC/cold-monorepo/commit/c03ad00afa9c687aaec3c993a48408e17ef6e5de))
* add new GraphQL queries and update mocks ([a27e3ac](https://github.com/ColdPBC/cold-monorepo/commit/a27e3acc13c42192b983e8bfd4aff36eae169250))
* add SupplierRoutes and CreateSupplierPage ([e2b0627](https://github.com/ColdPBC/cold-monorepo/commit/e2b0627b1a2c0a6b6846538d9d9ca030faf9e3cb))
* add support for 'attributes' in setCreateModalType ([0df9cc7](https://github.com/ColdPBC/cold-monorepo/commit/0df9cc7efa6827279363a8b5b6a0b7127b6eebeb))
* ensure supplier list updates on creation ([4fd831a](https://github.com/ColdPBC/cold-monorepo/commit/4fd831a8c6653c62c99d4cd1c4da0155770773d0))
* move loading spinner to header component ([551fb98](https://github.com/ColdPBC/cold-monorepo/commit/551fb9814e6fe4cfde83a77fff2584808ae7b91f))
* rename Material components to Entity components and update interfaces ([93d903c](https://github.com/ColdPBC/cold-monorepo/commit/93d903c33e59e61e26b0d1989d7cf5cb84bce0f2))

## [1.413.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.413.0...v1.413.1) (2024-10-08)


### Bug Fixes

* remove redundant file status check in onRowClick ([64524eb](https://github.com/ColdPBC/cold-monorepo/commit/64524eb053793bf433074c8f6857ebfc7004e2f7))

# [1.413.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.412.1...v1.413.0) (2024-10-07)


### Features

* add tabs and an empty state for each to sustainability page ([00e465c](https://github.com/ColdPBC/cold-monorepo/commit/00e465c964201d5da942ee522d76e08adc5ba7d9))
* create new empty state component with header and body ([1633b71](https://github.com/ColdPBC/cold-monorepo/commit/1633b718a1efb54a202b9d86ab56b0a29642ebdd))

## [1.412.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.412.0...v1.412.1) (2024-10-07)


### Bug Fixes

* return additional data in pinecone service and handle image extensions case-insensitively ([5108a9f](https://github.com/ColdPBC/cold-monorepo/commit/5108a9f6a24d7b2ed4181f2d60360d154c585fdc))

# [1.412.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.411.0...v1.412.0) (2024-10-07)


### Features

* enhance suppliers data grid with products info ([60199cf](https://github.com/ColdPBC/cold-monorepo/commit/60199cfbcbfce9580f7d8aa8e9f19e1f6ecd0e92))

# [1.411.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.410.1...v1.411.0) (2024-10-07)


### Features

* update classification rules for document extraction ([9605762](https://github.com/ColdPBC/cold-monorepo/commit/96057623409e342cdf48b5f8e306f424fa8ce6e2))

## [1.410.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.410.0...v1.410.1) (2024-10-07)


### Bug Fixes

* reorganize schema fields and correct supplier data handling ([7e32913](https://github.com/ColdPBC/cold-monorepo/commit/7e329135a8d933f5624bae497540a86752bbfa6d))

# [1.410.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.409.0...v1.410.0) (2024-10-05)


### Bug Fixes

* remove unique constraint on organization_id and style_code ([bbaf7f8](https://github.com/ColdPBC/cold-monorepo/commit/bbaf7f813fae16f4bda47a51604f38ce6bf9d164))


### Features

* add MaterialsService for processing materials via OpenAI API ([fd6690e](https://github.com/ColdPBC/cold-monorepo/commit/fd6690e19b9c4d0edc061474f89a3a5a0c9bd58b))
* add new dependencies and update scripts for GraphQL and package manager ([ca44e3a](https://github.com/ColdPBC/cold-monorepo/commit/ca44e3ad7475b61f7efc201624060b1b0af9a95d))
* add new schemas for Bill of Materials and Purchase Orders ([5bb2a98](https://github.com/ColdPBC/cold-monorepo/commit/5bb2a98fa0b0f68c10d3301c30010c9cfc5734ae))
* add products schema, module, and service with OpenAI integration for processing product data ([dbca6e3](https://github.com/ColdPBC/cold-monorepo/commit/dbca6e351103f31ffbfc71cb49d1346ca980cfe4))
* add supplier extraction and processing module ([2fb67db](https://github.com/ColdPBC/cold-monorepo/commit/2fb67db5fe2593eaabc586dae6027471f9c88fb6))
* create EntitiesModule with queues for materials, products, and suppliers ([b81b6f9](https://github.com/ColdPBC/cold-monorepo/commit/b81b6f90473438ee8dbf6486504058e3cf47c146))

# [1.409.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.408.1...v1.409.0) (2024-10-04)


### Bug Fixes

* adjust Input label styles for better alignment ([6bd4eb0](https://github.com/ColdPBC/cold-monorepo/commit/6bd4eb0f9d9e02556f118fb25e0fd153a40155a1))
* improve header checkbox selection logic in AddToCreateMaterialModal ([73393de](https://github.com/ColdPBC/cold-monorepo/commit/73393deec23c47d4d967b0dbd0bef6094da369d1))
* update default sort order for material tables ([0749dd6](https://github.com/ColdPBC/cold-monorepo/commit/0749dd62637b0975ecc726aa07667e45e62f74b5))


### Features

* add default sorting to material tables ([f0c5162](https://github.com/ColdPBC/cold-monorepo/commit/f0c5162e548fe7a4fe438ace430805b694a01305))
* add error boundaries to material components ([1de4303](https://github.com/ColdPBC/cold-monorepo/commit/1de430373d78e1da918af5ccf4da0cd4fde3fcc0))
* add material creation functionality ([cb0402f](https://github.com/ColdPBC/cold-monorepo/commit/cb0402f06825428a66d4b89ba2b1915a5eceeff8))
* add missing product ID and correct variable naming ([744a3a4](https://github.com/ColdPBC/cold-monorepo/commit/744a3a4981b66b24f0f2ce7b7b582405d96b3a60))
* add toolbar quick filter to various material components ([2d71067](https://github.com/ColdPBC/cold-monorepo/commit/2d71067e01ef0df2b64a6dcd893436622349e4e6))
* adjust padding in comboBox component ([138fc0e](https://github.com/ColdPBC/cold-monorepo/commit/138fc0e3fc49d26a065c2d26306e35e2f7392492))
* conditionally render 'Add New' button on materials page ([1cd3c82](https://github.com/ColdPBC/cold-monorepo/commit/1cd3c8225acd2482bf4e02c48bfe4874d41fe227))
* consolidate add and create material modals, integrate add products feature ([828bef5](https://github.com/ColdPBC/cold-monorepo/commit/828bef5dbe3adc42f95baa52f8adae7224c50fa2))
* disable cancel button when save button is loading ([035f0a1](https://github.com/ColdPBC/cold-monorepo/commit/035f0a126c21a240fc7e78f25e71c9ea29d499c5))
* enhance Modal component and improve product/attribute addition logic ([e9bbee3](https://github.com/ColdPBC/cold-monorepo/commit/e9bbee311a072a4a9acf072a21f3d4047c8151c8))
* export DEFAULT_PAGE constant and update navigation routes ([02d77e1](https://github.com/ColdPBC/cold-monorepo/commit/02d77e13f4e739d74cf3efbed5c46b5ff634e1e7))
* extract Breadcrumbs component to separate file ([a5f41a4](https://github.com/ColdPBC/cold-monorepo/commit/a5f41a46986b719cc483d4ec6d2ac81aa0dd8c7d))
* improve material modal and table value formatting ([8546867](https://github.com/ColdPBC/cold-monorepo/commit/8546867b047b627ee14b8e55bd0c26e746ee492a))
* remove 'type' column from material modals and tables ([4ae7f16](https://github.com/ColdPBC/cold-monorepo/commit/4ae7f16ba4b2ecfd496cbea7414385d94a6072a5))
* remove defaultPage parameter from MaterialRoutes ([8cb7872](https://github.com/ColdPBC/cold-monorepo/commit/8cb7872ba1cf52030ccf8b7df54d7a7303eb1d03))
* remove row click navigation in MaterialsDataGrid component ([097a8fe](https://github.com/ColdPBC/cold-monorepo/commit/097a8fe2dd1740744bd75a8df04a54c4727cc5b3))
* reorganize createMaterialPage component directory ([b815ebe](https://github.com/ColdPBC/cold-monorepo/commit/b815ebeb74b6e7bc4a7e5d436db403033d7aa2b4))
* update AddToCreateMaterialModal for checkbox functionality and cleanup ([1377bb6](https://github.com/ColdPBC/cold-monorepo/commit/1377bb62f4b6b487271702ae789b42e5307d200b))
* update material routes to conditionally render based on feature flags ([81a2438](https://github.com/ColdPBC/cold-monorepo/commit/81a24385b65e6ca37e654cfff16696b3b2470dd4))
* update route conditions for material pages ([cfa0315](https://github.com/ColdPBC/cold-monorepo/commit/cfa0315122e41af0626895b356a6055ca62a91cb))
* update text styles for input component ([5b8fb9a](https://github.com/ColdPBC/cold-monorepo/commit/5b8fb9ae736d13bafa7c9bbc13549db713f84d26))

## [1.408.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.408.0...v1.408.1) (2024-10-04)


### Bug Fixes

* fix more spots ([d2faebc](https://github.com/ColdPBC/cold-monorepo/commit/d2faebc217a2a2f893347357bf6e1fc73dcb8d26))
* navigate to /questionnaires/... instead of /compliance/... ([3778bd3](https://github.com/ColdPBC/cold-monorepo/commit/3778bd3607e3bb160623358de984367e9210ba5a))

# [1.408.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.407.0...v1.408.0) (2024-10-04)


### Features

* add unique constraints and indexes to various tables ([d4f5a24](https://github.com/ColdPBC/cold-monorepo/commit/d4f5a24c351fc87e38bb7a95a1b53dac9ce2023e))

# [1.407.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.406.0...v1.407.0) (2024-10-04)


### Features

* add GraphQL service to Docker setup ([e8f1239](https://github.com/ColdPBC/cold-monorepo/commit/e8f12393020fb65a1f87731891505ba5f7d2ca34))

# [1.406.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.405.0...v1.406.0) (2024-10-04)


### Features

* add custom response handler for document upload ([1f74ea5](https://github.com/ColdPBC/cold-monorepo/commit/1f74ea58045a3551c28e65dffdffe8523192a397))
* enhance document upload notifications ([eee298e](https://github.com/ColdPBC/cold-monorepo/commit/eee298eee59ef6cb0b7f08b37d19e3be246ce3fe))

# [1.405.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.404.0...v1.405.0) (2024-10-04)


### Features

* add new (extremely basic) Sustainability page ([7df260a](https://github.com/ColdPBC/cold-monorepo/commit/7df260a75869a096491fa1dd8907995240e418b1))
* add new ColdSustainabilityIcon ([84ac0a4](https://github.com/ColdPBC/cold-monorepo/commit/84ac0a4a3c12db62a5d20640939585c5ef45e564))
* add new Sustainability sidebar item that navigates to sustainability page ([b50819a](https://github.com/ColdPBC/cold-monorepo/commit/b50819a7011e8eb421482fb611dd1bfb37e21ace))


### Reverts

* roll back sustainabilityAttributeCard (was intended for a future PR) ([b26bc3b](https://github.com/ColdPBC/cold-monorepo/commit/b26bc3b0e623296cbf51265e29cadfd37dbc1168))

# [1.404.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.403.0...v1.404.0) (2024-10-03)


### Bug Fixes

* remove padding since icon is already 24p x 24p ([c36e4cd](https://github.com/ColdPBC/cold-monorepo/commit/c36e4cd1a34f3c4c446f1594c2082dedfb84a13e))


### Features

* add 2 new icons - questionnaire and chart ([03a7503](https://github.com/ColdPBC/cold-monorepo/commit/03a750333c94a7e772ea7eca2bb6c7c0f0e78449))
* update sidebar and routes ([cde4d33](https://github.com/ColdPBC/cold-monorepo/commit/cde4d3333d1675f5103246786e8f61bdc0ccfd77))

# [1.403.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.402.0...v1.403.0) (2024-10-02)


### Bug Fixes

* add back sorting by display name ([481ae00](https://github.com/ColdPBC/cold-monorepo/commit/481ae001e5eb343a9cec510416ba505cb1e7a3a8))
* default to Cold Climate from the get-go ([4b47dc5](https://github.com/ColdPBC/cold-monorepo/commit/4b47dc55ab7d980b341645901d82236e310cb245))


### Features

* new parameter on combobox component to define dropdown direction (up or down) ([bc48987](https://github.com/ColdPBC/cold-monorepo/commit/bc48987f0ddd362c85c4992ab2c845b605665991))

# [1.402.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.401.1...v1.402.0) (2024-10-02)


### Features

* add supplier relation to products model ([f6288b7](https://github.com/ColdPBC/cold-monorepo/commit/f6288b788c32d4cde3859c50809eb54ee9936e73))

## [1.401.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.401.0...v1.401.1) (2024-10-02)


### Bug Fixes

* filter suppliers by tier in suppliersDataGrid ([f564cd4](https://github.com/ColdPBC/cold-monorepo/commit/f564cd46f37773f5323997a7f79514b37df270af))

# [1.401.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.6...v1.401.0) (2024-10-02)


### Features

* update entity defaults and migrate to CUIDs ([8a701d2](https://github.com/ColdPBC/cold-monorepo/commit/8a701d20e752e4d18050e2be9111a3ec1e62104c))

## [1.400.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.5...v1.400.6) (2024-10-02)


### Bug Fixes

* make certain GraphQL fields optional ([b10235e](https://github.com/ColdPBC/cold-monorepo/commit/b10235efb34af2e2ef46c047fc650d89d9b894e3))

## [1.400.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.4...v1.400.5) (2024-10-02)


### Bug Fixes

* make created_at, updated_at, and deleted fields optional ([5668a72](https://github.com/ColdPBC/cold-monorepo/commit/5668a724e0dae74984a45b1a636034a05b7d9b9c))

## [1.400.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.3...v1.400.4) (2024-10-02)


### Bug Fixes

* streamline entity default settings via utility functions ([42e359a](https://github.com/ColdPBC/cold-monorepo/commit/42e359abea4a9ba71717fa95688cbe2e6efaa6a4))

## [1.400.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.2...v1.400.3) (2024-10-02)


### Bug Fixes

* set administrator role name in backend initialization ([01bb5b8](https://github.com/ColdPBC/cold-monorepo/commit/01bb5b8c8face81eca57651cde9f774cd50b92d3))

## [1.400.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.1...v1.400.2) (2024-10-02)


### Bug Fixes

* **logger:** update winston config version to 1.1.1 ([0523e7c](https://github.com/ColdPBC/cold-monorepo/commit/0523e7c48d68d09e140c2c94f5a064dc7a714913))

## [1.400.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.400.0...v1.400.1) (2024-10-02)


### Bug Fixes

* bug creating facilities ([55b94a7](https://github.com/ColdPBC/cold-monorepo/commit/55b94a7a4fbcd932652bf58bdada5192c7b84118))

# [1.400.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.5...v1.400.0) (2024-10-02)


### Features

* add logo url to sustainability attributes ([#580](https://github.com/ColdPBC/cold-monorepo/issues/580)) ([a670332](https://github.com/ColdPBC/cold-monorepo/commit/a670332b172c7b19661dcf99e79dd6b36644577f))
* add logo_url to sustainability_attributes table ([0a69291](https://github.com/ColdPBC/cold-monorepo/commit/0a6929146e0f0fceecb121ee4c28b6461ca86545))

## [1.399.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.4...v1.399.5) (2024-10-01)


### Bug Fixes

* update ProtectedRoute authentication handling to show spinner on logging out ([bbd6baf](https://github.com/ColdPBC/cold-monorepo/commit/bbd6baf3fb48d5fdae3cb23a7481a88bd08188e1))

## [1.399.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.3...v1.399.4) (2024-10-01)


### Bug Fixes

* undefined organization compliance during create ([4cdcec7](https://github.com/ColdPBC/cold-monorepo/commit/4cdcec792514a41b86fd238a51735cc4e3308ce1))

## [1.399.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.2...v1.399.3) (2024-10-01)


### Bug Fixes

* enhance error logging with file context ([211d358](https://github.com/ColdPBC/cold-monorepo/commit/211d3582b559dbc463117b46807ee541ab06ba43))

## [1.399.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.1...v1.399.2) (2024-09-30)


### Bug Fixes

* issue related to encrypted PDFs ([c16b6ca](https://github.com/ColdPBC/cold-monorepo/commit/c16b6ca1de2ea85e7b010e575fba71a1a3929950))

## [1.399.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.399.0...v1.399.1) (2024-09-30)


### Bug Fixes

* correct argument passed to logError function ([6301f87](https://github.com/ColdPBC/cold-monorepo/commit/6301f87550b4a639aefaaff94d84a4dac051e653))
* handle Axios error correctly in error property ([4a5247f](https://github.com/ColdPBC/cold-monorepo/commit/4a5247ff5008007975e6628bedb96364e693aa4e))
* improve error handling and UI/UX feedback ([65929d2](https://github.com/ColdPBC/cold-monorepo/commit/65929d2934b46756bdde11de5d68e554f54e324f))
* update auth0AddOn parameters and remove NewSideBar story ([96d18ef](https://github.com/ColdPBC/cold-monorepo/commit/96d18ef5c812ccd6031b2d67e1da605a4b7df258))
* update logout function to include returnTo parameter ([9f8e87e](https://github.com/ColdPBC/cold-monorepo/commit/9f8e87eb36b6f69d7490dd1a562b5d956012b806))

# [1.399.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.398.2...v1.399.0) (2024-09-28)


### Bug Fixes

* display object value as is without conversion to lower case and upper case ([3c257c5](https://github.com/ColdPBC/cold-monorepo/commit/3c257c5f8e9d1f05cd6c94fcde34c24821c92b7e))
* refactor getActiveTabElement to use tabs array element ([d8c8049](https://github.com/ColdPBC/cold-monorepo/commit/d8c80497987f9183aefcb57da35505473c9320d5))


### Features

* add custom width class to MainContent in MaterialsPage ([36a4e7f](https://github.com/ColdPBC/cold-monorepo/commit/36a4e7f8943584c064e521350ef1576499b0e743))
* **icons:** Update ColdSuppliersNavIcon and ColdMaterialsNavIcon ([d6be0cf](https://github.com/ColdPBC/cold-monorepo/commit/d6be0cfa0f9a9fef12ecf98c618a166a3685af7a))
* update DataGrid components with unified row and column header height ([5302348](https://github.com/ColdPBC/cold-monorepo/commit/53023486eaeb137b92128244bfb88736c48400cb))

## [1.398.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.398.1...v1.398.2) (2024-09-26)


### Bug Fixes

* use lodash set for organization compliance properties ([99f412d](https://github.com/ColdPBC/cold-monorepo/commit/99f412d356691b6032f875896fdb164cc86cdad5))

## [1.398.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.398.0...v1.398.1) (2024-09-24)


### Bug Fixes

* correct async handling for file upload mutations ([1d8abd0](https://github.com/ColdPBC/cold-monorepo/commit/1d8abd030f56d692c5a502ec86c7de55c9f73da3))

# [1.398.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.397.0...v1.398.0) (2024-09-24)


### Bug Fixes

* update icon import path and wrap ComboBox in a div for width constraint ([cd8348f](https://github.com/ColdPBC/cold-monorepo/commit/cd8348f0b409eb27f9509dc44601fea4e1fd9a43))


### Features

* add logging to useGraphQLSWR for query success and error ([fa26cdf](https://github.com/ColdPBC/cold-monorepo/commit/fa26cdf8229b94656244979a1f432c9dd48ab5a2))
* add return type in SWRResponse ([a2eb395](https://github.com/ColdPBC/cold-monorepo/commit/a2eb395138ddf0f3553e93e67c71e49643a75577))
* add visibility flag to documents query ([00b6198](https://github.com/ColdPBC/cold-monorepo/commit/00b6198edbc739b58af93d29dadfd619bd2b589d))

# [1.397.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.396.0...v1.397.0) (2024-09-24)


### Bug Fixes

* hide generated image files by default ([6566add](https://github.com/ColdPBC/cold-monorepo/commit/6566add8bbc3951de0ada5ed44f606c62da09c9d))


### Features

* integrate PrismaService and handle upload failures ([7d7443a](https://github.com/ColdPBC/cold-monorepo/commit/7d7443a483cd5cc37f434e221b3cf04d0ae43300))

# [1.396.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.395.0...v1.396.0) (2024-09-23)


### Bug Fixes

* correct variable assignment for extraction name and schema ([8643c42](https://github.com/ColdPBC/cold-monorepo/commit/8643c423246667cb68bd85fd5229be809ce84a4e))
* refactor schemas to use modular schema patterns ([a473c28](https://github.com/ColdPBC/cold-monorepo/commit/a473c28c9927cc5570d57a84e18ee248198e132f))


### Features

* **app:** extend stall timeout (temporarily till we can implement a more robust solution) ([2b692f1](https://github.com/ColdPBC/cold-monorepo/commit/2b692f119009fb3a4301d1133672f2c4f4ad4510))

# [1.395.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.394.0...v1.395.0) (2024-09-23)


### Features

* add certificate number handling in document details ([a11f3fe](https://github.com/ColdPBC/cold-monorepo/commit/a11f3fe119a6cc9e09ff41cdd7501a4164c4a083))
* simplify document state type in DocumentsAddAssuranceModal ([cb20e8b](https://github.com/ColdPBC/cold-monorepo/commit/cb20e8b3e42098462c7f058b2d4c9932f67c758e))
* update document table and page layout for better UI ([472f811](https://github.com/ColdPBC/cold-monorepo/commit/472f811966650789778ee1673dd6cb41c900502b))

# [1.394.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.393.4...v1.394.0) (2024-09-21)


### Bug Fixes

* adjust date calculation and include expiration date in file records ([660b940](https://github.com/ColdPBC/cold-monorepo/commit/660b940333f4ad890d271382f78d7859690afe2c))
* adjust day count calculation in document status display ([89ff433](https://github.com/ColdPBC/cold-monorepo/commit/89ff433ec5f1d8e373a9e2718dd2c3fbbba12db7))
* ensure document sidebar is properly layered in the UI ([dfac365](https://github.com/ColdPBC/cold-monorepo/commit/dfac3659e040441fabdaa154006d86b623e3b197))
* replace getDateIrrespectiveOfTimeZone with addTZOffset and removeTZOffset ([919a67a](https://github.com/ColdPBC/cold-monorepo/commit/919a67a18df9e7d52583468305001434bf2fed4a))


### Features

* correct date formatting in DocumentsTable component ([00c63b4](https://github.com/ColdPBC/cold-monorepo/commit/00c63b491e98846247893d381fcc353a5d301023))
* handle non-ISO date strings with local timezone in documents ([46af39e](https://github.com/ColdPBC/cold-monorepo/commit/46af39e3b328e008b8ad2ef7b03312c0dd96edf5))
* set default sorting to documentsTable and update filesMock date ([ed8a410](https://github.com/ColdPBC/cold-monorepo/commit/ed8a410476a0c2b958a8e76d1fa12e3585499b99))
* update spacing and dimensions in DocumentsTable ([c1124d7](https://github.com/ColdPBC/cold-monorepo/commit/c1124d789338f7079c4ce0bc4fb18ad0d11a8f3c))

## [1.393.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.393.3...v1.393.4) (2024-09-20)


### Bug Fixes

* update instance storage in flightcontrol platform json ([86117a4](https://github.com/ColdPBC/cold-monorepo/commit/86117a46d8ef30205e7b490cc131152697334051))

## [1.393.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.393.2...v1.393.3) (2024-09-20)


### Bug Fixes

* update test results classification case in extraction service ([1104dcc](https://github.com/ColdPBC/cold-monorepo/commit/1104dccdfa7a7a7b875ceaf062c4d3ed1148c039))

## [1.393.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.393.1...v1.393.2) (2024-09-20)


### Bug Fixes

* **organization.files.service:** always send metrics and event data regardless of organization type ([720a3b5](https://github.com/ColdPBC/cold-monorepo/commit/720a3b561132b27fea4a230ab5e4fcd61be456fa))

## [1.393.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.393.0...v1.393.1) (2024-09-20)


### Bug Fixes

* Update file metadata on failure ([f502f66](https://github.com/ColdPBC/cold-monorepo/commit/f502f66cbffdd9443a915358d81196b3b218bbb5))

# [1.393.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.392.0...v1.393.0) (2024-09-20)


### Features

* add pnpm lockfile to cold-graphql app ([d28a1ca](https://github.com/ColdPBC/cold-monorepo/commit/d28a1ca13a6808b410d543228359f52220bef584))

# [1.392.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.11...v1.392.0) (2024-09-20)


### Bug Fixes

* adjust padding and add animation to uploaded file status display ([4154187](https://github.com/ColdPBC/cold-monorepo/commit/4154187a042315375980032d382509c05468c500))
* remove throttling logic from SWR mutation calls ([31fe415](https://github.com/ColdPBC/cold-monorepo/commit/31fe415349f4724f0816bce212251a9abfe86391))


### Features

* enhance ColdMQTTProvider with graphql query mappings for SWR key ([f9f1a1b](https://github.com/ColdPBC/cold-monorepo/commit/f9f1a1b600d8683ec35b72990829eb8d6d7ab727))
* enhance documentsTable item display with capitalization and styling ([2156e6a](https://github.com/ColdPBC/cold-monorepo/commit/2156e6aca59b2c703c7db572beab09aa44aff38e))
* enhance toast messages to support customizable content and positioning ([e605aa9](https://github.com/ColdPBC/cold-monorepo/commit/e605aa9dc55d9f4336c7adeef770f67f829dc658))
* highlight processing status in documents table ([3b96925](https://github.com/ColdPBC/cold-monorepo/commit/3b9692547a1d01ef59491393981ce6801a79dfa3))
* throttle SWR mutate calls in coldMQTTProvider ([a8801bc](https://github.com/ColdPBC/cold-monorepo/commit/a8801bcee51a2f93a78e192ba360b6bef13c1026))

## [1.391.11](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.10...v1.391.11) (2024-09-20)


### Bug Fixes

* remove unused enum test_changes from Prisma schema ([ccad4fc](https://github.com/ColdPBC/cold-monorepo/commit/ccad4fcb0e698fab84f1b9346d39502f57748717))

## [1.391.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.9...v1.391.10) (2024-09-20)


### Bug Fixes

* remove pnpm sync check for schema.prisma in pre-commit hook ([00ce4ca](https://github.com/ColdPBC/cold-monorepo/commit/00ce4ca0c792aafbac35ffb06c5e83b90915e9d3))
* update database connection details for import script ([7522e0e](https://github.com/ColdPBC/cold-monorepo/commit/7522e0e154ea7ecc5b9c6518dfbbf7b1c8bf423e))

## [1.391.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.8...v1.391.9) (2024-09-20)


### Bug Fixes

* update import command and add pre-commit hooks ([fb35086](https://github.com/ColdPBC/cold-monorepo/commit/fb3508619b5d541fac5f3a0c81f9a12494b3b011))

## [1.391.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.7...v1.391.8) (2024-09-20)


### Bug Fixes

* hardcode database username in migration workflow ([49196f2](https://github.com/ColdPBC/cold-monorepo/commit/49196f23ff795c1a1b3a7c4455e113ae6357a17f))

## [1.391.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.6...v1.391.7) (2024-09-20)


### Bug Fixes

* update database migration workflow ([8314e89](https://github.com/ColdPBC/cold-monorepo/commit/8314e89e9f101147ca55cfcb6341b57815333483))

## [1.391.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.5...v1.391.6) (2024-09-20)


### Bug Fixes

* set PGSSLMODE in GitHub Actions workflow for database migrations ([48d05a0](https://github.com/ColdPBC/cold-monorepo/commit/48d05a0d64b10cccaec601fd5df33c1e0f0f7ff9))

## [1.391.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.4...v1.391.5) (2024-09-20)


### Bug Fixes

* correct database environment variable handling ([73d1c0d](https://github.com/ColdPBC/cold-monorepo/commit/73d1c0d19abfa443d9e091a017ff6136fe1acf5b))

## [1.391.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.3...v1.391.4) (2024-09-20)


### Bug Fixes

* correct syntax in GitHub Actions workflow ([d0e7356](https://github.com/ColdPBC/cold-monorepo/commit/d0e7356306ba6da24cae5a7f35dd293bb25c91d8))

## [1.391.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.2...v1.391.3) (2024-09-20)


### Bug Fixes

* **pnpm-lock:** update dependency versions and remove redundant entries ([fdfc23a](https://github.com/ColdPBC/cold-monorepo/commit/fdfc23aa85f0283a02418ed70db57513b2508d68))
* **workflow:** remove redundant DATABASE_URL parsing step ([09944f3](https://github.com/ColdPBC/cold-monorepo/commit/09944f366db51f8870d0165ffe4bd4b718b48d85))

## [1.391.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.1...v1.391.2) (2024-09-20)


### Bug Fixes

* remove duplicate hooks and constructor definitions ([0f71004](https://github.com/ColdPBC/cold-monorepo/commit/0f71004395320e378e181e7e152d8db28004493b))

## [1.391.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.391.0...v1.391.1) (2024-09-20)


### Bug Fixes

* enhance database config output and add caching to GitHub workflow ([ef764b8](https://github.com/ColdPBC/cold-monorepo/commit/ef764b8874ad2bea2a63f4eb1dc59d1599148237))

# [1.391.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.390.1...v1.391.0) (2024-09-20)


### Features

* add BRANCH_NAME environment variable to workflow ([79a497f](https://github.com/ColdPBC/cold-monorepo/commit/79a497f8c751b7a3d335722a8d81b14bc73a5256))

## [1.390.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.390.0...v1.390.1) (2024-09-20)


### Bug Fixes

* update workflow to set DATABASE_URL for different environments ([dbdcc1f](https://github.com/ColdPBC/cold-monorepo/commit/dbdcc1f08876cb4b3bac082c08b3c5b392cda12a))
* **workflow:** remove DATABASE_URL declaration from migrate-database.yml ([2acf128](https://github.com/ColdPBC/cold-monorepo/commit/2acf1287ab570ca1bcfb3705e486c6d10c6ef206))

# [1.390.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.389.0...v1.390.0) (2024-09-19)


### Bug Fixes

* improve error handling and messaging in classifyContent method ([b66546e](https://github.com/ColdPBC/cold-monorepo/commit/b66546ef607d3bfccd622bbc755ea9e27a323440))
* improve metadata update and error handling for file extraction ([cf8d8dc](https://github.com/ColdPBC/cold-monorepo/commit/cf8d8dc1a49cfb1720c650f71cfba7aaefd101c3))


### Features

* extend MQTT validation schemas with new resource and event types ([04e64e1](https://github.com/ColdPBC/cold-monorepo/commit/04e64e1ae307c2b052d9d6a62ed478a11803a38c))

# [1.389.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.388.1...v1.389.0) (2024-09-19)


### Features

* improve document type display formatting ([a7c5c53](https://github.com/ColdPBC/cold-monorepo/commit/a7c5c53dc7ae7777366e250e427a77826c1d122b))
* replace enums with schema enum lookup for file types ([70a7150](https://github.com/ColdPBC/cold-monorepo/commit/70a7150a78de3b2a628f003a1cff690c84f8015f))

## [1.388.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.388.0...v1.388.1) (2024-09-19)


### Bug Fixes

* **mqtt:** ensure MQTT client reconnects if not connected ([2094c91](https://github.com/ColdPBC/cold-monorepo/commit/2094c91b26185cf02bebde1613f1aa32fd0e0d67))
* **organization.files:** correct filename encoding handling in S3 upload process ([c2de01f](https://github.com/ColdPBC/cold-monorepo/commit/c2de01f009976243a2082ccfbe9eceef29b1f90e))

# [1.388.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.387.0...v1.388.0) (2024-09-19)


### Features

* update OrganizationFilesType enum ([b57444c](https://github.com/ColdPBC/cold-monorepo/commit/b57444c4c6e940c44c92a8e097cb53c2d026afcd))

# [1.387.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.386.0...v1.387.0) (2024-09-19)


### Bug Fixes

* update organization file types and ordering ([63422ec](https://github.com/ColdPBC/cold-monorepo/commit/63422ec05e40ce0bb922de329bf510d43b362449))


### Features

* integrate GraphQL for materials data and revamp UI for materials page ([61fa096](https://github.com/ColdPBC/cold-monorepo/commit/61fa09661a658c6818e09deed6ceaf0609f058bf))
* update valueFormatter and remove unused button code ([1715847](https://github.com/ColdPBC/cold-monorepo/commit/1715847fa7373e9359ca69940beb60a3d1a54bd2))

# [1.386.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.385.0...v1.386.0) (2024-09-19)


### Features

* Add new document types ([#565](https://github.com/ColdPBC/cold-monorepo/issues/565)) ([351a2c2](https://github.com/ColdPBC/cold-monorepo/commit/351a2c28a33e63f18419ff89e56e884afa485a57))

# [1.385.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.384.0...v1.385.0) (2024-09-19)


### Features

* enhance file classification and upload handling ([c21f42e](https://github.com/ColdPBC/cold-monorepo/commit/c21f42e5cb5bbc58fdec98a027985325e641f6b6))
* enhance file classification and upload handling ([384b3a4](https://github.com/ColdPBC/cold-monorepo/commit/384b3a4a14121023163195795f82fe1007c21af3))


### Reverts

* Revert "chore: update dependencies in yarn.lock and package.json" ([f409c29](https://github.com/ColdPBC/cold-monorepo/commit/f409c2961245aeac66240fa8ea7e701f78435d33))
* Revert "feat: enhance file classification and upload handling" ([aa67fd1](https://github.com/ColdPBC/cold-monorepo/commit/aa67fd10a023a2e20edb1fc029d798900b91ba69))

# [1.384.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.383.0...v1.384.0) (2024-09-19)


### Features

* add Oeko-Tex Standard 100 sustainability attribute ([46b49e1](https://github.com/ColdPBC/cold-monorepo/commit/46b49e18bf1c48aacffca264c5de966e7284bbdf))
* add Oeko-Tex Standard 100 to Sustainability Attributes ([#564](https://github.com/ColdPBC/cold-monorepo/issues/564)) ([22efd60](https://github.com/ColdPBC/cold-monorepo/commit/22efd60fbbe96174ede9deff5193f7e7def8294a))

# [1.383.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.382.0...v1.383.0) (2024-09-19)


### Bug Fixes

* simplify file state comparison logic ([4cd84ce](https://github.com/ColdPBC/cold-monorepo/commit/4cd84ce0853657f2895964c85b24d4c418768d1e))


### Features

* enhance document sidebar assurances handling ([8fcf104](https://github.com/ColdPBC/cold-monorepo/commit/8fcf104e596ae602a2c0dae7993e7c94f7724fc8))

# [1.382.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.381.0...v1.382.0) (2024-09-18)


### Features

* enhance logging and update entity schema ([bc1c203](https://github.com/ColdPBC/cold-monorepo/commit/bc1c20387d4a15ed71c88bf58b853c14687a0249))

# [1.381.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.380.1...v1.381.0) (2024-09-18)


### Bug Fixes

* fix code indentation in job.consumer.ts ([d053d1d](https://github.com/ColdPBC/cold-monorepo/commit/d053d1d3b370e98d43b45249639cbef5d3e04dc9))


### Features

* integrate MQTT for file updates and classifications ([56d8f2c](https://github.com/ColdPBC/cold-monorepo/commit/56d8f2c509516f6226bab544d91ed33ccdb89782))

## [1.380.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.380.0...v1.380.1) (2024-09-18)


### Bug Fixes

* streamline logic for extracting file dates ([d190181](https://github.com/ColdPBC/cold-monorepo/commit/d190181883632911f2a9f01f3b1bd3541c2bf889))

# [1.380.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.379.0...v1.380.0) (2024-09-18)


### Features

* Add unique constraint on `organization_id` and `name` in `materials` table ([c6dbac8](https://github.com/ColdPBC/cold-monorepo/commit/c6dbac83cfec084f88e255981dd27fe26732dd24))

# [1.379.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.378.0...v1.379.0) (2024-09-18)


### Bug Fixes

* enhance document update logic in modals and sidebars ([843f8a4](https://github.com/ColdPBC/cold-monorepo/commit/843f8a4255703017acc7489c39379b5b21f9333c))
* update default sustainability attribute to 'None' ([2707ab4](https://github.com/ColdPBC/cold-monorepo/commit/2707ab411e0b19f4d9f67bef1c8746b3e37eb26b))


### Features

* centralize effective date retrieval logic in utility functions ([87c7585](https://github.com/ColdPBC/cold-monorepo/commit/87c7585dfd22fccdd6eff47faa5aa9859101126f))
* simplify assurance workflow and streamline date handling in documentsTable ([571a6e4](https://github.com/ColdPBC/cold-monorepo/commit/571a6e4f758fd2e8de87bf9de2adb29160b8482f))

# [1.378.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.377.1...v1.378.0) (2024-09-17)


### Bug Fixes

* remove unused imports in seed file ([d0e4fb9](https://github.com/ColdPBC/cold-monorepo/commit/d0e4fb9079fd7aa196a28b349133e487c3707b3a))


### Features

* update seed script for sustainability attributes ([074386d](https://github.com/ColdPBC/cold-monorepo/commit/074386dcd2350fa8d2ba547f41d4a541af462062))

## [1.377.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.377.0...v1.377.1) (2024-09-17)


### Bug Fixes

* update classification service to handle unmatched attributes scenario ([da5daf2](https://github.com/ColdPBC/cold-monorepo/commit/da5daf2055223809ba22e6bf2a76511c9b2c669e))

# [1.377.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.376.1...v1.377.0) (2024-09-17)


### Features

* add handling for files without sustainability attributes ([665d55a](https://github.com/ColdPBC/cold-monorepo/commit/665d55a9d13d7cb57c3d0ca2e0e58a8d64711cea))

## [1.376.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.376.0...v1.376.1) (2024-09-17)


### Bug Fixes

* update barrelsby command directory path ([d0ff848](https://github.com/ColdPBC/cold-monorepo/commit/d0ff8483481eb9a22abd7b083390c7f3000070fe))

# [1.376.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.375.1...v1.376.0) (2024-09-17)


### Features

* remove classification schema ([0889d03](https://github.com/ColdPBC/cold-monorepo/commit/0889d035d90b3af32cf098d30efad69690a3e3c6))
* update types with optional fields and new enums ([97e26e4](https://github.com/ColdPBC/cold-monorepo/commit/97e26e49b71a0e5e2e7a9f33c743e3eeae802e2a))

## [1.375.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.375.0...v1.375.1) (2024-09-17)


### Bug Fixes

* make sustainabilityAttribute required in attributeAssurances ([ffa46e9](https://github.com/ColdPBC/cold-monorepo/commit/ffa46e9d10589b14f4072c23223162cf70c66be2))

# [1.375.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.374.2...v1.375.0) (2024-09-17)


### Features

* add pagination support to fetch all sustainability attributes ([cbc9492](https://github.com/ColdPBC/cold-monorepo/commit/cbc94926f8fb782de22446b233df163bbc33cbdc))

## [1.374.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.374.1...v1.374.2) (2024-09-17)


### Bug Fixes

* add nullable metadata to Product and make fields optional in AttributeAssurance ([95434c1](https://github.com/ColdPBC/cold-monorepo/commit/95434c1134e5cc50e14b354cdfa1a88168fdafc7))

## [1.374.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.374.0...v1.374.1) (2024-09-16)


### Bug Fixes

* **schema:** remove unique constraint from attribute assurances ([274a888](https://github.com/ColdPBC/cold-monorepo/commit/274a888b7ba56de09ae2eb53f261d1fd548277c7))

# [1.374.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.373.1...v1.374.0) (2024-09-16)


### Features

* add unique constraints and modify data extraction logic ([a368756](https://github.com/ColdPBC/cold-monorepo/commit/a3687562240be94396e85e758a26a3fb064651f9))

## [1.373.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.373.0...v1.373.1) (2024-09-16)


### Bug Fixes

* display percentage with no decimal places ([ea92139](https://github.com/ColdPBC/cold-monorepo/commit/ea92139c78de6703a249edc4100a58f7b575e42b))
* improve sustainability attribute handling and validation ([d6f58a3](https://github.com/ColdPBC/cold-monorepo/commit/d6f58a383837946358686282de72027f93316599))
* update default value for sustainabilityAttribute and related checks ([a64e029](https://github.com/ColdPBC/cold-monorepo/commit/a64e029f1b750b6189e0ec70dab0136a7180bf76))
* update placeholder text for sustainability attribute selection ([0594578](https://github.com/ColdPBC/cold-monorepo/commit/059457862cd9a6aa2dff17d57a13e9bfff0ec210))

# [1.373.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.372.0...v1.373.0) (2024-09-13)


### Bug Fixes

* update webpack config to add entry point and source maps ([3ee8f39](https://github.com/ColdPBC/cold-monorepo/commit/3ee8f39c212f0b87202c3d13e5dafb2308abcc32))


### Features

* add enum values and columns to products table ([a9b25cb](https://github.com/ColdPBC/cold-monorepo/commit/a9b25cb794ed5e6097241e3abc3fc776a7719041))
* add seeding for sustainability attributes ([ad82c3a](https://github.com/ColdPBC/cold-monorepo/commit/ad82c3ad6fa67c928e39cd670ce79a248c537e6b))
* add sustainability attributes seeding and refactor compliance dependency chains ([efe468f](https://github.com/ColdPBC/cold-monorepo/commit/efe468f1e28f240c44ea1a1a45565ff856531f74))

# [1.372.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.6...v1.372.0) (2024-09-13)


### Bug Fixes

* change fileTypes to array and adjust ordering logic ([c0834dd](https://github.com/ColdPBC/cold-monorepo/commit/c0834ddccf98e0990023130016b52047ab7671b4))
* conditionally render DocumentsAddAssuranceModal based on addAssuranceFile state ([d2aa369](https://github.com/ColdPBC/cold-monorepo/commit/d2aa369030db0669bd28e08bc09ad2eb22bce6ff))
* improve handling of entity selection and assurance updates in documents modal and sidebar ([ea8d9f9](https://github.com/ColdPBC/cold-monorepo/commit/ea8d9f99b534ecedc425e873b81265bcab8af315))


### Features

* add ability to add assurance to documents ([cb01e4d](https://github.com/ColdPBC/cold-monorepo/commit/cb01e4dc168972a8eb48b0fb584068779475733a))
* update ColdApolloProvider with default options for ApolloClient ([54bf927](https://github.com/ColdPBC/cold-monorepo/commit/54bf927ebfb7e7db0ed9cdaee25aa376157ecbf0))
* update document handling and assurance associations ([faea982](https://github.com/ColdPBC/cold-monorepo/commit/faea98210d94607d8994777714467e12fbc089f9))
* update logging in DocumentsPage ([5b7857d](https://github.com/ColdPBC/cold-monorepo/commit/5b7857d910d3fe8e298b1538f21973d23b1d246f))

## [1.371.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.5...v1.371.6) (2024-09-12)


### Bug Fixes

* **mqtt-service:** add null check for IoT endpoint in getResolvedSecrets ([76d6ef9](https://github.com/ColdPBC/cold-monorepo/commit/76d6ef90887920cdcbbad7d4fdf5a5a129cd2f63))

## [1.371.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.4...v1.371.5) (2024-09-12)


### Bug Fixes

* **acl_policies:** update cold:admin policy to use context ([a9d0365](https://github.com/ColdPBC/cold-monorepo/commit/a9d0365599516eec8ef36620626dd4b78186ff04))

## [1.371.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.3...v1.371.4) (2024-09-12)


### Bug Fixes

* restructure addUserToContext logic and enable admin role setting ([9c1cd0b](https://github.com/ColdPBC/cold-monorepo/commit/9c1cd0bd84514cc64d9da8f3e41d1c286d817c10))

## [1.371.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.2...v1.371.3) (2024-09-12)


### Bug Fixes

* refactor entity hooks and improve secret handling ([8c196ab](https://github.com/ColdPBC/cold-monorepo/commit/8c196abdfc822ab9d0238a71c1e32ca51efd7772))

## [1.371.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.1...v1.371.2) (2024-09-12)


### Bug Fixes

* update flightcontrol.json configuration ([5df8ef3](https://github.com/ColdPBC/cold-monorepo/commit/5df8ef3ad18ad09ec259757a750b841c6db4088b))

## [1.371.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.371.0...v1.371.1) (2024-09-12)


### Bug Fixes

* handle missing secret error with logging and return null ([88e831c](https://github.com/ColdPBC/cold-monorepo/commit/88e831c27502e61e7ec118dd335e7697d1787bea))

# [1.371.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.370.0...v1.371.0) (2024-09-12)


### Features

* Add secrets service and update timestamp management ([172dd07](https://github.com/ColdPBC/cold-monorepo/commit/172dd07e6d8b552e60f9eb7985d5468e7805428c))

# [1.370.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.369.0...v1.370.0) (2024-09-11)


### Features

* add sustainability attribute relation to attribute assurances ([cd4b208](https://github.com/ColdPBC/cold-monorepo/commit/cd4b208c6f14356f1f9bc1a86d5677d698f55a16))

# [1.369.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.368.0...v1.369.0) (2024-09-11)


### Bug Fixes

* add error boundaries to document tables and clean up documents page ([eb4541b](https://github.com/ColdPBC/cold-monorepo/commit/eb4541b63a3b7df774ddfe821bdbb2782cda4761))
* add organization filter to GET_ALL_FILES query ([af87d45](https://github.com/ColdPBC/cold-monorepo/commit/af87d4584f21480225ddefff2b6ab836af1dcafb))
* update IDs and improve state handling for document components ([5757143](https://github.com/ColdPBC/cold-monorepo/commit/5757143501376e021f7fb04d4203d806b6ce95c6))


### Features

* add DocumentsHeaderTypes with file categorization in documentsPage ([1ba26f0](https://github.com/ColdPBC/cold-monorepo/commit/1ba26f0f64024fa89f993297da07237d4e4a7b73))
* add DocumentSuppliersTable and enhance ColdApolloProvider with useEffect ([b6e8caa](https://github.com/ColdPBC/cold-monorepo/commit/b6e8caa2eacb88b946492b01b577da51d7e25612))
* update document header types and enhance documents table ([2ace82f](https://github.com/ColdPBC/cold-monorepo/commit/2ace82f0bfab7019a91c123b4785243e9c6ab898))
* update documentsTable component styles and column definitions ([ee3560d](https://github.com/ColdPBC/cold-monorepo/commit/ee3560d20d9ee3653d89b948cbe15be9e9c6f0d3))

# [1.368.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.367.0...v1.368.0) (2024-09-11)


### Features

* add relations to attribute_assurances and clean up hooks ([2854d83](https://github.com/ColdPBC/cold-monorepo/commit/2854d83ff20c6a2bfbba1bbd3c989d3cffbe3adb))
* add sustainability attribute relation to attribute assurances ([275267d](https://github.com/ColdPBC/cold-monorepo/commit/275267dda9a83d847067932d6f14c3d52cdc8286))

# [1.367.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.366.1...v1.367.0) (2024-09-11)


### Features

* integrate PolicyDefinitionHooks for entity lifecycle management ([4de9ecb](https://github.com/ColdPBC/cold-monorepo/commit/4de9ecbdc2729c235144b140eb704706ed54f9e8))

## [1.366.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.366.0...v1.366.1) (2024-09-11)


### Bug Fixes

* correct acl policies for 'cold:admin' role ([9a48f5e](https://github.com/ColdPBC/cold-monorepo/commit/9a48f5e576802afd78057341fe6d14e0a207b47d))

# [1.366.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.365.0...v1.366.0) (2024-09-11)


### Features

* drop `organization_attributes` table and associated columns ([7c83a57](https://github.com/ColdPBC/cold-monorepo/commit/7c83a571bd280d479ac58c2649170b2cc5bb2330))

# [1.365.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.364.0...v1.365.0) (2024-09-10)


### Features

* update logging and remove unused imports ([4b12bf2](https://github.com/ColdPBC/cold-monorepo/commit/4b12bf2d49b3c23b27769b6177d9a638d01871c5))

# [1.364.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.363.1...v1.364.0) (2024-09-10)


### Features

* add new dependencies for aws-sdk, mqtt, cuid2, and zod ([fe599a3](https://github.com/ColdPBC/cold-monorepo/commit/fe599a35e7473ca35249eb635733e198df2c0cdf))

## [1.363.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.363.0...v1.363.1) (2024-09-10)


### Bug Fixes

* refactor spacing and add additional metrics and events in compliance service ([1603a18](https://github.com/ColdPBC/cold-monorepo/commit/1603a18af49cdb77141920032469fe9556da0df4))

# [1.363.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.362.1...v1.363.0) (2024-09-09)


### Features

* add logger module for backend ([49f9946](https://github.com/ColdPBC/cold-monorepo/commit/49f9946e0668eef6939c331e9e277e0580dbbe62))

## [1.362.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.362.0...v1.362.1) (2024-09-09)


### Bug Fixes

* **backend:** replace ConsoleLogger with WorkerLogger for hook files ([fb5b179](https://github.com/ColdPBC/cold-monorepo/commit/fb5b1799a645c696cf148969c1febf3785e1a5a6))

# [1.362.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.361.1...v1.362.0) (2024-09-09)


### Features

* Add PostgreSQL entities and schema imports ([c719b5f](https://github.com/ColdPBC/cold-monorepo/commit/c719b5fc5b5d90097323f4837f5172ad5db83f67))

## [1.361.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.361.0...v1.361.1) (2024-09-09)


### Bug Fixes

* correct tsconfig, package script, and database config, and rename generator script ([3cd314b](https://github.com/ColdPBC/cold-monorepo/commit/3cd314b9126581c9d444499377d6e703cb90bbc6))

# [1.361.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.360.0...v1.361.0) (2024-09-09)


### Features

* Extend tsconfig and implement custom logger service ([d1b14f2](https://github.com/ColdPBC/cold-monorepo/commit/d1b14f26094788eec3b1a191af564bf711927852))

# [1.360.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.359.0...v1.360.0) (2024-09-08)


### Features

* add entity hooks for various models ([ed0b316](https://github.com/ColdPBC/cold-monorepo/commit/ed0b3164db8b5d74c8aa7b7384339fcced829104))

# [1.359.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.358.1...v1.359.0) (2024-09-07)


### Features

* add ACL entity maps for cold-graphql module ([12493e8](https://github.com/ColdPBC/cold-monorepo/commit/12493e8a89a9a8362c61d0a02170310da13f3770))

## [1.358.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.358.0...v1.358.1) (2024-09-06)


### Bug Fixes

* remove unused imports and clean up import paths ([b80a2ba](https://github.com/ColdPBC/cold-monorepo/commit/b80a2ba438de6707fd877f30c697d7ab4543288a))

# [1.358.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.357.0...v1.358.0) (2024-09-06)


### Bug Fixes

* simplify VITE_GRAPHQL_URL configurations in flightcontrol.json ([9450641](https://github.com/ColdPBC/cold-monorepo/commit/945064166283d1c79aad6c7dbc11626c09a37ed6))


### Features

* add Apollo Client integration for improved GraphQL handling ([79d5763](https://github.com/ColdPBC/cold-monorepo/commit/79d5763ff117849460236474ffaebb80254ed5ba))
* add variables parameter to useGraphQLSWR hook ([dd7287f](https://github.com/ColdPBC/cold-monorepo/commit/dd7287f3b1a9d0df78fbcbbeedea54327408c02a))
* update Mock Service Worker and refactor API handlers ([6d447e7](https://github.com/ColdPBC/cold-monorepo/commit/6d447e7afacf49d73e7d05f970856314a5ed742f))

# [1.357.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.356.0...v1.357.0) (2024-09-06)


### Features

* apply access control lists to multiple entities ([225c914](https://github.com/ColdPBC/cold-monorepo/commit/225c914b610c702eca35da035e959cab1a1bca04))

# [1.356.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.355.1...v1.356.0) (2024-09-06)


### Features

* add metadata to organization entity and schema, update access control for vector records ([44d8960](https://github.com/ColdPBC/cold-monorepo/commit/44d8960d683de41c8e1dd5636250e51ce4465bbb))

## [1.355.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.355.0...v1.355.1) (2024-09-06)


### Bug Fixes

* **prisma-migration.ts:** remove unnecessary ACL annotation ([c72b6e3](https://github.com/ColdPBC/cold-monorepo/commit/c72b6e3558a503537ba5f2ac3484bfc5b00bd71e))

# [1.355.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.354.0...v1.355.0) (2024-09-05)


### Features

* update database schema for attribute assurances ([2436551](https://github.com/ColdPBC/cold-monorepo/commit/24365513cd20c1a79ea6bf6dafe68557f1c691ab))

# [1.354.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.353.2...v1.354.0) (2024-09-05)


### Bug Fixes

* allow creation without compliance_defnition_id ([c120f55](https://github.com/ColdPBC/cold-monorepo/commit/c120f5559cadc8826589db770d89940d7a831dcb))
* change ECS cluster instance size to t2.medium ([aabffe6](https://github.com/ColdPBC/cold-monorepo/commit/aabffe62535a101a191d68da54bd0c3eb71e9861))
* correct log level and data format for billing page ([0e50dcf](https://github.com/ColdPBC/cold-monorepo/commit/0e50dcf6a83c554f2dc231f174637e08c1694744))
* update VITE_STRIPE_INTEGRATION_URL values ([97e19cd](https://github.com/ColdPBC/cold-monorepo/commit/97e19cd57f4185313209ac6c51c832f5d9ae6761))


### Features

* add assurance changes to graphQL ([7491beb](https://github.com/ColdPBC/cold-monorepo/commit/7491beb3b4d014dc2e8c6973195788771a0fea3b))
* add BillingPage component and route ([a219564](https://github.com/ColdPBC/cold-monorepo/commit/a219564a73056eb8b790ba6dfa749698f3d5fa73))
* add buildType attribute to flight control platform configurations ([f88b0ad](https://github.com/ColdPBC/cold-monorepo/commit/f88b0add578df1d72757a2163253b7e1cb211309))
* add cold-platform-stripe application ([17095d5](https://github.com/ColdPBC/cold-monorepo/commit/17095d5fb7b79839d2155d4dfc7fbd99518185d8))
* add supplier tier column to organization facilities table ([75163ed](https://github.com/ColdPBC/cold-monorepo/commit/75163ed16b19143e41c411c0b69518def5c07732))
* enhance AppService with logging and extend BaseWorker ([eb754cd](https://github.com/ColdPBC/cold-monorepo/commit/eb754cd20f89e50f627e8a3a4540e7acad212661))
* integrate Stripe embedded checkout on the Billing page ([b28cc12](https://github.com/ColdPBC/cold-monorepo/commit/b28cc12650e492a51bb56a6c3db313e035f4f938))
* refactor and expand Stripe service functionality ([f542830](https://github.com/ColdPBC/cold-monorepo/commit/f542830c32fe5e93ddf89fe2b0f8d696555a91f6))

## [1.353.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.353.1...v1.353.2) (2024-09-05)


### Bug Fixes

* change ECS cluster instance size to t2.medium ([04c21dc](https://github.com/ColdPBC/cold-monorepo/commit/04c21dc853cc17c2c0831fccd21a49acdf7b5237))

## [1.353.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.353.0...v1.353.1) (2024-09-05)


### Bug Fixes

* update VITE_STRIPE_INTEGRATION_URL values ([ae6d77b](https://github.com/ColdPBC/cold-monorepo/commit/ae6d77b36a4834e64a7e6de7c29692dde5e7fb22))

# [1.353.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.352.0...v1.353.0) (2024-09-05)


### Features

* add buildType attribute to flight control platform configurations ([4113e44](https://github.com/ColdPBC/cold-monorepo/commit/4113e44948ef28f3f7e6c58ce3d1cae485b47e79))

# [1.352.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.6...v1.352.0) (2024-09-05)


### Bug Fixes

* correct log level and data format for billing page ([a2dbf4d](https://github.com/ColdPBC/cold-monorepo/commit/a2dbf4d16515bcc65961b86bd25c1851b4a09fc6))


### Features

* add BillingPage component and route ([db84530](https://github.com/ColdPBC/cold-monorepo/commit/db845302271b9f5f61ca6613bacf66e0f098408a))
* add cold-platform-stripe application ([c256d1c](https://github.com/ColdPBC/cold-monorepo/commit/c256d1c254be58ef06ed49e209c4602ab3fd7d49))
* enhance AppService with logging and extend BaseWorker ([9b8fbb0](https://github.com/ColdPBC/cold-monorepo/commit/9b8fbb0e256a7fb01a107b9ad433e0792c698d8b))
* integrate Stripe embedded checkout on the Billing page ([80fe74c](https://github.com/ColdPBC/cold-monorepo/commit/80fe74c6a6e624265c5484ea87c5539c686c8ed4))
* refactor and expand Stripe service functionality ([f774764](https://github.com/ColdPBC/cold-monorepo/commit/f77476481bcda617c875494be9d8788c195604ac))

## [1.351.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.5...v1.351.6) (2024-09-05)


### Bug Fixes

* rename organization_files_id to organization_file_id ([9826201](https://github.com/ColdPBC/cold-monorepo/commit/98262013869935227dcc50f07f9aa6557cdffa0a))

## [1.351.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.4...v1.351.5) (2024-09-04)


### Bug Fixes

* allow creation without compliance_defnition_id ([44bbd60](https://github.com/ColdPBC/cold-monorepo/commit/44bbd60e269de4d9886f0c05ebd198e39ff110d9))

## [1.351.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.3...v1.351.4) (2024-09-04)


### Bug Fixes

* **prisma:** correct field naming inconsistencies in organization relationships ([8e56548](https://github.com/ColdPBC/cold-monorepo/commit/8e56548849d0ffd338c3e76f1acddd9ae25596c1))

## [1.351.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.2...v1.351.3) (2024-09-04)


### Bug Fixes

* correct organization files field naming and validation logic ([eeddbc0](https://github.com/ColdPBC/cold-monorepo/commit/eeddbc06dc32035f2e7ff699545e6abef4829c59))

## [1.351.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.1...v1.351.2) (2024-08-30)


### Bug Fixes

* **flightcontrol:** remove obsolete domain field from cold-api-ec2 configuration ([3fcf50d](https://github.com/ColdPBC/cold-monorepo/commit/3fcf50dc97533619668d7360e6186f79910ff9bd))
* remove obsolete domain field from flightcontrol.json ([a886cdb](https://github.com/ColdPBC/cold-monorepo/commit/a886cdbd5d47b85a0a10f2826755a793811aea1d))

## [1.351.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.351.0...v1.351.1) (2024-08-30)


### Bug Fixes

* update API service IDs for production and staging environments ([b4eee63](https://github.com/ColdPBC/cold-monorepo/commit/b4eee6356b2f4c32ac30ee27284a74b8530883a3))

# [1.351.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.350.0...v1.351.0) (2024-08-30)


### Bug Fixes

* correctly parse and use database URL for connection ([6193da5](https://github.com/ColdPBC/cold-monorepo/commit/6193da52566b401c10ff2f3816e0d7dc5e34eb75))


### Features

* add access control lists to entities ([2b4bbbe](https://github.com/ColdPBC/cold-monorepo/commit/2b4bbbed1477d13d1728a08ea4f8a43d320f5424))
* add public_acl policy for user roles ([046ae6b](https://github.com/ColdPBC/cold-monorepo/commit/046ae6b1a52f078edcce8f7e1d33f832db45d98c))
* update maxAliases limit and auth setup in backend configuration ([0427aaf](https://github.com/ColdPBC/cold-monorepo/commit/0427aaf5888ff2f83bb41c9e8d05a41033b86fc1))

# [1.350.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.349.0...v1.350.0) (2024-08-29)


### Features

* update flightcontrol configurations for cold-api deployment ([44f8063](https://github.com/ColdPBC/cold-monorepo/commit/44f80631a51228549c69aab4082f2bb7bee5cf1d))

# [1.349.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.348.0...v1.349.0) (2024-08-29)


### Features

* add new configurations for cold-graphql and cold-graphql-ui in flightcontrol.json ([9c3891e](https://github.com/ColdPBC/cold-monorepo/commit/9c3891e19c37a20750a11fedb57f691864c39fad))

# [1.348.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.347.4...v1.348.0) (2024-08-29)


### Features

* add buildType field to flightcontrol.json ([2d3ec62](https://github.com/ColdPBC/cold-monorepo/commit/2d3ec62b0a72dd49c097414c9ad02691c217d27e))

## [1.347.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.347.3...v1.347.4) (2024-08-29)


### Bug Fixes

* **flightcontrol.json:** update build setup to use custom Docker configuration ([a887877](https://github.com/ColdPBC/cold-monorepo/commit/a887877d5327122c8f3ad8366ec96d95158e34c4))

## [1.347.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.347.2...v1.347.3) (2024-08-29)


### Bug Fixes

* update dependencies in pnpm-lock.yaml to latest versions ([af27116](https://github.com/ColdPBC/cold-monorepo/commit/af271168982a1bd92e76a6e1e2eaf25eed323347))

## [1.347.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.347.1...v1.347.2) (2024-08-29)


### Bug Fixes

* update dependencies and adjust OrganizationFacility entity formatting ([43bf795](https://github.com/ColdPBC/cold-monorepo/commit/43bf7951182662aed43f70d83e756214acf116d6))

## [1.347.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.347.0...v1.347.1) (2024-08-29)


### Bug Fixes

* **config:** update build commands to improve build process efficiency ([5b79eed](https://github.com/ColdPBC/cold-monorepo/commit/5b79eedd7e9854a6a15d8da06ed979072a9863e7))

# [1.347.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.7...v1.347.0) (2024-08-29)


### Features

* update backend and frontend dependencies, remove unused code ([fa70148](https://github.com/ColdPBC/cold-monorepo/commit/fa701487df2afc5d65f41df3c0f563ffd9b9ec94))

## [1.346.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.6...v1.346.7) (2024-08-29)


### Bug Fixes

* **nx.json:** remove redundant build dependency ([77ba8cf](https://github.com/ColdPBC/cold-monorepo/commit/77ba8cfbbf9621320f0e974159aae002e39e9f83))

## [1.346.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.5...v1.346.6) (2024-08-29)


### Bug Fixes

* increase EC2 instance storage from 60 to 120 in flightcontrol.json ([73e1700](https://github.com/ColdPBC/cold-monorepo/commit/73e170007daa2578639e9469b5188ea652fd70db))

## [1.346.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.4...v1.346.5) (2024-08-29)


### Bug Fixes

* remove unnecessary watch paths from flightcontrol.json ([89ca277](https://github.com/ColdPBC/cold-monorepo/commit/89ca277bb19dbe5076e27c28fa26a2f706a88ec9))

## [1.346.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.3...v1.346.4) (2024-08-29)


### Bug Fixes

* **database.config.ts:** correct regex pattern for PostgreSQL URL parsing ([d3801a4](https://github.com/ColdPBC/cold-monorepo/commit/d3801a44f6f1737b283ccb3e55dc590e12e90f49))

## [1.346.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.2...v1.346.3) (2024-08-29)


### Bug Fixes

* Update configuration to support Dockerfile environment variable injection ([48ab0f5](https://github.com/ColdPBC/cold-monorepo/commit/48ab0f5a44b035e832f67c136558ef6ec296329a))

## [1.346.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.1...v1.346.2) (2024-08-29)


### Bug Fixes

* update watchPaths in flightcontrol.json ([9c25924](https://github.com/ColdPBC/cold-monorepo/commit/9c259242a42a4f9e8a37139b6eedefe768bcbd93))

## [1.346.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.346.0...v1.346.1) (2024-08-29)


### Bug Fixes

* update watch paths in flightcontrol.json ([94a6c76](https://github.com/ColdPBC/cold-monorepo/commit/94a6c76391e97025d801cfdfced1b0b68904e5ae))

# [1.346.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.345.0...v1.346.0) (2024-08-29)


### Features

* update flight control configuration for watch paths and environment variables ([4c4bba8](https://github.com/ColdPBC/cold-monorepo/commit/4c4bba82aba6d24ac539482859309aaf71ebf0a6))

# [1.345.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.5...v1.345.0) (2024-08-29)


### Features

* update flight control configuration for watch paths and environment variables ([3bda7ca](https://github.com/ColdPBC/cold-monorepo/commit/3bda7ca59bcc26e09aabd40f9ca515d35cb001b1))

## [1.344.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.4...v1.344.5) (2024-08-29)


### Bug Fixes

* reduce memory allocation for multiple services ([baf671c](https://github.com/ColdPBC/cold-monorepo/commit/baf671cba3af254dbc0bdcfee7afd0b2e4272318))

## [1.344.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.3...v1.344.4) (2024-08-29)


### Bug Fixes

* adjust resource allocations and scaling parameters in flightcontrol.json ([7ea802b](https://github.com/ColdPBC/cold-monorepo/commit/7ea802ba30aacb0cd5cd405c2d41b52805d30eff))

## [1.344.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.2...v1.344.3) (2024-08-29)


### Bug Fixes

* update instanceStorage for CI ([86c108e](https://github.com/ColdPBC/cold-monorepo/commit/86c108ec5b2e5038b7e31cb84101c2ced56f02e4))

## [1.344.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.1...v1.344.2) (2024-08-28)


### Bug Fixes

* update build and start commands in flightcontrol.json ([6896a90](https://github.com/ColdPBC/cold-monorepo/commit/6896a90dba4cb3b2d98121d6dc85d56209ec99b2))

## [1.344.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.344.0...v1.344.1) (2024-08-28)


### Bug Fixes

* remove ApplyAccessControlList annotation and update imports ([ea67c08](https://github.com/ColdPBC/cold-monorepo/commit/ea67c0840cc9835b328c541d91a01368d859c70a))

# [1.344.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.343.0...v1.344.0) (2024-08-28)


### Features

* update resource allocations and config settings ([a2f2c73](https://github.com/ColdPBC/cold-monorepo/commit/a2f2c7340bcb1757ef4c75831b882e5c7d0fe9c4))

# [1.343.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.342.1...v1.343.0) (2024-08-28)


### Features

* add ACL and modify entities ([ca53cce](https://github.com/ColdPBC/cold-monorepo/commit/ca53cceb333075aa548e9a03863fb0d53d1cdc6f))

## [1.342.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.342.0...v1.342.1) (2024-08-28)


### Bug Fixes

* update introspection configuration and clean up imports ([7a67f32](https://github.com/ColdPBC/cold-monorepo/commit/7a67f32d617f07a877202aeab1fd75575a8d7708))

# [1.342.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.8...v1.342.0) (2024-08-28)


### Features

* setup backend with Graphweaver and AuthZero ([868c359](https://github.com/ColdPBC/cold-monorepo/commit/868c359596dc8c586023005c9a1da095a0e623fa))

## [1.341.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.7...v1.341.8) (2024-08-28)


### Bug Fixes

* add debugging commands to build and start scripts ([9b2f0be](https://github.com/ColdPBC/cold-monorepo/commit/9b2f0be3422cbb17494f16cd0059e82ff25917f4))

## [1.341.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.6...v1.341.7) (2024-08-28)


### Bug Fixes

* update build and start commands for debugging ([88abbf1](https://github.com/ColdPBC/cold-monorepo/commit/88abbf18eddc7c4fae73c0c25b197cd40ec7e152))

## [1.341.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.5...v1.341.6) (2024-08-28)


### Bug Fixes

* update install command to enable corepack for pnpm ([373649a](https://github.com/ColdPBC/cold-monorepo/commit/373649a496b2e13a60caef6e990c3a42004be9eb))

## [1.341.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.4...v1.341.5) (2024-08-28)


### Bug Fixes

* update flightcontrol.json with correct paths and build commands ([d10d3c5](https://github.com/ColdPBC/cold-monorepo/commit/d10d3c535fc69dacb11da9206097f4c4865681f5))

## [1.341.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.3...v1.341.4) (2024-08-28)


### Bug Fixes

* add basePath to cold-api in flightcontrol.json ([42edc73](https://github.com/ColdPBC/cold-monorepo/commit/42edc73f3301b3510e9cc4866355cd1cb9c9b672))

## [1.341.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.2...v1.341.3) (2024-08-28)


### Bug Fixes

* update install and base path in flightcontrol.json and clean dependencies in package.json ([5e2378b](https://github.com/ColdPBC/cold-monorepo/commit/5e2378b8a4ef6079387c70d94ccceff1f589876c))

## [1.341.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.1...v1.341.2) (2024-08-28)


### Bug Fixes

* update install command and add new environment variables ([db5ab42](https://github.com/ColdPBC/cold-monorepo/commit/db5ab426378f2720461d209e7b77c36c4c0e8179))

## [1.341.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.341.0...v1.341.1) (2024-08-28)


### Bug Fixes

* update EC2 instance sizes in flightcontrol configuration ([443c374](https://github.com/ColdPBC/cold-monorepo/commit/443c374d464f82c4a1b701d8d31caac3c465a866))

# [1.341.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.340.3...v1.341.0) (2024-08-28)


### Bug Fixes

* update EC2 instance sizes in flightcontrol configuration ([e8bbb5c](https://github.com/ColdPBC/cold-monorepo/commit/e8bbb5c6295e5bc67268ad6b2d4e8f959c0b1be5))
* update flight control configuration ([5f0e34f](https://github.com/ColdPBC/cold-monorepo/commit/5f0e34f3ff82a622eab9bdc46443d5ed99489d08))


### Features

* add new npm commands for install, build, and start in flightcontrol.json ([50d5d75](https://github.com/ColdPBC/cold-monorepo/commit/50d5d75501552ef9a18a4e4b34a4d2bd5608e190))
* configure instance size for CI in flightcontrol.json ([7dc1a01](https://github.com/ColdPBC/cold-monorepo/commit/7dc1a012372e326c380b61862847a08c0a1300ec))

## [1.340.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.340.2...v1.340.3) (2024-08-28)


### Bug Fixes

* enable vertical scrolling on documents page ([184cf0d](https://github.com/ColdPBC/cold-monorepo/commit/184cf0db284ddc06ef866b0a45bf52e094f0f137))

## [1.340.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.340.1...v1.340.2) (2024-08-28)


### Bug Fixes

* handle undefined borderRadius and add TODO comment ([3010a19](https://github.com/ColdPBC/cold-monorepo/commit/3010a19369c6c748a42c7424a74a3aff8118cdde))

## [1.340.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.340.0...v1.340.1) (2024-08-28)


### Bug Fixes

* **tsconfig:** update exclude patterns to exclude react library files ([94f51ec](https://github.com/ColdPBC/cold-monorepo/commit/94f51ec92a5e8460b4cf60cae6313263932cfa90))

# [1.340.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.339.1...v1.340.0) (2024-08-28)


### Features

* remove cold-graphql configuration ([fc64c92](https://github.com/ColdPBC/cold-monorepo/commit/fc64c929dc6274bca212564c0ff706b2136220cc))

## [1.339.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.339.0...v1.339.1) (2024-08-28)


### Bug Fixes

* update flightcontrol target and commands ([b3dd0c5](https://github.com/ColdPBC/cold-monorepo/commit/b3dd0c536f9ad56aeb19c06ce2e5c1ab501dab3a))

# [1.339.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.338.2...v1.339.0) (2024-08-28)


### Features

* update flight control configuration for cold-graphql ([a94a77a](https://github.com/ColdPBC/cold-monorepo/commit/a94a77a503c08f9f434bf7c816f5f287c4599954))

## [1.338.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.338.1...v1.338.2) (2024-08-28)


### Bug Fixes

* adjust instance configurations and resource allocations ([85506af](https://github.com/ColdPBC/cold-monorepo/commit/85506af7354cecc9273bb3d899c41e3eb6366162))

## [1.338.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.338.0...v1.338.1) (2024-08-27)


### Bug Fixes

* correct service name and update configuration paths ([75557f9](https://github.com/ColdPBC/cold-monorepo/commit/75557f9be35bf77d236e627fc6b68a3ba07603cb))

# [1.338.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.337.4...v1.338.0) (2024-08-27)


### Features

* add XLSX file extraction service with PDF conversion and upload to S3 ([e6616e0](https://github.com/ColdPBC/cold-monorepo/commit/e6616e0c811580665852462bba5d46e5215e15d2))

## [1.337.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.337.3...v1.337.4) (2024-08-26)


### Bug Fixes

* **pinecone.service:** add null checks and improve error handling in uploadData method ([ed83d18](https://github.com/ColdPBC/cold-monorepo/commit/ed83d189bc9a1324c1708801c559769b71c1ef5b))

## [1.337.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.337.2...v1.337.3) (2024-08-24)


### Bug Fixes

* refine date extraction and schema descriptions ([338a8c2](https://github.com/ColdPBC/cold-monorepo/commit/338a8c2d96abc00d89b7602f9cb18952d2460e6f))

## [1.337.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.337.1...v1.337.2) (2024-08-24)


### Bug Fixes

* enhance file classification in chat service ([9ef04da](https://github.com/ColdPBC/cold-monorepo/commit/9ef04dabb5c371a70d2f5396924282d1e904e9d6))
* handle date parsing errors and refine response format ([f7723f9](https://github.com/ColdPBC/cold-monorepo/commit/f7723f90e9c55acb610943de38227c303fa2385a))
* improve file processing for various content types ([e530de1](https://github.com/ColdPBC/cold-monorepo/commit/e530de18d60c8d801bdfead5892e2765d37ccb53))

## [1.337.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.337.0...v1.337.1) (2024-08-24)


### Bug Fixes

* **chat.service:** add missing await for async operations ([30ece5a](https://github.com/ColdPBC/cold-monorepo/commit/30ece5ac3b1711d0d989bcfc84f3a2f524c0132c))

# [1.337.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.336.0...v1.337.0) (2024-08-24)


### Bug Fixes

* **crawler:** update method calls to getIndexDetails and getIndex ([28bd3c1](https://github.com/ColdPBC/cold-monorepo/commit/28bd3c15746f80cc0ce3e6be5edfcec64c51b23b))
* **events:** refactor sendIntegrationEvent to simplify orgId handling ([f78b06c](https://github.com/ColdPBC/cold-monorepo/commit/f78b06ce69183694988d5c71f5c6675d3ae596dd))
* include organization in compliance service requests ([4312065](https://github.com/ColdPBC/cold-monorepo/commit/431206507c18e452d9feba7139bbb610b1f0aa31))
* include organization in integration events ([8d96856](https://github.com/ColdPBC/cold-monorepo/commit/8d96856c8c07d3f5aac421da06fb3fe8eb9abed2))
* **job.consumer:** remove unnecessary organization name parameter in deleteFileJob ([7965574](https://github.com/ColdPBC/cold-monorepo/commit/796557498fc2553465f2526ac6a341ee305d59aa))
* **organization.controller:** simplify organization deletion logic ([75a8e16](https://github.com/ColdPBC/cold-monorepo/commit/75a8e168b8fa6dc2c5a005c2f1fa4d98eca81b55))
* **organization.service:** correct parameter passed to sendIntegrationEvent function ([8858695](https://github.com/ColdPBC/cold-monorepo/commit/88586958aabfaa6d3551b61f2075a3ebd8c72231))
* update index retrieval and add document classification methods ([be1bb11](https://github.com/ColdPBC/cold-monorepo/commit/be1bb11632c7e8f641e967f580a75da03c451ad7))
* update organization handling in Rabbit service ([f535a89](https://github.com/ColdPBC/cold-monorepo/commit/f535a89aa820585542379442bf515b8bac3128fc))
* use correct variable name for organization in integrations service ([e03c4ee](https://github.com/ColdPBC/cold-monorepo/commit/e03c4eee75eba0195133b99e1b998754f97b95bb))


### Features

* add classification endpoints to trigger extraction on existing files ([cbe9be4](https://github.com/ColdPBC/cold-monorepo/commit/cbe9be4a42c68cbd08e049d95c51e0e5aa62efef))
* enhance activation process with organization data ([b41827c](https://github.com/ColdPBC/cold-monorepo/commit/b41827cfda03783242bc16f66b490c61ae475c11))
* enhance classification and extraction with organization context ([f313349](https://github.com/ColdPBC/cold-monorepo/commit/f3133491e674854fbcbdf6b9debeb2ee1db76e0b))

# [1.336.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.335.0...v1.336.0) (2024-08-23)


### Bug Fixes

* correct uploadStreamToS3 function parameter type ([b32d07b](https://github.com/ColdPBC/cold-monorepo/commit/b32d07b14dab3c9ac1a1b40c7c0397a893e6fc81))
* ensure orgId parameter starts with 'org_' in org-user-interceptor service ([7f3fbef](https://github.com/ColdPBC/cold-monorepo/commit/7f3fbef2f077dd16f9fdc876de281648346826dd))
* **logging:** initialize DarklyService during onModuleInit ([6b58460](https://github.com/ColdPBC/cold-monorepo/commit/6b58460a71afb004fa7c5ba6e44f0a542b4ddd93))


### Features

* add bluesign schema for certificate extraction ([d6b0900](https://github.com/ColdPBC/cold-monorepo/commit/d6b09001f75a664ed4ed1f62b87009489192c8c4))
* add classification schema for document extraction ([75f14c4](https://github.com/ColdPBC/cold-monorepo/commit/75f14c4f2f1ba0aee2a2301c35ebd8a8c03f7f0c))
* add default extraction schema for unknown document types ([4ea7591](https://github.com/ColdPBC/cold-monorepo/commit/4ea7591c71929b2efea32226649f7e41c1301c5d))
* add default platform integrations on organization creation ([8eab6f2](https://github.com/ColdPBC/cold-monorepo/commit/8eab6f2b4b88e3c3d5c6dd26f657d1a2b9f56ad6))
* add default policy schema for extraction module ([fe4abc1](https://github.com/ColdPBC/cold-monorepo/commit/fe4abc1c97c4f0b99d6240632276eb41ab913b10))
* add default statement schema for document extraction ([3a821c0](https://github.com/ColdPBC/cold-monorepo/commit/3a821c0499284c6d63c4e3ef114faf1dbf0a754f))
* add default test schema for extraction ([b3d74df](https://github.com/ColdPBC/cold-monorepo/commit/b3d74df575c7cb62916d7cfba9d31d0a3697e265))
* add ExtractionModule to AppModule ([476b8f8](https://github.com/ColdPBC/cold-monorepo/commit/476b8f809fbe088bf03e0ad63519165e03de8bc6))
* add ExtractionModule to cold-platform-openai app ([122dd7f](https://github.com/ColdPBC/cold-monorepo/commit/122dd7fa87bb5d685edefb8b331ed45251d9646e))
* add ExtractionModule to CrawlerModule ([5f6b759](https://github.com/ColdPBC/cold-monorepo/commit/5f6b759479cd6a35e38df32df4667c58c5856a07))
* add ExtractionService for AI-based content classification and data extraction ([41f8a75](https://github.com/ColdPBC/cold-monorepo/commit/41f8a75b817b4c9997688e615c93835efdfe007b))
* add global.schema.ts for extraction module ([4135a2f](https://github.com/ColdPBC/cold-monorepo/commit/4135a2fa430a4728c815bcd3562390521277bc18))
* add Integrations enum value ([4267bdd](https://github.com/ColdPBC/cold-monorepo/commit/4267bdd5465591a9fa734ef6857e39d536d65352))
* add interceptor to organization files controller and adjust delete test orgs logic ([a37059c](https://github.com/ColdPBC/cold-monorepo/commit/a37059c6dc43fa3f36efe38788fcb01925361b8d))
* add intertek.schema.ts to facility extraction from test documents ([d87d2bf](https://github.com/ColdPBC/cold-monorepo/commit/d87d2bf03f0b3ad59c4ddf0a7f12bc909ff37a15))
* add metadata column to organization_files table ([fbbc309](https://github.com/ColdPBC/cold-monorepo/commit/fbbc3097af67698c7e94c4292312482a7be0a3db))
* add schema for default certificate ([e69b97b](https://github.com/ColdPBC/cold-monorepo/commit/e69b97b5146e6af01afadc381a9137bbb961bd3d))
* add schema for TUV Rheinland documents ([71fd8b8](https://github.com/ColdPBC/cold-monorepo/commit/71fd8b83e1c6ecdb3698fc557ba2c5e265d4c984))
* add SGS schema for test document extraction ([02af502](https://github.com/ColdPBC/cold-monorepo/commit/02af502d49aeb5cfe89857530568e4227e6cc870))
* add wrap schema definition for certificate extraction ([a8aff80](https://github.com/ColdPBC/cold-monorepo/commit/a8aff80f63a31abc4f3dc0ee3a79c9b84e9eb1dd))
* enhance PDF handling in langchain loader service ([3eb199c](https://github.com/ColdPBC/cold-monorepo/commit/3eb199c555bd4362e83c27eedb3e90616a559ba2))
* integrate ExtractionService and S3Service for PDF content handling ([489c250](https://github.com/ColdPBC/cold-monorepo/commit/489c250ac466773efce7261549563e64fce3c287))

# [1.335.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.334.4...v1.335.0) (2024-08-20)


### Bug Fixes

* replace logError with logBrowser, adjust compliance set loading background ([0d8c356](https://github.com/ColdPBC/cold-monorepo/commit/0d8c3569fe5198706124549638008e23863c0cea))
* replace logError with logBrowser, adjust compliance set loading background ([5e0925b](https://github.com/ColdPBC/cold-monorepo/commit/5e0925b582b1e8a2b7707f01153ce5a1ec84b25c))



### Features

* add supplier removal functionality for materials ([7787e8a](https://github.com/ColdPBC/cold-monorepo/commit/7787e8aaecb3ebcba7915b0ba0d44c035b8220cd))

## [1.334.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.334.3...v1.334.4) (2024-08-19)


### Bug Fixes

* remove sensitive payload logging and correct metrics field name ([a5a856b](https://github.com/ColdPBC/cold-monorepo/commit/a5a856b1473568afc6cff383d0e220033e790ce2))

## [1.334.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.334.2...v1.334.3) (2024-08-19)


### Bug Fixes

* update tag attributes in chat service ([e273bb6](https://github.com/ColdPBC/cold-monorepo/commit/e273bb63fa502dcc5f576444ba9d7765f86f83a8))

## [1.334.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.334.1...v1.334.2) (2024-08-19)


### Bug Fixes

* improve compliance retrieval and creation logic to handle missing compliance definitions ([163419b](https://github.com/ColdPBC/cold-monorepo/commit/163419bc84269007d4a5984ebfde1bfffecfa227))

## [1.334.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.334.0...v1.334.1) (2024-08-19)


### Bug Fixes

* correct metrics increment and alert source type handling ([1ab4ad7](https://github.com/ColdPBC/cold-monorepo/commit/1ab4ad76559afbd7abbada952a1b44a8de756b2c))
* simplify job processing logic in job.consumer.ts ([a209cf7](https://github.com/ColdPBC/cold-monorepo/commit/a209cf715b33ce0a1346bf38967b5c9ada36ca75))

# [1.334.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.333.0...v1.334.0) (2024-08-19)


### Bug Fixes

* update compliance activation endpoints and improve UI scrolling ([f434fcf](https://github.com/ColdPBC/cold-monorepo/commit/f434fcfb923ef209ad1dc4d9a386209f74df6cfe))


### Features

* add data-chromatic attribute to newsItem component ([cc60ec4](https://github.com/ColdPBC/cold-monorepo/commit/cc60ec44dfc581367acdfd9c759f7c9499781f86))
* Delete complianceOverview components and redundant logic ([07248e7](https://github.com/ColdPBC/cold-monorepo/commit/07248e782f29bb71e5b0461a473843579dca8617))
* Refactor compliance data fetching in ComplianceQuestionnaire ([d2d8dac](https://github.com/ColdPBC/cold-monorepo/commit/d2d8dac156692ee9ae16ee96f9f504ccc246f17a))
* Refactor compliance-related components to streamline data retrieval ([146ad7f](https://github.com/ColdPBC/cold-monorepo/commit/146ad7fa09bd7b315677c82abe7cc3a3b85bf1cb))
* Remove assessments context and related components ([0e0f551](https://github.com/ColdPBC/cold-monorepo/commit/0e0f5517e3857c54bc92e39c7954ff0422cba236))
* Remove compliance wizard lair and related components ([3b9e4f9](https://github.com/ColdPBC/cold-monorepo/commit/3b9e4f92eaf80613ef4c35ac32046b4ecb992b99))

# [1.333.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.332.0...v1.333.0) (2024-08-16)


### Bug Fixes

* **chat.service:** correct log message to include section and item keys ([5046aa7](https://github.com/ColdPBC/cold-monorepo/commit/5046aa7300d467a6bf88566f49114320cb4da7fc))
* **mqtt.validator.service:** adjust user field validation in MqttUIPayloadSchema to allow any type values ([76437fb](https://github.com/ColdPBC/cold-monorepo/commit/76437fbf14b731795dd6fa93113e4c4efd473671))
* replace `any` type with `IRequest` in ComplianceSectionsController ([b06c757](https://github.com/ColdPBC/cold-monorepo/commit/b06c7572ea20474804434fa17de03fd9262d5cc2))
* update IRequest type for compliance question bookmark controller methods ([5f0b1c1](https://github.com/ColdPBC/cold-monorepo/commit/5f0b1c12e2c749c3a72ba0d16d8ec4c98dad1721))
* update Request type to IRequest in EventService ([0a02f75](https://github.com/ColdPBC/cold-monorepo/commit/0a02f75fab404b5a984c855cd8b07d5d55abe1c1))


### Features

* add DD_ENV environment variable to development run configuration ([d280b22](https://github.com/ColdPBC/cold-monorepo/commit/d280b225e05fc6bc0a358738a04625ff091701f8))
* add delete supplier material endpoint ([425e2e1](https://github.com/ColdPBC/cold-monorepo/commit/425e2e1fb6ff83b3901bd5e418263c21b14900e8))
* add deleteSupplierMaterial method to materials.service ([18f0824](https://github.com/ColdPBC/cold-monorepo/commit/18f0824538ae36c86be1afc775638edb61999c29))
* add IRequest interface for request handling ([9f28fcc](https://github.com/ColdPBC/cold-monorepo/commit/9f28fcce6e71d23d7b554ac1859b4e90f0629332))
* add method to remove material supplier from organization ([509f3d1](https://github.com/ColdPBC/cold-monorepo/commit/509f3d1f429f07537e9077abd404ab01587fdedf))
* export request.interface in primitives interfaces ([17eaca7](https://github.com/ColdPBC/cold-monorepo/commit/17eaca73227bb92cbf33d7174d611c7cb902b0ea))
* replace `any` with `IRequest` in policy services and controller ([1050074](https://github.com/ColdPBC/cold-monorepo/commit/105007462c7a9c3225da5c4edafa7230237f3fb0))
* update compliance section groups to use IRequest interface ([c6a4009](https://github.com/ColdPBC/cold-monorepo/commit/c6a4009d768ccf1b45a4fcad6a99d600048832b5))
* update IRequest type for compliance response controllers ([28be455](https://github.com/ColdPBC/cold-monorepo/commit/28be4559be6c70be46d069a3f9e747eccac8e13e))
* update organization claims controller to use IRequest interface ([ab9aa5d](https://github.com/ColdPBC/cold-monorepo/commit/ab9aa5d54a4929e6f4cba1846c8482cafd5e513e))
* update request type to IRequest in invitations service and controller ([5bcf82b](https://github.com/ColdPBC/cold-monorepo/commit/5bcf82b42cca7089aa3fbf1f66e31338a27ff7c4))
* update request type to IRequest in news service methods ([567de89](https://github.com/ColdPBC/cold-monorepo/commit/567de89634880d36e653c0416d86f1706ba94331))
* update request type usage in organization compliance notes ([ed4a301](https://github.com/ColdPBC/cold-monorepo/commit/ed4a30127d17a5624f27621e176bc479b056475b))

# [1.332.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.331.0...v1.332.0) (2024-08-16)


### Features

* add deleteSupplierMaterial method to materials.service ([446f8f6](https://github.com/ColdPBC/cold-monorepo/commit/446f8f6e552781652b6dca7772fc9e10aaca02f3))

# [1.331.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.330.0...v1.331.0) (2024-08-16)


### Features

* add unique constraint for material_suppliers on material_id and supplier_id ([d565342](https://github.com/ColdPBC/cold-monorepo/commit/d56534220706938b8e9aae9f0ca0cc39780c0353))

# [1.330.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.329.0...v1.330.0) (2024-08-16)


### Features

* Add metric collection to compliance note operations ([ccc4528](https://github.com/ColdPBC/cold-monorepo/commit/ccc4528c01da490e2997bed54ed24c51bc05654d))
* add metrics and event logging for compliance question bookmarks ([ae76b2c](https://github.com/ColdPBC/cold-monorepo/commit/ae76b2ce77ca22799f958c453bc7786c22c97803))
* Add metrics and events tracking for file operations ([7a56376](https://github.com/ColdPBC/cold-monorepo/commit/7a5637611d2f4fdd73ec6cfee661bbe753393bf9))
* add metrics logging for AI responses creation ([5b927b8](https://github.com/ColdPBC/cold-monorepo/commit/5b927b8fd9475b5f5cf0b859e5e06f0d9d4170da))
* add metrics logging to claims_repository methods ([43f32bf](https://github.com/ColdPBC/cold-monorepo/commit/43f32bf628c1f79454fee2bca10c2be95bfefbfa))
* add metrics tracking for compliance responses repository ([6506629](https://github.com/ColdPBC/cold-monorepo/commit/6506629f602576a9aa973a6177431d1176f15bfd))
* add metrics tracking to organization compliance operations ([f8ee5f1](https://github.com/ColdPBC/cold-monorepo/commit/f8ee5f1f57fb9e50c24dec44e54c60101ff98e0e))
* add sendMetrics method to worker class ([e398b24](https://github.com/ColdPBC/cold-monorepo/commit/e398b24afe7eb0e0e43872c408c5f079edc81791))
* enhance organization compliance status creation with metrics tracking ([5d7094a](https://github.com/ColdPBC/cold-monorepo/commit/5d7094ab8ccc7053498b9d57d651dabea78f8eac))
* update organization claims view ([ca5df70](https://github.com/ColdPBC/cold-monorepo/commit/ca5df70c81a31c9f80d64e43117dd0fc8f21cac0))

# [1.329.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.328.1...v1.329.0) (2024-08-15)


### Features

* add functionality to associate suppliers to materials ([339edb3](https://github.com/ColdPBC/cold-monorepo/commit/339edb36b108f6fc7427aba9686fdd893ead87b1))
* add POST handler for supplier materials in mock API ([35d3f02](https://github.com/ColdPBC/cold-monorepo/commit/35d3f020c4e79b4a42412f0069274847086f4b30))
* add supplier action column to MaterialDetail component ([83ad4d0](https://github.com/ColdPBC/cold-monorepo/commit/83ad4d03e2c11eda163e534baf83016f156e02d2))

## [1.328.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.328.0...v1.328.1) (2024-08-15)


### Bug Fixes

* adjust layout, routing, and button properties for enhanced functionality ([d802086](https://github.com/ColdPBC/cold-monorepo/commit/d802086693314fe2d30ada0b28094a698b58c1a9))

# [1.328.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.327.1...v1.328.0) (2024-08-14)


### Bug Fixes

* allow `text` to be either string array or string in compliance interface ([a3baa59](https://github.com/ColdPBC/cold-monorepo/commit/a3baa59b3909ca63b57ac6c979e0a421af692522))
* handle non-array text properly in AiReferenceDropdown ([780c4aa](https://github.com/ColdPBC/cold-monorepo/commit/780c4aab67c0671ed8e4b021edb8be88a83ac294))
* remove unnecessary tab condition check ([7e2999a](https://github.com/ColdPBC/cold-monorepo/commit/7e2999a193204e940af0560fac51d0201d1719d9))
* remove unused import in aiReferenceDropdown.tsx ([107753a](https://github.com/ColdPBC/cold-monorepo/commit/107753a14e9e187ece2582afcfd1d6737b847fa7))


### Features

* add material detail mock and handler APIs ([708ea59](https://github.com/ColdPBC/cold-monorepo/commit/708ea5910db41d5eb2df0048c29d63cce3bd5967))
* Add Material Detail Sidebar and MuiDataGrid components and refine materials data management ([1c9f60c](https://github.com/ColdPBC/cold-monorepo/commit/1c9f60cd92099ea2986abdf4195dc6b70ecda3f4))
* add MaterialDetail page and remove flag for MaterialsPage route ([8a01ece](https://github.com/ColdPBC/cold-monorepo/commit/8a01eceb7b34b80d0d3838eb1b56d2d8793c2de4))
* dynamically update tabs based on compliance name ([c4eeb41](https://github.com/ColdPBC/cold-monorepo/commit/c4eeb417c389c16bccc90c80e391f207549501dd))
* update routes for materials and suppliers ([66537d8](https://github.com/ColdPBC/cold-monorepo/commit/66537d80ac0ac0edc0aa2a7b82af1ae98be91bb0))

## [1.327.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.327.0...v1.327.1) (2024-08-13)


### Bug Fixes

* typecast routing_key to string in organization integrations service ([18c7019](https://github.com/ColdPBC/cold-monorepo/commit/18c7019bd3a7c0ce0d012414f90e78af892fd687))

# [1.327.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.326.0...v1.327.0) (2024-08-13)


### Bug Fixes

* **app.module:** replace CertificationsModule with ClaimsModule ([d8b3ce5](https://github.com/ColdPBC/cold-monorepo/commit/d8b3ce5699be4370628cc16edb6af3b53fa2aba0))
* **claims_repository:** correct id prefix and error messages for createClaim method ([7aca483](https://github.com/ColdPBC/cold-monorepo/commit/7aca483432aef03e95cbebc0c2ede39d300b451d))
* correct method and parameter names in claims service ([c0a1502](https://github.com/ColdPBC/cold-monorepo/commit/c0a1502e8b24ff6c286ae1ef784e159adf407581))
* correct module and service references in ClaimsModule ([1137280](https://github.com/ColdPBC/cold-monorepo/commit/11372805e8ed59251ba9eab6cf0a63c5ed32b1fc))
* improve validation for optional fields in organization claims ([3855b52](https://github.com/ColdPBC/cold-monorepo/commit/3855b52da1160a4f244fa4f86c2ab13fa4ecca54))
* **prisma:** correct field name for organization_claims in schema ([a6a6421](https://github.com/ColdPBC/cold-monorepo/commit/a6a64211954e91d117e44b894a775224d866e73c))
* rename certification_claim to organization_claims to correct schema field name ([bd92159](https://github.com/ColdPBC/cold-monorepo/commit/bd9215934e8c60588a13140d5c1b9404068388db))
* update organization claims endpoint path ([2447cbc](https://github.com/ColdPBC/cold-monorepo/commit/2447cbcf143f312aa1e747797bc8eff41cce848e))


### Features

* add claims service for handling certification operations ([7026088](https://github.com/ColdPBC/cold-monorepo/commit/7026088694ca46be26b3f3e2e63fecf9f17397a6))
* Add custom comparator and filter operators for DataGrid ([b1c1458](https://github.com/ColdPBC/cold-monorepo/commit/b1c145876d0404c99ee0c6473cb55860c7bec868))
* Add materials page with data grid and related components ([97705e9](https://github.com/ColdPBC/cold-monorepo/commit/97705e91ed9d750e53abd7e79d2a153304916786))
* add OrganizationClaimsModule to cold-api project ([550310c](https://github.com/ColdPBC/cold-monorepo/commit/550310cdf522a5f20140a75c739e4de24deebb0e))
* add unique constraint to claims table and create various indexes ([d61c199](https://github.com/ColdPBC/cold-monorepo/commit/d61c19905fdd86d326dbb08c09cbfd4227303cd6))
* **claims:** refactor ClaimsController to use correct ClaimsService reference ([f6816d1](https://github.com/ColdPBC/cold-monorepo/commit/f6816d1e81375ea2fb1db90f4446ebfc5002fee1))
* Enable Materials Page with Feature Toggle ([616f173](https://github.com/ColdPBC/cold-monorepo/commit/616f1730338a9a2f4abbd7a0d7641530fe4f5e7d))
* export claims module in nest library ([1f5c4cc](https://github.com/ColdPBC/cold-monorepo/commit/1f5c4cc6559c543e561166735b1d42774fae350f))
* remove certification_types enum ([e04278c](https://github.com/ColdPBC/cold-monorepo/commit/e04278cf11ab322eea83064ab65fd66d00707b4e))
* remove CertificationsService from cold-api ([f372b39](https://github.com/ColdPBC/cold-monorepo/commit/f372b39162119b0078517b679ef629f9ed3c011d))
* rename and restructure claims tables ([48405c9](https://github.com/ColdPBC/cold-monorepo/commit/48405c984bb9dbd5976506935aad6ce6a4f8a2de))
* Rename supplier comparator and adjust DataGrid styling. ([88f93ee](https://github.com/ColdPBC/cold-monorepo/commit/88f93ee0b20c93a2ba4c26f9ce6f60e585ea220a))
* update claim structure and rename indexes ([d8747a1](https://github.com/ColdPBC/cold-monorepo/commit/d8747a1a2bc327a161ff10962f17f22315aa0b1d))
* Update documentsPage component to ignore Chromatic UI testing ([0e483fd](https://github.com/ColdPBC/cold-monorepo/commit/0e483fd9577b101b68cde484f68babca1121e256))
* update OpenAPI examples and survey structure ([5252586](https://github.com/ColdPBC/cold-monorepo/commit/525258655d14757171668ccc6b234b459a1410cd))

# [1.326.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.325.0...v1.326.0) (2024-08-08)


### Features

* Add custom comparator and filter operators for DataGrid ([2fbe814](https://github.com/ColdPBC/cold-monorepo/commit/2fbe81434a711030a2bb60721164f9adb5766b05))
* Add materials page with data grid and related components ([5f23586](https://github.com/ColdPBC/cold-monorepo/commit/5f23586ecca101ff87c3086990128c92578568e0))
* Enable Materials Page with Feature Toggle ([e44bb91](https://github.com/ColdPBC/cold-monorepo/commit/e44bb919e9092696fa7ca97f08aa16d378226bc3))
* Rename supplier comparator and adjust DataGrid styling. ([726bb8e](https://github.com/ColdPBC/cold-monorepo/commit/726bb8e8d017d4f761194a295fc915580f82318a))
* Update documentsPage component to ignore Chromatic UI testing ([7561339](https://github.com/ColdPBC/cold-monorepo/commit/7561339dde793bf75a8c52fb95e4e41089f26d5d))

# [1.325.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.324.2...v1.325.0) (2024-08-07)


### Features

* Add materials interface and update document details sidebar ([357512c](https://github.com/ColdPBC/cold-monorepo/commit/357512c0382b7dd6c37abc48810c426d8c9057d5))
* Refactor and add claims to document details sidebar ([c6a3501](https://github.com/ColdPBC/cold-monorepo/commit/c6a35019d815a52676ab5df9b2db13e7c994fd9f))
* Refactor and update document details components. ([cfc180e](https://github.com/ColdPBC/cold-monorepo/commit/cfc180e1ed8a2c6e1c982ed3f287ce13808bddb8))

## [1.324.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.324.1...v1.324.2) (2024-08-06)


### Bug Fixes

* update material repository and schema to handle supplier relations and errors ([c5cf196](https://github.com/ColdPBC/cold-monorepo/commit/c5cf196e548c87a4ca39a41eff49db558285030f))

## [1.324.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.324.0...v1.324.1) (2024-08-06)


### Bug Fixes

* enhance materials repository to include detailed supplier and material selection ([d4dafde](https://github.com/ColdPBC/cold-monorepo/commit/d4dafde9dbc15fe20a3d3e2a0936207685efaf36))

# [1.324.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.323.0...v1.324.0) (2024-08-06)


### Bug Fixes

* add missing createSupplierMaterial method in materials.service ([b4a752b](https://github.com/ColdPBC/cold-monorepo/commit/b4a752b26bbffb9d5727d1af65aa811c1a62527d))
* enhance materials controller with authentication, roles, and error handling ([a7f7fd1](https://github.com/ColdPBC/cold-monorepo/commit/a7f7fd19d04f429027dbb26549d5405a38616c65))
* update route parameter name for file update endpoint ([2a7e9b7](https://github.com/ColdPBC/cold-monorepo/commit/2a7e9b7123fd61ab4e56d8d6b0d2798fbe248518))
* validate material and supplier existence before creating material_suppliers ([e594d81](https://github.com/ColdPBC/cold-monorepo/commit/e594d814039857d48bd5aaa17ba0a5331e541b19))


### Features

* update OpenAPI schema examples and add new paths for organization files ([18ada17](https://github.com/ColdPBC/cold-monorepo/commit/18ada178fbf4a07dbc498552cc0be4d049ea6d42))

# [1.323.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.322.1...v1.323.0) (2024-08-06)


### Features

* enhance organization file service to include materials and products ([119d4a3](https://github.com/ColdPBC/cold-monorepo/commit/119d4a3bd2b38297352b0954a1ac38ac6ccb3659))

## [1.322.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.322.0...v1.322.1) (2024-08-06)


### Bug Fixes

* include 'facility' in organization files service ([e364ff1](https://github.com/ColdPBC/cold-monorepo/commit/e364ff10c42ff74b431d993c09bddd0ee37f4e48))

# [1.322.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.321.0...v1.322.0) (2024-08-05)


### Features

* create views for organization claims, suppliers, and compliance responses ([aed4677](https://github.com/ColdPBC/cold-monorepo/commit/aed46771d22f18624f0536e5bf2044c774667549))

# [1.321.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.320.0...v1.321.0) (2024-08-05)


### Features

* Add document download functionality ([9ec05a3](https://github.com/ColdPBC/cold-monorepo/commit/9ec05a3c65af177fd14dbd1d569086f46ff19a1d))

# [1.320.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.319.0...v1.320.0) (2024-08-05)


### Features

* Add estimated_score to compliance mock and interfaces ([47d793a](https://github.com/ColdPBC/cold-monorepo/commit/47d793ac412a5ef54dbd7a7bfa1f5ae6818b95a5))
* Update ai_score to estimated_score in SpiderChart ([68054d8](https://github.com/ColdPBC/cold-monorepo/commit/68054d8871306b0fda9eb0a95727607cc13d0014))

# [1.319.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.318.0...v1.319.0) (2024-08-05)


### Features

* Add compliance activation and loading state handling ([be9fe74](https://github.com/ColdPBC/cold-monorepo/commit/be9fe74d18ed8a5ca8ad7bfe0d12e97751440f5a))

# [1.318.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.317.0...v1.318.0) (2024-08-05)


### Features

* Add delete document functionality ([ff82d33](https://github.com/ColdPBC/cold-monorepo/commit/ff82d337588ba43edd4c7b6baeac8fa1fb66a172))
* Add deleteFile prop to DocumentDetailsSidebar ([4528ad6](https://github.com/ColdPBC/cold-monorepo/commit/4528ad622f1d53fd148f64c5d35f34674d2f34f6))
* Add DocumentDetailsMenu component to document details sidebar ([0b605e7](https://github.com/ColdPBC/cold-monorepo/commit/0b605e78f3dde474e96ed19dd48f0f9da8a6fbd9))
* Refactor sidebar focus and hover styles. ([a3b4686](https://github.com/ColdPBC/cold-monorepo/commit/a3b468679504d62b8e42dd919a2d4d69bcd75b30))

# [1.317.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.316.0...v1.317.0) (2024-08-05)


### Features

* Add document upload button to Documents page ([265428a](https://github.com/ColdPBC/cold-monorepo/commit/265428afc0a5371d3d0ac5d4c15ce0fa19b7c6c6))

# [1.316.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.315.0...v1.316.0) (2024-08-03)


### Bug Fixes

* correct command used for generating signed URL in S3 service ([d895698](https://github.com/ColdPBC/cold-monorepo/commit/d895698e7d47ce36f3a3a1e63bc0e2f6e1398da5))
* update API tags in organization.files.controller.ts ([a0d5622](https://github.com/ColdPBC/cold-monorepo/commit/a0d5622def0c0c638d3b82020be252895f63fdf6))


### Features

* add customizable expiration time for signed URL generation ([32c473d](https://github.com/ColdPBC/cold-monorepo/commit/32c473d10c71ccb85f1bfb0f22417d73052f2b58))
* add endpoint to get file URL in organization files controller ([bd6a5d1](https://github.com/ColdPBC/cold-monorepo/commit/bd6a5d1b32177f0ef338f90c6a3947890c9273d2))
* add getUrl method to organization.files.service ([e8e946d](https://github.com/ColdPBC/cold-monorepo/commit/e8e946df96e550802f792af32021d0ec33a20115))
* add MaterialsRepository to MaterialsModule ([9a52663](https://github.com/ColdPBC/cold-monorepo/commit/9a52663690c6287cd6dabb1b0dc174550a74bc9e))
* **materials:** update controller to handle organization and supplier contexts ([465a240](https://github.com/ColdPBC/cold-monorepo/commit/465a240ae8b19c84dc650fdfddf144e9ded7d174))

# [1.315.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.314.0...v1.315.0) (2024-08-03)


### Bug Fixes

* add validation for compliance definition during organization compliance creation ([ca6d310](https://github.com/ColdPBC/cold-monorepo/commit/ca6d31083499c33c9446503287a33bad87f670e6))
* allow nullable dates in organization files update method ([940b230](https://github.com/ColdPBC/cold-monorepo/commit/940b230188179fdc8814ac11e6d97ec7084ebf67))
* **compliance-question-bookmarks:** add null checks for compliance questions ([d374b15](https://github.com/ColdPBC/cold-monorepo/commit/d374b151507b83d143ee404bde131cfb24f5599d))
* correct import path for ProductsRepository ([a8cd156](https://github.com/ColdPBC/cold-monorepo/commit/a8cd1565fa32d2050008a0b0b4e523748636337a))
* handle missing compliance definition name in section groups creation ([513693d](https://github.com/ColdPBC/cold-monorepo/commit/513693d6927947d11336dea7363b6ad38a507271))
* handle missing compliance_definition_id in questions ([0529cea](https://github.com/ColdPBC/cold-monorepo/commit/0529cea136f48060700cba6f2487537bc3bdba02))
* **organization.service:** disable dynamic-org-white-list synchronization ([2decdef](https://github.com/ColdPBC/cold-monorepo/commit/2decdef2cce9bfe73bdf21727eff4e1d66d88d3d))
* **products.repository:** correct organization field used in queries ([40d7c6f](https://github.com/ColdPBC/cold-monorepo/commit/40d7c6f900fb575542e8e75adbe8aa199eceee83))
* remove unnecessary check for Organization Facility ID ([87b0292](https://github.com/ColdPBC/cold-monorepo/commit/87b02928bdd9123ae0defbb19e39c5e369546b0d))
* resolve compliance definition ID from name if not provided ([5cf949d](https://github.com/ColdPBC/cold-monorepo/commit/5cf949d2f212b7b6ca83f6576916afcf998d3142))
* update compliance claims repository to use organization_id instead of organization_name ([666498f](https://github.com/ColdPBC/cold-monorepo/commit/666498fd4286d6ffe24e468badf67cf6ddea2c22))
* update compliance claims repository to use organization_id instead of organization_name ([8e7ed60](https://github.com/ColdPBC/cold-monorepo/commit/8e7ed60ec0a121db6b717c20102bb26827070287))
* update Prisma schema with optimized indices and model relationships ([1d2a898](https://github.com/ColdPBC/cold-monorepo/commit/1d2a898c558be474ac5c1e71853603900098d5dd))


### Features

* add materials repository and module ([0079e87](https://github.com/ColdPBC/cold-monorepo/commit/0079e87367c6724af8d6945ef74acc53a9ca3ad8))
* add MaterialsModule to organization module ([b90388d](https://github.com/ColdPBC/cold-monorepo/commit/b90388d0ea1f41a11417c3ab59102509e3a6a930))
* add multiple indexes to enhance query performance in various tables ([85be564](https://github.com/ColdPBC/cold-monorepo/commit/85be5647ff15f62162ba507eb10c64f3db98d46b))
* add new Material and MaterialSupplier enums to compliance enums list ([e860df3](https://github.com/ColdPBC/cold-monorepo/commit/e860df3ea1d1d9028a6da03a7eb3228e9ee99394))
* include additional fields in supplier repository select ([59068d7](https://github.com/ColdPBC/cold-monorepo/commit/59068d7ef31b1e648815a809385869a9d2ef5a46))
* update database schema for GraphQL compliance ([c397b6f](https://github.com/ColdPBC/cold-monorepo/commit/c397b6fdcb1b93f9261aec858ac098584e01417b))
* update product and material models ([c84b4f0](https://github.com/ColdPBC/cold-monorepo/commit/c84b4f009f14bfc34ad310fdd6465c1d221131bd))
* update product and material models ([b887ce6](https://github.com/ColdPBC/cold-monorepo/commit/b887ce6dc4af8d381744aa52933e30b9343e9efe))
* update schema to support GraphQL implementation ([41c2272](https://github.com/ColdPBC/cold-monorepo/commit/41c2272fa4975368df5ddd53c40e72b3263437f9))

# [1.314.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.4...v1.314.0) (2024-08-02)


### Bug Fixes

* update SQL view for compliance responses ([5f689a5](https://github.com/ColdPBC/cold-monorepo/commit/5f689a5b6b4552a8b85095bbeffa827b390a0c18))


### Features

* add materials repository and module ([0079e87](https://github.com/ColdPBC/cold-monorepo/commit/0079e87367c6724af8d6945ef74acc53a9ca3ad8))
* add MaterialsModule to organization module ([b90388d](https://github.com/ColdPBC/cold-monorepo/commit/b90388d0ea1f41a11417c3ab59102509e3a6a930))
* add new Material and MaterialSupplier enums to compliance enums list ([e860df3](https://github.com/ColdPBC/cold-monorepo/commit/e860df3ea1d1d9028a6da03a7eb3228e9ee99394))

# [1.314.0-cold-919.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.314.0-cold-919.1...v1.314.0-cold-919.2) (2024-08-03)


## Bug Fixes

* add validation for compliance definition during organization compliance creation ([ca6d310](https://github.com/ColdPBC/cold-monorepo/commit/ca6d31083499c33c9446503287a33bad87f670e6))
* allow nullable dates in organization files update method ([940b230](https://github.com/ColdPBC/cold-monorepo/commit/940b230188179fdc8814ac11e6d97ec7084ebf67))
* **compliance-question-bookmarks:** add null checks for compliance questions ([d374b15](https://github.com/ColdPBC/cold-monorepo/commit/d374b151507b83d143ee404bde131cfb24f5599d))
* handle missing compliance definition name in section groups creation ([513693d](https://github.com/ColdPBC/cold-monorepo/commit/513693d6927947d11336dea7363b6ad38a507271))
* handle missing compliance_definition_id in questions ([0529cea](https://github.com/ColdPBC/cold-monorepo/commit/0529cea136f48060700cba6f2487537bc3bdba02))
* **organization.service:** disable dynamic-org-white-list synchronization ([2decdef](https://github.com/ColdPBC/cold-monorepo/commit/2decdef2cce9bfe73bdf21727eff4e1d66d88d3d))
* **products.repository:** correct organization field used in queries ([40d7c6f](https://github.com/ColdPBC/cold-monorepo/commit/40d7c6f900fb575542e8e75adbe8aa199eceee83))
* resolve compliance definition ID from name if not provided ([5cf949d](https://github.com/ColdPBC/cold-monorepo/commit/5cf949d2f212b7b6ca83f6576916afcf998d3142))
* update compliance claims repository to use organization_id instead of organization_name ([666498f](https://github.com/ColdPBC/cold-monorepo/commit/666498fd4286d6ffe24e468badf67cf6ddea2c22))
* update compliance claims repository to use organization_id instead of organization_name ([8e7ed60](https://github.com/ColdPBC/cold-monorepo/commit/8e7ed60ec0a121db6b717c20102bb26827070287))
* update Prisma schema with optimized indices and model relationships ([1d2a898](https://github.com/ColdPBC/cold-monorepo/commit/1d2a898c558be474ac5c1e71853603900098d5dd))


### Features

* add multiple indexes to enhance query performance in various tables ([85be564](https://github.com/ColdPBC/cold-monorepo/commit/85be5647ff15f62162ba507eb10c64f3db98d46b))
* update database schema for GraphQL compliance ([c397b6f](https://github.com/ColdPBC/cold-monorepo/commit/c397b6fdcb1b93f9261aec858ac098584e01417b))
* update product and material models ([c84b4f0](https://github.com/ColdPBC/cold-monorepo/commit/c84b4f009f14bfc34ad310fdd6465c1d221131bd))
* update schema to support GraphQL implementation ([41c2272](https://github.com/ColdPBC/cold-monorepo/commit/41c2272fa4975368df5ddd53c40e72b3263437f9))

# [1.314.0-cold-919.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.4...v1.314.0-cold-919.1) (2024-07-31)

* Enhance popper behavior in DocumentDetailsSidebar ([2095f96](https://github.com/ColdPBC/cold-monorepo/commit/2095f96cc8d220709e50d4f28cc72a6ace342009))
* Refactor route structure and add feature toggle for documents ([4367af9](https://github.com/ColdPBC/cold-monorepo/commit/4367af9bcb8c2aae35a6596c279757032916233b))
* Refactor routes and document handling, update layouts ([19674fa](https://github.com/ColdPBC/cold-monorepo/commit/19674fa4e3d33cf5ba481dc229a2af2fb481e59c))
* Shrink close and ellipsis icons in sidebar. ([7207100](https://github.com/ColdPBC/cold-monorepo/commit/72071002e7e26c9de44053e1aae0f18601933f64))
* Update dashboard layout, organization files, and document page ([40d7895](https://github.com/ColdPBC/cold-monorepo/commit/40d7895e6f73ce5a41f922b94516621d6da3a101))
* Update documents routing and add MUI date picker ([ac6e03b](https://github.com/ColdPBC/cold-monorepo/commit/ac6e03b89f9f88516bad735e7bd85f79ac204a5e))

## [1.313.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.3...v1.313.4) (2024-07-30)



### Bug Fixes

* add estimated_score to compliance responses ([fd80249](https://github.com/ColdPBC/cold-monorepo/commit/fd8024985724037ee38adce6161ed6691efcdd05))

## [1.313.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.2...v1.313.3) (2024-07-30)


### Bug Fixes

* **scoring:** correct score calculation logic for AI and org responses ([2598a70](https://github.com/ColdPBC/cold-monorepo/commit/2598a703e0c62858de050b61aca9cea82487e1f6))

## [1.313.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.1...v1.313.2) (2024-07-30)


### Bug Fixes

* update file patch endpoint to include file ID ([2d8cdd3](https://github.com/ColdPBC/cold-monorepo/commit/2d8cdd37616e39609e2c0e27bbe9699ecfe51a9e))

## [1.313.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.313.0...v1.313.1) (2024-07-30)


### Bug Fixes

* make 'country' field optional in organization_facilities ([df86033](https://github.com/ColdPBC/cold-monorepo/commit/df86033bf3eb3ca3f03a344ee52745642c44a1f1))

# [1.313.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.312.0...v1.313.0) (2024-07-30)


### Features

* Add delete supplier functionality ([38c6aa4](https://github.com/ColdPBC/cold-monorepo/commit/38c6aa4c0515fae6bcad5a82a5013f99e0d13223))

# [1.312.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.311.1...v1.312.0) (2024-07-30)


### Features

* Add save functionality to supplier details page ([674e7f7](https://github.com/ColdPBC/cold-monorepo/commit/674e7f78c4f1ce13bfa179e6a4b57337d87f1d29))
* Refactor toaster component implementation and usage. ([591c553](https://github.com/ColdPBC/cold-monorepo/commit/591c55311550c44a9f9fb4179ea95d7f73723bb8))

## [1.311.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.311.0...v1.311.1) (2024-07-30)


### Bug Fixes

* **prisma.service:** enhance error logging with Datadog integration and remove redundant log handlers ([4e48aa1](https://github.com/ColdPBC/cold-monorepo/commit/4e48aa15439654b3a9ae35ce9c963544a7e3324b))

# [1.311.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.310.0...v1.311.0) (2024-07-26)


### Features

* add file update functionality in organization files module ([cc0f9f9](https://github.com/ColdPBC/cold-monorepo/commit/cc0f9f976d64b12c69ed7195d654c5d059360f58))

# [1.310.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.309.1...v1.310.0) (2024-07-26)


### Features

* Add error boundary to SupplierDetail component ([6c41258](https://github.com/ColdPBC/cold-monorepo/commit/6c412585aef37630f823b48dad11a7e53c13e44a))
* Add padding to supplier detail sidebar ([b39a6fa](https://github.com/ColdPBC/cold-monorepo/commit/b39a6fa8363de6705457ab529f5ac9f6ff7f9bc3))
* Add Storybook story for SupplierDetailSidebar component ([56a9bf6](https://github.com/ColdPBC/cold-monorepo/commit/56a9bf6b8fd40d611701c540c0b16b604f21854a))
* Add supplier detail page and data grid components ([75f3f77](https://github.com/ColdPBC/cold-monorepo/commit/75f3f77548a78c0dfd85374d2d85bf6ba6136300))
* Disable column menu in supplier documents table ([1c15f94](https://github.com/ColdPBC/cold-monorepo/commit/1c15f94f038ff41c27b2c53a199f1aace227b165))
* Fix enum reference for CertificationStatus and add Storybook ([4d9e70b](https://github.com/ColdPBC/cold-monorepo/commit/4d9e70bea5c2b9d3d29a560263ff8c262f0ceeba))
* Refactor Supplier Components and Implement New Logic ([4fd44ef](https://github.com/ColdPBC/cold-monorepo/commit/4fd44effc03a846cc87a390471b32281c83da3a2))
* Remove deprecated ClaimType enum ([5e9c02d](https://github.com/ColdPBC/cold-monorepo/commit/5e9c02de267209638a5959d32186402ad93f6f71))
* Remove unimplemented onRowClick handler ([ffaceb0](https://github.com/ColdPBC/cold-monorepo/commit/ffaceb03280b1672c3b4bcb01db789cdc02c21da))
* Rename and style supplierDetailSidebar component ([849cc3e](https://github.com/ColdPBC/cold-monorepo/commit/849cc3e28e48da0aff3e1b0c45ec904a8ca70025))

## [1.309.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.309.0...v1.309.1) (2024-07-26)


### Bug Fixes

* **seeds:** conditionally upsert compliance definitions based on environment ([842fbc8](https://github.com/ColdPBC/cold-monorepo/commit/842fbc8fe1e15d4a5ba17a63f5a9f82649bfe956))

# [1.309.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.308.1...v1.309.0) (2024-07-26)


### Features

* add facility delete and patch endpoints to openapi.json and update sample survey schema examples ([5786261](https://github.com/ColdPBC/cold-monorepo/commit/5786261f86891dc1acf9355d83f2842b1a3099ed))
* add update and delete methods to facilities service ([4086956](https://github.com/ColdPBC/cold-monorepo/commit/4086956103b9e1e02b0c26cbd1da5a8e14fc9051))
* enhance FacilitiesController with delete and update actions ([a24abb1](https://github.com/ColdPBC/cold-monorepo/commit/a24abb174e8c6b9b948b327d0573812a775b5c8d))

## [1.308.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.308.0...v1.308.1) (2024-07-25)


### Bug Fixes

* **compliance:** comment out schema validation in create and update methods ([9d03874](https://github.com/ColdPBC/cold-monorepo/commit/9d038747161f297051fe17e32c713c9e3b095fc0))
* enhance validation and error handling in createCertificationClaim method ([4f12d82](https://github.com/ColdPBC/cold-monorepo/commit/4f12d8268e82966d268d65b299abaae55cef6a99))

# [1.308.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.307.1...v1.308.0) (2024-07-25)


### Features

* Navigate to home on organization selection ([c05e4b0](https://github.com/ColdPBC/cold-monorepo/commit/c05e4b0dffd19f22d8574e43b2bca057f1f2bf62))
* Sort organizations alphabetically in selector ([6bf52d1](https://github.com/ColdPBC/cold-monorepo/commit/6bf52d1a1505ad5b25f00d3344135b72d49635c7))

## [1.307.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.307.0...v1.307.1) (2024-07-24)


### Bug Fixes

* **suppliers.repository.ts:** correct property name from organization_file_type to type ([04e2560](https://github.com/ColdPBC/cold-monorepo/commit/04e25603125c0e2309b77a061afe59ff6ad3eec0))

# [1.307.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.306.0...v1.307.0) (2024-07-24)


### Features

* add organization_file_type to suppliers repository ([5d57e76](https://github.com/ColdPBC/cold-monorepo/commit/5d57e765815fb072b64675f89046d9bafba0c598))

# [1.306.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.305.1...v1.306.0) (2024-07-24)


### Features

* Add autoHeight property to suppliersDataGrid ([7c14838](https://github.com/ColdPBC/cold-monorepo/commit/7c14838dbdcb03b9837fb785cd07713079e1226d))
* Add custom no-rows overlay to MUI DataGrid ([f7c961b](https://github.com/ColdPBC/cold-monorepo/commit/f7c961b46ded8d35f1bf05f0730245870eb79475))
* Add Suppliers interface and update SuppliersDataGrid ([59f388f](https://github.com/ColdPBC/cold-monorepo/commit/59f388f9ad083cbfa4c40c7513a04f9609e25bae))
* Refactor supplier components and update certification handling ([a30bcd2](https://github.com/ColdPBC/cold-monorepo/commit/a30bcd2c6fa6f62e0256117978feef6d1442141a))
* Refactor suppliersDataGrid to use mock data ([535f8b5](https://github.com/ColdPBC/cold-monorepo/commit/535f8b5a04d3a48fdbd3e45484f3c5a0cb87c115))
* Update UI with new icons and MUI integration ([6fa8ea7](https://github.com/ColdPBC/cold-monorepo/commit/6fa8ea7be9d03a791bc0f72bbeeb82ea8b1848e3))

## [1.305.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.305.0...v1.305.1) (2024-07-24)


### Bug Fixes

* improve error handling and add new field to supplier query ([010aec2](https://github.com/ColdPBC/cold-monorepo/commit/010aec2f263491bb1383d6fb3dec835d07b3f685))

# [1.305.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.304.0...v1.305.0) (2024-07-24)


### Features

* add effective date fields to supplier repository ([4969236](https://github.com/ColdPBC/cold-monorepo/commit/49692369ec04811b5d9cd419c53fea16f55e6594))
* extend organization files service to include effective dates ([807b242](https://github.com/ColdPBC/cold-monorepo/commit/807b242e3876ad77170a70f98d017b1aceb3503e))

# [1.304.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.303.0...v1.304.0) (2024-07-24)


### Features

* Add effective start and end dates to organization_files ([93642b1](https://github.com/ColdPBC/cold-monorepo/commit/93642b129cf04d98c4a2b94a171bf51d9fda99d9))
* Add extended file details to organization files API ([46af359](https://github.com/ColdPBC/cold-monorepo/commit/46af359a28bdc93347bce7e496bfda4db011b6a0))

# [1.303.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.302.0...v1.303.0) (2024-07-24)


### Features

* Add certification id to claims controller ([71987e9](https://github.com/ColdPBC/cold-monorepo/commit/71987e902571cdfe53f8ee4a4f1afa68bfa147db))
* Add file validation and handling conflict exceptions in ComplianceCertificationsClaimsRepository ([48a5ad8](https://github.com/ColdPBC/cold-monorepo/commit/48a5ad83b1366f9acd85e340e3cf2a5e7431bcfc))
* Add file validation and handling conflict exceptions in ComplianceCertificationsClaimsRepository ([0ce4db3](https://github.com/ColdPBC/cold-monorepo/commit/0ce4db3267832d38e6fad2e1e09a7a75918da895))
* Add getClaimNames and getClaimList methods in suppliers.controller ([37e307d](https://github.com/ColdPBC/cold-monorepo/commit/37e307dadd320e98cd4e4a5784c9713f78b1db20))
* Add SQL views and modify prisma schema ([8196715](https://github.com/ColdPBC/cold-monorepo/commit/8196715a5be0504688f5e2a49ce091b3946cda99))
* Enhance suppliers.repository and suppliers.service ([f5ab365](https://github.com/ColdPBC/cold-monorepo/commit/f5ab3652c0bc0734340d143e4c22bc62b34f1331))

# [1.302.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.301.1...v1.302.0) (2024-07-22)


### Bug Fixes

* commonJS error in running seed scripts ([7dcb677](https://github.com/ColdPBC/cold-monorepo/commit/7dcb67748b7214a588e83357ce01e7c1340ec27c))


### Features

* Update `esbuild` packages to v0.20.2 ([a702ad0](https://github.com/ColdPBC/cold-monorepo/commit/a702ad0a9ad2f555804d22e312015481e3de5fb7))

## [1.301.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.301.0...v1.301.1) (2024-07-22)


### Bug Fixes

* issues with OpenAPI spec ([a14a215](https://github.com/ColdPBC/cold-monorepo/commit/a14a215a535ce533c9826a09ccbaa48e80fc6ea8))

# [1.301.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.300.0...v1.301.0) (2024-07-22)


### Bug Fixes

* incorrect entry in controller array ([5b92440](https://github.com/ColdPBC/cold-monorepo/commit/5b92440bb8db6c36c2d58439d158cafaf175db4f))


### Features

* Update providers and exports in ClaimsModule ([f1a3cfc](https://github.com/ColdPBC/cold-monorepo/commit/f1a3cfc9999c8395e4bca69c80e622781522b48f))

# [1.300.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.299.0...v1.300.0) (2024-07-22)


### Bug Fixes

* add null check for additional_context in chat service ([35dd286](https://github.com/ColdPBC/cold-monorepo/commit/35dd286f847c6fec16ddfd9cec7ca8a9d00b4ece))
* add role restrictions to update and remove certifications ([81c2ccd](https://github.com/ColdPBC/cold-monorepo/commit/81c2ccd83035824d397771ac8463babb8cb3bb5a))
* Update certifications.repository.ts to improve error handling ([433e822](https://github.com/ColdPBC/cold-monorepo/commit/433e822fcb0ea41d0f7df2549adb2101ee7b652c))


### Features

* add '[@ogma](https://github.com/ogma)' packages and update related config files ([1172994](https://github.com/ColdPBC/cold-monorepo/commit/1172994e3f83982330721fb88d83f9c53fab0f7f))
* Add 'Claims' to compliance enums ([122eace](https://github.com/ColdPBC/cold-monorepo/commit/122eace3b41b703d94f1db3fccfde771e86a20a6))
* Add Certification entity ([52cc105](https://github.com/ColdPBC/cold-monorepo/commit/52cc1051e7f773b9a29a31d22372da233f87bfe5))
* Add Certifications controller ([9c6cce3](https://github.com/ColdPBC/cold-monorepo/commit/9c6cce35e9e8bfb5fa3ef295a970a9e6ee3d8ffa))
* Add Certifications module ([9dd715c](https://github.com/ColdPBC/cold-monorepo/commit/9dd715c4de9f3823dded021aae9f74a6ea696e6b))
* Add Certifications Repository in Nest Library ([640fa29](https://github.com/ColdPBC/cold-monorepo/commit/640fa29894db8a8f6484ea766e3014b585b38096))
* Add CertificationsModule to AppModule ([37c7078](https://github.com/ColdPBC/cold-monorepo/commit/37c7078ad16ed578d5ab7def12ec6b296c21c812))
* add CertificationsService to handle certifications ([7d6ca57](https://github.com/ColdPBC/cold-monorepo/commit/7d6ca57ab1acde15a80b5ac39f6a79d3c24de017))
* Add claims service in certifications module ([459c1a1](https://github.com/ColdPBC/cold-monorepo/commit/459c1a13bbd32e7b9c1708f199480f587b4e7348))
* Add ClaimsModule in certifications ([d5c387a](https://github.com/ColdPBC/cold-monorepo/commit/d5c387a540c07ce67ec3956db2dec6a900e96b0f))
* Add ClaimsModule to CertificationsModule ([fecb181](https://github.com/ColdPBC/cold-monorepo/commit/fecb18117d4674b045fe8641a75eb3a8d78a083b))
* Add Compliance Certification Repository for Nest App ([9fd1745](https://github.com/ColdPBC/cold-monorepo/commit/9fd17455aadfb605b5a6d0af4218be2952b58dd7))
* Add ComplianceCertificationClaimsRepository ([2340f8a](https://github.com/ColdPBC/cold-monorepo/commit/2340f8a69fb0950bdd0ab08d91e6203e698154f0))
* Add dev mode to worker log service ([521a1c7](https://github.com/ColdPBC/cold-monorepo/commit/521a1c7e7384a220df537797fbb088670336f819))
* Add logging exports to nest lib index ([14edbcd](https://github.com/ColdPBC/cold-monorepo/commit/14edbcd1d7f41d8f892a351806cbd2537704090b))
* Add new claims controller in certifications module ([74de42b](https://github.com/ColdPBC/cold-monorepo/commit/74de42bca8d888d9465deb273a323d93f0006c16))
* Add SuppliersModule in resources ([60e56f2](https://github.com/ColdPBC/cold-monorepo/commit/60e56f2465cb939f8f58d4044b545df7fecb4b07))
* Add SuppliersModule to Organization module ([cb5a5e4](https://github.com/ColdPBC/cold-monorepo/commit/cb5a5e4d60dbfbe6dd4684e3a19aa7328c318d16))
* Add SuppliersRepository in nest lib ([ae8aba0](https://github.com/ColdPBC/cold-monorepo/commit/ae8aba0ab4500594a3827c0221dc45ed9bc239da))
* Added DTOs for creating and updating Certifications ([3e0c98a](https://github.com/ColdPBC/cold-monorepo/commit/3e0c98a44721a8939dcb3387adf484f36e761bb6))
* Added guards, interceptors, and decorators in certifications controller ([f6dc566](https://github.com/ColdPBC/cold-monorepo/commit/f6dc566ba54b61fbf6502ab7e939d677fcfed4d2))
* Added new SuppliersController for organization suppliers ([2724ea9](https://github.com/ColdPBC/cold-monorepo/commit/2724ea95fe98ad8e73f1736009af05b5bc592e61))
* Create new Suppliers Service in organizations module ([4b3ba06](https://github.com/ColdPBC/cold-monorepo/commit/4b3ba06f4eb6d2da22ddafbd61ef1a2e68eb938f))
* Enhance claims controller with guards, interceptors, filters, and role permissions ([a08b055](https://github.com/ColdPBC/cold-monorepo/commit/a08b055e7d5e680f08fccbf7967515dfd5f0bbd2))
* Modify certifications schema and add unique migration ([a5b454a](https://github.com/ColdPBC/cold-monorepo/commit/a5b454a37827a0bd317cb49cab1252afb78e44c5))
* Refactor CertificationsService to use CertificationRepository ([edee10a](https://github.com/ColdPBC/cold-monorepo/commit/edee10a57682b5c7b0d5d2e3ca1825146e96e0b3))
* Remove certification-related entities and DTOs ([3b0d864](https://github.com/ColdPBC/cold-monorepo/commit/3b0d8644b6c2eac4ab91a880049a134d2c34880b))
* Remove unnecessary fields from schema and migration ([4756c94](https://github.com/ColdPBC/cold-monorepo/commit/4756c940a054e53a902fa5826962c842753947d7))
* Update certifications module in cold-api ([69e1181](https://github.com/ColdPBC/cold-monorepo/commit/69e11819c63cdd94fdfd2707a3c9928815be0176))
* update claims service operations ([1ed9f95](https://github.com/ColdPBC/cold-monorepo/commit/1ed9f95c3c62f5a79769a7aa6a45fb6e1e7807d8))
* Update prisma schema and migrations for claim dates and data types ([daf88bf](https://github.com/ColdPBC/cold-monorepo/commit/daf88bf985e586a5b47885c1fdc30fb51bd596de))
* Update roles in certifications.controller ([d04e6ee](https://github.com/ColdPBC/cold-monorepo/commit/d04e6ee3878bf9f9d5e29e59c8ea58d0d02fdcb3))

# [1.299.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.298.2...v1.299.0) (2024-07-18)



### Features

* Update code for handling compliance section updates ([49fbccf](https://github.com/ColdPBC/cold-monorepo/commit/49fbccfb87cb273df6d209a1b7cad0707a796564))

## [1.298.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.298.1...v1.298.2) (2024-07-18)



### Bug Fixes

* add checking for organization compliance in compliance-definitions repository ([5c19b12](https://github.com/ColdPBC/cold-monorepo/commit/5c19b12969500a04e8617b03839bf92760bbe304))
* add checking for organization compliance in compliance-definitions repository ([#503](https://github.com/ColdPBC/cold-monorepo/issues/503)) ([37bf7eb](https://github.com/ColdPBC/cold-monorepo/commit/37bf7eb264a94b8661d72b19fbe7ca9ca65923bd))

## [1.298.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.298.0...v1.298.1) (2024-07-18)


### Bug Fixes

* create question / dependency chain flow ([e90c89b](https://github.com/ColdPBC/cold-monorepo/commit/e90c89bcc7d06bb882ea38674a60d7100b927fef))

# [1.298.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.297.0...v1.298.0) (2024-07-18)


### Features

* Replace home route with compliance route ([1e984f5](https://github.com/ColdPBC/cold-monorepo/commit/1e984f54f5537e363c0c07313ee0178af63b6f3d))

# [1.297.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.296.0...v1.297.0) (2024-07-18)


### Features

* Sort compliance sets by title ([f7fcc5c](https://github.com/ColdPBC/cold-monorepo/commit/f7fcc5c1d53c7ac7f252e4376a9ac0b856a3926f))

# [1.296.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.295.0...v1.296.0) (2024-07-17)


### Features

* Add CreateProductDto class ([1f5f96c](https://github.com/ColdPBC/cold-monorepo/commit/1f5f96c011ecf5b12882d633f62e0b65e51f54e8))
* Add new Product entity file ([8b1622f](https://github.com/ColdPBC/cold-monorepo/commit/8b1622fdc1027661832e3a2b23630945fe273e24))
* add ProductsController in the organizations module ([04be8ca](https://github.com/ColdPBC/cold-monorepo/commit/04be8ca7b480b8e361f7c5a5debcf638711e5750))
* Add ProductsRepository in organizations ([ae326c6](https://github.com/ColdPBC/cold-monorepo/commit/ae326c65511e92163988dfd8d870438e936c30af))
* add ProductsService to platform modules ([3f92816](https://github.com/ColdPBC/cold-monorepo/commit/3f9281677290e267f93dff51fa36e579178490da))
* Add UpdateProductDto in products module ([d295e32](https://github.com/ColdPBC/cold-monorepo/commit/d295e32c2c493037c99e9d131a1cf1fa52a75102))
* Added new compliance types to utility enums ([83d8f77](https://github.com/ColdPBC/cold-monorepo/commit/83d8f77d511a7ec065ca96c6139c2c97f1838b1c))
* Added new Products module ([2ac4207](https://github.com/ColdPBC/cold-monorepo/commit/2ac42075d4dc1696150fdb7cbe9795ebd2b1278a))
* Extend PrismaClient and enhance PrismaService ([43b3eea](https://github.com/ColdPBC/cold-monorepo/commit/43b3eea1fa552be07a56bb6e51c19ee06b6d10ff))
* Migrate organization suppliers to view ([e4a8c06](https://github.com/ColdPBC/cold-monorepo/commit/e4a8c06614ba9a976a82324f7429f38c63d674f7))
* Moved ProductsRepository under compliance module ([40e813a](https://github.com/ColdPBC/cold-monorepo/commit/40e813a3e8718cac1334b5062c77b8f24ccae75b))
* Update Prisma migration to remove organization suppliers and related columns ([301f9b5](https://github.com/ColdPBC/cold-monorepo/commit/301f9b5384b4935616eb732f0e4de6d5efc5b761))

# [1.296.0-cold-902.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.295.0...v1.296.0-cold-902.1) (2024-07-17)


### Features

* Add CreateProductDto class ([1f5f96c](https://github.com/ColdPBC/cold-monorepo/commit/1f5f96c011ecf5b12882d633f62e0b65e51f54e8))
* Add new Product entity file ([8b1622f](https://github.com/ColdPBC/cold-monorepo/commit/8b1622fdc1027661832e3a2b23630945fe273e24))
* add ProductsController in the organizations module ([04be8ca](https://github.com/ColdPBC/cold-monorepo/commit/04be8ca7b480b8e361f7c5a5debcf638711e5750))
* Add ProductsRepository in organizations ([ae326c6](https://github.com/ColdPBC/cold-monorepo/commit/ae326c65511e92163988dfd8d870438e936c30af))
* add ProductsService to platform modules ([3f92816](https://github.com/ColdPBC/cold-monorepo/commit/3f9281677290e267f93dff51fa36e579178490da))
* Add UpdateProductDto in products module ([d295e32](https://github.com/ColdPBC/cold-monorepo/commit/d295e32c2c493037c99e9d131a1cf1fa52a75102))
* Added new compliance types to utility enums ([83d8f77](https://github.com/ColdPBC/cold-monorepo/commit/83d8f77d511a7ec065ca96c6139c2c97f1838b1c))
* Added new Products module ([2ac4207](https://github.com/ColdPBC/cold-monorepo/commit/2ac42075d4dc1696150fdb7cbe9795ebd2b1278a))
* Migrate organization suppliers to view ([e4a8c06](https://github.com/ColdPBC/cold-monorepo/commit/e4a8c06614ba9a976a82324f7429f38c63d674f7))
* Update Prisma migration to remove organization suppliers and related columns ([301f9b5](https://github.com/ColdPBC/cold-monorepo/commit/301f9b5384b4935616eb732f0e4de6d5efc5b761))

# [1.295.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.294.1...v1.295.0) (2024-07-17)


### Features

* Update organization compliance response Rabbit processing ([19bf2d6](https://github.com/ColdPBC/cold-monorepo/commit/19bf2d64d19cfb176c5b0a8f47af6ac554b19a54))

## [1.294.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.294.0...v1.294.1) (2024-07-16)


### Bug Fixes

* Deprecate compliance-definitions.findOrgCompliances() method and comment out cache set functionality ([2b30bd4](https://github.com/ColdPBC/cold-monorepo/commit/2b30bd4b2abdb418a79aacb8ac8fa8af94b3722c))

# [1.294.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.293.0...v1.294.0) (2024-07-16)


### Features

* add bpc query parameter to getComplianceResponsesCounts ([e37ebb6](https://github.com/ColdPBC/cold-monorepo/commit/e37ebb67cc96458713b20fe2434703d7a817a184))
* Add new SQL view for compliance response ([5b3f8f3](https://github.com/ColdPBC/cold-monorepo/commit/5b3f8f3b4be041856af4641f01aef6181793ea43))
* Add supplier boolean to organization_facilities table ([0190a3c](https://github.com/ColdPBC/cold-monorepo/commit/0190a3caa657361385bea090c0df8ae1dda56c98))
* Adjust getContext sensitivity in chat controller ([1ff2cbe](https://github.com/ColdPBC/cold-monorepo/commit/1ff2cbe54fb0cdefa76792d00a5636b965c2a101))
* Drop compliance_responses table in Prisma ([176a3c5](https://github.com/ColdPBC/cold-monorepo/commit/176a3c531daf42ab81165f8b8d587489baedf858))
* Improve chat service error handling and question retrievals ([178eaed](https://github.com/ColdPBC/cold-monorepo/commit/178eaed939ce639924e75d0a69574eda71c2644c))

# [1.293.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.292.0...v1.293.0) (2024-07-16)



### Features

* Add initial supplier product certification models ([9fc9093](https://github.com/ColdPBC/cold-monorepo/commit/9fc9093bfe352114f373d56ada1b912f62dc3442))

# [1.292.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.291.0...v1.292.0) (2024-07-15)



### Features

* Add 'Suppliers' component to seed definitions ([b8509f1](https://github.com/ColdPBC/cold-monorepo/commit/b8509f159ce7f82cdee25160dd82f28504e526b9))
* Add Suppliers page and associated icon ([c79d01f](https://github.com/ColdPBC/cold-monorepo/commit/c79d01f1db9a178b94d2c30eb8480072c42d9462))



# [1.291.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.290.0...v1.291.0) (2024-07-12)


### Bug Fixes

* Add unique key to SideBarCollapse items ([8a05a83](https://github.com/ColdPBC/cold-monorepo/commit/8a05a83592bcbf995e34b0e69b3a95ac2e3c4065))


### Features

* Add class-validator to complianceManager ([fd3daa6](https://github.com/ColdPBC/cold-monorepo/commit/fd3daa664cda64e72e405c2fcda2dee3b848cc6d))
* Add key prop to tab in QuestionnaireDetailSidebar ([0e92ef0](https://github.com/ColdPBC/cold-monorepo/commit/0e92ef05e3419c5fdb413bb333eeda4a9a01c332))
* Add summary field to compliance questions ([43d3461](https://github.com/ColdPBC/cold-monorepo/commit/43d3461140c10db59c19586b69df80339a2722a7))
* Change scrolling behavior to 'instant' in questionnaire ([cd3b52f](https://github.com/ColdPBC/cold-monorepo/commit/cd3b52f4378259a71fbbf96744e7c1dd18fc8bff))
* Update logging placement and conditions in questionnaire components ([2d1344b](https://github.com/ColdPBC/cold-monorepo/commit/2d1344bd3aaebc3d386514deda5796a1c3391050))

# [1.290.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.289.0...v1.290.0) (2024-07-11)


### Features

* Update cache settings in organization_compliance_responses controller ([1af1ff0](https://github.com/ColdPBC/cold-monorepo/commit/1af1ff0dadf221f56ccdd656f6b38c93e08aefde))

# [1.289.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.288.0...v1.289.0) (2024-07-11)


### Features

* Add error handling for Axios requests in components ([723d992](https://github.com/ColdPBC/cold-monorepo/commit/723d992312328c7af92dc10dbbda57516b690752))
* Exclude compliance sections and section groups with max_score of 0 ([a59b74f](https://github.com/ColdPBC/cold-monorepo/commit/a59b74fae1094b126a38d69411887d922f32fdbc))
* Increase minimum and maximum width of ratio div ([80f5497](https://github.com/ColdPBC/cold-monorepo/commit/80f5497f9a234b4720aebf59f279201c7a933e76))
* Refactor compliance manager components and improve error handling ([5ecb022](https://github.com/ColdPBC/cold-monorepo/commit/5ecb022b05f35638cdfa82daeecf49bbf996aa53))
* Update alignment in complianceManagerPreviewDetailGraphCard ([0bc525a](https://github.com/ColdPBC/cold-monorepo/commit/0bc525af674fcd08b181bc5a5439af0d2622415d))
* Update calculation and tooltip display in SpiderChart ([1ee89c8](https://github.com/ColdPBC/cold-monorepo/commit/1ee89c8c3a5e0992ec5a7f442ac4af8cb4ea902d))
* Update lodash utilization and numeric formatting ([7aa378a](https://github.com/ColdPBC/cold-monorepo/commit/7aa378a00af6ec6f7c262c8bf69e3aade812bb46))
* Update score formatting in SpiderChart component ([7916641](https://github.com/ColdPBC/cold-monorepo/commit/79166410ceb8d820493e405381b3090c9d8d6a9c))
* Update spider chart component in compliance manager ([2f7ea79](https://github.com/ColdPBC/cold-monorepo/commit/2f7ea793b43a39c65efe3b1c09d882830b299df6))
* Update text class in questionnaire components ([3a784ca](https://github.com/ColdPBC/cold-monorepo/commit/3a784ca8a5207063593746684b9f759d2d83281a))

# [1.288.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.287.0...v1.288.0) (2024-07-11)


### Features

* Implement cascade deletion and enforce non-empty check ([b7bf58d](https://github.com/ColdPBC/cold-monorepo/commit/b7bf58d98b8f2b2dae0c05dead294bb3d4e3607c))

# [1.287.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.286.0...v1.287.0) (2024-07-11)


### Bug Fixes

* not storing answer if false ([0f935f5](https://github.com/ColdPBC/cold-monorepo/commit/0f935f5e15a1b3e4ccfdb718729bf32a4fd17d4a))


### Features

* Add NotFoundException for non-existing compliance questions ([a1eafe5](https://github.com/ColdPBC/cold-monorepo/commit/a1eafe5b5681d0102dd231d7432e7bd9a00141dc))

# [1.286.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.285.0...v1.286.0) (2024-07-10)


### Features

* Implement smooth scrolling for questionnaire questions ([58a2b60](https://github.com/ColdPBC/cold-monorepo/commit/58a2b6040b90f13f5818eb7bb9867fb8322d3f0f))
* Remove unused intersection observer in questionnaire container ([a93741d](https://github.com/ColdPBC/cold-monorepo/commit/a93741db589cef745718da268fd512923df080b8))

# [1.285.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.284.0...v1.285.0) (2024-07-10)


### Features

* Add overflow auto property to div elements ([422002b](https://github.com/ColdPBC/cold-monorepo/commit/422002b27074b06c2e801be38c7cba046b1b7095))
* Update CSS classes in questionnaire components ([80b7306](https://github.com/ColdPBC/cold-monorepo/commit/80b73065b0f8cebcbf08290c8675a5d482354b91))
* Update padding in QuestionnaireContainer ([b3901f5](https://github.com/ColdPBC/cold-monorepo/commit/b3901f588e2f40cb4fe5ab5a818485d90e50edd8))

# [1.284.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.283.0...v1.284.0) (2024-07-10)


### Features

* Add 'bpc' query parameter to organization_compliance_responses controller ([bb3bd8c](https://github.com/ColdPBC/cold-monorepo/commit/bb3bd8c1088447e8a6128b77e0f7a9b836aa39a9))

# [1.283.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.282.3...v1.283.0) (2024-07-10)


### Features

* Add scoring and target functionality to Compliance Manager ([c4b1f4f](https://github.com/ColdPBC/cold-monorepo/commit/c4b1f4f06b6beb4846459f99c725cac1e54ce4d2))
* Enforce integer display for scores in compliance manager components ([b3682c9](https://github.com/ColdPBC/cold-monorepo/commit/b3682c9817fc904bfc5255c66dc1d59df700f4b8))
* Return null for empty SpiderChart ([62e0801](https://github.com/ColdPBC/cold-monorepo/commit/62e0801ecd0f59ddd8f842828dee122feb3e2d30))
* Update conditions to display JourneyOverviewCard ([a76c73b](https://github.com/ColdPBC/cold-monorepo/commit/a76c73b502df54629ac184be726c5c7778e841c2))
* Update sidebar and compliance manager components ([2fa8625](https://github.com/ColdPBC/cold-monorepo/commit/2fa8625f108ec9e0893ad9f96ff3c49602c62f6b))

## [1.282.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.282.2...v1.282.3) (2024-07-09)


### Bug Fixes

* add auto-creation of organization compliance in repository ([a40aa87](https://github.com/ColdPBC/cold-monorepo/commit/a40aa872f401df47353affb14c114ae87c8c2033))

## [1.282.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.282.1...v1.282.2) (2024-07-06)


### Bug Fixes

* update scoring service answer logic ([bbacb4b](https://github.com/ColdPBC/cold-monorepo/commit/bbacb4b8caf542de052031bde2b7ba8b01ef8b21))

## [1.282.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.282.0...v1.282.1) (2024-07-06)


### Bug Fixes

* bug causing dependency chain seeds to fail ([95ef041](https://github.com/ColdPBC/cold-monorepo/commit/95ef04143a54342eb1f9bad94187f3e80494a343))
* modified user_answered property in scoring.service.ts ([80f8819](https://github.com/ColdPBC/cold-monorepo/commit/80f88198f5fb56d51104959dad8695410eefb4d4))
* Update prisma seed files for compliance section and question ([c6c3856](https://github.com/ColdPBC/cold-monorepo/commit/c6c3856f3aa4f2fac87e860f58ab9630b255e5f5))

# [1.282.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.281.0...v1.282.0) (2024-07-05)


### Features

* Add bpc option to ComplianceResponseOptions ([78653bb](https://github.com/ColdPBC/cold-monorepo/commit/78653bb1558faf41b29eacfa36be9e5c6006047a))
* Added 'bpc' query param to findAllComplianceResponses in organization_compliance_responses.controller ([213456f](https://github.com/ColdPBC/cold-monorepo/commit/213456fa09a0e84d93149814779bc8e27fab42c4))
* Increase default data retrieval limit in Compliance Response service ([8ab0e72](https://github.com/ColdPBC/cold-monorepo/commit/8ab0e7277f2f64e3d94f388e7b345cb59f3f3db7))
* toggle compliance definition visibility ([8d6380b](https://github.com/ColdPBC/cold-monorepo/commit/8d6380b33b62624e2626ff4522067f98187c1622))
* update 'not_started' count calculation in scoring.service ([020dd8c](https://github.com/ColdPBC/cold-monorepo/commit/020dd8c1eaed22052588ddccfe13d3caecfda49b))
* Update relations in prisma schema to cascade on delete ([3989fcf](https://github.com/ColdPBC/cold-monorepo/commit/3989fcfd50b6a47c3aa13be065d051cf1fa297f4))

# [1.281.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.280.0...v1.281.0) (2024-07-05)


### Features

* Add mock data for Compliance Questionnaire ([272e808](https://github.com/ColdPBC/cold-monorepo/commit/272e80888434408d656f7a67c59848f1c865f83f))
* Remove spinner from compliance components ([100ac8c](https://github.com/ColdPBC/cold-monorepo/commit/100ac8ca263689aa37676a740d1c1c893e3f013a))

# [1.280.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.279.0...v1.280.0) (2024-07-05)


### Features

* Remove 'Documents' tab from Compliance Manager ([0470413](https://github.com/ColdPBC/cold-monorepo/commit/04704133db008b1c64057e2ab84d2745983d3ba3))
* Remove 'Preview' tab from Compliance Manager ([6775cba](https://github.com/ColdPBC/cold-monorepo/commit/6775cbac453b28686dfabd81ccb3ef041914a40b))
* Remove GuidanceButton component ([10ff81a](https://github.com/ColdPBC/cold-monorepo/commit/10ff81abc3c7419e36a49cbde13cb933acf3ca7c))

# [1.279.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.278.0...v1.279.0) (2024-07-04)


### Features

* Add support for survey override in compliance model seeding ([33133da](https://github.com/ColdPBC/cold-monorepo/commit/33133da4460cbda75fe69bc99623dbb669b67795))

# [1.278.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.277.0...v1.278.0) (2024-07-03)


### Features

* Updated options attribute in compliance-responses.repository ([efafee6](https://github.com/ColdPBC/cold-monorepo/commit/efafee6c62a233b65ee5b1bd7c1b4a0ad6d89ca5))

# [1.277.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.276.0...v1.277.0) (2024-07-03)


### Features

* Update Prisma schema to cascade delete on organization compliance relations ([4fd4176](https://github.com/ColdPBC/cold-monorepo/commit/4fd417648138bf50deb6e9eb90fcd41893634098))

# [1.276.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.275.0...v1.276.0) (2024-07-03)


### Features

* add bpc parameter to getAllByOrg method in compliance-definitions service ([41b43e2](https://github.com/ColdPBC/cold-monorepo/commit/41b43e2769d512229a69d40a504727b81d27c3ea))
* add bpc query parameter to allow for forcing cache to refresh ([c34f2b2](https://github.com/ColdPBC/cold-monorepo/commit/c34f2b20a830200bdd6fcb69c3212487517016e7))
* add caching and timing to compliance response repository ([3f19a09](https://github.com/ColdPBC/cold-monorepo/commit/3f19a09dfb50d61d3a8da31c59a9bde0c3f6b942))
* Update getComplianceDefinitionsByOrgId function in compliance-definitions repository ([eaa6fe3](https://github.com/ColdPBC/cold-monorepo/commit/eaa6fe3cbd0dab42f003cdcbe201953a0b918e6e))

# [1.275.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.274.0...v1.275.0) (2024-07-03)


### Bug Fixes

* update error logging condition in compliance-responses repository ([40fe499](https://github.com/ColdPBC/cold-monorepo/commit/40fe4994a570fa2139a18842cb2cb0baaf011a1a))


### Features

* Add dynamic compliance count cache disabling ([30ae6a7](https://github.com/ColdPBC/cold-monorepo/commit/30ae6a7a65d53005e1145828cf708dea8e1267ab))

# [1.274.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.273.0...v1.274.0) (2024-07-02)


### Features

* Add visible column to organization_compliance table ([39c24b4](https://github.com/ColdPBC/cold-monorepo/commit/39c24b459e266dd254a7365456e220f266453819))

# [1.273.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.272.0...v1.273.0) (2024-07-02)


### Features

* Add error logging to seedComplianceModels function in Prisma ([43c89e7](https://github.com/ColdPBC/cold-monorepo/commit/43c89e78db8c6394f69f726fef7b7d69854c22ad))
* add getAll() function to compliance-definitions controller ([818f111](https://github.com/ColdPBC/cold-monorepo/commit/818f111c28a7d2ca40f99ab0107c4939d5fd6085))
* Add new function to getComplianceDefinitions and update visibility ([f331aed](https://github.com/ColdPBC/cold-monorepo/commit/f331aedf12d224cef128310766e1a9311545a8e1))
* Add new getAll compliance method and rename old method ([967be5c](https://github.com/ColdPBC/cold-monorepo/commit/967be5cc119906516057893ffa348c2b4bb2844e))
* Add visibility filter to organization-compliance repository ([f9930de](https://github.com/ColdPBC/cold-monorepo/commit/f9930de75612ae65b9917e7b5175c8f3a9a79865))
* Add visibility to compliance responses ([943a358](https://github.com/ColdPBC/cold-monorepo/commit/943a358e1f9135878e5f2eefdd140f06d0f7e9eb))
* Add visible field to schema in Prisma ([1caf715](https://github.com/ColdPBC/cold-monorepo/commit/1caf715f6a11efcf81d45b9031919b1f43945bec))

# [1.272.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.271.0...v1.272.0) (2024-07-02)


### Features

* Add scoring function to compliance questionnaire ([a71a702](https://github.com/ColdPBC/cold-monorepo/commit/a71a702d51577e0cc79eedfd606d0cf02caee0b5))
* Add scoring functionality to questionnaire components ([09b1276](https://github.com/ColdPBC/cold-monorepo/commit/09b1276ccfafd93f04093f2265d8c60b572f339e))

# [1.271.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.270.2...v1.271.0) (2024-07-01)


### Features

* Add getComplianceMockByName handler ([4d481d9](https://github.com/ColdPBC/cold-monorepo/commit/4d481d9a8dd99d1b8cb42bf253cad679cb9e3b7f))
* Refactor compliance data fetching and image URL setting ([27ac869](https://github.com/ColdPBC/cold-monorepo/commit/27ac8695d1116eef0144bffdaa6044340124aca4))
* Update compliance mocking and calls with a new structure ([2485c8a](https://github.com/ColdPBC/cold-monorepo/commit/2485c8aef676f1813629f371d7c4baf830ed6200))
* Update feature flag in compliance component ([025e4dd](https://github.com/ColdPBC/cold-monorepo/commit/025e4dd41cf694372ceb500a2300a167a009433c))

## [1.270.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.270.1...v1.270.2) (2024-07-01)


### Bug Fixes

* issue preventing compliance page from rendering ([aa5f6f2](https://github.com/ColdPBC/cold-monorepo/commit/aa5f6f2186b0d81e157e0c72a4a5f535fe7b4c5c))

## [1.270.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.270.0...v1.270.1) (2024-06-28)


### Bug Fixes

* update compliance definition list repository to trigger the cached counts if none exist. ([62c3859](https://github.com/ColdPBC/cold-monorepo/commit/62c3859cb761ff344ea073596b93220130a2b954))

# [1.270.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.269.0...v1.270.0) (2024-06-28)


### Features

* add ColdCacheInterceptor to cache module and implement trackBy method ([bf1ea9e](https://github.com/ColdPBC/cold-monorepo/commit/bf1ea9e47559e85c316389f2d195c3ca6e366508))
* Add total questions and progress to scoring service ([5005ee0](https://github.com/ColdPBC/cold-monorepo/commit/5005ee07da3ed4fb046f1668d26ee5a251b8da4f))
* enhance ComplianceResponsesRepository functions ([08188aa](https://github.com/ColdPBC/cold-monorepo/commit/08188aaeda7856f6900828124bf06787d8b4263d))
* Expand ComplianceDefinitionsRepository methods ([7c71ccc](https://github.com/ColdPBC/cold-monorepo/commit/7c71ccc5c0d8adf87b345b86e44e3f4c56fa9fd5))
* Export cache interceptor in cache index ([81bcde7](https://github.com/ColdPBC/cold-monorepo/commit/81bcde71020c20ec715175f606793337862032b8))
* update compliance-definitions.controller.ts ([ffd5137](https://github.com/ColdPBC/cold-monorepo/commit/ffd513727db8b32cc9f3fdac48d2618d3e719bf6))
* Update ComplianceDefinitionsService to use DefinitionsRepository ([0b7546a](https://github.com/ColdPBC/cold-monorepo/commit/0b7546a62193b931476ae46d4e67c26d48e49a80))
* Update methods in Organization Compliance Repository ([2ecc5da](https://github.com/ColdPBC/cold-monorepo/commit/2ecc5dafff6ddb36bdf4296a38aaab5a7f4fa004))

# [1.269.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.268.0...v1.269.0) (2024-06-28)


### Features

* initial work for handling array ai responses ([4281c11](https://github.com/ColdPBC/cold-monorepo/commit/4281c1173a8209be7bfb865888b4e62b678e3b86))
* Refactor AI details handling in Questionnaire ([4aa2798](https://github.com/ColdPBC/cold-monorepo/commit/4aa279816ee507ec62128e08b85271a8d69163b2))

# [1.268.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.267.0...v1.268.0) (2024-06-28)


### Features

* Add Interceptors to Organization Compliance Responses Controller ([1758b04](https://github.com/ColdPBC/cold-monorepo/commit/1758b045fa718dbd6ed56ba63af946250ff1d189))
* Add OrgUserInterceptor decorator to organization compliance controller ([c2621c3](https://github.com/ColdPBC/cold-monorepo/commit/c2621c36e4e1f2507c639a1ab646f11acbeeef19))
* Add OrgUserInterceptor to organization compliance controller ([de2f4ee](https://github.com/ColdPBC/cold-monorepo/commit/de2f4ee8c66115d7baf11f2b24470a9701405669))
* Add statuses in organization-compliance repository ([d73d13e](https://github.com/ColdPBC/cold-monorepo/commit/d73d13e6e55a95b612d537b8518a99eae4139c38))
* Added CacheInterceptor to ComplianceDefinitionsController ([9078fa9](https://github.com/ColdPBC/cold-monorepo/commit/9078fa9c0bcf0272a4a9939a5d5da23a82871c25))
* Improve error handling in chat service and optimize cache operations ([f1e9e78](https://github.com/ColdPBC/cold-monorepo/commit/f1e9e7892de92c69b2bbc1aec9f216b9fe603cfe))
* Use interceptor in OrganizationComplianceAiResponseFiles controller ([6dc03d8](https://github.com/ColdPBC/cold-monorepo/commit/6dc03d82b1c0af5930743812f9384e90c3019f3f))

# [1.267.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.266.0...v1.267.0) (2024-06-28)


### Features

* Add 'statuses' to compliance mock and refactor code ([59a4885](https://github.com/ColdPBC/cold-monorepo/commit/59a4885cdfcc2c2033bc677f46f20f96dd2b7d00))
* Refactor compliance manager overview for better data handling ([87525f3](https://github.com/ColdPBC/cold-monorepo/commit/87525f37ab88533ad6f3e3523580dac808e5e286))
* Refactor logging and context usage in Compliance Manager components ([f5da2f4](https://github.com/ColdPBC/cold-monorepo/commit/f5da2f4644707f38dc07af68ba60da9f7e09e190))
* Update compliance document modal and add image URLs to compliance mock ([6400431](https://github.com/ColdPBC/cold-monorepo/commit/64004310fab03312640c350aa0e090d02ac1b37a))
* Update logging in coldMQTTProvider ([c1f89a1](https://github.com/ColdPBC/cold-monorepo/commit/c1f89a13a04636e2bde7f062bb0430df34d40972))

# [1.266.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.265.1...v1.266.0) (2024-06-27)


### Features

* add cache service in compliance response repository ([d83439d](https://github.com/ColdPBC/cold-monorepo/commit/d83439de285dc8b2aaf8c5e98d5b845dfba4975f))

## [1.265.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.265.0...v1.265.1) (2024-06-27)


### Bug Fixes

* error being throw while scoring comliance sets ([d35ee9b](https://github.com/ColdPBC/cold-monorepo/commit/d35ee9b9ac19bedf5c5fc470904a58212b42867c))

# [1.265.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.264.0...v1.265.0) (2024-06-27)


### Features

* Add placeholder questions to questionnaire section ([a884c53](https://github.com/ColdPBC/cold-monorepo/commit/a884c5393ca907b1df4e051998578d4cca9c3b25))
* Move loading spinner inside questionnaire section ([e550f8b](https://github.com/ColdPBC/cold-monorepo/commit/e550f8bcc796a6fae6500291cf640ea8a6ecaeee))

# [1.264.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.263.0...v1.264.0) (2024-06-27)


### Features

* Update sidebar styles ([d927021](https://github.com/ColdPBC/cold-monorepo/commit/d927021d2aa277ee27ddd0a12ac7df114d0363fd))

# [1.263.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.262.0...v1.263.0) (2024-06-26)


### Features

* Add authentication and roles guards to controllers ([ec851b7](https://github.com/ColdPBC/cold-monorepo/commit/ec851b711ac950d78545e12fd2e60a1f56f457f1))

# [1.263.0-COLD-858.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.262.0...v1.263.0-COLD-858.1) (2024-06-26)


### Features

* Add authentication and roles guards to controllers ([ec851b7](https://github.com/ColdPBC/cold-monorepo/commit/ec851b711ac950d78545e12fd2e60a1f56f457f1))

# [1.262.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.261.0...v1.262.0) (2024-06-25)


### Features

* Add spinner to compliance counts during validation ([1f2bb9d](https://github.com/ColdPBC/cold-monorepo/commit/1f2bb9d9c1b4bc184d9ae57452a29c374574b27b))
* Enhance data validation and modify data fetch interval ([9062e8f](https://github.com/ColdPBC/cold-monorepo/commit/9062e8f62017261dfec2d2e6c2053fb70aea4629))
* Refactor logging and question list fetching handling ([ad0f2a8](https://github.com/ColdPBC/cold-monorepo/commit/ad0f2a853199f4f424bfd30a9a79d0f738294188))
* Update handling of undefined data and modify mocks ([efc255f](https://github.com/ColdPBC/cold-monorepo/commit/efc255f2b0dc1eee6647a8d7b42adb96600be289))
* Update MQTT logic and improve compliance manager interactions ([7893abf](https://github.com/ColdPBC/cold-monorepo/commit/7893abf6e0bd18e86afd5ad28ebc02c10fbf41e6))
* Update ordering logic for compliance questions ([baa3fe5](https://github.com/ColdPBC/cold-monorepo/commit/baa3fe57358c3b08b2d095a407e76e353fedd812))

# [1.261.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.260.0...v1.261.0) (2024-06-24)


### Features

* Add timer to clear delay in questionnaire components ([30ffa83](https://github.com/ColdPBC/cold-monorepo/commit/30ffa8330fbebcf9deb8907ae516d4666508b28c))
* Refactor search parameter removal in Questionnaire components ([957b6dd](https://github.com/ColdPBC/cold-monorepo/commit/957b6ddedf63b9b1c7f4717991fe9ee473d0ca9a))
* Update navigation and improve progress bar interaction ([07265ee](https://github.com/ColdPBC/cold-monorepo/commit/07265ee2660f8e4a63460eb5ddc2e1df891c677e))

# [1.260.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.259.0...v1.260.0) (2024-06-24)


### Features

* Add condition for 'collapseOpen' in useEffect ([e7e70fc](https://github.com/ColdPBC/cold-monorepo/commit/e7e70fcb17eda2f248bb3ffe33b4e3fef2d9b058))
* Add spinner to ComplianceProgressStatusItem component ([281b33d](https://github.com/ColdPBC/cold-monorepo/commit/281b33d7723ce1d0bc36ce25347d5eb55547326a))
* Refactor fetching and handling of compliance counts ([5674539](https://github.com/ColdPBC/cold-monorepo/commit/56745392b4af8dae560a1d238e695e7610481fe3))

# [1.259.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.258.0...v1.259.0) (2024-06-21)


### Bug Fixes

* issue with filtering not working ([1905893](https://github.com/ColdPBC/cold-monorepo/commit/19058931a88b6b9e575bdc3abdc72abd3c9a0e66))


### Features

* Add access control and refactoring in organizations.mqtt.service ([dbfe001](https://github.com/ColdPBC/cold-monorepo/commit/dbfe001af6255c8ac7bae863e6acb21b2cd8912b))
* Add compliance responses count endpoint ([f4758d0](https://github.com/ColdPBC/cold-monorepo/commit/f4758d0167239daf8522e2d2e725ddd16d08cc7f))
* Add onlyCounts option to ComplianceResponsesRepository ([2b240c8](https://github.com/ColdPBC/cold-monorepo/commit/2b240c8416c9aa46ef8998b6b152571054bd7d60))
* Update ComplianceSectionGroupsRepository with ScoringService and response inclusion ([7d9ca40](https://github.com/ColdPBC/cold-monorepo/commit/7d9ca408c87e82f23d443ae1517b9c7006ee5f28))

# [1.258.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.257.0...v1.258.0) (2024-06-20)


### Features

* Enhance crawling service with priority settings and logging optimizations ([99bb43b](https://github.com/ColdPBC/cold-monorepo/commit/99bb43b53b8e024c87f02a4ecae0ab94790d8401))

# [1.257.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.256.0...v1.257.0) (2024-06-20)


### Features

* Add section title to logBrowser in Compliance Manager Overview ([d48b28a](https://github.com/ColdPBC/cold-monorepo/commit/d48b28a5b0ffab0a4e0513e9b12f60286ce7c960))
* Optimize complianceManagerOverviewSection component ([3358949](https://github.com/ColdPBC/cold-monorepo/commit/33589491cb3a6bb17b76b869ad1060857d8c7cc9))
* Refactor compliance manager and section components ([d5faa2e](https://github.com/ColdPBC/cold-monorepo/commit/d5faa2e52d9aa8f31209da17b9e1f20696ced7a4))
* Remove redundant logging parameters ([9681060](https://github.com/ColdPBC/cold-monorepo/commit/9681060f949bc6b956a75c66f4f9089833018c8a))
* Remove unnecessary logging and state in coldMQTTProvider ([b733db3](https://github.com/ColdPBC/cold-monorepo/commit/b733db3da7ce0205488b7a8df7a27689a2c3cc53))
* Update browser log messages in questionnaire components ([c0d6153](https://github.com/ColdPBC/cold-monorepo/commit/c0d61539c37c552eaa2c22815d7974140802431c))
* Update logging in ComplianceQuestionnaire component ([693d83e](https://github.com/ColdPBC/cold-monorepo/commit/693d83ead1efdcd7ef049b7e8ef17d110fa88c26))

# [1.256.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.255.0...v1.256.0) (2024-06-20)


### Features

* Add namespace deletion and URL filtering in crawler ([602731c](https://github.com/ColdPBC/cold-monorepo/commit/602731c434d430fe2d8533068f93283f2ce221cf))

# [1.255.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.254.0...v1.255.0) (2024-06-18)


### Features

* Improve URL cleaning and handling in crawler ([21a752e](https://github.com/ColdPBC/cold-monorepo/commit/21a752eb7c09271f878fbfba3d38096ca2af55f7))

# [1.254.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.253.0...v1.254.0) (2024-06-18)


### Features

* Hide "Documents Referenced" if no references exist ([f37e8a0](https://github.com/ColdPBC/cold-monorepo/commit/f37e8a0f313dfb24a020cb32a825f6e7f303b0a6))
* Implement ordering for questionnaire questions ([eba995b](https://github.com/ColdPBC/cold-monorepo/commit/eba995bc01af95c77896374c8e8e4101262bbca6))

# [1.253.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.252.0...v1.253.0) (2024-06-18)


### Features

* Pass options parameter to scoreComplianceResponse and add dependencies to return object ([c6fd305](https://github.com/ColdPBC/cold-monorepo/commit/c6fd305b33edd43df2797a4618e7527b2df8ce61))

# [1.252.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.251.0...v1.252.0) (2024-06-18)


### Features

* Update scoring service and compliance responses repository ([ccc66dd](https://github.com/ColdPBC/cold-monorepo/commit/ccc66ddfc10fa01907639f2d25affd510e469864))

# [1.251.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.250.0...v1.251.0) (2024-06-18)


### Features

* Add deletion of 'web' type vector records in Pinecone service ([c0d6270](https://github.com/ColdPBC/cold-monorepo/commit/c0d6270b33ade79ac4bfb007c9e13521656f3a29))

# [1.250.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.249.0...v1.250.0) (2024-06-18)


### Bug Fixes

* update fixes for questionnaire ([#465](https://github.com/ColdPBC/cold-monorepo/issues/465)) ([0d5c63b](https://github.com/ColdPBC/cold-monorepo/commit/0d5c63bdad449ce602c1d6ffb8829e88ed5b895c))


### Features

* Update logging and handle exception in removeWebVectors ([1bdf121](https://github.com/ColdPBC/cold-monorepo/commit/1bdf121aa4ed0d0a69c0634fff6724ac7753bc80))
* Update order of condition checks in complianceManagerOverviewSection ([615a3b2](https://github.com/ColdPBC/cold-monorepo/commit/615a3b20080ad2a4ef2370ec33eee46b7b896b59))

# [1.249.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.248.0...v1.249.0) (2024-06-18)


### Features

* Refactor section sorting in questionnaireContainer ([424d948](https://github.com/ColdPBC/cold-monorepo/commit/424d948e20166cee6ca3a193924a416affa81983))

# [1.248.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.247.0...v1.248.0) (2024-06-18)


### Features

* Add AI response deletion and web crawling enhancements ([7d0209e](https://github.com/ColdPBC/cold-monorepo/commit/7d0209e9a407b11da1fe99799e90634a6653a3f1))
* Add Organizations Repository to Compliance Repository module ([175ab64](https://github.com/ColdPBC/cold-monorepo/commit/175ab646f603864ab35f9366a4d57a94f3f08fba))
* Enhanced compliance response functionality and indexing ([a9c419a](https://github.com/ColdPBC/cold-monorepo/commit/a9c419ad13ef063edb8c4101cfadce585e1188ed))
* Grant all roles access to specific organization compliance responses endpoints ([48d5b3b](https://github.com/ColdPBC/cold-monorepo/commit/48d5b3b0fde33d4d50d06fef7bbf3a035788ae20))
* Refactor complianceManager and questionnaireQuestionItem components ([e2a2805](https://github.com/ColdPBC/cold-monorepo/commit/e2a28053fa767acc5e4648e679a1cc7032608576))
* Refactor questionnaire update method ([47b650c](https://github.com/ColdPBC/cold-monorepo/commit/47b650cdd7f486f7ce274f43723388375d0660e6))
* Update MQTT query getComplianceQuestionsList() to use getScoredComplianceQuestionBySection() ([4de4023](https://github.com/ColdPBC/cold-monorepo/commit/4de40231def919ae98bb699caaab92a9b497293f))
* Update questionnaireQuestionItem component ([89fe672](https://github.com/ColdPBC/cold-monorepo/commit/89fe6729f41ce5cdfa3991d99fbd2450a27523a5))

# [1.247.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.246.0...v1.247.0) (2024-06-18)

### Features

* Optimize section groups ordering in Questionnaire ([3142636](https://github.com/ColdPBC/cold-monorepo/commit/3142636a8b59c141b61b2671325f455f64067fd5))
* Refactor data retrieval for compliance question count ([7174f18](https://github.com/ColdPBC/cold-monorepo/commit/7174f18559ba1a76b0e8c35be51a787fce966c69))
* Refine scrolling condition in questionnaire section ([890f602](https://github.com/ColdPBC/cold-monorepo/commit/890f60291b95fc9ee4471fa712ea2e8e95f6d1e5))
* Update Compliance Manager MQTT Mock ([6400750](https://github.com/ColdPBC/cold-monorepo/commit/64007502a8409115e00bf1fb57cbbe5fa5a65a34))
* Update handling of undefined states in questionnaire ([9d2372a](https://github.com/ColdPBC/cold-monorepo/commit/9d2372a9c974fc7e9ee681a85e7c64045fdd7d40))
* Update MQTT topic in mock ([562db85](https://github.com/ColdPBC/cold-monorepo/commit/562db854ea4819fce6a4e69d32efee7deab959a8))
* Update to use ComplianceSidebarPayload and Questions ([66edc14](https://github.com/ColdPBC/cold-monorepo/commit/66edc146de861dce633580a150427dd907099fa6))

# [1.246.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.245.0...v1.246.0) (2024-06-17)


### Features

* Add error boundaries to questionnaire components ([a0dc8c3](https://github.com/ColdPBC/cold-monorepo/commit/a0dc8c34517581fefa1bd4f49bb07aadb7ca7436))
* Add survey response handlers and ComplianceComponentType enum ([d290ff4](https://github.com/ColdPBC/cold-monorepo/commit/d290ff448e918d683e3f51b0e979b7f7f9392749))
* Ignore chromatic in sidebar and remove WithSectionSelection story ([c8cbcff](https://github.com/ColdPBC/cold-monorepo/commit/c8cbcff2736f001c603768b3df98db031972842c))
* Increase timeout in questionnaireQuestionSection ([75199a0](https://github.com/ColdPBC/cold-monorepo/commit/75199a0b264b66421eca0b109caf36f00af5c062))
* Update div styling and remove Spinner component ([1e83fcc](https://github.com/ColdPBC/cold-monorepo/commit/1e83fcce3c0de277a9411003554cb91b306bda17))

# [1.245.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.244.0...v1.245.0) (2024-06-16)


### Features

* Add functions for embedding and loading web documents ([75ad7f5](https://github.com/ColdPBC/cold-monorepo/commit/75ad7f5afa3356b6c1a768bd232fb90fdcb10727))
* add getWebFileContent method to LangchainLoaderService ([4cfc143](https://github.com/ColdPBC/cold-monorepo/commit/4cfc14302ae0b55a16000199ebe20a67c4c8cf3f))
* Extend CrawlerConsumer to handle file persistence and addition of services ([933b903](https://github.com/ColdPBC/cold-monorepo/commit/933b903b722c244fff4a6746e6ed42de55bbd90c))
* Update crawler controller to fetch website data from company ([5d68093](https://github.com/ColdPBC/cold-monorepo/commit/5d68093dea204a8e6b64036d1cbb3ac81a55ad1b))

# [1.244.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.243.0...v1.244.0) (2024-06-15)


### Features

* Add function to check equality between AI response and compliance answer ([0ece33a](https://github.com/ColdPBC/cold-monorepo/commit/0ece33acdc252976b4310e50656ecbe50da132af))
* Rename AiDocumentReferenceDropdown and refine its functionality ([e2d7ccd](https://github.com/ColdPBC/cold-monorepo/commit/e2d7ccd443a824b7f4049e59110deb99665920ad))

# [1.243.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.242.0...v1.243.0) (2024-06-15)


### Features

* Enhance the validation logic for question answers ([3214518](https://github.com/ColdPBC/cold-monorepo/commit/3214518fa5cbfde8293b4a4b8c229841f1fa95bc))

# [1.242.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.241.0...v1.242.0) (2024-06-15)


### Features

* Handle empty compliance responses in survey utils ([a00dc29](https://github.com/ColdPBC/cold-monorepo/commit/a00dc29e86b3e9b1da1b0d7f29b52303dfe9f06d))

# [1.241.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.240.0...v1.241.0) (2024-06-15)


### Features

* Update RPC message processing in organizations_compliance_responses.rabbit ([e1968e3](https://github.com/ColdPBC/cold-monorepo/commit/e1968e3cf060473e8abf1482eec9722298acc75a))

# [1.240.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.239.0...v1.240.0) (2024-06-15)


### Features

* Add initial creation of organization compliance in compliance-section-groups repository ([fb97713](https://github.com/ColdPBC/cold-monorepo/commit/fb97713951f4b8d6947df0dcd542f2a36ed56157))

# [1.239.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.238.0...v1.239.0) (2024-06-15)


### Features

* Update MQTT topic in complianceManager ([b2aeeed](https://github.com/ColdPBC/cold-monorepo/commit/b2aeeeda06ca9c3134b9f10a040248236e5f9371))

# [1.238.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.237.0...v1.238.0) (2024-06-15)


### Features

* add link to questionnaire from the compliance management page ([adb1276](https://github.com/ColdPBC/cold-monorepo/commit/adb127649ebeedd9453a827924e8a1354faf6554))
* Add specific component routing and enhance exception handling ([0bc4728](https://github.com/ColdPBC/cold-monorepo/commit/0bc4728bdea3731d27df6fe6f2080aa705eaf4f3))
* added container id to scroll in question container ([ffdffa8](https://github.com/ColdPBC/cold-monorepo/commit/ffdffa8f804898f1f397e92047d81f7eec88d68f))
* added save button to notes ([93b0b29](https://github.com/ColdPBC/cold-monorepo/commit/93b0b291179ebd247a02239976e1b75fdc2e1a37))
* handle glow overlayed on ai justification ([0231bfb](https://github.com/ColdPBC/cold-monorepo/commit/0231bfbeb88a8fa8f418897d5d2cdde3d993fcf0))
* handle scrolling to section and question ([4ab389c](https://github.com/ColdPBC/cold-monorepo/commit/4ab389c6f8d3c00f0171dd3f751b311491b861c1))
* more changes ([a586945](https://github.com/ColdPBC/cold-monorepo/commit/a586945b1b8f09dea6f4c916522fcbcb74595779))
* more styling and code changes ([3d05f9b](https://github.com/ColdPBC/cold-monorepo/commit/3d05f9be74c25ffd5b7fb794ca237408d1ff2b22))
* questionnaire page, left sidebar and container ([d24d31c](https://github.com/ColdPBC/cold-monorepo/commit/d24d31cbfa66c1197577a0c870e6faa9361893d0))
* Remove unused hook, update surveyUtils, improve dashboard layout ([aae1153](https://github.com/ColdPBC/cold-monorepo/commit/aae11530f580a910e3017fce7182f6d1793b40ca))
* updates for questionnaire container ([5575f3c](https://github.com/ColdPBC/cold-monorepo/commit/5575f3cf3ec5ffd53897e5104682b9ca66781930))

# [1.237.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0...v1.237.0) (2024-06-14)


### Features

* Update Pinecone service functionality ([9862b2f](https://github.com/ColdPBC/cold-monorepo/commit/9862b2f5a1c441d8e7ec1a93439a6f90c2dc7339))

# [1.236.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.235.0...v1.236.0) (2024-06-14)


### Bug Fixes

* change organization_compliance_question_bookmarks to false in Prisma extensions ([6de5313](https://github.com/ColdPBC/cold-monorepo/commit/6de5313d48f4a6220154655e68a448e36189687a))
* Dependency injection issue ([49e89cf](https://github.com/ColdPBC/cold-monorepo/commit/49e89cf5139d8c6286980a1615cc5ee5017d40dc))
* update incorrect param name in organization_compliance_responses.controller ([dde738d](https://github.com/ColdPBC/cold-monorepo/commit/dde738da9ca70e09d5090cb501e39b87d8fa9282))


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1](https://github.com/ColdPBC/cold-monorepo/commit/3a347a127c5fcf6471d0d864874fcda92daac83b))
* Add additional exports to Nest module ([c4d7482](https://github.com/ColdPBC/cold-monorepo/commit/c4d7482e6db924e35403857e5d9886001b8a7601))
* Add ComplianceNoteFilesRepository ([33d32ca](https://github.com/ColdPBC/cold-monorepo/commit/33d32ca3c27cd6c3d158809d0112573a054d766b))
* Add ComplianceNoteLinksRepository ([77c3613](https://github.com/ColdPBC/cold-monorepo/commit/77c3613e54246860497d66652f58723aa24468bc))
* Add ComplianceNotesRepository with CRUD operations ([2ed81fd](https://github.com/ColdPBC/cold-monorepo/commit/2ed81fd8b8ab5c98e6fb7a799fbf88cb7ad107cc))
* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee](https://github.com/ColdPBC/cold-monorepo/commit/9fd4feeeb5137de5a50aac8a7a6d9b69a5032388))
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c](https://github.com/ColdPBC/cold-monorepo/commit/58f663cd14b8e7d6715c488dfaa9874b579ef56b))
* Add FilteringModule to ScoringModule in nest library ([ffd3292](https://github.com/ColdPBC/cold-monorepo/commit/ffd32926557b0da0f3a85abbb530b195abe4d7b1))
* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725](https://github.com/ColdPBC/cold-monorepo/commit/38f07255fe63d751d16575af8dcbd6b3d875cce4))
* add metadata field to compliance notes table ([ff559f6](https://github.com/ColdPBC/cold-monorepo/commit/ff559f604680767733e697a319ac2b05b7644b3a))
* Add method to get scored compliance question by ID ([adcac13](https://github.com/ColdPBC/cold-monorepo/commit/adcac13c2521121bd238dff14ba8afcdd9cc5dd8))
* Add new compliance note related repositories ([870ec8b](https://github.com/ColdPBC/cold-monorepo/commit/870ec8b29ee3c0b4c2f33e9aea3d75ed6f9033ed))
* Add new FilteringService and module in compliance lib ([140e7c9](https://github.com/ColdPBC/cold-monorepo/commit/140e7c9bb95d018ecd2f5ee707d2cb3bbbb39b7b))
* add notes endpoints ([c171eb2](https://github.com/ColdPBC/cold-monorepo/commit/c171eb23a6f8b7ac9d56535686037231ac252c70))
* add options parameter to scoring methods in scoring.service ([09d32ed](https://github.com/ColdPBC/cold-monorepo/commit/09d32ed6b590b9b52fb2807f3071a13c9dd5ff5c))
* Add OrganizationComplianceNotesModule to organization_compliance.module ([50f1bc9](https://github.com/ColdPBC/cold-monorepo/commit/50f1bc93729a8c059278f4380ee382938d5771f7))
* Add rubric to compliance responses repository ([6ead069](https://github.com/ColdPBC/cold-monorepo/commit/6ead069cf4238c59c7336ac788a38144fc35352d))
* Add unique constraint to email and compliance_question_id in Prisma schema ([b401d9a](https://github.com/ColdPBC/cold-monorepo/commit/b401d9ac716fc74e0f6d7032e25e71d80fbddae2))
* Added 'responses' parameter to organization compliance responses controller ([c8109ef](https://github.com/ColdPBC/cold-monorepo/commit/c8109ef8f5a44ae39766f0ed427c78ad01c76644))
* added `forwardRef` in scoring.module.ts ([24b09a4](https://github.com/ColdPBC/cold-monorepo/commit/24b09a4424edb13b6391ae857a91bc43c1981eb3))
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920](https://github.com/ColdPBC/cold-monorepo/commit/3032920433d29df1c11f8d50b08b20e3d5950744))
* Added component attribute to compliance responses repository ([e704fe8](https://github.com/ColdPBC/cold-monorepo/commit/e704fe806f362bd839e29d886d9a077a5294f93f))
* Added new enum to compliance ([2dafdc9](https://github.com/ColdPBC/cold-monorepo/commit/2dafdc94dadbe0b1fc3266a4a11ac78aac3b47d1))
* Added Qodana configuration file and its output ([f29f287](https://github.com/ColdPBC/cold-monorepo/commit/f29f287c8a1147f4e4df61082906cc00e1c4977b))
* Enhance compliance question bookmark repository code ([cf49e82](https://github.com/ColdPBC/cold-monorepo/commit/cf49e82ccdddfdf73ce1be9544af679ef6cc3b24))
* Enhance filtering functionality in Filtering Service ([08ccb82](https://github.com/ColdPBC/cold-monorepo/commit/08ccb826d57a233217e4a96bd68e4bf95d2fee6c))
* Enhance logging configuration for development environment in Prisma extensions ([15c6c10](https://github.com/ColdPBC/cold-monorepo/commit/15c6c107a0848fae58fdb2a88669b3eefa5fc1ce))
* enhance OrganizationComplianceNotesService ([d8f5fe7](https://github.com/ColdPBC/cold-monorepo/commit/d8f5fe7e6da20fe882d4be9437a190522337b398))
* enhance scoring service in the compliance module ([e44bdd1](https://github.com/ColdPBC/cold-monorepo/commit/e44bdd11c9b321329f0e4249b652864f8a1c0561))
* Expand compliance responses repository logic ([2daae9a](https://github.com/ColdPBC/cold-monorepo/commit/2daae9ae13b1d90fee705b2d4ff96ca4c393697f))
* Handle NotFoundException in compliance-ai-responses.repository ([629c5d6](https://github.com/ColdPBC/cold-monorepo/commit/629c5d672d0b7f772c6aecb2a634e144d8199c13))
* Import and utilize ComplianceDataModule in NestModule ([aa15a97](https://github.com/ColdPBC/cold-monorepo/commit/aa15a970d98190f6bee778b69409efbeb1dde011))
* Integrate FilteringService into chat.service.ts ([d0f5d2c](https://github.com/ColdPBC/cold-monorepo/commit/d0f5d2c49b14e154ba6607351475ed3fd18d6e0a))
* Refactor compliance response repository to use organization object ([94e88fd](https://github.com/ColdPBC/cold-monorepo/commit/94e88fdf5e7781dbe821bb26d6aed01303158b3f))
* Refactor compliance responses handling ([2ee30f4](https://github.com/ColdPBC/cold-monorepo/commit/2ee30f444694fbf9fa2fcd2e926bb72e880be2d6))
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7](https://github.com/ColdPBC/cold-monorepo/commit/ccfa1c7c4663e42e559aa4ec5bc12fba0cfb372f))
* Refactor organization compliance response service ([0fe23d0](https://github.com/ColdPBC/cold-monorepo/commit/0fe23d0c6fc3e4538ffae3510caea99679710a8f))
* Update ComplianceQuestionsRepository ([924a7e5](https://github.com/ColdPBC/cold-monorepo/commit/924a7e518a27685a781c5dd06db7891e722222fa))
* Update deletion criteria in compliance question bookmarks repository ([22d82f9](https://github.com/ColdPBC/cold-monorepo/commit/22d82f9077fa1c5a5e9e9e4e3252c73f934d4da9))
* Update examples and sections in openapi JSON schema ([f903678](https://github.com/ColdPBC/cold-monorepo/commit/f903678318d0992864c313e53631eb9d0e02f457))
* Update filtering.service in nest lib for compliance filtering ([cdcb17b](https://github.com/ColdPBC/cold-monorepo/commit/cdcb17bd83ccf5ca9a84373ae399c1d8f11891c7))
* Update methods in compliance-question-bookmarks service ([8af1446](https://github.com/ColdPBC/cold-monorepo/commit/8af14464baf123b68e1e7fa18933f7967989d5d2))
* Update organization compliance notes controller ([a351ba5](https://github.com/ColdPBC/cold-monorepo/commit/a351ba56d13855671daab99f02d935e64ad3edea))
* Update organization compliance responses controller ([c0cb6c9](https://github.com/ColdPBC/cold-monorepo/commit/c0cb6c9186e61dff3de54359de21ed713ca7035f))
* Update organization compliance responses controller ([0fb3772](https://github.com/ColdPBC/cold-monorepo/commit/0fb37726a964b430267403a03466b44639e60c1f))
* Update OrganizationComplianceBookmarks module and service ([3bebd69](https://github.com/ColdPBC/cold-monorepo/commit/3bebd69a783c7489d6e633472281649e7108c1ba))
* update scoring service to include score map and delete rubric [COLD-805] ([5372389](https://github.com/ColdPBC/cold-monorepo/commit/53723898892c70b247a50af6782ca071af838021))
* updated function name in organization_compliance_responses.service ([b6c1c77](https://github.com/ColdPBC/cold-monorepo/commit/b6c1c77af0d5134368949b908d2c52755d0a7bf5))

# [1.236.0-cold-803.15](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.14...v1.236.0-cold-803.15) (2024-06-14)


### Features

* Refactor compliance responses handling ([2ee30f4](https://github.com/ColdPBC/cold-monorepo/commit/2ee30f444694fbf9fa2fcd2e926bb72e880be2d6))

# [1.236.0-COLD-710.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-COLD-710.2...v1.236.0-COLD-710.3) (2024-06-14)


### Bug Fixes

* update incorrect param name in organization_compliance_responses.controller ([dde738d](https://github.com/ColdPBC/cold-monorepo/commit/dde738da9ca70e09d5090cb501e39b87d8fa9282))


### Features

* Add ComplianceNoteFilesRepository ([33d32ca](https://github.com/ColdPBC/cold-monorepo/commit/33d32ca3c27cd6c3d158809d0112573a054d766b))
* Add ComplianceNoteLinksRepository ([77c3613](https://github.com/ColdPBC/cold-monorepo/commit/77c3613e54246860497d66652f58723aa24468bc))
* Add ComplianceNotesRepository with CRUD operations ([2ed81fd](https://github.com/ColdPBC/cold-monorepo/commit/2ed81fd8b8ab5c98e6fb7a799fbf88cb7ad107cc))
* add metadata field to compliance notes table ([ff559f6](https://github.com/ColdPBC/cold-monorepo/commit/ff559f604680767733e697a319ac2b05b7644b3a))
* Add new compliance note related repositories ([870ec8b](https://github.com/ColdPBC/cold-monorepo/commit/870ec8b29ee3c0b4c2f33e9aea3d75ed6f9033ed))
* add notes endpoints ([c171eb2](https://github.com/ColdPBC/cold-monorepo/commit/c171eb23a6f8b7ac9d56535686037231ac252c70))
* Add OrganizationComplianceNotesModule to organization_compliance.module ([50f1bc9](https://github.com/ColdPBC/cold-monorepo/commit/50f1bc93729a8c059278f4380ee382938d5771f7))
* Enhance logging configuration for development environment in Prisma extensions ([15c6c10](https://github.com/ColdPBC/cold-monorepo/commit/15c6c107a0848fae58fdb2a88669b3eefa5fc1ce))
* enhance OrganizationComplianceNotesService ([d8f5fe7](https://github.com/ColdPBC/cold-monorepo/commit/d8f5fe7e6da20fe882d4be9437a190522337b398))
* more changes ([a586945](https://github.com/ColdPBC/cold-monorepo/commit/a586945b1b8f09dea6f4c916522fcbcb74595779))
* Update methods in compliance-question-bookmarks service ([8af1446](https://github.com/ColdPBC/cold-monorepo/commit/8af14464baf123b68e1e7fa18933f7967989d5d2))
* Update organization compliance notes controller ([a351ba5](https://github.com/ColdPBC/cold-monorepo/commit/a351ba56d13855671daab99f02d935e64ad3edea))

# [1.236.0-COLD-710.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-COLD-710.1...v1.236.0-COLD-710.2) (2024-06-14)


### Bug Fixes

* change organization_compliance_question_bookmarks to false in Prisma extensions ([6de5313](https://github.com/ColdPBC/cold-monorepo/commit/6de5313d48f4a6220154655e68a448e36189687a))


### Features

* Add unique constraint to email and compliance_question_id in Prisma schema ([b401d9a](https://github.com/ColdPBC/cold-monorepo/commit/b401d9ac716fc74e0f6d7032e25e71d80fbddae2))
* Expand compliance responses repository logic ([2daae9a](https://github.com/ColdPBC/cold-monorepo/commit/2daae9ae13b1d90fee705b2d4ff96ca4c393697f))
* Handle NotFoundException in compliance-ai-responses.repository ([629c5d6](https://github.com/ColdPBC/cold-monorepo/commit/629c5d672d0b7f772c6aecb2a634e144d8199c13))
* Update deletion criteria in compliance question bookmarks repository ([22d82f9](https://github.com/ColdPBC/cold-monorepo/commit/22d82f9077fa1c5a5e9e9e4e3252c73f934d4da9))

# [1.236.0-COLD-710.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.235.0...v1.236.0-COLD-710.1) (2024-06-13)


### Bug Fixes

* Dependency injection issue ([49e89cf](https://github.com/ColdPBC/cold-monorepo/commit/49e89cf5139d8c6286980a1615cc5ee5017d40dc))


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1](https://github.com/ColdPBC/cold-monorepo/commit/3a347a127c5fcf6471d0d864874fcda92daac83b))
* Add additional exports to Nest module ([c4d7482](https://github.com/ColdPBC/cold-monorepo/commit/c4d7482e6db924e35403857e5d9886001b8a7601))
* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee](https://github.com/ColdPBC/cold-monorepo/commit/9fd4feeeb5137de5a50aac8a7a6d9b69a5032388))
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c](https://github.com/ColdPBC/cold-monorepo/commit/58f663cd14b8e7d6715c488dfaa9874b579ef56b))
* Add FilteringModule to ScoringModule in nest library ([ffd3292](https://github.com/ColdPBC/cold-monorepo/commit/ffd32926557b0da0f3a85abbb530b195abe4d7b1))
* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725](https://github.com/ColdPBC/cold-monorepo/commit/38f07255fe63d751d16575af8dcbd6b3d875cce4))
* add link to questionnaire from the compliance management page ([adb1276](https://github.com/ColdPBC/cold-monorepo/commit/adb127649ebeedd9453a827924e8a1354faf6554))
* Add method to get scored compliance question by ID ([adcac13](https://github.com/ColdPBC/cold-monorepo/commit/adcac13c2521121bd238dff14ba8afcdd9cc5dd8))
* Add new FilteringService and module in compliance lib ([140e7c9](https://github.com/ColdPBC/cold-monorepo/commit/140e7c9bb95d018ecd2f5ee707d2cb3bbbb39b7b))
* add options parameter to scoring methods in scoring.service ([09d32ed](https://github.com/ColdPBC/cold-monorepo/commit/09d32ed6b590b9b52fb2807f3071a13c9dd5ff5c))
* Add rubric to compliance responses repository ([6ead069](https://github.com/ColdPBC/cold-monorepo/commit/6ead069cf4238c59c7336ac788a38144fc35352d))
* Add specific component routing and enhance exception handling ([0bc4728](https://github.com/ColdPBC/cold-monorepo/commit/0bc4728bdea3731d27df6fe6f2080aa705eaf4f3))
* Added 'responses' parameter to organization compliance responses controller ([c8109ef](https://github.com/ColdPBC/cold-monorepo/commit/c8109ef8f5a44ae39766f0ed427c78ad01c76644))
* added `forwardRef` in scoring.module.ts ([24b09a4](https://github.com/ColdPBC/cold-monorepo/commit/24b09a4424edb13b6391ae857a91bc43c1981eb3))
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920](https://github.com/ColdPBC/cold-monorepo/commit/3032920433d29df1c11f8d50b08b20e3d5950744))
* Added component attribute to compliance responses repository ([e704fe8](https://github.com/ColdPBC/cold-monorepo/commit/e704fe806f362bd839e29d886d9a077a5294f93f))
* added container id to scroll in question container ([ffdffa8](https://github.com/ColdPBC/cold-monorepo/commit/ffdffa8f804898f1f397e92047d81f7eec88d68f))
* Added new enum to compliance ([2dafdc9](https://github.com/ColdPBC/cold-monorepo/commit/2dafdc94dadbe0b1fc3266a4a11ac78aac3b47d1))
* Added Qodana configuration file and its output ([f29f287](https://github.com/ColdPBC/cold-monorepo/commit/f29f287c8a1147f4e4df61082906cc00e1c4977b))
* added save button to notes ([93b0b29](https://github.com/ColdPBC/cold-monorepo/commit/93b0b291179ebd247a02239976e1b75fdc2e1a37))
* Enhance compliance question bookmark repository code ([cf49e82](https://github.com/ColdPBC/cold-monorepo/commit/cf49e82ccdddfdf73ce1be9544af679ef6cc3b24))
* Enhance filtering functionality in Filtering Service ([08ccb82](https://github.com/ColdPBC/cold-monorepo/commit/08ccb826d57a233217e4a96bd68e4bf95d2fee6c))
* enhance scoring service in the compliance module ([e44bdd1](https://github.com/ColdPBC/cold-monorepo/commit/e44bdd11c9b321329f0e4249b652864f8a1c0561))
* handle glow overlayed on ai justification ([0231bfb](https://github.com/ColdPBC/cold-monorepo/commit/0231bfbeb88a8fa8f418897d5d2cdde3d993fcf0))
* handle scrolling to section and question ([4ab389c](https://github.com/ColdPBC/cold-monorepo/commit/4ab389c6f8d3c00f0171dd3f751b311491b861c1))
* Import and utilize ComplianceDataModule in NestModule ([aa15a97](https://github.com/ColdPBC/cold-monorepo/commit/aa15a970d98190f6bee778b69409efbeb1dde011))
* Integrate FilteringService into chat.service.ts ([d0f5d2c](https://github.com/ColdPBC/cold-monorepo/commit/d0f5d2c49b14e154ba6607351475ed3fd18d6e0a))
* more styling and code changes ([3d05f9b](https://github.com/ColdPBC/cold-monorepo/commit/3d05f9be74c25ffd5b7fb794ca237408d1ff2b22))
* questionnaire page, left sidebar and container ([d24d31c](https://github.com/ColdPBC/cold-monorepo/commit/d24d31cbfa66c1197577a0c870e6faa9361893d0))
* Refactor compliance response repository to use organization object ([94e88fd](https://github.com/ColdPBC/cold-monorepo/commit/94e88fdf5e7781dbe821bb26d6aed01303158b3f))
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7](https://github.com/ColdPBC/cold-monorepo/commit/ccfa1c7c4663e42e559aa4ec5bc12fba0cfb372f))
* Refactor organization compliance response service ([0fe23d0](https://github.com/ColdPBC/cold-monorepo/commit/0fe23d0c6fc3e4538ffae3510caea99679710a8f))
* Update ComplianceQuestionsRepository ([924a7e5](https://github.com/ColdPBC/cold-monorepo/commit/924a7e518a27685a781c5dd06db7891e722222fa))
* Update examples and sections in openapi JSON schema ([f903678](https://github.com/ColdPBC/cold-monorepo/commit/f903678318d0992864c313e53631eb9d0e02f457))
* Update filtering.service in nest lib for compliance filtering ([cdcb17b](https://github.com/ColdPBC/cold-monorepo/commit/cdcb17bd83ccf5ca9a84373ae399c1d8f11891c7))
* Update organization compliance responses controller ([c0cb6c9](https://github.com/ColdPBC/cold-monorepo/commit/c0cb6c9186e61dff3de54359de21ed713ca7035f))
* Update organization compliance responses controller ([0fb3772](https://github.com/ColdPBC/cold-monorepo/commit/0fb37726a964b430267403a03466b44639e60c1f))
* Update OrganizationComplianceBookmarks module and service ([3bebd69](https://github.com/ColdPBC/cold-monorepo/commit/3bebd69a783c7489d6e633472281649e7108c1ba))
* update scoring service to include score map and delete rubric [COLD-805] ([5372389](https://github.com/ColdPBC/cold-monorepo/commit/53723898892c70b247a50af6782ca071af838021))
* updated function name in organization_compliance_responses.service ([b6c1c77](https://github.com/ColdPBC/cold-monorepo/commit/b6c1c77af0d5134368949b908d2c52755d0a7bf5))
* updates for questionnaire container ([5575f3c](https://github.com/ColdPBC/cold-monorepo/commit/5575f3cf3ec5ffd53897e5104682b9ca66781930))

# [1.236.0-cold-803.11](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.10...v1.236.0-cold-803.11) (2024-06-13)


### Features

* Add getQuestionResponseById method and refactor parameters in organization compliance responses service ([38f0725](https://github.com/ColdPBC/cold-monorepo/commit/38f07255fe63d751d16575af8dcbd6b3d875cce4))
* Add method to get scored compliance question by ID ([adcac13](https://github.com/ColdPBC/cold-monorepo/commit/adcac13c2521121bd238dff14ba8afcdd9cc5dd8))
* Update organization compliance responses controller ([c0cb6c9](https://github.com/ColdPBC/cold-monorepo/commit/c0cb6c9186e61dff3de54359de21ed713ca7035f))

# [1.236.0-cold-803.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.9...v1.236.0-cold-803.10) (2024-06-13)


### Features

* updated function name in organization_compliance_responses.service ([b6c1c77](https://github.com/ColdPBC/cold-monorepo/commit/b6c1c77af0d5134368949b908d2c52755d0a7bf5))

# [1.236.0-cold-803.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.8...v1.236.0-cold-803.9) (2024-06-13)


### Features

* Added Qodana configuration file and its output ([f29f287](https://github.com/ColdPBC/cold-monorepo/commit/f29f287c8a1147f4e4df61082906cc00e1c4977b))

# [1.236.0-cold-803.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.7...v1.236.0-cold-803.8) (2024-06-13)


### Features

* update scoring service to include score map and delete rubric [COLD-805] ([5372389](https://github.com/ColdPBC/cold-monorepo/commit/53723898892c70b247a50af6782ca071af838021))

# [1.236.0-cold-803.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.6...v1.236.0-cold-803.7) (2024-06-13)


### Features

* Added component attribute to compliance responses repository ([e704fe8](https://github.com/ColdPBC/cold-monorepo/commit/e704fe806f362bd839e29d886d9a077a5294f93f))

# [1.236.0-cold-803.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.5...v1.236.0-cold-803.6) (2024-06-13)


### Features

* add 'bookmarks' field to interface, update scoringService calls ([3a347a1](https://github.com/ColdPBC/cold-monorepo/commit/3a347a127c5fcf6471d0d864874fcda92daac83b))
* added `forwardRef` in scoring.module.ts ([24b09a4](https://github.com/ColdPBC/cold-monorepo/commit/24b09a4424edb13b6391ae857a91bc43c1981eb3))
* enhance scoring service in the compliance module ([e44bdd1](https://github.com/ColdPBC/cold-monorepo/commit/e44bdd11c9b321329f0e4249b652864f8a1c0561))
* Update examples and sections in openapi JSON schema ([f903678](https://github.com/ColdPBC/cold-monorepo/commit/f903678318d0992864c313e53631eb9d0e02f457))

# [1.236.0-cold-803.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.4...v1.236.0-cold-803.5) (2024-06-12)


### Features

* Add additional exports to Nest module ([c4d7482](https://github.com/ColdPBC/cold-monorepo/commit/c4d7482e6db924e35403857e5d9886001b8a7601))
* Add ComplianceQuestionBookmarksRepository to ComplianceRepositoryModule ([58f663c](https://github.com/ColdPBC/cold-monorepo/commit/58f663cd14b8e7d6715c488dfaa9874b579ef56b))
* Add rubric to compliance responses repository ([6ead069](https://github.com/ColdPBC/cold-monorepo/commit/6ead069cf4238c59c7336ac788a38144fc35352d))
* Enhance compliance question bookmark repository code ([cf49e82](https://github.com/ColdPBC/cold-monorepo/commit/cf49e82ccdddfdf73ce1be9544af679ef6cc3b24))
* Refactor organization compliance bookmarks to compliance question bookmarks ([ccfa1c7](https://github.com/ColdPBC/cold-monorepo/commit/ccfa1c7c4663e42e559aa4ec5bc12fba0cfb372f))
* Update filtering.service in nest lib for compliance filtering ([cdcb17b](https://github.com/ColdPBC/cold-monorepo/commit/cdcb17bd83ccf5ca9a84373ae399c1d8f11891c7))

# [1.236.0-cold-803.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.3...v1.236.0-cold-803.4) (2024-06-12)


### Features

* Update OrganizationComplianceBookmarks module and service ([3bebd69](https://github.com/ColdPBC/cold-monorepo/commit/3bebd69a783c7489d6e633472281649e7108c1ba))

# [1.236.0-cold-803.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.2...v1.236.0-cold-803.3) (2024-06-12)


### Features

* Add ComplianceQuestionBookmarksRepository in nest lib ([9fd4fee](https://github.com/ColdPBC/cold-monorepo/commit/9fd4feeeb5137de5a50aac8a7a6d9b69a5032388))
* Added 'responses' parameter to organization compliance responses controller ([c8109ef](https://github.com/ColdPBC/cold-monorepo/commit/c8109ef8f5a44ae39766f0ed427c78ad01c76644))
* Added ComplianceQuestionBookmarksRepository to compliance-repository.module ([3032920](https://github.com/ColdPBC/cold-monorepo/commit/3032920433d29df1c11f8d50b08b20e3d5950744))
* Added new enum to compliance ([2dafdc9](https://github.com/ColdPBC/cold-monorepo/commit/2dafdc94dadbe0b1fc3266a4a11ac78aac3b47d1))

# [1.236.0-cold-803.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.236.0-cold-803.1...v1.236.0-cold-803.2) (2024-06-12)


### Bug Fixes

* Dependency injection issue ([49e89cf](https://github.com/ColdPBC/cold-monorepo/commit/49e89cf5139d8c6286980a1615cc5ee5017d40dc))


### Features

* Add FilteringModule to ScoringModule in nest library ([ffd3292](https://github.com/ColdPBC/cold-monorepo/commit/ffd32926557b0da0f3a85abbb530b195abe4d7b1))
* add options parameter to scoring methods in scoring.service ([09d32ed](https://github.com/ColdPBC/cold-monorepo/commit/09d32ed6b590b9b52fb2807f3071a13c9dd5ff5c))
* Enhance filtering functionality in Filtering Service ([08ccb82](https://github.com/ColdPBC/cold-monorepo/commit/08ccb826d57a233217e4a96bd68e4bf95d2fee6c))
* Integrate FilteringService into chat.service.ts ([d0f5d2c](https://github.com/ColdPBC/cold-monorepo/commit/d0f5d2c49b14e154ba6607351475ed3fd18d6e0a))
* Refactor compliance response repository to use organization object ([94e88fd](https://github.com/ColdPBC/cold-monorepo/commit/94e88fdf5e7781dbe821bb26d6aed01303158b3f))
* Refactor organization compliance response service ([0fe23d0](https://github.com/ColdPBC/cold-monorepo/commit/0fe23d0c6fc3e4538ffae3510caea99679710a8f))
* Update organization compliance responses controller ([0fb3772](https://github.com/ColdPBC/cold-monorepo/commit/0fb37726a964b430267403a03466b44639e60c1f))

# [1.236.0-cold-803.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.235.0...v1.236.0-cold-803.1) (2024-06-11)


### Features

* Add new FilteringService and module in compliance lib ([140e7c9](https://github.com/ColdPBC/cold-monorepo/commit/140e7c9bb95d018ecd2f5ee707d2cb3bbbb39b7b))
* Import and utilize ComplianceDataModule in NestModule ([aa15a97](https://github.com/ColdPBC/cold-monorepo/commit/aa15a970d98190f6bee778b69409efbeb1dde011))
* Update ComplianceQuestionsRepository ([924a7e5](https://github.com/ColdPBC/cold-monorepo/commit/924a7e518a27685a781c5dd06db7891e722222fa))

# [1.235.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.234.0...v1.235.0) (2024-06-10)


### Features

* Update 'app.module.ts' and 'rabbit.service.ts' and remove unused service configurations ([576be93](https://github.com/ColdPBC/cold-monorepo/commit/576be93d1447408704c47127f86a54e0856c0d62))

# [1.234.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.233.1...v1.234.0) (2024-06-10)


### Features

* update emission ID generation and handle estimate data absence ([56a2de4](https://github.com/ColdPBC/cold-monorepo/commit/56a2de45608a5565bec5d4bd330ec76f26b344d9))

## [1.233.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.233.0...v1.233.1) (2024-06-10)


### Bug Fixes

* update import path and variable in compliance_definitions ([#445](https://github.com/ColdPBC/cold-monorepo/issues/445)) ([58b86e8](https://github.com/ColdPBC/cold-monorepo/commit/58b86e8d12d4d59230d877776c2c1b844b3de673))

# [1.233.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.232.0...v1.233.0) (2024-06-10)


### Bug Fixes

* ensure non-null and non-empty ai_response answer in survey filter service ([365a693](https://github.com/ColdPBC/cold-monorepo/commit/365a693d9f59d1484ad772754962cc3f2b4935e2))


### Features

* Add exception for missing website parameter in crawler controller ([ec96e07](https://github.com/ColdPBC/cold-monorepo/commit/ec96e073bf267e9a108718c93fb5b37dfeaea2e4))
* Add methods to score compliance questions ([f300469](https://github.com/ColdPBC/cold-monorepo/commit/f300469b1c832b67b6100beef80a5a6f21c8e10a))
* Add new column to organization_files table ([ec55a5c](https://github.com/ColdPBC/cold-monorepo/commit/ec55a5c95f8475e381a3c9dadff1abb70e70dd24))
* Add new fields to Prisma schema file ([f14c1df](https://github.com/ColdPBC/cold-monorepo/commit/f14c1dffa3d0bda9b09b809c39913d4cbd16877f))
* Add openai_vector_file_status column to organization_files ([ea22d86](https://github.com/ColdPBC/cold-monorepo/commit/ea22d86962a49cfb9e5738eae628bdcc80a1ec42))
* Add scoring to compliance responses and add additional flags ([26730d1](https://github.com/ColdPBC/cold-monorepo/commit/26730d152161659cb8308d75bbc44aa8d420a49f))
* Enhance OrganizationComplianceNotesController routing and functionality ([c262bfb](https://github.com/ColdPBC/cold-monorepo/commit/c262bfb359a6402ad2bd095aefb71b30df159241))
* Ignore typescript error and update chat controller ([343d64f](https://github.com/ColdPBC/cold-monorepo/commit/343d64fd2a53d8c4090140302d97c4113a26d647))
* Implement compliance scoring and assessment system ([28bf205](https://github.com/ColdPBC/cold-monorepo/commit/28bf205d6fe2ce6b9a2906403f50fe94515279ad))
* Improve chat functionality and context handling in OpenAI ([e23674d](https://github.com/ColdPBC/cold-monorepo/commit/e23674dc58a20ee66aa9d1182f204166040c12fd))
* integrate ColdRabbitModule and EventsModule in app.module ([f783475](https://github.com/ColdPBC/cold-monorepo/commit/f78347535f9c2aa9d0c2e85354ff3535507f25ad))
* Reduce getContext proportion in chat.controller ([f760b84](https://github.com/ColdPBC/cold-monorepo/commit/f760b8430c0df7d63a9dfbb1144483b21ad310a0))
* Update exports in Crawler module ([f181859](https://github.com/ColdPBC/cold-monorepo/commit/f1818594975db85c4653cadb8d959aa8a98044e3))
* Update minScore default value in getContext function in Pinecone service ([10b9a94](https://github.com/ColdPBC/cold-monorepo/commit/10b9a94cefd2d97891ce9990f6b6f62947f1bee9))
* Update OpenAI integration to use vector stores ([c7d1633](https://github.com/ColdPBC/cold-monorepo/commit/c7d1633b4a5bf25234ab001b7b50f21de8aa30d0))
* update Organization Compliance Service to include AI activation ([fe1eb56](https://github.com/ColdPBC/cold-monorepo/commit/fe1eb5649b9e6b76cddf41a17e7dbf228f9ff933))
* Update reference properties in assistant tools ([5df0d90](https://github.com/ColdPBC/cold-monorepo/commit/5df0d9064db225eb360d4be9fa24690a58692ab0))
* Update the endpoint for activating AI in organization compliance ([5d3b3b7](https://github.com/ColdPBC/cold-monorepo/commit/5d3b3b7dfd0e6e269ac4f2484ffc3f167ab40b73))
* Update typescript compile options in tsconfig files ([b3344b6](https://github.com/ColdPBC/cold-monorepo/commit/b3344b66cc1d30c6bd21522e10eabdbddbce9f04))
* Updated openapi.json with compliance related changes ([843de6a](https://github.com/ColdPBC/cold-monorepo/commit/843de6a47a85ffcef6dcd82b3c5d2daf91009aba))

# [1.233.0-cold-810.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.232.0...v1.233.0-cold-810.1) (2024-06-05)


### Features

* Add methods to score compliance questions ([f300469](https://github.com/ColdPBC/cold-monorepo/commit/f300469b1c832b67b6100beef80a5a6f21c8e10a))
* Implement compliance scoring and assessment system ([28bf205](https://github.com/ColdPBC/cold-monorepo/commit/28bf205d6fe2ce6b9a2906403f50fe94515279ad))

# [1.233.0-cold-810.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.232.0...v1.233.0-cold-810.1) (2024-06-05)


### Features

* Implement compliance scoring and assessment system ([28bf205](https://github.com/ColdPBC/cold-monorepo/commit/28bf205d6fe2ce6b9a2906403f50fe94515279ad))

# [1.232.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.231.0...v1.232.0) (2024-06-05)


### Features

* Updated code to generate CUID2 using GuidPrefixes enum ([19d8dc7](https://github.com/ColdPBC/cold-monorepo/commit/19d8dc73d20cce751e3abceb2eb1fba035a9ff40))

# [1.231.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.230.0...v1.231.0) (2024-06-03)


### Features

* Add async cache rebuild methods in surveys service ([4f1b91b](https://github.com/ColdPBC/cold-monorepo/commit/4f1b91bcfc19f7d71440976e1bd8c3652395eff8))
* Update importSurveyStructure method in ComplianceDefinitions service ([13294e8](https://github.com/ColdPBC/cold-monorepo/commit/13294e8b3766f0ad51d3d0a5bbdf509c16f2ee9f))

# [1.230.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.229.0...v1.230.0) (2024-06-02)


### Features

* Added Prisma extension for soft delete ([c05cd7a](https://github.com/ColdPBC/cold-monorepo/commit/c05cd7a9ef5baf693a4849cf8e0c48a3bc576951))

# [1.229.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.228.0...v1.229.0) (2024-06-02)


### Features

* Conditionally run seeding commands in main.ts based on environment variable ([f44e062](https://github.com/ColdPBC/cold-monorepo/commit/f44e062534a09943d6d15889b6d664094a89d1bc))

# [1.228.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.227.0...v1.228.0) (2024-06-02)


### Bug Fixes

* ensure job timestamps do not cause errors due to undefined values ([d7267a0](https://github.com/ColdPBC/cold-monorepo/commit/d7267a06503220f559589a691767283b1a6e9a77))
* prevent deletion of assistants with no name in controller ([d8bd1e3](https://github.com/ColdPBC/cold-monorepo/commit/d8bd1e347bcd07a96e9a0cd490d54ba9e06a05b9))


### Features

* Add advanced compliance response operations to controller ([2abd232](https://github.com/ColdPBC/cold-monorepo/commit/2abd232dd9730bca28fcd455451fd19a409d6293))
* Add Compliance AI Response Files Repository with CRUD operations ([3161f2f](https://github.com/ColdPBC/cold-monorepo/commit/3161f2f3f0b9bc92eb77e8262403525c809bdaa8))
* Add compliance section groups repository ([f8a3922](https://github.com/ColdPBC/cold-monorepo/commit/f8a3922bddbd3f20eb23f253acee61735d0df64d))
* Add ComplianceDefinitionsRepository with fetch and delete methods ([cba8759](https://github.com/ColdPBC/cold-monorepo/commit/cba87599f36c69af98be875e316b1fa363759a17))
* Add ComplianceQuestionsExtendedDto class ([cb4771a](https://github.com/ColdPBC/cold-monorepo/commit/cb4771a64eff07ad3f413c442fbe32c89c95d394))
* Add ComplianceRepositoryModule to compliance-definitions.module imports ([2b88446](https://github.com/ColdPBC/cold-monorepo/commit/2b884464d1c894ec7ab2e78b29c351428ddde24a))
* Add ComplianceSectionGroupsExtendedDto in compliance_section_groups ([b21f4f6](https://github.com/ColdPBC/cold-monorepo/commit/b21f4f61f3d70c8a1d56f156eab96aa8bf99f797))
* Add ComplianceSectionGroupsModule and Controller in compliance definitions ([48a113d](https://github.com/ColdPBC/cold-monorepo/commit/48a113dbee0c78d4053918cfdb3ede5debd671e9))
* Add ComplianceSectionGroupsService in cold-api ([9910032](https://github.com/ColdPBC/cold-monorepo/commit/9910032f7433caf8e922d4532ea82368b4a35e65))
* Add ComplianceSections controller for compliance module ([4950cc5](https://github.com/ColdPBC/cold-monorepo/commit/4950cc5b6cc19135bbd8d1adbacd4dd6fab2ed20))
* Add ComplianceSectionsExtendedDto ([0a1800e](https://github.com/ColdPBC/cold-monorepo/commit/0a1800ea5b7b6e15901a9ce4bb432579cbf1ce12))
* Add ComplianceSectionsService in cold-api ([d357dec](https://github.com/ColdPBC/cold-monorepo/commit/d357dec9ec3078fd09a3953ec11a44909626d5a6))
* Add createAiResponses method to compliance-ai-responses.repository.ts and relocate file to new directory ([7fa0955](https://github.com/ColdPBC/cold-monorepo/commit/7fa0955d2afc29e3321b316c79d496755495e02d))
* Add enableShutdownHooks function in Prisma service ([48f23fd](https://github.com/ColdPBC/cold-monorepo/commit/48f23fd01a8dafc7b889d5766676431fcbb36856))
* Add endpoint to fetch all compliance responses ([a77c59a](https://github.com/ColdPBC/cold-monorepo/commit/a77c59a8f6107016013a992024f70025e725af4a))
* Add endpoints for compliance definitions and their operations in `compliance-definitions.controller.ts` ([2e57532](https://github.com/ColdPBC/cold-monorepo/commit/2e57532e37a1ab9dba211e404192cded7462018d))
* Add exception handling for missing OpenAI Service Definition ([7af34e5](https://github.com/ColdPBC/cold-monorepo/commit/7af34e5c0098b3bbba44f86a2cdaca682c93b66b))
* add fallback for unspecified NODE_ENV in Freeplay service ([0b70d17](https://github.com/ColdPBC/cold-monorepo/commit/0b70d17ba17f2e6fbefe4e65b5a08aafb6f74c5d))
* Add improvements to ComplianceResponsesRepository ([5e37c89](https://github.com/ColdPBC/cold-monorepo/commit/5e37c89a7d48489e13e548b85248bda320f440e7))
* add job existence check in shouldContinueCrawling method ([2b1f924](https://github.com/ColdPBC/cold-monorepo/commit/2b1f9249dfde25c91c6bb125df2c140e9d27a16e))
* Add method to fetch all Compliance Responses by Compliance ([b24da3b](https://github.com/ColdPBC/cold-monorepo/commit/b24da3b44e450b6042e90617d55cd0c5c8f002b7))
* add MqttService and ComplianceSectionsCacheRepository to JobConsumer in cold-platform-openai ([3840655](https://github.com/ColdPBC/cold-monorepo/commit/3840655ed076e840ad4462909d1a4512c3abac02))
* Add new ComplianceQuestionsController with CRUD operations ([a8f4fba](https://github.com/ColdPBC/cold-monorepo/commit/a8f4fba0315aba0701057b4d52089b773fde844a))
* add openApiYml script to package.json and fix openApi script ([929aad4](https://github.com/ColdPBC/cold-monorepo/commit/929aad4c951fcfe00d5f8ecf55a77a4959524cf1))
* Add option to get compliance responses by organization name or id ([5a1f517](https://github.com/ColdPBC/cold-monorepo/commit/5a1f51779ea6d1b978783b0ca827ff90aa44a731))
* Add OrganizationsRepository for managing organizations ([df4cc52](https://github.com/ColdPBC/cold-monorepo/commit/df4cc52f7e230ce0312497ebc21108c6e49629dc))
* Add soft delete support to various tables in prisma schema ([994c12d](https://github.com/ColdPBC/cold-monorepo/commit/994c12dddf73b84d8751f913b612125cd34b2db5))
* Add user parameter to updateSection method in ComplianceSections repository ([bc04e53](https://github.com/ColdPBC/cold-monorepo/commit/bc04e53d086a7a8f0d19325a10d7a57bc8f41452))
* add user to getFilteredSectionsList function for logging ([bf68a03](https://github.com/ColdPBC/cold-monorepo/commit/bf68a03659e45f8a224c61e24081ace3af2303d3))
* Add yaml and json document URLs to Swagger config module ([4d419d6](https://github.com/ColdPBC/cold-monorepo/commit/4d419d663131d716e9253f12294e59224f80ba6a))
* Added new extended Prisma client to enable soft-delete ([489c970](https://github.com/ColdPBC/cold-monorepo/commit/489c9700c789e56954304f6bcde60e6cb64f2ece))
* Deleted compliance_questions controller and service, added ComplianceSet module ([00882f0](https://github.com/ColdPBC/cold-monorepo/commit/00882f0a0fec383bdc3a6d3a48fe8d822968070f))
* Enhance compliance AI response repository ([07d4a77](https://github.com/ColdPBC/cold-monorepo/commit/07d4a7731c021a2dd85dd203eddc25a1c2f87781))
* Enhance compliance section repository operations ([52a6d91](https://github.com/ColdPBC/cold-monorepo/commit/52a6d91851f18a2077d56b5ae327f2fea19b304b))
* Enhance error handling and data validity in Pinecone service ([52e6b47](https://github.com/ColdPBC/cold-monorepo/commit/52e6b479b04a8b446ce40bcaf87768ad5fea0001))
* Enhance security and swagger documentation in ComplianceSectionGroups controller ([b4004b8](https://github.com/ColdPBC/cold-monorepo/commit/b4004b8e4d0b8a70a15afc5ce9bf811919e33422))
* Enhanced ComplianceQuestionsRepository with additional methods and updated existing methods ([6ce12d5](https://github.com/ColdPBC/cold-monorepo/commit/6ce12d5d3ea45e453ce5c7e27c8ea4cf498dffcf))
* Expand ComplianceAiResponsesRepository with update, get and delete methods ([4f3ed3b](https://github.com/ColdPBC/cold-monorepo/commit/4f3ed3bc133a7dafb2c2d499b58939bba7db5b3f))
* Handle file not found error in langchain loader service ([e74d3d2](https://github.com/ColdPBC/cold-monorepo/commit/e74d3d24ebb31a32bad7db82c72a60de41102ef3))
* Handle unknown component in survey section item ([bc322b3](https://github.com/ColdPBC/cold-monorepo/commit/bc322b3fee7740b5d1481ddef602c6d34d52b401))
* implement ComplianceSectionsRepository, refactor injectSurvey method to use name & add findSections method ([769d437](https://github.com/ColdPBC/cold-monorepo/commit/769d437190453c511b4c209b2aaabdd126d286a4))
* Implement organization compliance statuses functionality ([20d858c](https://github.com/ColdPBC/cold-monorepo/commit/20d858cd8e7af8f8ea9ac4569c06916b110ec8a2))
* Improve logging for expired tokens and reduce token cache ttl ([23b01ac](https://github.com/ColdPBC/cold-monorepo/commit/23b01ac3dee56550dd0974e38ae89f6453769c46))
* Improve organization identifier handling in compliance AI response file repository ([3f5f5c4](https://github.com/ColdPBC/cold-monorepo/commit/3f5f5c4dce85d2b615dbafc373fe92d8f527f7ee))
* Remove ComplianceSectionGroupsRepository file ([b168915](https://github.com/ColdPBC/cold-monorepo/commit/b168915e19f6d1bfa4d1836f73ffdd4885a77278))
* Remove entity and relations for compliance and organization modules ([6cec382](https://github.com/ColdPBC/cold-monorepo/commit/6cec3829cedd1bbda9424939d65313743823235a))
* Update environment variables for development configuration ([e4412b4](https://github.com/ColdPBC/cold-monorepo/commit/e4412b4ba645c330e478d2ee7ad4b64a5a552093))
* Update OpenAPI decorator to generate comprehensive mock data ([1f45bd9](https://github.com/ColdPBC/cold-monorepo/commit/1f45bd921206042feae846ddb317242155133c7f))
* Update org-user-interceptor to handle organization name ([e854bdf](https://github.com/ColdPBC/cold-monorepo/commit/e854bdf4dc35b4f9792d22b89aabef8a8708ba2f))
* Update organization.controller in API for improved routing and footprint service integration ([bf483e2](https://github.com/ColdPBC/cold-monorepo/commit/bf483e216b7c8f358976878582a2fc6975806e83))
* update OrganizationCompliance route and add user role guard ([4bd0cf8](https://github.com/ColdPBC/cold-monorepo/commit/4bd0cf8923dd9b490f66b9cce8d6c6047dd35b7f))
* Update parameter list in complianceSectionsService's update method ([5738627](https://github.com/ColdPBC/cold-monorepo/commit/57386277e845efc3a7ef089655eb7737f6773a73))
* update typecasting in xls.loader ([f8d9de4](https://github.com/ColdPBC/cold-monorepo/commit/f8d9de4c472aee647e63738be2f01282c0001223))
* Update TypeScript configuration in cold-platform-openai ([80dcc82](https://github.com/ColdPBC/cold-monorepo/commit/80dcc82232f4e549bec6be6c38b3cb917b9dd988))
* Updated openapi specification ([c5a519c](https://github.com/ColdPBC/cold-monorepo/commit/c5a519ce4121a077b8670b1aa88198cf8c0c415d))
* Updated services, controller, and module for AI Compliance Responses ([90b6276](https://github.com/ColdPBC/cold-monorepo/commit/90b6276d7399e8de5a02c0f649a86e761f501545))
* Use filtered question list in organization compliance responses module ([2c90c77](https://github.com/ColdPBC/cold-monorepo/commit/2c90c77009bd1ad2a7bd021190134b49aaddf054))

# [1.227.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.226.1...v1.227.0) (2024-05-24)


### Features

* add opacity and brigthness animation to ai question processing ([ec9945f](https://github.com/ColdPBC/cold-monorepo/commit/ec9945f81224174ed10d26b419dba01f9cae901c))
* dont change status when overview modal is open and handle AI progress when running ([acd13ef](https://github.com/ColdPBC/cold-monorepo/commit/acd13ef158ceae96ca94f65777e99a62df3db5cc))
* send publish method to get new questions when ai has updates ([8d236e5](https://github.com/ColdPBC/cold-monorepo/commit/8d236e5406a35446c7c621274bc7e0a55618175e))

## [1.226.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.226.0...v1.226.1) (2024-05-24)


### Bug Fixes

* question joins ([9162413](https://github.com/ColdPBC/cold-monorepo/commit/91624130bca19d495d1462fd3d0cbbd3b41fbbcb))

# [1.226.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.225.2...v1.226.0) (2024-05-23)


### Bug Fixes

* fix loader incorrectly appearing when no documents are uploaded ([0323477](https://github.com/ColdPBC/cold-monorepo/commit/0323477066d229702eead7dd7a0d134292cf1fed))


### Features

* add error boundary to compliance manager components ([b969f1d](https://github.com/ColdPBC/cold-monorepo/commit/b969f1d57b9abbf0827f53445061c081f1e3a6f8))
* changes to handle ai status updates ([bebe404](https://github.com/ColdPBC/cold-monorepo/commit/bebe4040c97262ff97b9bf156ab1cea7dda2ee43))
* changes to handle different flow guide and manager states ([21becc0](https://github.com/ColdPBC/cold-monorepo/commit/21becc0bb7d8e0ae84840e9add8a12d9be71c845))
* handle document upload ([bda8d4b](https://github.com/ColdPBC/cold-monorepo/commit/bda8d4b5baacc87a8e2b999347ac28c6a23dd9a7))
* handle new compliance MQTT data ([baf5a57](https://github.com/ColdPBC/cold-monorepo/commit/baf5a57566e649395337cdd3aecaafad06625b5f))
* handle user submitted status ([95b421a](https://github.com/ColdPBC/cold-monorepo/commit/95b421a26fc2432d2cf17a031a2f4851cf8de7d6))
* initial changes ([e157f6e](https://github.com/ColdPBC/cold-monorepo/commit/e157f6ee4d632e2cc71079837829a0b46b466c0e))
* update api reply topic to send to correct one ([b791fa1](https://github.com/ColdPBC/cold-monorepo/commit/b791fa10653477061d719a4df01204a5e13b0e4b))

## [1.225.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.225.1...v1.225.2) (2024-05-21)


### Bug Fixes

* final issue with incorrect counts ([#437](https://github.com/ColdPBC/cold-monorepo/issues/437)) ([1cd1d0b](https://github.com/ColdPBC/cold-monorepo/commit/1cd1d0b2874761f4c0c957372c4a352e32395849))
* properly process array values in dependency filter ([581d8a9](https://github.com/ColdPBC/cold-monorepo/commit/581d8a9a6100043e17cdfbec962c1c5fe467fd4a))

## [1.225.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.225.0...v1.225.1) (2024-05-21)


### Bug Fixes

* issue causing inaccurate results from being returned ([99b7330](https://github.com/ColdPBC/cold-monorepo/commit/99b733019c7644ab451ad318308147643ca1fd83))

# [1.225.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.224.0...v1.225.0) (2024-05-21)


### Features

* add visible filter to compliance page ([0f20977](https://github.com/ColdPBC/cold-monorepo/commit/0f209771d0e6acf10340c994a7a0adbc5fc26cc5))
* also filter on new compliance page ([a43e8c7](https://github.com/ColdPBC/cold-monorepo/commit/a43e8c7880822cac781d0c8da2283d77123837ac))

# [1.224.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.223.1...v1.224.0) (2024-05-21)


### Features

* handle new api data structures ([1114ff5](https://github.com/ColdPBC/cold-monorepo/commit/1114ff5f9d7e4fe7981ace0b9e41afec81da5d60))
* handle spacing when section group collapse is closed ([c2ff708](https://github.com/ColdPBC/cold-monorepo/commit/c2ff7088a7470e8871ef6da9868e372ed1b2a63e))
* pass in organization id to question list for filtering ([25b387b](https://github.com/ColdPBC/cold-monorepo/commit/25b387b542fae1898beffb563b8c9cf77885f631))

## [1.223.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.223.0...v1.223.1) (2024-05-21)


### Bug Fixes

* getQuestionList was not filtering on orgId in joins ([501fc20](https://github.com/ColdPBC/cold-monorepo/commit/501fc205ab62300f9e9727f753bd797000f717d3))

# [1.223.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.222.0...v1.223.0) (2024-05-15)


### Features

* Add ComplianceSectionsCacheRepository and implement getFilteredSectionList in organizations.mqtt.service ([2219c30](https://github.com/ColdPBC/cold-monorepo/commit/2219c30463c54e21515a48f4b98f8ab331fefd24))
* Add methods to create, update compliance questions in repository ([a85e31d](https://github.com/ColdPBC/cold-monorepo/commit/a85e31d74ef57bf7411b093a878acb123beba315))
* Added a ComplianceSectionsCacheRepository to manage compliance sections data ([d49e3ce](https://github.com/ColdPBC/cold-monorepo/commit/d49e3ceb025e73b7238db2f04178a4d2f7af163a))

# [1.222.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.221.0...v1.222.0) (2024-05-15)


### Bug Fixes

* place new compliance flow behind feature flag ([c49173d](https://github.com/ColdPBC/cold-monorepo/commit/c49173d2ec77d1b38cc7a5ebf81774461c70f550))


### Features

* Add code to create compliance question dependency chains. ([90a6e30](https://github.com/ColdPBC/cold-monorepo/commit/90a6e30629a1c729486c58e209ba45c5768a0cdb))
* Add code to create compliance question dependency chains. ([ab5e3b8](https://github.com/ColdPBC/cold-monorepo/commit/ab5e3b818c43020e044ca83392e19ea50d23b035))
* Add compliance export to nest library index ([00cd102](https://github.com/ColdPBC/cold-monorepo/commit/00cd1022cbf3c00006794d65a66425d03b2a07e6))
* Add compliance services and repositories to chat module ([ca87b5e](https://github.com/ColdPBC/cold-monorepo/commit/ca87b5e2222cfa4c52ca0291e01c005133c639a7))
* Add ComplianceAiResponsesRepository and its spec test ([bc109b8](https://github.com/ColdPBC/cold-monorepo/commit/bc109b87db00f6c1f370164122ef806991f77040))
* add ComplianceModule to app.module in cold-platform-openai ([9ca5299](https://github.com/ColdPBC/cold-monorepo/commit/9ca52995f1f6c5e8261b66f8ea4951108f63ee9b))
* Add ComplianceResponsesRepository and associated spec file ([d423126](https://github.com/ColdPBC/cold-monorepo/commit/d423126fd1824febd2fb5b1e17142f9e9244b9db))
* Add ComplianceSectionService and corresponding unit test ([4ccc638](https://github.com/ColdPBC/cold-monorepo/commit/4ccc6382ec46403ff410f2c1c846ef52f5e0ce23))
* Add dependency filter to compliance sections repository ([3774964](https://github.com/ColdPBC/cold-monorepo/commit/377496450180bf58eade28d6ee1c24d564afb5d6))
* Add new types for compliance responses in the compliance repository ([c6d434c](https://github.com/ColdPBC/cold-monorepo/commit/c6d434c5941fc11227bfdfd2f3e25c25815ea803))
* Add optional secrets parameter in ColdCacheModule forRootAsync method and fallback to using SecretsService if not provided ([b821e5d](https://github.com/ColdPBC/cold-monorepo/commit/b821e5ddce85f21dbf2ccafdf97891a0795dd716))
* Added new type definition for compliance status handling ([702aefb](https://github.com/ColdPBC/cold-monorepo/commit/702aefb2bc3364c8537bc263b19c60fc4bdf24b4))
* Extend compliance module for new features. Add PrismaModule, ColdCacheModule, ComplianceAiResponsesRepository and ComplianceResponsesRepository to ComplianceModule. ([bbd7dec](https://github.com/ColdPBC/cold-monorepo/commit/bbd7dec0c0f3727136c1a1a555786ceaa348f0b5))
* Implemented compliance sections and responses repositories in chat service ([002cbde](https://github.com/ColdPBC/cold-monorepo/commit/002cbde1180793b6e0ee2a1d04c8bdbfd9235124))
* Modify 'value' column in 'organization_compliance_responses' to JSONB type ([6a44ee4](https://github.com/ColdPBC/cold-monorepo/commit/6a44ee4bbd71f8bbe12a89184d1676899162969e))
* refactor dependency chain relations for compliance sections and questions ([bdbcd4d](https://github.com/ColdPBC/cold-monorepo/commit/bdbcd4d8b16e6e1997cef31bb733837087d08317))
* Split compliance dependency chains into distinct tables ([73593d2](https://github.com/ColdPBC/cold-monorepo/commit/73593d2d467073a825aba487236e023d84f80e52))
* Update ComplianceQuestionsRepository to include calculation of metrics ([a95b1ed](https://github.com/ColdPBC/cold-monorepo/commit/a95b1ed7fd68321409d2137a9c2af78246b36ddd))
* Upgrade ComplianceSectionsRepository with caching functionality ([41c9ec3](https://github.com/ColdPBC/cold-monorepo/commit/41c9ec3414eeef8fe19e79814aa646789ed237cf))

# [1.219.0-cold-790.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-790.3...v1.219.0-cold-790.4) (2024-05-15)


### Bug Fixes

* place new compliance flow behind feature flag ([c49173d](https://github.com/ColdPBC/cold-monorepo/commit/c49173d2ec77d1b38cc7a5ebf81774461c70f550))


### Features

* Add compliance services and repositories to chat module ([ca87b5e](https://github.com/ColdPBC/cold-monorepo/commit/ca87b5e2222cfa4c52ca0291e01c005133c639a7))
* Add ComplianceAiResponsesRepository and its spec test ([bc109b8](https://github.com/ColdPBC/cold-monorepo/commit/bc109b87db00f6c1f370164122ef806991f77040))
* add ComplianceModule to app.module in cold-platform-openai ([9ca5299](https://github.com/ColdPBC/cold-monorepo/commit/9ca52995f1f6c5e8261b66f8ea4951108f63ee9b))
* Add ComplianceResponsesRepository and associated spec file ([d423126](https://github.com/ColdPBC/cold-monorepo/commit/d423126fd1824febd2fb5b1e17142f9e9244b9db))
* Add ComplianceSectionService and corresponding unit test ([4ccc638](https://github.com/ColdPBC/cold-monorepo/commit/4ccc6382ec46403ff410f2c1c846ef52f5e0ce23))
* Add new types for compliance responses in the compliance repository ([c6d434c](https://github.com/ColdPBC/cold-monorepo/commit/c6d434c5941fc11227bfdfd2f3e25c25815ea803))
* Add optional secrets parameter in ColdCacheModule forRootAsync method and fallback to using SecretsService if not provided ([b821e5d](https://github.com/ColdPBC/cold-monorepo/commit/b821e5ddce85f21dbf2ccafdf97891a0795dd716))
* Added new type definition for compliance status handling ([702aefb](https://github.com/ColdPBC/cold-monorepo/commit/702aefb2bc3364c8537bc263b19c60fc4bdf24b4))
* Extend compliance module for new features. Add PrismaModule, ColdCacheModule, ComplianceAiResponsesRepository and ComplianceResponsesRepository to ComplianceModule. ([bbd7dec](https://github.com/ColdPBC/cold-monorepo/commit/bbd7dec0c0f3727136c1a1a555786ceaa348f0b5))
* Implemented compliance sections and responses repositories in chat service ([002cbde](https://github.com/ColdPBC/cold-monorepo/commit/002cbde1180793b6e0ee2a1d04c8bdbfd9235124))
* Upgrade ComplianceSectionsRepository with caching functionality ([41c9ec3](https://github.com/ColdPBC/cold-monorepo/commit/41c9ec3414eeef8fe19e79814aa646789ed237cf))

# [1.219.0-cold-790.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-790.2...v1.219.0-cold-790.3) (2024-05-14)


### Features

* Add additional data checks and error handling in compliance model seeding ([240e4b9](https://github.com/ColdPBC/cold-monorepo/commit/240e4b9432a824e28fe20fa39decee3672a956ef))
* Add code to create compliance question dependency chains. ([90a6e30](https://github.com/ColdPBC/cold-monorepo/commit/90a6e30629a1c729486c58e209ba45c5768a0cdb))
* Add code to create compliance question dependency chains. ([ab5e3b8](https://github.com/ColdPBC/cold-monorepo/commit/ab5e3b818c43020e044ca83392e19ea50d23b035))
* Add compliance export to nest library index ([00cd102](https://github.com/ColdPBC/cold-monorepo/commit/00cd1022cbf3c00006794d65a66425d03b2a07e6))
* Add dependency filter to compliance sections repository ([3774964](https://github.com/ColdPBC/cold-monorepo/commit/377496450180bf58eade28d6ee1c24d564afb5d6))
* Modify 'value' column in 'organization_compliance_responses' to JSONB type ([6a44ee4](https://github.com/ColdPBC/cold-monorepo/commit/6a44ee4bbd71f8bbe12a89184d1676899162969e))
* refactor dependency chain relations for compliance sections and questions ([bdbcd4d](https://github.com/ColdPBC/cold-monorepo/commit/bdbcd4d8b16e6e1997cef31bb733837087d08317))
* Split compliance dependency chains into distinct tables ([73593d2](https://github.com/ColdPBC/cold-monorepo/commit/73593d2d467073a825aba487236e023d84f80e52))
* Update ComplianceQuestionsRepository to include calculation of metrics ([a95b1ed](https://github.com/ColdPBC/cold-monorepo/commit/a95b1ed7fd68321409d2137a9c2af78246b36ddd))

# [1.219.0-cold-790.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-790.1...v1.219.0-cold-790.2) (2024-05-12)


### Features

* add util to get term string ([6fd5076](https://github.com/ColdPBC/cold-monorepo/commit/6fd507647076a6c20b12a8769f1428017d395022))
* handle mqtt mocks in storybook ([5777583](https://github.com/ColdPBC/cold-monorepo/commit/57775834de11512548b434732c0c04fab03f90a9))
* handle section groups, sections and questions using MQTT ([60b7f9f](https://github.com/ColdPBC/cold-monorepo/commit/60b7f9fa13b9f71ca6b55ac2b0b9b376fc32ded6))
* initial work for compliance manager page ([910001e](https://github.com/ColdPBC/cold-monorepo/commit/910001e817292c86a73b30e8ec22cd6296631e27))
* remove and update inverted and filed icons ([d57a4b7](https://github.com/ColdPBC/cold-monorepo/commit/d57a4b75651d4f2ad2775d5b2f1d60adbf7aca5d))
* remove old survey code ([e2a4538](https://github.com/ColdPBC/cold-monorepo/commit/e2a45384bce0a9007da88ee556010cfafff116d1))
* update application layout for the new management page ([87501d9](https://github.com/ColdPBC/cold-monorepo/commit/87501d91654cfc4dd72da8e435eef685f0d217d4))
* update handling of due date and term in compliance definition and not survey definition ([fab5aea](https://github.com/ColdPBC/cold-monorepo/commit/fab5aead5226e7887335173890300a3ff04698c0))

## [1.220.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.220.0...v1.220.1) (2024-05-14)


### Bug Fixes

* place new compliance flow behind feature flag ([2c26d71](https://github.com/ColdPBC/cold-monorepo/commit/2c26d7126d14fd8cd02cc6f1c8a724aa28c3b61e))

# [1.220.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0...v1.220.0) (2024-05-13)


### Bug Fixes

* correct typo in compliance_definition_name column in compliance_dependency_chains table ([90aa02b](https://github.com/ColdPBC/cold-monorepo/commit/90aa02b034c006ead06f10c2cc32b1b73fb070b8))


### Features

* Add additional data checks and error handling in compliance model seeding ([240e4b9](https://github.com/ColdPBC/cold-monorepo/commit/240e4b9432a824e28fe20fa39decee3672a956ef))
* Add compliance_dependency_chains model to Prisma schema and integrate it with existing models ([69e6406](https://github.com/ColdPBC/cold-monorepo/commit/69e640643be3f14386df04ab2ef3e5ea41b55523))
* Add ComplianceRepositoryModule to OrganizationComplianceResponsesModule imports ([3369515](https://github.com/ColdPBC/cold-monorepo/commit/336951517eb0f8d5f3046298d4e67b0d2e6ad460))
* Add dependencies filtering to getQuestionList function ([10ae00d](https://github.com/ColdPBC/cold-monorepo/commit/10ae00da7bdb94b726fa986f3fc6e1aaca460799))
* Added compliance dependency chain models in database migration ([5c4976e](https://github.com/ColdPBC/cold-monorepo/commit/5c4976eec9b0f6df7275c93f45df1c7f9b488153))
* Implement building of dependency chains in compliance model seeding ([2d7e611](https://github.com/ColdPBC/cold-monorepo/commit/2d7e611d7c4e3a24e84c3d16919fc2dc586b1809))

# [1.219.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.218.0...v1.219.0) (2024-05-12)


### Bug Fixes

* Add auto-increment function to "compliance_responses" table in Prisma migration ([aa399b6](https://github.com/ColdPBC/cold-monorepo/commit/aa399b6fd4d8deed76f74fdf0cbc64e6f0a97fa1))
* Alter table to change 'answer' column type to JSONB in 'organization_compliance_ai_responses' ([3d5bee7](https://github.com/ColdPBC/cold-monorepo/commit/3d5bee74962a1f0a41cd1e748f92a94fa1d7156b))
* change queries in the compliance repository for MQTT API ([ede5951](https://github.com/ColdPBC/cold-monorepo/commit/ede5951369c0e7956adb4ca703dcdae78dd5969c))
* correct typo in compliance_definition_name column in compliance_dependency_chains table ([90aa02b](https://github.com/ColdPBC/cold-monorepo/commit/90aa02b034c006ead06f10c2cc32b1b73fb070b8))
* fix issue where complianceQuestionListByOrgIdCompNameKey failed to return questions ([95bdd33](https://github.com/ColdPBC/cold-monorepo/commit/95bdd33d72bbda2ef284c2b5650afef9fa0f8d34))
* Make 'answer' column in 'organization_compliance_ai_responses' table nullable ([b85df35](https://github.com/ColdPBC/cold-monorepo/commit/b85df350b6ff598ca26b42e86b7ff7ef34e569f6))
* Make AI response ID optional in organization compliance responses table ([c6f35ec](https://github.com/ColdPBC/cold-monorepo/commit/c6f35ecb5d69c3419fb765e0b2b01d33fac08e99))
* Removed invalid unique key from compliance responses database table ([4678d9c](https://github.com/ColdPBC/cold-monorepo/commit/4678d9c22d9820d8a98476b362bcd57e258712fd))
* set 'references' and 'sources' columns in 'organization_compliance_ai_responses' table to optional ([3b8939e](https://github.com/ColdPBC/cold-monorepo/commit/3b8939e64bf5c82d66d3938921023dab6c41d377))
* update Amazon surveys list in seed_compliance_definitions.ts ([da5cb96](https://github.com/ColdPBC/cold-monorepo/commit/da5cb968da8e45c5fefe6c8f422d94e3097d1206))


### Features

* Add additional context field to organization_compliance_responses and organization_compliance_ai_responses in Prisma schema ([5d7776d](https://github.com/ColdPBC/cold-monorepo/commit/5d7776d85e4ad1cd74e4a4e3229c462c74ba223b))
* Add compliance flow handling in Rabbit service ([b6edc6d](https://github.com/ColdPBC/cold-monorepo/commit/b6edc6d99e637814195d2d0d40ae943da5415485))
* Add compliance processing to chat service in cold platform openai ([fc6a3a0](https://github.com/ColdPBC/cold-monorepo/commit/fc6a3a0c2c77621c02bed06824fec9161b4b2028))
* Add compliance_dependency_chains model to Prisma schema and integrate it with existing models ([69e6406](https://github.com/ColdPBC/cold-monorepo/commit/69e640643be3f14386df04ab2ef3e5ea41b55523))
* Add compliance_responses table with necessary fields, indices, and foreign key constraints. Added column to organization_compliance_responses table. ([dea7845](https://github.com/ColdPBC/cold-monorepo/commit/dea78456af0d52a7cba9646d0dba01a736d67f39))
* Add ComplianceRepositoryModule with repositories for managing compliance data ([981ac5a](https://github.com/ColdPBC/cold-monorepo/commit/981ac5afa160a997b117e747a5135546d9e00e8f))
* Add createComplianceSession method and ICFPSession interface to freeplay service ([76e1b95](https://github.com/ColdPBC/cold-monorepo/commit/76e1b955608ff5563b68035137fa2c0ee9d7ff4a))
* Add createComplianceSession method and ICFPSession interface to freeplay service ([8068bc4](https://github.com/ColdPBC/cold-monorepo/commit/8068bc40e4f517a0285850427040742e207a73aa))
* Add MQTT (socket API) service and RabbitMQ service to organizations module ([c359f5b](https://github.com/ColdPBC/cold-monorepo/commit/c359f5b19e0da45154daea12e5a7500bbcc8abc0))
* Add MqttModule and MqttService to ChatModule ([562bc2e](https://github.com/ColdPBC/cold-monorepo/commit/562bc2ee9b7a64d3f5f85e67e397263da99bc07f))
* Add optional survey_definition to ComplianceDefinition schema ([9753054](https://github.com/ColdPBC/cold-monorepo/commit/9753054137457e4a5b9a0ac258c76cf9dbe077ca))
* Add optional survey_definition to ComplianceDefinition schema ([3ac4cae](https://github.com/ColdPBC/cold-monorepo/commit/3ac4cae2ec8e452e253b3529af98c8f536507c8e))
* Add OrganizationComplianceResponseRabbit and MqttModule to OrganizationComplianceResponsesModule ([5578539](https://github.com/ColdPBC/cold-monorepo/commit/557853911b937cbdaf891120bd663a306fca2f09))
* Add OrganizationComplianceResponseRabbit for organization compliance response message handling ([90f89a1](https://github.com/ColdPBC/cold-monorepo/commit/90f89a1e6be33d83b3bdbe727ee30365718ebbad))
* Add unique composite key to organization_compliance_ai_response_files table ([e42ad95](https://github.com/ColdPBC/cold-monorepo/commit/e42ad95651039d3f9f3f0036c1c61eda84ad80ca))
* Add unique constraint to compliance_questions table in Prisma migration ([7b07d15](https://github.com/ColdPBC/cold-monorepo/commit/7b07d1503b34e0f474fcd1392ccc3e285b5ece1b))
* add unique constraint to organization_compliance_responses in prisma migrations ([7536133](https://github.com/ColdPBC/cold-monorepo/commit/75361338e2217a7af358b2a5102ce789d265e20e))
* Add unique key to organization compliance AI responses table ([513747b](https://github.com/ColdPBC/cold-monorepo/commit/513747b8cdf9a8e63c245e196dcad0194f34287a))
* Added compliance dependency chain models in database migration ([5c4976e](https://github.com/ColdPBC/cold-monorepo/commit/5c4976eec9b0f6df7275c93f45df1c7f9b488153))
* Added models for compliance responses and AI responses in schema.prisma ([dc92c25](https://github.com/ColdPBC/cold-monorepo/commit/dc92c25c0527370fcfc35d52c525501708058d65))
* Enable ComplianceRepository export in MqttModule ([5098ecc](https://github.com/ColdPBC/cold-monorepo/commit/5098eccb03e7aab4ac642808f0991629616d9b2c))
* Enhance MQTT service with replyTo function and packet details in onMessage callback ([5042c78](https://github.com/ColdPBC/cold-monorepo/commit/5042c78f9b52e36fbbbe007810af24d91d7ac3f3))
* Extend MQTT validator schemas and create new compliance schemas for various payload types ([b5270e2](https://github.com/ColdPBC/cold-monorepo/commit/b5270e24d19cfd7bf23cae41d2f04e87aabd34fd))
* Implement building of dependency chains in compliance model seeding ([2d7e611](https://github.com/ColdPBC/cold-monorepo/commit/2d7e611d7c4e3a24e84c3d16919fc2dc586b1809))
* Implement ComplianceRepository with methods for compliance data retrieval ([72c179d](https://github.com/ColdPBC/cold-monorepo/commit/72c179d3103cd1df71ff37f24226a6c28279f1e6))
* include organization_compliance_status in getOrgComplianceStatusGroups() ([acf2857](https://github.com/ColdPBC/cold-monorepo/commit/acf2857578ce9c58c936922ea430759524150137))
* migration script to add additional_context column to compliance_response models ([19d843a](https://github.com/ColdPBC/cold-monorepo/commit/19d843a140829ec8a8e7b797f7cfc09d5c29b8d3))
* Update service exports and remove MQTT Consumer ([10786ef](https://github.com/ColdPBC/cold-monorepo/commit/10786ef6b29e2a0a9bb7eaf7ad93dc4dae2c9e9b))

# [1.219.0-cold-789.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-789.5...v1.219.0-cold-789.6) (2024-05-12)


### Features

* Add ComplianceModule with repositories for managing compliance data ([981ac5a](https://github.com/ColdPBC/cold-monorepo/commit/981ac5afa160a997b117e747a5135546d9e00e8f))

# [1.219.0-cold-789.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-789.4...v1.219.0-cold-789.5) (2024-05-10)


### Bug Fixes

* fix issue where complianceQuestionListByOrgIdCompNameKey failed to return questions ([95bdd33](https://github.com/ColdPBC/cold-monorepo/commit/95bdd33d72bbda2ef284c2b5650afef9fa0f8d34))


### Features

* Add additional context field to organization_compliance_responses and organization_compliance_ai_responses in Prisma schema ([5d7776d](https://github.com/ColdPBC/cold-monorepo/commit/5d7776d85e4ad1cd74e4a4e3229c462c74ba223b))
* Add compliance flow handling in Rabbit service ([b6edc6d](https://github.com/ColdPBC/cold-monorepo/commit/b6edc6d99e637814195d2d0d40ae943da5415485))
* Add compliance processing to chat service in cold platform openai ([fc6a3a0](https://github.com/ColdPBC/cold-monorepo/commit/fc6a3a0c2c77621c02bed06824fec9161b4b2028))
* Add createComplianceSession method and ICFPSession interface to freeplay service ([76e1b95](https://github.com/ColdPBC/cold-monorepo/commit/76e1b955608ff5563b68035137fa2c0ee9d7ff4a))
* Add createComplianceSession method and ICFPSession interface to freeplay service ([8068bc4](https://github.com/ColdPBC/cold-monorepo/commit/8068bc40e4f517a0285850427040742e207a73aa))
* Add MqttModule and MqttService to ChatModule ([562bc2e](https://github.com/ColdPBC/cold-monorepo/commit/562bc2ee9b7a64d3f5f85e67e397263da99bc07f))
* Add optional survey_definition to ComplianceDefinition schema ([9753054](https://github.com/ColdPBC/cold-monorepo/commit/9753054137457e4a5b9a0ac258c76cf9dbe077ca))
* Add optional survey_definition to ComplianceDefinition schema ([3ac4cae](https://github.com/ColdPBC/cold-monorepo/commit/3ac4cae2ec8e452e253b3529af98c8f536507c8e))
* Add OrganizationComplianceResponseRabbit and MqttModule to OrganizationComplianceResponsesModule ([5578539](https://github.com/ColdPBC/cold-monorepo/commit/557853911b937cbdaf891120bd663a306fca2f09))
* Add OrganizationComplianceResponseRabbit for organization compliance response message handling ([90f89a1](https://github.com/ColdPBC/cold-monorepo/commit/90f89a1e6be33d83b3bdbe727ee30365718ebbad))
* Enable ComplianceRepository export in MqttModule ([5098ecc](https://github.com/ColdPBC/cold-monorepo/commit/5098eccb03e7aab4ac642808f0991629616d9b2c))
* migration script to add additional_context column to compliance_response models ([19d843a](https://github.com/ColdPBC/cold-monorepo/commit/19d843a140829ec8a8e7b797f7cfc09d5c29b8d3))

# [1.219.0-cold-789.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-789.3...v1.219.0-cold-789.4) (2024-05-08)


### Features

* include organization_compliance_status in getOrgComplianceStatusGroups() ([acf2857](https://github.com/ColdPBC/cold-monorepo/commit/acf2857578ce9c58c936922ea430759524150137))

# [1.219.0-cold-789.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-789.2...v1.219.0-cold-789.3) (2024-05-08)


### Bug Fixes

* change queries in the compliance repository for MQTT API ([ede5951](https://github.com/ColdPBC/cold-monorepo/commit/ede5951369c0e7956adb4ca703dcdae78dd5969c))

# [1.219.0-cold-789.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-cold-789.1...v1.219.0-cold-789.2) (2024-05-08)


### Features

* Update service exports and remove MQTT Consumer ([10786ef](https://github.com/ColdPBC/cold-monorepo/commit/10786ef6b29e2a0a9bb7eaf7ad93dc4dae2c9e9b))

# [1.219.0-cold-789.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.218.0...v1.219.0-cold-789.1) (2024-05-08)


### Bug Fixes

* Add auto-increment function to "compliance_responses" table in Prisma migration ([aa399b6](https://github.com/ColdPBC/cold-monorepo/commit/aa399b6fd4d8deed76f74fdf0cbc64e6f0a97fa1))
* Alter table to change 'answer' column type to JSONB in 'organization_compliance_ai_responses' ([3d5bee7](https://github.com/ColdPBC/cold-monorepo/commit/3d5bee74962a1f0a41cd1e748f92a94fa1d7156b))
* Make 'answer' column in 'organization_compliance_ai_responses' table nullable ([b85df35](https://github.com/ColdPBC/cold-monorepo/commit/b85df350b6ff598ca26b42e86b7ff7ef34e569f6))
* Make AI response ID optional in organization compliance responses table ([c6f35ec](https://github.com/ColdPBC/cold-monorepo/commit/c6f35ecb5d69c3419fb765e0b2b01d33fac08e99))
* Removed invalid unique key from compliance responses database table ([4678d9c](https://github.com/ColdPBC/cold-monorepo/commit/4678d9c22d9820d8a98476b362bcd57e258712fd))
* set 'references' and 'sources' columns in 'organization_compliance_ai_responses' table to optional ([3b8939e](https://github.com/ColdPBC/cold-monorepo/commit/3b8939e64bf5c82d66d3938921023dab6c41d377))
* update Amazon surveys list in seed_compliance_definitions.ts ([da5cb96](https://github.com/ColdPBC/cold-monorepo/commit/da5cb968da8e45c5fefe6c8f422d94e3097d1206))


### Features

* Add compliance_responses table with necessary fields, indices, and foreign key constraints. Added column to organization_compliance_responses table. ([dea7845](https://github.com/ColdPBC/cold-monorepo/commit/dea78456af0d52a7cba9646d0dba01a736d67f39))
* Add MQTT (socket API) service and RabbitMQ service to organizations module ([c359f5b](https://github.com/ColdPBC/cold-monorepo/commit/c359f5b19e0da45154daea12e5a7500bbcc8abc0))
* Add unique composite key to organization_compliance_ai_response_files table ([e42ad95](https://github.com/ColdPBC/cold-monorepo/commit/e42ad95651039d3f9f3f0036c1c61eda84ad80ca))
* Add unique constraint to compliance_questions table in Prisma migration ([7b07d15](https://github.com/ColdPBC/cold-monorepo/commit/7b07d1503b34e0f474fcd1392ccc3e285b5ece1b))
* add unique constraint to organization_compliance_responses in prisma migrations ([7536133](https://github.com/ColdPBC/cold-monorepo/commit/75361338e2217a7af358b2a5102ce789d265e20e))
* Add unique key to organization compliance AI responses table ([513747b](https://github.com/ColdPBC/cold-monorepo/commit/513747b8cdf9a8e63c245e196dcad0194f34287a))
* Added models for compliance responses and AI responses in schema.prisma ([dc92c25](https://github.com/ColdPBC/cold-monorepo/commit/dc92c25c0527370fcfc35d52c525501708058d65))
* Enhance MQTT service with replyTo function and packet details in onMessage callback ([5042c78](https://github.com/ColdPBC/cold-monorepo/commit/5042c78f9b52e36fbbbe007810af24d91d7ac3f3))
* Extend MQTT validator schemas and create new compliance schemas for various payload types ([b5270e2](https://github.com/ColdPBC/cold-monorepo/commit/b5270e24d19cfd7bf23cae41d2f04e87aabd34fd))
* Implement ComplianceRepository with methods for compliance data retrieval ([72c179d](https://github.com/ColdPBC/cold-monorepo/commit/72c179d3103cd1df71ff37f24226a6c28279f1e6))

# [1.218.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.217.2...v1.218.0) (2024-05-07)


### Features

* update handling of due date and term in compliance definition and not survey definition ([fab5aea](https://github.com/ColdPBC/cold-monorepo/commit/fab5aead5226e7887335173890300a3ff04698c0))

# [1.219.0-COLD-711.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.219.0-COLD-711.1...v1.219.0-COLD-711.2) (2024-05-09)


### Features

* handle mqtt mocks in storybook ([5777583](https://github.com/ColdPBC/cold-monorepo/commit/57775834de11512548b434732c0c04fab03f90a9))

# [1.219.0-COLD-711.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.218.0...v1.219.0-COLD-711.1) (2024-05-09)


### Features

* handle section groups, sections and questions using MQTT ([60b7f9f](https://github.com/ColdPBC/cold-monorepo/commit/60b7f9fa13b9f71ca6b55ac2b0b9b376fc32ded6))
* initial work for compliance manager page ([910001e](https://github.com/ColdPBC/cold-monorepo/commit/910001e817292c86a73b30e8ec22cd6296631e27))
* remove old survey code ([e2a4538](https://github.com/ColdPBC/cold-monorepo/commit/e2a45384bce0a9007da88ee556010cfafff116d1))
* update application layout for the new management page ([87501d9](https://github.com/ColdPBC/cold-monorepo/commit/87501d91654cfc4dd72da8e435eef685f0d217d4))

# [1.213.0-COLD-711.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.213.0-COLD-711.2...v1.213.0-COLD-711.3) (2024-05-09)


### Features

* update application layout for the new management page ([87501d9](https://github.com/ColdPBC/cold-monorepo/commit/87501d91654cfc4dd72da8e435eef685f0d217d4))

# [1.213.0-COLD-711.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.213.0-COLD-711.1...v1.213.0-COLD-711.2) (2024-05-08)


### Features

* handle section groups, sections and questions using MQTT ([60b7f9f](https://github.com/ColdPBC/cold-monorepo/commit/60b7f9fa13b9f71ca6b55ac2b0b9b376fc32ded6))

# [1.213.0-COLD-711.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.212.0...v1.213.0-COLD-711.1) (2024-05-03)


### Features

* initial work for compliance manager page ([910001e](https://github.com/ColdPBC/cold-monorepo/commit/910001e817292c86a73b30e8ec22cd6296631e27))
* remove old survey code ([e2a4538](https://github.com/ColdPBC/cold-monorepo/commit/e2a45384bce0a9007da88ee556010cfafff116d1))

# [1.212.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.211.2...v1.212.0) (2024-04-29)


### Features

* added feature flag toggling to go back to old design and fixed issue with linking for sidebar not navigating on click ([2e9f07a](https://github.com/ColdPBC/cold-monorepo/commit/2e9f07afd0328a1849c80c88691fdc1013587797))
* handle transitions and when sub menu item is selected ([8267d8f](https://github.com/ColdPBC/cold-monorepo/commit/8267d8f8f97c36560af5216959e53035ac04ace8))
* initial changes to the sidebar and application layout ([5d34714](https://github.com/ColdPBC/cold-monorepo/commit/5d347149c0e26742598e473d6760bac87f2bdd8a))
* truncate the dropdown for the nav bar ([2544c86](https://github.com/ColdPBC/cold-monorepo/commit/2544c86d4e33f362a7707c84e1431799e6b96684))

## [1.211.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.211.1...v1.211.2) (2024-04-29)


### Bug Fixes

* add shadow db env variable ([dc87dda](https://github.com/ColdPBC/cold-monorepo/commit/dc87dda8730cc0bc60f79e6cb33e966adc463801))

## [1.211.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.211.0...v1.211.1) (2024-04-29)


### Bug Fixes

* add patch route for organizations ([130ea99](https://github.com/ColdPBC/cold-monorepo/commit/130ea99924f023fb4866a8aa9d2afd37ee5ba5e6))

# [1.211.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.4...v1.211.0) (2024-04-25)


### Features

* show up icon when showing activities ([b0398d7](https://github.com/ColdPBC/cold-monorepo/commit/b0398d71f4dc9f551954e95032331ead8a33a904))

## [1.210.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.3...v1.210.4) (2024-04-25)


### Bug Fixes

* correct percent answered in compliance page ([1646d02](https://github.com/ColdPBC/cold-monorepo/commit/1646d02a08ed70d78439f181f8ea67e4681b59a4))

## [1.210.4-COLD-764.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.3...v1.210.4-COLD-764.1) (2024-04-25)


### Bug Fixes

* correct percent answered in compliance page ([1646d02](https://github.com/ColdPBC/cold-monorepo/commit/1646d02a08ed70d78439f181f8ea67e4681b59a4))

## [1.210.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.2...v1.210.3) (2024-04-25)


### Bug Fixes

* make sure to use org compliances when available ([5e66c8d](https://github.com/ColdPBC/cold-monorepo/commit/5e66c8d09dabe83ae994c4f6233469577d0f26f5))

## [1.210.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.1...v1.210.2) (2024-04-25)


### Bug Fixes

* keep 80px image when feature flag is off ([b350ae7](https://github.com/ColdPBC/cold-monorepo/commit/b350ae71a243c8cdb7295512bef1be406bf12489))

## [1.210.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.210.0...v1.210.1) (2024-04-25)


### Bug Fixes

* add overridden surveys to compliance_definition ([5852655](https://github.com/ColdPBC/cold-monorepo/commit/5852655c39cd2159d95956890992f3e043491121))

# [1.210.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.209.1...v1.210.0) (2024-04-24)


### Features

* increase svg size in compliance wizard ([0bca7e6](https://github.com/ColdPBC/cold-monorepo/commit/0bca7e6756429153b31b35cc847a84cef7b57b67))
* put logo background color behind feature flag ([250eaa1](https://github.com/ColdPBC/cold-monorepo/commit/250eaa1f3bb77f1c2ae0f75025bfac3ea7fa3cc5))
* set logo size to 120 px ([a33db91](https://github.com/ColdPBC/cold-monorepo/commit/a33db91f439907b1a03f4bcca591ae3561a553ef))

# [1.210.0-COLD-762.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.209.1...v1.210.0-COLD-762.1) (2024-04-24)


### Features

* increase svg size in compliance wizard ([0bca7e6](https://github.com/ColdPBC/cold-monorepo/commit/0bca7e6756429153b31b35cc847a84cef7b57b67))
* put logo background color behind feature flag ([250eaa1](https://github.com/ColdPBC/cold-monorepo/commit/250eaa1f3bb77f1c2ae0f75025bfac3ea7fa3cc5))

## [1.209.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.209.0...v1.209.1) (2024-04-24)


### Bug Fixes

* return 404 when survey name is not found ([27c4b87](https://github.com/ColdPBC/cold-monorepo/commit/27c4b875d9692ad4fd6bf729c2fd7a6d09be073b))

# [1.209.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.208.3...v1.209.0) (2024-04-24)


### Bug Fixes

* bug where a session might not be available ([f32d1d4](https://github.com/ColdPBC/cold-monorepo/commit/f32d1d43467428d056bae88ddb845fe96bed36d9))


### Features

* freeplay improvements ([d40c921](https://github.com/ColdPBC/cold-monorepo/commit/d40c921a2dd8e6b468839535ac32d9035a6fe3b9))

## [1.208.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.208.2...v1.208.3) (2024-04-24)


### Bug Fixes

* org compliances bug ([c126461](https://github.com/ColdPBC/cold-monorepo/commit/c1264619364618c144bc86b2dda14d99c102bf3f))


## [1.208.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.208.1...v1.208.2) (2024-04-24)


### Bug Fixes

* org compliances bug ([ac0f4e6](https://github.com/ColdPBC/cold-monorepo/commit/ac0f4e6864badd839ec3cc985593383c82d94b82))

## [1.208.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.208.0...v1.208.1) (2024-04-23)



### Bug Fixes

* org compliances bug ([cb616ed](https://github.com/ColdPBC/cold-monorepo/commit/cb616ed04bec5b6eb9e83e323cf1adbbbd3d690d))

* org compliances bug ([#407](https://github.com/ColdPBC/cold-monorepo/issues/407)) ([6cc3dad](https://github.com/ColdPBC/cold-monorepo/commit/6cc3dad9248f5aa530d44cb21a3057a32f509cf4))

# [1.208.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.207.1...v1.208.0) (2024-04-23)


### Features

* add gray background for logo ([3107b47](https://github.com/ColdPBC/cold-monorepo/commit/3107b47b7e77373965699d980dc75d005cadd978))

## [1.207.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.207.0...v1.207.1) (2024-04-23)


### Bug Fixes

* survey status bug ([45c3074](https://github.com/ColdPBC/cold-monorepo/commit/45c3074eb240afd11cd2cbcc7eca4196bc084c4b))

# [1.207.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.206.0...v1.207.0) (2024-04-23)


### Features

* add subcategory_labels to emission scopes ([8142328](https://github.com/ColdPBC/cold-monorepo/commit/81423289f70adb8a02fde2fae9c2e6642463a307))
* add subcategory_labels to emission scopes ([3fb468e](https://github.com/ColdPBC/cold-monorepo/commit/3fb468eb43a0a18e423aa8163986cb72996f26de))

# [1.206.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.205.0...v1.206.0) (2024-04-23)


### Features

* format tooltip tonnes label and added tco2e to the end of each item ([6fbf2d0](https://github.com/ColdPBC/cold-monorepo/commit/6fbf2d039c72c60d7e8d4c2dac16857d85177cfa))
* remove tc02e from the tooltip ([cd8d835](https://github.com/ColdPBC/cold-monorepo/commit/cd8d83539ef2bad3c9d8d4bd3e769400afa5504a))

# [1.205.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.204.0...v1.205.0) (2024-04-22)


### Bug Fixes

* add statuses to response ([96505bd](https://github.com/ColdPBC/cold-monorepo/commit/96505bdfc4d016dc67317d60bc59ea757d921f64))


### Features

* add new orgSurveyStatus route ([463d7a8](https://github.com/ColdPBC/cold-monorepo/commit/463d7a808d806cb939750e5ef512e68fa71b1851))
* add new orgSurveyStatus route ([#403](https://github.com/ColdPBC/cold-monorepo/issues/403)) ([f4fa4c3](https://github.com/ColdPBC/cold-monorepo/commit/f4fa4c3212b5c34f9490522b19efeba577394a76))

# [1.204.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.203.0...v1.204.0) (2024-04-22)


### Features

* create new compliance page ([5c4fd2c](https://github.com/ColdPBC/cold-monorepo/commit/5c4fd2c50aae27cc52ca08017e5ddbdf8dfdae29))
* initial changes ([4fbf0c0](https://github.com/ColdPBC/cold-monorepo/commit/4fbf0c0ad77553e729f69cb0e51cf826995ceee1))
* remove height setting for image ([665a5a2](https://github.com/ColdPBC/cold-monorepo/commit/665a5a2298fd7311be7b332d6edf46f467f84fd1))

# [1.203.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.202.0...v1.203.0) (2024-04-22)


### Bug Fixes

* register bar controller for bar chart ([bb88aea](https://github.com/ColdPBC/cold-monorepo/commit/bb88aea7144520d873f21fd4a222e7e1b1dff571))


### Features

* add formatting to tonnes and percents ([fb940a5](https://github.com/ColdPBC/cold-monorepo/commit/fb940a59cc2180c4d06bd2d4699ddfaa1cad0eaa))
* add regression and tooltip to bar chart ([fa8f581](https://github.com/ColdPBC/cold-monorepo/commit/fa8f581053493a7a6dc3500351ccc2cf3f99d51f))
* add white border to select ([3e9dada](https://github.com/ColdPBC/cold-monorepo/commit/3e9dada25ab8a3cac9cd218d16d80dfdcdcb0044))
* correct image styling and tootlip handling ([2fbeed0](https://github.com/ColdPBC/cold-monorepo/commit/2fbeed0a8d969a026f710d778c272319b98ce11d))
* correct regression bar, added tooltip to bar chart ([7a78fab](https://github.com/ColdPBC/cold-monorepo/commit/7a78fab80b5324ee7fa4d00cc94a7cce37371fa2))
* correct text ([e56cbfa](https://github.com/ColdPBC/cold-monorepo/commit/e56cbfa3438f72b5f10b9bea5f0b93c032d6d955))
* donut chart hover updates and dropdown with other activities row ([16ca9f9](https://github.com/ColdPBC/cold-monorepo/commit/16ca9f936444b5813b3fad3a2371269242688b57))
* fix data label issue not appearing sometimes ([54b4811](https://github.com/ColdPBC/cold-monorepo/commit/54b481147bf4f10ace178ce0625b179f8a873681))
* fix dropdown changes height on hover ([b52ae5f](https://github.com/ColdPBC/cold-monorepo/commit/b52ae5f368c8b932ae96cfec220d4a8291f90a11))
* fix table width ([1b89ef5](https://github.com/ColdPBC/cold-monorepo/commit/1b89ef571f14c19a05e01763d25dac1df36a7acc))
* initial changes ([f812d98](https://github.com/ColdPBC/cold-monorepo/commit/f812d98dc8c5306c5d72ef77e0924b2fbbfd2755))

# [1.203.0-COLD-744.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.202.0...v1.203.0-COLD-744.1) (2024-04-22)


### Features

* add regression and tooltip to bar chart ([fa8f581](https://github.com/ColdPBC/cold-monorepo/commit/fa8f581053493a7a6dc3500351ccc2cf3f99d51f))
* add white border to select ([3e9dada](https://github.com/ColdPBC/cold-monorepo/commit/3e9dada25ab8a3cac9cd218d16d80dfdcdcb0044))
* correct image styling and tootlip handling ([2fbeed0](https://github.com/ColdPBC/cold-monorepo/commit/2fbeed0a8d969a026f710d778c272319b98ce11d))
* correct regression bar, added tooltip to bar chart ([7a78fab](https://github.com/ColdPBC/cold-monorepo/commit/7a78fab80b5324ee7fa4d00cc94a7cce37371fa2))
* donut chart hover updates and dropdown with other activities row ([16ca9f9](https://github.com/ColdPBC/cold-monorepo/commit/16ca9f936444b5813b3fad3a2371269242688b57))
* fix data label issue not appearing sometimes ([54b4811](https://github.com/ColdPBC/cold-monorepo/commit/54b481147bf4f10ace178ce0625b179f8a873681))
* fix table width ([1b89ef5](https://github.com/ColdPBC/cold-monorepo/commit/1b89ef571f14c19a05e01763d25dac1df36a7acc))
* initial changes ([f812d98](https://github.com/ColdPBC/cold-monorepo/commit/f812d98dc8c5306c5d72ef77e0924b2fbbfd2755))

# [1.202.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.9...v1.202.0) (2024-04-19)


### Bug Fixes

* add surveys_override to request body ([6610d7a](https://github.com/ColdPBC/cold-monorepo/commit/6610d7a36441eb2bb6b1a3b72d1900fa2a21a612))
* specifically check for empty surveys_override array. ([81e9502](https://github.com/ColdPBC/cold-monorepo/commit/81e9502b24499c9d97279c210e354c566286a052))


### Features

* add surveys_override to organization_compliances table ([4c67128](https://github.com/ColdPBC/cold-monorepo/commit/4c67128c337fffdfac20428a44f35a2ef4fb4044))
* add surveys_override to organization_compliances table ([#396](https://github.com/ColdPBC/cold-monorepo/issues/396)) ([742f30e](https://github.com/ColdPBC/cold-monorepo/commit/742f30e282a03e7fb057644fe1a6772d65aa3d3a))
* return surveys_override if present otherwise return surveys array ([94ab318](https://github.com/ColdPBC/cold-monorepo/commit/94ab318cf5bd41b67446036654c1ecfdbef62857))

## [1.201.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.8...v1.201.9) (2024-04-19)


### Bug Fixes

* update ui staging to still hit localhost for the API ([9d4009b](https://github.com/ColdPBC/cold-monorepo/commit/9d4009b05ef2d568a3d9b32b20d9030d0885b47f))

## [1.201.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.7...v1.201.8) (2024-04-19)


### Bug Fixes

* bugs in question routes ([e2f40f4](https://github.com/ColdPBC/cold-monorepo/commit/e2f40f4d2abea484ec1893e6d4429397fd193a39))

## [1.201.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.6...v1.201.7) (2024-04-19)


### Bug Fixes

* bug causing OOM due to retrieving too many vectors in DB. ([78ebc82](https://github.com/ColdPBC/cold-monorepo/commit/78ebc82c2522f3e9420030f26c66e09b337e7f54))

## [1.201.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.5...v1.201.6) (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([95c5d37](https://github.com/ColdPBC/cold-monorepo/commit/95c5d3783788bd9b2526221ce481716796f59cab))

## [1.201.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.4...v1.201.5) (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([1354439](https://github.com/ColdPBC/cold-monorepo/commit/1354439018cb274948b97b5a7d0fc546d3fe435a))

## [1.201.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.3...v1.201.4) (2024-04-19)


### Bug Fixes

* move to redis job due to service failing health checks on startup ([cf5d8f7](https://github.com/ColdPBC/cold-monorepo/commit/cf5d8f7ed7fc4cfc10e8df0261464facab46c16b))

## [1.201.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.2...v1.201.3) (2024-04-18)


### Bug Fixes

* partial fix for files with invalid unicode characters causing app to crash. ([02bda42](https://github.com/ColdPBC/cold-monorepo/commit/02bda4235566ae8eb99b9d541f454b0b49b56607))

## [1.201.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.1...v1.201.2) (2024-04-18)


### Bug Fixes

* improved file injection process ([02c6f25](https://github.com/ColdPBC/cold-monorepo/commit/02c6f25407c60bb615c1bf810fa425d96eb1404b))

## [1.201.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.201.0...v1.201.1) (2024-04-18)


### Bug Fixes

* 502 issues ([3a8ca10](https://github.com/ColdPBC/cold-monorepo/commit/3a8ca10e1567d0d64aad01c7933a4593e59761e0))

# [1.201.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.200.0...v1.201.0) (2024-04-16)


### Features

* search document repository ([aa160aa](https://github.com/ColdPBC/cold-monorepo/commit/aa160aa21227b9b02c74a1da295b4cc791c0b57a))

# [1.200.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.199.0...v1.200.0) (2024-04-16)

### Features

* search document repository ([df764fa](https://github.com/ColdPBC/cold-monorepo/commit/df764fa2d4f85905a01f1425faa7d7376b535344))

# [1.199.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.198.0...v1.199.0) (2024-04-15)

### Features

* add keep previous to application swr config ([0005d5c](https://github.com/ColdPBC/cold-monorepo/commit/0005d5c40e9def970df241645ef6b397bac1f5bc))

# [1.198.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.197.1...v1.198.0) (2024-04-15)

### Features

* add feature flag to control throttling ([d685382](https://github.com/ColdPBC/cold-monorepo/commit/d685382484654789975ada538a6577a478f9b9fb))

## [1.197.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.197.0...v1.197.1) (2024-04-13)

### Bug Fixes

* null items in reference array ([b6ef905](https://github.com/ColdPBC/cold-monorepo/commit/b6ef90557532ffdc9639313ae920ea9e3b41882d))

# [1.197.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.196.0...v1.197.0) (2024-04-13)

### Features

* add crawler service ([c5e3d78](https://github.com/ColdPBC/cold-monorepo/commit/c5e3d7845eea6093b9239e726493ccb451df209f))

# [1.196.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.195.1...v1.196.0) (2024-04-12)

### Bug Fixes

* cors issue ([bad0954](https://github.com/ColdPBC/cold-monorepo/commit/bad0954e756337e0467dd2db06afe32942b748aa))

### Features

* add crawler service ([36d5954](https://github.com/ColdPBC/cold-monorepo/commit/36d59544e992b8447f8a393d2ed4e3b9bcef8c76))

## [1.195.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.195.0...v1.195.1) (2024-04-12)

### Bug Fixes

* make sure the AI response is captured in Freeplay ([6911040](https://github.com/ColdPBC/cold-monorepo/commit/69110406b3420908289607e40da9b8d8baa01db2))

# [1.195.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.194.0...v1.195.0) (2024-04-12)

### Features

* show scopes percentage to 2 decimal points ([e1ad7fe](https://github.com/ColdPBC/cold-monorepo/commit/e1ad7feee4e3c022d2289a2a8778ce2740b6cd47))

# [1.194.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.193.0...v1.194.0) (2024-04-11)

### Bug Fixes

* fix showing faciility selector when a single year ([72751f7](https://github.com/ColdPBC/cold-monorepo/commit/72751f72b6ecdc1e59c9ba7470573495f8709520))

### Features

* add learn more button to emissions overview card ([a6fe296](https://github.com/ColdPBC/cold-monorepo/commit/a6fe296328c3785a3b0e849ce8cb003411b0c241))
* added sorting to year data for charts and updated stories ([41835bc](https://github.com/ColdPBC/cold-monorepo/commit/41835bcd6e58ff4036b44ab3d77f029cbe4a947c))
* handle single year emissions ([767b1a0](https://github.com/ColdPBC/cold-monorepo/commit/767b1a04ad390b79e02638a2c67d3cd440fc840d))
* remove header from emissions scope card ([f1623d4](https://github.com/ColdPBC/cold-monorepo/commit/f1623d489a2c396bccc4d9e7caf844494b6e5614))
* update provider to use single year emissions ([426a76a](https://github.com/ColdPBC/cold-monorepo/commit/426a76aa6cd848a810f1c2ab95fe012fbb420112))

# [1.193.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.192.0...v1.193.0) (2024-04-11)

### Features

* add progress bar for assessments for compliances that are score based ([068da70](https://github.com/ColdPBC/cold-monorepo/commit/068da7087ac459994c70e00b5d0ac7c395f77e25))
* use correct data fields ([4fae29d](https://github.com/ColdPBC/cold-monorepo/commit/4fae29d2038dc230c34dd2ec8745492ce4d96c8a))

# [1.192.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.4...v1.192.0) (2024-04-11)

### Features

* add throttle to swr mutates from MQTT messages to 10 per minute ([6991fea](https://github.com/ColdPBC/cold-monorepo/commit/6991feadd6b3f765aac85eedac7e9320024678fa))
* added loading and disabling for automate button when kicked off ([9fa8325](https://github.com/ColdPBC/cold-monorepo/commit/9fa8325e7cf39aca37ceebff90938394a5273ba4))
* adding keep previous data to compliance set survey call to prevent undefined during revalidation ([2d261d5](https://github.com/ColdPBC/cold-monorepo/commit/2d261d5a61ee3cb95e855fecc17b2542d1409f51))

## [1.191.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.3...v1.191.4) (2024-04-10)

### Bug Fixes

* use correct field for question summary ([e839520](https://github.com/ColdPBC/cold-monorepo/commit/e839520f7236e8091c193ed54f17bdd3b97b1638))

## [1.191.4-cold-667.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.3...v1.191.4-cold-667.1) (2024-04-10)

### Bug Fixes

* use correct field for question summary ([e839520](https://github.com/ColdPBC/cold-monorepo/commit/e839520f7236e8091c193ed54f17bdd3b97b1638))

## [1.191.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.2...v1.191.3) (2024-04-10)

### Bug Fixes

* delete env file for api ([8ce64df](https://github.com/ColdPBC/cold-monorepo/commit/8ce64df9ac324d5dc8e7989d7b7a52be265d28a9))
* use different env variable for CORS resolution ([7d5a990](https://github.com/ColdPBC/cold-monorepo/commit/7d5a9909f61447e7c998cb5143a42e03ef15ab6b))

## [1.191.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.1...v1.191.2) (2024-04-10)

### Bug Fixes

* delete env.staging file ([7bc1e2f](https://github.com/ColdPBC/cold-monorepo/commit/7bc1e2f236fd6db76d91de18f68fe0e6938409b4))

## [1.191.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.191.0...v1.191.1) (2024-04-09)

### Bug Fixes

* add ghg_subcategory to unique key due to duplicates ([f9bbcfc](https://github.com/ColdPBC/cold-monorepo/commit/f9bbcfc27e2f1d1cccac166cdb54e166663fa579))

# [1.191.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.190.0...v1.191.0) (2024-04-09)

### Features

* added bar highlighting and other changes when a year/bar is selected ([49cec73](https://github.com/ColdPBC/cold-monorepo/commit/49cec73846dbee000d7692dac0e4fd36efac6e75))
* update endpoint and emissions payload type ([aa725cd](https://github.com/ColdPBC/cold-monorepo/commit/aa725cdfa72a350f86820b97edeeb20c36eb553c))

# [1.190.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.189.0...v1.190.0) (2024-04-09)

### Features

* added logging to emission charts ([a8c3594](https://github.com/ColdPBC/cold-monorepo/commit/a8c3594c8381d8628e6c3e29cc38c5c35e6dc57f))
* carbon footprint updates based on design ([3ff67c9](https://github.com/ColdPBC/cold-monorepo/commit/3ff67c9586752ee34510569dc6c108b59018d4ea))
* emission carb footprint changes ([3482a06](https://github.com/ColdPBC/cold-monorepo/commit/3482a0629f78f64e1ad72c02b828aa3dee5e6e76))
* making code more reusable ([515f1a0](https://github.com/ColdPBC/cold-monorepo/commit/515f1a09c920b46beb30a8f1bcfc09495134521c))
* more changes for the scope cahrt ([d1f56e2](https://github.com/ColdPBC/cold-monorepo/commit/d1f56e2faa4c19d39cdde53eef082ab0b7692d27))

# [1.189.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.188.0...v1.189.0) (2024-04-09)

### Features

* update the language of our authentication errors ([27690b9](https://github.com/ColdPBC/cold-monorepo/commit/27690b913b38eebfd85d2df9713fc4ce39be67d5))
* update the language of our authentication errors ([#383](https://github.com/ColdPBC/cold-monorepo/issues/383)) ([9e29e32](https://github.com/ColdPBC/cold-monorepo/commit/9e29e3277cc3f8731f1d2e225e61d4fd6ecdc0df))

# [1.188.0-cold-708.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.187.0...v1.188.0-cold-708.1) (2024-04-09)

### Features

* update the language of our authentication errors ([27690b9](https://github.com/ColdPBC/cold-monorepo/commit/27690b913b38eebfd85d2df9713fc4ce39be67d5))

# [1.187.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.186.0...v1.187.0) (2024-04-05)

### Features

* add ghg sub-scopes ([faa206f](https://github.com/ColdPBC/cold-monorepo/commit/faa206f3ed689988792710f019def40d114e4a78))
* add ghg sub-scopes ([5a9433a](https://github.com/ColdPBC/cold-monorepo/commit/5a9433a62564d45cb911e01871189b0647fd3fd1))

# [1.186.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.185.2...v1.186.0) (2024-04-05)

### Bug Fixes

* updated swagger decorators ([3ab05fe](https://github.com/ColdPBC/cold-monorepo/commit/3ab05fe4ae857974e09fd3514f01e2227c32b76a))

### Features

* add emission_scopes routes ([9bdc5a5](https://github.com/ColdPBC/cold-monorepo/commit/9bdc5a51e50971ff2d9961b4098aad0a604ea19d))
* add ghg sub-scopes ([faa206f](https://github.com/ColdPBC/cold-monorepo/commit/faa206f3ed689988792710f019def40d114e4a78))
* add ghg sub-scopes ([5a9433a](https://github.com/ColdPBC/cold-monorepo/commit/5a9433a62564d45cb911e01871189b0647fd3fd1))

## [1.185.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.185.1...v1.185.2) (2024-04-04)

### Bug Fixes

* 204 issue ([441030e](https://github.com/ColdPBC/cold-monorepo/commit/441030e87558f9b5cb7305fe0890a95ba61ae64d))

## [1.185.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.185.0...v1.185.1) (2024-04-04)

### Bug Fixes

* intermittent 502 errors ([8ad9392](https://github.com/ColdPBC/cold-monorepo/commit/8ad9392f7fa7d9e4c599ca8d31bcb8563ec9d7ff))

# [1.185.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.184.3...v1.185.0) (2024-04-03)

### Features

* updates to logging to be more leaner ([81dbde9](https://github.com/ColdPBC/cold-monorepo/commit/81dbde958bfc6973be12202e5413f33e94cd6046))
* updates to logging to be more leaner ([#370](https://github.com/ColdPBC/cold-monorepo/issues/370)) ([e6db07e](https://github.com/ColdPBC/cold-monorepo/commit/e6db07e5b492f3c56d14ee5fc68e137f0fee13c5))

## [1.184.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.184.2...v1.184.3) (2024-04-03)

### Bug Fixes

* possible null reference ([2621cb6](https://github.com/ColdPBC/cold-monorepo/commit/2621cb6abcfb0ceaec391a0b7e34621a246ae09d))
* update FP session to contain relevant metadata ([3546471](https://github.com/ColdPBC/cold-monorepo/commit/354647176deeb0269d372392eee537ad56b29e89))

## [1.184.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.184.1...v1.184.2) (2024-04-03)

### Bug Fixes

* attempt to address additional_context issue ([1c6afb7](https://github.com/ColdPBC/cold-monorepo/commit/1c6afb7db8b4a56fafbd207cd3562474e4eba218))

## [1.184.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.184.0...v1.184.1) (2024-04-03)

### Bug Fixes

* issues with formatting ([86e6442](https://github.com/ColdPBC/cold-monorepo/commit/86e64422173c02b678a8cc6de71a0509197d0d45))

# [1.184.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.183.3...v1.184.0) (2024-04-03)

### Bug Fixes

* clean up context prompt ([7cb0b64](https://github.com/ColdPBC/cold-monorepo/commit/7cb0b649fea7132a2e18f5a38dfb1115d377f7f2))

### Features

* check if the ai response is valid before showing ai icon ([813d1e6](https://github.com/ColdPBC/cold-monorepo/commit/813d1e67178feef779c792138a746ff8d3cb740f))

## [1.183.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.183.2...v1.183.3) (2024-04-03)

### Bug Fixes

* troubleshoot flightcontrol e2e test support ([00ee219](https://github.com/ColdPBC/cold-monorepo/commit/00ee2190e7164f1a04adf4a92f3bebb4f049929a))

## [1.183.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.183.1...v1.183.2) (2024-04-03)

### Bug Fixes

* add logging, comments, and response validation for selects and yes_no ([2513f19](https://github.com/ColdPBC/cold-monorepo/commit/2513f19c5442ef30ea2f55faae7556619a9c3e1b))

## [1.183.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.183.0...v1.183.1) (2024-04-02)

### Bug Fixes

* get fP api key from config ([4541eb3](https://github.com/ColdPBC/cold-monorepo/commit/4541eb3af2f2725d5e8b072142bbdb9c3e8708c4))

# [1.183.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.182.0...v1.183.0) (2024-04-02)

### Bug Fixes

* incorrect rabbit payload ([97dcfc1](https://github.com/ColdPBC/cold-monorepo/commit/97dcfc19ad3bd4adcafdeb06a3c65b84626dd681))

### Features

* implement freeplay integration ([13a17e3](https://github.com/ColdPBC/cold-monorepo/commit/13a17e34a84a8949cbdf3552e63ffcb6ac9e78b6))
* implement freeplay integration ([5449082](https://github.com/ColdPBC/cold-monorepo/commit/54490823279482b913554d9b366271580bc50d8a))

# [1.182.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.181.0...v1.182.0) (2024-04-02)

### Features

* update logging to be lean for large data from the API ([60d4ce4](https://github.com/ColdPBC/cold-monorepo/commit/60d4ce48c6298c5d9548d75d3cb610b0715d19b4))

# [1.181.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.12...v1.181.0) (2024-04-02)

### Features

* handle when the answer is undefined, instead of checking if the value exists or not ([46fcad2](https://github.com/ColdPBC/cold-monorepo/commit/46fcad2e12e244f1593ee7da475977f0196e1e0b))
* have 'yes' and 'no' be used as true for ai responses ([7bb21ca](https://github.com/ColdPBC/cold-monorepo/commit/7bb21ca4880b8e87df36014af6c8d5af4a47e361))
* have 'yes' and 'no' be used as true for ai responses ([#366](https://github.com/ColdPBC/cold-monorepo/issues/366)) ([dae713b](https://github.com/ColdPBC/cold-monorepo/commit/dae713b6ffea9c6d77a0080fff02c1f2d03d9404))

## [1.180.12](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.11...v1.180.12) (2024-04-02)

### Bug Fixes

* add log entry when section is done and when survey is complete ([209cb1f](https://github.com/ColdPBC/cold-monorepo/commit/209cb1fd0be5522dd9a2450cb2df79874afbf881))

## [1.180.11](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.10...v1.180.11) (2024-04-02)

### Bug Fixes

* logging issue ([906f8e1](https://github.com/ColdPBC/cold-monorepo/commit/906f8e14a10e8701b62840289855e9bd7067fe85))

## [1.180.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.9...v1.180.10) (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([51703fc](https://github.com/ColdPBC/cold-monorepo/commit/51703fc0263d1340d809e68892fee25f61038ead))

## [1.180.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.8...v1.180.9) (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([1fd5cf9](https://github.com/ColdPBC/cold-monorepo/commit/1fd5cf9dd5f274c24d0a7c36e973c8602bfc8827))

## [1.180.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.7...v1.180.8) (2024-04-02)

### Bug Fixes

* fix incorrect eval of false ([c896d34](https://github.com/ColdPBC/cold-monorepo/commit/c896d34a575a561a754f4a8c4482091ec9772884))

## [1.180.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.6...v1.180.7) (2024-04-02)

### Bug Fixes

* incorrectly sets ai_answered: false when yes_no answer is false ([c82f2e7](https://github.com/ColdPBC/cold-monorepo/commit/c82f2e7f6d3fb2bbfce89167debbcfbe6b1fffea))
* incorrectly sets ai_answered: false when yes_no answer is false ([#352](https://github.com/ColdPBC/cold-monorepo/issues/352)) ([f2aacaf](https://github.com/ColdPBC/cold-monorepo/commit/f2aacaf5d76acb8e47def48fe6da0dc43557731c))

## [1.180.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.5...v1.180.6) (2024-04-02)

### Bug Fixes

* add tooltip to question.prompt ([3c76506](https://github.com/ColdPBC/cold-monorepo/commit/3c76506f1c1c7b6250789401e00a191e10432aa4))

## [1.180.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.4...v1.180.5) (2024-04-02)

### Bug Fixes

* add tooltip to question.prompt ([9f4fa22](https://github.com/ColdPBC/cold-monorepo/commit/9f4fa2277edb58d41598d46367b9e214588a90e6))

## [1.180.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.3...v1.180.4) (2024-04-01)

### Bug Fixes

* prompt bug ([af91500](https://github.com/ColdPBC/cold-monorepo/commit/af91500335507f60593f87d64ee79fa5bda35e13))

## [1.180.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.2...v1.180.3) (2024-04-01)

### Bug Fixes

* prompt bug ([0284ded](https://github.com/ColdPBC/cold-monorepo/commit/0284dedf3cda9d8de9db35548f552cf784951bf9))

## [1.180.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.1...v1.180.2) (2024-04-01)

### Bug Fixes

* bug that would prevent updated flag values getting passed to prompt service ([eab4854](https://github.com/ColdPBC/cold-monorepo/commit/eab485446aad1b12327e79a56e58dc537f92c45f))

## [1.180.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.180.0...v1.180.1) (2024-04-01)

### Bug Fixes

* logging question key ([4f7815a](https://github.com/ColdPBC/cold-monorepo/commit/4f7815ad20f51d99263c15cc9a37eb66ab823ecf))

# [1.180.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.6...v1.180.0) (2024-04-01)

### Bug Fixes

* moved openai tools out from under langchain folder ([a7d04ea](https://github.com/ColdPBC/cold-monorepo/commit/a7d04eacbafd75e3b6d7dc93cab4b42cecc6e7bf))
* remove unused params ([fe0f071](https://github.com/ColdPBC/cold-monorepo/commit/fe0f0719f960385005551ab16cd72ddb6b6a6faa))
* using wrong model flag name ([4cd5e67](https://github.com/ColdPBC/cold-monorepo/commit/4cd5e676279e49ff9e9cf2e18bbd0127658cc0b2))

### Features

* refactor to remove langchain from calling openai ([2e6ed61](https://github.com/ColdPBC/cold-monorepo/commit/2e6ed61728eb9e36f20f729cd53f0ae9dabd6d2b))
* store links between files and vector records ([9476c0b](https://github.com/ColdPBC/cold-monorepo/commit/9476c0be23a51d9554a9b43c764093bb09672e63))

## [1.179.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.5...v1.179.6) (2024-03-29)

### Bug Fixes

* increase instance count ([69bca25](https://github.com/ColdPBC/cold-monorepo/commit/69bca25323628bba326fbf63ed4ddf446cb5eacf))

## [1.179.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.4...v1.179.5) (2024-03-29)

### Bug Fixes

* missing complete prompt ([a2ac57a](https://github.com/ColdPBC/cold-monorepo/commit/a2ac57a0d829518805e55b98f0dcbd7027fb775d))

## [1.179.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.3...v1.179.4) (2024-03-29)

### Bug Fixes

* incorrect kind value ([d11ec9a](https://github.com/ColdPBC/cold-monorepo/commit/d11ec9ae53d919faeea642a805c3520a0a7f11b2))

## [1.179.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.2...v1.179.3) (2024-03-29)

### Bug Fixes

* add sleeps to prevent rate limiter ([daa6368](https://github.com/ColdPBC/cold-monorepo/commit/daa6368898ff22f8e1fdb08607305f8e23939e1f))
* centralize prompt processing ([f0a8fca](https://github.com/ColdPBC/cold-monorepo/commit/f0a8fca9d773ae9dc4861294adbdcb213259b6f6))

## [1.179.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.1...v1.179.2) (2024-03-28)

### Bug Fixes

* create index prior to running ([f94e486](https://github.com/ColdPBC/cold-monorepo/commit/f94e4861f9580168722c6942b12dc374ebf96969))

## [1.179.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.179.0...v1.179.1) (2024-03-28)

### Bug Fixes

* disable assistant creation if Rag flag is on ([88a6d43](https://github.com/ColdPBC/cold-monorepo/commit/88a6d437b2371d168f03233213380985267b3f86))
* disable assistant creation if Rag flag is on ([#358](https://github.com/ColdPBC/cold-monorepo/issues/358)) ([2e4b444](https://github.com/ColdPBC/cold-monorepo/commit/2e4b4447070702e99fc90f282c97937406e2a27a))

# [1.179.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.178.0...v1.179.0) (2024-03-28)

### Features

* use the corresponding question (question summary) when it's available ([ba9d2c5](https://github.com/ColdPBC/cold-monorepo/commit/ba9d2c5bb3c5817e78bd0e3f7ec347ed3b69149b))
* use the corresponding question (question summary) when it's available ([#357](https://github.com/ColdPBC/cold-monorepo/issues/357)) ([b3c9aa3](https://github.com/ColdPBC/cold-monorepo/commit/b3c9aa364e1133b0d49b84c77cc9592ec239da62))

# [1.178.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.177.0...v1.178.0) (2024-03-28)

### Bug Fixes

* check if assistant still exists ([45601f8](https://github.com/ColdPBC/cold-monorepo/commit/45601f8dd4b13a37d05a1b38b152834ec06e5b87))
* delete jobs from cache ([0aae188](https://github.com/ColdPBC/cold-monorepo/commit/0aae188c8ed87cdbb7c1e6fc7720071905385dbb))
* dependency resolution ([cf88f56](https://github.com/ColdPBC/cold-monorepo/commit/cf88f5625ece0e6740cb8b5894d8f28ca522b8f3))
* remove unused custom loaders ([5a95589](https://github.com/ColdPBC/cold-monorepo/commit/5a9558946b6f4fc22f2bad64fe84b027e2ff9361))
* tsconfig issues ([ab0e1ce](https://github.com/ColdPBC/cold-monorepo/commit/ab0e1ced9eeead2190c9a1f4a563f7e52234a1b0))

### Features

* add additional file types ([e231584](https://github.com/ColdPBC/cold-monorepo/commit/e23158453c6f1df14b1cd4d759b0cd99d5415133))
* add chat module ([69f0dac](https://github.com/ColdPBC/cold-monorepo/commit/69f0dac549398ba54d3cbe32a7933beb88e877b8))
* add langchain module ([b38b94f](https://github.com/ColdPBC/cold-monorepo/commit/b38b94f152496ae0cad87f5f65a4c33a89e099a4))
* add listObjects method ([c86f14d](https://github.com/ColdPBC/cold-monorepo/commit/c86f14d8c9b34606cbec7676f34319002febdc03))
* add package deps ([97c8b2e](https://github.com/ColdPBC/cold-monorepo/commit/97c8b2ec4a6178339c515c350b7de8928ec6abed))
* add pdf, xls, word loaders ([1f47517](https://github.com/ColdPBC/cold-monorepo/commit/1f475179f4d5406da396a99b80fc1f1310739793))
* add pinecone module ([64b4ff3](https://github.com/ColdPBC/cold-monorepo/commit/64b4ff37ce1af8f6a11210b2d7dc8ceee09043ce))
* adding chat components ([0bdf526](https://github.com/ColdPBC/cold-monorepo/commit/0bdf52685c06f86226030b717e9914e8f69f3b2c))
* get/set checksum cache to prevent dupes from being added to the index ([e25d1d9](https://github.com/ColdPBC/cold-monorepo/commit/e25d1d9618b8599e816dcdf0091304cd116d8744))
* improved documents in response ([b1e3412](https://github.com/ColdPBC/cold-monorepo/commit/b1e3412d778461370f5fbfa537f29401537d00d8))
* initial support for RAG ([dc65a47](https://github.com/ColdPBC/cold-monorepo/commit/dc65a4754dfa9089fac0fd913d2b0124953cf089))

# [1.176.0-cold-657.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.176.0-cold-657.4...v1.176.0-cold-657.5) (2024-03-28)

### Bug Fixes

* tsconfig issues ([ab0e1ce](https://github.com/ColdPBC/cold-monorepo/commit/ab0e1ced9eeead2190c9a1f4a563f7e52234a1b0))

### Features

* improved documents in response ([b1e3412](https://github.com/ColdPBC/cold-monorepo/commit/b1e3412d778461370f5fbfa537f29401537d00d8))

# [1.176.0-cold-657.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.176.0-cold-657.3...v1.176.0-cold-657.4) (2024-03-28)

### Features

* initial support for RAG ([dc65a47](https://github.com/ColdPBC/cold-monorepo/commit/dc65a4754dfa9089fac0fd913d2b0124953cf089))

# [1.176.0-cold-657.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.176.0-cold-657.2...v1.176.0-cold-657.3) (2024-03-27)

### Features

* adding chat components ([0bdf526](https://github.com/ColdPBC/cold-monorepo/commit/0bdf52685c06f86226030b717e9914e8f69f3b2c))

# [1.176.0-cold-657.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.176.0-cold-657.1...v1.176.0-cold-657.2) (2024-03-27)

### Bug Fixes

* check if assistant still exists ([45601f8](https://github.com/ColdPBC/cold-monorepo/commit/45601f8dd4b13a37d05a1b38b152834ec06e5b87))
* delete jobs from cache ([0aae188](https://github.com/ColdPBC/cold-monorepo/commit/0aae188c8ed87cdbb7c1e6fc7720071905385dbb))
* remove unused custom loaders ([5a95589](https://github.com/ColdPBC/cold-monorepo/commit/5a9558946b6f4fc22f2bad64fe84b027e2ff9361))

### Features

* add additional file types ([e231584](https://github.com/ColdPBC/cold-monorepo/commit/e23158453c6f1df14b1cd4d759b0cd99d5415133))
* get/set checksum cache to prevent dupes from being added to the index ([e25d1d9](https://github.com/ColdPBC/cold-monorepo/commit/e25d1d9618b8599e816dcdf0091304cd116d8744))

# [1.176.0-cold-657.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.175.0...v1.176.0-cold-657.1) (2024-03-26)

### Bug Fixes

* dependency resolution ([cf88f56](https://github.com/ColdPBC/cold-monorepo/commit/cf88f5625ece0e6740cb8b5894d8f28ca522b8f3))

### Features

* add chat module ([69f0dac](https://github.com/ColdPBC/cold-monorepo/commit/69f0dac549398ba54d3cbe32a7933beb88e877b8))
* add langchain module ([b38b94f](https://github.com/ColdPBC/cold-monorepo/commit/b38b94f152496ae0cad87f5f65a4c33a89e099a4))
* add listObjects method ([c86f14d](https://github.com/ColdPBC/cold-monorepo/commit/c86f14d8c9b34606cbec7676f34319002febdc03))
* add package deps ([97c8b2e](https://github.com/ColdPBC/cold-monorepo/commit/97c8b2ec4a6178339c515c350b7de8928ec6abed))
* add pdf, xls, word loaders ([1f47517](https://github.com/ColdPBC/cold-monorepo/commit/1f475179f4d5406da396a99b80fc1f1310739793))
* add pinecone module ([64b4ff3](https://github.com/ColdPBC/cold-monorepo/commit/64b4ff37ce1af8f6a11210b2d7dc8ceee09043ce))

# [1.175.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.174.0...v1.175.0) (2024-03-25)

### Features

* add launchdarkly for compliance markdown ([4053024](https://github.com/ColdPBC/cold-monorepo/commit/40530244312b1d461b7a9a2bf4e2d31a088b2867))
* handle mulit context checking and setting ([942b98d](https://github.com/ColdPBC/cold-monorepo/commit/942b98d588f6f0013682fe2db44283d9f6140ee8))

# [1.174.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.173.1...v1.174.0) (2024-03-25)

### Features

* add response validator to justification ([f08b4c3](https://github.com/ColdPBC/cold-monorepo/commit/f08b4c32e4b0b465933d3a831d3a28cc1866c779))

## [1.173.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.173.0...v1.173.1) (2024-03-23)

### Bug Fixes

* rename missed location > facility ([32da050](https://github.com/ColdPBC/cold-monorepo/commit/32da0506ba914ef9171825f5ebeb6ad5cd1b98c7))
* rename missed location > facility ([52dfff8](https://github.com/ColdPBC/cold-monorepo/commit/52dfff85fa55173818ad28051e4140d744ec471a))

# [1.173.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.172.1...v1.173.0) (2024-03-23)

### Bug Fixes

* add missing migrations ([b2e1e4d](https://github.com/ColdPBC/cold-monorepo/commit/b2e1e4d00c00e51068faf9f1a3e75683b7b1ec5a))
* rename locations to facilities ([7327c3c](https://github.com/ColdPBC/cold-monorepo/commit/7327c3c4f9ec2bd996d9134acd9e14ac3f22c306))

### Features

* create facilities resource ([de6c960](https://github.com/ColdPBC/cold-monorepo/commit/de6c96066e2f78ab0640c93232d257f92448d306))
* create organization_facilities model ([4bf6813](https://github.com/ColdPBC/cold-monorepo/commit/4bf68138490f9bea5d0ed977c66898aae9809b54))
* create organization_facilities model ([65e31d1](https://github.com/ColdPBC/cold-monorepo/commit/65e31d1f0b6354c6a0b7e9e334461631daae9010))
* create organization_facilities model ([4c6edaf](https://github.com/ColdPBC/cold-monorepo/commit/4c6edaf767f301f8b5d608a152e13d9dcde5968f))
* emission_scopes model ([07aa574](https://github.com/ColdPBC/cold-monorepo/commit/07aa57498a9f61643826ff150af7adc6b4178226))
* support mass deleting orgs ([75cc450](https://github.com/ColdPBC/cold-monorepo/commit/75cc450c5419772e438c4ec47e993846801cbd11))

## [1.172.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.172.0...v1.172.1) (2024-03-23)

### Bug Fixes

* bug counting questions with `null` as answer ([8d2cce2](https://github.com/ColdPBC/cold-monorepo/commit/8d2cce2ca0f6344e3cd4d3a7246cee607e4447d8))

# [1.172.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.171.0...v1.172.0) (2024-03-23)

### Features

* emission_scopes model ([24bf372](https://github.com/ColdPBC/cold-monorepo/commit/24bf3726636eda11474f130919a01663675ac235))

# [1.170.0-cold-650.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.169.0...v1.170.0-cold-650.1) (2024-03-22)

# [1.171.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.170.0...v1.171.0) (2024-03-22)

### Features

* emission_scopes model ([24bf372](https://github.com/ColdPBC/cold-monorepo/commit/24bf3726636eda11474f130919a01663675ac235))
* add cookie to set 5 min expiration when users start the automation ([85abae0](https://github.com/ColdPBC/cold-monorepo/commit/85abae0a4279c8a04aec9261ee8f95b3b7998263))

# [1.170.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.169.0...v1.170.0) (2024-03-22)

### Features

* update util function with missing operators and reuse it in the old survey questionnaire ([9913391](https://github.com/ColdPBC/cold-monorepo/commit/991339142cebe41ceba416c32eb83035777a74a9))

# [1.169.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.168.0...v1.169.0) (2024-03-21)

### Features

* add question number to saved and regular questionnaire ([4fa114c](https://github.com/ColdPBC/cold-monorepo/commit/4fa114c932544f461b85024062f1178d95f93f5d))

# [1.168.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.167.3...v1.168.0) (2024-03-21)

### Bug Fixes

* correct subcategory journey preview story ([53c12d3](https://github.com/ColdPBC/cold-monorepo/commit/53c12d371f851ce202586c6c8ed2d80f63ae3dff))

### Features

* handle local storage for expanded sections ([107c803](https://github.com/ColdPBC/cold-monorepo/commit/107c8035c92c52126b5e6e12b954095befeb5c10))
* remove percent slider unnecessary try catch when parsing int ([1f069ae](https://github.com/ColdPBC/cold-monorepo/commit/1f069aee24545afd1e4106cd0da4c3398b76e6cd))
* update dismissible to use org partitioned local storage ([a71be34](https://github.com/ColdPBC/cold-monorepo/commit/a71be341acc7a3ff9937f2b6dfe22a74fc60ed90))

## [1.167.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.167.2...v1.167.3) (2024-03-21)

### Bug Fixes

* remove SurveyUpdate interceptor from update ([000ecb4](https://github.com/ColdPBC/cold-monorepo/commit/000ecb4406db01c3db035c74cf176045f2a50cbd))

## [1.167.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.167.1...v1.167.2) (2024-03-20)

### Bug Fixes

* issue that could result in AI responses not being returned ([d96e71d](https://github.com/ColdPBC/cold-monorepo/commit/d96e71d611eb10a601e50c541d8abb82861a557c))

## [1.167.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.167.0...v1.167.1) (2024-03-20)

### Bug Fixes

* route to return all survey results for an org. ([3a17571](https://github.com/ColdPBC/cold-monorepo/commit/3a1757146c66f4e71ad74980a4a691f8fa8cc73d))
* route to return all survey results for an org. ([919d05e](https://github.com/ColdPBC/cold-monorepo/commit/919d05e69bdae1f992b912a591adc522e32cd0f4))

# [1.167.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.166.1...v1.167.0) (2024-03-20)

### Features

* make assistant instructions configurable from launch darkly ([9c16e88](https://github.com/ColdPBC/cold-monorepo/commit/9c16e88a1e8378902ab110cceafc1fbe48c9c633))

## [1.166.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.166.0...v1.166.1) (2024-03-20)

### Bug Fixes

* bug with `GET /surveys` route. Was returning empty array now returns all survey definitions. ([097621a](https://github.com/ColdPBC/cold-monorepo/commit/097621ac826763dc3238bd79def73bd190ee1f1b))
* deprecate old survey routes ([3eaefcd](https://github.com/ColdPBC/cold-monorepo/commit/3eaefcdeeaa8cce0a4e370da8d4665cff4043e7a))

* route to return all survey results for an org. ([919d05e](https://github.com/ColdPBC/cold-monorepo/commit/919d05e69bdae1f992b912a591adc522e32cd0f4))
* store job data in cache so that it can be used to cancel previous jobs ([93d8811](https://github.com/ColdPBC/cold-monorepo/commit/93d88113adbac36cba9660122c41f825fbfed8f7))
* survey data bugs ([5074dd6](https://github.com/ColdPBC/cold-monorepo/commit/5074dd6fbe1b73e35f02deb096fda2958c096664))

## [1.166.1-cold-647.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.166.0...v1.166.1-cold-647.1) (2024-03-20)

### Bug Fixes

* store job data in cache so that it can be used to cancel previous jobs ([93d8811](https://github.com/ColdPBC/cold-monorepo/commit/93d88113adbac36cba9660122c41f825fbfed8f7))
* survey data bugs ([5074dd6](https://github.com/ColdPBC/cold-monorepo/commit/5074dd6fbe1b73e35f02deb096fda2958c096664))

# [1.166.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.165.1...v1.166.0) (2024-03-19)

### Features

* navigate to regular questionnaire when the last saved question is unbookmarked ([854d4dd](https://github.com/ColdPBC/cold-monorepo/commit/854d4dda29356d25897bbc7e60abf88c3bf33173))

# [1.166.0-COLD-642.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.165.1...v1.166.0-COLD-642.1) (2024-03-18)

### Features

* navigate to regular questionnaire when the last saved question is unbookmarked ([854d4dd](https://github.com/ColdPBC/cold-monorepo/commit/854d4dda29356d25897bbc7e60abf88c3bf33173))

## [1.165.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.165.0...v1.165.1) (2024-03-18)

### Bug Fixes

* update percent slider to handle non number and out of range (<0 or >100) values ([9609db6](https://github.com/ColdPBC/cold-monorepo/commit/9609db6b54c12ba44d4bcbc381dfc41c0c6d0444))

# [1.165.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.164.0...v1.165.0) (2024-03-18)

### Features

* add support for compliance key for multiple compliance sets and impersonating orgs ([b2d80cc](https://github.com/ColdPBC/cold-monorepo/commit/b2d80cc71f38f9804f1ef60c9e138ce27b2ed9ca))

# [1.164.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.163.1...v1.164.0) (2024-03-18)

### Features

* add saved survey questionnaire handling ([54298db](https://github.com/ColdPBC/cold-monorepo/commit/54298db19b686c890092d3b04eb159104b0cbe33))
* check for saved questions only in the saved questions section ([d2a7e35](https://github.com/ColdPBC/cold-monorepo/commit/d2a7e35d96fa52e29c19f2949d75f9fa4bf95397))

## [1.163.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.163.0...v1.163.1) (2024-03-15)

### Bug Fixes

* make sure logo doesn't bleed over the bounding area ([9525479](https://github.com/ColdPBC/cold-monorepo/commit/9525479e7893264e7ba992323850c062f7787284))

# [1.163.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.162.1...v1.163.0) (2024-03-13)

### Features

* make base prompt configurable via darkly ([90bd510](https://github.com/ColdPBC/cold-monorepo/commit/90bd510f18d03f27187311277c0fef0e31dc4158))
* make base prompt configurable via darkly ([9e1c241](https://github.com/ColdPBC/cold-monorepo/commit/9e1c241340c462af5232433b4932e24c8e7b7292))
* make component prompts configurable via darkly ([7e1d978](https://github.com/ColdPBC/cold-monorepo/commit/7e1d97863241a442c6616aba6e3d90ee27321625))
* make tools configurable via darkly ([9bba0e6](https://github.com/ColdPBC/cold-monorepo/commit/9bba0e612038f221fb25ad9d5954062f04e152da))
* update delete assistant function ([20071d0](https://github.com/ColdPBC/cold-monorepo/commit/20071d05ad0fd4fd3fd944a9fc22e8fb313b704d))

## [1.162.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.162.0...v1.162.1) (2024-03-13)

### Bug Fixes

* bug in policies throwing 500 error ([af83962](https://github.com/ColdPBC/cold-monorepo/commit/af839624dbc2a359ba880b3d202a8a24dab64c56))

# [1.162.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.161.1...v1.162.0) (2024-03-13)

### Features

* resolve issue with list item input when values already provided ([58bba97](https://github.com/ColdPBC/cold-monorepo/commit/58bba97f59cc904cd9b9fd5937ed35e9897203a0))
* update list item input design ([db19d00](https://github.com/ColdPBC/cold-monorepo/commit/db19d00881a2b8dfd8f4487236a340cd795353b5))

## [1.161.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.161.0...v1.161.1) (2024-03-13)

### Bug Fixes

* allow select when value provided is a string ([b3675fa](https://github.com/ColdPBC/cold-monorepo/commit/b3675fab8e63ce8b596f0a0daca7c5970746a337))
* dont show selected options when the value is not an array ([93faf3d](https://github.com/ColdPBC/cold-monorepo/commit/93faf3df9f27ba969e69fd102cd43b129ae7d691))

## [1.161.1-COLD-621.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.161.0...v1.161.1-COLD-621.1) (2024-03-13)

### Bug Fixes

* allow select when value provided is a string ([b3675fa](https://github.com/ColdPBC/cold-monorepo/commit/b3675fab8e63ce8b596f0a0daca7c5970746a337))

# [1.161.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.160.0...v1.161.0) (2024-03-13)

### Bug Fixes

* remove broken test ([c5efc76](https://github.com/ColdPBC/cold-monorepo/commit/c5efc765cfb2b0d2ef77cb3089e2d0052e3cfeb9))
* Remove journey module on subcategory actions list page ([f4cf554](https://github.com/ColdPBC/cold-monorepo/commit/f4cf554ec0ab87abb29cde6d1262aa84486ab8b6))

### Features

* Update AI message look and feel and add it for additional context ([5dd8798](https://github.com/ColdPBC/cold-monorepo/commit/5dd8798fa8da2657556dc8c6fc6ab7997cf71db6))

# [1.160.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.159.1...v1.160.0) (2024-03-13)

### Features

* show ai icon if question is ai answered ([fd2a17e](https://github.com/ColdPBC/cold-monorepo/commit/fd2a17e9cb53b90a7ea076b7c92c9fe589888b0a))

## [1.159.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.159.0...v1.159.1) (2024-03-12)

### Bug Fixes

* bug that deleted survey rather than survey data ([b3b8734](https://github.com/ColdPBC/cold-monorepo/commit/b3b87346ed91bbb0955138023789a4fedd8325d1))

# [1.159.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.158.0...v1.159.0) (2024-03-12)

### Bug Fixes

* Fix test related to Assessments ([7b12ec7](https://github.com/ColdPBC/cold-monorepo/commit/7b12ec78cdb88df9f37ff619f3810ae085280c51))
* properly support multiple urls in OrgSWR ([6b8cc3a](https://github.com/ColdPBC/cold-monorepo/commit/6b8cc3a790d380444452632165291069f10439c2))

### Features

* Finish adjustment of Journey component to Assessment component and add stories ([0827305](https://github.com/ColdPBC/cold-monorepo/commit/0827305471e1d98acdf1042ac10e5790df91ebaf))
* set up assessments page to use compliance info ([1641b5b](https://github.com/ColdPBC/cold-monorepo/commit/1641b5b14844c32902dc7b5add613f43af67a8ce))

# [1.158.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.157.0...v1.158.0) (2024-03-12)

### Features

* mqtt updates ([59acc3b](https://github.com/ColdPBC/cold-monorepo/commit/59acc3ba771f2d45c63c29939181c7cb221fbb3f))

# [1.158.0-COLD-573.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.157.0...v1.158.0-COLD-573.1) (2024-03-11)

### Features

* mqtt updates ([59acc3b](https://github.com/ColdPBC/cold-monorepo/commit/59acc3ba771f2d45c63c29939181c7cb221fbb3f))

# [1.157.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.156.0...v1.157.0) (2024-03-11)

### Bug Fixes

* properly support multiple urls in OrgSWR ([6b8cc3a](https://github.com/ColdPBC/cold-monorepo/commit/6b8cc3a790d380444452632165291069f10439c2))

### Features

* Finish adjustment of Journey component to Assessment component and add stories ([0827305](https://github.com/ColdPBC/cold-monorepo/commit/0827305471e1d98acdf1042ac10e5790df91ebaf))
* set up assessments page to use compliance info ([1641b5b](https://github.com/ColdPBC/cold-monorepo/commit/1641b5b14844c32902dc7b5add613f43af67a8ce))

# [1.155.0-cold-522.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.154.0...v1.155.0-cold-522.1) (2024-03-08)

### Bug Fixes

* properly support multiple urls in OrgSWR ([6b8cc3a](https://github.com/ColdPBC/cold-monorepo/commit/6b8cc3a790d380444452632165291069f10439c2))

### Features

* set up assessments page to use compliance info ([1641b5b](https://github.com/ColdPBC/cold-monorepo/commit/1641b5b14844c32902dc7b5add613f43af67a8ce))

# [1.154.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.153.0...v1.154.0) (2024-03-07)

### Features

* increase robustness of next steps module ([0ffd364](https://github.com/ColdPBC/cold-monorepo/commit/0ffd36438db014c36befd23a4e209a998956dff4))

# [1.153.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.152.0...v1.153.0) (2024-03-07)

### Features

* one more for move to 2023 for footprinting year ([2664cdd](https://github.com/ColdPBC/cold-monorepo/commit/2664cdde586a4bf582f607dd97c6ec4ccdb68608))

# [1.152.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.151.0...v1.152.0) (2024-03-07)

### Features

* move to 2023 for footprinting year ([e772b4c](https://github.com/ColdPBC/cold-monorepo/commit/e772b4ccc4b088c6579ba3d2fa2d0782e3de49ae))
* move to 2023 for footprinting year ([#325](https://github.com/ColdPBC/cold-monorepo/issues/325)) ([53c9e06](https://github.com/ColdPBC/cold-monorepo/commit/53c9e061ceb2c9bc787576d76cdb399591b54935))

# [1.151.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.150.1...v1.151.0) (2024-03-07)

### Features

* show next actions and emissions charts again, but put emissions chart behind a flag ([b6e660c](https://github.com/ColdPBC/cold-monorepo/commit/b6e660c665f1ddab0657d27e2ce87747580aeb85))

## [1.150.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.150.0...v1.150.1) (2024-03-07)

### Bug Fixes

* tweak prompts ([c5bdd42](https://github.com/ColdPBC/cold-monorepo/commit/c5bdd420cd4d218204984d991cbd0861781594cb))

# [1.150.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.149.0...v1.150.0) (2024-03-07)

### Features

* add spinner and disable button when uploading ([722edee](https://github.com/ColdPBC/cold-monorepo/commit/722edee835663ed6a674319fd097a098fdf76b83))
* add timeout to axiosfetcher options ([dee7ae1](https://github.com/ColdPBC/cold-monorepo/commit/dee7ae10f8268c51de9e1a02efdf59a3a191cfa1))

# [1.149.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.148.0...v1.149.0) (2024-03-06)

### Features

* add spinner and disable button when uploading ([722edee](https://github.com/ColdPBC/cold-monorepo/commit/722edee835663ed6a674319fd097a098fdf76b83))
* handle when survey is different than response from the API ([76ed8af](https://github.com/ColdPBC/cold-monorepo/commit/76ed8af0d86306446e8b43b217e08ebeeb35ec50))
* remove prevention of submission of additional context if no answer provided ([3d8e47f](https://github.com/ColdPBC/cold-monorepo/commit/3d8e47f65c41d26bd511df70c4627d9023e9c191))
* sort survey sections by category and then idx ([4f755a4](https://github.com/ColdPBC/cold-monorepo/commit/4f755a44ea1add6bf5ccc313bf518d612e20984e))

# [1.149.0-COLD-595.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.149.0-COLD-595.1...v1.149.0-COLD-595.2) (2024-03-06)

### Features

* handle when survey is different than response from the API ([76ed8af](https://github.com/ColdPBC/cold-monorepo/commit/76ed8af0d86306446e8b43b217e08ebeeb35ec50))
* sort survey sections by category and then idx ([4f755a4](https://github.com/ColdPBC/cold-monorepo/commit/4f755a44ea1add6bf5ccc313bf518d612e20984e))

# [1.149.0-COLD-595.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.148.0...v1.149.0-COLD-595.1) (2024-03-06)

### Features

* remove prevention of submission of additional context if no answer provided ([3d8e47f](https://github.com/ColdPBC/cold-monorepo/commit/3d8e47f65c41d26bd511df70c4627d9023e9c191))

# [1.148.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.147.1...v1.148.0) (2024-03-06)

### Features

* add scroll bar when left nav items are too high ([e8f8596](https://github.com/ColdPBC/cold-monorepo/commit/e8f859683bb240bdeb39c9b698d524e240dc87ad))

# [1.148.0-COLD-587.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.147.1...v1.148.0-COLD-587.1) (2024-03-06)

### Features

* add scroll bar when left nav items are too high ([e8f8596](https://github.com/ColdPBC/cold-monorepo/commit/e8f859683bb240bdeb39c9b698d524e240dc87ad))

## [1.147.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.147.0...v1.147.1) (2024-03-06)

### Bug Fixes

* only show surveys for activated compliances ([65eddb5](https://github.com/ColdPBC/cold-monorepo/commit/65eddb56999c1118373af03ce2326802219c9010))

# [1.147.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.146.0...v1.147.0) (2024-03-06)

### Features

* if any questions are answered show the questionnaire ([aafd774](https://github.com/ColdPBC/cold-monorepo/commit/aafd7745078a59ed7041ba1f58211823050b6e28))

# [1.146.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.145.0...v1.146.0) (2024-03-06)

### Bug Fixes

* reduce spacing in wizard top cards ([eb46f48](https://github.com/ColdPBC/cold-monorepo/commit/eb46f48e79b584be438999c9798c927e3ea8ca75))

### Features

* show compliances with next steps module ([dee174b](https://github.com/ColdPBC/cold-monorepo/commit/dee174be162a8d894d84fc2913371a7cd3df79c0))

# [1.146.0-cold-583.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.145.0...v1.146.0-cold-583.1) (2024-03-06)

### Bug Fixes

* reduce spacing in wizard top cards ([eb46f48](https://github.com/ColdPBC/cold-monorepo/commit/eb46f48e79b584be438999c9798c927e3ea8ca75))

### Features

* show compliances with next steps module ([dee174b](https://github.com/ColdPBC/cold-monorepo/commit/dee174be162a8d894d84fc2913371a7cd3df79c0))

# [1.145.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.144.0...v1.145.0) (2024-03-06)

### Features

* add and use active key to local storage ([a6cda28](https://github.com/ColdPBC/cold-monorepo/commit/a6cda28b1d294208b10969a5abd98a3d5f339086))
* allow ai answer array to answer single select option ([e4e6e83](https://github.com/ColdPBC/cold-monorepo/commit/e4e6e83017ad122cd83230ca682265e5bcb5f75f))
* handle collapse free form ([affe944](https://github.com/ColdPBC/cold-monorepo/commit/affe944ed8a7229b2ab19b1d2acf175ee01533a3))

# [1.144.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.143.0...v1.144.0) (2024-03-06)

### Bug Fixes

* improve look and feel of long questions (COLD-572) ([500f239](https://github.com/ColdPBC/cold-monorepo/commit/500f2390d7f9cdd972800f5eb2f5b4b3dd54e58e))
* swap users and account settings ([89ac8e7](https://github.com/ColdPBC/cold-monorepo/commit/89ac8e770250a3dd25c16ad4b63b5ffe432bb6ec))
* update copy (COLD-550) ([33b2817](https://github.com/ColdPBC/cold-monorepo/commit/33b28174b116e48c6cd413adf9d2e5a2db42e80c))

### Features

* align look and feel of progress bars (COLD-580) ([5c18905](https://github.com/ColdPBC/cold-monorepo/commit/5c18905dc0e7ad31830b90929a6e592d599e1fd7))
* improve look and feel of AI box ([b8b6abf](https://github.com/ColdPBC/cold-monorepo/commit/b8b6abfd563876ea66314ffa16bd50dd3d239e20))
* more tweaks for look and feel of assessment cards (COLD-580) ([7a9d5ef](https://github.com/ColdPBC/cold-monorepo/commit/7a9d5ef416e4c088fcf6b5bcf4f97111ebb91b20))
* some copy tweaks (COLD-545) ([a83bd0c](https://github.com/ColdPBC/cold-monorepo/commit/a83bd0c08788ce5c2bcfb3d6dd4fd8af0d3c5415))

# [1.143.0-cold-544.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.142.0...v1.143.0-cold-544.1) (2024-03-06)

### Bug Fixes

* improve look and feel of long questions (COLD-572) ([500f239](https://github.com/ColdPBC/cold-monorepo/commit/500f2390d7f9cdd972800f5eb2f5b4b3dd54e58e))
* swap users and account settings ([89ac8e7](https://github.com/ColdPBC/cold-monorepo/commit/89ac8e770250a3dd25c16ad4b63b5ffe432bb6ec))
* update copy (COLD-550) ([33b2817](https://github.com/ColdPBC/cold-monorepo/commit/33b28174b116e48c6cd413adf9d2e5a2db42e80c))

# [1.143.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.142.0...v1.143.0) (2024-03-06)

### Features

* align look and feel of progress bars (COLD-580) ([5c18905](https://github.com/ColdPBC/cold-monorepo/commit/5c18905dc0e7ad31830b90929a6e592d599e1fd7))
* improve look and feel of AI box ([b8b6abf](https://github.com/ColdPBC/cold-monorepo/commit/b8b6abfd563876ea66314ffa16bd50dd3d239e20))
* more tweaks for look and feel of assessment cards (COLD-580) ([7a9d5ef](https://github.com/ColdPBC/cold-monorepo/commit/7a9d5ef416e4c088fcf6b5bcf4f97111ebb91b20))
* some copy tweaks (COLD-545) ([a83bd0c](https://github.com/ColdPBC/cold-monorepo/commit/a83bd0c08788ce5c2bcfb3d6dd4fd8af0d3c5415))
* make the assessments page empty for right now ([d22020b](https://github.com/ColdPBC/cold-monorepo/commit/d22020bd7b12ef393a315c49c673c15e65d108f1))
* update text of card when it's not populated with data ([9f34cd5](https://github.com/ColdPBC/cold-monorepo/commit/9f34cd5ad2a0daea47bf2f0a99afed11636cdfa3))

# [1.142.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.141.3...v1.142.0) (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([4b04ad4](https://github.com/ColdPBC/cold-monorepo/commit/4b04ad40759803f21554b4e531804a43429161f6))

### Features

* underline text on hover for compliance question ([3b8bf5c](https://github.com/ColdPBC/cold-monorepo/commit/3b8bf5cee156b93c74b8782acd47d99ff247a160))

## [1.141.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.141.2...v1.141.3) (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([3c40731](https://github.com/ColdPBC/cold-monorepo/commit/3c407316defdd965690738b14ae9286777e9be0a))

## [1.141.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.141.1...v1.141.2) (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([a671531](https://github.com/ColdPBC/cold-monorepo/commit/a67153117d2b56fd2edfd32aa4be00dd300ed258))

## [1.141.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.141.0...v1.141.1) (2024-03-06)

### Bug Fixes

* broken QuestionAnswered count ([47f68cf](https://github.com/ColdPBC/cold-monorepo/commit/47f68cf6c4745a3d94799f8bf875cfa2b48c0fb1))

# [1.141.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.140.3...v1.141.0) (2024-03-05)

### Features

* sort api response ([436ad9b](https://github.com/ColdPBC/cold-monorepo/commit/436ad9b432fe0c0808906eb64fd1443f48086c2b))

## [1.140.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.140.2...v1.140.3) (2024-03-05)

### Bug Fixes

* strip rubric from the survey ([f1d7c21](https://github.com/ColdPBC/cold-monorepo/commit/f1d7c21346b07a41c14f4f13c2ad03ac7d8bc469))

## [1.140.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.140.1...v1.140.2) (2024-03-05)

### Bug Fixes

* compliance filtering issue ([7e62721](https://github.com/ColdPBC/cold-monorepo/commit/7e62721a58e6647159f406825be528b04c380034))

## [1.140.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.140.0...v1.140.1) (2024-03-05)

### Bug Fixes

* create thread on each section and run all sections in parallel ([86c7c35](https://github.com/ColdPBC/cold-monorepo/commit/86c7c3574bdbea058e98f69f5e54220948273532))
* darkly initilization issue ([66a90b7](https://github.com/ColdPBC/cold-monorepo/commit/66a90b73894d7dee4e4a419bee1a903b6972f20f))
* make gpt model configured via darkly ([99c1750](https://github.com/ColdPBC/cold-monorepo/commit/99c17504e19cbb34bad9989b2ac9717d69b3b3b1))
* request size issue ([3d36621](https://github.com/ColdPBC/cold-monorepo/commit/3d36621426c05c920eaeba5f61847a8b6b8e6917))
* tls issue with redis ([12f398d](https://github.com/ColdPBC/cold-monorepo/commit/12f398db128c2a6c5a8cd44c0032cca89285bc72))

# [1.140.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.139.0...v1.140.0) (2024-03-05)

### Features

* remove multiply 100 from assessments preview percentage ([00aa1ad](https://github.com/ColdPBC/cold-monorepo/commit/00aa1ad6935adc6b224828f46714dd432d6b8931))

# [1.139.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.138.0...v1.139.0) (2024-03-05)

### Features

* use subtract icon section that has completed ([70d41ec](https://github.com/ColdPBC/cold-monorepo/commit/70d41eca26b069c9c6831234e1e251526da8b442))

# [1.138.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.137.1...v1.138.0) (2024-03-05)

### Features

* add index to question number ([7dc78ca](https://github.com/ColdPBC/cold-monorepo/commit/7dc78ca0a01a8bb580eddaec121f979a2118eba0))
* do not send progress as well as definition ([6b4406e](https://github.com/ColdPBC/cold-monorepo/commit/6b4406e007f94526727989a7fcd68a93419186c5))
* sections not complete, dont show checkmark ([6bed2f2](https://github.com/ColdPBC/cold-monorepo/commit/6bed2f2ad031ee03277da68e136838c7d28d9151))

## [1.137.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.137.0...v1.137.1) (2024-03-05)

### Bug Fixes

* temporarily remove caching for getting an org survey ([ebcc8f9](https://github.com/ColdPBC/cold-monorepo/commit/ebcc8f9446b1e329d81a65f1bcd6ad412d8eb9ea))
* temporarily remove caching for getting an org survey ([#311](https://github.com/ColdPBC/cold-monorepo/issues/311)) ([fb18eff](https://github.com/ColdPBC/cold-monorepo/commit/fb18eff6c1dd52641732e2d06d963f091da85f01))

# [1.137.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.136.0...v1.137.0) (2024-03-05)

### Features

* add line clamp for section names ([0b3e32c](https://github.com/ColdPBC/cold-monorepo/commit/0b3e32c5e165c0fb241dda6c3a6f463acc65ecf5))

# [1.136.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.135.0...v1.136.0) (2024-03-05)

### Features

* remove check to take user to processing ([ff69f06](https://github.com/ColdPBC/cold-monorepo/commit/ff69f06f670e2f25a7c4752602d26f9948a753d9))
* use question index instead of idx for question number in a section ([370f5f2](https://github.com/ColdPBC/cold-monorepo/commit/370f5f2bd1f2a87741912a510571e50f2acf659a))

# [1.135.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.134.0...v1.135.0) (2024-03-05)

### Features

* if there are any attempted ai questions, then go to questionnaire ([e362c52](https://github.com/ColdPBC/cold-monorepo/commit/e362c52364637918cd50971f59bd7327c71d6ed8))

# [1.134.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.133.0...v1.134.0) (2024-03-05)

### Features

* category issue ([7400d7a](https://github.com/ColdPBC/cold-monorepo/commit/7400d7a5f53a7082a0ba2cc7bd78695c6b7f5308))
* fix issue ([7863418](https://github.com/ColdPBC/cold-monorepo/commit/7863418fefdbe808940f4bc708069a4fedc66b64))

# [1.133.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.132.0...v1.133.0) (2024-03-05)

### Features

* make change to survey progress to be put out of definition structure ([18dc398](https://github.com/ColdPBC/cold-monorepo/commit/18dc39897dbd3e8f15998611da93a0e061556713))

# [1.133.0-COLD-542.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.132.0...v1.133.0-COLD-542.1) (2024-03-05)

### Features

* make change to survey progress to be put out of definition structure ([18dc398](https://github.com/ColdPBC/cold-monorepo/commit/18dc39897dbd3e8f15998611da93a0e061556713))

# [1.132.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.131.0...v1.132.0) (2024-03-05)

### Features

* add error boundary to compliance assessments ([ff16930](https://github.com/ColdPBC/cold-monorepo/commit/ff16930df7b112b1734a1c5390a16c5ae319f744))
* add small card outline to progress card ([e06d6d0](https://github.com/ColdPBC/cold-monorepo/commit/e06d6d05a1e34bd94c33067ffab3bb7792a71ab3))
* create new compliance assessments preview card ([daa4ccf](https://github.com/ColdPBC/cold-monorepo/commit/daa4ccfd51f3343e1dafaae452e4626a2348ae29))
* update progress card percentage to fixed 0 decimal points ([3f585d2](https://github.com/ColdPBC/cold-monorepo/commit/3f585d2049ca4718f0bd9d2cb7342d34d3b1884b))
* update survey mutating ([55c1200](https://github.com/ColdPBC/cold-monorepo/commit/55c120074440a5282c2cbec1b7278006e4096dfa))
* use progress for compliance progress and assessments preview card ([52de3ae](https://github.com/ColdPBC/cold-monorepo/commit/52de3ae420f47d7b3623c533bb4862c427581f1b))
* use survey progress total score and max score for assessments preview card ([4f33be1](https://github.com/ColdPBC/cold-monorepo/commit/4f33be139bd5546ef605e63742cfd5c003139db5))

# [1.131.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.130.3...v1.131.0) (2024-03-05)

### Features

* allow input value to be submitted with list ([e89f3e9](https://github.com/ColdPBC/cold-monorepo/commit/e89f3e9fab2ff223b57fcca3e76f88c4dec66422))

## [1.130.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.130.2...v1.130.3) (2024-03-05)

### Bug Fixes

* trying to debug build issues ([dc7a226](https://github.com/ColdPBC/cold-monorepo/commit/dc7a2269da5c9973efe20f48cf606675babc1700))

## [1.130.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.130.1...v1.130.2) (2024-03-05)

### Bug Fixes

* trying to debug build issues ([c84d2dc](https://github.com/ColdPBC/cold-monorepo/commit/c84d2dc10391c93b51b8e20fcd2597a527593974))

## [1.130.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.130.0...v1.130.1) (2024-03-05)

### Bug Fixes

* issues caused by other refactoring ([68fcccd](https://github.com/ColdPBC/cold-monorepo/commit/68fcccda34bcc6ce230ab449eef6fdd1302cff85))

# [1.130.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.129.0...v1.130.0) (2024-03-04)

### Bug Fixes

* revert to including `definition` object ([3442d2c](https://github.com/ColdPBC/cold-monorepo/commit/3442d2c366f2d865d2d24598c1d4b794fe3d9eae))

### Features

* update progress object to add: ([666f8c1](https://github.com/ColdPBC/cold-monorepo/commit/666f8c156df21960cd363fec326cfa37610926bf))

# [1.129.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.128.0...v1.129.0) (2024-03-04)

### Features

* add error boundary for compliance flow ([8d3af39](https://github.com/ColdPBC/cold-monorepo/commit/8d3af3941b3ee3ab6b65b9a7201d98b55bf26707))

# [1.128.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.127.0...v1.128.0) (2024-03-04)

### Features

* include max score in survey response ([156fe47](https://github.com/ColdPBC/cold-monorepo/commit/156fe47400d13a1f434c8a1d753ca8b9ccb77587))

# [1.127.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.126.1...v1.127.0) (2024-03-04)

### Features

* home page update for rei compliance mvp ([52df416](https://github.com/ColdPBC/cold-monorepo/commit/52df4160e56a0c19f96955bd081ff5d5c42ff70b))
* update compliance_definitions/organization to organizations ([7b5caed](https://github.com/ColdPBC/cold-monorepo/commit/7b5caedfe26477de44b2277c07516abefa6a40cb))

## [1.126.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.126.0...v1.126.1) (2024-03-04)

### Bug Fixes

* s3 bug related to file uploads ([588ec12](https://github.com/ColdPBC/cold-monorepo/commit/588ec12c83354d17a7e44d5b2ad4f28c03a6b12e))
* s3 bug related to file uploads ([5785029](https://github.com/ColdPBC/cold-monorepo/commit/5785029fc1c746d58481abbe6da37fc53e1bbbd4))

# [1.126.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.125.0...v1.126.0) (2024-03-04)

### Features

* use plus and subtract icons for compliance survey nav ([5532389](https://github.com/ColdPBC/cold-monorepo/commit/55323896de522788cec6a92c91ab82a9d93b860e))

# [1.125.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.124.0...v1.125.0) (2024-03-04)

### Features

* create compliance progress card ([90bf66a](https://github.com/ColdPBC/cold-monorepo/commit/90bf66aa68d9f13523a5a97a6b3de1bc1f0a9834))

# [1.124.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.123.3...v1.124.0) (2024-03-04)

### Features

* compliance survey questionnaire ([ee48487](https://github.com/ColdPBC/cold-monorepo/commit/ee48487eb4db62e07490adc1a84576a993490ba7))
* created custom checkbox icon ([01217fc](https://github.com/ColdPBC/cold-monorepo/commit/01217fcd8b673bbf4d2a01c39f56596101a82abc))
* handle last question of the survey answered ([a031b4c](https://github.com/ColdPBC/cold-monorepo/commit/a031b4cbef703bb3fbfcc81436b61b9977323079))
* on submit close survey ([bcc2da4](https://github.com/ColdPBC/cold-monorepo/commit/bcc2da4d8a3e474bdc92ca945becea2ef1d5cd6a))
* revert small checkbox icon ([5e84335](https://github.com/ColdPBC/cold-monorepo/commit/5e84335b74fd80090177e1b78a187e9176ad5a36))
* set category opened when navigated to section ([914da20](https://github.com/ColdPBC/cold-monorepo/commit/914da20a000587230fc62d1ed545fcfbec4fa4c2))
* show highlighted background for section when selected ([d45facb](https://github.com/ColdPBC/cold-monorepo/commit/d45facb0b647857d07b1a7928c573c118112cac7))

## [1.123.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.123.2...v1.123.3) (2024-03-04)

### Bug Fixes

* add logging and simplify file uploads ([296b014](https://github.com/ColdPBC/cold-monorepo/commit/296b014afc81f5d295b800a5652b7b75e33c4a7d))

## [1.123.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.123.1...v1.123.2) (2024-03-04)

### Bug Fixes

* add missing 'await' that was causing members to not be returned ([263a51d](https://github.com/ColdPBC/cold-monorepo/commit/263a51d634ed76b87ce9172d05c2c7434f4adc82))

## [1.123.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.123.0...v1.123.1) (2024-03-04)

### Bug Fixes

* bug preventing progress from being added to survey ([04f0da0](https://github.com/ColdPBC/cold-monorepo/commit/04f0da0f826af5d3982c9f5e10d78307fe787f3b))
* refactor compliances ([a3dadc4](https://github.com/ColdPBC/cold-monorepo/commit/a3dadc47a269c81b0762b73a1adf1dab33d15041))

# [1.123.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.122.2...v1.123.0) (2024-03-01)

### Features

* Change POST to PUT to start ai processing ([49108b2](https://github.com/ColdPBC/cold-monorepo/commit/49108b226df884865f162882958e515f466cbf80))
* update compliance page to activate and go to wizard ([1a055f3](https://github.com/ColdPBC/cold-monorepo/commit/1a055f337d99743113e29a3ff7a70a561e39d6fb))

## [1.122.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.122.1...v1.122.2) (2024-03-01)

### Bug Fixes

* survey dependency bug ([fd5bb65](https://github.com/ColdPBC/cold-monorepo/commit/fd5bb655e4f4495ca049165fc644d35ffa4852b9))>>>>>>> main

## [1.122.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.122.0...v1.122.1) (2024-03-01)

### Bug Fixes

* survey dependency bug ([18b074c](https://github.com/ColdPBC/cold-monorepo/commit/18b074ca2345bfec2d85adfbd2415cfe5c7a60db))

# [1.122.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.121.1...v1.122.0) (2024-03-01)

### Bug Fixes

* send definition rather than whole survey ([c21e376](https://github.com/ColdPBC/cold-monorepo/commit/c21e376962ce32974d33eb583cb89ec8b0ee7260))

### Features

* add scoring service ([b2822c2](https://github.com/ColdPBC/cold-monorepo/commit/b2822c2a432fc4c1873df6df0e72036e7a146599))

## [1.121.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.121.0...v1.121.1) (2024-02-29)

### Bug Fixes

* add missing dependency ([cb7e395](https://github.com/ColdPBC/cold-monorepo/commit/cb7e395dcdcc26a0024aebeac5fa02f439a755a8))

# [1.121.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.120.0...v1.121.0) (2024-02-29)

### Bug Fixes

* update /settings/user to /settings/users ([8f02a47](https://github.com/ColdPBC/cold-monorepo/commit/8f02a47757d60ec6619cb52ae006d67e16a1aa0a))

### Features

* added checkbox input type ([4c0cbe0](https://github.com/ColdPBC/cold-monorepo/commit/4c0cbe0f3fa9bb9b5183b2733ae27468efb9d99b))
* created list item input component, added plus and subtract icons ([2a5dae1](https://github.com/ColdPBC/cold-monorepo/commit/2a5dae177c86c5b0c0220d8482492be44167d9ce))
* has any operator to check if the value array has any of the comparison array values ([231de0e](https://github.com/ColdPBC/cold-monorepo/commit/231de0e22028afe1857cd09daca6110410e1670f))
* point assessments to old journey page ([5f41bb2](https://github.com/ColdPBC/cold-monorepo/commit/5f41bb2bdaefdbfdea64fd3ec2e5e4091475f584))
* put list on top of list item input, prevent submission of empty values and empty list ([70a88f3](https://github.com/ColdPBC/cold-monorepo/commit/70a88f395e196aaee3c99279790ebe8870d8833a))
* remove company info from sidebar ([21581ee](https://github.com/ColdPBC/cold-monorepo/commit/21581eeb1d83420c8b58755c8943b4af0e9c3cd9))
* update form input number, currency styling ([d03e513](https://github.com/ColdPBC/cold-monorepo/commit/d03e513e4e396c8d1bc6819f5855496c1ddf0963))
* update icons to use color prop ([41f133f](https://github.com/ColdPBC/cold-monorepo/commit/41f133f0841474e6650e4a0232e9f4ab09c5876c))
* updated styling for default input types ([4482218](https://github.com/ColdPBC/cold-monorepo/commit/448221877396bba124e79d09ed945f561bb019c8))

# [1.120.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.119.0...v1.120.0) (2024-02-29)

### Features

* add array comparison, has and in opertators ([4a4d349](https://github.com/ColdPBC/cold-monorepo/commit/4a4d3495bcc9e327935fc63a93aabecd59293ade))

# [1.119.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.118.0...v1.119.0) (2024-02-29)

### Features

* add progress array to response ([f11989c](https://github.com/ColdPBC/cold-monorepo/commit/f11989c7e3facce6161bc08de070bfddc2959c2a))

* add survey filter class ([f53ad9a](https://github.com/ColdPBC/cold-monorepo/commit/f53ad9a8409a3e108964f2a9fb0443fa07b0e73c))

# [1.118.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.117.0...v1.118.0) (2024-02-27)

### Features

* added processing step to compliance flow ([be0a790](https://github.com/ColdPBC/cold-monorepo/commit/be0a790be3db1ddd2a2e6f72915b024331a2aede))

# [1.117.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.116.1...v1.117.0) (2024-02-27)

### Features

* adding multifetcher with mutliple urls ([3db8f97](https://github.com/ColdPBC/cold-monorepo/commit/3db8f970ce16510c0176dc12bcd959a8427bfff8))
* handle maintaining user progress ([ceb7af8](https://github.com/ColdPBC/cold-monorepo/commit/ceb7af8593a5c5fd4d1b83b486c61256b7b17c88))
* have step stories use rei 2 compliance data ([67f28cc](https://github.com/ColdPBC/cold-monorepo/commit/67f28ccff2e8d3c9dbbec308d1940e8f0977af7c))

## [1.116.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.116.0...v1.116.1) (2024-02-22)

### Bug Fixes

* bug throwing 'no organizations found in DB...' error ([51111cf](https://github.com/ColdPBC/cold-monorepo/commit/51111cfc35df5fea40f8e9506753c2fa3d1b6633))
* possible null reference ([747aac6](https://github.com/ColdPBC/cold-monorepo/commit/747aac6ac8d06d3b32cbd02497ee807790dee79d))
* this should default to openai ([4e93cd2](https://github.com/ColdPBC/cold-monorepo/commit/4e93cd2c27ffa4ce80fbbce73e89d9d67216f3e3))

# [1.116.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.115.0...v1.116.0) (2024-02-22)

### Features

* create documents upload wizard ([318a259](https://github.com/ColdPBC/cold-monorepo/commit/318a259c56b3b64944de3949f66d8d7d6fbf8744))
* Handle documents upload in document uploads step ([dee0457](https://github.com/ColdPBC/cold-monorepo/commit/dee045718485f5cefada5dce9ab455bc4e11275d))
* made updates to reuse functions for document upload ([f9398c0](https://github.com/ColdPBC/cold-monorepo/commit/f9398c03b82d1515946e7dedba65c17ec7aa5d0c))

# [1.116.0-COLD-498.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.115.0...v1.116.0-COLD-498.1) (2024-02-22)

### Features

* create documents upload wizard ([318a259](https://github.com/ColdPBC/cold-monorepo/commit/318a259c56b3b64944de3949f66d8d7d6fbf8744))

# [1.115.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.114.2...v1.115.0) (2024-02-22)

### Features

* added automate compliance flow step ([a24d563](https://github.com/ColdPBC/cold-monorepo/commit/a24d56350c46083821e5fb44ee5222e59d8046a3))
* added new compliance lair base for steps that have the same layout ([c914541](https://github.com/ColdPBC/cold-monorepo/commit/c9145411e4e63e5280142da4dbb9f10c200161f8))
* correct post requests to compliance endpoint ([5406c18](https://github.com/ColdPBC/cold-monorepo/commit/5406c180001a95fff60ab30f274db51fac93caf7))
* remove open ai fetcher ([0b633b2](https://github.com/ColdPBC/cold-monorepo/commit/0b633b28676e8a0b77487056809a54b868f489de))
* remove VITE_OPENAI_URL references ([43f6678](https://github.com/ColdPBC/cold-monorepo/commit/43f6678562639b741863bf232cc6c429f48b32ef))
* updated storybook mock provider to have wizard context ([f7a9b92](https://github.com/ColdPBC/cold-monorepo/commit/f7a9b920c680a136be9523bdc623be6c9e29ad90))

# [1.115.0-COLD-499.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.115.0-COLD-499.1...v1.115.0-COLD-499.2) (2024-02-21)

### Features

* added new compliance lair base for steps that have the same layout ([c914541](https://github.com/ColdPBC/cold-monorepo/commit/c9145411e4e63e5280142da4dbb9f10c200161f8))
* updated storybook mock provider to have wizard context ([f7a9b92](https://github.com/ColdPBC/cold-monorepo/commit/f7a9b920c680a136be9523bdc623be6c9e29ad90))

# [1.115.0-COLD-499.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.114.2...v1.115.0-COLD-499.1) (2024-02-20)

### Features

* added automate compliance flow step ([a24d563](https://github.com/ColdPBC/cold-monorepo/commit/a24d56350c46083821e5fb44ee5222e59d8046a3))
* correct post requests to compliance endpoint ([5406c18](https://github.com/ColdPBC/cold-monorepo/commit/5406c180001a95fff60ab30f274db51fac93caf7))

## [1.114.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.114.1...v1.114.2) (2024-02-20)

### Bug Fixes

* make organization files a module ([d58fa9b](https://github.com/ColdPBC/cold-monorepo/commit/d58fa9b71cdf563f66aea192134dfcb6966e9b3b))

## [1.114.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.114.0...v1.114.1) (2024-02-20)

### Bug Fixes

* inconsistent AWS credentials object ([5b261df](https://github.com/ColdPBC/cold-monorepo/commit/5b261df61c7037ab1c571af47da6070f69fc7fe7))

# [1.114.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.113.0...v1.114.0) (2024-02-15)

### Features

* created wizard flow with compliance sets ([9ed0c55](https://github.com/ColdPBC/cold-monorepo/commit/9ed0c556ead1a146b49f384fb3c263f3f098be93))
* removed next and previous buttons from compliance wizard, renamed automation to progress route ([b729fcc](https://github.com/ColdPBC/cold-monorepo/commit/b729fccd4b2be92a2d661a117f709356b95a79af))

# [1.114.0-COLD-497.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.113.0...v1.114.0-COLD-497.1) (2024-02-15)

### Features

* created wizard flow with compliance sets ([9ed0c55](https://github.com/ColdPBC/cold-monorepo/commit/9ed0c556ead1a146b49f384fb3c263f3f098be93))

# [1.113.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.112.1...v1.113.0) (2024-02-15)

### Features

* correct actions route reference ([ae09760](https://github.com/ColdPBC/cold-monorepo/commit/ae09760dbcd59ac1f43ab617cfb12cd511f1e181))
* Made updates for tests ([11fbb46](https://github.com/ColdPBC/cold-monorepo/commit/11fbb4639bea898c7638960992977736d97c1e07))
* point footprint links to reports/carbon_footprint page ([d6e74c3](https://github.com/ColdPBC/cold-monorepo/commit/d6e74c3cc415f9167ff19ebdc0cff793f088b44c))
* remove management from account and user management sidebar items ([535f1a3](https://github.com/ColdPBC/cold-monorepo/commit/535f1a36d312d2e6816538ab8614883ff2d57d91))
* update settings pages with correct titles ([ecd9e42](https://github.com/ColdPBC/cold-monorepo/commit/ecd9e427c868f629b09349762126eafb4935f68c))
* updated nav for REI compliance mvp ([165b3ac](https://github.com/ColdPBC/cold-monorepo/commit/165b3acc2d4a11de4d1ef497930e52b8884af035))

## [1.112.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.112.0...v1.112.1) (2024-02-14)

### Bug Fixes

* fix user undefined error and throw error when they occur during updating team member ([2dd6e48](https://github.com/ColdPBC/cold-monorepo/commit/2dd6e48805892692bd3caafbd9f9be4e00da7029))

## [1.112.1-COLD-508.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.112.0...v1.112.1-COLD-508.1) (2024-02-14)

### Bug Fixes

* fix user undefined error and throw error when they occur during updating team member ([2dd6e48](https://github.com/ColdPBC/cold-monorepo/commit/2dd6e48805892692bd3caafbd9f9be4e00da7029))

# [1.112.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.111.0...v1.112.0) (2024-02-13)

### Features

* remove initial survey check on application and dependencies ([24afcbf](https://github.com/ColdPBC/cold-monorepo/commit/24afcbfe02c65296ec015d7d9b7ab7f7f7657486))

# [1.111.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.110.1...v1.111.0) (2024-02-13)

### Features

* added new document upload flag and put journry page and modules behind compliance flag ([42a8d0c](https://github.com/ColdPBC/cold-monorepo/commit/42a8d0cf09b0da2ef1cf76cc3e4e60553b3a8eea))

## [1.110.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.110.0...v1.110.1) (2024-02-12)

### Bug Fixes

* get rediscloud_url from secrets ([29e636d](https://github.com/ColdPBC/cold-monorepo/commit/29e636d857cc7642573eb42e71e2b044c50672f1))
* only the service key should be passed not the entire package.json file ([ffec5cc](https://github.com/ColdPBC/cold-monorepo/commit/ffec5ccb34f93575639968322aa8224ec4d26fc5))
* pass initialized config service ([ee1e8a7](https://github.com/ColdPBC/cold-monorepo/commit/ee1e8a73adda9acb4086588d44cc0e9736f4514f))

# [1.110.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.109.2...v1.110.0) (2024-02-12)

### Features

* add document list table to component seed definitions ([6875554](https://github.com/ColdPBC/cold-monorepo/commit/6875554a76a5bf062cc8e646480aff361be6afbd))

## [1.109.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.109.1...v1.109.2) (2024-02-12)

### Bug Fixes

* add ability to override aws_profile via env variable ([87ab217](https://github.com/ColdPBC/cold-monorepo/commit/87ab21716fe8860e3159d5134a8756b9e38ac095))

## [1.109.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.109.0...v1.109.1) (2024-02-11)

### Bug Fixes

* broken LD initialization ([4d60573](https://github.com/ColdPBC/cold-monorepo/commit/4d60573afc4ed641c71b8d123020783f6342f485))

# [1.109.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.108.1...v1.109.0) (2024-02-11)

### Bug Fixes

* add survey id key ([ccd1470](https://github.com/ColdPBC/cold-monorepo/commit/ccd14700de13a3660aefbe401a0dfac1182e35ce))
* add survey id key ([5e55796](https://github.com/ColdPBC/cold-monorepo/commit/5e557960b62b3cb75538a17b7d55b67f0b976691))
* get var from config ([69aa610](https://github.com/ColdPBC/cold-monorepo/commit/69aa6104ec78a902e8fa1a8e36273ae623744fdd))
* inject prisma client ([2b803fe](https://github.com/ColdPBC/cold-monorepo/commit/2b803fe4111781c8d3603af5e1ff398075e8ba21))
* remove redundant modue ([3fe7901](https://github.com/ColdPBC/cold-monorepo/commit/3fe7901bcb1a2d80f80b8dc04dda10ee4e262c58))
* throw if DD_SERVICE || NODE_ENV not set ([efe91fd](https://github.com/ColdPBC/cold-monorepo/commit/efe91fda62b7dc536fa93d48bd847a87558fb101))
* update configuration module to load vars from config ([cf204ec](https://github.com/ColdPBC/cold-monorepo/commit/cf204ec8ccefcc30a63ea88b169ba5e60456c195))
* update mqtt service to load vars from config ([da654d1](https://github.com/ColdPBC/cold-monorepo/commit/da654d18dd153b6fbad0a8a02d06add82bdb752b))
* update token service to load vars from config ([03d6e57](https://github.com/ColdPBC/cold-monorepo/commit/03d6e57027d8f08ffe25a7e33808130682bb4ad8))
* use AWS creds from env vars if running in FC ([4a40fd7](https://github.com/ColdPBC/cold-monorepo/commit/4a40fd7e160b4138020cf69fb5ceea9d3e131f2a))
* use loaded secrets ([22b69a7](https://github.com/ColdPBC/cold-monorepo/commit/22b69a797cb5b5cdc24b7662177d55e5369490c8))

### Features

* add delete surveys route ([66b3aa4](https://github.com/ColdPBC/cold-monorepo/commit/66b3aa4b73b0df40d1de952e1b4a5afac3d53096))

## [1.108.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.108.0...v1.108.1) (2024-02-09)

### Bug Fixes

* add configuration.module ([c5a4fdb](https://github.com/ColdPBC/cold-monorepo/commit/c5a4fdbcc897a4540abc2bab04a6d0fe15f12874))

# [1.108.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.107.1...v1.108.0) (2024-02-09)

### Features

* get access token only when the organization and user is authenticated ([67d687d](https://github.com/ColdPBC/cold-monorepo/commit/67d687da99c835d19aabfb6035ab3b1db2387fa8))
* use mqtt url env variable ([8ba7d71](https://github.com/ColdPBC/cold-monorepo/commit/8ba7d71be0e67447a60e28e8301323b0598722f0))

## [1.107.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.107.0...v1.107.1) (2024-02-08)

### Bug Fixes

* correct action patch ([3968838](https://github.com/ColdPBC/cold-monorepo/commit/3968838151cfc3b2ec6d945a13671ef8b429fea8))
* fix action typing issue ([7898eac](https://github.com/ColdPBC/cold-monorepo/commit/7898eacdf7279c0dda3eb8cb805f8ce6ced375bb))

# [1.107.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.106.0...v1.107.0) (2024-02-07)

### Features

* dont display next actions module if there are no actions ([a6b294c](https://github.com/ColdPBC/cold-monorepo/commit/a6b294c7c71c80df2ca63571101f9a6fd4348d8d))

# [1.106.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.105.0...v1.106.0) (2024-02-07)

### Bug Fixes

* set max-h and max-w for logo in complianceOverviewCard.tsx ([54aded3](https://github.com/ColdPBC/cold-monorepo/commit/54aded3a1fa7d347a3371b65ce95c64da96e4068))

### Features

* added orgcompliance return type to getOrganizationComplianceMockByName function ([adfd27f](https://github.com/ColdPBC/cold-monorepo/commit/adfd27f3b210b53953729e167c591092af37c939))

## [1.105.1-cold-487.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.105.0...v1.105.1-cold-487.1) (2024-02-06)

### Bug Fixes

* set max-h and max-w for logo in complianceOverviewCard.tsx ([54aded3](https://github.com/ColdPBC/cold-monorepo/commit/54aded3a1fa7d347a3371b65ce95c64da96e4068))

# [1.105.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.104.3...v1.105.0) (2024-02-06)

### Bug Fixes

* correct storybook changes ([580a399](https://github.com/ColdPBC/cold-monorepo/commit/580a399492ab622fe65b312d04f0a0d19029c605))

### Features

* add new compliance module to tests ([0b2e4ff](https://github.com/ColdPBC/cold-monorepo/commit/0b2e4fffc1c11f73b588fe8dfe99b48502b07440))
* add next steps to interaction tests ([6c45c2f](https://github.com/ColdPBC/cold-monorepo/commit/6c45c2f832398bdf8ab858a4d3edee8b48dea6e5))
* Added addtional context to interaction tests ([d02ea4e](https://github.com/ColdPBC/cold-monorepo/commit/d02ea4ef1ac9bbd7013601196b14530c3d2b7f43))
* Added more interaction tests ([786bf3e](https://github.com/ColdPBC/cold-monorepo/commit/786bf3ed541ecb42f4603b7d78953c81bd52a4a9))
* code improvement ([4b5f415](https://github.com/ColdPBC/cold-monorepo/commit/4b5f415f13ff469950064a739766a87383f57d8f))
* correct test errors ([282da7a](https://github.com/ColdPBC/cold-monorepo/commit/282da7aa22526f90b8ee10632e250fefc5f42917))
* increase z index of taoaster so it appears over a takeover ([5c8f65e](https://github.com/ColdPBC/cold-monorepo/commit/5c8f65e6ea892befade259bd1a5260a6b7898a83))
* make codebase improvements ([61564bf](https://github.com/ColdPBC/cold-monorepo/commit/61564bf67aa5a6d47c881c5687bb8554e36719ab))
* remove console log ([554f9c5](https://github.com/ColdPBC/cold-monorepo/commit/554f9c55d20f9764aa9a847bbe72afe3a7c08ecf))
* remove unneeded build storybook step ([afbb03c](https://github.com/ColdPBC/cold-monorepo/commit/afbb03c5d81a793e3a873d6a0ea3bb975dd71412))
* setup interaction tests ([a15c1da](https://github.com/ColdPBC/cold-monorepo/commit/a15c1dadb693dffc3b4afeeddf18dc11bf3ed6c7))
* update footprint empty data msw handlers to pass tests ([3ce471f](https://github.com/ColdPBC/cold-monorepo/commit/3ce471f96aced264cadd7194af7f9e02fa7ac60b))
* update to action detail ([c4661f6](https://github.com/ColdPBC/cold-monorepo/commit/c4661f6e24f7b161b4376ff79a3987e30e73d242))
* Update yaml to run storybook tests ([560f197](https://github.com/ColdPBC/cold-monorepo/commit/560f19766367fb496aef8b319ad2802566f5f563))
* updated application story to add document, compliance and settings tests ([9670f66](https://github.com/ColdPBC/cold-monorepo/commit/9670f66a468ff44967bc5fd1db16f12b2f15ea5e))
* use takeover for initial loading to not show guidance button ([80324d0](https://github.com/ColdPBC/cold-monorepo/commit/80324d067e6174984c09b079b44d95d994f98190))
* use takeover for signup page ([c299ca2](https://github.com/ColdPBC/cold-monorepo/commit/c299ca2451bd4b6319e51ad5e04cb4a656142822))

## [1.104.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.104.2...v1.104.3) (2024-02-06)

### Bug Fixes

* broken migrations due to search and replace bug ([b3cad19](https://github.com/ColdPBC/cold-monorepo/commit/b3cad1927262f13b6adfdf6cbe6588a80af6999b))

## [1.104.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.104.1...v1.104.2) (2024-02-06)

### Bug Fixes

* broken import statements ([02e94e6](https://github.com/ColdPBC/cold-monorepo/commit/02e94e6a41f1726b46455d430c5ade29f64d4d2f))

## [1.104.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.104.0...v1.104.1) (2024-02-06)

### Bug Fixes

* switch to configService ([bc6d6b6](https://github.com/ColdPBC/cold-monorepo/commit/bc6d6b67494ea77ba11ad2c32a7a393aa54d6673))

# [1.104.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.103.0...v1.104.0) (2024-02-06)

### Bug Fixes

* add module exports ([2eee8fb](https://github.com/ColdPBC/cold-monorepo/commit/2eee8fb1cd2316f2aa6a1b60b82a1da618dc22d1))
* clean up import ([8863b82](https://github.com/ColdPBC/cold-monorepo/commit/8863b820c3e2c987f52bc1dcd602165a2fe6470d))
* clean up location schema ([7babfa5](https://github.com/ColdPBC/cold-monorepo/commit/7babfa54a8c9508f019596741613c8c39f50348d))
* cleanup code, move prompts to class ([cfe4120](https://github.com/ColdPBC/cold-monorepo/commit/cfe4120dac3a01dc00933d6c626ce3ad23f42a55))
* get config settings from LD ([4a91b8c](https://github.com/ColdPBC/cold-monorepo/commit/4a91b8cc3b0935e66d52b8558eeda322fb90ec93))
* implement file service ([1d5574b](https://github.com/ColdPBC/cold-monorepo/commit/1d5574bca6acadc64b281aaeecc968d67836a505))
* implement re-usable service to broadcast rabbit to all integrations ([be21f09](https://github.com/ColdPBC/cold-monorepo/commit/be21f09c50c18fa03d620a9646e5c1a30d613897))
* issue that would block redis jobs ([22f4f6c](https://github.com/ColdPBC/cold-monorepo/commit/22f4f6c65575562c084744abb791e18eea7b5015))
* issue that would block redis jobs ([8ff1e74](https://github.com/ColdPBC/cold-monorepo/commit/8ff1e745a75c619e1ea21322438a3009615a7ebb))
* make mqtt global ([378e4f3](https://github.com/ColdPBC/cold-monorepo/commit/378e4f30f884e94a2b819837638f0c94c6513bd4))
* moved prompts to class ([bca4d28](https://github.com/ColdPBC/cold-monorepo/commit/bca4d28043ea4e6641ea821851a474a7f8470104))
* nack() messages when event is not supported by service ([66bbd5c](https://github.com/ColdPBC/cold-monorepo/commit/66bbd5c8e6ca81e2f3a6fbf2b8313d3a882f19d4))
* null reference error ([11c8d0b](https://github.com/ColdPBC/cold-monorepo/commit/11c8d0bd6a4a1342177163fdf5bb25418876a459))
* re-organize organization modules ([d7f8076](https://github.com/ColdPBC/cold-monorepo/commit/d7f8076343d0e489c586aae68d75f3837516dd9a))
* return instance to support non DI implementations ([41e64c1](https://github.com/ColdPBC/cold-monorepo/commit/41e64c1be7fcb2a73bb17fa0108d7e642197b05e))

### Features

* add secrets manager module ([2c45d05](https://github.com/ColdPBC/cold-monorepo/commit/2c45d0574851bdeebfdab780275dde56cb7817d1))
* add secrets manager module ([bcf2a94](https://github.com/ColdPBC/cold-monorepo/commit/bcf2a941cc6374092aecda681094a16af7d26425))
* implement MQTT on all CRUD updates across all resources ([6a58144](https://github.com/ColdPBC/cold-monorepo/commit/6a5814444f3d53a41764b6db11c42717b0ff727d))

# [1.103.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.102.1...v1.103.0) (2024-02-05)

### Features

* add logging for seeding components ([2831821](https://github.com/ColdPBC/cold-monorepo/commit/283182136ebfdd0f5e37537135df85aa4021606e))
* add seed components file ([6947106](https://github.com/ColdPBC/cold-monorepo/commit/6947106150da2f15e767ee216fe00f6c1abcc1c9))
* code improvement ([3e6821c](https://github.com/ColdPBC/cold-monorepo/commit/3e6821cc82847b6572ccfc04ae8abd82ef1d6187))
* correct component definition data ([2fc08fc](https://github.com/ColdPBC/cold-monorepo/commit/2fc08fca5928a7680fc69904b294f565004f9a6c))
* reuse and rename seed form defitnitions to component definitions ([9d50887](https://github.com/ColdPBC/cold-monorepo/commit/9d508875c571ef3bfa8052679b2b6ee41ae37d6d))

## [1.102.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.102.0...v1.102.1) (2024-02-05)

### Bug Fixes

* return survey definition correctly even if name is updated ([c01ec8b](https://github.com/ColdPBC/cold-monorepo/commit/c01ec8ba1d1fa0f19cce2c9afd4b16fd84ce661a))
* return survey definition correctly even if name is updated ([#256](https://github.com/ColdPBC/cold-monorepo/issues/256)) ([6ce3e2a](https://github.com/ColdPBC/cold-monorepo/commit/6ce3e2a8e48daafcb407662350fb0899749f6591))

# [1.102.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.101.0...v1.102.0) (2024-02-01)

# [1.97.0-cold-475.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.96.1-cold-475.4...v1.97.0-cold-475.1) (2024-02-02)

### Bug Fixes

* get config settings from LD ([4a91b8c](https://github.com/ColdPBC/cold-monorepo/commit/4a91b8cc3b0935e66d52b8558eeda322fb90ec93))
* implement re-usable service to broadcast rabbit to all integrations ([be21f09](https://github.com/ColdPBC/cold-monorepo/commit/be21f09c50c18fa03d620a9646e5c1a30d613897))
* nack() messages when event is not supported by service ([66bbd5c](https://github.com/ColdPBC/cold-monorepo/commit/66bbd5c8e6ca81e2f3a6fbf2b8313d3a882f19d4))
* null reference error ([11c8d0b](https://github.com/ColdPBC/cold-monorepo/commit/11c8d0bd6a4a1342177163fdf5bb25418876a459))
* return instance to support non DI implementations ([41e64c1](https://github.com/ColdPBC/cold-monorepo/commit/41e64c1be7fcb2a73bb17fa0108d7e642197b05e))

### Features

* removed hardcoded REI compliance references and other changes ([3072e77](https://github.com/ColdPBC/cold-monorepo/commit/3072e7765ba50d51bac359312ac2346b4c85123b))

# [1.101.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.100.0...v1.101.0) (2024-01-27)

### Features

* added scrollbar when overflows and auto margin for survey question flex tiem ([fcf4281](https://github.com/ColdPBC/cold-monorepo/commit/fcf428133d13a6d03d8a5944ed3f498340efebf2))

# [1.100.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.99.0...v1.100.0) (2024-01-26)

### Features

* change user-facing journey modules to gap assessments for demo-ing ([f0803b1](https://github.com/ColdPBC/cold-monorepo/commit/f0803b17ffa5a49d7c694403bd495ba1d5686a3f))
* change user-facing journey modules to gap assessments for demo-ing ([#247](https://github.com/ColdPBC/cold-monorepo/issues/247)) ([a23d514](https://github.com/ColdPBC/cold-monorepo/commit/a23d514eeb484eb86d4acff7f8f71231763e6e66))

# [1.99.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.98.0...v1.99.0) (2024-01-26)

### Bug Fixes

* change empty string to null based on recommendation ([826c032](https://github.com/ColdPBC/cold-monorepo/commit/826c032b2571b093fbeb42ff3985b049196b1a2d))

### Features

* remove COMPLIANCE type questions from next steps module and improve formatting when module is empty ([c80dc1b](https://github.com/ColdPBC/cold-monorepo/commit/c80dc1be455dfe4d63a8ea2f346cb56eb070e44e))
* remove COMPLIANCE type surveys from next steps module and imp… ([#246](https://github.com/ColdPBC/cold-monorepo/issues/246)) ([88577df](https://github.com/ColdPBC/cold-monorepo/commit/88577dfeef15bd1b56b3e40379fd75bcaa43806a))

# [1.98.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.97.0...v1.98.0) (2024-01-25)

### Features

* make updates to action detail page and handle links to subcategory actions that dont exist ([8ea811c](https://github.com/ColdPBC/cold-monorepo/commit/8ea811cc127dc79e518c31ab51bde468b3aab017))

# [1.97.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.96.1...v1.97.0) (2024-01-25)

### Features

* Limit surveys in next steps to 3 ([1659167](https://github.com/ColdPBC/cold-monorepo/commit/16591677489cf87ad6b60d28b8995542c7bab2e3))

## [1.96.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.96.0...v1.96.1) (2024-01-24)

### Bug Fixes

* issue that would block redis jobs ([22f4f6c](https://github.com/ColdPBC/cold-monorepo/commit/22f4f6c65575562c084744abb791e18eea7b5015))
* issue that would block redis jobs ([8ff1e74](https://github.com/ColdPBC/cold-monorepo/commit/8ff1e745a75c619e1ea21322438a3009615a7ebb))
* openAI improvements ([317bdf4](https://github.com/ColdPBC/cold-monorepo/commit/317bdf47b15f0c3c7c59a22a02eb950f69ffaae0))

# [1.96.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.95.0...v1.96.0) (2024-01-23)

### Features

* added VITE_MQTT_URL to env variables and made fixes to resolve console errors ([9954052](https://github.com/ColdPBC/cold-monorepo/commit/9954052454dc322953be70c77279990540482769))
* resolve unexpected chromatic changes ([4c66292](https://github.com/ColdPBC/cold-monorepo/commit/4c66292a5ba3b503b3cbca745d24457493956759))

# [1.95.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.94.0...v1.95.0) (2024-01-23)

### Features

* added survey data validation before submitting ([2ae1758](https://github.com/ColdPBC/cold-monorepo/commit/2ae1758cf3d6b9d94f1589b4ae33fe517b2a839d))

# [1.94.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.93.0...v1.94.0) (2024-01-23)

### Bug Fixes

* resolve txt input bug ([3805434](https://github.com/ColdPBC/cold-monorepo/commit/38054341fc1a9a03cdad684b542e905084d035be))

### Features

* added specific typing to additionalContextQuestion ([e520daa](https://github.com/ColdPBC/cold-monorepo/commit/e520daa08528b7141ca99d64931835b0d3f4bd13))
* fix survey question container error ([b13abee](https://github.com/ColdPBC/cold-monorepo/commit/b13abee117f7a057105cd427ebad38c3a374a106))

# [1.93.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.92.1...v1.93.0) (2024-01-22)

### Bug Fixes

* fix select option bug where it cant deal with undefined values ([2c6c011](https://github.com/ColdPBC/cold-monorepo/commit/2c6c0118dea293b3b2996cac8913436b58d6d57b))

### Features

* check component before submitting ([c5acfea](https://github.com/ColdPBC/cold-monorepo/commit/c5acfeae5087871b4ab563db4edbf4965320b847))

## [1.92.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.92.0...v1.92.1) (2024-01-22)

### Bug Fixes

* remove hash from files and comment cache in compliances ([623ee6b](https://github.com/ColdPBC/cold-monorepo/commit/623ee6b279df08ee4a4ff29a39de98a9d1c9ae6f))

# [1.92.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.91.0...v1.92.0) (2024-01-22)

### Bug Fixes

* add specific types for ai response answer ([4e9eef9](https://github.com/ColdPBC/cold-monorepo/commit/4e9eef91f120591a3d2e7eb36ad8eda6fb6c2a1a))

### Features

* fix typing issue ([c3ec93f](https://github.com/ColdPBC/cold-monorepo/commit/c3ec93ff908ea8c350b18fba55afffbd790156a6))

# [1.91.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.9...v1.91.0) (2024-01-22)

### Features

* added check for component type ([0589da0](https://github.com/ColdPBC/cold-monorepo/commit/0589da0038abc438edb5e6271d64deb3129059fc))
* added select option checks and skip addtional context ai response ([e709eb1](https://github.com/ColdPBC/cold-monorepo/commit/e709eb17f84db4e90d014df66ecada4338f910fa))

## [1.90.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.8...v1.90.9) (2024-01-22)

### Bug Fixes

* fix compliance caching ([106bb18](https://github.com/ColdPBC/cold-monorepo/commit/106bb18296940beac720b16072c69d51e4caeaa0))
* openAI hangups ([4abe96d](https://github.com/ColdPBC/cold-monorepo/commit/4abe96d2b41411586e1863aab9865f77e0e8dba3))

## [1.90.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.7...v1.90.8) (2024-01-22)

### Bug Fixes

* cache ([8aa1e80](https://github.com/ColdPBC/cold-monorepo/commit/8aa1e805183d6ee04c2d39b11f0f3a6d5540444e))

## [1.90.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.6...v1.90.7) (2024-01-22)

### Bug Fixes

* missing await ([c793f10](https://github.com/ColdPBC/cold-monorepo/commit/c793f10be34ea104d87445be70b73a9d336e93ca))

## [1.90.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.5...v1.90.6) (2024-01-22)

### Bug Fixes

* processing async rabbit ([5c11618](https://github.com/ColdPBC/cold-monorepo/commit/5c11618575f275068229fedc50f7a63771b144dd))

## [1.90.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.4...v1.90.5) (2024-01-22)

### Bug Fixes

* nested data object ([1f876c7](https://github.com/ColdPBC/cold-monorepo/commit/1f876c7f36eb7241b89a6e33aa7fee4d417a0d33))

## [1.90.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.3...v1.90.4) (2024-01-22)

### Bug Fixes

* incorrect role for compliances ([2728766](https://github.com/ColdPBC/cold-monorepo/commit/27287663a478578d74d178cbe5fa55c6fa8d760e))

## [1.90.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.2...v1.90.3) (2024-01-22)

### Bug Fixes

* stream bug ([ffa7466](https://github.com/ColdPBC/cold-monorepo/commit/ffa74662ca35aaf4f4aba5c6a12a6a1f8421832c))

## [1.90.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.1...v1.90.2) (2024-01-22)

### Bug Fixes

* stream bug ([a0e4569](https://github.com/ColdPBC/cold-monorepo/commit/a0e456985dc07b313eb0885ec590a9716893a896))

## [1.90.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.90.0...v1.90.1) (2024-01-22)

### Bug Fixes

* util.inspect bug? ([e04d10b](https://github.com/ColdPBC/cold-monorepo/commit/e04d10b6017f1db837a784ff5ba11caed32bc0ba))

# [1.90.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.89.0...v1.90.0) (2024-01-22)

### Features

* added keys to compliance overview nad detail page elements ([540c4cf](https://github.com/ColdPBC/cold-monorepo/commit/540c4cff644d241414075173f1e1064da9cb9e89))
* adding MQTT and more updates to compliance handling ([36a7986](https://github.com/ColdPBC/cold-monorepo/commit/36a7986ce127ab2b083ebd933f126c311617a571))
* compliance page updates ([9ab491e](https://github.com/ColdPBC/cold-monorepo/commit/9ab491e6999e922ec7a45aae77548287604ffe3a))
* Create compliance overview and detail page. ([a057afc](https://github.com/ColdPBC/cold-monorepo/commit/a057afcc4800dadfd484ef43dfc44cf4c59a274c))
* handle compliance page error boundary and added check for documents list array type ([dba6b09](https://github.com/ColdPBC/cold-monorepo/commit/dba6b092c17637058f6e5a64f62665de8b9f5012))
* more compliance updates ([230d61a](https://github.com/ColdPBC/cold-monorepo/commit/230d61a57c485008c16c77d43e04e31d4c96931e))
* more updates to MQTT and compliance detail page ([77793a2](https://github.com/ColdPBC/cold-monorepo/commit/77793a2ae7f1665bfe22e75d99084c320ede0c8c))
* use env variable to environment ([7b51932](https://github.com/ColdPBC/cold-monorepo/commit/7b51932850ea408a5287ae84881aa7a6b7532f5a))

# [1.89.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.7...v1.89.0) (2024-01-22)

### Features

* added keys to compliance overview nad detail page elements ([540c4cf](https://github.com/ColdPBC/cold-monorepo/commit/540c4cff644d241414075173f1e1064da9cb9e89))
* adding MQTT and more updates to compliance handling ([36a7986](https://github.com/ColdPBC/cold-monorepo/commit/36a7986ce127ab2b083ebd933f126c311617a571))
* compliance page updates ([9ab491e](https://github.com/ColdPBC/cold-monorepo/commit/9ab491e6999e922ec7a45aae77548287604ffe3a))
* Create compliance overview and detail page. ([a057afc](https://github.com/ColdPBC/cold-monorepo/commit/a057afcc4800dadfd484ef43dfc44cf4c59a274c))
* more compliance updates ([230d61a](https://github.com/ColdPBC/cold-monorepo/commit/230d61a57c485008c16c77d43e04e31d4c96931e))

# [1.89.0-COLD-462.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.0...v1.89.0-COLD-462.1) (2024-01-22)

### Features

* adding MQTT and more updates to compliance handling ([36a7986](https://github.com/ColdPBC/cold-monorepo/commit/36a7986ce127ab2b083ebd933f126c311617a571))
* compliance page updates ([9ab491e](https://github.com/ColdPBC/cold-monorepo/commit/9ab491e6999e922ec7a45aae77548287604ffe3a))
* Create compliance overview and detail page. ([a057afc](https://github.com/ColdPBC/cold-monorepo/commit/a057afcc4800dadfd484ef43dfc44cf4c59a274c))
* more compliance updates ([230d61a](https://github.com/ColdPBC/cold-monorepo/commit/230d61a57c485008c16c77d43e04e31d4c96931e))

## [1.88.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.6...v1.88.7) (2024-01-21)

### Bug Fixes

* fix null reference issues ([5ebb1a2](https://github.com/ColdPBC/cold-monorepo/commit/5ebb1a2f191bf365b62143e3005e223a6176d696))

## [1.88.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.5...v1.88.6) (2024-01-21)

### Bug Fixes

* fix null reference issues ([6542f33](https://github.com/ColdPBC/cold-monorepo/commit/6542f33e1d6a0018b3bf484922c177e9776daf36))

## [1.88.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.4...v1.88.5) (2024-01-21)

### Bug Fixes

* add missing files!! ([d4a6147](https://github.com/ColdPBC/cold-monorepo/commit/d4a614798818314466a3208f9af97f97185e2e04))

## [1.88.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.3...v1.88.4) (2024-01-21)

### Bug Fixes

* remove extra COMPLIANCE entry ([d92a964](https://github.com/ColdPBC/cold-monorepo/commit/d92a9642998eeb690ed9bed8b5d6ad1070221d83))

## [1.88.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.2...v1.88.3) (2024-01-21)

### Bug Fixes

* remove extra COMPLIANCE entry ([d683a4e](https://github.com/ColdPBC/cold-monorepo/commit/d683a4ee77f31a4b48c6c95d5fa9d718821cbaf7))

## [1.88.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.1...v1.88.2) (2024-01-21)

### Bug Fixes

* refactor files and createAssistant to work with new process ([be8d40e](https://github.com/ColdPBC/cold-monorepo/commit/be8d40ea73c7703e82d6e749a9defd3a864948f5))

## [1.88.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.88.0...v1.88.1) (2024-01-21)

### Bug Fixes

* standardize survey responses ([a54a34e](https://github.com/ColdPBC/cold-monorepo/commit/a54a34e837f2b9f2acabe34fbace4ede850902b3))

# [1.88.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.87.3...v1.88.0) (2024-01-21)

### Bug Fixes

* add compliance survey type ([22159f0](https://github.com/ColdPBC/cold-monorepo/commit/22159f037dcf14d0d20435684eee2fff2ecfb986))
* mqttProvider ([98fd6ff](https://github.com/ColdPBC/cold-monorepo/commit/98fd6ff45982b762d24f22c5a1fd412c4e28aee5))

### Features

* add ld flag and removed button from table mock ([270f2af](https://github.com/ColdPBC/cold-monorepo/commit/270f2afbe4248f9b5bf989ac2e43b537ba593105))
* add openai url env variable ([225aa51](https://github.com/ColdPBC/cold-monorepo/commit/225aa517ed0d2adc228b5cd71de46b0bc2088fc4))
* added open api url to flightcontrol json ([85761b8](https://github.com/ColdPBC/cold-monorepo/commit/85761b8d734023ebcf0037b58205068700f41125))
* create upload page and mqtt to wss connection handling ([9e6d572](https://github.com/ColdPBC/cold-monorepo/commit/9e6d57214009b09e24a2c13ed46fef4662ccfcb5))
* removed fc file changes ([10f701c](https://github.com/ColdPBC/cold-monorepo/commit/10f701c0ecd7395cc36b9560392d70f3af2cf2b1))
* updates to upload page ([704fa75](https://github.com/ColdPBC/cold-monorepo/commit/704fa755729881e0dde2526a24aa7a5662e167e7))
* Upload initial code ([4d8e276](https://github.com/ColdPBC/cold-monorepo/commit/4d8e276e92f89ed4e00621f73bf8f67103231dc4))

## [1.87.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.87.2...v1.87.3) (2024-01-20)

### Bug Fixes

* implement full e2e processing between api/openai ([43f70a2](https://github.com/ColdPBC/cold-monorepo/commit/43f70a2dfeb45de40041642db8962622130b018f))

## [1.87.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.87.1...v1.87.2) (2024-01-20)

### Bug Fixes

* implement org compliances ([3b46b52](https://github.com/ColdPBC/cold-monorepo/commit/3b46b523a823e27f167d2d091e87f5e27c63cac8))

## [1.87.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.87.0...v1.87.1) (2024-01-19)

### Bug Fixes

* implement compliance definitions ([3b08fa2](https://github.com/ColdPBC/cold-monorepo/commit/3b08fa2919e432ea86603258ae1d7675961980fc))

# [1.87.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.5...v1.87.0) (2024-01-19)

### Bug Fixes

* make response consistant ([dc68e28](https://github.com/ColdPBC/cold-monorepo/commit/dc68e2852635fb4c36f84d13ac6702abb22552df))
* prevent duplicate integrations ([96b2a9c](https://github.com/ColdPBC/cold-monorepo/commit/96b2a9cb6906e284f98656c86d995e24249828c0))
* remove cold admin only restriction on surveys ([aab8f6f](https://github.com/ColdPBC/cold-monorepo/commit/aab8f6fbda26333ecb83a6d889d61df1035b3f29))
* remove cold admin only restriction on surveys ([#231](https://github.com/ColdPBC/cold-monorepo/issues/231)) ([2eae370](https://github.com/ColdPBC/cold-monorepo/commit/2eae370b65f25ca77a0704b4fd8cd4b8cb9ba374))

### Features

* set section value to null if the section is skipped on submit ([d83001a](https://github.com/ColdPBC/cold-monorepo/commit/d83001ade37fdda306a881686173a0bf4a9da43f))
* submit on last section if it is unanswered or is wanted to be jumped over by answering 'No' ([d3006e0](https://github.com/ColdPBC/cold-monorepo/commit/d3006e06b9e73799a15c7718700b07f2fae6b81b))

## [1.86.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.4...v1.86.5) (2024-01-19)

### Bug Fixes

* add missing 'all files' endpoint ([074a867](https://github.com/ColdPBC/cold-monorepo/commit/074a867a2f36177d1e8d3b51ce57c27b2854718e))
* linking file with asssistant ([dbde396](https://github.com/ColdPBC/cold-monorepo/commit/dbde3967018254bb66bf6289667631578fc580dc))

## [1.86.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.3...v1.86.4) (2024-01-19)

### Bug Fixes

* issue with empty arrays ([281c709](https://github.com/ColdPBC/cold-monorepo/commit/281c709645653b17a4f9215f85962f07f097ae59))

## [1.86.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.2...v1.86.3) (2024-01-19)

### Bug Fixes

* inability to download files ([e07e848](https://github.com/ColdPBC/cold-monorepo/commit/e07e848f8c2c9cc0ff9c73a0a7e0b012bb5afcfb))

## [1.86.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.1...v1.86.2) (2024-01-19)

### Bug Fixes

* return proper error when integration not found ([c35f413](https://github.com/ColdPBC/cold-monorepo/commit/c35f4135173e0e19126dfd34370aef839724bf14))

## [1.86.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.86.0...v1.86.1) (2024-01-19)

### Bug Fixes

* fixing migration issues ([13993fd](https://github.com/ColdPBC/cold-monorepo/commit/13993fda5d496eb142bbedf0ccd0b86df9145e4c))

# [1.86.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.85.0...v1.86.0) (2024-01-19)

### Features

* add compliance modules ([f5c937c](https://github.com/ColdPBC/cold-monorepo/commit/f5c937cb2a9e241f7e5c1ee18b2619b1f82f8e1e))

# [1.85.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.84.0...v1.85.0) (2024-01-19)

### Bug Fixes

* move user-interceptor to library ([1993742](https://github.com/ColdPBC/cold-monorepo/commit/19937424d2adb1975aa22c7775542dd5814ff41c))
* move user-interceptor to library ([f37df07](https://github.com/ColdPBC/cold-monorepo/commit/f37df0738663d1a110d2db08fa694ec531990ebc))
* standardize service package.json ([224aa81](https://github.com/ColdPBC/cold-monorepo/commit/224aa81af7ea31304216d88a296bc3bc101dea8c))

### Features

* add openAI files controller ([7be70ed](https://github.com/ColdPBC/cold-monorepo/commit/7be70ed9be9ae854bf3e030fd8375fc5cc3e12dc))

# [1.84.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.13...v1.84.0) (2024-01-18)

### Features

* Added hardcoded txt to ai justification ([6947e5f](https://github.com/ColdPBC/cold-monorepo/commit/6947e5fc97696d7a6168037d8edc111530aad4de))
* handle survey ai answers ([9811e24](https://github.com/ColdPBC/cold-monorepo/commit/9811e248946b0e5840ff0a0ba3a48dd5214666e2))

## [1.83.13](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.12...v1.83.13) (2024-01-18)

### Bug Fixes

* typo in package.json ([1fc1f1b](https://github.com/ColdPBC/cold-monorepo/commit/1fc1f1b637ebe69fdb751451327b8c208eef03cb))

## [1.83.12](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.11...v1.83.12) (2024-01-18)

### Bug Fixes

* add compliances ([40f53f8](https://github.com/ColdPBC/cold-monorepo/commit/40f53f81e053b62d93099c6807e38a985828462d))
* add compliances ([52e17e7](https://github.com/ColdPBC/cold-monorepo/commit/52e17e728a1972eac4ba2ab7da243feae42421af))

## [1.83.11](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.10...v1.83.11) (2024-01-17)

### Bug Fixes

* fix cert issue ([bc4bc1b](https://github.com/ColdPBC/cold-monorepo/commit/bc4bc1b0871c9afe37c899fc8f21ae01e3d041eb))

## [1.83.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.9...v1.83.10) (2024-01-17)

### Bug Fixes

* change env vars ([b2760b5](https://github.com/ColdPBC/cold-monorepo/commit/b2760b5509a0b73e302143969df757421c870f0d))

## [1.83.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.8...v1.83.9) (2024-01-16)

### Bug Fixes

* add file handling for openAI ([a11f663](https://github.com/ColdPBC/cold-monorepo/commit/a11f6632b6d93df83d46503b333dce9eb36c4ce2))

## [1.83.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.7...v1.83.8) (2024-01-12)

### Bug Fixes

* add onQueueFailed subscription ([7a5e904](https://github.com/ColdPBC/cold-monorepo/commit/7a5e9041eb31c8941c82e3426a945c05c787ff84))

## [1.83.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.6...v1.83.7) (2024-01-11)

### Bug Fixes

* update version in package.jsons ([53079a8](https://github.com/ColdPBC/cold-monorepo/commit/53079a8683830654223a906be68fbb5ca20b4ec0))

## [1.83.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.5...v1.83.6) (2024-01-10)

### Bug Fixes

* missing service, version in logs ([2638cda](https://github.com/ColdPBC/cold-monorepo/commit/2638cda6ae80aaed24e572ff20a43f1e7b1e2b87))

## [1.83.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.4...v1.83.5) (2024-01-10)

### Bug Fixes

* missing service, version in logs ([5f68626](https://github.com/ColdPBC/cold-monorepo/commit/5f68626b0ce0a86d01e426ddfa2b4599b9992e0a))

## [1.83.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.3...v1.83.4) (2024-01-09)

### Bug Fixes

* move bayou URL to envVar ([4cd74b0](https://github.com/ColdPBC/cold-monorepo/commit/4cd74b0d64be5ad798b281b4f568f88e8cd22ae9))

## [1.83.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.2...v1.83.3) (2024-01-09)

### Bug Fixes

* store utility bills ([39b96d7](https://github.com/ColdPBC/cold-monorepo/commit/39b96d740a857f9eafbf448bc8211e29380f3910))

## [1.83.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.1...v1.83.2) (2024-01-09)

### Bug Fixes

* isColdAdmin check failing in staging? ([9c6796b](https://github.com/ColdPBC/cold-monorepo/commit/9c6796b24b4a6a238329e1d36b090538dac41b32))

## [1.83.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.83.0...v1.83.1) (2024-01-09)

### Bug Fixes

* add jobs to redis on rabbit failure ([062eb88](https://github.com/ColdPBC/cold-monorepo/commit/062eb88a9faa54e252392a31cfbd4e8214f8d547))

# [1.83.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.82.1...v1.83.0) (2024-01-09)

### Features

* add location model and new routes ([234279a](https://github.com/ColdPBC/cold-monorepo/commit/234279adcfa0c33dc8d25e519230467c563006d6))

## [1.82.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.82.0...v1.82.1) (2024-01-03)

### Bug Fixes

* new bill webhooks ([33d6bd3](https://github.com/ColdPBC/cold-monorepo/commit/33d6bd3e713c7cefe397f4f490db277af76c698d))

# [1.82.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.81.0...v1.82.0) (2024-01-03)

### Features

* add create customer to bayou service ([d4eab7e](https://github.com/ColdPBC/cold-monorepo/commit/d4eab7ee4d7497ce35474ffc72ad53ced69ef2f7))

# [1.81.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.80.0...v1.81.0) (2024-01-02)

### Features

* add create customer to bayou service ([266518d](https://github.com/ColdPBC/cold-monorepo/commit/266518db9b50ce237971c722f1531067892327e5))

# [1.80.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.7...v1.80.0) (2024-01-02)

### Features

* add create customer to bayou service ([eeb49df](https://github.com/ColdPBC/cold-monorepo/commit/eeb49df6ebc592b745677a4abb571e79459a0371))

## [1.79.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.6...v1.79.7) (2024-01-01)

### Bug Fixes

* let service_definitions consumer process both RPC and ASYNC messages ([752a5c4](https://github.com/ColdPBC/cold-monorepo/commit/752a5c4bd541f17204e93fa5ddd899e93b9646b1))
* skip record if service definition doesn't exist ([16208c9](https://github.com/ColdPBC/cold-monorepo/commit/16208c91d6c9ebcdccb9184a44487cfe3dea4d70))

## [1.79.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.5...v1.79.6) (2024-01-01)

### Bug Fixes

* add redis job queues ([dfccb48](https://github.com/ColdPBC/cold-monorepo/commit/dfccb48bd808f9a384d9e25675b937614ada7b97))

## [1.79.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.4...v1.79.5) (2024-01-01)

### Bug Fixes

* add redis job queues ([c77ec1b](https://github.com/ColdPBC/cold-monorepo/commit/c77ec1b3c6871479e5d8108c0ccd8b34faa8a45d))
* return 202 (accepted) ([727f5fe](https://github.com/ColdPBC/cold-monorepo/commit/727f5fe21bb82a96cd3c1594cf41512628177b80))

## [1.79.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.3...v1.79.4) (2023-12-30)

### Bug Fixes

* coerce date to UTC ([a972cec](https://github.com/ColdPBC/cold-monorepo/commit/a972cecdcd0116ef32b4f56232505600c8b62253))

## [1.79.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.2...v1.79.3) (2023-12-30)

### Bug Fixes

* troubleshoot tracer ([0e43322](https://github.com/ColdPBC/cold-monorepo/commit/0e43322c35fe46d157f417cc90dd9f8556cf2bdb))

## [1.79.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.1...v1.79.2) (2023-12-30)

### Bug Fixes

* troubleshoot tracer ([703337b](https://github.com/ColdPBC/cold-monorepo/commit/703337b82158898ddc6c935a94b58d78fc753558))

## [1.79.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.79.0...v1.79.1) (2023-12-30)

### Bug Fixes

* add domain entry for bayou.coldclimate.online and .com ([47326f1](https://github.com/ColdPBC/cold-monorepo/commit/47326f1a34bea616e5046795bf15758c8b721c15))

# [1.79.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.7...v1.79.0) (2023-12-30)

### Features

* add bayou webhook payload validation ([2bd110a](https://github.com/ColdPBC/cold-monorepo/commit/2bd110a7a6e4bdadadb2f3c8afb537a91cca6675))

## [1.78.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.6...v1.78.7) (2023-12-30)

### Bug Fixes

* fix disconnect issue? ([637097c](https://github.com/ColdPBC/cold-monorepo/commit/637097cf2186d8b3b0a39dd95d5936541a7ea878))

## [1.78.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.5...v1.78.6) (2023-12-30)

### Bug Fixes

* fix dd trace module ([a79b307](https://github.com/ColdPBC/cold-monorepo/commit/a79b307a73d68f5b2a04d0e35b47cd6d3d95e34f))

## [1.78.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.4...v1.78.5) (2023-12-29)

### Bug Fixes

* clean up cron/darkly/nest/rabbit modules ([1495817](https://github.com/ColdPBC/cold-monorepo/commit/14958179fef370e88ba30caef739cc4f15d947b0))
* comment out cron module ([43b98c1](https://github.com/ColdPBC/cold-monorepo/commit/43b98c1eff19c51e538fbca4091b6bcd4a2e2ab3))

## [1.78.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.3...v1.78.4) (2023-12-29)

### Bug Fixes

* remove unnecesary configs ([b5c6f60](https://github.com/ColdPBC/cold-monorepo/commit/b5c6f607ce1cd74a859b557ddf8c4bba44ffd7a1))

## [1.78.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.2...v1.78.3) (2023-12-29)

### Bug Fixes

* move tracer to lib ([0699e53](https://github.com/ColdPBC/cold-monorepo/commit/0699e53b1356eeb21eec65b14fbd2e93d8bccb40))

## [1.78.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.1...v1.78.2) (2023-12-29)

### Bug Fixes

* add index to repo ([24b9ca0](https://github.com/ColdPBC/cold-monorepo/commit/24b9ca0d7b6164e1a7c5f59bbe5c1b51be4818e5))

## [1.78.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.78.0...v1.78.1) (2023-12-29)

### Bug Fixes

* add statuscode to logs ([f893973](https://github.com/ColdPBC/cold-monorepo/commit/f893973a6524926e59892d228003845cbfb1337b))

# [1.78.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.8...v1.78.0) (2023-12-23)

### Bug Fixes

* add service, version tags to initialization logs ([b059c88](https://github.com/ColdPBC/cold-monorepo/commit/b059c886fd16ee80275e3220295cef71e0101842))
* implement dynamic flag ([e61d2e6](https://github.com/ColdPBC/cold-monorepo/commit/e61d2e6b1590043afa65e02cbd69691446271490))
* log health requests based on feature flag ([0a80ca7](https://github.com/ColdPBC/cold-monorepo/commit/0a80ca7bf04cb076244afeee06a86d4e5752df93))

### Features

* add json flag subscription functions ([2e3dbcc](https://github.com/ColdPBC/cold-monorepo/commit/2e3dbcc57be3004f3848c5ecb3dcbe3cb15e1bbc))
* implement cron service ([f3011d3](https://github.com/ColdPBC/cold-monorepo/commit/f3011d391579610c76a105c7dec2eae08adbf3de))
* implement darkly streaming ([6839740](https://github.com/ColdPBC/cold-monorepo/commit/6839740de7106b22b98e278e5631fc0139677dc2))
* implement darkly streaming ([731fd49](https://github.com/ColdPBC/cold-monorepo/commit/731fd4970684b1e0f6be94fc2b06c97c85b01c8b))
* load nest modules based on feature flags ([496ef3f](https://github.com/ColdPBC/cold-monorepo/commit/496ef3f612a919c67db083e6282066d011447fd4))

## [1.77.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.7...v1.77.8) (2023-12-22)

### Bug Fixes

* add override keyword to onModuleInit ([d962a1c](https://github.com/ColdPBC/cold-monorepo/commit/d962a1c3e63a0c364fd17d4b8a404570902c06ae))

## [1.77.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.6...v1.77.7) (2023-12-22)

### Bug Fixes

* remove health prefix from climatiq ([fc572fe](https://github.com/ColdPBC/cold-monorepo/commit/fc572fea9de748d885160a80937e0db69d662759))

## [1.77.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.5...v1.77.6) (2023-12-22)

### Bug Fixes

* logging in platform services ([f9348dc](https://github.com/ColdPBC/cold-monorepo/commit/f9348dcf3bf8498777a4d21bc9c669272c0ba24f))

## [1.77.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.4...v1.77.5) (2023-12-21)

### Bug Fixes

* primsa init issue with services that don't rely on the database ([57ea718](https://github.com/ColdPBC/cold-monorepo/commit/57ea718c557071cf43e29aac06f1aa22db864f01))

## [1.77.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.3...v1.77.4) (2023-12-21)

### Bug Fixes

* nagging little bugs ([7df55c9](https://github.com/ColdPBC/cold-monorepo/commit/7df55c97a7989bd2ccd8b804305097723ca15e57))

## [1.77.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.2...v1.77.3) (2023-12-21)

### Bug Fixes

* logging interceptor not respecting ENABLE_HEALTH_LOGS flag ([e0a65da](https://github.com/ColdPBC/cold-monorepo/commit/e0a65dac0dc93f3e8c408f24ec6585bc93386ba4))

## [1.77.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.1...v1.77.2) (2023-12-21)

### Bug Fixes

* add undefined/null orgId check before checking for cold:Admin ([04b4d05](https://github.com/ColdPBC/cold-monorepo/commit/04b4d05555728ba9e3889dcd165d51d3c6ee1148))

## [1.77.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.77.0...v1.77.1) (2023-12-21)

### Bug Fixes

* remove auth0 types ([ae0e422](https://github.com/ColdPBC/cold-monorepo/commit/ae0e422cf28d1c8eadb9ca5cbf2ca80a2f1dea33))
* remove auth0 types ([#209](https://github.com/ColdPBC/cold-monorepo/issues/209)) ([657a4d0](https://github.com/ColdPBC/cold-monorepo/commit/657a4d07054a7359f9a6352a18300d36f71fe537))

# [1.77.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.5...v1.77.0) (2023-12-21)

### Bug Fixes

* implement nest library ([9b1820e](https://github.com/ColdPBC/cold-monorepo/commit/9b1820e6d5c7f2bd6bdcced3aedc1ae95ca4a306))
* path resolution in test ([a395790](https://github.com/ColdPBC/cold-monorepo/commit/a395790a053e3118a3ae942591752110b8b6ab55))
* remove database_url from platform preview apps ([0e83756](https://github.com/ColdPBC/cold-monorepo/commit/0e83756509b4119cde14d2849d74c44d0b931d29))

### Features

* add bayou microservice ([8d7506b](https://github.com/ColdPBC/cold-monorepo/commit/8d7506b4c86084da9c09c5d0279d6bd41d3b9c9f))

## [1.76.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.4...v1.76.5) (2023-12-21)

### Bug Fixes

* make prisma module global ([b4df262](https://github.com/ColdPBC/cold-monorepo/commit/b4df26200de4cff77e278dffbd475c39ef9f75ba))
* make prisma module global ([#208](https://github.com/ColdPBC/cold-monorepo/issues/208)) ([029c40e](https://github.com/ColdPBC/cold-monorepo/commit/029c40e2244f81b40d59df3e1314d50c7bdce7df))

## [1.76.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.3...v1.76.4) (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([1b0ab6e](https://github.com/ColdPBC/cold-monorepo/commit/1b0ab6e9c49297f7e31e15c72b433bdbd01c69ea))
* add bayou service to preview block ([e4b7fb5](https://github.com/ColdPBC/cold-monorepo/commit/e4b7fb5bbb0f33b44ac64e63b13a7d28f3159960))
* add manual deploy for preview ([a35dd2c](https://github.com/ColdPBC/cold-monorepo/commit/a35dd2c865d49741d812add53db79acf447ddc23))
* allow all roles on org scoped requests ([2f435a8](https://github.com/ColdPBC/cold-monorepo/commit/2f435a8fbedf614c70e3645115b8eb70de1a14c3))
* remove database_url from platform preview apps ([7d2e709](https://github.com/ColdPBC/cold-monorepo/commit/7d2e709e3e0f5257c9e7d22e9830908bd61ac46b))

## [1.76.4-cold-447.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.4-cold-447.3...v1.76.4-cold-447.4) (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([1b0ab6e](https://github.com/ColdPBC/cold-monorepo/commit/1b0ab6e9c49297f7e31e15c72b433bdbd01c69ea))

## [1.76.4-cold-447.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.4-cold-447.2...v1.76.4-cold-447.3) (2023-12-21)

### Bug Fixes

* add bayou service to preview block ([e4b7fb5](https://github.com/ColdPBC/cold-monorepo/commit/e4b7fb5bbb0f33b44ac64e63b13a7d28f3159960))

## [1.76.4-cold-447.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.4-cold-447.1...v1.76.4-cold-447.2) (2023-12-21)

### Bug Fixes

* remove database_url from platform preview apps ([7d2e709](https://github.com/ColdPBC/cold-monorepo/commit/7d2e709e3e0f5257c9e7d22e9830908bd61ac46b))

## [1.76.4-cold-447.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.3...v1.76.4-cold-447.1) (2023-12-21)

### Bug Fixes

* allow all roles on org scoped requests ([2f435a8](https://github.com/ColdPBC/cold-monorepo/commit/2f435a8fbedf614c70e3645115b8eb70de1a14c3))

## [1.76.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.2...v1.76.3) (2023-12-21)

### Bug Fixes

* published_at validation bug ([f8b814f](https://github.com/ColdPBC/cold-monorepo/commit/f8b814f9806fc747fd333ebf9215ec22a21055a9))

## [1.76.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.1...v1.76.2) (2023-12-21)

### Bug Fixes

* role bug ([baf80ed](https://github.com/ColdPBC/cold-monorepo/commit/baf80edc5bf0310af539ac24ba576220972e8e80))

## [1.76.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.76.0...v1.76.1) (2023-12-19)

### Bug Fixes

* switch service to register via publish rather than RPC ([93ec04d](https://github.com/ColdPBC/cold-monorepo/commit/93ec04dd1847546c03857de6311e911d039b45bb))

# [1.76.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.75.1...v1.76.0) (2023-12-15)

### Features

* added sorting and not showing the module if there are no steps ([ec04e13](https://github.com/ColdPBC/cold-monorepo/commit/ec04e1302fc795c3f8dc6760a228adc3058385d1))
* Create next steps module ([6bd6f8f](https://github.com/ColdPBC/cold-monorepo/commit/6bd6f8fe1e9d06aa6279c53bf923c862b57285c9))
* Update typing ([71ad0c9](https://github.com/ColdPBC/cold-monorepo/commit/71ad0c9ccc24f7cc8d02d82dec6375c67c614ca8))

## [1.75.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.75.0...v1.75.1) (2023-12-14)

### Bug Fixes

* prevent redactor from mutating object ([4cbcd8d](https://github.com/ColdPBC/cold-monorepo/commit/4cbcd8d3491ea391d8b722c63529264a61226a72))

# [1.75.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.74.0...v1.75.0) (2023-12-13)

### Bug Fixes

* Configure Traefik proxy and extend docker-compose ([80981c7](https://github.com/ColdPBC/cold-monorepo/commit/80981c74a0b490cea0e8189a71796c87d0d5306b))
* Configure Traefik proxy and extend docker-compose ([24bef3b](https://github.com/ColdPBC/cold-monorepo/commit/24bef3b8ea22f5c0635822f0d5b5eeae42315664))
* custom action in Datadog workflows ([5fcd777](https://github.com/ColdPBC/cold-monorepo/commit/5fcd77798b416cb52b2689785f5cdb21fbd982a1))
* error handling in organization.service ([dfc4853](https://github.com/ColdPBC/cold-monorepo/commit/dfc4853a2ace3d09eb9a1076ea38f81e3b832cb2))
* fix datadog service build ([989dc0e](https://github.com/ColdPBC/cold-monorepo/commit/989dc0e1f4c0ae6cbc760914af1c109c0b0ddb8d))
* fix github actions workflow ([0d21148](https://github.com/ColdPBC/cold-monorepo/commit/0d211489343c83789fa4d8e417638f77717ec137))
* Implement RabbitMQ context check in interceptors and guards ([6e6e58d](https://github.com/ColdPBC/cold-monorepo/commit/6e6e58db89fe041aed277629561e9693884453bf))
* Integrate AMQP Connection into ColdRabbitService and AppModule ([6c12c2a](https://github.com/ColdPBC/cold-monorepo/commit/6c12c2ac4ed79fb8777abe61fa0b5a42d434b106))
* issue caused by merge conflicts. ([7da35ae](https://github.com/ColdPBC/cold-monorepo/commit/7da35ae32156ad523d237b0a100ac0c44b0bce49))
* Refactor RabbitMQ integration in ColdRabbitModule ([44ecc12](https://github.com/ColdPBC/cold-monorepo/commit/44ecc1276c20929e6504cfda2dfaef6bb72e7d71))
* Update auth0 module dependencies and initialization ([f594bee](https://github.com/ColdPBC/cold-monorepo/commit/f594bee51760ff36a9cf8b565a744715083f8afe))
* Update Datadog workflows and add new OpenAI service workflow ([9640ca6](https://github.com/ColdPBC/cold-monorepo/commit/9640ca65b0a48afc3ee228df33fe056febab9b3b))
* Update main.ts to modify AppModule import path ([a374888](https://github.com/ColdPBC/cold-monorepo/commit/a374888db28de5ef77da2a181e8571ed80e032ba))

### Features

* Add integration service types to "service_definitions" ([291329c](https://github.com/ColdPBC/cold-monorepo/commit/291329cb012e81fadf66555c4bc0a1c6053e77c6))
* Add RabbitMQ module and update AWS SDK dependency versions ([dafcb7b](https://github.com/ColdPBC/cold-monorepo/commit/dafcb7b7ced364c9f7c86daf16df553b83e93b31))
* Add RabbitMQ module and update AWS SDK dependency versions ([e9f711d](https://github.com/ColdPBC/cold-monorepo/commit/e9f711dbfcd542c4b3fd0e4a01777b8e2cf05c8e))
* Add service_definitions model to Prisma schema ([745176f](https://github.com/ColdPBC/cold-monorepo/commit/745176f53c07e694cbacf78a4a5708969be9cd1e))
* Add unique index on `name` in `service_definitions` ([ccd0302](https://github.com/ColdPBC/cold-monorepo/commit/ccd03023b3057132e41047af0d3b216747d650e8))
* Added addtional context to surveys ([9c2e425](https://github.com/ColdPBC/cold-monorepo/commit/9c2e4252ef8dc74fbc05cfe74e6e78c9d35f03ce))
* Create "service_definitions" model in database ([ddd6205](https://github.com/ColdPBC/cold-monorepo/commit/ddd620523b04d5f3d99c7ca53406e53bb2f798b6))
* Initialize Climatiq and RabbitMQ services ([6c90b26](https://github.com/ColdPBC/cold-monorepo/commit/6c90b268afbddab0760a2973b8f3a268569d4162))
* Update AppModule and add BayouService in Climatiq app ([7e3a45b](https://github.com/ColdPBC/cold-monorepo/commit/7e3a45b661623d9afd15b81000ad38bc011e47cd))
* update to survey input styling and improved logic ([dca46f5](https://github.com/ColdPBC/cold-monorepo/commit/dca46f5294e43b36d88ad510069a7366c2aea9b6))

# [1.74.0-cold-000-climatiq.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.10...v1.74.0-cold-000-climatiq.1) (2023-12-10)

### Features

* Add RabbitMQ module and update AWS SDK dependency versions ([e9f711d](https://github.com/ColdPBC/cold-monorepo/commit/e9f711dbfcd542c4b3fd0e4a01777b8e2cf05c8e))
* Initialize Climatiq and RabbitMQ services ([6c90b26](https://github.com/ColdPBC/cold-monorepo/commit/6c90b268afbddab0760a2973b8f3a268569d4162))

## [1.73.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.9...v1.73.10) (2023-12-08)

### Bug Fixes

* surveys issue ([9047c57](https://github.com/ColdPBC/cold-monorepo/commit/9047c57fdf7a6084064495a819a949c6f1cd2d76))
* surveys issue ([3c5701b](https://github.com/ColdPBC/cold-monorepo/commit/3c5701b4359e7852c17b40095be81e0ebe20173c))

## [1.73.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.8...v1.73.9) (2023-12-08)

### Bug Fixes

* barrel file issue ([d8234d6](https://github.com/ColdPBC/cold-monorepo/commit/d8234d667fee010ee5d677af3f254a76874a99a1))

## [1.73.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.7...v1.73.8) (2023-12-08)

### Bug Fixes

* barrel file issue ([48c3fc9](https://github.com/ColdPBC/cold-monorepo/commit/48c3fc9f1546aeaf78c055fea1fdd5cd9a3ee65e))
* barrel file issue ([6ef74f1](https://github.com/ColdPBC/cold-monorepo/commit/6ef74f1bd00d72b2684bd0d95e7ed288d9049fb5))

## [1.73.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.6...v1.73.7) (2023-12-08)

### Bug Fixes

* barrel file issue ([a793020](https://github.com/ColdPBC/cold-monorepo/commit/a7930200d56d51a62f0fab08a06b6383a78507b9))

## [1.73.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.5...v1.73.6) (2023-12-08)

### Bug Fixes

* barrel file issue ([16723c4](https://github.com/ColdPBC/cold-monorepo/commit/16723c4512c786ec8a39c1f9b1988346e9aa03d2))

## [1.73.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.4...v1.73.5) (2023-12-08)

### Bug Fixes

* barrel file issue ([4f46731](https://github.com/ColdPBC/cold-monorepo/commit/4f467319040373ea9edf88d89c5909b0f705e462))

## [1.73.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.3...v1.73.4) (2023-12-08)

### Bug Fixes

* disable cache ([b4b5daa](https://github.com/ColdPBC/cold-monorepo/commit/b4b5daa911aca86828852a9e34ce5c1fea3b6f41))

## [1.73.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.2...v1.73.3) (2023-12-08)

### Bug Fixes

* update VITE_DD_SERVICE ([69a5197](https://github.com/ColdPBC/cold-monorepo/commit/69a5197602ed5ccbe175a353b28764046f2bd00f))

## [1.73.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.1...v1.73.2) (2023-12-08)

### Bug Fixes

* refactor authentication / caching ([52a5129](https://github.com/ColdPBC/cold-monorepo/commit/52a51291c89f58dd7cefbcbaf5f06252f5ec4d4d))

## [1.73.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.73.0...v1.73.1) (2023-12-06)

### Bug Fixes

* versioning ([35cd479](https://github.com/ColdPBC/cold-monorepo/commit/35cd4799d24b0b9b884689ed68d2e0144fe07298))

# [1.73.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.11...v1.73.0) (2023-12-06)

### Bug Fixes

* migrate to config service ([2d359d3](https://github.com/ColdPBC/cold-monorepo/commit/2d359d358ba8fbb662b46941b939d6e3f00466db))
* missing env vars ([0b8abb9](https://github.com/ColdPBC/cold-monorepo/commit/0b8abb9f10ffdd6c75a01a72f9914e5c9c8dc996))

### Features

* add openai service scaffolding ([7146d07](https://github.com/ColdPBC/cold-monorepo/commit/7146d0772061ac0a07bb6f2489c9a80410b03390))
* reduce instance counts ([c718c1c](https://github.com/ColdPBC/cold-monorepo/commit/c718c1c8ae72af419444c10fae38fbf017fcb59f))

## [1.72.12-cold-000007-test-issue.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.11...v1.72.12-cold-000007-test-issue.1) (2023-12-05)

### Bug Fixes

* migrate to config service ([2d359d3](https://github.com/ColdPBC/cold-monorepo/commit/2d359d358ba8fbb662b46941b939d6e3f00466db))

## [1.72.11](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.10...v1.72.11) (2023-12-02)

### Bug Fixes

* return object instead of throwing ([731dd10](https://github.com/ColdPBC/cold-monorepo/commit/731dd1006e23fcf42d3581b2301b067dd90a5ff4))
* typo in log message ([3d945c1](https://github.com/ColdPBC/cold-monorepo/commit/3d945c141d3b936089e8f27899632b1d896918ce))

## [1.72.10](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.9...v1.72.10) (2023-12-01)

### Bug Fixes

* don't tear down db unless in CI ([70914de](https://github.com/ColdPBC/cold-monorepo/commit/70914de942e527fe1d3a6b8c1b1b2da5c893470f))
* minor issues ([982f657](https://github.com/ColdPBC/cold-monorepo/commit/982f657ba786845d8fd573bec3a7d1cc9bc676f3))
* redactor issue ([34e89c5](https://github.com/ColdPBC/cold-monorepo/commit/34e89c57208bf1aec3922bd1f992c8cf07ffbaa8))
* remove vite_auth0_client_id ([4ef5b5d](https://github.com/ColdPBC/cold-monorepo/commit/4ef5b5dff33c7eb5f2cbdd76488bef1d735c104a))

## [1.72.9](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.8...v1.72.9) (2023-12-01)

### Bug Fixes

* add additional telemetry ([a527748](https://github.com/ColdPBC/cold-monorepo/commit/a5277482c99ce29c43e9b427b3a6bd5494f188c5))

## [1.72.8](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.7...v1.72.8) (2023-12-01)

### Bug Fixes

* remove max depth ([8dd8939](https://github.com/ColdPBC/cold-monorepo/commit/8dd893916c1407b5f6cfabb804b3b4693edfd2b7))

## [1.72.7](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.6...v1.72.7) (2023-11-30)

## [1.72.7-cold-000005.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.7-cold-000005.1...v1.72.7-cold-000005.2) (2023-11-30)

### Bug Fixes

* redactor issue ([34e89c5](https://github.com/ColdPBC/cold-monorepo/commit/34e89c57208bf1aec3922bd1f992c8cf07ffbaa8))

## [1.72.7-cold-000005.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.6...v1.72.7-cold-000005.1) (2023-11-30)

### Bug Fixes

* health check logs ([fc6299d](https://github.com/ColdPBC/cold-monorepo/commit/fc6299d9e07e099997cf0fbdfc3a2c92407ae22b))
* minor issues ([982f657](https://github.com/ColdPBC/cold-monorepo/commit/982f657ba786845d8fd573bec3a7d1cc9bc676f3))

## [1.72.6](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.5...v1.72.6) (2023-11-29)

### Bug Fixes

* add circuit breaker to redactor ([e33d242](https://github.com/ColdPBC/cold-monorepo/commit/e33d242e89ecff1ac7ad57ab04ef95fe6acbe435))

## [1.72.5](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.4...v1.72.5) (2023-11-29)

### Bug Fixes

* debug log error ([69a7585](https://github.com/ColdPBC/cold-monorepo/commit/69a75857281d1b51729d9a4ee633d74f8e9b7f8f))

## [1.72.4](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.3...v1.72.4) (2023-11-29)

### Bug Fixes

* only run on pr ([3f84d91](https://github.com/ColdPBC/cold-monorepo/commit/3f84d913a001db491b32f915023e18299ff65925))

## [1.72.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.2...v1.72.3) (2023-11-29)

### Bug Fixes

* update deploy hook ([2c43937](https://github.com/ColdPBC/cold-monorepo/commit/2c43937b5d428155063e65feb99404fa46d67960))

## [1.72.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.1...v1.72.2) (2023-11-29)

### Bug Fixes

* add lodash.set ([d1f4a5e](https://github.com/ColdPBC/cold-monorepo/commit/d1f4a5e83e099feac0d9fe4f40209ccfa4425e9f))
* add lodash.set ([4743986](https://github.com/ColdPBC/cold-monorepo/commit/47439868b3f267bb59803075c5be69c24a60bc80))
* remove lodash dep ([ac66049](https://github.com/ColdPBC/cold-monorepo/commit/ac66049d9b44161ac2f35f50d243254588d043bd))

## [1.72.2-cold-0004.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.2-cold-0004.2...v1.72.2-cold-0004.3) (2023-11-29)

### Bug Fixes

* remove lodash dep ([ac66049](https://github.com/ColdPBC/cold-monorepo/commit/ac66049d9b44161ac2f35f50d243254588d043bd))

## [1.72.2-cold-0004.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.2-cold-0004.1...v1.72.2-cold-0004.2) (2023-11-29)

### Bug Fixes

* add lodash.set ([d1f4a5e](https://github.com/ColdPBC/cold-monorepo/commit/d1f4a5e83e099feac0d9fe4f40209ccfa4425e9f))

## [1.72.2-cold-0004.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.1...v1.72.2-cold-0004.1) (2023-11-29)

### Bug Fixes

* add lodash.set ([4743986](https://github.com/ColdPBC/cold-monorepo/commit/47439868b3f267bb59803075c5be69c24a60bc80))

## [1.72.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.0...v1.72.1) (2023-11-29)

### Bug Fixes

* error in logger ([80db42c](https://github.com/ColdPBC/cold-monorepo/commit/80db42cb4d3323abaf9f7b6e7e0ff81625d6bca7))

# [1.72.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.0...v1.72.0) (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f](https://github.com/ColdPBC/cold-monorepo/commit/d2aee9f88c9a1d99aef2e6297350cde9f196c6aa))
* broken version ([98be095](https://github.com/ColdPBC/cold-monorepo/commit/98be0951d11c122baf2f01b98fd2d544ee3c0764))
* broken version ([5b05bb9](https://github.com/ColdPBC/cold-monorepo/commit/5b05bb9099db72ed33d5110f74715df4499e32c9))
* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))
* build ([a872027](https://github.com/ColdPBC/cold-monorepo/commit/a87202746e71b939409c435b07392beaa1802fb6))
* cancel dupe actions ([9b90935](https://github.com/ColdPBC/cold-monorepo/commit/9b909351883f798f3743e332d86a6fc2d3d6007f))
* dont version on PR ([6486568](https://github.com/ColdPBC/cold-monorepo/commit/648656843902f07937a8f0f991a23d40c625340a))
* update cancel action version ([ab7eccd](https://github.com/ColdPBC/cold-monorepo/commit/ab7eccd5e29f520378ecd5c14acbeb77173e8d59))

### Features

* cancel outdated actions ([76b9d59](https://github.com/ColdPBC/cold-monorepo/commit/76b9d59eb1ad85a86f104a61e4818052280982a0))

# [1.72.0-cold-0002.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.72.0-cold-0002.1...v1.72.0-cold-0002.2) (2023-11-29)

### Bug Fixes

* update cancel action version ([ab7eccd](https://github.com/ColdPBC/cold-monorepo/commit/ab7eccd5e29f520378ecd5c14acbeb77173e8d59))

# [1.72.0-cold-0002.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.0...v1.72.0-cold-0002.1) (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f](https://github.com/ColdPBC/cold-monorepo/commit/d2aee9f88c9a1d99aef2e6297350cde9f196c6aa))
* broken version ([98be095](https://github.com/ColdPBC/cold-monorepo/commit/98be0951d11c122baf2f01b98fd2d544ee3c0764))
* broken version ([5b05bb9](https://github.com/ColdPBC/cold-monorepo/commit/5b05bb9099db72ed33d5110f74715df4499e32c9))
* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))
* build ([a872027](https://github.com/ColdPBC/cold-monorepo/commit/a87202746e71b939409c435b07392beaa1802fb6))
* cancel dupe actions ([9b90935](https://github.com/ColdPBC/cold-monorepo/commit/9b909351883f798f3743e332d86a6fc2d3d6007f))
* dont version on PR ([6486568](https://github.com/ColdPBC/cold-monorepo/commit/648656843902f07937a8f0f991a23d40c625340a))

### Features

* cancel outdated actions ([76b9d59](https://github.com/ColdPBC/cold-monorepo/commit/76b9d59eb1ad85a86f104a61e4818052280982a0))

## [1.71.1-cold-0001.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.1-cold-0001.2...v1.71.1-cold-0001.3) (2023-11-29)

### Bug Fixes

* broken version ([d2aee9f](https://github.com/ColdPBC/cold-monorepo/commit/d2aee9f88c9a1d99aef2e6297350cde9f196c6aa))
* broken version ([98be095](https://github.com/ColdPBC/cold-monorepo/commit/98be0951d11c122baf2f01b98fd2d544ee3c0764))
* broken version ([5b05bb9](https://github.com/ColdPBC/cold-monorepo/commit/5b05bb9099db72ed33d5110f74715df4499e32c9))
* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))
* cancel dupe actions ([9b90935](https://github.com/ColdPBC/cold-monorepo/commit/9b909351883f798f3743e332d86a6fc2d3d6007f))

## [1.71.1-cold-0001.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.1-cold-0001.2...v1.71.1-cold-0001.3) (2023-11-29)

### Bug Fixes

* broken version ([5b05bb9](https://github.com/ColdPBC/cold-monorepo/commit/5b05bb9099db72ed33d5110f74715df4499e32c9))
* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))
* cancel dupe actions ([9b90935](https://github.com/ColdPBC/cold-monorepo/commit/9b909351883f798f3743e332d86a6fc2d3d6007f))

## [1.71.1-cold-0001.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.1-cold-0001.2...v1.71.1-cold-0001.3) (2023-11-29)

### Bug Fixes

* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))
* cancel dupe actions ([9b90935](https://github.com/ColdPBC/cold-monorepo/commit/9b909351883f798f3743e332d86a6fc2d3d6007f))

## [1.71.1-cold-0001.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.1-cold-0001.2...v1.71.1-cold-0001.3) (2023-11-29)

### Bug Fixes

* build ([0bb1e0a](https://github.com/ColdPBC/cold-monorepo/commit/0bb1e0a168d2b7fad39c5b35898ac1c73ec58752))

## [1.71.1-cold-0001.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.1-cold-0001.1...v1.71.1-cold-0001.2) (2023-11-29)

### Bug Fixes

* build ([a872027](https://github.com/ColdPBC/cold-monorepo/commit/a87202746e71b939409c435b07392beaa1802fb6))

## [1.71.1-cold-0001.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.0...v1.71.1-cold-0001.1) (2023-11-29)

### Bug Fixes

* dont version on PR ([6486568](https://github.com/ColdPBC/cold-monorepo/commit/648656843902f07937a8f0f991a23d40c625340a))

# [1.71.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.70.0...v1.71.0) (2023-11-29)

### Bug Fixes

* add tests ([4bd8c64](https://github.com/ColdPBC/cold-monorepo/commit/4bd8c64bc4d4656655e5bb2a5aaa3698b33b908f))
* add tests ([3f7ad98](https://github.com/ColdPBC/cold-monorepo/commit/3f7ad989cfad3e7452913f950a89ddc9724fea3d))
* consolidate deploy steps ([4ece12c](https://github.com/ColdPBC/cold-monorepo/commit/4ece12c472992b8eeb5749b05ac42120de19325a))
* correct sidebar styling after flowbite react update ([326a25c](https://github.com/ColdPBC/cold-monorepo/commit/326a25c4f02fdd5554d72c85d57cc67fb012d9eb))
* improve build ([ec25746](https://github.com/ColdPBC/cold-monorepo/commit/ec25746f04b7d4e6de8b6af3139999e35571058f))
* issue causing 404 when accessing apiDocs or health endpoint ([6de58db](https://github.com/ColdPBC/cold-monorepo/commit/6de58db489c6305bf46ecb0b797b10ad9abf4e7b))
* move authorization/guards/filters to lib ([93b7457](https://github.com/ColdPBC/cold-monorepo/commit/93b7457948b19afa5a8d22bfc7bd48984c1fdedd))
* move cron module and objectUtils to lib ([c8ca863](https://github.com/ColdPBC/cold-monorepo/commit/c8ca863524bff15f12d7ad829c4e0e34f345a2b3))
* move schemas to validation library ([8fe55c4](https://github.com/ColdPBC/cold-monorepo/commit/8fe55c4b188c214bb68bcd6839dbab9afc6917a9))
* move schemas to validation library ([fdd0422](https://github.com/ColdPBC/cold-monorepo/commit/fdd04228b3dd0f9927382305a73f7709e8ef920b))
* rename path alias ([f43bedf](https://github.com/ColdPBC/cold-monorepo/commit/f43bedfd3980bcf1bb66ea054559ec89153efb9a))
* rename path alias ([361ac7b](https://github.com/ColdPBC/cold-monorepo/commit/361ac7befe0c43372856b4f1da4621daba94d474))
* rename path alias ([c2ee1c4](https://github.com/ColdPBC/cold-monorepo/commit/c2ee1c42ebf3d41cae6676be14e413876beeaaa4))
* rename path alias ([4ee0ee5](https://github.com/ColdPBC/cold-monorepo/commit/4ee0ee5c43d48d58d93648bdc434eb7854587888))
* resolve react types mismatch ([08c77dc](https://github.com/ColdPBC/cold-monorepo/commit/08c77dcfe23811d7000da95c45a7fdac9ae6ed23))
* unhandled error case ([b73b06d](https://github.com/ColdPBC/cold-monorepo/commit/b73b06d9cdb0719d982491fec6525cc62f7273f3))
* unhandled error case ([39398f0](https://github.com/ColdPBC/cold-monorepo/commit/39398f0231c52372a8f472a2fedc714a00903326))
* update yarn lock and react types ([fc66157](https://github.com/ColdPBC/cold-monorepo/commit/fc6615768189388492d66bae9fa0d471e77a7501))
* use faster stringify ([64e51c3](https://github.com/ColdPBC/cold-monorepo/commit/64e51c37e8d1e8ec5f5b74f3b87510765fd82f35))

### Features

* add api codebase to monorepo ([b4923d6](https://github.com/ColdPBC/cold-monorepo/commit/b4923d662e1753df8ebf781e141a067fa1d5740f))
* add dockerfiles ([3d26a88](https://github.com/ColdPBC/cold-monorepo/commit/3d26a88dd28a8cbc411d12c319ca84d369d9580f))
* add functioning api to monorepo ([1f45cc9](https://github.com/ColdPBC/cold-monorepo/commit/1f45cc9faf38dc8e97336b98ad87611537bd1385))
* add openai service ([7457661](https://github.com/ColdPBC/cold-monorepo/commit/745766127e56fa6e991c3f4774b444b1c3ad0979))
* add shared nest lib to monorepo ([941b3a5](https://github.com/ColdPBC/cold-monorepo/commit/941b3a53d3584c5af5717ef1b640755360efcb6c))
* fix ui build issues ([affe153](https://github.com/ColdPBC/cold-monorepo/commit/affe1534b23516833d0b1d97a59bea5485263bfb))
* resolve typing issue ([064234e](https://github.com/ColdPBC/cold-monorepo/commit/064234ee7bf46e99d9aa771f49858260465ff813))
* resolve ui build errors ([0d266d2](https://github.com/ColdPBC/cold-monorepo/commit/0d266d2f056c67bee295582accd75b24edad9817))

# [1.71.0-staging.3](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.0-staging.2...v1.71.0-staging.3) (2023-11-28)

### Bug Fixes

* consolidate deploy steps ([4ece12c](https://github.com/ColdPBC/cold-monorepo/commit/4ece12c472992b8eeb5749b05ac42120de19325a))

# [1.71.0-staging.2](https://github.com/ColdPBC/cold-monorepo/compare/v1.71.0-staging.1...v1.71.0-staging.2) (2023-11-28)

### Bug Fixes

* correct sidebar styling after flowbite react update ([326a25c](https://github.com/ColdPBC/cold-monorepo/commit/326a25c4f02fdd5554d72c85d57cc67fb012d9eb))
* update yarn lock and react types ([fc66157](https://github.com/ColdPBC/cold-monorepo/commit/fc6615768189388492d66bae9fa0d471e77a7501))

### Features

* fix ui build issues ([affe153](https://github.com/ColdPBC/cold-monorepo/commit/affe1534b23516833d0b1d97a59bea5485263bfb))

# [1.71.0-staging.1](https://github.com/ColdPBC/cold-monorepo/compare/v1.70.0...v1.71.0-staging.1) (2023-11-27)

### Bug Fixes

* add tests ([4bd8c64](https://github.com/ColdPBC/cold-monorepo/commit/4bd8c64bc4d4656655e5bb2a5aaa3698b33b908f))
* add tests ([3f7ad98](https://github.com/ColdPBC/cold-monorepo/commit/3f7ad989cfad3e7452913f950a89ddc9724fea3d))
* issue causing 404 when accessing apiDocs or health endpoint ([6de58db](https://github.com/ColdPBC/cold-monorepo/commit/6de58db489c6305bf46ecb0b797b10ad9abf4e7b))
* move authorization/guards/filters to lib ([93b7457](https://github.com/ColdPBC/cold-monorepo/commit/93b7457948b19afa5a8d22bfc7bd48984c1fdedd))
* move cron module and objectUtils to lib ([c8ca863](https://github.com/ColdPBC/cold-monorepo/commit/c8ca863524bff15f12d7ad829c4e0e34f345a2b3))
* move schemas to validation library ([8fe55c4](https://github.com/ColdPBC/cold-monorepo/commit/8fe55c4b188c214bb68bcd6839dbab9afc6917a9))
* move schemas to validation library ([fdd0422](https://github.com/ColdPBC/cold-monorepo/commit/fdd04228b3dd0f9927382305a73f7709e8ef920b))
* rename path alias ([f43bedf](https://github.com/ColdPBC/cold-monorepo/commit/f43bedfd3980bcf1bb66ea054559ec89153efb9a))
* rename path alias ([361ac7b](https://github.com/ColdPBC/cold-monorepo/commit/361ac7befe0c43372856b4f1da4621daba94d474))
* rename path alias ([c2ee1c4](https://github.com/ColdPBC/cold-monorepo/commit/c2ee1c42ebf3d41cae6676be14e413876beeaaa4))
* rename path alias ([4ee0ee5](https://github.com/ColdPBC/cold-monorepo/commit/4ee0ee5c43d48d58d93648bdc434eb7854587888))
* resolve react types mismatch ([08c77dc](https://github.com/ColdPBC/cold-monorepo/commit/08c77dcfe23811d7000da95c45a7fdac9ae6ed23))
* unhandled error case ([b73b06d](https://github.com/ColdPBC/cold-monorepo/commit/b73b06d9cdb0719d982491fec6525cc62f7273f3))
* unhandled error case ([39398f0](https://github.com/ColdPBC/cold-monorepo/commit/39398f0231c52372a8f472a2fedc714a00903326))
* use faster stringify ([64e51c3](https://github.com/ColdPBC/cold-monorepo/commit/64e51c37e8d1e8ec5f5b74f3b87510765fd82f35))

### Features

* add api codebase to monorepo ([b4923d6](https://github.com/ColdPBC/cold-monorepo/commit/b4923d662e1753df8ebf781e141a067fa1d5740f))
* add dockerfiles ([3d26a88](https://github.com/ColdPBC/cold-monorepo/commit/3d26a88dd28a8cbc411d12c319ca84d369d9580f))
* add functioning api to monorepo ([1f45cc9](https://github.com/ColdPBC/cold-monorepo/commit/1f45cc9faf38dc8e97336b98ad87611537bd1385))
* add openai service ([7457661](https://github.com/ColdPBC/cold-monorepo/commit/745766127e56fa6e991c3f4774b444b1c3ad0979))
* add shared nest lib to monorepo ([941b3a5](https://github.com/ColdPBC/cold-monorepo/commit/941b3a53d3584c5af5717ef1b640755360efcb6c))
* resolve typing issue ([064234e](https://github.com/ColdPBC/cold-monorepo/commit/064234ee7bf46e99d9aa771f49858260465ff813))
* resolve ui build errors ([0d266d2](https://github.com/ColdPBC/cold-monorepo/commit/0d266d2f056c67bee295582accd75b24edad9817))

# [1.70.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.69.0...v1.70.0) (2023-11-22)

### Features

* filter out /categories errors when they are are a 404 ([c9a16a8](https://github.com/ColdPBC/cold-monorepo/commit/c9a16a82e0d6f45ca0448c33e03e1894282f6e0b))

# [1.69.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.68.0...v1.69.0) (2023-11-22)

### Bug Fixes

* revert max height styling for sections progress ([7ea6614](https://github.com/ColdPBC/cold-monorepo/commit/7ea66141ccbd76ff8df1164a064c812de881814c))

### Features

* added max height restriction and correct background image styling ([843bc08](https://github.com/ColdPBC/cold-monorepo/commit/843bc080440a2a047bf3cc3ef69983a7b333a8d9))
* set max height to 100px or viewport - 122px ([09dcdf6](https://github.com/ColdPBC/cold-monorepo/commit/09dcdf6c8a7de344bfc125b087817f79a3741593))

# [1.68.0](https://github.com/ColdPBC/cold-monorepo/compare/v1.67.0...v1.68.0) (2023-11-16)

### Features

* add response interceptor for axios to log error in datadogrum ([7c55229](https://github.com/ColdPBC/cold-monorepo/commit/7c55229585c1d5be9589ce99ce37dd4adb51277a))
* added context object to add error to have more info when investigating ([4d924a8](https://github.com/ColdPBC/cold-monorepo/commit/4d924a8da9a6580e581001425df389ef091bc86c))

# [1.67.0](https://github.com/ColdPBC/ui/compare/v1.66.0...v1.67.0) (2023-11-14)

### Bug Fixes

* remove surveys incomplete from mocks for cold admin story ([84b1f62](https://github.com/ColdPBC/ui/commit/84b1f62b3562b3700016ce79bf85483003231422))

### Features

* add cookie to session storage ([8a134e1](https://github.com/ColdPBC/ui/commit/8a134e1502fc30008ae745745e104880d0bb6cae))
* create organization selector on sidebar for cold admins ([97e29b4](https://github.com/ColdPBC/ui/commit/97e29b40d9b105ee700e8e78cad010c8f2018a9c))
* reduce font size and dropdown width ([e58f72d](https://github.com/ColdPBC/ui/commit/e58f72d6e10a29f62a51b2e4eda0c302668cf295))

# [1.66.0](https://github.com/ColdPBC/ui/compare/v1.65.0...v1.66.0) (2023-11-14)

### Features

* Remove invite member when user is company:member ([e3f3708](https://github.com/ColdPBC/ui/commit/e3f370878e7550fda6dc44355d77fef2c8ce68d7))

# [1.65.0](https://github.com/ColdPBC/ui/compare/v1.64.0...v1.65.0) (2023-11-13)

### Features

* Created markdown component ([90cf17c](https://github.com/ColdPBC/ui/commit/90cf17c0c7fcd3b958a31135b296283739905219))
* remove unneeded color specification on prose sm custom styling ([77869e6](https://github.com/ColdPBC/ui/commit/77869e6a4f0c67462ea3c097d888013c1b9f9b70))
* update small story ([d5d981a](https://github.com/ColdPBC/ui/commit/d5d981ad4c2ec565b808913d603a16af1197e7f3))

# [1.64.0](https://github.com/ColdPBC/ui/compare/v1.63.0...v1.64.0) (2023-11-03)

### Features

* add user to dd rum to help track users running into errors ([b161fdc](https://github.com/ColdPBC/ui/commit/b161fdc68e4b456dfd3354054e11f158bf129384))
* use cold climate claims object for logging ([d09aaa0](https://github.com/ColdPBC/ui/commit/d09aaa0ff9da6a9174229dc081e29b02519f2d63))

# [1.63.0](https://github.com/ColdPBC/ui/compare/v1.62.0...v1.63.0) (2023-11-03)

### Features

* update policy content endpoint ([64c9a1f](https://github.com/ColdPBC/ui/commit/64c9a1ff3059e02539f6332c1e5807927432e8da))

# [1.62.0](https://github.com/ColdPBC/ui/compare/v1.61.0...v1.62.0) (2023-11-03)

### Features

* add team member actions ([bc15a6c](https://github.com/ColdPBC/ui/commit/bc15a6c3855f0c5a3c46832d337c909f743716f5))
* Add team member actions back to table for each row ([211abff](https://github.com/ColdPBC/ui/commit/211abff98c044b6a8ffaee859cc252c08ffe2997))
* Added error message for expired invitation link ([efb96a1](https://github.com/ColdPBC/ui/commit/efb96a175e0c7d072dd448a4efeacb19ce5d95de))
* allow roles to be filtered based on role ([5e84596](https://github.com/ColdPBC/ui/commit/5e84596a370ca60534895af772e11a5ce85f7a2c))
* revert handler changes ([fe00f56](https://github.com/ColdPBC/ui/commit/fe00f56c476785bc290d8bc1652eca1d700b17f0))

# [1.61.0](https://github.com/ColdPBC/ui/compare/v1.60.0...v1.61.0) (2023-11-02)

### Features

* add 2nd decimal number if needed ([6597f1b](https://github.com/ColdPBC/ui/commit/6597f1b99d9508b25efa956e687a8f9e82e44cc0))
* format tonnes to have thousand comma ([2260929](https://github.com/ColdPBC/ui/commit/22609293513b1295b5f0dbc308fd7e5f0568f1b6))
* one decimal point ([cde84f7](https://github.com/ColdPBC/ui/commit/cde84f79d8f7f82168d3f0344082c54fe439a221))
* remove trailing zeroes ([87ba77e](https://github.com/ColdPBC/ui/commit/87ba77ec43c48102f51e5ab3c774338d8594abf0))

# [1.60.0](https://github.com/ColdPBC/ui/compare/v1.59.0...v1.60.0) (2023-11-01)

### Bug Fixes

* fix build issues ([fc1081b](https://github.com/ColdPBC/ui/commit/fc1081b223699adffa75d848f7962912478340b2))

### Features

* check if auth0 or organization data is loading ([e37f9aa](https://github.com/ColdPBC/ui/commit/e37f9aadc78f14440a066f38bf518b30bc286fa5))
* moved table to teammembersettings component ([ae6775b](https://github.com/ColdPBC/ui/commit/ae6775b028f39d6340e1291467dd5f06ff936679))
* refactor team member table to own component ([3826928](https://github.com/ColdPBC/ui/commit/3826928f2afb301097c8e93878797a5fb179b81c))

# [1.59.0](https://github.com/ColdPBC/ui/compare/v1.58.0...v1.59.0) (2023-11-01)

### Bug Fixes

* Make signup page responsive ([f9bc168](https://github.com/ColdPBC/ui/commit/f9bc1683368ff414e55b9ec7238fc278ca2cd88f))

### Features

* allow flex col to allow stretching. Set max height to avoid image repeating ([a2f0cd4](https://github.com/ColdPBC/ui/commit/a2f0cd40356cdfb26d25875212ce71ed59a59353))

# [1.58.0](https://github.com/ColdPBC/ui/compare/v1.57.0...v1.58.0) (2023-10-31)

### Features

* add max height and set overflow to auto to only show scrollbar if the list exceeds the height ([62c4350](https://github.com/ColdPBC/ui/commit/62c43505d30f7b26739ce83595518268ff9d4e42))
* add overflow and remove overflow ([89e5748](https://github.com/ColdPBC/ui/commit/89e5748ac02cba4fc45fa00ff110bd4252c76b2c))

# [1.57.0](https://github.com/ColdPBC/ui/compare/v1.56.0...v1.57.0) (2023-10-27)

### Features

* add SWR error to pages components ([3a70bca](https://github.com/ColdPBC/ui/commit/3a70bcab56fc73e71b096116f21520964d602629))
* add swrerror logging to molecules ([2d35a77](https://github.com/ColdPBC/ui/commit/2d35a770128013529266b82ca91e0d3d8636365e))
* added more components with auth0error logging ([ca6f19c](https://github.com/ColdPBC/ui/commit/ca6f19c01c1c038d39a602e408368ef364bae128))
* Added swr error to organism component ([6d35ff8](https://github.com/ColdPBC/ui/commit/6d35ff8b93670667562b0b243b8a38496ba7cc15))
* setup data dog rum logging functionality ([7bb4c01](https://github.com/ColdPBC/ui/commit/7bb4c0144af39df16273a3c5871557b256da00a1))

# [1.56.0](https://github.com/ColdPBC/ui/compare/v1.55.0...v1.56.0) (2023-10-27)

### Features

* reduce action item image height ([c670e33](https://github.com/ColdPBC/ui/commit/c670e334f8f9de82c20f0855add999954fc8e854))
* remove image height restriction and updated actions overview mock ([8823414](https://github.com/ColdPBC/ui/commit/882341467a50324f9ea23f220e02bbc50d9ddee9))
* remove progress bar if the action is not ready to execute and all the surveys are not completed ([656adc4](https://github.com/ColdPBC/ui/commit/656adc41cacae2d57998e7b5dc2d0e95d6ef9888))
* update style of action item progress par ([f863d8c](https://github.com/ColdPBC/ui/commit/f863d8c8a29b1c8a23a9c1392d5a05e3a43f91da))
* Updates to action mock and minimum image height ([d711060](https://github.com/ColdPBC/ui/commit/d711060f64dd5a62d7c3dcbb197833bc901c4015))
* use fixed height div to fill in for missing progress bar ([d9b8053](https://github.com/ColdPBC/ui/commit/d9b80530757560b105bf62edf8a79c17bce3420f))

# [1.55.0](https://github.com/ColdPBC/ui/compare/v1.54.0...v1.55.0) (2023-10-27)

### Features

* created util to get username ([17925a8](https://github.com/ColdPBC/ui/commit/17925a842ec8f7f9e2d65b9369e041766dfa1d63))
* Update step detail dropdown to specific width ([17b1a94](https://github.com/ColdPBC/ui/commit/17b1a9469691901067f40894f178908eefc64ddd))
* Update steward to use first and last name. Use name if these dont exist ([c3229af](https://github.com/ColdPBC/ui/commit/c3229af88381033746b7c29ff78b90b1fba6fea6))
* Updated getusername to formatusername ([f6f4067](https://github.com/ColdPBC/ui/commit/f6f406748b8d961fdd96ff9a816e41fba8f2eb3c))

# [1.54.0](https://github.com/ColdPBC/ui/compare/v1.53.0...v1.54.0) (2023-10-27)

### Bug Fixes

* remove extra period ([3f00bf5](https://github.com/ColdPBC/ui/commit/3f00bf597911a17a5ac5a182e4a2b61aac53dce3))
* update to svg attributes to fix console errors ([126f549](https://github.com/ColdPBC/ui/commit/126f549d2929624a612dc80eda698d20651824d5))

### Features

* Updated completed banner text ([8943d8f](https://github.com/ColdPBC/ui/commit/8943d8fc1a1cfa02ad384ec55122e078019d5455))

# [1.53.0](https://github.com/ColdPBC/ui/compare/v1.52.1...v1.53.0) (2023-10-27)

### Features

* Switch overview and step description in step detail ([d310c5a](https://github.com/ColdPBC/ui/commit/d310c5ad7cb338241a0eac1e42d1648d53026175))

## [1.52.1](https://github.com/ColdPBC/ui/compare/v1.52.0...v1.52.1) (2023-10-26)

### Bug Fixes

* Team member table doesn't have Members / Invites dropdown ([99f7708](https://github.com/ColdPBC/ui/commit/99f7708a485c3e4811f3401f71822a04da11eaa6))
* Team member table doesn't have Members / Invites dropdown ([#120](https://github.com/ColdPBC/ui/issues/120)) ([e4992c3](https://github.com/ColdPBC/ui/commit/e4992c3d5dbb13e5100cbdfd4e0d607da610e8b7))

# [1.52.0](https://github.com/ColdPBC/ui/compare/v1.51.2...v1.52.0) (2023-10-25)

### Bug Fixes

* remove callback ([05b2d57](https://github.com/ColdPBC/ui/commit/05b2d57d563a79737cf190dc2ae52ceebc09306d))

### Features

* add useorgswr to team member table ([3d76f46](https://github.com/ColdPBC/ui/commit/3d76f46c38dd2ed607ec1ed8ba106e701ca42ce0))
* changed getAPIUrl to getOrgSpecificUrl ([9ce527c](https://github.com/ColdPBC/ui/commit/9ce527cf11fc376e5276954fa1d8c69e638b6aaa))
* created use swr and auth0 wrapper ([39ba2af](https://github.com/ColdPBC/ui/commit/39ba2aff6c8a134f771d4822bcb1ba4916b338cc))
* remove coldclimate org id references ([520c791](https://github.com/ColdPBC/ui/commit/520c7911287a67dc5af19c3a11182980b6dac9db))
* remove index ts from prebuild ([8c691d7](https://github.com/ColdPBC/ui/commit/8c691d77264c1dfa274f3ed87bff968d9605d370))
* remove old code from bad merge ([a717140](https://github.com/ColdPBC/ui/commit/a71714037492c0c25c4fef773b5af2975bbd25d7))
* remove usefetchorg no longer used ([54c11d6](https://github.com/ColdPBC/ui/commit/54c11d61c75184898a0b03b1f1db4c845f3983f2))
* Useorgswr instead of swr when fetching organization data ([49a0438](https://github.com/ColdPBC/ui/commit/49a0438995b3291c86d7f5fece30167d337404ba))

## [1.51.2](https://github.com/ColdPBC/ui/compare/v1.51.1...v1.51.2) (2023-10-25)

### Bug Fixes

* Handle auth0 error with error page ([ee475f1](https://github.com/ColdPBC/ui/commit/ee475f1b3d1c8d2ab41383a2d97d7679511ec3f2))
* Set new mock data to last month to avoid switching from 4 and 5 weeks ([172991c](https://github.com/ColdPBC/ui/commit/172991c792581d102292d02bbe8569c1fb4c7cf9))

## [1.51.1](https://github.com/ColdPBC/ui/compare/v1.51.0...v1.51.1) (2023-10-25)

### Bug Fixes

* Update image handling to fit cover container ([95ba7c8](https://github.com/ColdPBC/ui/commit/95ba7c8a340b3427908e39adb9b29468355fe9fc))

# [1.51.0](https://github.com/ColdPBC/ui/compare/v1.50.1...v1.51.0) (2023-10-23)

### Bug Fixes

* Handle action type change to fix build ([fdeb6b9](https://github.com/ColdPBC/ui/commit/fdeb6b99bc84b7dbe0f0bc4db6ddc1c9f9a21205))

### Features

* added back revalidate false on mutate action ([e18ada5](https://github.com/ColdPBC/ui/commit/e18ada5cbacaa84197e5c6e784168016893c13ce))
* Better handle action related items SWR cache update ([8ff1cbf](https://github.com/ColdPBC/ui/commit/8ff1cbff78136c1a1bd8bb05fa6783c0a4b611db))
* do not show category description if it does not exist ([a231dcb](https://github.com/ColdPBC/ui/commit/a231dcbd347f6236d60450166bcf86c20fb9704c))
* reload actions when the search params are updated ([3e9d009](https://github.com/ColdPBC/ui/commit/3e9d0097368177bd1215af1091c7abce28fbce19))
* update checkbox return type ([2d05e15](https://github.com/ColdPBC/ui/commit/2d05e152c0c48daad906f2771a4fc80be887eecd))
* Update mock to dynamic date and not static ([50173eb](https://github.com/ColdPBC/ui/commit/50173ebb6ba5cc8d78552fffd84f81e38c461755))
* update process description padding ([fbfee15](https://github.com/ColdPBC/ui/commit/fbfee15f23eeb5a270b02546b95c3a9fc75db3ca))
* updated action detail objective and process description styling ([5906e24](https://github.com/ColdPBC/ui/commit/5906e24dea796b9a963d709c6efdd50b91e11b88))

## [1.50.1](https://github.com/ColdPBC/ui/compare/v1.50.0...v1.50.1) (2023-10-23)

### Bug Fixes

* Invite member button on settings page does not send invitation t… ([#114](https://github.com/ColdPBC/ui/issues/114)) ([96392fe](https://github.com/ColdPBC/ui/commit/96392fe526c5c0bf3a7499bdfc9042a3ebb65c95))
* Invite member button on settings page does not send invitation to new user ([82e24bd](https://github.com/ColdPBC/ui/commit/82e24bd95f84b65c148f10fad772321797f92d07))

### Reverts

* Revert "Auxiliary commit to revert individual files from 5ab276832fd7b6299dd8fa043118927ffa5a4588" ([44e440f](https://github.com/ColdPBC/ui/commit/44e440f9ca913941d2feda9ab28e3151b26c71fd))
* Revert "Auxiliary commit to revert individual files from 1156ece27c8484c892aaf9cef8b8429b128ee31a" ([7c0fffd](https://github.com/ColdPBC/ui/commit/7c0fffd1e82a9e509687be852f380b4c8a077027))

# [1.50.0](https://github.com/ColdPBC/ui/compare/v1.49.0...v1.50.0) (2023-10-19)

### Features

* add form section component to error boundary handling ([f2150fd](https://github.com/ColdPBC/ui/commit/f2150fd8803193119869d92ee57fb71af1feb7d2))
* Create error boundary ([4cf6aec](https://github.com/ColdPBC/ui/commit/4cf6aec5691a9f29c7003f9f804cb84da1dddbd1))
* Render fallback to avoid dependency when initially rendering ([3903dc1](https://github.com/ColdPBC/ui/commit/3903dc17698cfc89527a775df21ff69ef79bd782))

# [1.49.0](https://github.com/ColdPBC/ui/compare/v1.48.0...v1.49.0) (2023-10-19)

### Features

* handle survey and action open at the same time ([3d599f6](https://github.com/ColdPBC/ui/commit/3d599f6866528761b0dba2425b4724306c3d2223))

# [1.48.0](https://github.com/ColdPBC/ui/compare/v1.47.0...v1.48.0) (2023-10-18)

### Bug Fixes

* remove unused code ([f6f5d25](https://github.com/ColdPBC/ui/commit/f6f5d2557a2a5bd27c702f7d01a27548fa68f6d1))
* Updating first or last name in Settings does not show updated name ([5cae7f6](https://github.com/ColdPBC/ui/commit/5cae7f680a2e30e835ae70f2dbae815e1f2242b3))
* Updating first or last name in Settings does not show updated name ([#110](https://github.com/ColdPBC/ui/issues/110)) ([6f2d242](https://github.com/ColdPBC/ui/commit/6f2d242d8da8bdef5b68c33f5a9ababb641edceb))

### Features

* Update sidebar to be dynamic based on a company's actions ([6f1ee7b](https://github.com/ColdPBC/ui/commit/6f1ee7b9528aa745c1fffbd6b98ca93afd85e5a7))
* Update sidebar to be dynamic based on a company's actions ([#111](https://github.com/ColdPBC/ui/issues/111)) ([ac50424](https://github.com/ColdPBC/ui/commit/ac5042402e7390d1b56aebc97b9dcebb74ed34b5))
* update user select dropdown ([2fb56c4](https://github.com/ColdPBC/ui/commit/2fb56c48272ee069f504253cf27a2fc5099635fe))

# [1.47.0](https://github.com/ColdPBC/ui/compare/v1.46.0...v1.47.0) (2023-10-17)

### Bug Fixes

* resolve conflicts ([87c1d26](https://github.com/ColdPBC/ui/commit/87c1d26c284c172dd80520c94dea947b72d14b37))

### Features

* add action detail progress ([0a6cf50](https://github.com/ColdPBC/ui/commit/0a6cf50bf439b11f493c418107e23197664227fc))
* Patch action with updated action settings ([03fec88](https://github.com/ColdPBC/ui/commit/03fec88ecb553b061fc6649ad53c1cc8c80bc2df))
* removed hard width restrictions for action detail progress ([0889163](https://github.com/ColdPBC/ui/commit/0889163db69fdfcdf0ba36294e0e9b32dca5dcd2))

# [1.46.0](https://github.com/ColdPBC/ui/compare/v1.45.1...v1.46.0) (2023-10-16)

### Features

* Patch action with updated action settings ([cbd2ffa](https://github.com/ColdPBC/ui/commit/cbd2ffa7670df014c8e98ef6ada5cbeb7a461b46))
* Patch action with updated action settings ([#106](https://github.com/ColdPBC/ui/issues/106)) ([5544b1b](https://github.com/ColdPBC/ui/commit/5544b1be00586ad999c8b73667bdd7397525541c))

## [1.45.1](https://github.com/ColdPBC/ui/compare/v1.45.0...v1.45.1) (2023-10-16)

### Bug Fixes

* Put next actions card behind a feature flag ([87b908b](https://github.com/ColdPBC/ui/commit/87b908b481120b38b61295f355b3c9685e395bb7))
* Put next actions card behind a feature flag ([#108](https://github.com/ColdPBC/ui/issues/108)) ([64e2181](https://github.com/ColdPBC/ui/commit/64e2181854ddc9b4478fa054ecb7807ebd9db623))

# [1.45.0](https://github.com/ColdPBC/ui/compare/v1.44.0...v1.45.0) (2023-10-14)

### Bug Fixes

* corrected story arguments ([3ca581a](https://github.com/ColdPBC/ui/commit/3ca581a7683494653cc5d36384763d8478521acf))

### Features

* added sub category detail card to action list page ([e954a29](https://github.com/ColdPBC/ui/commit/e954a29ac020c0354700db31f4244102174eb2a6))
* update subcategory actions list ([cb45421](https://github.com/ColdPBC/ui/commit/cb45421d40259e241a7236aed518bf7bced1f18e))

# [1.44.0](https://github.com/ColdPBC/ui/compare/v1.43.0...v1.44.0) (2023-10-13)

### Features

* Use UserSelectDropdown inside stepDetailAssigneeSelector ([db61698](https://github.com/ColdPBC/ui/commit/db61698fdd8cd48357290ce4be172263945ba2e0))
* Use UserSelectDropdown inside stepDetailAssigneeSelector ([#102](https://github.com/ColdPBC/ui/issues/102)) ([7dbee04](https://github.com/ColdPBC/ui/commit/7dbee04e2edabd1a595d347c4b492b6497c1f6b6))

# [1.43.0](https://github.com/ColdPBC/ui/compare/v1.42.0...v1.43.0) (2023-10-13)

### Features

* create action detail progress component ([6037284](https://github.com/ColdPBC/ui/commit/6037284a55ad0e2a4d84d4cfcfcf9cb621f291b3))
* Updated button text to be in the center ([6ea2445](https://github.com/ColdPBC/ui/commit/6ea2445efaf4276fb59817f99762644a036ee969))

# [1.42.0](https://github.com/ColdPBC/ui/compare/v1.41.0...v1.42.0) (2023-10-13)

### Features

* create SubcategoryActionDetailsCard component ([f24608a](https://github.com/ColdPBC/ui/commit/f24608a07c863d97a4ffa000d1a815c807e12f3e))

# [1.41.0](https://github.com/ColdPBC/ui/compare/v1.40.0...v1.41.0) (2023-10-12)

### Bug Fixes

* fix type errors after flowbite update ([7e55bf1](https://github.com/ColdPBC/ui/commit/7e55bf1068b2e3cdb3c61df10757b5a815cb713f))
* fix type errors after flowbite update ([#99](https://github.com/ColdPBC/ui/issues/99)) ([fc5c4ee](https://github.com/ColdPBC/ui/commit/fc5c4eed3afa6376b4fb33775af73d63060829f9))

### Features

* Create ActionsDetail Page ([cca244c](https://github.com/ColdPBC/ui/commit/cca244ce1d178f087bf6dfe351409dd95a80fff7))

# [1.40.0](https://github.com/ColdPBC/ui/compare/v1.39.0...v1.40.0) (2023-10-12)

### Bug Fixes

* remove old cookie handling ([c75687d](https://github.com/ColdPBC/ui/commit/c75687d6df1b76f923d1c5270bbf423b05d54d36))

### Features

* added cursor pointer on assignee select ([2289f0c](https://github.com/ColdPBC/ui/commit/2289f0cecc5aaf7930f7ebeab26f85e4f7bafb50))
* allow whole step detail button to open dropdown ([5888954](https://github.com/ColdPBC/ui/commit/588895402e0c5775a8fb1635beaecaac8d0897e1))
* Created stepdetails and assigneeselector component ([a19fb5d](https://github.com/ColdPBC/ui/commit/a19fb5dabdc60cb08f2b407bf993eedbbb03616d))
* Minor tweaks ([56179c0](https://github.com/ColdPBC/ui/commit/56179c04305f4ef730f866961103970fdd39ab23))
* remove restrict width for up down icon ([6ebc098](https://github.com/ColdPBC/ui/commit/6ebc0986c31c7b7fdbc7a226e7bda5844cd399ce))
* Update to step detail work ([3b3ad2d](https://github.com/ColdPBC/ui/commit/3b3ad2d556a73dbc4415687fc9cd8cb502a92bb5))

# [1.39.0](https://github.com/ColdPBC/ui/compare/v1.38.0...v1.39.0) (2023-10-11)

### Bug Fixes

* Add FootprintOverviewDetail interface back ([2b455ec](https://github.com/ColdPBC/ui/commit/2b455ec4a774a21ac4bc332150141aff6010e45f))
* Add FootprintOverviewDetail interface back ([#98](https://github.com/ColdPBC/ui/issues/98)) ([d74a253](https://github.com/ColdPBC/ui/commit/d74a253bd90bc69b57e1c32595564b138c1da5ca))

### Features

* Create subcategory footprint card variant ([bd5c9a4](https://github.com/ColdPBC/ui/commit/bd5c9a4e0397ee48779241be4dcfe427c2644327))
* Create subcategory footprint card variant ([#89](https://github.com/ColdPBC/ui/issues/89)) ([6a7b0da](https://github.com/ColdPBC/ui/commit/6a7b0dababd771d00f58492aca77dd2d57c589d6))
* Removed use of cookie to store accesstoken and cleaned up runtime console errors ([22b8793](https://github.com/ColdPBC/ui/commit/22b87930ba6750ade84d27e7041c0426b543d592))
* updated fom-definitions to components api call ([a9fb52a](https://github.com/ColdPBC/ui/commit/a9fb52a1af89b229c545dccdfb83adf3a1d5f8d1))

# [1.38.0](https://github.com/ColdPBC/ui/compare/v1.37.0...v1.38.0) (2023-10-05)

### Features

* Create page with right column content for Qaalib to bring home … ([#88](https://github.com/ColdPBC/ui/issues/88)) ([56f298d](https://github.com/ColdPBC/ui/commit/56f298d05f70993e79a5e87dfdd5c3aa7aafbece))
* Create page with right column content for Qaalib to bring home page with center ([b534e7b](https://github.com/ColdPBC/ui/commit/b534e7b9ea2815048db58c091c555a616fa4cdf1))

# [1.37.0](https://github.com/ColdPBC/ui/compare/v1.36.0...v1.37.0) (2023-10-05)

### Bug Fixes

* fixed build issue ([94050d4](https://github.com/ColdPBC/ui/commit/94050d46d87c4d49c1a4b10a9aa69aaf66ee9c1b))

### Features

* adjusted width ([6008032](https://github.com/ColdPBC/ui/commit/60080321b32e43bf44628057c221a926d4c150a6))
* Created subcategoryactionsoverviecard component ([5e28591](https://github.com/ColdPBC/ui/commit/5e2859175f8fe41d43f1b7a450b8a84dff54702c))

# [1.36.0](https://github.com/ColdPBC/ui/compare/v1.35.0...v1.36.0) (2023-10-05)

### Bug Fixes

* build fix ([7fe3844](https://github.com/ColdPBC/ui/commit/7fe384480f6a14aebf340a1cd7d5e4f9e3bfcd18))

### Features

* Added button font to theme and update action item code ([4a6d396](https://github.com/ColdPBC/ui/commit/4a6d396fc183bc29511c74b33d69b40afa3ff357))
* added ellipsis ([d7eae3b](https://github.com/ColdPBC/ui/commit/d7eae3bba08650eaaa74fe82f1eaefd3e18e46b3))
* created actionitem component ([a7cc427](https://github.com/ColdPBC/ui/commit/a7cc4278b48ba2eebad90d99f85ef58d41cc3c22))
* Update action types ([728a22f](https://github.com/ColdPBC/ui/commit/728a22fbf738b74153a813cfcb95f57c4eed485f))

# [1.35.0](https://github.com/ColdPBC/ui/compare/v1.34.2...v1.35.0) (2023-10-04)

### Features

* Create SubcategoryActionsList page ([49e65e3](https://github.com/ColdPBC/ui/commit/49e65e31efabb3b3bee33692b9b837fa91c08db1))
* Create SubcategoryActionsList page ([#84](https://github.com/ColdPBC/ui/issues/84)) ([13da2df](https://github.com/ColdPBC/ui/commit/13da2dfebf736b29e2814c43c5c43dbbf1aa6ce4))

## [1.34.2](https://github.com/ColdPBC/ui/compare/v1.34.1...v1.34.2) (2023-10-04)

### Bug Fixes

* Too much space above chart in footprint overview vertical variant ([380be56](https://github.com/ColdPBC/ui/commit/380be564d498be174eb305f61a48d65d2b324e8d))
* Too much space above chart in footprint overview vertical variant ([#83](https://github.com/ColdPBC/ui/issues/83)) ([771cbee](https://github.com/ColdPBC/ui/commit/771cbeebd692ef7589b859fe7de199be5aabd1cd))

## [1.34.1](https://github.com/ColdPBC/ui/compare/v1.34.0...v1.34.1) (2023-10-03)

### Bug Fixes

* Consume new members data structure ([b6acc25](https://github.com/ColdPBC/ui/commit/b6acc25d4c7c763c9f91be168c954fad2c38a8e8))
* Consume new members data structure ([#81](https://github.com/ColdPBC/ui/issues/81)) ([f66695e](https://github.com/ColdPBC/ui/commit/f66695e99fb4d2571d592ce5b275b407e9c59123))

# [1.34.0](https://github.com/ColdPBC/ui/compare/v1.33.0...v1.34.0) (2023-10-03)

### Bug Fixes

* Make trailblazer chip full width in journey details ([1342457](https://github.com/ColdPBC/ui/commit/1342457d40e01ab75555549fd2209d0f98b30b14))

### Features

* Create NewsCard and NewsItem components ([ddf2173](https://github.com/ColdPBC/ui/commit/ddf217378fb50a137fe69fe853f76cfdc84e7784))
* Create NewsCard and NewsItem components ([#79](https://github.com/ColdPBC/ui/issues/79)) ([507f72e](https://github.com/ColdPBC/ui/commit/507f72e81828cb63b54880bd5bad8895daca1be6))

# [1.33.0](https://github.com/ColdPBC/ui/compare/v1.32.0...v1.33.0) (2023-10-03)

### Bug Fixes

* Added submitted to journeymock to support ([28b5886](https://github.com/ColdPBC/ui/commit/28b5886335ace67e22bff70974752039183d5e43))

### Features

* go to last survey question answered ([e1ae0e5](https://github.com/ColdPBC/ui/commit/e1ae0e53bdfce5333dc62920fc17a17a69f705b3))

# [1.32.0](https://github.com/ColdPBC/ui/compare/v1.31.0...v1.32.0) (2023-10-02)

### Features

* removed auth0 invitation params from returnto auth0 app state ([5262d92](https://github.com/ColdPBC/ui/commit/5262d92bc136eadbe683de0269fe8252ea2830ce))

# [1.31.0](https://github.com/ColdPBC/ui/compare/v1.30.2...v1.31.0) (2023-09-29)

### Features

* Remove mutating journey overview swr call if not in the specific survey ([1cf447c](https://github.com/ColdPBC/ui/commit/1cf447ca2ee3eb25112e3db3b28ddc5cadc7a0d1))
* Removed journey_overview dependency ([70041ef](https://github.com/ColdPBC/ui/commit/70041ef7ff4e818b3c7b60334edc485991061a58))

## [1.30.2](https://github.com/ColdPBC/ui/compare/v1.30.1...v1.30.2) (2023-09-29)

### Bug Fixes

* make sure survey is submitted before checking survey completion ([e147399](https://github.com/ColdPBC/ui/commit/e147399ea6b568dd338112ead64047ffd6660f39))
* mutate with current survey data ([4c0b0ab](https://github.com/ColdPBC/ui/commit/4c0b0ab35d847c18a89e6b65d87f52fafd0fa06f))

## [1.30.1](https://github.com/ColdPBC/ui/compare/v1.30.0...v1.30.1) (2023-09-29)

### Bug Fixes

* make survey more responsive ([ee0f096](https://github.com/ColdPBC/ui/commit/ee0f096ca1189a6f6b64a08a9f1a1724bd660d04))

# [1.30.0](https://github.com/ColdPBC/ui/compare/v1.29.1...v1.30.0) (2023-09-29)

### Features

* Added last page ([02e8b9e](https://github.com/ColdPBC/ui/commit/02e8b9e88d5f4df1ed4ebb1c4a8a98a9d7d6a627))

## [1.29.1](https://github.com/ColdPBC/ui/compare/v1.29.0...v1.29.1) (2023-09-28)

### Bug Fixes

* Missing signed policy data ([ae102ad](https://github.com/ColdPBC/ui/commit/ae102ad093ce11cab221b0b32d2d475f6c545ce2))

# [1.29.0](https://github.com/ColdPBC/ui/compare/v1.28.0...v1.29.0) (2023-09-28)

### Features

* add check for initial survey completion ([8bfc2a8](https://github.com/ColdPBC/ui/commit/8bfc2a8355a3393f36100b9f47cb011e670dcb2d))

# [1.28.0](https://github.com/ColdPBC/ui/compare/v1.27.0...v1.28.0) (2023-09-28)

### Features

* skipped submit handling ([b290882](https://github.com/ColdPBC/ui/commit/b2908822ca7721dc453866915ed758b8b48bbb6f))
* Use new survey data as source of truth to ensure correct submission ([d87107c](https://github.com/ColdPBC/ui/commit/d87107cc40e656b90bc9f04d7565b63517cab728))

# [1.27.0](https://github.com/ColdPBC/ui/compare/v1.26.2...v1.27.0) (2023-09-28)

### Features

* adjust height for select components, updated surveyintro style ([ceef0dd](https://github.com/ColdPBC/ui/commit/ceef0dda9dff5e93e08c78582c17bed2a5beaf47))
* updated style for intro paragraph text ([7d27ffb](https://github.com/ColdPBC/ui/commit/7d27ffbe8f56daa3bd124dc27641987da237f408))

## [1.26.2](https://github.com/ColdPBC/ui/compare/v1.26.1...v1.26.2) (2023-09-28)

### Bug Fixes

* handle all footprint null values ([e621d56](https://github.com/ColdPBC/ui/commit/e621d567f2cefc63cc09af993096bd0ce897524d))
* handle all footprint null values ([#68](https://github.com/ColdPBC/ui/issues/68)) ([9990398](https://github.com/ColdPBC/ui/commit/999039801c5d20f4a075e4204f180517bfb796e7))

## [1.26.1](https://github.com/ColdPBC/ui/compare/v1.26.0...v1.26.1) (2023-09-28)

### Bug Fixes

* Fix usage of data on settings page ([2693660](https://github.com/ColdPBC/ui/commit/26936608fd57f656430ce122cb88342ec7623b60))
* Fix usage of data on settings page ([#66](https://github.com/ColdPBC/ui/issues/66)) ([242593b](https://github.com/ColdPBC/ui/commit/242593b7497c91f659abe8b459e08f8987b8ad79))

# [1.26.0](https://github.com/ColdPBC/ui/compare/v1.25.0...v1.26.0) (2023-09-28)

### Features

* Create TemperatureCheckCard ([2bfc5d3](https://github.com/ColdPBC/ui/commit/2bfc5d3edd550e07ed2009e225c5563ea86b1ccf))
* Create TemperatureCheckCard ([#58](https://github.com/ColdPBC/ui/issues/58)) ([6dedba0](https://github.com/ColdPBC/ui/commit/6dedba077c33d5f8bed97bd8e3d8c4e0a762f4bf))

# [1.25.0](https://github.com/ColdPBC/ui/compare/v1.24.0...v1.25.0) (2023-09-27)

### Features

* add query param when redirecting back to application ([1021042](https://github.com/ColdPBC/ui/commit/1021042059d23c28a064d0bb560f70bf661bab5b))

# [1.24.0](https://github.com/ColdPBC/ui/compare/v1.23.0...v1.24.0) (2023-09-27)

### Features

* added todo comment to handle submitted in the future ([d90a511](https://github.com/ColdPBC/ui/commit/d90a5114e734bf2ec56c7ca5adc2275a449c9f26))
* submitted to true in survey definition ([e2ab1e3](https://github.com/ColdPBC/ui/commit/e2ab1e35ffaa65bd133e6d0473394eb345e00ca3))

# [1.23.0](https://github.com/ColdPBC/ui/compare/v1.22.0...v1.23.0) (2023-09-27)

### Bug Fixes

* build failing after merge ([f506fa6](https://github.com/ColdPBC/ui/commit/f506fa6a2daab698ed2f8663ef8cfb6c2a22eb68))

### Features

* button change ([a30a29e](https://github.com/ColdPBC/ui/commit/a30a29e37a2a3221e86628be67feeeb1cfcff7e0))
* sign tos and privacy individually, added more stories ([22f0b26](https://github.com/ColdPBC/ui/commit/22f0b26a1239be4672e8ad3f11d97d646658021b))
* signup form handling ([4bed6dc](https://github.com/ColdPBC/ui/commit/4bed6dcbe01e86f56bd70399a2ea7bb5eac0c348))
* updated button children code ([193ef4b](https://github.com/ColdPBC/ui/commit/193ef4b0ff5255c834ae7df688caef1968ce2030))

# [1.22.0](https://github.com/ColdPBC/ui/compare/v1.21.0...v1.22.0) (2023-09-27)

### Bug Fixes

* Corrected unintended top offset styling ([0f26f17](https://github.com/ColdPBC/ui/commit/0f26f1769b1bd134484bb61751cac4e15678f77e))

### Features

* Added support to only show the animation after moving from previous section to the next ([a14d342](https://github.com/ColdPBC/ui/commit/a14d3425de3615b8e0ee856565c871b46cf01949))

# [1.21.0](https://github.com/ColdPBC/ui/compare/v1.20.0...v1.21.0) (2023-09-27)

### Features

* Build UserSettings component ([a8aa99a](https://github.com/ColdPBC/ui/commit/a8aa99ae799e82aa9948b40478d83b10752f5c08))

# [1.20.0](https://github.com/ColdPBC/ui/compare/v1.19.0...v1.20.0) (2023-09-27)

### Features

* remove ability to close survey during journey_overview survey ([dcfa3b3](https://github.com/ColdPBC/ui/commit/dcfa3b30085b62e51b2eca683879a9feccca441b))
* Updated dismiss button label to capitalized ([42e41cf](https://github.com/ColdPBC/ui/commit/42e41cf8f82a93f15e7d9dc72644875b30478413))

# [1.19.0](https://github.com/ColdPBC/ui/compare/v1.18.0...v1.19.0) (2023-09-27)

### Features

* added actions flag to footprintdetail and subcatjourneyprev ([2762da9](https://github.com/ColdPBC/ui/commit/2762da90d630bd63fad6c72370da5b56e3b84c71))
* Added showactions261 flag ([dbb9955](https://github.com/ColdPBC/ui/commit/dbb99559bf0cae6315eb694cd912f4dda3ed0453))

# [1.18.0](https://github.com/ColdPBC/ui/compare/v1.17.2...v1.18.0) (2023-09-27)

### Bug Fixes

* Fix gradient on climate journey chart ([e60b379](https://github.com/ColdPBC/ui/commit/e60b37938d2a0076cf9b14fad1ec01a9d03c0d03))
* Fix gradient on climate journey chart ([#40](https://github.com/ColdPBC/ui/issues/40)) ([3b89374](https://github.com/ColdPBC/ui/commit/3b893743e7125b5613ceb13205ee19699002b9ca))
* remove useCreateGradient imports ([2804ed2](https://github.com/ColdPBC/ui/commit/2804ed280468ba35da4adbc042dab3267f05371a))
* remove useCreateGradient imports ([#56](https://github.com/ColdPBC/ui/issues/56)) ([a73a276](https://github.com/ColdPBC/ui/commit/a73a2762cecc1e1637063124ed7f8992cdb1c210))

### Features

* Highlight sidebar item when users navigate ([c41f530](https://github.com/ColdPBC/ui/commit/c41f5306c9773f7e0efef729f450b0ed1a67fe34))

## [1.17.2](https://github.com/ColdPBC/ui/compare/v1.17.1...v1.17.2) (2023-09-26)

### Bug Fixes

* Don't show footprint detail card if the footprint data is null ([ebed3e8](https://github.com/ColdPBC/ui/commit/ebed3e83ad1d891b7dbbd081348f5d8d150af3b3))
* Don't show footprint detail card if the footprint data is null ([#39](https://github.com/ColdPBC/ui/issues/39)) ([56bf6bb](https://github.com/ColdPBC/ui/commit/56bf6bbffd9da720b5e55ca5cdb9ba9afafbc72f))

## [1.17.1](https://github.com/ColdPBC/ui/compare/v1.17.0...v1.17.1) (2023-09-26)

### Bug Fixes

* merge api and auth0 user upon signup, do not load until coldpbc cookie is defined ([64d9363](https://github.com/ColdPBC/ui/commit/64d93636b190f537dc7a63c5f55bb4070b512fd2))

# [1.17.0](https://github.com/ColdPBC/ui/compare/v1.16.0...v1.17.0) (2023-09-25)

### Features

* remove query params on survey close ([0aa804a](https://github.com/ColdPBC/ui/commit/0aa804a0276f9cd5b8273409ffb5f3c6219d7131))
* removed the query params after submitting survey ([a333a96](https://github.com/ColdPBC/ui/commit/a333a960b74b3fb9c3645e31298ab2ff22cc98b6))

# [1.16.0](https://github.com/ColdPBC/ui/compare/v1.15.0...v1.16.0) (2023-09-23)

### Bug Fixes

* redirect to / if last route was logout ([4fffc4d](https://github.com/ColdPBC/ui/commit/4fffc4dab26626fb9f701743ad16b3cae8eaa7da))
* revert axios fetcher to return an error ([822d1fd](https://github.com/ColdPBC/ui/commit/822d1fdf1e7073f40500248cc508faced8abaa53))
* syncing cookie issue, update routing logic, fix signup issue with user data not being updated ([04c6dec](https://github.com/ColdPBC/ui/commit/04c6decd1c8b9272c9ed84b5ae20c8113aa83e84))

### Features

* more updates ([55b3cbe](https://github.com/ColdPBC/ui/commit/55b3cbe407b5ec9e78feeacd0f1010296b807187))
* signup page and authentication routes ([914d389](https://github.com/ColdPBC/ui/commit/914d3893861bab1f9b8dd413cc486b0b00bd3a01))
* signup, login and logout routes ([fa6e6f2](https://github.com/ColdPBC/ui/commit/fa6e6f2ab7eb0abde0ed93a5d210d08129c9feb1))

# [1.15.0](https://github.com/ColdPBC/ui/compare/v1.14.0...v1.15.0) (2023-09-20)

### Features

* Add journey route and page ([bc05774](https://github.com/ColdPBC/ui/commit/bc05774c8f20c10fb8061b48ac211d60e85a5f34))
* Add journey route and page ([#37](https://github.com/ColdPBC/ui/issues/37)) ([c791bec](https://github.com/ColdPBC/ui/commit/c791bec21a3395ff1e296dc6515ace58d5e95318))

# [1.14.0](https://github.com/ColdPBC/ui/compare/v1.13.0...v1.14.0) (2023-09-20)

### Bug Fixes

* Fix navigating to empty category section, fixed sorting ([c310477](https://github.com/ColdPBC/ui/commit/c310477586bc01f0340e16aa35da9e3808daa138))

### Features

* addd select all that apply message to multi select ([2729732](https://github.com/ColdPBC/ui/commit/2729732acd9b36522a9a4268ce2385fa2a9abf8c))
* created Survey file and surveyName query param ([dd88453](https://github.com/ColdPBC/ui/commit/dd884534c4b5d7e7ab8d8884591bcc3f0b8353b3))
* Transition for sections ([6163911](https://github.com/ColdPBC/ui/commit/61639114bc266874c703b0d0b3d28c59b830bcde))
* Update to survey code to use smaller image, go to first follow up if the category has no prompt and updated styles ([e07fa18](https://github.com/ColdPBC/ui/commit/e07fa1825c55ba5b238787dd7365097f1ec822de))
* Updated patch to put method and added transition to background images ([fb517d2](https://github.com/ColdPBC/ui/commit/fb517d2d3fda4e03faf9f5011512cc159fb3ae54))

# [1.13.0](https://github.com/ColdPBC/ui/compare/v1.12.0...v1.13.0) (2023-09-19)

### Features

* Add GuidanceButton ([36f9bd4](https://github.com/ColdPBC/ui/commit/36f9bd4a0a6bad420d8a7c2ec8422838b1ca80f9))
* Add GuidanceButton ([#33](https://github.com/ColdPBC/ui/issues/33)) ([01f3748](https://github.com/ColdPBC/ui/commit/01f374852fc7ad510c7afdb7e6fbde681f7506b8))

# [1.12.0](https://github.com/ColdPBC/ui/compare/v1.11.0...v1.12.0) (2023-09-19)

### Features

* Add footprint page and route ([cdc71c1](https://github.com/ColdPBC/ui/commit/cdc71c1da4ab23a3f707b8cfc74f853cce1bf384))
* Add footprint page and route ([#31](https://github.com/ColdPBC/ui/issues/31)) ([cea1ad5](https://github.com/ColdPBC/ui/commit/cea1ad5ae6cd032d9b0654b2b227fbb1a5765c0e))

# [1.11.0](https://github.com/ColdPBC/ui/compare/v1.10.0...v1.11.0) (2023-09-18)

### Bug Fixes

* build fix ([ad77c66](https://github.com/ColdPBC/ui/commit/ad77c6661009e6a4b1fdce755c715854af179b00))
* corrected build error ([5121eec](https://github.com/ColdPBC/ui/commit/5121eec023ad34bffebc58e95b62fab785f1ea8a))
* remove empty user type file ([1b6853f](https://github.com/ColdPBC/ui/commit/1b6853f0f63df89d7173820be2c862e8fa0b1570))

### Features

* created signup form component ([3277c0d](https://github.com/ColdPBC/ui/commit/3277c0d4510590ee8cbd88a9c48cf4ef0491c414))
* Update tos and privacy text ([13873b8](https://github.com/ColdPBC/ui/commit/13873b8772217c842ddbb12af638f6390c5daadd))
* Updated takeover component ([168c074](https://github.com/ColdPBC/ui/commit/168c0746489ee37a11ee00ed1bc3b8f5ef9be54a))
* Updated takeover to better handle logo or title ([aa7cd4d](https://github.com/ColdPBC/ui/commit/aa7cd4d41acc2d12183c34fea89de0679336bce4))

# [1.10.0](https://github.com/ColdPBC/ui/compare/v1.9.1...v1.10.0) (2023-09-16)

### Bug Fixes

* build fix ([cfd5b47](https://github.com/ColdPBC/ui/commit/cfd5b4704f0c41590b6a36bcde897aaecf36190b))
* refactored for survey data changes ([b759b24](https://github.com/ColdPBC/ui/commit/b759b2451ae0dc81e2ed50ba6821d856895961ba))

### Features

* added storybook scripts and moved component to molecules folder ([d9c34a1](https://github.com/ColdPBC/ui/commit/d9c34a12dceeb9945e52f186a0b0c3c6c67fcda5))
* better skip handling , added form-data endpoint ([ab9bc47](https://github.com/ColdPBC/ui/commit/ab9bc4768baed3e2194e4368eb89f29b7e341800))
* Support survey form data endpoint change ([917cd9e](https://github.com/ColdPBC/ui/commit/917cd9e764cc135db5dc22a63f31296db50c4b01))

## [1.9.1](https://github.com/ColdPBC/ui/compare/v1.9.0...v1.9.1) (2023-09-15)

### Bug Fixes

* update rum injection ([46829fe](https://github.com/ColdPBC/ui/commit/46829fea3550469dbcde89ba2c6496d74e40dc70))

# [1.9.0](https://github.com/ColdPBC/ui/compare/v1.8.0...v1.9.0) (2023-09-15)

### Bug Fixes

* correct section progress dependents ([29434f5](https://github.com/ColdPBC/ui/commit/29434f5fc23e5171152a72c4de907360b5b6e06f))

### Features

* removed ability to go to section after clicking ([9cdbbfa](https://github.com/ColdPBC/ui/commit/9cdbbfa40283d425a7e5f2e62ce0771b12b5ba8f))

# [1.8.0](https://github.com/ColdPBC/ui/compare/v1.7.0...v1.8.0) (2023-09-14)

### Features

* Survey Right Nav component ([cfd24db](https://github.com/ColdPBC/ui/commit/cfd24db8bbb4984ff5d626f8ca902731c2edc70c))

# [1.7.0](https://github.com/ColdPBC/ui/compare/v1.6.0...v1.7.0) (2023-09-14)

### Features

* Add footprint details chart + card ([672d1f8](https://github.com/ColdPBC/ui/commit/672d1f8b2f96bde90d3c5a94133c5a1b9c059de6))

# [1.7.0-cold-205-create-footprintdetailcard-component.1](https://github.com/ColdPBC/ui/compare/v1.6.0...v1.7.0-cold-205-create-footprintdetailcard-component.1) (2023-09-13)

### Features

* Add footprint details chart + card ([672d1f8](https://github.com/ColdPBC/ui/commit/672d1f8b2f96bde90d3c5a94133c5a1b9c059de6))

# [1.6.0](https://github.com/ColdPBC/ui/compare/v1.5.0...v1.6.0) (2023-09-13)

### Bug Fixes

* kickoff chromatic deploy ([bbd3dd9](https://github.com/ColdPBC/ui/commit/bbd3dd94e431114dcfb6e0bb23587b3abb3bcf0d))
* removed unnecessary code ([f2ff907](https://github.com/ColdPBC/ui/commit/f2ff907936898d79ac617f2b97b752562d364aa7))
* to kickoff chromatic build ([aaca346](https://github.com/ColdPBC/ui/commit/aaca3462cfa5471f3f0ef961bb228469ff6583fa))

### Features

* created surveyintro component ([e02e7ee](https://github.com/ColdPBC/ui/commit/e02e7eeabac41a32282248a1e8b26004edc798f0))
* update to better match font ([25e4951](https://github.com/ColdPBC/ui/commit/25e4951897de1e55d3878156b958fdfcfbae17a4))
* update to use surveyDataMock file ([d5d0636](https://github.com/ColdPBC/ui/commit/d5d063651b03efce2499e1a9b8d5501d8b0cdfd8))

# [1.6.0-COLD-129.5](https://github.com/ColdPBC/ui/compare/v1.6.0-COLD-129.4...v1.6.0-COLD-129.5) (2023-09-13)

### Bug Fixes

* kickoff chromatic deploy ([bbd3dd9](https://github.com/ColdPBC/ui/commit/bbd3dd94e431114dcfb6e0bb23587b3abb3bcf0d))

# [1.6.0-COLD-129.4](https://github.com/ColdPBC/ui/compare/v1.6.0-COLD-129.3...v1.6.0-COLD-129.4) (2023-09-12)

### Bug Fixes

* to kickoff chromatic build ([aaca346](https://github.com/ColdPBC/ui/commit/aaca3462cfa5471f3f0ef961bb228469ff6583fa))

# [1.6.0-COLD-129.3](https://github.com/ColdPBC/ui/compare/v1.6.0-COLD-129.2...v1.6.0-COLD-129.3) (2023-09-12)

### Bug Fixes

* removed unnecessary code ([f2ff907](https://github.com/ColdPBC/ui/commit/f2ff907936898d79ac617f2b97b752562d364aa7))

# [1.6.0-COLD-129.2](https://github.com/ColdPBC/ui/compare/v1.6.0-COLD-129.1...v1.6.0-COLD-129.2) (2023-09-12)

### Features

* update to better match font ([25e4951](https://github.com/ColdPBC/ui/commit/25e4951897de1e55d3878156b958fdfcfbae17a4))

# [1.6.0-COLD-129.1](https://github.com/ColdPBC/ui/compare/v1.5.0...v1.6.0-COLD-129.1) (2023-09-12)

### Features

* created surveyintro component ([e02e7ee](https://github.com/ColdPBC/ui/commit/e02e7eeabac41a32282248a1e8b26004edc798f0))
* update to use surveyDataMock file ([d5d0636](https://github.com/ColdPBC/ui/commit/d5d063651b03efce2499e1a9b8d5501d8b0cdfd8))

# [1.5.0](https://github.com/ColdPBC/ui/compare/v1.4.1...v1.5.0) (2023-09-12)

### Bug Fixes

* some bugs fixed ([cd5a657](https://github.com/ColdPBC/ui/commit/cd5a657a8a56a40b47b6a0d1a54ff46c8145c4f4))

### Features

* Updated survey components to use new survey data structure ([87d92be](https://github.com/ColdPBC/ui/commit/87d92be7874bbe1ef9a9a632bd299b409922b75b))
* updated SurveyLeftNav ([9c4273b](https://github.com/ColdPBC/ui/commit/9c4273bfaad61e448fffaad5547a5e766e357422))

# [1.5.0-cold-226-update-retool-to-key-the-categories-and-the-questions-in-the.1](https://github.com/ColdPBC/ui/compare/v1.4.1...v1.5.0-cold-226-update-retool-to-key-the-categories-and-the-questions-in-the.1) (2023-09-12)

### Bug Fixes

* some bugs fixed ([cd5a657](https://github.com/ColdPBC/ui/commit/cd5a657a8a56a40b47b6a0d1a54ff46c8145c4f4))

### Features

* Updated survey components to use new survey data structure ([87d92be](https://github.com/ColdPBC/ui/commit/87d92be7874bbe1ef9a9a632bd299b409922b75b))
* updated SurveyLeftNav ([9c4273b](https://github.com/ColdPBC/ui/commit/9c4273bfaad61e448fffaad5547a5e766e357422))

## [1.4.1](https://github.com/ColdPBC/ui/compare/v1.4.0...v1.4.1) (2023-09-12)

### Bug Fixes

* ts-ignore not being honored ([2867465](https://github.com/ColdPBC/ui/commit/2867465febb59864eccc32eebd56cf77dca5f7f4))

# [1.4.0](https://github.com/ColdPBC/ui/compare/v1.3.1...v1.4.0) (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a](https://github.com/ColdPBC/ui/commit/db3114ae77325ecff867c2bfe5148b7500d7d42a))
* Add empty state for Journey Chart and Card ([#21](https://github.com/ColdPBC/ui/issues/21)) ([7ee0aa7](https://github.com/ColdPBC/ui/commit/7ee0aa72c1e71755ee4fb0ec266b0a0771e03345))

# [1.4.0-cold-117-create-journeyoverviewcard.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.3.1...v1.4.0-cold-117-create-journeyoverviewcard.1) (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a](https://github.com/ColdPBC/Cold-MonoRepo/commit/db3114ae77325ecff867c2bfe5148b7500d7d42a))

# [1.4.0-cold-117-create-journeyoverviewcard.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.3.1...v1.4.0-cold-117-create-journeyoverviewcard.1) (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([db3114a](https://github.com/ColdPBC/Cold-MonoRepo/commit/db3114ae77325ecff867c2bfe5148b7500d7d42a))

# [1.4.0-cold-117-create-journeyoverviewcard.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.3.0...v1.4.0-cold-117-create-journeyoverviewcard.1) (2023-09-11)

### Features

* Add empty state for Journey Chart and Card ([2f26da2](https://github.com/ColdPBC/Cold-MonoRepo/commit/2f26da2feaafb5f721bddffc92d86a1b427907bb))

# [1.3.0](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.2.0...v1.3.0) (2023-09-11)

### Features

* COLD-193, COLD-116 ([ba0a14a](https://github.com/ColdPBC/Cold-MonoRepo/commit/ba0a14ad9b0d42a35b1f3c57dd8cb69245861842))

# [1.3.0-cold-116-create-footprintoverviewcard.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.2.0...v1.3.0-cold-116-create-footprintoverviewcard.1) (2023-09-11)

### Features

* COLD-193, COLD-116 ([ba0a14a](https://github.com/ColdPBC/Cold-MonoRepo/commit/ba0a14ad9b0d42a35b1f3c57dd8cb69245861842))

# [1.2.0-cold-116-create-footprintoverviewcard.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.1.0...v1.2.0-cold-116-create-footprintoverviewcard.1) (2023-09-08)

### Features

* COLD-193, COLD-116 ([ba0a14a](https://github.com/ColdPBC/Cold-MonoRepo/commit/ba0a14ad9b0d42a35b1f3c57dd8cb69245861842))

# [1.1.0](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.0.1...v1.1.0) (2023-09-07)

### Bug Fixes

* Added back addons for the cookie, auth0 and launchadarkly ([b10b951](https://github.com/ColdPBC/Cold-MonoRepo/commit/b10b95123533b968ceab4805a2d9e68663a937ac))
* build fix ([47b483d](https://github.com/ColdPBC/Cold-MonoRepo/commit/47b483d90ca6d9f75a9765e9cc8027b0925ea95a))
* fix build ([1ca2e6b](https://github.com/ColdPBC/Cold-MonoRepo/commit/1ca2e6b32cfe4b089b6895889b0d9103fcbe18e8))
* resolve lottie react ([0332a3a](https://github.com/ColdPBC/Cold-MonoRepo/commit/0332a3a8c1bd3400ec4814747233cf9c56898cd4))
* Set lottie svg width and height ([026dd6f](https://github.com/ColdPBC/Cold-MonoRepo/commit/026dd6f499b471765f342f520ba698cd61450202))
* update to application to trigger chromatic build ([c8e7005](https://github.com/ColdPBC/Cold-MonoRepo/commit/c8e70055f071f0faadd8ce88131aebfb2f559de2))

### Features

* survey question container component ([78384af](https://github.com/ColdPBC/Cold-MonoRepo/commit/78384af49f1ec7cbb9345786baca7dc221b37565))
* update to chromatic deploy ([3610579](https://github.com/ColdPBC/Cold-MonoRepo/commit/3610579af752511f8a7a2c1997fc7cba060550fd))

# [1.1.0-COLD-230-1.2](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.1.0-COLD-230-1.1...v1.1.0-COLD-230-1.2) (2023-09-07)

### Bug Fixes

* Added back addons for the cookie, auth0 and launchadarkly ([b10b951](https://github.com/ColdPBC/Cold-MonoRepo/commit/b10b95123533b968ceab4805a2d9e68663a937ac))

# [1.1.0-COLD-230-1.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.0.1...v1.1.0-COLD-230-1.1) (2023-09-07)

### Bug Fixes

* build fix ([47b483d](https://github.com/ColdPBC/Cold-MonoRepo/commit/47b483d90ca6d9f75a9765e9cc8027b0925ea95a))
* fix build ([1ca2e6b](https://github.com/ColdPBC/Cold-MonoRepo/commit/1ca2e6b32cfe4b089b6895889b0d9103fcbe18e8))
* resolve lottie react ([0332a3a](https://github.com/ColdPBC/Cold-MonoRepo/commit/0332a3a8c1bd3400ec4814747233cf9c56898cd4))
* update to application to trigger chromatic build ([c8e7005](https://github.com/ColdPBC/Cold-MonoRepo/commit/c8e70055f071f0faadd8ce88131aebfb2f559de2))

### Features

* survey question container component ([78384af](https://github.com/ColdPBC/Cold-MonoRepo/commit/78384af49f1ec7cbb9345786baca7dc221b37565))
* update to chromatic deploy ([3610579](https://github.com/ColdPBC/Cold-MonoRepo/commit/3610579af752511f8a7a2c1997fc7cba060550fd))

# [1.1.0-COLD-230.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.0.1...v1.1.0-COLD-230.1) (2023-09-07)

### Bug Fixes

* fix build ([1ca2e6b](https://github.com/ColdPBC/Cold-MonoRepo/commit/1ca2e6b32cfe4b089b6895889b0d9103fcbe18e8))
* resolve lottie react ([0332a3a](https://github.com/ColdPBC/Cold-MonoRepo/commit/0332a3a8c1bd3400ec4814747233cf9c56898cd4))

### Features

* survey question container component ([78384af](https://github.com/ColdPBC/Cold-MonoRepo/commit/78384af49f1ec7cbb9345786baca7dc221b37565))

## [1.0.1](https://github.com/ColdPBC/Cold-MonoRepo/compare/v1.0.0...v1.0.1) (2023-09-07)

### Bug Fixes

* add mockServiceWorker.js ([4ab5b50](https://github.com/ColdPBC/Cold-MonoRepo/commit/4ab5b50ca009490368100b02156dce3d7b71f4a9))
* issues causing invalid URI error ([5b7e457](https://github.com/ColdPBC/Cold-MonoRepo/commit/5b7e45720f39b59668f0ba1ab8f9fe74e81c34d5))
* storybook issues ([d9a59ba](https://github.com/ColdPBC/Cold-MonoRepo/commit/d9a59ba229c1b662376d676104d1f24e8eddd495))

# 1.0.0 (2023-09-06)

### Bug Fixes

* add barrel files to gitignore ([fc850b3](https://github.com/ColdPBC/Cold-MonoRepo/commit/fc850b323d741ae87eb5c15bd7f4d222a0b813c7))
* add config settings to repo ([88db67f](https://github.com/ColdPBC/Cold-MonoRepo/commit/88db67f7d0d2f10c729eacb89428598b31f2837c))
* got the damned thing to build ([2102376](https://github.com/ColdPBC/Cold-MonoRepo/commit/21023762a68346bc40e31555230b7f7846cd2cea))
* got the styles working ([d12aa21](https://github.com/ColdPBC/Cold-MonoRepo/commit/d12aa2198c7fe46eeb678cdfba37f280bb501e0a))
* initial commit ([bda4174](https://github.com/ColdPBC/Cold-MonoRepo/commit/bda4174989329c4ef39c7c24c3f16951287b86a9))
