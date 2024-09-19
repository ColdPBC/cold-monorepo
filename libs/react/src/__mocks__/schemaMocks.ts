import {SchemaEnum} from "@coldpbc/interfaces";


export function getSchemaMocks(): SchemaEnum[] {
  return [
    {
      "values": [
        {
          "name": "CERTIFICATE",
          "value": "CERTIFICATE"
        },
        {
          "name": "TEST_REPORT",
          "value": "TEST_REPORT"
        },
        {
          "name": "STATEMENT",
          "value": "STATEMENT"
        },
        {
          "name": "ASSESSMENT",
          "value": "ASSESSMENT"
        },
        {
          "name": "PURCHASE_ORDER",
          "value": "PURCHASE_ORDER"
        },
        {
          "name": "BILL_OF_MATERIALS",
          "value": "BILL_OF_MATERIALS"
        },
        {
          "name": "POLICY",
          "value": "POLICY"
        },
        {
          "name": "OTHER",
          "value": "OTHER"
        },
        {
          "name": "AUDIT_REPORT",
          "value": "AUDIT_REPORT"
        },
        {
          "name": "SCOPE_CERTIFICATE",
          "value": "SCOPE_CERTIFICATE"
        }
      ],
      "name": "OrganizationFilesType"
    }
  ]
}
