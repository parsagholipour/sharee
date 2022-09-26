import TelegramDriver from "./TelegramDriver";
import WhatsappDriver from "./WhatsappDriver";
import CopyDriver from "./CopyDriver";
import TwitterDriver from "./TwitterDriver";
import LinkedinDriver from "./LinkedinDriver";
import FacebookDriver from "./FacebookDriver";

export default new Object({
  telegram: TelegramDriver,
  whatsapp: WhatsappDriver,
  copy: CopyDriver,
  twitter: TwitterDriver,
  linkedin: LinkedinDriver,
  facebook: FacebookDriver,
})
