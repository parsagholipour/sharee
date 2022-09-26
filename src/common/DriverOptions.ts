import Lang from "./Lang";

export default interface DriverOptions {
  lang: Lang;
  shareLink: string;
  shareText: string;
  ripple: boolean;
  transitionDuration?: string;
}
