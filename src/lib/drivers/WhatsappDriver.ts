import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import WhatsappSvg from '../../assets/icons/Whatsapp.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class WhatsappDriver extends Driver implements hasLink {
  public buttonText: string = 'Whatsapp';
  public icon: string = WhatsappSvg;
  public backgroundColor: string = '#25D366';
  public backgroundHoverColor: string = '#20bd5a';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    const text = [this.options?.shareText ?? '', this.options?.shareLink ?? ''].filter(Boolean).join('\n');
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }
}
