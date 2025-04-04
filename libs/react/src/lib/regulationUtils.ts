import { RegulationEntry } from '@coldpbc/interfaces';
import { regulationsData } from './regulationsData';
import { RegulationCategory, RegulationSubcategory } from '@coldpbc/enums';

/**
 * Gets a regulation by its slug
 * @param slug The regulation slug identifier
 * @returns The regulation entry or undefined if not found
 */
export function getRegulationBySlug(slug: string): RegulationEntry | undefined {
  return regulationsData[slug];
}

/**
 * Gets all regulations as an array
 * @returns Array of all regulation entries
 */
export function getAllRegulations(): RegulationEntry[] {
  return Object.values(regulationsData);
}

/**
 * Gets all regulations as an array with their slugs
 * @returns Array of objects containing slug and regulation entry
 */
export function getAllRegulationsWithSlugs(): Array<{ slug: string; regulation: RegulationEntry }> {
  return Object.entries(regulationsData).map(([slug, regulation]) => ({
    slug,
    regulation
  }));
}

/**
 * Gets regulations filtered by category
 * @param category The category to filter by
 * @returns Array of regulation entries in the specified category
 */
export function getRegulationsByCategory(category: RegulationCategory): RegulationEntry[] {
  return Object.values(regulationsData).filter(reg => reg.Category === category);
}

/**
 * Gets regulations filtered by subcategory
 * @param subcategory The subcategory to filter by
 * @returns Array of regulation entries in the specified subcategory
 */
export function getRegulationsBySubcategory(subcategory: RegulationSubcategory): RegulationEntry[] {
  return Object.values(regulationsData).filter(reg => reg.Subcategory === subcategory);
}

/**
 * Gets regulations filtered by jurisdiction
 * @param jurisdiction The jurisdiction to filter by
 * @returns Array of regulation entries in the specified jurisdiction
 */
export function getRegulationsByJurisdiction(jurisdiction: string): RegulationEntry[] {
  return Object.values(regulationsData).filter(reg => reg.Jurisdiction === jurisdiction);
}

/**
 * Gets all available jurisdictions from the regulation data
 * @returns Array of unique jurisdictions
 */
export function getAllJurisdictions(): string[] {
  const jurisdictions = new Set<string>();
  Object.values(regulationsData).forEach(reg => {
    jurisdictions.add(reg.Jurisdiction);
  });
  return Array.from(jurisdictions).sort();
}

/**
 * Search regulations by keyword in title or summary
 * @param keyword The keyword to search for
 * @returns Array of matching regulation entries
 */
export function searchRegulations(keyword: string): RegulationEntry[] {
  const lowercaseKeyword = keyword.toLowerCase();
  return Object.values(regulationsData).filter(reg =>
    reg.Regulation.toLowerCase().includes(lowercaseKeyword) ||
    reg.Summary.toLowerCase().includes(lowercaseKeyword)
  );
}
