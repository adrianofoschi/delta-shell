import app from "ags/gtk4/app";
import ScreenRecord from "./src/services/screenrecord";
import { hide_all_windows, windows_names } from "./windows";
import { hasBarItem, toggleQsModule, toggleWindow, bash } from "./src/lib/utils";
import { config } from "./options";
import Brightness from "./src/services/brightness";
const screenrecord = ScreenRecord.get_default();
const brightness = Brightness.get_default();

export default function request(
   args: string[],
   response: (res: string) => void,
): void {
   if (args[0] == "toggle" && args[1]) {
      switch (args[1]) {
         case "applauncher":
            toggleWindow(windows_names.applauncher);
            break;
         case "quicksettings":
            toggleWindow(windows_names.quicksettings);
            break;
         case "calendar":
            toggleWindow(windows_names.calendar);
            break;
         case "powermenu":
            toggleWindow(windows_names.powermenu);
            break;
         case "clipboard":
            toggleWindow(windows_names.clipboard);
            break;
         case "weather":
            toggleQsModule("weather");
            break;
         case "notificationslist":
            toggleQsModule("notificationslist");
            break;
         case "volume":
            toggleQsModule("volume");
            break;
         case "network":
            toggleQsModule("network");
            break;
         case "bluetooth":
            toggleQsModule("bluetooth");
            break;
         case "power":
            toggleQsModule("power", "battery");
            break;
         default:
            print("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   } else if (args[0] == "volume" && args[1]) {
      switch (args[1]) {
         case "up":
            bash("wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.05+");
            break;
         case "down":
            bash("wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.05-");
            break;
         case "mute":
            bash("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle");
            break;
         default:
            print("Unknown volume request:", args[1]);
            return response("Unknown volume request");
            break;
      }
      return response("ok");
   } else if (args[0] == "brightness" && args[1]) {
      switch (args[1]) {
         case "up":
            brightness.screen = Math.min(brightness.screen + 0.05, 1);
            break;
         case "down":
            brightness.screen = Math.max(brightness.screen - 0.05, 0);
            break;
         default:
            print("Unknown brightness request:", args[1]);
            return response("Unknown brightness request");
            break;
      }
      return response("ok");
   } else {
      switch (args[0]) {
         case "screenrecord":
            screenrecord.start();
            break;
         default:
            print("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   }
}
