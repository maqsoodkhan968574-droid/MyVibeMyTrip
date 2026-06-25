import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: "compact" | "large";
};

export function BrandMark({ size = "compact" }: BrandMarkProps) {
  const isLarge = size === "large";

  return (
    <span className={cn("inline-flex items-center gap-2 font-black tracking-tight text-navy sm:gap-3", isLarge && "gap-4")}>
      <span className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200", isLarge ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12 sm:h-14 sm:w-14")}>
        <Image
          src="/brand/myvibemytrip-logo.png"
          alt="MyVibeMyTrip.com logo"
          width={isLarge ? 96 : 56}
          height={isLarge ? 96 : 56}
          className="h-full w-full object-contain p-0.5"
          priority
        />
      </span>
      <span className={cn("leading-tight", isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg")}>
        MyVibe
        <span className="block text-green-700">MyTrip.com</span>
      </span>
    </span>
  );
}
