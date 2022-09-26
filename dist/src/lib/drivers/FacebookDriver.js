var s = Object.defineProperty;
var i = (e, t, o) => t in e ? s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var r = (e, t, o) => (i(e, typeof t != "symbol" ? t + "" : t, o), o);
import a from "./Driver.js";
import c from "../../assets/icons/Facebook.js";
class k extends a {
  constructor(o, n) {
    super(o, n);
    r(this, "buttonText", "Facebook");
    r(this, "icon", c);
    r(this, "backgroundColor", "#4267B2");
    r(this, "backgroundHoverColor", "#355696");
    r(this, "textColor", "#fff");
    r(this, "textHoverColor", "#fff");
  }
  getLink() {
    var o, n;
    return `https://twitter.com/share?text=${encodeURIComponent((o = this.options) == null ? void 0 : o.shareText)}&url=${(n = this.options) == null ? void 0 : n.shareLink}`;
  }
}
export {
  k as default
};
