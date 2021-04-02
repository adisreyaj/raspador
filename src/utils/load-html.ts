import { load } from 'cheerio';
import { Root } from '../interface/interfaces';
export const loadHTML = (html: string): Root => load(html);
