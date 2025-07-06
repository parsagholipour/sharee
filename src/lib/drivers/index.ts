import TelegramDriver from "./TelegramDriver";
import WhatsappDriver from "./WhatsappDriver";
import CopyDriver from "./CopyDriver";
import XDriver from "./XDriver";
import LinkedinDriver from "./LinkedinDriver";
import FacebookDriver from "./FacebookDriver";
import EitaaDriver from "./EitaaDriver";

export default new Object({
  telegram: TelegramDriver,
  whatsapp: WhatsappDriver,
  copy: CopyDriver,
  x: XDriver,
  twitter: XDriver,
  linkedin: LinkedinDriver,
  facebook: FacebookDriver,
  eitaa: EitaaDriver,
})
