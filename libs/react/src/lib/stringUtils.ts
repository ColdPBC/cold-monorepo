import { startCase, toLower } from 'lodash';

export function toSentenceCase(str: string) {
  return startCase(toLower(str));
}

export function pluralize(word: string, count: number) {
  return `${count} ${word}${count !== 1 ? 's' : ''}`;
}
