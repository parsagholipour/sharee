import BaseStrategy from "./BaseStrategy";
import Sharee from "../Sharee";
import Driver from "../drivers/Driver";
import merge from 'lodash.merge'

type DropdownStartegyOptions = {
  type?: 'column'|'row'|'grid',
  animation? :'fade'|'fade-down'
};

const defaultOptions: DropdownStartegyOptions = {
  type: 'column',
  animation: 'fade-down'
}


export default class DropdownStrategy extends BaseStrategy{
  protected sharee: Sharee;
  protected elementHovering = false;
  protected shareeElHovering = false;
  protected shareeEl: HTMLElement;
  protected driverListeners: Record<string, any[]> = {};
  protected hideTimeout = 0;
  protected options: DropdownStartegyOptions

  constructor(sharee: Sharee) {
    super();
    this.sharee = sharee;
    this.shareeEl = document.createElement('div');
    this.options = merge({}, defaultOptions, sharee.options.modeOptions)
  }


  protected show() {
    this.shareeEl.classList.add('showing')
    setTimeout(() => {
      this.shareeEl.classList.add('show')
      const bCR = this.sharee.targetElement.getBoundingClientRect();
      const x = bCR.x;
      const y = bCR.y;
      if (this.sharee.lang.Direction === 'ltr') {
        this.shareeEl.style.left = `${x}px`;
        this.shareeEl.style.right = 'unset';
      } else {
        this.shareeEl.style.right = `${x}px`;
        this.shareeEl.style.left = 'unset';
      }
      this.shareeEl.style.top = `${y + bCR.height}px`;
    })
  }

  protected hide() {
    this.shareeEl?.classList.remove('show')
    clearTimeout(this.hideTimeout)
    this.hideTimeout = setTimeout(() => {
      this.shareeEl?.classList.remove('showing')
    }, Number.parseInt(this.sharee.options.showTransitionDuration!))
  }


  protected elementOnMouseEnter() {
    this.elementHovering = true;
    this.show();
  }

  protected elementOnMouseLeave() {
    setTimeout(() => this.elementHovering = false)
    setTimeout(() => {
      if (!this.shareeElHovering) {
        this.hide();
      }
    })
  }

  protected shareElOnMouseEnter() {
    if (this.elementHovering) {
      this.show()
    }
    this.shareeElHovering = true;
  }

  protected shareElOnMouseLeave() {
    setTimeout(() => this.shareeElHovering = false)
    setTimeout(() => {
      if (!this.elementHovering) {
        this.hide();
      }
    })
  }

  protected listenEvents() {
    this.shareeEl.addEventListener('mouseenter', this.shareElOnMouseEnter.bind(this))
    this.shareeEl.addEventListener('mouseleave', this.shareElOnMouseLeave.bind(this))
    const onMouseEnter = this.elementOnMouseEnter.bind(this)
    const onMouseLeave = this.elementOnMouseLeave.bind(this)
    this.sharee.targetElement.addEventListener('mouseenter', onMouseEnter)
    this.sharee.targetElement.addEventListener('mouseleave', onMouseLeave)
    this.eventListeners.push([this.sharee.targetElement, 'mouseenter', onMouseEnter])
    this.eventListeners.push([this.sharee.targetElement, 'mouseleave', onMouseLeave])
  }

  public destroy() {
    // @ts-ignore
    window.shareeEl = this.shareeEl
    this.eventListeners.forEach(e => {
      e[0].removeEventListener(e[1], e[2])
    })
    this.shareeEl.parentElement?.removeChild(this.shareeEl)
  }

  public reRender() {
    this.destroy()
    setTimeout(() => {
      this.render()
    })
  }

  public render(): void {
    this.shareeEl = document.createElement('div');
    this.shareeEl.classList.add('sharee__dropdown')
    this.shareeEl.classList.add('sharee__' + this.sharee.lang.Direction)
    this.shareeEl.classList.add(this.options.animation!)
    this.shareeEl.style.transition = 'all ' + this.sharee.options.showTransitionDuration
    this.shareeEl.style.transitionProperty = 'transform, opacity'
    for (let driverName of this.sharee.options.drivers!) {
      if (!this.shouldRenderDriver(driverName)) {
        continue
      }
      const driverClass = this.resolveDriver(driverName)
      const driver: Driver = new driverClass(this.sharee.lang, {
        lang: this.sharee.lang,
        shareText: this.sharee.getShareText(),
        shareLink: this.sharee.getShareLink(),
        ripple: this.sharee.options.ripple!
      });
      const driverEl = this.renderDriver(driver);
      this.shareeEl.appendChild(driverEl);
    }

    document.body.appendChild(this.shareeEl)
    this.listenEvents();

    if (this.options.type === 'grid') {
      this.shareeEl.classList.add('sharee__dropdown__grid')
    } else if (this.options.type === 'row') {
      this.shareeEl.classList.add('sharee__dropdown__row')
    }
  }



  protected onDriverMouseEnter(driver: Driver) {
    return () => {
      driver.mainEl!.style.backgroundColor = driver.backgroundHoverColor;
      driver.mainEl!.style.color = driver.textHoverColor;
    }
  }

  protected onDriverMouseLeave(driver: Driver) {
    return () => {
      this.initDriverStyles(driver);
    }
  }

  protected onDriverClick(driver: Driver) {
    return (e: MouseEvent) => {
      driver.onClick(e);
    }
  }

  protected initDriverStyles(driver: Driver) {
    driver.mainEl!.style.backgroundColor = driver.backgroundColor;
    driver.mainEl!.style.color = driver.textColor;
    driver.mainEl!.style.transition= (driver.options?.transitionDuration || '200ms') + ' all'

    if (driver.options?.ripple) {
      this.initRipple(driver)
    }
  }

  protected initRipple(driver: Driver) {
    if (driver.rippleInitialized) return;
    driver.rippleInitialized = true;
    import("ripple-effects").then(ripple => {
      ripple.default(driver.mainEl!, {
        background: driver.rippleColor
      })
    })
  }

  public renderDriver(driver: Driver) {
    driver.mainEl = document.createElement('a');
    if ('getLink' in driver) {
      // @ts-ignore
      driver.mainEl.href = driver.getLink();
    }
    this.initDriverStyles(driver)
    this.listenDriverEvents(driver);
    const icon = document.createElement('div');
    icon.innerHTML = driver.icon;
    const text = document.createElement('div');
    text.innerHTML = driver.getButtonText();
    driver.mainEl.appendChild(icon);
    driver.mainEl.appendChild(text);

    return driver.mainEl;
  }

  protected listenDriverEvents(driver: Driver) {
    const onDriverMouseEnter = this.onDriverMouseEnter(driver)
    const onDriverMouseLeave = this.onDriverMouseLeave(driver)
    const onDriverClick = this.onDriverClick(driver)
    this.driverListeners[driver.buttonText] = [onDriverMouseEnter, onDriverMouseLeave, onDriverClick]
    driver.mainEl!.addEventListener('mouseenter', onDriverMouseEnter);
    driver.mainEl!.addEventListener('mouseleave', onDriverMouseLeave);
    driver.mainEl!.addEventListener('click', onDriverClick);
  }
}
