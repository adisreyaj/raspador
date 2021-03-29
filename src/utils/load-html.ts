import { Root } from '@interface/interfaces';
import cheerio from 'cheerio';
export const loadHTML = (html: string): Root => cheerio.load(html);
