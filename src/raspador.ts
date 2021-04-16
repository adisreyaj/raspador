import { MetaData, Root, Selectors } from './interface/interfaces';
import { loadHTML } from './utils/load-html';
import { runSelectors } from './utils/selectors';

/**!
 *  Initialize `raspador` with the html to scrape
 * @param - the html string
 */
export default (html: string): ((selectors: Selectors) => MetaData | null) => {
  try {
    const $ = loadHTML(html);
    return computeValues($);
  } catch (error) {
    throw new Error('[Raspador]: Failed to load html');
  }
};

const computeValues = ($: Root) => (selectors: Selectors): MetaData | null => {
  const metadata = selectors($);
  const keys = Object.keys(metadata);
  if (keys?.length > 0) {
    return keys.reduce((acc, curr) => {
      let value = null;
      try {
        value = runSelectors(metadata[curr]);
      } catch (error) {
        console.error('[Raspador]: Error occurred', error)
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
