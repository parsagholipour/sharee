import LangName from "./LangName";
import Lang from "./Lang";

export default interface ShareeOptions {
  lang?: LangName;
  langs?: {[key: string]: Lang};
  onLoad?: Function;
  drivers?: string[];
  showTransitionDuration?: string;
  shareLink?: string;
  shareText?: string;
  ripple?: boolean;
  mode?: 'dropdown'|'text'|'normal'|'fixed'|'hover';
  modeOptions?: any;
}

const shareeDefaultOptions: ShareeOptions = {
  showTransitionDuration: '200ms',
  lang: 'fa',
  onLoad: () => {},
  drivers: ['copy', 'telegram', 'facebook', 'whatsapp', 'twitter', 'linkedin'],
  ripple: true,
  mode: 'normal'
}

export {shareeDefaultOptions};
