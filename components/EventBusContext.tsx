"use client";

import { Dispatch, ReactNode, createContext, useCallback, useContext, useMemo, useReducer, useState } from "react";

export type EventListener = (data?: any) => void;

type EventBusContextProps = {
  subscribe: (event: string, callback: EventListener) => void;
  unsubscribe: (event: string, callback: EventListener) => void;
  publish: (event: string, data?: any) => void;
};

const EventBusContext = createContext<EventBusContextProps>(null!);

// 方便在子組件中使用
export function useEventBusContext() {
  return useContext(EventBusContext);
}

export default function EventBusContextProvider({ children }: { children: ReactNode }) {
  const [listeners, setListeners] = useState<Record<string, EventListener[]>>({});

  //   訂閱事件
  const subscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
      setListeners({ ...listeners });
    },
    [listeners]
  );

  //   取消訂閱
  const unsubscribe = useCallback(
    (event: string, callback: EventListener) => {
      if (!listeners[event]) {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
        setListeners({ ...listeners });
      }
    },
    [listeners]
  );
  //   發布事件
  const publish = useCallback(
    (event: string, data?: any) => {
      if (listeners[event]) {
        listeners[event].forEach(cb => cb(data));
      }
    },
    [listeners]
  );

  //   一定要用useMemo包裹，否則每次都會重新創建對象，導致子組件重新渲染
  const contextValue = useMemo(() => {
    return { subscribe, unsubscribe, publish };
  }, [subscribe, unsubscribe, publish]);

  return <EventBusContext.Provider value={contextValue}>{children}</EventBusContext.Provider>;
}
