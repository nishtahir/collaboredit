import { generateSlug } from 'random-word-slugs';

/**
 * @returns A randomized session Identifier slug used in URL
 */
export function randomSessionSlug() {
  return generateSlug(4, { format: 'camel' });
}

/**
 * @returns A randomized user slug consisting of a color and animal
 */
export function randomUserSlug() {
  return generateSlug(2, {
    format: 'title',
    partsOfSpeech: ['adjective', 'noun'],
    categories: {
      adjective: ['color'],
      noun: ['animals'],
    },
  });
}
