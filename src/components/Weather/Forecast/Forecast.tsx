import { City } from "@/types/city";
import CityCard from "./CityCard.tsx/CityCard";
import { useEffect, useState } from "react";
import { useMainContext } from "@/components/Mainpage";
import { getWeatherForecast } from "@/lib/forecast";

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
        setForecastLoadStatus("success");
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
      <CityCard />
    </section>
  );
}
