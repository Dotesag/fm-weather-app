"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import WeatherBlock from "./Weather/WeatherBlock";
import type { City } from "@/types/city";
import Header from "./Header/Header";
import { Weather, type Units } from "@/types/weather";
import { getCityFromIP } from "@/lib/geocoding";

type MainContextType = {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
  apiError: boolean;
  setApiError: Dispatch<SetStateAction<boolean>>;
  onRetry: (() => void) | null;
  setOnRetry: Dispatch<SetStateAction<(() => void) | null>>;
  units: Units;
  setUnits: Dispatch<SetStateAction<Units>>;
  forecast: Weather | undefined;
  setForecast: Dispatch<SetStateAction<Weather | undefined>>;
};

export const mainContext = createContext<MainContextType | null>(null);

export function useMainContext() {
  const ctx = useContext(mainContext);
  if (!ctx) {
    throw new Error("Error while using useMainContext");
  }
  return ctx;
}

export default function Mainpage() {
  const [city, setCity] = useState<City>();
  const [apiError, setApiError] = useState<boolean>(false);
  const [onRetry, setOnRetry] = useState<(() => void) | null>(null);
  const [units, setUnits] = useState<Units>({
    windSpeed: "kmh",
    temperature: "celsius",
    precipitation: "mm",
  });
  const [forecast, setForecast] = useState<Weather>();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function loadCityFromIP() {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const ipCity = await getCityFromIP(abortControllerRef.current.signal);
        setCity((currentCity) => currentCity ?? ipCity);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error("Error while loading city from IP:", error);
      }
    }
    void loadCityFromIP();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <mainContext.Provider
      value={{
        city,
        setCity,
        apiError,
        setApiError,
        onRetry,
        setOnRetry,
        units,
        setUnits,
        forecast,
        setForecast,
      }}
    >
      <div className="flex flex-col items-center w-full px-5">
        <div className="flex flex-col w-full max-w-247">
          <Header />
          <WeatherBlock />
        </div>
      </div>
    </mainContext.Provider>
  );
}
