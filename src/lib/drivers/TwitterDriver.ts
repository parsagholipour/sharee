import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import TwitterSvg from '../../assets/icons/Twitter.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class TwitterDriver extends Driver implements hasLink {
  public buttonText: string = 'Twitter';
  public icon: string = TwitterSvg;
  public backgroundColor: string = '#1DA1F2';
  public backgroundHoverColor: string = '#1a93dd';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://twitter.com/share?text=${encodeURIComponent(this.options?.shareText!)}&url=${this.options?.shareLink}`
  }
}
