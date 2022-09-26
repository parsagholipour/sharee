var r = Object.defineProperty;
var l = (a, s, e) => s in a ? r(a, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[s] = e;
var i = (a, s, e) => (l(a, typeof s != "symbol" ? s + "" : s, e), e);
import h from "./BaseStrategy.js";
import m from "../../../node_modules/lodash.merge/index.js";
const p = {
  noTitle: !1
};
class u extends h {
  constructor(e) {
    super();
    i(this, "sharee");
    i(this, "elementHovering", !1);
    i(this, "shareeElHovering", !1);
    i(this, "shareeEl");
    i(this, "driverListeners", {});
    i(this, "hideTimeout", 0);
    i(this, "options");
    this.sharee = e, this.shareeEl = document.createElement("div"), this.options = m({}, p, e.options.modeOptions);
  }
  hide() {
    var e;
    (e = this.shareeEl) == null || e.classList.remove("show"), clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => {
      var t;
      (t = this.shareeEl) == null || t.classList.remove("showing");
    }, Number.parseInt(this.sharee.options.showTransitionDuration));
  }
  destroy() {
    this.eventListeners.forEach((e) => {
      e[0].removeEventListener(e[1], e[2]);
    }), this.shareeEl.parentElement.removeChild(this.shareeEl);
  }
  reRender() {
    this.destroy(), setTimeout(() => {
      this.render();
    });
  }
  render() {
    this.shareeEl = document.createElement("div"), this.shareeEl.classList.add("sharee__normal"), this.shareeEl.classList.add("sharee__" + this.sharee.lang.Direction), this.shareeEl.style.transition = "all " + this.sharee.options.showTransitionDuration, this.shareeEl.style.transitionProperty = "transform, opacity";
    for (let e of this.sharee.options.drivers) {
      if (!this.shouldRenderDriver(e))
        continue;
      const t = this.resolveDriver(e), n = new t(this.sharee.lang, {
        lang: this.sharee.lang,
        shareText: this.sharee.getShareText(),
        shareLink: this.sharee.getShareLink(),
        ripple: this.sharee.options.ripple
      }), o = this.renderDriver(n);
      this.shareeEl.appendChild(o);
    }
    this.sharee.targetElement.appendChild(this.shareeEl);
  }
  onDriverClick(e) {
    return (t) => {
      e.onClick(t);
    };
  }
  initDriverStyles(e) {
    var t, n;
    e.mainEl.style.backgroundColor = e.backgroundColor, e.mainEl.style.color = e.textColor, e.mainEl.style.transition = (((t = e.options) == null ? void 0 : t.transitionDuration) || "200ms") + " background, 1s max-width", (n = e.options) != null && n.ripple && this.initRipple(e);
  }
  initRipple(e) {
    e.rippleInitialized || (e.rippleInitialized = !0, import("ripple-effects").then((t) => {
      t.default(e.mainEl, {
        background: e.rippleColor
      });
    }));
  }
  renderDriver(e) {
    e.mainEl = document.createElement("a"), "getLink" in e && (e.mainEl.href = e.getLink()), this.initDriverStyles(e), this.listenDriverEvents(e);
    const t = document.createElement("div");
    t.innerHTML = e.icon;
    const n = document.createElement("div");
    return n.innerHTML = e.getButtonText(), e.mainEl.appendChild(t), this.options.noTitle ? (e.mainEl.title = e.getButtonText(), e.mainEl.classList.add("sharee__no-title")) : e.mainEl.appendChild(n), e.mainEl.classList.add("sharee__driver__" + e.getName()), e.mainEl;
  }
  listenDriverEvents(e) {
    const t = this.onDriverClick(e);
    this.driverListeners[e.buttonText] = [t], e.mainEl.addEventListener("click", t);
  }
}
export {
  u as default
};
