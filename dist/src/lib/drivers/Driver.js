var i = Object.defineProperty;
var o = (l, t, e) => t in l ? i(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var n = (l, t, e) => (o(l, typeof t != "symbol" ? t + "" : t, e), e);
class s {
  constructor(t, e) {
    n(this, "lang");
    n(this, "mainEl", null);
    n(this, "options");
    n(this, "rippleColor", "#ffffff75");
    n(this, "rippleInitialized", !1);
    this.options = e, this.lang = t;
  }
  getButtonText() {
    return this.lang[this.buttonText.replaceAll(" ", "_")] || this.buttonText;
  }
  onClick(t) {
  }
  getName() {
    return this.constructor.name;
  }
}
export {
  s as default
};
