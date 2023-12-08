"use client";

import { Dispatch, ReactNode, createContext, useContext, useMemo, useState } from "react";
import Button from "./common/Button";

type State = {
  // 是否顯示導航欄
  displayNavigation: boolean;
  themeMode: "dark" | "light";
};

type AppContextProps = {
  // 狀態類型
  state: State;
  // 狀態更新函數
  setState: Dispatch<React.SetStateAction<State>>;
};

const AppContext = createContext<AppContextProps>(null!);

export default function AppContextProvider({ children }: { children: ReactNode }) {
  console.log("AppContextProvider rendered");

  let [state, setState] = useState<State>({
    displayNavigation: true,
    themeMode: "light",
  });

  //   一定要用useMemo包裹，否則每次都會重新創建對象，導致子組件重新渲染
  const contextValue = useMemo(() => {
    return {
      state,
      setState,
    };
  }, [state, setState]);
  //   return <AppContext.Provider value={null!}>{children}</AppContext.Provider>;
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

// 方便在子組件中使用
export function useAppContext() {
  return useContext(AppContext);
}
