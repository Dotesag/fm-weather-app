import Image from "next/image";
import { useForecastLoadStatusContext } from "../Forecast";
import { useState } from "react";

export default function HourlyForecast() {
  const [hourlyForecast, setHourlyForecast] = useState(
    Array.from({ length: 8 }),
  );

  const forecastLoadStatus = useForecastLoadStatusContext();

  return (
    <div className="grow bg-block rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2>Hourly forecast</h2>
        <button
          className={`bg-neutral-600 py-1 px-3.5 rounded-md flex gap-2 text-sm items-center ${forecastLoadStatus === "success" ? "cursor-pointer" : "pointer-events-none"}`}
        >
          <p>–</p>
          <Image
            src={"/images/icon-dropdown.svg"}
            height={8}
            width={13}
            alt=""
            className="w-2.5"
          />
        </button>
      </div>
      <div className="flex flex-col w-full gap-3 overflow-hidden">
        {hourlyForecast.map((forecast, i) => (
          <div
            key={i}
            className="h-12 w-full bg-block-child rounded-md border border-border"
          ></div>
        ))}
      </div>
    </div>
  );
}
