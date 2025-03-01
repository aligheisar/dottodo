import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Todo } from "./types";
import { ERRORS, SUCCESS } from "./messages";
import {
  EXTENSION_FILE_NAMES,
  EXTENSION_FOLDER_NAME,
} from "./constants/general";
import { DEFAULT_SETTINGS, DEFAULT_TODOS } from "./constants/defaults";

export class TodoManager {
  private static getTodoFolderPath(workspaceRoot: string): string {
    return path.join(workspaceRoot, EXTENSION_FOLDER_NAME);
  }

  private static getSettingsPath(workspaceRoot: string): string {
    return path.join(
      workspaceRoot,
      EXTENSION_FOLDER_NAME,
      EXTENSION_FILE_NAMES.settings
    );
  }

  private static getTodosPath(workspaceRoot: string): string {
    return path.join(
      workspaceRoot,
      EXTENSION_FOLDER_NAME,
      EXTENSION_FILE_NAMES.todos
    );
  }

  public static initializeTodoFiles(): void {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      vscode.window.showErrorMessage(ERRORS.NoFolderOpen);
      return;
    }

    const todoFolder = this.getTodoFolderPath(workspaceRoot);
    const settingsPath = this.getSettingsPath(workspaceRoot);
    const todosPath = this.getTodosPath(workspaceRoot);

    if (!fs.existsSync(todoFolder)) {
      fs.mkdirSync(todoFolder, { recursive: true });
      this.setHiddenAttribute(todoFolder);
    }

    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    }

    if (!fs.existsSync(todosPath)) {
      fs.writeFileSync(todosPath, JSON.stringify(DEFAULT_TODOS, null, 2));
    }

    vscode.window.showInformationMessage(SUCCESS.init);
  }

  public static getTodos(): Todo[] | null {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      return null;
    }
    const todosPath = this.getTodosPath(workspaceRoot);
    if (!fs.existsSync(todosPath)) {
      return null;
    }
    try {
      const data = fs.readFileSync(todosPath, "utf8");
      return JSON.parse(data) as Todo[];
    } catch (error) {
      console.error("Error reading todos:", error);
      fs.writeFileSync(todosPath, JSON.stringify(DEFAULT_TODOS, null, 2));
      return [];
    }
  }

  private static setHiddenAttribute(folderPath: string): void {
    if (process.platform === "win32") {
      try {
        const { execSync } = require("child_process");
        execSync(`attrib +h "${folderPath}"`);
      } catch (error) {
        console.error("Failed to set hidden attribute:", error);
      }
    }
  }
}
