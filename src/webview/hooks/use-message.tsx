import { useEffect } from "react";
import { Message, Settings, Todo } from "../../types";
import { POST_COMMANDS } from "../../constants/commands";

interface MessagePayloadMap {
  [POST_COMMANDS.INIT]: any;
  [POST_COMMANDS.LOADED]: any;
  [POST_COMMANDS.UPDATE_TODO]: Todo[];
  [POST_COMMANDS.UPDATE_SETTINGS]: Settings;
}

type MessageHandlerMap = {
  [K in keyof MessagePayloadMap]?: (data: MessagePayloadMap[K]) => void;
};

type ValidMessage = {
  [K in keyof MessagePayloadMap]: Message<MessagePayloadMap[K]>;
}[keyof MessagePayloadMap];

export const useMessage = <T extends MessageHandlerMap>(handlers: T) => {
  useEffect(() => {
    const messageListener = (
      event: MessageEvent<Message<ValidMessage>>
    ): void => {
      const { command, data } = event.data;

      handlers[command]?.(data);
    };

    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);
};
