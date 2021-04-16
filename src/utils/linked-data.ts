import { Element } from 'domhandler';
import { decode } from 'he';
import { get } from 'lodash';
import { Root } from '../interface/interfaces';

const linkedData = ($: Root) =>
  $('script[type="application/ld+json"]')
    .map((_: number, element: Element) => {
      try {
        return JSON.parse($(element).contents().text());
      } catch (err) {
        return undefined;
      }
    })
    .get()
    .filter(Boolean);

/**!
 * Select the data from the linked data script
 * @param $ - the root selector
 * @param key - object path to select
 * @returns value at the specified path or null
 *
 * ```
 * Eg:
 * ld$($, 'author.name')
 * ld$($, 'creator[0]')
 * ```
 */
export const linkedData$ = ($: Root, key: string): string | null => {
  const data = linkedData($);
  if (key && data?.length > 0) {
    const value = get(data[0], key, null);
    return value ? decode(value) : null;
  }
  return null;
};
