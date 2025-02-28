import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Settings, Todo } from "./types";
import { NoFolderOpen, SuccessInit } from "./messages";

export class TodoManager {
  private static getTodoFolderPath(workspaceRoot: string): string {
    return path.join(workspaceRoot, ".todo");
  }

  private static getSettingsPath(workspaceRoot: string): string {
    return path.join(workspaceRoot, ".todo", "settings.json");
  }

  private static getTodosPath(workspaceRoot: string): string {
    return path.join(workspaceRoot, ".todo", "todos.json");
  }

  public static initializeTodoFiles(): void {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      vscode.window.showErrorMessage(NoFolderOpen);
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
      const defaultSettings: Settings = {
        defaultPriority: "medium",
        showCompleted: true,
        sortBy: "created",
      };
      fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
    }

    if (!fs.existsSync(todosPath)) {
      const defaultTodos: Todo[] = [
        {
          id: 1,
          task: "Initialize ToDo extension",
          done: false,
          created: new Date().toISOString().split("T")[0],
          priority: "medium",
        },
      ];
      fs.writeFileSync(todosPath, JSON.stringify(defaultTodos, null, 2));
    }

    vscode.window.showInformationMessage(SuccessInit);
  }

  public static getTodos(): Todo[] {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      return [];
    }
    const todosPath = this.getTodosPath(workspaceRoot);
    if (!fs.existsSync(todosPath)) {
      return [];
    }
    try {
      const data = fs.readFileSync(todosPath, "utf8");
      return JSON.parse(data) as Todo[];
    } catch (error) {
      console.error("Error reading todos:", error);
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
