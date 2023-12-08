"use client";

import { Dispatch, ReactNode, createContext, useState } from "react";

type State = {
  displayNavigation: boolean;
};

type AppContextProps = {
  state: State;
  setState: Dispatch<React.SetStateAction<State>>;
};

const AppContext = createContext<AppContextProps>(null!);

export default function AppContextProvider({ children }: { children: ReactNode }) {
  let [state, setState] = useState<State>();
  return <AppContext.Provider value={null!}>{children}</AppContext.Provider>;
}
