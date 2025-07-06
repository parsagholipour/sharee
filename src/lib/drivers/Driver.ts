import DriverOptions from "../../common/DriverOptions";
import Lang from "../../common/Lang";

export default abstract class Driver {
  public abstract icon: string;
  public lang: Lang;
  public mainEl: HTMLElement|null = null;
  public abstract buttonText: string;
  public options: DriverOptions|undefined;
  public abstract textColor: string;
  public abstract textHoverColor: string;
  public abstract backgroundColor: string;
  public abstract backgroundHoverColor: string;
  public rippleColor: string = '#ffffff75';
  public rippleInitialized: boolean = false;

  constructor(lang: Lang, options?: DriverOptions) {
    this.options = options;
    this.lang = lang;
  }

  public getButtonText() {
    // @ts-ignore
    return this.lang[this.buttonText.replaceAll(' ', '_')] || this.buttonText;
  }

  public onClick(_e: MouseEvent) {
    const event = new CustomEvent('driver-clicked', {
      detail: {
        name: this.getName(),
        link: this.getLink(),
        originalEvent: _e,
      },
      bubbles: true,
      composed: true,
    });
    this.options?.targetElement.dispatchEvent(event);
  }

  public getName() {
    return this.constructor.name
  }

  getLink(): string | undefined {
    return undefined;
  }

  public hasLink() {
    return this.getLink() !== undefined;
  }
}
