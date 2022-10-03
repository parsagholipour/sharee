import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import LinkedinSvg from '../../assets/icons/Linkedin.svg?raw';
import Lang from "../../common/Lang";
import hasLink from "./HasLink";

export default class LinkedinDriver extends Driver implements hasLink {
  public buttonText: string = 'Linkedin';
  public icon: string = LinkedinSvg;
  public backgroundColor: string = '#0077B5';
  public backgroundHoverColor: string = '#026092';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  getLink(): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${this.options?.shareLink}`
  }
}
