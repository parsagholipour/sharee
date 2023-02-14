import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import EitaaSvg from '../../assets/icons/Eitaa.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class TelegramDriver extends Driver implements hasLink {
  public buttonText: string = 'Eitaa';
  public icon: string = EitaaSvg;
  public backgroundColor: string = '#e3791c';
  public backgroundHoverColor: string = '#d5721a';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://eitaa.com/share/url?url=${this.options?.shareLink}&text=${encodeURIComponent(this.options?.shareText!)}`
  }
}
