import Image from "next/image";
import { useMainContext } from "@/components/Mainpage";

export default function ApiError() {
  const { setApiError } = useMainContext();

  return (
    <div className="w-full flex flex-col items-center mt-11">
      <Image
        src={"/images/icon-error.svg"}
        alt=""
        width={18}
        height={18}
        className="w-8.5"
      />
      <h1 className="text-5xl font-bold font-bricolage-grotesque mt-5">
        Something went wrong
      </h1>
      <p className="text-base/4.5 text-neutral-300 w-full max-w-110 text-center mt-6 mb-5">
        We couldn&rsquo;t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        className="bg-block rounded-md text-sm py-1.75 px-3 flex gap-2 cursor-pointer"
        onClick={() => setApiError(false)}
      >
        <Image
          src={"/images/icon-retry.svg"}
          alt=""
          width={16}
          height={17}
          className="w-3"
        />
        Retry
      </button>
    </div>
  );
}
