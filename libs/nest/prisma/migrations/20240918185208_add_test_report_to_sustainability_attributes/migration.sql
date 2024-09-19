DO $$
    BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'file_types') THEN
            ALTER TYPE file_types ADD VALUE 'TEST_REPORT';
        END IF;
    END $$;

