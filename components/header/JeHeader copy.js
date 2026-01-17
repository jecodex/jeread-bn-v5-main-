import Image from "next/image";
import Link from "next/link";
import Notification from "../profile/Notification";
import ProfileInfo from "../profile/ProfileInfo";
import AuthHeader from "./AuthHeader";
import MobileViewCategory from "./components/MobileViewCategory";
import Search from "./Search";


// Server Component
export default async function JeHeader() {
 

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white dark:bg-[#1F2937] w-full shadow-sm">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between py-2 w-full">
          {/* Mobile: Search on left, Logo in middle, and icons on right */}
          <div className="md:hidden flex items-center w-1/3">
            <Search />
          </div>

          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex justify-center md:justify-start w-1/3 md:w-auto">
            <Link href="/" className="flex items-center">
              <Image
                src="/lovo-v2.svg"
                alt="Jefine Logo"
                width={70}
                height={70}
                priority
                className=""
              />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <Search />
          </div>

          {/* Right section - profile, notifications, auth */}
          <div className="flex items-center gap-2 sm:gap-4 justify-end w-1/3 md:w-auto">
            <ProfileInfo  />
            <Notification  />
            <AuthHeader />
          </div>
        </div>
        {/* Mobile Category Navigation */}
        <MobileViewCategory />
      </div>
    </header>
  );
}
