var i = Object.defineProperty;
var s = (e, t, o) => t in e ? i(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var r = (e, t, o) => (s(e, typeof t != "symbol" ? t + "" : t, o), o);
import f from "./Driver.js";
import a from "../../assets/icons/Linkedin.js";
class u extends f {
  constructor(o, n) {
    super(o, n);
    r(this, "buttonText", "Linkedin");
    r(this, "icon", a);
    r(this, "backgroundColor", "#0077B5");
    r(this, "backgroundHoverColor", "#026092");
    r(this, "textColor", "#fff");
    r(this, "textHoverColor", "#fff");
  }
  getLink() {
    var o, n;
    return `https://twitter.com/share?text=${encodeURIComponent((o = this.options) == null ? void 0 : o.shareText)}&url=${(n = this.options) == null ? void 0 : n.shareLink}`;
  }
}
export {
  u as default
};
