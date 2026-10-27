import CityCard from "./CityCard.tsx/CityCard";
import Parameters from "./Parameters/Parameters";

export default function CurrentForecast() {
  return (
    <div className="w-full max-w-162 flex flex-col gap-6">
      <CityCard />
      <Parameters />
    </div>
  );
}
