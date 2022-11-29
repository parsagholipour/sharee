import BaseStrategy from "./BaseStrategy";
import Sharee from "../Sharee";
import Driver from "../drivers/Driver";
import merge from 'lodash.merge'

type NormalStartegyOptions = {
  noTitle?: Boolean
};

const defaultOptions: NormalStartegyOptions = {
  noTitle: false
}

export default class NormalStrategy extends BaseStrategy {
  protected sharee: Sharee;
  protected elementHovering = false;
  protected shareeElHovering = false;
  protected shareeEl: HTMLElement;
  protected driverListeners: Record<string, any[]> = {};
  protected hideTimeout = 0;
  protected options: NormalStartegyOptions

  constructor(sharee: Sharee) {
    super();
    this.sharee = sharee;
    this.shareeEl = document.createElement('div');
    this.options = merge({}, defaultOptions, sharee.options.modeOptions)
  }

  protected hide() {
    this.shareeEl?.classList.remove('show')
    clearTimeout(this.hideTimeout)
    this.hideTimeout = setTimeout(() => {
      this.shareeEl?.classList.remove('showing')
    }, Number.parseInt(this.sharee.options.showTransitionDuration!))
  }



  public destroy() {
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
    this.shareeEl.classList.add('sharee__normal')
    this.shareeEl.classList.add('sharee__' + this.sharee.lang.Direction)
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

    this.sharee.targetElement.appendChild(this.shareeEl)
  }



  protected onDriverClick(driver: Driver) {
    return (e: MouseEvent) => {
      driver.onClick(e);
    }
  }

  protected initDriverStyles(driver: Driver) {
    driver.mainEl!.style.backgroundColor = driver.backgroundColor;
    driver.mainEl!.style.color = driver.textColor;
    driver.mainEl!.style.transition = (driver.options?.transitionDuration || '200ms') + ' background, 1s max-width'

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

    if (!this.options.noTitle) {
      driver.mainEl.appendChild(text);
    } else {
      driver.mainEl.title = driver.getButtonText();
      driver.mainEl.classList.add('sharee__no-title');
    }
    driver.mainEl.classList.add('sharee__driver__' + driver.getName());

    return driver.mainEl;
  }

  protected listenDriverEvents(driver: Driver) {
    const onDriverClick = this.onDriverClick(driver)
    this.driverListeners[driver.buttonText] = [onDriverClick]
    driver.mainEl!.addEventListener('click', onDriverClick);
  }
}
