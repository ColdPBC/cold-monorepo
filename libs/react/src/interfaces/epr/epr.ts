
export interface EprSubmissionGraphQL {
  id: string;
  state: string;
  billIdentifier: string;
  proName: string;
  dueDate: string | null;
  status: string;
  submittedAt: string | null;
}
