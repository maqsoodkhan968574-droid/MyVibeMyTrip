import Link from "next/link";
import { Compass, UserRoundCheck } from "lucide-react";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-14px_40px_rgba(15,23,42,0.14)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link href="/compatibility-quiz" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2 text-sm font-black text-white">
          <UserRoundCheck size={17} />
          Match Me
        </Link>
        <Link href="/group-packages" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-navy">
          <Compass size={17} />
          Trips
        </Link>
      </div>
    </div>
  );
}
