"use client";
import { getCities } from "@/lib/geocoding";
import { City } from "@/types/city";
import Image from "next/image";
import { useState } from "react";

export default function PlaceSelect() {
  const [cityLoadStatus, setCityLoadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [cities, setCities] = useState<Array<City>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  async function loadCities(cityName: string) {
    try {
      setCityLoadStatus("loading");
      const citiesPromise = await getCities(cityName);
      setCityLoadStatus("success");
      setCities(citiesPromise);
    } catch (error) {
      setCityLoadStatus("error");
      console.error("Error while loading cities: " + error);
    }
  }

  return (
    <div className="w-full min-w-60 h-11.5 flex justify-center gap-3 ">
      <div className="bg-block py-3  max-w-108 w-full flex gap-3 rounded-xl relative">
        <Image
          src={"/images/icon-search.svg"}
          width={21}
          height={21}
          alt={"search"}
          className="h-4.5 ml-5"
        />
        <input
          value={inputValue}
          placeholder="Search for a place..."
          className="focus:outline-none placeholder:text-neutral-200"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        ></input>
        <div className="absolute w-full max-w-108 top-14 bg-block rounded-xl">
          {cityLoadStatus === "loading" && <div>Loading...</div>}
          {cityLoadStatus === "success" &&
            cities.map((city) => (
              <button id={city.id.toString()}>
                {city.name +
                  (city.country ? ", " + city.country : "") +
                  (city.region ? ", " + city.region : "")}
              </button>
            ))}
          {cityLoadStatus === "error" && <div>Error while loading place</div>}
        </div>
      </div>
      <button
        className="bg-blue-500 px-5 flex items-center justify-center rounded-xl cursor-pointer"
        onClick={() => {
          loadCities(inputValue);
        }}
      >
        Search
      </button>
    </div>
  );
}
