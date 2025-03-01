import { VSCodeAPI } from "../types";

let vscodeApi: VSCodeAPI | null = null;

export function getVSCodeApi(): VSCodeAPI {
  if (!vscodeApi) {
    vscodeApi = (window as any).acquireVsCodeApi();
  }
  return vscodeApi!;
}
