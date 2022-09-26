var l = Object.defineProperty;
var r = (n, s, e) => s in n ? l(n, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[s] = e;
var o = (n, s, e) => (r(n, typeof s != "symbol" ? s + "" : s, e), e);
import h from "./BaseStrategy.js";
import p from "../../../node_modules/lodash.merge/index.js";
const c = {
  position: "top-right",
  noTitle: !1
};
class u extends h {
  constructor(e) {
    super();
    o(this, "sharee");
    o(this, "shareeEl");
    o(this, "driverListeners", {});
    o(this, "options");
    this.sharee = e, this.shareeEl = document.createElement("div"), this.options = p({}, c, e.options.modeOptions);
  }
  destroy() {
    window.shareeEl = this.shareeEl, console.log(this.shareeEl), this.eventListeners.forEach((e) => {
      e[0].removeEventListener(e[1], e[2]);
    }), this.shareeEl.parentElement.removeChild(this.shareeEl);
  }
  reRender() {
    this.destroy(), setTimeout(() => {
      this.render();
    });
  }
  getPositionClass() {
  }
  render() {
    this.shareeEl = document.createElement("div"), this.shareeEl.classList.add("sharee__fixed"), this.shareeEl.classList.add("sharee__" + this.sharee.lang.Direction), this.shareeEl.classList.add("sharee__position__" + this.options.position), this.shareeEl.style.transition = "all " + this.sharee.options.showTransitionDuration, this.shareeEl.style.transitionProperty = "transform, opacity";
    for (let e of this.sharee.options.drivers) {
      if (!this.shouldRenderDriver(e))
        continue;
      const t = this.resolveDriver(e), i = new t(this.sharee.lang, {
        lang: this.sharee.lang,
        shareText: this.sharee.getShareText(),
        shareLink: this.sharee.getShareLink(),
        ripple: this.sharee.options.ripple
      }), a = this.renderDriver(i);
      this.shareeEl.appendChild(a);
    }
    document.body.appendChild(this.shareeEl);
  }
  onDriverMouseEnter(e) {
    return () => {
      e.mainEl.style.backgroundColor = e.backgroundHoverColor, e.mainEl.style.color = e.textHoverColor;
    };
  }
  onDriverMouseLeave(e) {
    return () => {
      this.initDriverStyles(e);
    };
  }
  onDriverClick(e) {
    return (t) => {
      e.onClick(t);
    };
  }
  initDriverStyles(e) {
    var t, i;
    e.mainEl.style.backgroundColor = e.backgroundColor, e.mainEl.style.color = e.textColor, e.mainEl.style.transition = (((t = e.options) == null ? void 0 : t.transitionDuration) || "200ms") + " all", (i = e.options) != null && i.ripple && this.initRipple(e);
  }
  initRipple(e) {
    e.rippleInitialized || (e.rippleInitialized = !0, import("ripple-effects").then((t) => {
      t.default(e.mainEl, {
        background: e.rippleColor
      });
    }));
  }
  renderDriver(e) {
    e.mainEl = document.createElement("a"), "getLink" in e && (e.mainEl.href = e.getLink()), this.initDriverStyles(e);
    const t = document.createElement("div");
    t.innerHTML = e.icon;
    const i = document.createElement("div");
    return i.innerHTML = e.getButtonText(), e.mainEl.appendChild(t), this.options.noTitle ? (e.mainEl.title = e.getButtonText(), e.mainEl.classList.add("sharee__no-title")) : e.mainEl.appendChild(i), e.mainEl.classList.add("sharee__driver__" + e.getName()), e.mainEl;
  }
}
export {
  u as default
};
