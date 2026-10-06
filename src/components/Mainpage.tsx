"use client";
import { createContext, useState } from "react";
import Weather from "./Weather/Weather";

export const mainContext = createContext<any>(null);

export default function Mainpage() {
  const [city, setCity] = useState<string>();

  return (
    <mainContext.Provider value={{ city, setCity }}>
      <Weather />
    </mainContext.Provider>
  );
}
