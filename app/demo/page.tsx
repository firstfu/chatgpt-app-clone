"use client";

import React, { use, useEffect } from "react";
import styles from "./demo.module.css";
import { getOpenAIKey } from "./util/getOpenkey";

export default function DemoPage() {
  useEffect(() => {
    getOpenAIKey().then(res => {
      console.log("🚀 ~ file: page.tsx:10 ~ useEffect ~ res:", res);
    });
    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <div className={`w-full h-full  ${styles.test}`}>
      <h1>Demo Page</h1>
    </div>
  );
}
