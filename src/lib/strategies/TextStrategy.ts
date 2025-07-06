import Sharee from "../Sharee";
import {hasClass} from "../helpers";
import Driver from "../drivers/Driver";
import DropdownStrategy from "./DropdownStrategy";

export default class TextStrategy extends DropdownStrategy{
  constructor(sharee: Sharee) {
    super(sharee);
    this.options.type = 'row'
  }

  protected show() {
    this.shareeEl.classList.add('showing')
    setTimeout(() => {
      this.shareeEl.classList.add('show')
    })
  }

  protected getDistanceFromTop() {
    return (
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    )
  }

  protected getTooltipPosition() {
    // const { iconSize, buttonMargin, arrowSize, icons } = props

    let sel;
    try {
      sel = window!
        .getSelection()!
        .getRangeAt(0)
        .getBoundingClientRect()
    } catch (e) {
      return {left: 0, top: 0}
    }

    // const buttonSize = iconSize + buttonMargin
    const buttonSize = 30

    const top = sel.top
    const left = sel.left + (sel.width - buttonSize * this.sharee.options.drivers!.length) / 2

    return { top, left }
  }

  protected setPosition(e: MouseEvent) {
    this.shareeEl.style.right = 'unset';
    const {left, top} = this.getTooltipPosition()
    if (left === 0) {
      this.hide()
      return false
    }
    if (e.x + 300 > window.innerWidth) {
      // this.shareeEl.style.left = `${e.x - 200}px`;
      this.shareeEl.style.left = left + 'px';
    } else {
      // this.shareeEl.style.left = `${e.x}px`;
      this.shareeEl.style.left = left + 'px';
    }
    this.shareeEl.style.top = `${top + 26}px`;

    return true
  }

  protected shouldRenderDriver(_driverName: string) {
    if (_driverName === 'copy') {
      return  false
    }
    return true
  }

  protected getSelectedText() {
    try {
      window!
        .getSelection()!
        .getRangeAt(0)
    } catch (e) {
      return false
    }
    if (window.getSelection) {
      return window.getSelection()?.toString();
      // @ts-ignore
    } else if (typeof document.selection !== 'undefined') {
      // @ts-ignore
      return document.selection.createRange().text;
    }
    return '';
  }

  destroy() {
    super.destroy();
    window.removeEventListener('resize', this.windowOnResize)
  }

  public render() {
    super.render();
    this.shareeEl.classList.add('sharee__text')
  }

  protected documentOnClick(e: MouseEvent) {
    if (hasClass(e.target, 'sharee__text')) {
      return
    }
    this.hide()
  }

  protected elementOnMouseUp(e: MouseEvent) {
    const currentTarget = e.currentTarget
    setTimeout(() => {
      const text = this.getSelectedText()
      if (!text || hasClass(currentTarget, 'sharee__text')) return
      this.sharee.options.shareText = text
      this.reRender()
      setTimeout(() => {
        this.show()
        setTimeout(() => {
          this.setPosition(e)
        })
      })
    })
  }

  protected windowOnResize() {
    this.hide()
  }

  protected listenEvents() {
    const onMouseUp = this.elementOnMouseUp.bind(this)
    const documentOnClick = this.documentOnClick.bind(this)
    this.sharee.targetElement.addEventListener('mouseup', onMouseUp)
    document.addEventListener('click', documentOnClick)
    const windowOnResize = this.windowOnResize.bind(this)
    window.addEventListener('resize', windowOnResize)
    this.eventListeners.push([this.sharee.targetElement, 'mouseup', onMouseUp])
    this.eventListeners.push([document, 'click', documentOnClick])
    this.eventListeners.push([window, 'resize', windowOnResize])
  }

  public renderDriver(driver: Driver) {
    driver.mainEl = document.createElement('a');
    driver.mainEl.title = driver.getButtonText()
    if (driver.hasLink()) {
      // @ts-ignore
      driver.mainEl.href = driver.getLink();
    }
    this.initDriverStyles(driver)
    this.listenDriverEvents(driver);
    const icon = document.createElement('div');
    icon.innerHTML = driver.icon;
    driver.mainEl.appendChild(icon);

    return driver.mainEl;
  }

}
