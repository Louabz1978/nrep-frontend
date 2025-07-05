import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose, AiOutlineBell } from "react-icons/ai";
import logo from "@/assets/images/logo.svg";
import { useUser } from "@/stores/useUser";
import { useState } from "react";
import { LuLogIn, LuSearch } from "react-icons/lu";

function Header() {
  // user info
  const { user } = useUser();
  // search value
  const [search, setSearch] = useState("");

  return (
    // header container
    <header className="w-full bg-quaternary-bg h-[89px] border-b border-secondary-border flex items-center justify-between px-[32px] py-[11px]">
      {/* right area */}
      <div className="flex items-center gap-[32px] text-quaternary-fg">
        {/* icons */}
        <div className="flex items-center gap-[16px]">
          {/* login / user info */}
          <Link to="/login" aria-label="Profile">
            {user?.access_token ? (
              <CgProfile className="h-[32px] w-[32px] cursor-pointer" />
            ) : (
              <LuLogIn className="h-[32px] w-[32px] cursor-pointer" />
            )}
          </Link>

          {/* notifications */}
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative"
          >
            <AiOutlineBell className="h-8 w-9 text-white cursor-pointer" />
            <span className="absolute -top-[2px] right-[1px] w-[14px] h-[14px] bg-error rounded-full"></span>
          </Link>
        </div>

        {/* search input */}
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            البحث
          </label>
          <input
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="البحث"
            className="h-[32px] w-[352px] bg-tertiary-bg text-size16 placeholder:text-placeholder-secondary rounded-full px-[16px] py-[7px] pl-[30px] text-primary-foreground focus:outline-none"
          />

          {/* search icon */}
          <LuSearch
            className={`${
              search ? "hidden" : "block"
            } h-[18px] pointer-events-none absolute right-[60px] top-[50%] -translate-y-[50%] w-[18px] text-primary-icon group-hover:text-primary-fg transition-all`}
          />

          {/* clear icon */}
          <span
            className={`absolute inset-y-0 h-full group left-3 flex items-center justify-center cursor-pointer ${
              search ? "block" : "hidden"
            }`}
            onClick={() => setSearch("")}
          >
            <AiOutlineClose className="h-[12px] w-[12px] text-primary-icon group-hover:text-primary-fg transition-all" />
          </span>
        </div>
      </div>

      {/* logo */}
      <Link
        to="/"
        className="w-[63px] h-[63px] rounded-[20.63px] overflow-hidden"
      >
        <img src={logo} alt="NREP" className="size-full object-cover" />
      </Link>
    </header>
  );
}

export default Header;
