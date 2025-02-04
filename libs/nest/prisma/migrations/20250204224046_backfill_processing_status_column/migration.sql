-- Backfill the `processing_state` column based on existing AI processing statuses
-- This script accounts for all statuses currently in staging and production, but conservatively
-- does not apply a default status if the combined status is something unexpected.
WITH combined_status AS (
  SELECT
    id,
    COALESCE(openai_vector_file_status, JSONB_EXTRACT_PATH_TEXT(metadata, 'status')) as status
  FROM organization_files
)
UPDATE organization_files
SET processing_status =
      CASE
        WHEN combined_status.status IS NULL
          OR combined_status.status = 'failed' THEN 'PROCESSING_ERROR'::processing_status
        WHEN combined_status.status IN ('completed', 'uploaded', 'ai_extracted', 'ai_classified')
          THEN 'IMPORT_COMPLETE'::processing_status
        END
  FROM combined_status
WHERE organization_files.id = combined_status.id;
