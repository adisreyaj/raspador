import cheerio from 'cheerio';
import { Root } from '../interface/interfaces';
export const loadHTML = (html: string): Root => cheerio.load(html);
