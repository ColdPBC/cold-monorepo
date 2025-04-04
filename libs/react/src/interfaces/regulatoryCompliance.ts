import { RegulationCategory, RegulationStatus, RegulationSubcategory, YesNo } from '@coldpbc/enums';

// Interface for a single regulation entry
export interface RegulationEntry {
  Regulation: string;
  "Bill Number": string;
  "In Effect": RegulationStatus;
  Jurisdiction: string;
  Effective: string;
  Summary: string;
  Category: RegulationCategory;
  Subcategory: RegulationSubcategory;
  "Product Type Eligibility": string;
  "Fee Explanation": string;
  Fees: string;
  "Penalties (Beyond Fees)": YesNo;
  "Penalty Explanation": string;
  "Revenue Applicability": string;
  "Company Type Applicability": string;
  "Employee Threshold Applicability": string;
  "Guidance & Steps to Comply": string[];
  "Bill Text Link": string;
}

// Interface for the map of slugs to regulation entries
export interface RegulationMap {
  [slug: string]: RegulationEntry;
}
