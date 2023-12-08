"use client";

import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation";
import React, { useState } from "react";

export default function Home() {
  return (
    <div className="h-full flex">
      <Navigation />
      <Main />
    </div>
  );
}
