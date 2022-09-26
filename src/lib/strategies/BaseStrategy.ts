import Sharee from "../Sharee";
import Lang from "../../common/Lang";
import DriverOptions from "../../common/DriverOptions";
import Driver from "../drivers/Driver";
import drivers from '../drivers'

export default abstract class BaseStrategy {
  public abstract render(): void;
  public eventListeners: any[] = []

  protected abstract sharee: Sharee;

  protected resolveDriver(driverName: string):
    (new (lang: Lang, options: DriverOptions) => Driver) {
    if (drivers.hasOwnProperty(driverName)) {
      // @ts-ignore
      return drivers[driverName]
    } else {
      throw new Error(`Unknown driver: ${driverName}`)
    }
  }

  protected shouldRenderDriver(_driverName: string) {
    return true
  }

  public abstract reRender(): void;

  public abstract destroy(): void;
}

