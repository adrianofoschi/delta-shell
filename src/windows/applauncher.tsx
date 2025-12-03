import { windows_names } from "@/windows";
import { BarItemPopup } from "../widgets/baritempopup";
import { Popup } from "../widgets/popup";
import { config } from "@/options";
import { AppLauncherModule } from "../modules/applauncher/applauncher";
import { Gtk } from "ags/gtk4";
const { width, height } = config.launcher;
const isCenteredPopup = config.launcher["centered-popup"];

export function AppLauncherWindow() {
   if (isCenteredPopup) {
      return (
         <Popup
            name={windows_names.applauncher}
            width={width}
            height={height}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            margin_top={0}
            margin_bottom={0}
            margin_start={0}
            margin_end={0}
            transitionType={Gtk.RevealerTransitionType.CROSSFADE}
         >
            <AppLauncherModule />
         </Popup>
      );
   } else {
      return (
         <BarItemPopup
            name={windows_names.applauncher}
            module={"launcher"}
            width={width}
            height={height}
         >
            <AppLauncherModule />
         </BarItemPopup>
      );
   }
}
