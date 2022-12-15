import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface SettingsOption {
  title: string;
  shortcut: string;
  filename: string;
}

export interface SwitcherSettings {
  settingsFolder: string;
  targetFilename: string;
  options: Array<SettingsOption>;
}

const switcherSettingsSchema: JSONSchemaType<SwitcherSettings> = {
  type: "object",
  properties: {
    settingsFolder: { type: "string" },
    targetFilename: { type: "string" },
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          shortcut: { type: "string" },
          filename: { type: "string" },
        },
        required: ["title", "shortcut", "filename"],
      },
    },
  },
  required: ["settingsFolder", "targetFilename", "options"],
};

const configValidator = ajv.compile(switcherSettingsSchema);

export const isConfig = (data: Record<string, any>): data is SwitcherSettings => {
  return configValidator(data);
};

export const getSwitchmanSettings = (): SwitcherSettings => {
  const settingsRaw = JSON.parse("./.vscode/settings.json");
  if (isConfig(settingsRaw.switchman)) {
    return settingsRaw.switchman;
  } else {
    throw new Error();
  }
};
