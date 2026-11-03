import { useState } from "react";
import { useForecastLoadStatusContext } from "../Forecast";

export default function DailyForecast() {
  const [dailyForecast, setDailyForecast] = useState(Array.from({ length: 7 }));

  const forecastLoadStatus = useForecastLoadStatusContext();

  return (
    <div className="flex gap-3 flex-col">
      <h2>Daily forecast</h2>
      <div className="flex gap-3">
        {dailyForecast.map((forecast, i) => (
          <div
            className={`grow h-32 bg-block rounded-lg border border-border`}
            key={i}
          >
            <div
              className={`${forecastLoadStatus === "loading" ? "opacity-100" : "opacity-0 hidden"} duration-200 w-full h-full`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
