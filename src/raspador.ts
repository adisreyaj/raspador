import { MetaData, Selectors } from '@interface/interfaces';
import { loadHTML } from '@utils/load-html';
import { runSelectors } from '@utils/selectors';

export default (html: string): ((selectors: Selectors) => MetaData | null) => {
  const $ = loadHTML(html);
  return (selectors: Selectors): MetaData | null => {
    const metadata = selectors($);
    const keys = Object.keys(metadata);
    if (keys?.length > 0) {
      return keys.reduce((acc, curr) => {
        let value = null;
        try {
          value = runSelectors(metadata[curr]);
        } catch (error) {
          value = null;
        }
        return {
          ...acc,
          [curr]: value,
        };
      }, {});
    }
    return null;
  };
};