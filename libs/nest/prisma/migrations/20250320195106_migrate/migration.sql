-- This migration is to migrate activity classifications from 1:many to 1:1 with activities.

-- remove the old classification system
delete from ecoinvent_classifications where system = 'EcoSpold01Categories';

-- Backfill the classification id for activities
UPDATE ecoinvent_activities AS ea
SET ecoinvent_classification_id = eac.ecoinvent_classification_id
FROM ecoinvent_activity_classifications AS eac
WHERE ea.id = eac.ecoinvent_activity_id;
