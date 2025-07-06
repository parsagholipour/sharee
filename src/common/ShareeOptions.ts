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
  onDriverClick?: (e: any) => void;
}

const shareeDefaultOptions: ShareeOptions = {
  showTransitionDuration: '200ms',
  lang: 'fa',
  onLoad: () => {},
  drivers: ['copy', 'telegram', 'facebook', 'whatsapp', 'x', 'linkedin'],
  ripple: true,
  mode: 'normal'
}

export {shareeDefaultOptions};
