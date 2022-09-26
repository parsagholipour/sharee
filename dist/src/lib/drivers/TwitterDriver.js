var n = Object.defineProperty;
var s = (e, r, t) => r in e ? n(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var o = (e, r, t) => (s(e, typeof r != "symbol" ? r + "" : r, t), t);
import a from "./Driver.js";
import f from "../../assets/icons/Twitter.js";
class d extends a {
  constructor(t, i) {
    super(t, i);
    o(this, "buttonText", "Twitter");
    o(this, "icon", f);
    o(this, "backgroundColor", "#1DA1F2");
    o(this, "backgroundHoverColor", "#1a93dd");
    o(this, "textColor", "#fff");
    o(this, "textHoverColor", "#fff");
  }
  getLink() {
    var t, i;
    return `https://twitter.com/share?text=${encodeURIComponent((t = this.options) == null ? void 0 : t.shareText)}&url=${(i = this.options) == null ? void 0 : i.shareLink}`;
  }
}
export {
  d as default
};
