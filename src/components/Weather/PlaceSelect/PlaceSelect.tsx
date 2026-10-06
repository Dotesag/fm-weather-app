import Image from "next/image";

export default function PlaceSelect() {
  return (
    <div className="w-full min-w-60 h-11.5 max-w-108 flex gap-3">
      <div className="bg-block py-3 px-5 w-full flex gap-3 rounded-xl">
        <Image
          src={"/images/icon-search.svg"}
          width={21}
          height={21}
          alt={"search"}
          className="h-4.5"
        />
        <input
          placeholder="Search for a place..."
          className="focus:outline-none placeholder:text-neutral-200"
        ></input>
      </div>
      <button className="bg-blue-500 px-5 flex items-center justify-center rounded-xl cursor-pointer">
        Search
      </button>
    </div>
  );
}
