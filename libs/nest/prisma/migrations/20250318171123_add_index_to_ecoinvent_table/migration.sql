-- CreateIndex
CREATE INDEX "ecoinvent_activity_impact_method_name_idx1" ON "ecoinvent_activity_impacts"("ecoinvent_activity_id", "impact_method_name");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_impacts_impact_method_name_idx1" ON "ecoinvent_activity_impacts"("impact_method_name");

-- CreateIndex
CREATE INDEX "ecoinvent_impact_categories_name_idx1" ON "ecoinvent_impact_categories"("name");
