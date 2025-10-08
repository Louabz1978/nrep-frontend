import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/assets/images/new logo.png";
import { useUser } from "@/stores/useUser";
import { useMemo, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { Popover, PopoverContent } from "@/components/global/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PiGear, PiSignOut, PiUser } from "react-icons/pi";
import useLogoutMutation from "@/hooks/global/logout/useLogoutMutation";
import { useModal } from "@/hooks/global/use-modal";
import { SideModal } from "@/components/global/ui/side-modal";
import Settings from "@/components/global/settings/Settings";
import Navbar from "../navbar/Navbar";
import { tabs, type TabType } from "@/data/website/navbar";
import { HiOutlineMenu, HiOutlineChevronDown } from "react-icons/hi";

type UserProps = {
  user: ReturnType<typeof useUser>["user"];
  onLogout: () => void;
  onLoginClick: () => void;
};

const UserActions: React.FC<UserProps> = ({ user, onLogout, onLoginClick }) => (
  <div className="px-4 pt-4 pb-4 border-b border-white flex items-center justify-between">
    <div className="flex items-center gap-3">
      <CgProfile className="size-[26px]" />
      <span className="text-size18 font-semibold truncate max-w-[180px]">
        {user
          ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
            user.email
          : "الضيف"}
      </span>
    </div>
    {user ? (
      <button
        className="flex items-center gap-2 text-size14 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
        onClick={onLogout}
      >
        <PiSignOut className="size-[16px]" />
        خروج
      </button>
    ) : (
      <button
        className="flex items-center gap-2 text-size14 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
        onClick={onLoginClick}
      >
        <LuLogIn className="size-[16px]" />
        دخول
      </button>
    )}
  </div>
);

type NavProps = {
  navItems: TabType[];
  openGroups: string[];
  toggleGroup: (label: string) => void;
  navigate: ReturnType<typeof useNavigate>;
  locationPath: string;
  onNavigate: () => void;
};

const Nav: React.FC<NavProps> = ({
  navItems,
  openGroups,
  toggleGroup,
  navigate,
  locationPath,
  onNavigate,
}) => {
  const isPathMatchLocal = (item: TabType): boolean => {
    if (item.to) {
      const itemPath = item.to.startsWith("/") ? item.to : `/${item.to}`;
      if (itemPath === locationPath) return true;
    }
    if (item.submenu) return item.submenu.some(isPathMatchLocal);
    return false;
  };

  return (
    <nav className="flex-1 overflow-y-auto py-2">
      {navItems.map((tab, idx) => {
        const isGroup = !!tab.submenu;
        const open = openGroups.includes(tab.label);
        const isActive = tab.to
          ? (tab.to.startsWith("/") ? tab.to : `/${tab.to}`) === locationPath
          : false;
        const hasCurrentChild = tab.submenu
          ? tab.submenu.some(isPathMatchLocal)
          : false;
        return (
          <div key={idx} className="px-3">
            <button
              onClick={() =>
                isGroup
                  ? toggleGroup(tab.label)
                  : (navigate(tab.to || "/"), onNavigate())
              }
              className={`w-full flex items-center justify-between gap-3 text-right transition-colors rounded-full px-4 py-2 mt-3 ${
                open || isActive || hasCurrentChild
                  ? "bg-golden-medium text-tertiary-bg"
                  : "hover:bg-white/10 active:bg-white/15"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon ? <tab.icon className="size-[18px]" /> : null}
                <span className="text-size18">{tab.label}</span>
              </span>
              {isGroup ? (
                <HiOutlineChevronDown
                  title={tab.label}
                  className={`${
                    open || hasCurrentChild ? "rotate-180" : ""
                  } transition-transform size-[18px]`}
                />
              ) : null}
            </button>
            {isGroup && open ? (
              <div className="mt-1 mb-1 pl-2 pr-2">
                {tab.submenu?.map((sub: TabType, sidx) => {
                  const subPath = sub.to
                    ? sub.to.startsWith("/")
                      ? sub.to
                      : `/${sub.to}`
                    : "";
                  const subActive = Boolean(sub.to) && subPath === locationPath;
                  return (
                    <Link
                      key={sidx}
                      to={sub.to || "/"}
                      onClick={onNavigate}
                      className={`block text-right text-size16 rounded-md px-4 py-2 mt-2 ${
                        subActive
                          ? "bg-golden-bold text-tertiary-bg"
                          : "text-white/90 bg-transparent hover:bg-white/10"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
};

function Header() {
  // user info
  const { user } = useUser();
  // search value
  const [search, setSearch] = useState("");
  //navigate
  const navigate = useNavigate();

  // modal control method
  const { openModal } = useModal();

  // logout mutations
  const { handleLogout, logout } = useLogoutMutation();

  const [isMobileMounted, setIsMobileMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const location = useLocation();

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const navItems = useMemo(() => tabs, []);

  const openMobile = () => {
    setIsMobileMounted(true);
    requestAnimationFrame(() => setIsSidebarOpen(true));
  };

  const closeMobile = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setIsMobileMounted(false), 300);
  };

  return (
    // header container
    <header className="w-full bg-layout-bg max-md:overflow-hidden h-7xl flex  items-center justify-between md:px-container-padding-desktop px-container-padding-mobile py-sm">
      {/* brand + inline nav */}
      <div className="flex items-center ">
        <div className="max-md:hidden">
          <Navbar variant="inline" />
        </div>
        <Link
          to="/"
          className="2xl:absolute xl:left-[50%] xl:-translate-x-[50%]  w-7xl h-7xl"
        >
          <img src={logo} alt="NREP" className="size-full object-contain" />
        </Link>
      </div>

      {/* left area */}
      <div className="flex items-center gap-xl text-quaternary-fg">
        <div className="relative lg:w-[352px] md:w-[250px] w-[200px]">
          <input
            type="number"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="البحث عبر MLS"
            className="h-[28px] w-full text-primary-fg bg-tertiary-bg text-size16 placeholder:text-size16 placeholder:text-placeholder-secondary rounded-full px-xl py-sm pl-4xl text-primary-foreground focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(
                  `listing/all-listings?allListings_mls_num=${search.trim()}`
                );
              }
            }}
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

        {/* icons */}
        <div className="flex items-center gap-lg">
          {/* login / user info */}
          {user ? (
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
          {/* <div className="flex items-center gap-lg">
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative"
            >
            <AiOutlineBell className="size-[24px] text-inverse-fg cursor-pointer" />
            <span className="absolute -top-xxs right-[1px] size-[7px] bg-error rounded-full"></span>
            </Link>
          </div> */}
          <span className="w-[1px] h-[18px] bg-inverse-fg/30" />

          {/* settings */}
          <PiGear
            className="size-[24px] text-inverse-fg cursor-pointer max-md:hidden"
            onClick={() => {
              openModal("settings");
            }}
          />
          {/* mobile menu toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center size-[28px] text-inverse-fg"
            aria-label="Open menu"
            onClick={openMobile}
          >
            <HiOutlineMenu className="size-[22px]" />
          </button>
        </div>
      </div>

      <SideModal size="sm" title={"إعدادات الموقع"} id={`settings`}>
        <Settings />
      </SideModal>

      {/* Mobile screen */}
      {isMobileMounted && (
        <div className="md:hidden fixed inset-0 z-50 ">
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobile}
          />

          <aside
            className={`absolute right-0 top-0 h-full w-[300px] bg-layout-bg text-inverse-fg shadow-2xl flex flex-col transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <UserActions
              user={user}
              onLogout={() => {
                closeMobile();
                if (!logout?.isPending) handleLogout();
              }}
              onLoginClick={() => {
                closeMobile();
                navigate("/login");
              }}
            />
            <Nav
              navItems={navItems}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
              navigate={navigate}
              locationPath={location.pathname}
              onNavigate={closeMobile}
            />
          </aside>
        </div>
      )}
    </header>
  );
}

export default Header;
