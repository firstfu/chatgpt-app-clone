"use client";

import { useAppContext } from "@/components/AppContext";
import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation";
import React, { useState } from "react";

export default function Home() {
  const { state } = useAppContext();

  return (
    <div className={`h-screen flex dark`}>
      <Navigation />
      <Main />
    </div>
  );
}
