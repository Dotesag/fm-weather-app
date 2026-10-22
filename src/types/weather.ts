export type Weather = {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: Array<Date>;
    temperature_2m: Array<number>;
    weather_code: Array<number>;
  };
  daily: {
    time: Array<Date>;
    weather_code: Array<number>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
  };
  timezone: string;
};

export const WIND_SPEED_UNITS = [
  { name: "km/h", code: "kmh" },
  { name: "mph", code: "mph" },
] as const;

export const TEMPERATURE_UNITS = [
  { name: "Celsius (°C)", code: "celsius" },
  { name: "Fahrenheit (°F)", code: "fahrenheit" },
] as const;

export const PRECIPITATION_UNITS = [
  { name: "Millimeters (mm)", code: "mm" },
  { name: "Inches (in)", code: "inch" },
] as const;

export type WindSpeedUnit = (typeof WIND_SPEED_UNITS)[number]["code"];
export type TemperatureUnit = (typeof TEMPERATURE_UNITS)[number]["code"];
export type PrecipitationUnit = (typeof PRECIPITATION_UNITS)[number]["code"];
