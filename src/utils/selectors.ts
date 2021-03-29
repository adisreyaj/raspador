import { SelectorValue } from '@interface/interfaces';

export const runSelectors = (selectors: SelectorValue[]) => {
  let index = 0;
  let value = null;
  do {
    value = selectors[index++];
  } while (value == undefined && index < selectors.length);
  return value;
};
