import { useMainContext } from "@/components/Mainpage";
import { getWeatherIcon } from "@/lib/forecast";
import Image from "next/image";

export default function CityCard() {
  const { city, forecast } = useMainContext();
  return (
    forecast && (
      <div className="bg-[url(/images/bg-today-large.svg)] w-full max-w-162 h-58 bg-cover rounded-2xl flex justify-between items-center p-5">
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
    )
  );
}
