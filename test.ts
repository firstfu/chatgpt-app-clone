// 初始狀態
const state = {
  prop1: "value1",
  prop2: "value2",
};

// 模擬一個 action 物件
const action = {
  field: "prop3",
  value: "value3",
};

// 執行更新狀態的操作
const newState = { ...state, [action.field]: action.value };

// 打印更新後的狀態
console.log(newState);
