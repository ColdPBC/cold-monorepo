
export interface EprSubmissionGraphQL {
  id: string;
  state: string;
  bill_identifier: string;
  pro_name: string;
  due_date: string | null;
  status: string;
  submission_date: string | null;
}
