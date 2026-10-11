"use client";
import { createContext, useState, Dispatch, SetStateAction,useContext } from "react";
import Weather from "./Weather/Weather";
import type { City } from "@/types/city";

type MainContextType = {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
};

export const mainContext = createContext<MainContextType | null>(null);

export function useMainContext() {
  const ctx = useContext(mainContext);
  if (!ctx) {
    throw new Error("useMainContext must be used within Mainpage");
  }
  return ctx;
}

export default function Mainpage() {
  const [city, setCity] = useState<City>();

  return (
    <mainContext.Provider value={{ city, setCity }}>
      <Weather />
    </mainContext.Provider>
  );
}
