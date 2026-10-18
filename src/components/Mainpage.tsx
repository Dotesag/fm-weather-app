"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Weather from "./Weather/Weather";
import type { City } from "@/types/city";

type MainContextType = {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
  apiError: boolean;
  setApiError: Dispatch<SetStateAction<boolean>>;
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
  const [apiError, setApiError] = useState<boolean>(false);

  return (
    <mainContext.Provider value={{ city, setCity, apiError, setApiError }}>
      <Weather />
    </mainContext.Provider>
  );
}
