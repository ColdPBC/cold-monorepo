import { MaterialClassificationCategory } from '@coldpbc/enums';

export interface PcfGraphData {
  classificationCategory: MaterialClassificationCategory | 'No Category';
  emissions: number;
}
