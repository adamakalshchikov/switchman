import { copyFile, unlink } from "fs";
import { SwitcherSettings } from "../core";
import { ICommand } from "./interfaces";

interface SwitchConfigParams {
  configShortcut: string;
}

class SwitchConfig implements ICommand {
  params: SwitchConfigParams;

  constructor(params: SwitchConfigParams) {
    this.params = params;
  }

  private deleteOldTarget(settings: SwitcherSettings): void {
    unlink(settings.targetFilename, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${settings.targetFilename} deleted`);
    });
  }

  private copyChoosenConfigAsTarget(settings: SwitcherSettings, choosenConfig: string): void {
    copyFile(choosenConfig, settings.targetFilename, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${choosenConfig} copy as ${settings.targetFilename}`);
    });
  }

  execute(settings: SwitcherSettings) {
    // TODO сделать spotlight поиск
    const filteredConfigs = settings.options.filter(
      (opt) => opt.title === this.params.configShortcut
    );
    if (filteredConfigs.length === 1) {
      const cfg = filteredConfigs[0];
      this.deleteOldTarget(settings);
      this.copyChoosenConfigAsTarget(settings, cfg.filename);
    } else {
      console.error("More thant 1 config");
    }
  }
}
