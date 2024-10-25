import { startCase, toLower } from 'lodash';

export function toSentenceCase(str: string) {
  return startCase(toLower(str));
}

export function pluralize(word: string, count: number) {
  const sentenceCaseWord = toSentenceCase(word);
  return `${count} ${sentenceCaseWord}${count !== 1 ? 's' : ''}`;
}
