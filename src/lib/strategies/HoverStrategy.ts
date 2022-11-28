import Sharee from "../Sharee";
import Driver from "../drivers/Driver";
import DropdownStrategy from "./DropdownStrategy";

export default class HoverStrategy extends DropdownStrategy{
  constructor(sharee: Sharee) {
    super(sharee);
    this.options.type = 'row'
  }

  destroy() {
    super.destroy();
  }

  public render() {
    super.render();
    this.shareeEl.classList.add('sharee__text')
    this.shareeEl.classList.add('sharee__hover')
  }

  protected show() {
    this.shareeEl.classList.add('showing')
    setTimeout(() => {
      this.shareeEl.classList.add('show')
      const bCR = this.sharee.targetElement.getBoundingClientRect();
      const x = bCR.x;
      const y = bCR.y;
      if (this.sharee.lang.Direction === 'ltr') {
        this.shareeEl.style.left = `${x + (bCR.width / 2)}px`;
        this.shareeEl.style.right = 'unset';
      } else {
        this.shareeEl.style.right = `${x}px`;
        this.shareeEl.style.left = 'unset';
      }
      this.shareeEl.style.top = `${y + bCR.height}px`;
    })
  }

  protected listenEvents() {
    this.shareeEl.addEventListener('mouseenter', this.shareElOnMouseEnter.bind(this))
    this.shareeEl.addEventListener('mouseleave', this.shareElOnMouseLeave.bind(this))
    const onMouseEnter = this.elementOnMouseEnter.bind(this)
    const onMouseLeave = this.elementOnMouseLeave.bind(this)
    this.sharee.targetElement.addEventListener('mouseenter', onMouseEnter)
    this.sharee.targetElement.addEventListener('mouseleave', onMouseLeave)
    this.eventListeners.push([this.sharee.targetElement, 'mouseenter', onMouseEnter])
    this.eventListeners.push([this.sharee.targetElement, 'mouseleave', onMouseLeave])
  }

  public renderDriver(driver: Driver) {
    driver.mainEl = document.createElement('a');
    driver.mainEl.title = driver.getButtonText()
    if ('getLink' in driver) {
      // @ts-ignore
      driver.mainEl.href = driver.getLink();
    }
    this.initDriverStyles(driver)
    this.listenDriverEvents(driver);
    const icon = document.createElement('div');
    icon.innerHTML = driver.icon;
    driver.mainEl.appendChild(icon);

    return driver.mainEl;
  }

}
