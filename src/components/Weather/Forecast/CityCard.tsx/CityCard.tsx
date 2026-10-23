import { useMainContext } from "@/components/Mainpage";

export default function CityCard() {
  const { city, forecast } = useMainContext();
  return (
    <div className="bg-[url(/images/bg-today-large.svg)] w-full max-w-162 h-58 bg-cover rounded-2xl">
      <div>
        <h2>{city?.name}</h2>
        <p>
          {forecast?.current.time.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
