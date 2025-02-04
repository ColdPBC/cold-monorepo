-- Iterate over each material
DO $$
    DECLARE
        material RECORD;
        tag_id INT;
        tagValue TEXT;
        category_tags TEXT[];
        sub_category_tags TEXT[];
        tags TEXT[];
    BEGIN
        FOR material IN SELECT id, organization_id, material_category, material_subcategory FROM materials LOOP
                -- Split material_category and material_subcategory into distinct tags
                IF material.material_category IS NOT NULL THEN
                    IF position(' | ' IN material.material_category) > 0 THEN
                        category_tags := string_to_array(material.material_category, ' | ');
                    END IF;
                    IF position('/' IN material.material_category) > 0 THEN
                        category_tags := string_to_array(material.material_category, '/');
                    END IF;
                END IF;

                IF material.material_subcategory IS NOT NULL THEN
                    IF position(' | ' IN material.material_subcategory) > 0 THEN
                        sub_category_tags := string_to_array(material.material_subcategory, ' | ');
                    END IF;
                    IF position('/' IN material.material_subcategory) > 0 THEN
                        sub_category_tags := string_to_array(material.material_subcategory, '/');
                    END IF;
                END IF;

                -- Join the two arrays
                IF category_tags IS NOT NULL AND sub_category_tags IS NOT NULL THEN
                    tags := category_tags || sub_category_tags;
                ELSIF category_tags IS NOT NULL THEN
                    tags := category_tags;
                ELSIF sub_category_tags IS NOT NULL THEN
                    tags := sub_category_tags;
                END IF;

                -- Iterate over each tag
                FOREACH tagValue IN ARRAY tags LOOP
                        -- Insert a row into the material_tags table
                        INSERT INTO material_tags (organization_id, tag, created_at, updated_at)
                        VALUES (material.organization_id, initcap(tagValue), now(), now())
                        ON CONFLICT (organization_id, tag) DO NOTHING
                        RETURNING id INTO tag_id;

                        IF tag_id IS NOT NULL THEN
                            -- Insert a row into the material_tag_assignments table
                            INSERT INTO material_tag_assignments (material_id, tag_id, organization_id, created_at, updated_at)
                            VALUES (material.id, tag_id, material.organization_id, now(), now());
                        END IF;
                    END LOOP;
            END LOOP;
    END $$;
