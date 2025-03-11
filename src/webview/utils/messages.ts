import { POST_COMMANDS } from "../../constants/commands";
import { Message } from "../../types";
import { getVSCodeApi } from "../VsCodeApi";

const vscode = getVSCodeApi();

export const initMessage = () => {
  vscode.postMessage<Message>({
    command: POST_COMMANDS.INIT,
  });
};
