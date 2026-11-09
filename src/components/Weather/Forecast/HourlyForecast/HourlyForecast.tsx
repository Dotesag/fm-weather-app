import Image from "next/image";
import { useForecastLoadStatusContext } from "../Forecast";
import { useEffect, useState } from "react";
import { useMainContext } from "@/components/Mainpage";
import { HourlyWeather } from "@/types/weather";
import { getWeatherIcon } from "@/lib/forecast";

export default function HourlyForecast() {
  const { forecast } = useMainContext();

  const hourlyWeather: HourlyWeather[] = forecast
    ? forecast.hourly.time.map((time, i) => ({
        time,
        temperature_2m: forecast.hourly.temperature_2m[i],
        weather_code: forecast.hourly.weather_code[i],
      }))
    : Array.from({ length: 24 });

  const [showingDay, setShowingDay] = useState<number>(0);

  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const target = document.getElementById("currentAndDaily");
    if (!target) return;

    const update = () => {
      setHeight(target.getBoundingClientRect().height);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const forecastLoadStatus = useForecastLoadStatusContext();

  return (
    <div
      className={`grow bg-block rounded-2xl py-5 flex flex-col gap-3`}
      style={{ height: height }}
    >
      <div className="flex justify-between items-center px-5">
        <h2>Hourly forecast</h2>
        <button
          className={`bg-neutral-600 py-1 px-3.5 rounded-md flex gap-2 text-sm items-center ${forecastLoadStatus === "success" ? "cursor-pointer" : "pointer-events-none"}`}
        >
          <p className="text-sm">
            {forecastLoadStatus === "success"
              ? forecast?.daily.time[showingDay]?.toLocaleDateString("en-US", {
                  weekday: "long",
                })
              : "–"}
          </p>
          <Image
            src={"/images/icon-dropdown.svg"}
            height={8}
            width={13}
            alt=""
            className="w-2.5"
          />
        </button>
        {/* <div className="absolute">
          {forecast?.daily.time.map((day, i) => (
            <p>{day.toLocaleDateString("en-US", { weekday: "long" })}</p>
          ))}
        </div> */}
      </div>
      <div className="hourlyForecast flex flex-col w-full gap-3 overflow-y-scroll">
        {hourlyWeather.map((weather, i) => (
          <div
            key={i}
            className="h-12.5 bg-block-child rounded-md border border-border shrink-0 ml-5 mr-[1.05rem] px-2.5"
          >
            <div
              className={`w-full h-full flex items-center justify-between ${forecastLoadStatus === "success" ? "opacity-100" : "opacity-0 hidden"}`}
            >
              <div className="flex items-center">
                <Image
                  src={getWeatherIcon(weather?.weather_code)}
                  width={320}
                  height={320}
                  alt="Weather"
                  className="w-8 h-8"
                />
                <p className="text-base ml-2">
                  {weather?.time.toLocaleTimeString("en-US", {
                    hour: "numeric",
                  })}
                </p>
              </div>
              <p className="text-sm text-neutral-200">
                {Math.round(weather?.temperature_2m)}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
