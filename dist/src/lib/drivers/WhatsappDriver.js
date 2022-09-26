var a = Object.defineProperty;
var p = (e, o, t) => o in e ? a(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t;
var r = (e, o, t) => (p(e, typeof o != "symbol" ? o + "" : o, t), t);
import n from "./Driver.js";
import i from "../../assets/icons/Whatsapp.js";
class x extends n {
  constructor(t, s) {
    super(t, s);
    r(this, "buttonText", "Whatsapp");
    r(this, "icon", i);
    r(this, "backgroundColor", "#25D366");
    r(this, "backgroundHoverColor", "#20bd5a");
    r(this, "textColor", "#fff");
    r(this, "textHoverColor", "#fff");
  }
  getLink() {
    var t, s;
    return `whatsapp://send?text=${(t = this.options) == null ? void 0 : t.shareText} 
 ${(s = this.options) == null ? void 0 : s.shareLink}`;
  }
}
export {
  x as default
};
