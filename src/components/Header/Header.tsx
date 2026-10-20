import Image from "next/image";

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
        <button className="bg-block py-2 px-3 rounded-lg flex gap-2 text-xs items-center">
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
      </div>
      <h1 className="font-bricolage-grotesque text-[44px] mt-12">
        How's the sky looking today?
      </h1>
    </header>
  );
}
