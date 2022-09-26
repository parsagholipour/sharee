import { hasClass as n } from "../helpers/index.js";
import o from "./DropdownStrategy.js";
class a extends o {
  constructor(e) {
    super(e), this.options.type = "row";
  }
  show() {
    this.shareeEl.classList.add("showing"), setTimeout(() => {
      this.shareeEl.classList.add("show");
    });
  }
  getDistanceFromTop() {
    return window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }
  getTooltipPosition() {
    let e;
    try {
      e = window.getSelection().getRangeAt(0).getBoundingClientRect();
    } catch {
      return { left: 0, top: 0 };
    }
    const t = 30, s = e.top, i = e.left + (e.width - t * this.sharee.options.drivers.length) / 2;
    return { top: s, left: i };
  }
  setPosition(e) {
    this.shareeEl.style.right = "unset";
    const { left: t, top: s } = this.getTooltipPosition();
    return t === 0 ? (this.hide(), !1) : (e.x + 300 > window.innerWidth ? this.shareeEl.style.left = t + "px" : this.shareeEl.style.left = t + "px", this.shareeEl.style.top = `${s + 26}px`, !0);
  }
  shouldRenderDriver(e) {
    return e !== "copy";
  }
  getSelectedText() {
    var e;
    try {
      window.getSelection().getRangeAt(0);
    } catch {
      return !1;
    }
    return window.getSelection ? (e = window.getSelection()) == null ? void 0 : e.toString() : typeof document.selection < "u" ? document.selection.createRange().text : "";
  }
  destroy() {
    super.destroy(), window.removeEventListener("resize", this.windowOnResize);
  }
  render() {
    super.render(), this.shareeEl.classList.add("sharee__text");
  }
  documentOnClick(e) {
    n(e.target, "sharee__text") || this.hide();
  }
  elementOnMouseUp(e) {
    const t = e.currentTarget;
    setTimeout(() => {
      const s = this.getSelectedText();
      !s || n(t, "sharee__text") || (this.sharee.options.shareText = s, this.reRender(), setTimeout(() => {
        this.show(), setTimeout(() => {
          this.setPosition(e);
        });
      }));
    });
  }
  windowOnResize() {
    this.hide();
  }
  listenEvents() {
    const e = this.elementOnMouseUp.bind(this), t = this.documentOnClick.bind(this);
    this.sharee.targetElement.addEventListener("mouseup", e), document.addEventListener("click", t);
    const s = this.windowOnResize.bind(this);
    window.addEventListener("resize", s), this.eventListeners.push([this.sharee.targetElement, "mouseup", e]), this.eventListeners.push([document, "click", t]), this.eventListeners.push([window, "resize", s]);
  }
  renderDriver(e) {
    e.mainEl = document.createElement("a"), e.mainEl.title = e.getButtonText(), "getLink" in e && (e.mainEl.href = e.getLink()), this.initDriverStyles(e), this.listenDriverEvents(e);
    const t = document.createElement("div");
    return t.innerHTML = e.icon, e.mainEl.appendChild(t), e.mainEl;
  }
}
export {
  a as default
};
