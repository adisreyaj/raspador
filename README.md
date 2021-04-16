<img src="./raspador.png" alt="Raspador" align="center" height="200px" style="margin:0 auto;display:block;margin-bottom:20px;">
<h1 align="center">Raspador - Metadata scraping made easy!</h1>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-v4.2-blue?style=flat-square" alt="TypeScript">
  <img src="https://img.shields.io/badge/Conventional Commits-Friendly-brightgreen.svg?style=flat-square" alt="Commitizen">
  <img src="https://img.shields.io/badge/Styled_with-Prettier-ff69b4.svg?style=flat-square" alt="Prettier">
  <img src="https://img.shields.io/badge/Linted_with-EsLint-7C7CEA.svg?style=flat-square" alt="EsLint">
</p>

A simple and powerful library for scraping metadata. Easy to use scraper without much overhead. No complex logic involved. Just create your selectors and let `raspador` handle the rest.

Written in TypeScript, so you don't have to worry about finding and installing types separately.

## Usage

1. Import the required items from the package

```ts
import raspador, { ld$, Root, Selectors } from 'raspador';
```

2. Create the scraper by providing the html string to raspador function

```ts
const scraper = raspador(html);
```

3. Setup the rules

```ts
const selectors: Selectors = ($: Root) => ({
  title: [$('meta[property="og:title"]').attr('content'), $('title').text()],
  author: [ld$($, 'creator[0]')],
});
```

4. Get the meta data by passing the selectors to the scraper

```ts
const result = scraper(selectors);
```

---

## Selectors

Raspador uses [Cheerio](https://github.com/cheeriojs/cheerio#readme) and hence the selectors are compatible.
Here are some selectors:

```ts
$('meta[property="og:image:url"]').attr('content');
$('html').attr('lang');
$('meta[property="og:logo"]').attr('content');
```

Raspador exposes another selector for selecting keys from the [Linked Data](https://developers.google.com/search/docs/guides/intro-structured-data) present
in:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "Party Coffee Cake",
    "author": {
      "@type": "Person",
      "name": "Maicy Williams"
    },
    "datePublished": "2018-03-10",
    "description": "This coffee cake is awesome and perfect for parties.",
    "prepTime": "PT20M"
  }
</script>
```

For selecting the author name from the Linked/Structured Data:

```ts
ld$($, 'author.name')-- > 'Maicy Williams';
```

Selectors will be a function which receives the `$` which returns an object where the key can be some identifier and the value will the array of selectors.

```ts
const selectors = ($: Root) => ({
  title: [$('meta[property="og:title"]').attr('content'), $('title').text()],
  author: [ld$($, 'creator[0]')],
});
```

---

## Full Example

```ts
import fetch from 'node-fetch';
import raspador, { ld$, Root, Selectors } from 'raspador';

(async () => {
  const html = await fetch(
    'https://blog.sreyaj.dev/implementing-feature-flags-in-angular'
  ).then((res) => res.text());
  // Initialize raspador by passing in the html
  const scraper = raspador(html);

  // Setup the selectors
  const selectors: Selectors = ($: Root) => ({
    title: [$('meta[property="og:title"]').attr('content'), $('title').text()],
    author: [ld$($, 'creator[0]')],
  });
  
  // Pass the selectors to get the result
  const result = scraper(selectors);
  console.log({ result });
})();
```

---

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

## Inspiration and Idea

Show your support for MetaScraper:

[MetaScraper](https://github.com/microlinkhq/metascraper)
