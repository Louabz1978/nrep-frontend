import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose, AiOutlineBell } from "react-icons/ai";
import logo from "@/assets/images/logo.svg";
import { useUser } from "@/stores/useUser";
import { useState } from "react";
import { LuLogIn, LuSearch } from "react-icons/lu";
import { Popover, PopoverContent } from "@/components/global/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PiGear, PiSignOut, PiUser } from "react-icons/pi";
import useLogoutMutation from "@/hooks/global/logout/useLogoutMutation";
import { useModal } from "@/hooks/global/use-modal";
import { SideModal } from "@/components/global/ui/side-modal";
import Settings from "@/components/global/settings/Settings";

function Header() {
  // user info
  const { user } = useUser();
  // search value
  const [search, setSearch] = useState("");

  // modal control method
  const { openModal } = useModal();

  // logout mutations
  const { handleLogout, logout } = useLogoutMutation();

  return (
    // header container
    <header className="w-full bg-quaternary-bg h-7xl border-b border-secondary-border flex items-center justify-between md:px-container-padding-desktop px-container-padding-mobile py-sm">
      {/* right area */}
      <div className="flex items-center gap-xl text-quaternary-fg">
        {/* icons */}
        <div className="flex items-center gap-lg">
          {/* login / user info */}
          {user?.access_token ? (
            <Popover>
              <PopoverTrigger>
                <CgProfile className="size-[24px] cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="bg-tertiary-bg mt-md p-0 border-none shadow-2xl flex flex-col"
              >
                <div className="border-b border-secondary-border py-md px-xl text-size16 flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-all duration-[0.3s] text-primary-fg hover:text-primary">
                  <span>الملف الشخصي</span>
                  <PiUser />
                </div>
                <div
                  onClick={() => {
                    if (!logout?.isPending) handleLogout();
                  }}
                  className="py-md px-xl text-size16 flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-all duration-[0.3s] text-primary-fg hover:text-primary"
                >
                  <span>تسجيل الخروج</span>
                  <PiSignOut />
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link to="/login" aria-label="Profile">
              <LuLogIn className="size-[24px] cursor-pointer" />
            </Link>
          )}

          {/* notifications */}
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative"
          >
            <AiOutlineBell className="size-[24px] text-inverse-fg cursor-pointer" />
            <span className="absolute -top-xxs right-[1px] size-[7px] bg-error rounded-full"></span>
          </Link>

          {/* settings */}
          <PiGear
            className="size-[24px] text-inverse-fg cursor-pointer"
            onClick={() => {
              openModal("settings");
            }}
          />
        </div>

        {/* search input */}
        <div className="relative lg:w-[352px] md:w-[250px] w-[200px]">
          <input
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="بحث..."
            className="h-[28px] w-full text-primary-fg bg-tertiary-bg text-size16 placeholder:text-size16 placeholder:text-placeholder-secondary rounded-full px-xl py-sm pl-4xl text-primary-foreground focus:outline-none"
          />

          {/* search icon */}
          <LuSearch
            className={`${
              search ? "hidden" : "block"
            } h-xl pointer-events-none absolute right-7xl top-[50%] -translate-y-[50%] w-xl text-primary-icon group-hover:text-primary-fg transition-all`}
          />

          {/* clear icon */}
          <span
            className={`absolute inset-y-0 h-full group left-3 flex items-center justify-center cursor-pointer ${
              search ? "block" : "hidden"
            }`}
            onClick={() => setSearch("")}
          >
            <AiOutlineClose className="size-[12px] text-primary-icon group-hover:text-primary-fg transition-all" />
          </span>
        </div>
      </div>

      {/* logo */}
      <Link to="/" className="size-6xl rounded-xl overflow-hidden">
        <img src={logo} alt="NREP" className="size-full object-cover" />
      </Link>

      <SideModal size="sm" title={"إعدادات الموقع"} id={`settings`}>
        <Settings />
      </SideModal>
    </header>
  );
}

export default Header;
