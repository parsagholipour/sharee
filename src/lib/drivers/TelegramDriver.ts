import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import TelegramSvg from '../../assets/icons/Telegram.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class TelegramDriver extends Driver implements hasLink {
  public buttonText: string = 'Telegram';
  public icon: string = TelegramSvg;
  public backgroundColor: string = '#0088CC';
  public backgroundHoverColor: string = '#0371aa';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://telegram.me/share/url?url=${this.options?.shareLink}&text=${encodeURIComponent(this.options?.shareText!)}`
  }
}
