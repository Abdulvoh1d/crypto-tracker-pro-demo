(() => {
  "use strict";

  // All values and chart shapes below are synthetic examples, not market data.
  const catalog = {
    BTC: { name: "Bitcoin", symbol: "BTC", price: 67420.5, change: 2.41, color: "#f39a31", tint: "#fff2df", glyph: "₿", shape: [0.01, -0.012, 0.005, 0.018, 0.009, 0.032, 0.021, 0.044, 0.037, 0.058, 0.048, 0.071] },
    ETH: { name: "Ethereum", symbol: "ETH", price: 3528.12, change: 1.83, color: "#7883a7", tint: "#eef0f7", glyph: "◆", shape: [0.015, 0.029, 0.018, 0.038, 0.025, 0.047, 0.034, 0.051, 0.043, 0.065, 0.052, 0.064] },
    SOL: { name: "Solana", symbol: "SOL", price: 182.74, change: -0.76, color: "#7a5de8", tint: "#f0ebff", glyph: "≋", shape: [0.045, 0.026, 0.04, 0.016, 0.028, 0.003, 0.017, -0.009, 0.008, -0.017, -0.005, -0.023] },
    ADA: { name: "Cardano", symbol: "ADA", price: 0.4628, change: 0.54, color: "#3478d4", tint: "#eaf2ff", glyph: "●", shape: [-0.02, -0.006, -0.012, 0.009, 0.002, 0.023, 0.016, 0.031, 0.019, 0.037, 0.029, 0.045] },
    DOT: { name: "Polkadot", symbol: "DOT", price: 7.28, change: -1.12, color: "#e45179", tint: "#fff0f4", glyph: "●", shape: [0.031, 0.014, 0.026, 0.002, 0.019, -0.008, 0.005, -0.019, -0.004, -0.023, -0.012, -0.03] },
    AVAX: { name: "Avalanche", symbol: "AVAX", price: 36.91, change: 3.08, color: "#e64d4d", tint: "#fff0f0", glyph: "▲", shape: [-0.012, 0.004, -0.006, 0.018, 0.01, 0.032, 0.021, 0.046, 0.037, 0.053, 0.048, 0.076] },
    LINK: { name: "Chainlink", symbol: "LINK", price: 17.42, change: -0.23, color: "#3978d5", tint: "#eaf2ff", glyph: "⬡", shape: [0.024, 0.009, 0.02, 0.002, 0.015, -0.006, 0.011, -0.012, 0.006, -0.015, 0.001, -0.01] },
    LTC: { name: "Litecoin", symbol: "LTC", price: 84.16, change: 0.92, color: "#7b8291", tint: "#f0f1f4", glyph: "Ł", shape: [-0.024, -0.011, -0.019, 0.004, -0.002, 0.019, 0.01, 0.029, 0.018, 0.039, 0.03, 0.044] }
  };

  const watchlist = ["BTC", "ETH", "SOL", "ADA"];
  const ranges = {
    "1D": { labels: ["00:00", "06:00", "12:00", "18:00", "NOW"], scale: 0.28, shift: 0 },
    "7D": { labels: ["MON", "TUE", "WED", "THU", "FRI"], scale: 0.65, shift: 3 },
    "1M": { labels: ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", "NOW"], scale: 1, shift: 6 }
  };
  let selectedSymbol = "BTC";
  let selectedRange = "1D";

  const rows = document.getElementById("watchlist-rows");
  const search = document.getElementById("coin-search");
  const emptyState = document.getElementById("empty-state");
  const visibleCount = document.getElementById("visible-count");
  const select = document.getElementById("coin-select");
  const addPanel = document.getElementById("add-coin-panel");
  const addToggle = document.getElementById("toggle-add");
  const addFeedback = document.getElementById("add-feedback");
  const svgNS = "http://www.w3.org/2000/svg";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatPrice(value) {
    const digits = value < 1 ? 4 : 2;
    return "$" + value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function signedPercent(value) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  }

  function updateSummary() {
    document.getElementById("asset-count").textContent = String(watchlist.length).padStart(2, "0");
    document.getElementById("watchlist-count").textContent = String(watchlist.length).padStart(2, "0");
    const top = watchlist.map((symbol) => catalog[symbol]).sort((a, b) => b.change - a.change)[0];
    document.getElementById("top-performer").textContent = top ? `${top.symbol} ${signedPercent(top.change)}` : "—";
    document.getElementById("top-performer-foot").textContent = top ? `${top.name} · illustrative 24h change` : "No sample assets in watchlist";
    const matchingCount = watchlist.filter(matchesQuery).length;
    visibleCount.textContent = `${matchingCount} ${matchingCount === 1 ? "asset" : "assets"}`;
  }

  function matchesQuery(symbol) {
    const query = search.value.trim().toLowerCase();
    const coin = catalog[symbol];
    return !query || coin.name.toLowerCase().includes(query) || symbol.toLowerCase().includes(query);
  }

  function renderWatchlist() {
    rows.replaceChildren();
    const filtered = watchlist.filter(matchesQuery);
    filtered.forEach((symbol) => {
      const coin = catalog[symbol];
      const row = document.createElement("tr");
      if (symbol === selectedSymbol) row.classList.add("is-selected");

      const assetCell = document.createElement("td");
      const assetButton = el("button", "coin-select");
      assetButton.type = "button";
      assetButton.setAttribute("aria-pressed", String(symbol === selectedSymbol));
      assetButton.setAttribute("aria-label", `Show ${coin.name} sample chart`);
      const icon = el("span", "coin-icon", coin.glyph);
      icon.style.color = coin.color;
      icon.style.backgroundColor = coin.tint;
      const name = el("span", "coin-text");
      name.append(el("strong", "", coin.name), el("span", "", symbol));
      assetButton.append(icon, name);
      assetButton.addEventListener("click", () => {
        selectedSymbol = symbol;
        renderWatchlist();
        updateChart();
      });
      assetCell.append(assetButton);

      const priceCell = el("td", "price-cell");
      priceCell.append(el("strong", "", formatPrice(coin.price)), el("span", "", "Sample price · USD"));
      const changeCell = document.createElement("td");
      const change = el("span", `change-badge ${coin.change >= 0 ? "positive" : "negative"}`, signedPercent(coin.change));
      change.setAttribute("aria-label", `${coin.change >= 0 ? "Up" : "Down"} ${Math.abs(coin.change).toFixed(2)} percent, illustrative 24 hour change`);
      changeCell.append(change);
      const actionCell = document.createElement("td");
      actionCell.className = "action-cell";
      const remove = el("button", "remove-button", "×");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${coin.name} from watchlist`);
      remove.title = `Remove ${coin.name}`;
      remove.addEventListener("click", () => removeCoin(symbol));
      actionCell.append(remove);

      row.append(assetCell, priceCell, changeCell, actionCell);
      rows.append(row);
    });
    emptyState.hidden = filtered.length !== 0;
    updateSummary();
    refreshOptions();
  }

  function refreshOptions() {
    const previous = select.value;
    select.replaceChildren(new Option("Select a coin…", ""));
    Object.values(catalog).filter((coin) => !watchlist.includes(coin.symbol)).forEach((coin) => {
      select.add(new Option(`${coin.name} (${coin.symbol})`, coin.symbol));
    });
    if (previous && !watchlist.includes(previous)) select.value = previous;
    const noOptions = select.options.length <= 1;
    select.disabled = noOptions;
    addPanel.querySelector(".confirm-add").disabled = noOptions;
    addFeedback.textContent = noOptions ? "All sample assets are already on your watchlist." : "";
  }

  function addCoin(symbol) {
    if (!catalog[symbol] || watchlist.includes(symbol)) return;
    watchlist.push(symbol);
    selectedSymbol = symbol;
    search.value = "";
    select.value = "";
    renderWatchlist();
    updateChart();
    addFeedback.textContent = `${catalog[symbol].name} added to your sample watchlist.`;
  }

  function removeCoin(symbol) {
    const index = watchlist.indexOf(symbol);
    if (index < 0) return;
    watchlist.splice(index, 1);
    if (selectedSymbol === symbol) selectedSymbol = watchlist[0] || "";
    if (watchlist.length === 0) selectedRange = selectedRange || "1D";
    renderWatchlist();
    updateChart();
    addFeedback.textContent = `${catalog[symbol].name} removed from your sample watchlist.`;
  }

  function updateChart() {
    const coin = catalog[selectedSymbol];
    const title = document.getElementById("chart-title");
    const price = document.getElementById("selected-price");
    const change = document.getElementById("selected-change");
    const svgTitle = document.getElementById("chart-svg-title");
    const svgDesc = document.getElementById("chart-svg-desc");
    const line = document.getElementById("chart-line");
    const area = document.getElementById("chart-area");
    const dot = document.getElementById("chart-dot");

    if (!coin) {
      title.replaceChildren(document.createTextNode("No asset selected"));
      price.textContent = "—";
      change.textContent = "—";
      change.className = "selected-change";
      line.setAttribute("d", "");
      area.setAttribute("d", "");
      dot.setAttribute("r", "0");
      svgTitle.textContent = "No asset selected";
      svgDesc.textContent = "Add a sample asset to display an illustrative chart.";
      document.getElementById("chart-labels").replaceChildren();
      return;
    }

    title.replaceChildren(document.createTextNode(coin.name + " "));
    const symbolLabel = el("span", "chart-symbol", coin.symbol);
    title.append(symbolLabel);
    price.textContent = formatPrice(coin.price);
    change.textContent = signedPercent(coin.change);
    change.className = `selected-change ${coin.change >= 0 ? "positive" : "negative"}`;
    svgTitle.textContent = `${coin.name} illustrative sample price chart`;
    svgDesc.textContent = `A synthetic ${selectedRange} sample price trend for ${coin.name}; not historical market performance.`;

    const config = ranges[selectedRange];
    const data = Array.from({ length: 48 }, (_, index) => {
      const position = index / 47;
      const baseIndex = Math.floor(position * (coin.shape.length - 1));
      const nextIndex = Math.min(baseIndex + 1, coin.shape.length - 1);
      const part = position * (coin.shape.length - 1) - baseIndex;
      const interpolated = coin.shape[baseIndex] * (1 - part) + coin.shape[nextIndex] * part;
      const ripple = Math.sin((index + config.shift) * 1.7) * 0.004 + Math.sin(index * 0.49 + config.shift) * 0.003;
      return interpolated * config.scale + ripple;
    });
    const min = Math.min(...data);
    const max = Math.max(...data);
    const spread = max - min || 1;
    const points = data.map((value, index) => ({
      x: 4 + index * (752 / (data.length - 1)),
      y: 198 - ((value - min) / spread) * 160
    }));
    const path = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
    const last = points[points.length - 1];
    line.setAttribute("d", path);
    area.setAttribute("d", `${path} L${last.x.toFixed(2)},210 L${points[0].x.toFixed(2)},210 Z`);
    dot.setAttribute("cx", last.x.toFixed(2));
    dot.setAttribute("cy", last.y.toFixed(2));
    dot.setAttribute("r", "5");
    document.getElementById("chart-labels").replaceChildren(...config.labels.map((label) => el("span", "", label)));
  }

  document.querySelectorAll(".range-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRange = button.dataset.range;
      document.querySelectorAll(".range-button").forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      updateChart();
    });
  });

  search.addEventListener("input", renderWatchlist);
  addToggle.addEventListener("click", () => {
    const opening = addPanel.hidden;
    addPanel.hidden = !opening;
    addToggle.setAttribute("aria-expanded", String(opening));
    if (opening && !select.disabled) select.focus();
    if (!opening) addToggle.focus();
  });
  addPanel.addEventListener("submit", (event) => {
    event.preventDefault();
    if (select.value) addCoin(select.value);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && document.activeElement !== search && !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && !addPanel.hidden) {
      addPanel.hidden = true;
      addToggle.setAttribute("aria-expanded", "false");
      addToggle.focus();
    }
  });

  renderWatchlist();
  updateChart();
})();
