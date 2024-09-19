-- Step 1: Update existing records to replace TEST_RESULTS with TEST_REPORT
UPDATE organization_files SET type = 'TEST_REPORT' WHERE type = 'TEST_RESULTS';

-- Step 2: Drop TEST_RESULTS from file_types
DO $$
    BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'file_types') THEN
            ALTER TABLE organization_files ALTER COLUMN type DROP DEFAULT;
            ALTER TYPE file_types RENAME TO file_types_old;
            CREATE TYPE file_types AS ENUM (
                'CERTIFICATE',
                'TEST_REPORT',
                'STATEMENT',
                'ASSESSMENT',
                'PURCHASE_ORDER',
                'BILL_OF_MATERIALS',
                'POLICY',
                'OTHER'
                );
            ALTER TABLE organization_files ALTER COLUMN type TYPE file_types USING type::text::file_types;
            ALTER TABLE organization_files ALTER COLUMN type SET DEFAULT 'OTHER';
            DROP TYPE file_types_old;
        END IF;
    END $$;
