var h = Object.defineProperty;
var a = (r, i, e) => i in r ? h(r, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[i] = e;
var n = (r, i, e) => (a(r, typeof i != "symbol" ? i + "" : i, e), e);
import l from "./BaseStrategy.js";
import E from "../../../node_modules/lodash.merge/index.js";
const m = {
  type: "column",
  animation: "fade-down"
};
class p extends l {
  constructor(e) {
    super();
    n(this, "sharee");
    n(this, "elementHovering", !1);
    n(this, "shareeElHovering", !1);
    n(this, "shareeEl");
    n(this, "driverListeners", {});
    n(this, "hideTimeout", 0);
    n(this, "options");
    this.sharee = e, this.shareeEl = document.createElement("div"), this.options = E({}, m, e.options.modeOptions);
  }
  show() {
    this.shareeEl.classList.add("showing"), setTimeout(() => {
      this.shareeEl.classList.add("show");
      const e = this.sharee.targetElement.getBoundingClientRect(), t = e.x, s = e.y;
      this.sharee.lang.Direction === "ltr" ? (this.shareeEl.style.left = `${t}px`, this.shareeEl.style.right = "unset") : (this.shareeEl.style.right = `${t}px`, this.shareeEl.style.left = "unset"), this.shareeEl.style.top = `${s + e.height}px`;
    });
  }
  hide() {
    var e;
    (e = this.shareeEl) == null || e.classList.remove("show"), clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => {
      var t;
      (t = this.shareeEl) == null || t.classList.remove("showing");
    }, Number.parseInt(this.sharee.options.showTransitionDuration));
  }
  elementOnMouseEnter() {
    this.elementHovering = !0, this.show();
  }
  elementOnMouseLeave() {
    setTimeout(() => this.elementHovering = !1), setTimeout(() => {
      this.shareeElHovering || this.hide();
    });
  }
  shareElOnMouseEnter() {
    this.elementHovering && this.show(), this.shareeElHovering = !0;
  }
  shareElOnMouseLeave() {
    setTimeout(() => this.shareeElHovering = !1), setTimeout(() => {
      this.elementHovering || this.hide();
    });
  }
  listenEvents() {
    this.shareeEl.addEventListener("mouseenter", this.shareElOnMouseEnter.bind(this)), this.shareeEl.addEventListener("mouseleave", this.shareElOnMouseLeave.bind(this));
    const e = this.elementOnMouseEnter.bind(this), t = this.elementOnMouseLeave.bind(this);
    this.sharee.targetElement.addEventListener("mouseenter", e), this.sharee.targetElement.addEventListener("mouseleave", t), this.eventListeners.push([this.sharee.targetElement, "mouseenter", e]), this.eventListeners.push([this.sharee.targetElement, "mouseleave", t]);
  }
  destroy() {
    window.shareeEl = this.shareeEl, this.eventListeners.forEach((e) => {
      e[0].removeEventListener(e[1], e[2]);
    }), this.shareeEl.parentElement.removeChild(this.shareeEl);
  }
  reRender() {
    this.destroy(), setTimeout(() => {
      this.render();
    });
  }
  render() {
    this.shareeEl = document.createElement("div"), this.shareeEl.classList.add("sharee__dropdown"), this.shareeEl.classList.add("sharee__" + this.sharee.lang.Direction), this.shareeEl.classList.add(this.options.animation), this.shareeEl.style.transition = "all " + this.sharee.options.showTransitionDuration, this.shareeEl.style.transitionProperty = "transform, opacity";
    for (let e of this.sharee.options.drivers) {
      if (!this.shouldRenderDriver(e))
        continue;
      const t = this.resolveDriver(e), s = new t(this.sharee.lang, {
        lang: this.sharee.lang,
        shareText: this.sharee.getShareText(),
        shareLink: this.sharee.getShareLink(),
        ripple: this.sharee.options.ripple
      }), o = this.renderDriver(s);
      this.shareeEl.appendChild(o);
    }
    document.body.appendChild(this.shareeEl), this.listenEvents(), this.options.type === "grid" ? this.shareeEl.classList.add("sharee__dropdown__grid") : this.options.type === "row" && this.shareeEl.classList.add("sharee__dropdown__row");
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
    var t, s;
    e.mainEl.style.backgroundColor = e.backgroundColor, e.mainEl.style.color = e.textColor, e.mainEl.style.transition = (((t = e.options) == null ? void 0 : t.transitionDuration) || "200ms") + " all", (s = e.options) != null && s.ripple && this.initRipple(e);
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
    const s = document.createElement("div");
    return s.innerHTML = e.getButtonText(), e.mainEl.appendChild(t), e.mainEl.appendChild(s), e.mainEl;
  }
  listenDriverEvents(e) {
    const t = this.onDriverMouseEnter(e), s = this.onDriverMouseLeave(e), o = this.onDriverClick(e);
    this.driverListeners[e.buttonText] = [t, s, o], e.mainEl.addEventListener("mouseenter", t), e.mainEl.addEventListener("mouseleave", s), e.mainEl.addEventListener("click", o);
  }
}
export {
  p as default
};
