var f = Object.defineProperty;
var g = (i, t, e) => t in i ? f(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var o = (i, t, e) => (g(i, typeof t != "symbol" ? t + "" : t, e), e);
import { shareeDefaultOptions as a } from "../common/ShareeOptions.js";
import h from "../locales/fa.js";
import c from "./strategies/index.js";
import l from "../../node_modules/lodash.merge/index.js";
import "../assets/styles/style.js";
class E {
  constructor(t, e = a) {
    o(this, "options");
    o(this, "lang", h);
    o(this, "strategy");
    o(this, "targetElement");
    this.targetElement = t, this.options = l({}, a, e);
    const s = c[this.options.mode];
    if (typeof s > "u")
      throw new Error('Selected mode "' + e.mode + '" not found');
    this.strategy = new s(this), this.init().then(() => {
      this.strategy.render();
    });
  }
  async init() {
    this.targetElement.sharee = this, await this.setLang(this.options.lang, this.options.langs);
  }
  async setLang(t, e = {}) {
    const s = /* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("../locales/en.js"), "../locales/fa.json": () => import("../locales/fa.js") });
    let n = h;
    for (const r in s)
      r.includes(t) && (s[r] instanceof Function ? n = { ...await s[r]() } : n = { ...s[r] }, e[t] && l(n, e[t]));
    this.lang = n;
  }
  getShareText() {
    return this.options.shareText || document.title;
  }
  getShareLink() {
    return this.options.shareLink || window.location.href;
  }
  destroy() {
    this.strategy.destroy();
  }
}
export {
  E as default
};
