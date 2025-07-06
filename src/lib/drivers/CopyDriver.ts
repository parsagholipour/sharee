import Driver from './Driver';
import DriverOptions from "../../common/DriverOptions";
import CopySvg from '../../assets/icons/Copy.svg?raw';
import Lang from "../../common/Lang";

export default class CopyDriver extends Driver {
  public buttonText: string = 'Copy Link';
  public icon: string = CopySvg;
  public backgroundColor: string = '#797979';
  public backgroundHoverColor: string = '#5e5e5e';
  public textColor: string = '#fff';
  public textHoverColor: string = '#fff';
  public timeout: number = 0;

  constructor(lang: Lang, options: DriverOptions) {
    super(lang, options);
  }

  public onClick(e: MouseEvent) {
    super.onClick(e);
    if (e.defaultPrevented)
      return;
    const successText = this.lang['CopiedSuccessfully']
    const el: HTMLElement = e.currentTarget! as HTMLElement;
    const textEl: HTMLElement = el.querySelector('div:nth-child(2)')!
    if (textEl.innerHTML === successText) {
      textEl.innerHTML = this.getButtonText()
      return
    }
    let copyText = window.location.href;
    navigator.clipboard.writeText(copyText).then(() => {
      textEl.innerHTML = successText!
      textEl.style.transition = '300ms all'
      textEl.style.transform = 'scale(1)'
      textEl.style.transform = `scale(1.07) translateX(${this.lang.Direction === 'rtl' ? '-' : ''}4px)`
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        textEl.innerHTML = this.getButtonText()
        textEl.style.transition = 'none'
        textEl.style.transform = 'scale(1)'
      }, 5000)
    });
  }
}
