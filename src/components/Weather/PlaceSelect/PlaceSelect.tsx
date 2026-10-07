"use client";
import { getCities } from "@/lib/geocoding";
import type { City } from "@/types/city";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: Array<any>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function PlaceSelect() {
  const [cityLoadStatus, setCityLoadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [cities, setCities] = useState<Array<City>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  async function loadCities(cityName: string) {
    try {
      setCityLoadStatus("loading");
      const loadedCities = await getCities(cityName);
      setCityLoadStatus("success");
      setCities(loadedCities);
    } catch (error) {
      setCityLoadStatus("error");
      console.error("Error while loading cities: " + error);
    }
  }
  const debouncedLoadCities = useMemo(() => debounce(loadCities, 500), []);

  return (
    <form
      className="w-full min-w-60 h-11.5 flex justify-center gap-3 "
      onSubmit={(event) => {
        event.preventDefault();
        if (inputValue.trim() === "") return;
        debouncedLoadCities(inputValue);
      }}
    >
      <div className="bg-block py-3 max-w-108 w-full flex gap-3 rounded-xl relative items-center">
        <Image
          src={"/images/icon-search.svg"}
          width={21}
          height={21}
          alt={""}
          className="h-4.5 ml-5"
        />
        <label htmlFor="place-search" className="sr-only">
          Enter place:
        </label>
        <input
          id="place-search"
          value={inputValue}
          placeholder="Search for a place..."
          className="focus:outline-none placeholder:text-neutral-200 [&::-webkit-search-cancel-button]:appearance-none"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          type="search"
        ></input>
        <div
          className={`absolute w-full max-w-108 top-13.5 p-1.5 bg-block rounded-xl text-sm ${cityLoadStatus === "idle" ? "hidden" : ""}`}
        >
          {cityLoadStatus === "loading" && (
            <div className="flex gap-2 px-2 py-1.5 items-center">
              <Image
                src={"/images/icon-loading.svg"}
                height={16}
                width={16}
                alt=""
                className="animate-spin"
              />
              <p>Search in progress</p>
            </div>
          )}
          {cityLoadStatus === "error" && (
            <div className="px-2 py-1.5">Error while loading place</div>
          )}
          {cityLoadStatus === "success" &&
            cities.length > 0 &&
            cities.map((city) => (
              <button
                type="button"
                key={city.id}
                className="text-sm px-1.5 py-2 w-full text-nowrap overflow-hidden flex rounded-lg duration-200 hover:bg-block-child hover:ring hover:ring-neutral-600"
              >
                {city.name +
                  (city.country ? ", " + city.country : "") +
                  (city.region ? ", " + city.region : "")}
              </button>
            ))}
          {cityLoadStatus === "success" && cities.length === 0 && (
            <div className="px-2 py-1.5">Nothing found</div>
          )}
        </div>
      </div>
      <button
        className="bg-blue-500 px-5 flex items-center justify-center rounded-xl cursor-pointer"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
