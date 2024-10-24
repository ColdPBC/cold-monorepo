export function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function pluralize(word: string, count: number) {
  const sentenceCaseWord = toSentenceCase(word);
  return `${count} ${sentenceCaseWord}${count !== 1 ? 's' : ''}`;
}
