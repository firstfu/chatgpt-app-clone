import React from "react";

import { PiLightningFill, PiShootingStarFill } from "react-icons/pi";

export default function ModelSelect() {
  const models = [
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5",
      icon: PiLightningFill,
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      icon: PiShootingStarFill,
    },
  ];

  return <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded">ModelSelect</div>;
}
