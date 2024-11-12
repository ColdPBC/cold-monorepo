import { startCase, toLower } from 'lodash';

export function toSentenceCase(str: string) {
  return startCase(toLower(str));
}

export function pluralize(word: string, count: number) {
  return `${count} ${word}${count !== 1 ? 's' : ''}`;
}

export const areArraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  return arr2.every(item => set1.has(item));
};
