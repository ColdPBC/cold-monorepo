import {epr_submissions, Prisma} from "@prisma/client";

export class CreateEprSubmissionDto implements Partial<epr_submissions> {
  status: string;
  state: string;
  bill_identifier: string;
  due_date?: Date;
  submitted_at?: Date;
  metadata?: Prisma.JsonObject;
}
