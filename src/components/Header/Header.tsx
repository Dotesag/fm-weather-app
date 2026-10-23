import Image from "next/image";
import {
  PRECIPITATION_UNITS,
  TEMPERATURE_UNITS,
  WIND_SPEED_UNITS,
} from "@/types/weather";
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "@/components/Mainpage";

export default function Header() {
  const { units, setUnits, apiError } = useMainContext();

  const [isMenuShowed, SetIsMenuShowed] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        SetIsMenuShowed(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (menuRef.current && event.key === "Escape") {
        SetIsMenuShowed(false);
      }
    };

    window.addEventListener("click", handleClickOutsideMenu);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("click", handleClickOutsideMenu);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const setStandartUnits = () => {
    if (
      units.precipitation !== "inch" ||
      units.temperature !== "fahrenheit" ||
      units.windSpeed !== "mph"
    ) {
      setUnits({
        temperature: "fahrenheit",
        precipitation: "inch",
        windSpeed: "mph",
      });
    } else {
      setUnits({
        temperature: "celsius",
        precipitation: "mm",
        windSpeed: "kmh",
      });
    }
  };

  return (
    <header className="flex flex-col items-center py-10">
      <div className="flex w-full justify-between">
        <Image
          src={"/images/logo.svg"}
          height={40}
          width={197}
          alt="Weather Now"
          className="w-40"
        />
        <div className="relative">
          <button
            ref={buttonRef}
            className="bg-block py-2 px-3 rounded-lg flex gap-2 text-sm items-center cursor-pointer"
            onClick={() => {
              SetIsMenuShowed(!isMenuShowed);
            }}
          >
            <Image
              src={"/images/icon-units.svg"}
              height={16}
              width={16}
              alt=""
              className="w-3.5"
            />
            <p>Units</p>
            <Image
              src={"/images/icon-dropdown.svg"}
              height={8}
              width={13}
              alt=""
              className="w-2.5"
            />
          </button>
          <div
            ref={menuRef}
            className={`absolute z-100 bg-block px-1.5 py-1 rounded-xl border border-border text-sm text-nowrap right-0 mt-2 w-100 max-w-44 duration-200
              ${isMenuShowed ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-4 invisible"} `}
          >
            <button
              className="text-left px-1.5 py-1.5 mt-1 hover:bg-block-child rounded-md duration-200 cursor-pointer w-full"
              onClick={setStandartUnits}
            >
              {units.precipitation !== "inch" ||
              units.temperature !== "fahrenheit" ||
              units.windSpeed !== "mph"
                ? "Switch to Imperial"
                : "Switch to Metric"}
            </button>
            <div>
              <p className="text-neutral-300 text-xs pl-1 m-0.5">Temperature</p>
              <div className="flex flex-col items-left gap-1 py-1">
                {TEMPERATURE_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className={`text-left px-1.5 py-1.5 hover:bg-block-child rounded-md duration-200 cursor-pointer flex justify-between ${tUnit.code === units.temperature ? "bg-block-child" : ""}`}
                      onClick={() =>
                        setUnits((prev) => ({
                          ...prev,
                          temperature: tUnit.code,
                        }))
                      }
                    >
                      <div>{tUnit.name} </div>
                      <Image
                        src={"/images/icon-checkmark.svg"}
                        width={14}
                        height={11}
                        alt=""
                        className={`w-3 duration-150 ${tUnit.code === units.temperature ? "opacity-100 visible" : "opacity-0 invisible"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="border-border" />
            <div>
              <p className="text-neutral-300 text-xs pl-1 m-0.5 mt-1.5">
                Wind Speed
              </p>
              <div className="flex flex-col items-left gap-1 py-1">
                {WIND_SPEED_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className={`text-left px-1.5 py-1.5 hover:bg-block-child rounded-md duration-200 cursor-pointer flex justify-between ${tUnit.code === units.windSpeed ? "bg-block-child" : ""}`}
                      onClick={() =>
                        setUnits((prev) => ({
                          ...prev,
                          windSpeed: tUnit.code,
                        }))
                      }
                    >
                      <div>{tUnit.name} </div>
                      <Image
                        src={"/images/icon-checkmark.svg"}
                        width={14}
                        height={11}
                        alt=""
                        className={`w-3 duration-150 ${tUnit.code === units.windSpeed ? "opacity-100 visible" : "opacity-0 invisible"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="border-border" />
            <div>
              <p className="text-neutral-300 text-xs pl-1 m-0.5 mt-1.5">
                Precipitation
              </p>
              <div className="flex flex-col items-left gap-1 py-1">
                {PRECIPITATION_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className={`text-left px-1.5 py-1.5 hover:bg-block-child rounded-md duration-200 cursor-pointer flex justify-between ${tUnit.code === units.precipitation ? "bg-block-child" : ""}`}
                      onClick={() =>
                        setUnits((prev) => ({
                          ...prev,
                          precipitation: tUnit.code,
                        }))
                      }
                    >
                      <div>{tUnit.name} </div>
                      <Image
                        src={"/images/icon-checkmark.svg"}
                        width={14}
                        height={11}
                        alt=""
                        className={`w-3 duration-150 ${tUnit.code === units.precipitation ? "opacity-100 visible" : "opacity-0 invisible"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!apiError && (
        <h1 className="font-bricolage-grotesque text-[44px] mt-12">
          How&rsquo;s the sky looking today?
        </h1>
      )}
    </header>
  );
}
