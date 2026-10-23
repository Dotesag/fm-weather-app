import { fetchWeatherApi } from "openmeteo";
import type {
  Weather,
  WindSpeedUnit,
  TemperatureUnit,
  PrecipitationUnit,
} from "@/types/weather";

export async function getWeatherForecast(
  targetLatitude: number,
  targetLongitude: number,
  windSpeedUnit?: WindSpeedUnit,
  temperatureUnit?: TemperatureUnit,
  precipitationUnit?: PrecipitationUnit,
  abortSignal?: AbortSignal,
): Promise<Weather> {
  const params = {
    latitude: targetLatitude,
    longitude: targetLongitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ],
    timezone: "auto",
    ...(windSpeedUnit && { wind_speed_unit: windSpeedUnit }),
    ...(temperatureUnit && { temperature_unit: temperatureUnit }),
    ...(precipitationUnit && { precipitation_unit: precipitationUnit }),
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const fetchOptions: RequestInit = { signal: abortSignal };
  const responses = await fetchWeatherApi(url, params, 3, 0.2, 1, fetchOptions);

  const response = responses[0];

  const timezone = response.timezone()!;
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData: Weather = {
    current: {
      time: new Date(Number(current.time()) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      weather_code: current.variables(4)!.value(),
      wind_speed_10m: current.variables(5)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
      ),
      temperature_2m: Array.from(hourly.variables(0)!.valuesArray()!),
      weather_code: Array.from(hourly.variables(1)!.valuesArray()!),
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date((Number(daily.time()) + i * daily.interval()) * 1000),
      ),
      weather_code: Array.from(daily.variables(0)!.valuesArray()!),
      temperature_2m_max: Array.from(daily.variables(1)!.valuesArray()!),
      temperature_2m_min: Array.from(daily.variables(2)!.valuesArray()!),
    },
    timezone,
  };
  return weatherData;
}
