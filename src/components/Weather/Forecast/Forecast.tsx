import { City } from "@/types/city";
import { useEffect, useState, useContext, createContext } from "react";
import { useMainContext } from "@/components/Mainpage";
import { getWeatherForecast } from "@/lib/forecast";
import CurrentForecast from "./CurrentForecast/CurrentForecast";

export const forecastLoadStatusContext = createContext<
  "idle" | "loading" | "success" | "error"
>("idle");

export function useForecastLoadStatusContext() {
  const ctx = useContext(forecastLoadStatusContext);
  if (!ctx) {
    throw new Error("Error while using forecastLoadStatusContext");
  } else {
    return ctx;
  }
}

export default function Forecast() {
  const { setApiError, units, setForecast, city } = useMainContext();

  const [forecastLoadStatus, setForecastLoadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();

    async function loadForecast(city: City) {
      try {
        setForecastLoadStatus("loading");
        const loadedForecast = await getWeatherForecast(
          city.latitude,
          city.longitude,
          units.windSpeed,
          units.temperature,
          units.precipitation,
          controller.signal,
        );
        setForecast(loadedForecast);
        setTimeout(() => {
          setForecastLoadStatus("success");
        }, 0.3);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;

        setForecastLoadStatus("error");
        setApiError(true);
        console.error("Error while loading cities:", error);
      }
    }

    void loadForecast(city);

    return () => controller.abort();
  }, [city, units, setApiError, setForecast]);

  return (
    <section className="w-full h-full">
      <forecastLoadStatusContext.Provider value={forecastLoadStatus}>
        <CurrentForecast />
      </forecastLoadStatusContext.Provider>
    </section>
  );
}
