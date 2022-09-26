var l = Object.defineProperty;
var c = (n, o, t) => o in n ? l(n, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[o] = t;
var r = (n, o, t) => (c(n, typeof o != "symbol" ? o + "" : o, t), t);
import a from "./Driver.js";
import u from "../../assets/icons/Copy.js";
class x extends a {
  constructor(t, i) {
    super(t, i);
    r(this, "buttonText", "Copy Link");
    r(this, "icon", u);
    r(this, "backgroundColor", "#797979");
    r(this, "backgroundHoverColor", "#5e5e5e");
    r(this, "textColor", "#fff");
    r(this, "textHoverColor", "#fff");
    r(this, "timeout", 0);
  }
  onClick(t) {
    super.onClick(t);
    const i = this.lang.CopiedSuccessfully, e = t.currentTarget.querySelector("div:nth-child(2)");
    if (e.innerHTML === i) {
      e.innerHTML = this.getButtonText();
      return;
    }
    let s = window.location.href;
    navigator.clipboard.writeText(s).then(() => {
      e.innerHTML = i, e.style.transition = "300ms all", e.style.transform = "scale(1)", e.style.transform = `scale(1.07) translateX(${this.lang.Direction === "rtl" ? "-" : ""}4px)`, clearTimeout(this.timeout), this.timeout = setTimeout(() => {
        e.innerHTML = this.getButtonText(), e.style.transition = "none", e.style.transform = "scale(1)";
      }, 5e3);
    });
  }
}
export {
  x as default
};
