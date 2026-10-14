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

export type WindSpeedUnit = "kmh" | "mph";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type PrecipitationUnit = "mm" | "inch";
