import Lang from "./Lang";

export default interface DriverOptions {
  lang: Lang;
  targetElement: HTMLElement;
  shareLink: string;
  shareText: string;
  ripple: boolean;
  transitionDuration?: string;
}
