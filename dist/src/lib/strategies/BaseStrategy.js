var o = Object.defineProperty;
var i = (e, r, t) => r in e ? o(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var s = (e, r, t) => (i(e, typeof r != "symbol" ? r + "" : r, t), t);
import n from "../drivers/index.js";
class u {
  constructor() {
    s(this, "eventListeners", []);
  }
  resolveDriver(r) {
    if (n.hasOwnProperty(r))
      return n[r];
    throw new Error(`Unknown driver: ${r}`);
  }
  shouldRenderDriver(r) {
    return !0;
  }
}
export {
  u as default
};
