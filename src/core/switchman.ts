import { SwitcherSettings } from "./settings";
import { ICommand } from "../commands";
//
export class Switchman {
  private _settings: SwitcherSettings;

  constructor(settings: SwitcherSettings) {
    this._settings = settings;
  }

  get settings(): SwitcherSettings {
    return this._settings;
  }

  set settings(settings: SwitcherSettings) {
    this._settings = settings;
  }

  public executeCommand(command: ICommand) {
    command.execute(this.settings);
  }
}
