import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import XSvg from '../../assets/icons/X.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class XDriver extends Driver implements hasLink {
  public buttonText: string = 'X_com';
  public icon: string = XSvg;
  public backgroundColor: string = '#0f1419';
  public backgroundHoverColor: string = '#222732';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://X_com/intent/post?text=${encodeURIComponent(this.options?.shareText!)}&url=${encodeURIComponent(this.options?.shareLink!)}`
  }
}
