"use client";

import React, { useState } from "react";

export default function TestButton() {
  const [count, setCount] = useState(0);

  let handleClick = () => {
    console.log("kkk");
    setCount(count => count + 1);
  };

  return (
    <div className="flex flex-row  bg-yellow-200">
      <button onClick={handleClick} className="">
        按鈕
      </button>
    </div>
  );
}
