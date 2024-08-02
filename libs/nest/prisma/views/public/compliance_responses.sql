SELECT
  oc.id AS organization_compliance_id,
  oc.organization_id,
  cq.id AS compliance_question_id,
  cs.id AS compliance_section_id,
  csg.id AS compliance_section_group_id,
  oc.compliance_definition_name,
  ocair.id AS organization_compliance_ai_response_id,
  ocr.id AS organization_compliance_response_id
FROM
  (
    (
      (
        (
          (
            organization_compliance oc
            LEFT JOIN compliance_section_groups csg ON (
              (
                csg.compliance_definition_name = oc.compliance_definition_name
              )
            )
          )
          LEFT JOIN compliance_sections cs ON ((csg.id = cs.compliance_section_group_id))
        )
        LEFT JOIN compliance_questions cq ON ((cs.id = cq.compliance_section_id))
      )
      LEFT JOIN organization_compliance_responses ocr ON (
        (
          (oc.id = ocr.organization_compliance_id)
          AND (cq.id = ocr.compliance_question_id)
        )
      )
    )
    LEFT JOIN organization_compliance_ai_responses ocair ON (
      (
        (oc.id = ocair.organization_compliance_id)
        AND (cq.id = ocair.compliance_question_id)
      )
    )
  );