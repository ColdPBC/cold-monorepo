export const AssuranceDocumentTypes = {
  AuditReport: 'AUDIT_REPORT',
  Certificate: 'CERTIFICATE',
  Other: 'OTHER', // Default type
  Policy: 'POLICY',
  ScopeCertificate: 'SCOPE_CERTIFICATE',
  Statement: 'STATEMENT',
  SupplierAgreement: 'SUPPLIER_AGREEMENT',
  SupplierStatement: 'SUPPLIER_STATEMENT',
  TestReport: 'TEST_REPORT',
  TransactionCertificate: 'TRANSACTION_CERTIFICATE',
} as const;

export const BillOfMaterialDocumentTypes = {
  BillOfMaterials: 'BILL_OF_MATERIALS',
  PurchaseOrder: 'PURCHASE_ORDER',
} as const;

export const InternalSustainabilityPolicyDocumentTypes = {
  Assessment: 'ASSESSMENT',
} as const;

export const SustainabilityDataDocumentTypes = {
  SustainabilityData: 'SUSTAINABILITY_DATA',
} as const;

// Combined document types
export const DocumentTypes = {
  ...AssuranceDocumentTypes,
  ...BillOfMaterialDocumentTypes,
  ...InternalSustainabilityPolicyDocumentTypes,
  ...SustainabilityDataDocumentTypes,
} as const;

// Type definitions
export type AssuranceDocumentType = typeof AssuranceDocumentTypes[keyof typeof AssuranceDocumentTypes];
export type BillOfMaterialDocumentType = typeof BillOfMaterialDocumentTypes[keyof typeof BillOfMaterialDocumentTypes];
export type InternalSustainabilityPolicyDocumentType = typeof InternalSustainabilityPolicyDocumentTypes[keyof typeof InternalSustainabilityPolicyDocumentTypes];
export type SustainabilityDataDocumentType = typeof SustainabilityDataDocumentTypes[keyof typeof SustainabilityDataDocumentTypes];
export type DocumentType = typeof DocumentTypes[keyof typeof DocumentTypes];

export enum MainDocumentCategory {
  Assurance = 'ASSURANCE_DOCUMENT',
  BillOfMaterial = 'BILL_OF_MATERIAL_DOCUMENT',
  InternalSustainabilityPolicy = 'INTERNAL_SUSTAINABILITY_POLICY_DOCUMENT',
  SustainabilityData = 'SUSTAINABILITY_DATA_DOCUMENT'
}
