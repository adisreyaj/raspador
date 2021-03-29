import { decode } from 'he';
import { get } from 'lodash';
import { Root } from '../interface/interfaces';

const linkedData = ($: Root) =>
  $('script[type="application/ld+json"]')
    .map((_: number, element: any) => {
      try {
        return JSON.parse($(element).contents().text());
      } catch (err) {
        return undefined;
      }
    })
    .get()
    .filter(Boolean);

export const linkedData$ = ($: Root, key: string): string | null => {
  const data = linkedData($);
  if (key && data?.length > 0) {
    return decode(get(data[0], key, null));
  }
  return null;
};
