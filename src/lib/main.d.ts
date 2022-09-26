import ShareeOptions, {shareeDefaultOptions} from "../common/ShareeOptions";
import Lang from "../common/Lang";
import fa from "../locales/fa.json";
import BaseStrategy from "./strategies/BaseStrategy";

export default class Sharee {
  public options: ShareeOptions;
  public lang: Lang = fa as Lang;
  protected strategy: BaseStrategy;
  public targetElement: HTMLElement;

  constructor(element: HTMLElement, options: ShareeOptions = shareeDefaultOptions);

  public getShareText(): string;

  public getShareLink(): string;

  public destroy(): void;
}
