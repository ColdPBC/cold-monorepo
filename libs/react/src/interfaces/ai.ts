

export interface AIPromptResponse {
  answer?: string;
  justification?: string;
  source?: string[];
  references: {
    text: string,
    file: string,
  }[];
}

export interface QueueItem {
  type: 'AI' | 'User';
  content: string
}
