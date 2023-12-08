export type State = {
  // 是否顯示導航欄
  displayNavigation: boolean;
  themeMode: "dark" | "light";
  currentModel: string;
};

// 更新屬性的操作類型
export enum ActionType {
  UPDATE = "UPDATE",
}

// 更新操作的參數類型
type UpdateAction = {
  type: ActionType.UPDATE;
  //   屬性名
  field: string;
  //   屬性值
  value: any;
};

// 對外統一的操作類型
export type Action = UpdateAction;

// 默認狀態定義
export const initState: State = {
  displayNavigation: true,
  themeMode: "light",
  currentModel: "gpt-3.5-turbo",
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, [action.field]: action.value };
      break;

    default:
      throw new Error();
  }
}
