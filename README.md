# Crypto Tracker Pro

Crypto Tracker Pro is a single-page, standalone crypto market watchlist demo built with plain HTML, CSS, and browser JavaScript. It displays a small watchlist of sample assets alongside a responsive SVG trend chart.

## Implemented interactions

- Search the watchlist by coin name or symbol. Use the `/` keyboard shortcut to focus search.
- Select an asset to update the chart and its sample price/change readout.
- Switch the synthetic chart presentation between 1D, 7D, and 1M ranges.
- Add an available sample asset using **Add asset**, or remove an asset with its remove button. The list, tracked-asset count, and top sample performer update locally.
- Use the interface responsively on desktop and mobile, with keyboard-focus indicators and labeled controls.

## Sample-data boundary

Every displayed price and percentage change is illustrative sample data. Chart paths and range labels are synthetic examples, not live or historical exchange data. This demo makes no network requests and has no live market feed, exchange connection, account, transaction, payment, or other external integration. Changes to the watchlist exist only in the current page session and are not saved between reloads.

The reference technology list—Vue.js, Django, Redis, and charts—describes a potential full-stack version only. It is not connected to this no-build browser demo, which uses plain HTML, CSS, and JavaScript only.

## Launch

1. Open a terminal in this folder.
2. Run `python3 -m http.server 8765`.
3. Open <http://localhost:8765> in a browser.

You can also open `index.html` directly in a modern browser.
