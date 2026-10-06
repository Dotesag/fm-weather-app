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

export async function getCities(cityName: string): Promise<Array<City>> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(cityName) +
    "&count=4";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  
  const apiResponseCities: APIResponseCities = await response.json();

  if (!apiResponseCities.results) return [];
  const cities: Array<City> = apiResponseCities.results.map(apiCityToCity);
  return cities;
}
