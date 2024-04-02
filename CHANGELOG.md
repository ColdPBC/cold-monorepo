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
