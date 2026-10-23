import { City } from "@/types/city";
import CityCard from "./CityCard.tsx/CityCard";
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "@/components/Mainpage";
import { getWeatherForecast } from "@/lib/forecast";

export default function Forecast() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const { setApiError, units, setForecast, city } = useMainContext();

  const [forecastLoadStatus, setForecastLoadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function loadForecast(city: City) {
    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setForecastLoadStatus("loading");
      const loadedForecast = await getWeatherForecast(
        city.latitude,
        city.longitude,
        units.windSpeed,
        units.temperature,
        units.precipitation,
        abortControllerRef.current.signal,
      );
      setForecast(loadedForecast);
      setForecastLoadStatus("success");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      setForecastLoadStatus("error");
      setApiError(true);
      console.error("Error while loading cities:", error);
    }
  }

  useEffect(() => {
    if (!city) return;
    loadForecast(city);
  }, [city]);

  return (
    <section className="w-full h-full">
      <CityCard />
    </section>
  );
}
