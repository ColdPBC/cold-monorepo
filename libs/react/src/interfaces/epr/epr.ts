
export interface EprSubmissionGraphQL {
  id: string;
  state: string;
  billIdentifier: string;
  dueDate: string | null;
  status: string;
  submittedAt: string | null;
  metadata: {
    pro_name: string | undefined;
  } | null;
}
