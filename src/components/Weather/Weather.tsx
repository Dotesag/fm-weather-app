import ApiError from "./ApiError/ApiError";
import PlaceSelect from "./PlaceSelect/PlaceSelect";
import { useMainContext } from "@/components/Mainpage";

export default function Weather() {
  const { apiError } = useMainContext();

  return (
    <div className="flex justify-center">
      {!apiError && <PlaceSelect />}
      {apiError && <ApiError />}
    </div>
  );
}
