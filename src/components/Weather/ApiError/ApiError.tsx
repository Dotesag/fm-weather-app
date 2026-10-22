import Image from "next/image";
import { useMainContext } from "@/components/Mainpage";

export default function ApiError() {
  const { setApiError } = useMainContext();

  return (
    <div className="w-full flex flex-col items-center -mt-16">
      <Image
        src={"/images/icon-error.svg"}
        alt=""
        width={18}
        height={18}
        className="w-7"
      />
      <h1 className="text-4xl font-bold font-bricolage-grotesque my-4">
        Something went wrong
      </h1>
      <p className="text-sm text-neutral-300 w-90 text-center mb-4">
        We couldn&rsquo;t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        className="bg-block rounded-md text-[10px] py-1.75 px-3 flex gap-2 cursor-pointer"
        onClick={() => setApiError(false)}
      >
        <Image
          src={"/images/icon-retry.svg"}
          alt=""
          width={16}
          height={17}
          className="w-2.5"
        />
        Retry
      </button>
    </div>
  );
}
