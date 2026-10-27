import { useMainContext } from "@/components/Mainpage";

export default function Parameters() {
  const { forecast, units } = useMainContext();

  const temperature = forecast?.current.apparent_temperature;
  const humidity = forecast?.current.relative_humidity_2m;
  const windSpeed = forecast?.current.wind_speed_10m;
  const precipitiation = forecast?.current.precipitation;

  const windSpeedUnit = units.windSpeed == "kmh" ? "km/h" : "mph";
  const precipitationUnit = units.precipitation == "inch" ? "in" : "mm";

  return (
    <div className="flex justify-between gap-5">
      <div className="current-weather-parameter">
        <h3>Feels like</h3>
        <p>{temperature ? `${Math.round(temperature)}°` : "–"}</p>
      </div>
      <div className="current-weather-parameter">
        <h3>Humidity</h3>
        <p>{humidity ? `${Math.round(humidity)}%` : "–"}</p>
      </div>
      <div className="current-weather-parameter">
        <h3>Wind</h3>
        <p>{windSpeed ? `${Math.round(windSpeed)} ${windSpeedUnit}` : "–"}</p>
      </div>
      <div className="current-weather-parameter">
        <h3>Precipitation</h3>
        <p>
          {precipitiation != undefined
            ? `${precipitiation.toFixed(1) != "0.0" ? precipitiation.toFixed(1) : "0"} ${precipitationUnit}`
            : "–"}
        </p>
      </div>
    </div>
  );
}
