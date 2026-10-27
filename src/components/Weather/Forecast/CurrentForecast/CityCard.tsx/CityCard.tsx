import { useMainContext } from "@/components/Mainpage";
import { getWeatherIcon } from "@/lib/forecast";
import Image from "next/image";
import { useForecastLoadStatusContext } from "../../Forecast";

export default function CityCard() {
  const { city, forecast } = useMainContext();
  const forecastLoadStatus = useForecastLoadStatusContext();
  return (
    <div
      className={`${forecastLoadStatus === "success" ? "bg-[url(/images/bg-today-large.svg)]" : "bg-block"} w-full h-58 bg-cover rounded-2xl `}
    >
      {forecastLoadStatus !== "loading" && forecast && (
        <div className="w-full h-full flex justify-between items-center p-5">
          <div>
            <h2 className="text-2xl font-bold">
              {city?.name}
              {city?.country ? ", " + city.country : ""}
            </h2>
            <p className="text-base text-neutral-200">
              {forecast.current.time.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Image
              src={getWeatherIcon(forecast.current.weather_code)}
              width={320}
              height={320}
              alt="Drizzle"
              className="w-20 h-20"
            />
            <p className="text-7xl font-bold italic">
              {Math.floor(forecast.current.temperature_2m)}°
            </p>
          </div>
        </div>
      )}
      {forecastLoadStatus !== "success" && (
        <div className="flex flex-col w-full h-full items-center justify-center gap-2">
          <div className="flex gap-2">
            <div className="loading-bulb animate-jump-1"> </div>
            <div className="loading-bulb animate-jump-2"> </div>
            <div className="loading-bulb animate-jump-3"> </div>
          </div>
          <p className="text-sm text-neutral-200">Loading...</p>
        </div>
      )}
    </div>
  );
}
