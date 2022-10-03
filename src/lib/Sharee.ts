import ShareeOptions, {shareeDefaultOptions} from "../common/ShareeOptions";
import LangName from "../common/LangName";
import fa from '../locales/fa.json';
import Lang from "../common/Lang";
import BaseStrategy from "./strategies/BaseStrategy";
import strategies from "./strategies";
import merge from 'lodash.merge'
import '../assets/styles/style.css'
import drivers from './drivers'
import Driver from "./drivers/Driver";

export default class Sharee {
  public options: ShareeOptions;
  public lang: Lang = fa as Lang;
  protected strategy: BaseStrategy;
  public targetElement: HTMLElement;
  public static drivers = {...drivers};


  constructor(element: HTMLElement, options: ShareeOptions = shareeDefaultOptions) {
    this.targetElement = element;
    this.options = merge({}, shareeDefaultOptions, options);
    this.options.drivers = options.drivers || this.options.drivers // Shouldn't merge drivers
    // @ts-ignore
    const strategyClass: new(sharee: Sharee) => BaseStrategy = strategies[this.options.mode!]
    if (typeof strategyClass === 'undefined') {
      throw new Error('Selected mode \"' + options.mode + '\" not found')
    }
    this.strategy = new strategyClass(this);
    this.init().then(() => {
      this.strategy.render()
    });
  }

  public static addDriver(driverName: string, driver: typeof Driver) {
    // @ts-ignore
    this.drivers[driverName] = driver
  }

  protected async init() {
    // @ts-ignore
    this.targetElement.sharee = this;
    await this.setLang(this.options.lang!, this.options.langs);
  }

  protected async setLang(langName: LangName, customLangs: {[key: string]: Lang} = {}) {
    const langs = import.meta.glob('../locales/*.json');
    let lang: Lang = fa as Lang;
    for (const key in langs) {
      if (key.includes(langName)) {
        if (langs[key] instanceof Function) {
          // @ts-ignore
          lang = {...await langs[key]()}
        } else {
          // @ts-ignore
          lang = {...langs[key]}
        }
        if (customLangs[langName]) {
          merge(lang, customLangs[langName])
        }
      }
    }
    this.lang = lang;
  }

  public getShareText() {
    return this.options.shareText || document.title;
  }

  public getShareLink() {
    return this.options.shareLink || window.location.href
  }

  public destroy() {
    this.strategy.destroy()
  }
}
