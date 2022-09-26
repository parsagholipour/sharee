import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import FacebookSvg from '../../assets/icons/Facebook.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class FacebookDriver extends Driver implements hasLink {
  public buttonText: string = 'Facebook';
  public icon: string = FacebookSvg;
  public backgroundColor: string = '#4267B2';
  public backgroundHoverColor: string = '#355696';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://twitter.com/share?text=${encodeURIComponent(this.options?.shareText!)}&url=${this.options?.shareLink}`
  }
}
