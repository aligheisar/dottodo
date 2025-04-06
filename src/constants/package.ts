import { packageJson } from "../types";
import { COMMANDS } from "./commands";
import { EXTENSION_NAME, TODO_PANEL_ID, TODO_VIEW_ID } from "./general";

const COMMANDS_CATEGORY = "DotTODO";

export const PACKAGE_JSON: packageJson = {
  name: EXTENSION_NAME,
  contributes: {
    commands: [
      {
        command: COMMANDS.INIT,
        title: "Initialize DotTODO",
        category: COMMANDS_CATEGORY,
      },
      {
        command: COMMANDS.ADD_TODO,
        title: "Add a new TODO",
        category: COMMANDS_CATEGORY,
      },
      {
        command: COMMANDS.REMOVE_TODO,
        title: "Remove a TODO",
        category: COMMANDS_CATEGORY,
      },
      {
        command: COMMANDS.UPDATE_TODO,
        title: "Update a TODO",
        category: COMMANDS_CATEGORY,
      },
    ],
    viewsContainers: {
      activitybar: [
        {
          id: TODO_VIEW_ID,
          title: "Dot TODO",
          icon: "$(tasklist)",
        },
      ],
    },
    views: {
      [TODO_VIEW_ID]: [
        {
          id: TODO_PANEL_ID,
          name: "Todos",
          type: "webview",
        },
      ],
    },
  },
};
