import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PackageItineraryEditor } from "@/components/travel/package-itinerary-editor";
import { groupPackages } from "@/data/travel";

export default function PackageItinerariesAdminPage() {
  return (
    <main className="bg-slate-50 py-10">
      <div className="container-shell">
        <Link href="/admin" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-green-700">
          <ArrowLeft size={16} />
          Back to admin
        </Link>
        <PackageItineraryEditor packages={groupPackages} />
      </div>
    </main>
  );
}
