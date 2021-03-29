import { load } from 'cheerio';

export type Root = ReturnType<typeof load>;

export type Selectors = ($: Root) => Selector;

export type SelectorValue = string | undefined | null;

export interface Selector {
  [key: string]: SelectorValue[];
}

export interface MetaData {
  [key: string]: string;
}
