import { useMemo, useState, useCallback } from 'react';
import {
  RegulationCategory,
  RegulationSubcategory
} from '@coldpbc/enums'
import { RegulationEntry } from '@coldpbc/interfaces'
import {
  getRegulationBySlug,
  getRegulationsByCategory,
  getRegulationsByJurisdiction,
  getAllJurisdictions, getAllRegulationsWithSlugs
} from '@coldpbc/lib';

/**
 * Custom hook for accessing and filtering regulations data
 */
export function useRegulations() {
  // State for active filters
  const [categoryFilter, setCategoryFilter] = useState<RegulationCategory | null>(null);
  const [subcategoryFilter, setSubcategoryFilter] = useState<RegulationSubcategory | null>(null);
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get all regulations
  const allRegulations = useMemo(() => getAllRegulationsWithSlugs(), []);

  // Get all available jurisdictions for filtering
  const jurisdictions = useMemo(() => getAllJurisdictions(), []);

  // Get all available categories and subcategories for filtering
  const categories = useMemo(() => {
    const cats = new Set<RegulationCategory>();
    allRegulations.forEach(({slug, regulation}) => cats.add(regulation.Category));
    return Array.from(cats).sort();
  }, [allRegulations]);

  const subcategories = useMemo(() => {
    const subcats = new Set<RegulationSubcategory>();
    allRegulations.forEach(({slug, regulation}) => subcats.add(regulation.Subcategory));
    return Array.from(subcats).sort();
  }, [allRegulations]);

  // Function to get single regulation by slug
  const getRegulation = useCallback((slug: string) => {
    return getRegulationBySlug(slug);
  }, []);

  // Filtered regulations based on current filters
  const filteredRegulations = useMemo(() => {
    let result = allRegulations;

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(({slug, regulation}) => regulation.Category === categoryFilter);
    }

    // Apply subcategory filter
    if (subcategoryFilter) {
      result = result.filter(({slug, regulation}) => regulation.Subcategory === subcategoryFilter);
    }

    // Apply jurisdiction filter
    if (jurisdictionFilter) {
      result = result.filter(({slug, regulation}) => regulation.Jurisdiction === jurisdictionFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(({slug, regulation}) =>
        regulation.Regulation.toLowerCase().includes(term) ||
        regulation.Summary.toLowerCase().includes(term) ||
        regulation.Jurisdiction.toLowerCase().includes(term)
      );
    }

    return result;
  }, [allRegulations, categoryFilter, subcategoryFilter, jurisdictionFilter, searchTerm]);

  // Function to clear all filters
  const clearFilters = useCallback(() => {
    setCategoryFilter(null);
    setSubcategoryFilter(null);
    setJurisdictionFilter(null);
    setSearchTerm('');
  }, []);

  // Group regulations by category
  const regulationsByCategory = useMemo(() => {
    const grouped: Record<RegulationCategory, RegulationEntry[]> = {} as Record<RegulationCategory, RegulationEntry[]>;

    categories.forEach(category => {
      grouped[category] = getRegulationsByCategory(category);
    });

    return grouped;
  }, [categories]);

  // Group regulations by jurisdiction
  const regulationsByJurisdiction = useMemo(() => {
    const grouped: Record<string, RegulationEntry[]> = {};

    jurisdictions.forEach(jurisdiction => {
      grouped[jurisdiction] = getRegulationsByJurisdiction(jurisdiction);
    });

    return grouped;
  }, [jurisdictions]);

  return {
    // Data
    allRegulations,
    filteredRegulations,
    regulationsByCategory,
    regulationsByJurisdiction,

    // Filter options
    categories,
    subcategories,
    jurisdictions,

    // Active filters
    categoryFilter,
    subcategoryFilter,
    jurisdictionFilter,
    searchTerm,

    // Filter actions
    setCategoryFilter,
    setSubcategoryFilter,
    setJurisdictionFilter,
    setSearchTerm,
    clearFilters,

    // Individual regulation access
    getRegulation
  };
}
