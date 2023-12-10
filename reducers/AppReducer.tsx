import { Chat, Message } from "@/types/chat";

export type State = {
  displayNavigation: boolean;
  themeMode: "dark" | "light";
  currentModel: string;
  messageList: Message[];
  streamingId: string;
  selectedChat?: Chat;
};

// 更新屬性的操作類型
export enum ActionType {
  UPDATE = "UPDATE",
  ADD_MESSAGE = "ADD_MESSAGE",
  UPDATE_MESSAGE = "UPDATE_MESSAGE",
  REMOVE_MESSAGE = "REMOVE_MESSAGE",
}

type MessageAction = {
  type: ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE | ActionType.REMOVE_MESSAGE;
  message: Message;
};

// 更新操作的參數類型
type UpdateAction = {
  type: ActionType.UPDATE;
  //   屬性名
  field: string;
  //   屬性值
  value: any;
};

// 對外統一的操作類型
export type Action = UpdateAction | MessageAction;

// 默認狀態定義
export const initState: State = {
  displayNavigation: true,
  themeMode: "dark",
  currentModel: "gpt-3.5-turbo",
  messageList: [],
  streamingId: "",
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE:
      const rs = { ...state, [action.field]: action.value };
      console.log("🚀 ~ file: AppReducer.tsx:50 ~ reducer ~ rs:", rs);
      return rs;
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
    case ActionType.REMOVE_MESSAGE: {
      const messageList = state.messageList.filter(message => {
        return message.id !== action.message.id;
      });
      return { ...state, messageList };
    }

    default:
      throw new Error();
  }
}
