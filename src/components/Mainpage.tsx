"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import WeatherBlock from "./Weather/WeatherBlock";
import type { City } from "@/types/city";
import Header from "./Header/Header";
import { Weather, type Units } from "@/types/weather";

type MainContextType = {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
  apiError: boolean;
  setApiError: Dispatch<SetStateAction<boolean>>;
  units: Units;
  setUnits: Dispatch<SetStateAction<Units>>;
  forecast: Weather | undefined;
  setForecast: Dispatch<SetStateAction<Weather | undefined>>;
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
  const [units, setUnits] = useState<Units>({
    windSpeed: "kmh",
    temperature: "celsius",
    precipitation: "mm",
  });
  const [forecast, setForecast] = useState<Weather>();

  return (
    <mainContext.Provider
      value={{
        city,
        setCity,
        apiError,
        setApiError,
        units,
        setUnits,
        forecast,
        setForecast,
      }}
    >
      <div className="flex flex-col items-center w-full  ">
        <div className="flex flex-col w-full max-w-247 ">
          <Header />
          <WeatherBlock />
        </div>
      </div>
    </mainContext.Provider>
  );
}
