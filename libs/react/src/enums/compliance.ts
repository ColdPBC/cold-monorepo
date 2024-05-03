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
  upload = 'upload',
  startedAi = 'startedAI',
  completedQuestions = 'completedQuestions',
  submitted = 'submitted',
}

export enum ComplianceProgressStatus {
  not_started = 'not_started',
  needs_review = 'needs_review',
  bookmarked = 'bookmarked',
  complete = 'complete',
}
