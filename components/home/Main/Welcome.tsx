import React from "react";
import ModelSelect from "./ModelSelect";

export default function Welcome() {
  return (
    <div className="bg-yellow-300 w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-20">
      <ModelSelect />
      <div>Welcome</div>
      <div>Welcome</div>
    </div>
  );
}
