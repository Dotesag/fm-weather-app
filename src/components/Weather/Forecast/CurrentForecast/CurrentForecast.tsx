import { useState } from "react";
import CityCard from "./CityCard.tsx/CityCard";
import Parameters from "./Parameters/Parameters";

export default function CurrentForecast() {
  return (
    <div id="currentForecast" className="flex flex-col gap-6">
      <CityCard />
      <Parameters />
    </div>
  );
}
