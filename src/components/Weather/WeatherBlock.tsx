import ApiError from "./ApiError/ApiError";
import Forecast from "./Forecast/Forecast";
import PlaceSelect from "./PlaceSelect/PlaceSelect";
import { useMainContext } from "@/components/Mainpage";

export default function WeatherBlock() {
  const { apiError } = useMainContext();

  return (
    <div className="flex justify-center">
      {apiError && <ApiError />}
      <div
        className={`w-full flex flex-col gap-9 ${apiError ? "invisible" : "visible"}`}
      >
        <PlaceSelect />
        <Forecast />
      </div>
    </div>
  );
}
