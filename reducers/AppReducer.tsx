import { Message } from "@/types/chat";

export type State = {
  // 是否顯示導航欄
  displayNavigation: boolean;
  themeMode: "dark" | "light";
  currentModel: string;
  messageList: Message[];
  streamingId: string;
};

// 更新屬性的操作類型
export enum ActionType {
  UPDATE = "UPDATE",
  ADD_MESSAGE = "ADD_MESSAGE",
  UPDATE_MESSAGE = "UPDATE_MESSAGE",
}

// 更新操作的參數類型
type UpdateAction = {
  type: ActionType.UPDATE;
  //   屬性名3
  field: string;
  //   屬性值
  value: any;
};

type MessageAction = {
  type: ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE;
  message: Message;
};

// 對外統一的操作類型
export type Action = UpdateAction | MessageAction;

// 默認狀態定義
export const initState: State = {
  displayNavigation: true,
  themeMode: "light",
  currentModel: "gpt-3.5-turbo",
  messageList: [],
  streamingId: "",
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, [action.field]: action.value };
      break;
    case ActionType.ADD_MESSAGE: {
      const messageList = state.messageList.concat([action.message]);
      return { ...state, messageList };
    }
    case ActionType.UPDATE_MESSAGE: {
      const messageList = state.messageList.map(message => {
        if (message.id === action.message.id) {
          return action.message;
        }
        return message;
      });
      return { ...state, messageList };
    }

    default:
      throw new Error();
  }
}
