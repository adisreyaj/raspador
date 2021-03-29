<h1 align="center">Raspador - Metadata scraping made easy!</h1>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-v4.2-blue?style=flat-square" alt="TypeScript">
  <img src="https://img.shields.io/badge/Conventional Commits-friendly-brightgreen.svg?style=flat-square" alt="Commitizen">
  <img src="https://img.shields.io/badge/Styled_with-Prettier-ff69b4.svg?style=flat-square" alt="Prettier">
</p>

A simple and powerful library for scraping metadata.

## Usage

```ts
import fetch from 'node-fetch';
import raspador, { ld$, Root, Selectors } from 'raspador';

(async () => {
  const html = await fetch(
    'https://blog.sreyaj.dev/implementing-feature-flags-in-angular'
  ).then((res) => res.text());
  const scraper = raspador(html);
  const selectors: Selectors = ($: Root) => ({
    title: [$('meta[property="og:title"]').attr('content'), $('title').text()],
    author: [ld$($, 'creator[0]')],
  });
  const result = scraper(selectors);
  console.log({ result });
})();
```

`ld$` function is exposed for get data form linkedData in the structured schema.

## Local Development

1. Clone or download the repo
2. Install dependencies

```
npm install
```

3. Start the dev server

```
npm run dev
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/adisreyaj/cartella-web/issues) if you want to contribute.

## Author

👤 **Adithya Sreyaj**

- Twitter: [@AdiSreyaj](https://twitter.com/AdiSreyaj)
- Github: [@adisreyaj](https://github.com/adisreyaj)

## 👍🏼 Show your support

Please ⭐️ this repository if this project helped you!
