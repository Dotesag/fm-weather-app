import type { City } from "@/types/city";

type APICity = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country?: string;
  admin1?: string;
};

type APIResponseCities = {
  results?: Array<APICity>;
};

type IPCity = {
  city: string;
  latitude: number;
  longitude: number;
  timezone: { id: string };
  country?: string;
  region?: string;
  success: boolean;
};

function apiCityToCity(apiCity: APICity): City {
  const city: City = {
    id: apiCity.id,
    name: apiCity.name,
    latitude: apiCity.latitude,
    longitude: apiCity.longitude,
    timezone: apiCity.timezone,
    country: apiCity.country,
    region: apiCity.admin1,
  };
  return city;
}

function ipCityToCity(ipCity: IPCity): City {
  if (!ipCity.success) {
    throw new Error("Could not get the city by IP");
  }
  const city: City = {
    id: "ip-location",
    name: ipCity.city,
    latitude: ipCity.latitude,
    longitude: ipCity.longitude,
    timezone: ipCity.timezone.id,
    country: ipCity.country,
    region: ipCity.region,
  };
  return city;
}

export async function getCities(
  cityName: string,
  abortSignal?: AbortSignal,
): Promise<Array<City>> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(cityName) +
    "&count=4";
  const response = await fetch(url, { signal: abortSignal });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const apiResponseCities: APIResponseCities =
    (await response.json()) as APIResponseCities;

  if (!apiResponseCities.results) return [];
  const cities: Array<City> = apiResponseCities.results.map(apiCityToCity);
  return cities;
}

export async function getCityFromIP(abortSignal?: AbortSignal) {
  const url = "https://ipwho.is/";
  const response = await fetch(url, { signal: abortSignal });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const ipResonseCity: IPCity = (await response.json()) as IPCity;

  const city = ipCityToCity(ipResonseCity);

  return city;
}
