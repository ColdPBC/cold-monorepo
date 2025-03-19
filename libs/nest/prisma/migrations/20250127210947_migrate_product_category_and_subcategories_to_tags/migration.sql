-- Iterate over each material
DO $$
    DECLARE
        product RECORD;
        tag_id INT;
        tagValue TEXT;
        category_tags TEXT[];
        sub_category_tags TEXT[];
        tags TEXT[];
    BEGIN
        FOR product IN SELECT id, organization_id, product_category, product_subcategory FROM products LOOP
                -- Split material_category and material_subcategory into distinct tags
                IF product.product_category IS NOT NULL THEN
                    IF position(' | ' IN product.product_category) > 0 THEN
                        category_tags := string_to_array(product.product_category, ' | ');
                    END IF;
                    IF position('/' IN product.product_category) > 0 THEN
                        category_tags := string_to_array(product.product_category, '/');
                    END IF;
                END IF;

                IF product.product_subcategory IS NOT NULL THEN
                    IF position(' | ' IN product.product_subcategory) > 0 THEN
                        sub_category_tags := string_to_array(product.product_subcategory, ' | ');
                    END IF;
                    IF position('/' IN product.product_subcategory) > 0 THEN
                        sub_category_tags := string_to_array(product.product_subcategory, '/');
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

                IF tags IS NOT NULL THEN
                -- Iterate over each tag
                    FOREACH tagValue IN ARRAY tags LOOP
                            -- Insert a row into the material_tags table
                            INSERT INTO products_tags (organization_id, tag, created_at, updated_at)
                            VALUES (product.organization_id, initcap(tagValue), now(), now())
                            ON CONFLICT (organization_id, tag) DO NOTHING
                            RETURNING id INTO tag_id;

                            IF tag_id IS NOT NULL THEN
                                -- Insert a row into the material_tag_assignments table
                                INSERT INTO product_tag_assignments (product_id, tag_id, organization_id, created_at, updated_at)
                                VALUES (product.id, tag_id, product.organization_id, now(), now());
                            END IF;
                        END LOOP;
                END IF;
            END LOOP;
    END $$;-- This is an empty migration.
