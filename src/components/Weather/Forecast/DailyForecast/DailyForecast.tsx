import { useState } from "react";
import { useForecastLoadStatusContext } from "../Forecast";
import { useMainContext } from "@/components/Mainpage";
import type { DailyWeather } from "@/types/weather";
import Image from "next/image";
import { getWeatherIcon } from "@/lib/forecast";

export default function DailyForecast() {
  const { forecast } = useMainContext();

  const dailyWeather: DailyWeather[] = forecast
    ? forecast?.daily.time.map((time, i) => ({
        time,
        weather_code: forecast.daily.weather_code[i],
        temperature_2m_max: forecast.daily.temperature_2m_max[i],
        temperature_2m_min: forecast.daily.temperature_2m_min[i],
      }))
    : Array.from({ length: 7 });

  const forecastLoadStatus = useForecastLoadStatusContext();

  return (
    <div className="flex gap-3 flex-col">
      <h2>Daily forecast</h2>
      <div className="grid gap-3.5 grid-cols-[repeat(auto-fit,minmax(4rem,1fr))]">
        {dailyWeather.map((dayWeather, i) => (
          <div
            className={`h-32 bg-block rounded-lg border border-border`}
            key={i}
          >
            <div
              className={`${forecastLoadStatus === "success" ? "opacity-100" : "opacity-0 hidden"} duration-200 w-full h-full flex flex-col items-center p-2.5 justify-between`}
            >
              <h3 className="text-center text-base">
                {dayWeather?.time.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>
              <Image
                src={getWeatherIcon(dayWeather?.weather_code)}
                width={320}
                height={320}
                alt="Weather"
                className="w-12 h-12"
              />
              <div className="flex justify-between w-full text-sm text-neutral-200">
                <p>{Math.round(dayWeather?.temperature_2m_max)}°</p>
                <p>{Math.round(dayWeather?.temperature_2m_min)}°</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
