import Image from "next/image";

import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Category from "./Cetagory";
// import ApartmentsOption from "@/components/others/ApartmentsOption";

export default function Header() {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        {/* Add a category component here */}
        <Category />
      </header>
    </div>
  );
}
