export enum ComplianceStatus {
	inActive = 'inActive',
	inProgress = 'inProgress',
	submissionInProgress = 'submissionInProgress',
	submittedByCold = 'submittedByCold',
}

export enum CompliancePageFilter {
	all = 'All Records',
	upcoming = 'Upcoming',
	passed = 'Passed',
	active = 'Active',
	notActive = 'Not Active',
}

export enum ComplianceManagerStatus {
	notActivated = 'notActivated',
	activated = 'activated',
	uploadedDocuments = 'uploadedDocuments',
	startedAi = 'startedAI',
	completedAi = 'completedAI',
	startedQuestions = 'startedQuestions',
	completedQuestions = 'completedQuestions',
	submitted = 'submitted',
}

export enum ComplianceManagerFlowGuideStatus {
	activate = 'activate',
	upload = 'upload',
	startAI = 'startAI',
	startedAI = 'startedAI',
	restartAI = 'restartAI',
	submitted = 'submitted',
}

export enum ComplianceProgressStatus {
	not_started = 'not_started',
	ai_answered = 'ai_answered',
	bookmarked = 'bookmarked',
	user_answered = 'user_answered',
}

export enum ComplianceOverviewModalStep {
	activation = 'activation',
	upload = 'upload',
	startAI = 'startAI',
}

export enum ComplianceComponentType {
	text = 'text',
	textarea = 'textarea',
	yes_no = 'yes_no',
	number = 'number',
	currency = 'currency',
	percent_slider = 'percent_slider',
	select = 'select',
	multi_select = 'multi_select',
	multi_text = 'multi_text',
}
