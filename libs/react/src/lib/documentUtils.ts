import { FilesWithAssurances } from '@coldpbc/interfaces';
import { find, get } from 'lodash';

export const getEffectiveEndDate = (file: FilesWithAssurances): string | null => {
  if(file.effective_end_date) return file.effective_end_date;
  // find the first assurance with an effective end date
  const assurance = find(file.attributeAssurances, assurance => assurance.effectiveEndDate !== null);
  if (assurance && assurance.effectiveEndDate) {
    return assurance.effectiveEndDate;
  }
  // next check the metadata
  const effectiveEndDate = get(file, 'metadata.effective_end_date', null);
  if (effectiveEndDate !== null && effectiveEndDate !== '') {
    return effectiveEndDate;
  }
  return null;
};

export const getEffectiveStartDate = (file: FilesWithAssurances): string | null => {
  if(file.effective_start_date) return file.effective_start_date;
  // find the first assurance with an effective start date
  const assurance = file.attributeAssurances.find(assurance => assurance.effectiveStartDate !== null);
  if (assurance && assurance.effectiveStartDate) {
    return assurance.effectiveStartDate;
  }

  const effectiveStartDate = get(file, 'metadata.effective_start_date', null);
  if (effectiveStartDate !== null && effectiveStartDate !== '') {
    return effectiveStartDate;
  }
  return null;
};

export const getEffectiveEndDateFromAssurances = (file: FilesWithAssurances | undefined): string | null => {
  if (!file) return null;
  // find the first assurance with an effective end date
  const assurance = file.attributeAssurances.find(assurance => assurance.effectiveEndDate !== null);
  if (assurance && assurance.effectiveEndDate) {
    return assurance.effectiveEndDate;
  } else {
    return null;
  }
};

export const getEffectiveStartDateFromAssurances = (file: FilesWithAssurances | undefined): string | null => {
  if (!file) return null;
  // find the first assurance with an effective start date
  const assurance = file.attributeAssurances.find(assurance => assurance.effectiveStartDate !== null);
  if (assurance && assurance.effectiveStartDate) {
    return assurance.effectiveStartDate;
  } else {
    return null;
  }
};

export const getFileProcessingStatus = (file: FilesWithAssurances | undefined): string | null => {
  if (!file) return null;
  return get(file, 'metadata.status', null);
};
