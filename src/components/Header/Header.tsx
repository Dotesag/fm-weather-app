import Image from "next/image";
import {
  PRECIPITATION_UNITS,
  TEMPERATURE_UNITS,
  WIND_SPEED_UNITS,
} from "@/types/weather";

export default function Header() {
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
          <button className="bg-block py-2 px-3 rounded-lg flex gap-2 text-sm items-center cursor-pointer">
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
          <div className="absolute bg-block px-2 py-1 rounded-xl border border-border text-sm text-nowrap right-0 mt-2 w-100 max-w-44">
            <button className="text-left px-1 py-2 hover:bg-block-child rounded-md duration-200 cursor-pointer w-full">
              Switch to imperial
            </button>
            <div>
              <p className="text-neutral-300 text-xs m-1">Temperature</p>
              <div className="flex flex-col items-left">
                {TEMPERATURE_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className="text-left px-1 py-2 hover:bg-block-child rounded-md duration-200 cursor-pointer"
                    >
                      <div>{tUnit.name} </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="border-border" />
            <div>
              <p className="text-neutral-300 text-xs m-1 mt-2">Wind Speed</p>
              <div className="flex flex-col items-left">
                {WIND_SPEED_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className="text-left px-1 py-2 hover:bg-block-child rounded-md duration-200 cursor-pointer"
                    >
                      <div>{tUnit.name} </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="border-border" />
            <div>
              <p className="text-neutral-300 text-xs m-1 mt-2">Precipitation</p>
              <div className="flex flex-col items-left">
                {PRECIPITATION_UNITS.map((tUnit, i) => {
                  return (
                    <button
                      key={i}
                      className="text-left px-1 py-2 hover:bg-block-child rounded-md duration-200 cursor-pointer"
                    >
                      <div>{tUnit.name} </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-bricolage-grotesque text-[44px] mt-12">
        How's the sky looking today?
      </h1>
    </header>
  );
}
