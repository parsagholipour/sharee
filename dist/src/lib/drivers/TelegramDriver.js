var n = Object.defineProperty;
var s = (t, r, e) => r in t ? n(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var o = (t, r, e) => (s(t, typeof r != "symbol" ? r + "" : r, e), e);
import l from "./Driver.js";
import i from "../../assets/icons/Telegram.js";
class g extends l {
  constructor(e, a) {
    super(e, a);
    o(this, "buttonText", "Telegram");
    o(this, "icon", i);
    o(this, "backgroundColor", "#0088CC");
    o(this, "backgroundHoverColor", "#0371aa");
    o(this, "textColor", "#fff");
    o(this, "textHoverColor", "#fff");
  }
  getLink() {
    var e, a;
    return `https://telegram.me/share/url?url=${(e = this.options) == null ? void 0 : e.shareLink}&text=${encodeURIComponent((a = this.options) == null ? void 0 : a.shareText)}`;
  }
}
export {
  g as default
};
