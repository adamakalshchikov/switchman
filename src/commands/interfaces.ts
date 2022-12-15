import { SwitcherSettings } from "../core";

export interface ICommand {
    execute: (settings: SwitcherSettings) => void;
}