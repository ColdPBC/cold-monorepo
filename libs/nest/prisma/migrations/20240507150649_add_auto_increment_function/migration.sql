-- AlterTable
CREATE SEQUENCE compliance_responses_id_seq;
ALTER TABLE "compliance_responses" ALTER COLUMN "id" SET DEFAULT nextval('compliance_responses_id_seq');
ALTER SEQUENCE compliance_responses_id_seq OWNED BY "compliance_responses"."id";
