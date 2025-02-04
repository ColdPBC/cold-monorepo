
export enum ProcessingStatus {
  IMPORT_COMPLETE = 'IMPORT_COMPLETE',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  AI_PROCESSING = 'AI_PROCESSING',
}

export const UIProcessingStatusMapping: Record<ProcessingStatus, string> = {
  [ProcessingStatus.IMPORT_COMPLETE]: 'Import Complete',
  [ProcessingStatus.PROCESSING_ERROR]: 'Error Processing',
  [ProcessingStatus.MANUAL_REVIEW]: 'Sent To Support Team',
  [ProcessingStatus.AI_PROCESSING]: 'Cold AI Processing',
};

export type UIProcessingStatus = typeof UIProcessingStatusMapping[keyof typeof UIProcessingStatusMapping];
